<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

const MAX_PDF_BASE64_BYTES = 1_200_000;
const MAX_REQUEST_BYTES = 2_097_152;

require_once __DIR__ . '/contact-lib/phpmailer/Exception.php';
require_once __DIR__ . '/contact-lib/phpmailer/PHPMailer.php';
require_once __DIR__ . '/contact-lib/phpmailer/SMTP.php';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_text(mixed $value, int $maxLength, bool $required = false): string
{
    if (!is_string($value)) {
        if ($required) {
            throw new InvalidArgumentException('Ein erforderliches Feld fehlt.');
        }
        return '';
    }

    $value = trim(str_replace(["\r\n", "\r"], "\n", $value));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);

    if ($required && $value === '') {
        throw new InvalidArgumentException('Bitte füllen Sie alle erforderlichen Felder aus.');
    }

    if ($length > $maxLength) {
        throw new InvalidArgumentException('Eine Eingabe ist länger als erlaubt.');
    }

    return $value;
}

function clean_phone(mixed $value): string
{
    $phone = clean_text($value, 40);
    if ($phone === '') {
        return '';
    }

    if (!preg_match('/^[\d\s+().\/-]+$/', $phone)) {
        throw new InvalidArgumentException('Bitte prüfen Sie die Telefonnummer.');
    }

    $digits = preg_replace('/\D+/', '', $phone) ?? '';
    if (strlen($digits) < 6 || strlen($digits) > 20) {
        throw new InvalidArgumentException('Bitte prüfen Sie die Telefonnummer.');
    }

    return $phone;
}

/**
 * @return array{data: string, filename: string}|null
 */
function decode_pdf_attachment(mixed $base64, mixed $filename, string $source): ?array
{
    if ($base64 === null || $base64 === '') {
        return null;
    }

    if ($source !== 'automation_check_result') {
        throw new InvalidArgumentException('PDF-Anhänge sind nur für den Automation Check erlaubt.');
    }

    if (!is_string($base64) || !preg_match('/^[A-Za-z0-9+\/]+=*$/', $base64)) {
        throw new InvalidArgumentException('Der PDF-Anhang ist ungültig.');
    }

    if (strlen($base64) > MAX_PDF_BASE64_BYTES) {
        throw new InvalidArgumentException('Der PDF-Anhang ist zu groß.');
    }

    $decoded = base64_decode($base64, true);
    if ($decoded === false || $decoded === '' || strlen($decoded) > 850_000) {
        throw new InvalidArgumentException('Der PDF-Anhang konnte nicht gelesen werden.');
    }

    if (!str_starts_with($decoded, '%PDF-')) {
        throw new InvalidArgumentException('Der Anhang ist keine gültige PDF-Datei.');
    }

    $safeName = is_string($filename) ? basename(str_replace(["\0", "\r", "\n"], '', $filename)) : '';
    if ($safeName === '' || !preg_match('/^[A-Za-z0-9._-]{8,120}\.pdf$/', $safeName)) {
        $safeName = 'MSB-Automation-Check-Auswertung.pdf';
    }

    return [
        'data' => $decoded,
        'filename' => $safeName
    ];
}

function check_origin(array $allowedHosts): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $originHost = is_string($origin) ? parse_url($origin, PHP_URL_HOST) : null;
    $originScheme = is_string($origin) ? parse_url($origin, PHP_URL_SCHEME) : null;

    if (
        !is_string($originHost)
        || !in_array(strtolower($originHost), $allowedHosts, true)
        || $originScheme !== 'https'
    ) {
        respond(403, ['ok' => false, 'message' => 'Diese Anfrage konnte nicht bestätigt werden.']);
    }
}

function enforce_rate_limit(): void
{
    $windowSeconds = 15 * 60;
    $maximumRequests = 5;
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR);

    // Remove every expired rate-limit container on each form request. This
    // keeps the pseudonymous abuse-prevention data for no longer than it is
    // technically useful once another request reaches the endpoint.
    $staleBefore = time() - $windowSeconds;
    $candidates = glob($directory . DIRECTORY_SEPARATOR . 'msb-contact-*.json') ?: [];

    foreach ($candidates as $candidate) {
        $modifiedAt = @filemtime($candidate);
        if ($modifiedAt === false || $modifiedAt >= $staleBefore) {
            continue;
        }

        $cleanupHandle = @fopen($candidate, 'r+');
        if ($cleanupHandle === false) {
            continue;
        }

        if (@flock($cleanupHandle, LOCK_EX | LOCK_NB)) {
            clearstatcache(true, $candidate);
            $modifiedAt = @filemtime($candidate);

            if ($modifiedAt !== false && $modifiedAt < $staleBefore) {
                @unlink($candidate);
            }

            flock($cleanupHandle, LOCK_UN);
        }

        fclose($cleanupHandle);
    }

    $address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', is_string($address) ? $address : 'unknown');
    $path = $directory . DIRECTORY_SEPARATOR . 'msb-contact-' . $key . '.json';
    $handle = @fopen($path, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return;
    }

    $contents = stream_get_contents($handle);
    $timestamps = is_string($contents) && $contents !== '' ? json_decode($contents, true) : [];
    $timestamps = is_array($timestamps) ? $timestamps : [];
    $now = time();
    $timestamps = array_values(array_filter(
        $timestamps,
        static fn (mixed $timestamp): bool => is_int($timestamp) && $timestamp > $now - $windowSeconds
    ));

    if (count($timestamps) >= $maximumRequests) {
        flock($handle, LOCK_UN);
        fclose($handle);
        header('Retry-After: ' . $windowSeconds);
        respond(429, [
            'ok' => false,
            'message' => 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut oder schreiben Sie an kontakt@msb-ai.de.'
        ]);
    }

    $timestamps[] = $now;
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($timestamps));
    fflush($handle);
    @chmod($path, 0600);
    flock($handle, LOCK_UN);
    fclose($handle);
}

function load_config(): array
{
    $path = __DIR__ . '/.contact-config.json';
    if (!is_readable($path)) {
        throw new RuntimeException('Kontaktkonfiguration fehlt.');
    }

    $config = json_decode((string) file_get_contents($path), true, 32, JSON_THROW_ON_ERROR);
    $requiredKeys = ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'recipient'];

    foreach ($requiredKeys as $key) {
        if (!isset($config[$key]) || $config[$key] === '') {
            throw new RuntimeException('Kontaktkonfiguration ist unvollständig.');
        }
    }

    return $config;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

require_once __DIR__ . '/contact-lib/confirmation-email.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Nur POST-Anfragen sind erlaubt.']);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (!str_starts_with($contentType, 'application/json')) {
    respond(415, ['ok' => false, 'message' => 'Bitte senden Sie JSON-Daten.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > MAX_REQUEST_BYTES) {
    respond(413, ['ok' => false, 'message' => 'Die Anfrage ist zu groß. Bitte senden Sie die Anfrage ohne PDF oder schreiben Sie direkt an kontakt@msb-ai.de.']);
}

$requestId = bin2hex(random_bytes(8));

try {
    check_origin([
        'msb-ai.de',
        'www.msb-ai.de',
        's5daf7ec9-995c-4162-9356-99d102963bab.online.de'
    ]);

    $rawBody = file_get_contents('php://input');
    if (!is_string($rawBody) || $rawBody === '') {
        throw new InvalidArgumentException('Die Anfrage enthält keine Daten.');
    }

    if (strlen($rawBody) > MAX_REQUEST_BYTES) {
        respond(413, ['ok' => false, 'message' => 'Die Anfrage ist zu groß. Bitte senden Sie die Anfrage ohne PDF oder schreiben Sie direkt an kontakt@msb-ai.de.']);
    }

    $data = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($data)) {
        throw new InvalidArgumentException('Die Anfrage ist ungültig.');
    }

    $honeypot = clean_text($data['website'] ?? '', 200);
    if ($honeypot !== '') {
        respond(200, ['ok' => true, 'message' => 'Vielen Dank. Ihre Anfrage wurde übermittelt.']);
    }

    $startedAt = $data['startedAt'] ?? null;
    $elapsed = is_int($startedAt) ? (int) floor(microtime(true) * 1000) - $startedAt : 0;
    if ($elapsed < 2500 || $elapsed > 2 * 60 * 60 * 1000) {
        respond(400, ['ok' => false, 'message' => 'Bitte laden Sie das Formular neu und versuchen Sie es erneut.']);
    }

    if (($data['privacy'] ?? false) !== true) {
        throw new InvalidArgumentException('Bitte bestätigen Sie die Datenschutzerklärung.');
    }

    $source = clean_text($data['source'] ?? '', 40, true);
    if (!in_array($source, ['website_contact', 'automation_check_result'], true)) {
        throw new InvalidArgumentException('Die Anfragequelle ist ungültig.');
    }

    $name = clean_text($data['name'] ?? '', 160, $source === 'website_contact');
    $company = clean_text($data['company'] ?? '', 200, $source === 'website_contact');
    $email = clean_text($data['email'] ?? '', 254, true);
    $phone = clean_phone($data['phone'] ?? '');
    $message = clean_text($data['message'] ?? '', 6000, true);
    $pdfAttachment = decode_pdf_attachment($data['pdfBase64'] ?? null, $data['pdfFilename'] ?? null, $source);
    $assessmentSummary = clean_confirmation_summary($data['confirmationSummary'] ?? null, $source);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Bitte prüfen Sie das Format der E-Mail-Adresse.');
    }

    enforce_rate_limit();
    $config = load_config();
    $sourceLabel = $source === 'automation_check_result'
        ? 'Ergebnis des Automation Checks'
        : 'Kontaktformular';
    $subject = ($source === 'automation_check_result'
        ? 'Automation Check: neue Gesprächsanfrage'
        : 'Neue Anfrage über msb-ai.de') . ' · ' . substr($requestId, 0, 8);
    $receivedAt = (new DateTimeImmutable('now', new DateTimeZone('Europe/Berlin')))->format('d.m.Y, H:i T');

    $textBody = implode("\n", [
        'Neue Anfrage über msb-ai.de',
        '',
        'Quelle: ' . $sourceLabel,
        'Eingang: ' . $receivedAt,
        'Name: ' . ($name !== '' ? $name : 'Nicht angegeben'),
        'Unternehmen: ' . ($company !== '' ? $company : 'Nicht angegeben'),
        'E-Mail: ' . $email,
        'Telefon: ' . ($phone !== '' ? $phone : 'Nicht angegeben'),
        '',
        'Nachricht / Prozesseinschätzung:',
        $message,
        '',
        'PDF-Anhang: ' . ($pdfAttachment ? $pdfAttachment['filename'] : 'Nein'),
        '',
        'Anfrage-ID: ' . $requestId
    ]);

    $htmlBody = '<!doctype html><html lang="de"><body style="font-family:Arial,sans-serif;color:#0a2342">'
        . '<h1 style="font-size:22px">Neue Anfrage über msb-ai.de</h1>'
        . '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse">'
        . '<tr><th align="left">Quelle</th><td>' . escape_html($sourceLabel) . '</td></tr>'
        . '<tr><th align="left">Eingang</th><td>' . escape_html($receivedAt) . '</td></tr>'
        . '<tr><th align="left">Name</th><td>' . escape_html($name !== '' ? $name : 'Nicht angegeben') . '</td></tr>'
        . '<tr><th align="left">Unternehmen</th><td>' . escape_html($company !== '' ? $company : 'Nicht angegeben') . '</td></tr>'
        . '<tr><th align="left">E-Mail</th><td>' . escape_html($email) . '</td></tr>'
        . '<tr><th align="left">Telefon</th><td>' . escape_html($phone !== '' ? $phone : 'Nicht angegeben') . '</td></tr>'
        . '<tr><th align="left">PDF-Anhang</th><td>' . escape_html($pdfAttachment ? $pdfAttachment['filename'] : 'Nein') . '</td></tr>'
        . '</table>'
        . '<h2 style="font-size:18px">Nachricht / Prozesseinschätzung</h2>'
        . '<div style="padding:16px;background:#f4f7f6;border-left:4px solid #08777b;line-height:1.6">' . nl2br(escape_html($message), false) . '</div>'
        . '<p style="color:#617078;font-size:12px">Anfrage-ID: ' . escape_html($requestId) . '</p>'
        . '</body></html>';

    $mail = new PHPMailer(true);
    configure_smtp_mailer($mail, $config);
    $mail->setFrom('webformular@msb-ai.de', 'MSB Website');
    $mail->addAddress((string) $config['recipient'], 'MSB AI & Automation');
    $mail->addReplyTo($email, $name !== '' ? $name : $email);
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;
    if ($pdfAttachment !== null) {
        $mail->addStringAttachment(
            $pdfAttachment['data'],
            $pdfAttachment['filename'],
            PHPMailer::ENCODING_BASE64,
            'application/pdf'
        );
    }
    $mail->addCustomHeader('X-MSB-Form-Source', $source);
    $mail->addCustomHeader('X-MSB-Request-ID', $requestId);
    $mail->send();

    try {
        send_confirmation_email(
            $config,
            $email,
            $name,
            $source,
            $requestId,
            $name,
            $company,
            $message,
            $assessmentSummary
        );
    } catch (Throwable $confirmationError) {
        error_log('[MSB contact confirmation ' . $requestId . '] ' . $confirmationError->getMessage());
    }

    respond(200, [
        'ok' => true,
        'message' => 'Vielen Dank. Ihre Anfrage wurde sicher an kontakt@msb-ai.de übermittelt. Sie erhalten in Kürze eine Bestätigung per E-Mail.',
        'requestId' => $requestId
    ]);
} catch (InvalidArgumentException | JsonException $error) {
    respond(422, ['ok' => false, 'message' => $error->getMessage()]);
} catch (Throwable $error) {
    error_log('[MSB contact ' . $requestId . '] ' . $error->getMessage());
    respond(503, [
        'ok' => false,
        'message' => 'Die Nachricht konnte gerade nicht versendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an kontakt@msb-ai.de.'
    ]);
}
