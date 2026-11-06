function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export interface CivilDate {
  year: number;
  month: number;
  day: number;
}
function leap(y: number): boolean {
  return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
}
function lengths(y: number): number[] {
  return [31, leap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
export function toOrdinalDate(date: CivilDate): string {
  if (!date || typeof date !== 'object') throw new TypeError('Expected date');
  integer(date.year, 1, 9999);
  integer(date.month, 1, 12);
  const months = lengths(date.year);
  integer(date.day, 1, months[date.month - 1]!);
  const day = months.slice(0, date.month - 1).reduce((a, b) => a + b, 0) + date.day;
  return String(date.year).padStart(4, '0') + '-' + String(day).padStart(3, '0');
}
export function fromOrdinalDate(text: string): CivilDate {
  strictText(text, 8);
  if (!/^[0-9]{4}-[0-9]{3}$/.test(text)) throw new RangeError('Canonical YYYY-DDD required');
  const year = Number(text.slice(0, 4));
  integer(year, 1, 9999);
  let day = Number(text.slice(5));
  integer(day, 1, leap(year) ? 366 : 365);
  const months = lengths(year);
  let month = 1;
  while (day > months[month - 1]!) {
    day -= months[month - 1]!;
    month++;
  }
  return { year, month, day };
}
