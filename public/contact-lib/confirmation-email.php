<?php

declare(strict_types=1);

/**
 * @return array{resultTitle: string, resultSummary: string, areaLabel: string, recommendation: string}|null
 */
function clean_confirmation_summary(mixed $value, string $source): ?array
{
    if ($source !== 'automation_check_result' || !is_array($value)) {
        return null;
    }

    $resultTitle = clean_text($value['resultTitle'] ?? '', 160);
    $resultSummary = clean_text($value['resultSummary'] ?? '', 420);
    $areaLabel = clean_text($value['areaLabel'] ?? '', 120);
    $recommendation = clean_text($value['recommendation'] ?? '', 320);

    if ($resultTitle === '' || $resultSummary === '') {
        return null;
    }

    return [
        'resultTitle' => $resultTitle,
        'resultSummary' => $resultSummary,
        'areaLabel' => $areaLabel !== '' ? $areaLabel : 'Nicht angegeben',
        'recommendation' => $recommendation
    ];
}

function confirmation_greeting(string $name): string
{
    return $name !== '' ? 'Guten Tag ' . $name . ',' : 'Guten Tag,';
}

function confirmation_reference(string $requestId): string
{
    return strtoupper(substr($requestId, 0, 8));
}

function confirmation_process_excerpt(string $message, int $maxLength = 180): string
{
    $line = trim(strtok($message, "\n") ?: '');
    if ($line === '') {
        return '';
    }

    if (function_exists('mb_strlen') && function_exists('mb_substr')) {
        if (mb_strlen($line, 'UTF-8') <= $maxLength) {
            return $line;
        }

        return rtrim(mb_substr($line, 0, $maxLength - 1, 'UTF-8')) . '…';
    }

    if (strlen($line) <= $maxLength) {
        return $line;
    }

    return rtrim(substr($line, 0, $maxLength - 3)) . '…';
}

/**
 * @param array{resultTitle: string, resultSummary: string, areaLabel: string, recommendation: string}|null $assessmentSummary
 * @return array{subject: string, html: string, text: string}
 */
function build_confirmation_email(
    string $source,
    string $requestId,
    string $name,
    string $company,
    string $message,
    ?array $assessmentSummary
): array {
    $reference = confirmation_reference($requestId);
    $greeting = confirmation_greeting($name);
    $isAutomationCheck = $source === 'automation_check_result';

    $subject = $isAutomationCheck
        ? 'Automation Check: Anfrage eingegangen · MSB AI'
        : 'Ihre Anfrage ist eingegangen · MSB AI';

    $intro = $isAutomationCheck
        ? 'vielen Dank für Ihre Nachricht – wir haben Ihre Anfrage zum Automation Check erhalten.'
        : 'vielen Dank für Ihre Nachricht – wir haben Ihre Anfrage erhalten.';

    $nextSteps = 'Wir prüfen Ihre Angaben und melden uns in der Regel innerhalb von 1–2 Werktagen persönlich bei Ihnen. '
        . ($isAutomationCheck
            ? 'So können wir Ihren Prozess konkret einordnen und die nächsten Schritte besprechen.'
            : 'So können wir Ihren Prozess kurz einordnen und die nächsten Schritte besprechen.');

    $summaryText = '';
    $summaryHtml = '';

    if ($assessmentSummary !== null) {
        $summaryLines = [
            '',
            'Ihre Einschätzung im Überblick',
            'Ergebnis: ' . $assessmentSummary['resultTitle'],
            'Bereich: ' . $assessmentSummary['areaLabel'],
            'Kurzfassung: ' . $assessmentSummary['resultSummary']
        ];
        if ($assessmentSummary['recommendation'] !== '') {
            $summaryLines[] = 'Empfehlung: ' . $assessmentSummary['recommendation'];
        }
        $summaryText = implode("\n", $summaryLines);

        $summaryHtml = '<div style="margin:24px 0;padding:18px 20px;background:#f4f7f6;border:1px solid rgba(8,119,123,0.18);border-left:4px solid #08777b;border-radius:10px">'
            . '<p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#08777b">Ihre Einschätzung im Überblick</p>'
            . '<p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:#0a2342"><strong style="display:block;font-size:12px;color:#617078;margin-bottom:4px">Ergebnis</strong>'
            . escape_html($assessmentSummary['resultTitle']) . '</p>'
            . '<p style="margin:0 0 10px;font-size:15px;line-height:1.55;color:#0a2342"><strong style="display:block;font-size:12px;color:#617078;margin-bottom:4px">Bereich</strong>'
            . escape_html($assessmentSummary['areaLabel']) . '</p>'
            . '<p style="margin:0;font-size:15px;line-height:1.6;color:#0a2342"><strong style="display:block;font-size:12px;color:#617078;margin-bottom:4px">Kurzfassung</strong>'
            . escape_html($assessmentSummary['resultSummary']) . '</p>'
            . ($assessmentSummary['recommendation'] !== ''
                ? '<p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#48565c"><strong style="color:#0a2342">Empfehlung:</strong> '
                . escape_html($assessmentSummary['recommendation']) . '</p>'
                : '')
            . '</div>';
    } elseif (!$isAutomationCheck) {
        $excerpt = confirmation_process_excerpt($message);
        if ($excerpt !== '') {
            $summaryText = "\n\nIhr Anliegen in Kürze\n" . $excerpt;
            $summaryHtml = '<div style="margin:24px 0;padding:18px 20px;background:#f4f7f6;border:1px solid rgba(8,119,123,0.18);border-left:4px solid #08777b;border-radius:10px">'
                . '<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#08777b">Ihr Anliegen in Kürze</p>'
                . '<p style="margin:0;font-size:15px;line-height:1.6;color:#0a2342">' . escape_html($excerpt) . '</p>'
                . '</div>';
        }
    }

    $companyLine = $company !== '' ? "\nUnternehmen: " . $company : '';

    $textBody = implode("\n", array_filter([
        $greeting,
        '',
        $intro,
        $summaryText !== '' ? $summaryText : null,
        '',
        $nextSteps,
        '',
        'Referenz: ' . $reference,
        $companyLine !== '' ? trim($companyLine) : null,
        '',
        'Falls Sie ergänzende Informationen haben, antworten Sie einfach auf diese E-Mail oder erreichen Sie uns unter kontakt@msb-ai.de / 0160 6969914.',
        '',
        'Mit freundlichen Grüßen',
        '',
        'MSB AI & Automation GbR',
        'KI-Prozessautomatisierung für Mittelstand & Verwaltung',
        '',
        'kontakt@msb-ai.de · www.msb-ai.de',
        'Tel. 0160 6969914',
        '',
        'Haußerstraße 150 · 72076 Tübingen',
        '',
        'Diese E-Mail bestätigt den Eingang Ihrer Anfrage. Bitte antworten Sie nicht mit vertraulichen Personen-, Kunden- oder Bewerberdaten, sofern das nicht für die Bearbeitung erforderlich ist.'
    ], static fn ($line) => $line !== null));

    $htmlBody = '<!doctype html><html lang="de"><body style="margin:0;padding:0;background:#eef2f1;font-family:Arial,Helvetica,sans-serif;color:#0a2342">'
        . '<div style="max-width:620px;margin:0 auto;padding:24px 16px">'
        . '<div style="background:#ffffff;border:1px solid rgba(10,35,66,0.08);border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(10,35,66,0.08)">'
        . '<div style="padding:22px 24px;background:#0a2342;color:#ffffff">'
        . '<p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7fd0cf">Eingang bestätigt</p>'
        . '<h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700">Vielen Dank für Ihre Anfrage</h1>'
        . '</div>'
        . '<div style="padding:24px">'
        . '<p style="margin:0 0 16px;font-size:16px;line-height:1.65">' . escape_html($greeting) . '</p>'
        . '<p style="margin:0 0 16px;font-size:16px;line-height:1.65">' . escape_html($intro) . '</p>'
        . $summaryHtml
        . '<p style="margin:0 0 16px;font-size:16px;line-height:1.65">' . escape_html($nextSteps) . '</p>'
        . '<p style="margin:0 0 20px;padding:12px 14px;background:#fafbfa;border:1px solid rgba(10,35,66,0.08);border-radius:8px;font-size:14px;line-height:1.5;color:#48565c">'
        . '<strong style="color:#0a2342">Referenz:</strong> ' . escape_html($reference)
        . ($company !== '' ? '<br><strong style="color:#0a2342">Unternehmen:</strong> ' . escape_html($company) : '')
        . '</p>'
        . '<p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#48565c">'
        . 'Falls Sie ergänzende Informationen haben, antworten Sie einfach auf diese E-Mail oder schreiben Sie an '
        . '<a href="mailto:kontakt@msb-ai.de" style="color:#08777b">kontakt@msb-ai.de</a> · '
        . '<a href="tel:+491606969914" style="color:#08777b">0160&nbsp;6969914</a>.'
        . '</p>'
        . '<div style="border-top:1px solid rgba(10,35,66,0.08);padding-top:18px">'
        . '<p style="margin:0 0 4px;font-size:15px;line-height:1.5;color:#0a2342">Mit freundlichen Grüßen</p>'
        . '<p style="margin:0 0 2px;font-size:15px;font-weight:700;line-height:1.5;color:#0a2342">MSB AI &amp; Automation GbR</p>'
        . '<p style="margin:0 0 12px;font-size:14px;line-height:1.5;color:#617078">KI-Prozessautomatisierung für Mittelstand &amp; Verwaltung</p>'
        . '<p style="margin:0;font-size:14px;line-height:1.6;color:#48565c">'
        . '<a href="mailto:kontakt@msb-ai.de" style="color:#08777b;text-decoration:none">kontakt@msb-ai.de</a> · '
        . '<a href="https://www.msb-ai.de/" style="color:#08777b;text-decoration:none">www.msb-ai.de</a><br>'
        . 'Tel. <a href="tel:+491606969914" style="color:#08777b;text-decoration:none">0160&nbsp;6969914</a><br>'
        . 'Haußerstraße 150 · 72076 Tübingen'
        . '</p>'
        . '</div>'
        . '</div>'
        . '<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#7a868c;text-align:center">'
        . 'Diese E-Mail bestätigt den Eingang Ihrer Anfrage. Bitte senden Sie keine vertraulichen Personen-, Kunden- oder Bewerberdaten, sofern das nicht für die Bearbeitung erforderlich ist.'
        . '</p>'
        . '</div>'
        . '</div>'
        . '</body></html>';

    return [
        'subject' => $subject,
        'html' => $htmlBody,
        'text' => $textBody
    ];
}

function configure_smtp_mailer(PHPMailer\PHPMailer\PHPMailer $mail, array $config): void
{
    $smtpPort = (int) $config['smtp_port'];
    $mail->isSMTP();
    $mail->Host = (string) $config['smtp_host'];
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_user'];
    $mail->Password = (string) $config['smtp_password'];
    $mail->SMTPSecure = $smtpPort === 465
        ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Timeout = 15;
    $mail->CharSet = PHPMailer\PHPMailer\PHPMailer::CHARSET_UTF8;
    $mail->Hostname = 'www.msb-ai.de';
    $mail->Sender = (string) $config['smtp_user'];
}

function send_confirmation_email(
    array $config,
    string $recipientEmail,
    string $recipientName,
    string $source,
    string $requestId,
    string $name,
    string $company,
    string $message,
    ?array $assessmentSummary
): void {
    $confirmation = build_confirmation_email(
        $source,
        $requestId,
        $name,
        $company,
        $message,
        $assessmentSummary
    );

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    configure_smtp_mailer($mail, $config);
    $mail->setFrom('kontakt@msb-ai.de', 'MSB AI & Automation');
    $mail->addAddress($recipientEmail, $recipientName !== '' ? $recipientName : $recipientEmail);
    $mail->addReplyTo('kontakt@msb-ai.de', 'MSB AI & Automation');
    $mail->Subject = $confirmation['subject'];
    $mail->isHTML(true);
    $mail->Body = $confirmation['html'];
    $mail->AltBody = $confirmation['text'];
    $mail->addCustomHeader('X-MSB-Form-Source', $source . '_confirmation');
    $mail->addCustomHeader('X-MSB-Request-ID', $requestId);
    $mail->send();
}
