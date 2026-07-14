using System;
using System.Collections.Generic;

namespace Iccbba.Isbt128
{
    /// <summary>
    /// Date helpers shared by the several ISBT 128 data structures that encode a <c>cyyjjj</c>
    /// (century + 2-digit year + ordinal/Julian day) or <c>YYYYMMDD</c> date.
    /// </summary>
    public static class DateUtils
    {
        /// <summary>
        /// Converts the <c>c</c> + <c>yy</c> fields used throughout ST-001 (e.g. §2.4.4 Expiration Date) into a
        /// 4-digit year. ST-001 itself does not spell out the <c>c</c>/<c>yy</c> to year arithmetic; the formula
        /// below (<c>c</c> counts whole centuries from 2000: 0 = 2000s, 1 = 2100s, ...) is inferred from the
        /// ST-012 §6.2 worked example, where Expiration Date and Time <c>&amp;&gt;0183652359</c> (c=0, yy=18, day
        /// 365) is shown to correspond to the same product's SEC expiry date of 2018-12-31.
        /// </summary>
        public static int CenturyYearToFullYear(string c, string yy) => 2000 + int.Parse(c) * 100 + int.Parse(yy);

        /// <summary>Converts a 4-digit year + ordinal ("Julian") day-of-year (001-366) into an ISO <c>YYYY-MM-DD</c> date.</summary>
        public static string OrdinalDateToIso(int year, int dayOfYear)
        {
            var date = new DateTime(year, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddDays(dayOfYear - 1);
            return date.ToString("yyyy-MM-dd");
        }

        /// <summary>Decodes a <c>cyyjjj</c> (6-char) date field into century/yearInCentury/dayOfYear/date.</summary>
        public static Dictionary<string, object> DecodeCyyjjj(string content)
        {
            var century = content.Substring(0, 1);
            var yearInCentury = content.Substring(1, 2);
            var dayOfYear = content.Substring(3, 3);
            var year = CenturyYearToFullYear(century, yearInCentury);
            return new Dictionary<string, object>
            {
                ["century"] = century,
                ["yearInCentury"] = yearInCentury,
                ["dayOfYear"] = dayOfYear,
                ["date"] = OrdinalDateToIso(year, int.Parse(dayOfYear)),
            };
        }

        /// <summary>Encodes a date into a <c>cyyjjj</c> (6-char) field — the inverse of <see cref="DecodeCyyjjj"/>,
        /// using the same century-from-2000 convention as <see cref="CenturyYearToFullYear"/>.</summary>
        public static string EncodeCyyjjj(DateTime date)
        {
            var yearsFrom2000 = date.Year - 2000;
            var century = yearsFrom2000 / 100;
            var yearInCentury = yearsFrom2000 % 100;
            return $"{century}{yearInCentury:D2}{date.DayOfYear:D3}";
        }

        /// <summary>Decodes a <c>cyyjjjhhmm</c> (10-char) date+time field.</summary>
        public static Dictionary<string, object> DecodeCyyjjjhhmm(string content)
        {
            var fields = DecodeCyyjjj(content.Substring(0, 6));
            var hour = content.Substring(6, 2);
            var minute = content.Substring(8, 2);
            fields["hour"] = hour;
            fields["minute"] = minute;
            fields["time"] = $"{hour}:{minute}";
            return fields;
        }
    }
}
