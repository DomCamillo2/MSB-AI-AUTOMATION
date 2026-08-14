export function validateOptionalPhone(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (!/^[\d\s+()./-]+$/.test(trimmed)) {
    return 'Bitte verwenden Sie nur Ziffern, Leerzeichen und +()-/.';
  }

  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 20) {
    return 'Bitte prüfen Sie die Telefonnummer oder lassen Sie das Feld leer.';
  }

  return '';
}
