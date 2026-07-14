/**
 * Date helpers shared by the several ISBT 128 data structures that encode a `cyyjjj`
 * (century + 2-digit year + ordinal/Julian day) or `YYYYMMDD` date.
 */

/**
 * Converts the `c` + `yy` fields used throughout ST-001 (e.g. §2.4.4 Expiration Date) into a
 * 4-digit year. ST-001 itself does not spell out the `c`/`yy` → year arithmetic; the formula
 * below (`c` counts whole centuries from 2000: 0 = 2000s, 1 = 2100s, ...) is inferred from the
 * ST-012 §6.2 worked example, where Expiration Date and Time `&>0183652359` (c=0, yy=18, day
 * 365) is shown to correspond to the same product's SEC expiry date of 2018-12-31.
 */
export function centuryYearToFullYear(c: string, yy: string): number {
  return 2000 + Number(c) * 100 + Number(yy);
}

/** Converts a 4-digit year + ordinal ("Julian") day-of-year (001-366) into an ISO `YYYY-MM-DD` date. */
export function ordinalDateToIso(year: number, dayOfYear: number): string {
  const date = new Date(Date.UTC(year, 0, 1));
  date.setUTCDate(date.getUTCDate() + dayOfYear - 1);
  const yyyy = String(date.getUTCFullYear()).padStart(4, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/** Encodes a date into a `cyyjjj` (6-char) field — the inverse of `decodeCyyjjj`, using the same
 * century-from-2000 convention as `centuryYearToFullYear`. */
export function encodeCyyjjj(date: Date): string {
  const year = date.getUTCFullYear();
  const yearsFrom2000 = year - 2000;
  const century = Math.floor(yearsFrom2000 / 100);
  const yearInCentury = yearsFrom2000 % 100;
  const dayOfYear = Math.round((Date.UTC(year, date.getUTCMonth(), date.getUTCDate()) - Date.UTC(year, 0, 1)) / 86400000) + 1;
  return `${century}${String(yearInCentury).padStart(2, '0')}${String(dayOfYear).padStart(3, '0')}`;
}

/** Decodes a `cyyjjj` (6-char) date field into { century, yearInCentury, dayOfYear, date }. */
export function decodeCyyjjj(content: string): { century: string; yearInCentury: string; dayOfYear: string; date: string } {
  const century = content[0];
  const yearInCentury = content.slice(1, 3);
  const dayOfYear = content.slice(3, 6);
  const year = centuryYearToFullYear(century, yearInCentury);
  return { century, yearInCentury, dayOfYear, date: ordinalDateToIso(year, Number(dayOfYear)) };
}

/** Decodes a `cyyjjjhhmm` (10-char) date+time field. */
export function decodeCyyjjjhhmm(content: string): {
  century: string; yearInCentury: string; dayOfYear: string; hour: string; minute: string; date: string; time: string;
} {
  const base = decodeCyyjjj(content.slice(0, 6));
  const hour = content.slice(6, 8);
  const minute = content.slice(8, 10);
  return { ...base, hour, minute, time: `${hour}:${minute}` };
}
