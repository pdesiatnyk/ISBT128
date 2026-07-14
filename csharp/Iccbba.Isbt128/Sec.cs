using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Iccbba.Isbt128
{
    /// <summary>
    /// Single European Code (SEC) parsing — ST-012 §2.1-2.3 (eye-readable text) and §6.1 (DS038
    /// electronic 40-character content, shared with ST-001 §2.4.38).
    /// </summary>
    /// <remarks>
    /// Both representations decode to the same 40-character logical layout:
    /// Donation Identification Sequence (21 chars): ISO country code (2) + TE code (6) + unique
    /// donation number (13). Product Identification Sequence (19 chars): coding system identifier
    /// (1) + product code (7) + split number (3) + expiry date YYYYMMDD (8).
    /// </remarks>
    public static class Sec
    {
        private static readonly Regex SecTextPattern = new Regex(@"^SEC:\s*([A-Za-z0-9]{21})\s+([A-Za-z0-9]{19})\s*$", RegexOptions.Compiled);

        /// <summary>Decodes the 40-character SEC content string shared by both the eye-readable and DS038 forms.</summary>
        public static Dictionary<string, object> DecodeSecContent(string content)
        {
            if (content.Length != 40)
            {
                throw new ArgumentException($"SEC content must be exactly 40 characters, got {content.Length}", nameof(content));
            }
            var countryIdentifier = content.Substring(0, 2);
            var tissueEstablishmentCode = content.Substring(2, 6);
            var uniqueDonationNumber = content.Substring(8, 13);
            var codingSystemIdentifier = content.Substring(21, 1);
            var productCode = content.Substring(22, 7);
            var splitNumber = content.Substring(29, 3);
            var rawExpiry = content.Substring(32, 8);
            var expiryDate = rawExpiry == "00000000" ? "" : $"{rawExpiry.Substring(0, 4)}-{rawExpiry.Substring(4, 2)}-{rawExpiry.Substring(6, 2)}";
            return new Dictionary<string, object>
            {
                ["countryIdentifier"] = countryIdentifier,
                ["tissueEstablishmentCode"] = tissueEstablishmentCode,
                ["uniqueDonationNumber"] = uniqueDonationNumber,
                ["codingSystemIdentifier"] = codingSystemIdentifier,
                ["codingSystem"] = ReferenceTables.DescribeSecCodingSystem(codingSystemIdentifier),
                ["productCode"] = productCode,
                ["splitNumber"] = splitNumber,
                ["expiryDate"] = expiryDate,
            };
        }

        /// <summary>
        /// Parses the SEC eye-readable text form (ST-012 §2.3): <c>SEC:</c> followed by the 21-character
        /// donation sequence and 19-character product sequence, separated by whitespace (a single space,
        /// or a line break when printed on two lines).
        /// </summary>
        public static Dictionary<string, object> ParseSecText(string input)
        {
            var match = SecTextPattern.Match(input.Trim());
            if (!match.Success)
            {
                throw new FormatException("Input is not a well-formed SEC eye-readable text string");
            }
            return DecodeSecContent(match.Groups[1].Value + match.Groups[2].Value);
        }

        public static bool IsSecText(string input) => input.TrimStart().StartsWith("SEC:", StringComparison.OrdinalIgnoreCase);
    }
}
