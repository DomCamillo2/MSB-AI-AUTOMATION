<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/contact-lib/phpmailer/Exception.php';
require_once __DIR__ . '/contact-lib/phpmailer/PHPMailer.php';
require_once __DIR__ . '/contact-lib/phpmailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");

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

    // The rate-limit decision only uses timestamps from the last 15 minutes.
    // Occasionally remove inactive files as well so pseudonymous rate-limit
    // containers do not remain in the temporary directory indefinitely.
    try {
        $shouldCleanUp = random_int(1, 25) === 1;
    } catch (Throwable) {
        $shouldCleanUp = false;
    }

    if ($shouldCleanUp) {
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
    return nl2br(htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Nur POST-Anfragen sind erlaubt.']);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (!str_starts_with($contentType, 'application/json')) {
    respond(415, ['ok' => false, 'message' => 'Bitte senden Sie JSON-Daten.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 24 * 1024) {
    respond(413, ['ok' => false, 'message' => 'Die Anfrage ist zu groß.']);
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
    $message = clean_text($data['message'] ?? '', 6000, true);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Bitte prüfen Sie das Format der E-Mail-Adresse.');
    }

    enforce_rate_limit();
    $config = load_config();
    $smtpPort = (int) $config['smtp_port'];
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
        '',
        'Nachricht / Prozesseinschätzung:',
        $message,
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
        . '</table>'
        . '<h2 style="font-size:18px">Nachricht / Prozesseinschätzung</h2>'
        . '<div style="padding:16px;background:#f4f7f6;border-left:4px solid #08777b;line-height:1.6">' . nl2br(escape_html($message), false) . '</div>'
        . '<p style="color:#617078;font-size:12px">Anfrage-ID: ' . escape_html($requestId) . '</p>'
        . '</body></html>';

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) $config['smtp_host'];
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_user'];
    $mail->Password = (string) $config['smtp_password'];
    $mail->SMTPSecure = $smtpPort === 465
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Timeout = 15;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Hostname = 'www.msb-ai.de';
    $mail->setFrom('webformular@msb-ai.de', 'MSB Website');
    $mail->Sender = (string) $config['smtp_user'];
    $mail->addAddress((string) $config['recipient'], 'MSB AI & Automation');
    $mail->addReplyTo($email, $name !== '' ? $name : $email);
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;
    $mail->addCustomHeader('X-MSB-Form-Source', $source);
    $mail->addCustomHeader('X-MSB-Request-ID', $requestId);
    $mail->send();

    respond(200, [
        'ok' => true,
        'message' => 'Vielen Dank. Ihre Anfrage wurde sicher an kontakt@msb-ai.de übermittelt.',
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
