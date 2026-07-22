'use client';

export function ConsentSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('msb:open-consent'))}
    >
      Cookie-Einstellungen
    </button>
  );
}

export default ConsentSettingsButton;
