using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Iccbba.Isbt128
{
    /// <summary>
    /// Registry of ISBT 128 data structures with fixed-length data content (ST-001 §2.4.*).
    /// </summary>
    /// <remarks>
    /// Data structures with variable-length content — DIN [001] (special DI rule), Compound Message
    /// [023] (drives the outer scan loop, but its own 5-char header is fixed-length and listed here),
    /// Patient Identification Number [025] (length-prefixed), Dimensions [029] and Red Cell Antigens
    /// with Test History [030] (repeat-count-prefixed) — are otherwise handled directly by
    /// <see cref="Isbt128Parser"/> and are not present in this table except where noted.
    /// </remarks>
    public sealed class StructureSpec
    {
        public string Number { get; set; }
        public string Name { get; set; }

        /// <summary>Exact data identifier as it appears on the wire, e.g. "=%", "&amp;,1".</summary>
        public string Di { get; set; }

        /// <summary>Length of the data content that follows the data identifier.</summary>
        public int ContentLength { get; set; }

        public bool Retired { get; set; }
        public string Reference { get; set; }
        public Func<string, Dictionary<string, object>> Decode { get; set; }

        /// <summary>Optional character-set check over the raw content, run before <see cref="Decode"/>.</summary>
        public Func<string, bool> Validate { get; set; }
    }

    public static class Structures
    {
        /// <summary>
        /// ST-017 §2.1/§3.2/§3.5 character-set constraints for the UDI-relevant fixed structures.
        /// <c>O</c> is excluded from FIN(P) (§2.1) to avoid confusion with digit <c>0</c>.
        /// </summary>
        public static readonly Regex FinPCharset = new Regex("^[A-NP-Z0-9]{5}$", RegexOptions.Compiled);
        public static readonly Regex FpcCharset = new Regex("^[A-Z0-9]{6}$", RegexOptions.Compiled);
        public static readonly Regex PdcCharset = new Regex("^[A-Z0-9]{5}$", RegexOptions.Compiled);
        public static readonly Regex ProductDivisionsCharset = new Regex("^[A-Z0-9]{6}$", RegexOptions.Compiled);
        public static readonly Regex LotNumberCharset = new Regex("^[A-Z0-9]{18}$", RegexOptions.Compiled);
        /// <summary>ST-001 §3.1 Table 2 — Product Description Code family selector <c>α</c> (Data Structure 003).</summary>
        private static readonly Dictionary<char, string> ProductFamilyTable = new Dictionary<char, string>
        {
            ['E'] = "Blood Components", ['F'] = "Blood Components",
            ['H'] = "MPHO with INN and/or USAN names",
            ['M'] = "Other Therapies (Human Milk / Topical Products of Human Origin)",
            ['N'] = "Organs", ['P'] = "Regenerated Tissue", ['R'] = "Reproductive Tissue and Cell products",
            ['S'] = "Cellular Therapy products", ['T'] = "Tissue products", ['V'] = "Ocular Tissue products",
            ['W'] = "Fecal Microbiota", ['X'] = "Other Blood products (Plasma Derivatives / In Vivo Diagnostic MPHO)",
            ['Y'] = "Clinical Trials products",
        };

        private static string ProductFamily(char alpha)
        {
            if (ProductFamilyTable.TryGetValue(alpha, out var name)) return name;
            if (alpha >= 'A' && alpha <= 'D') return "National or Local/Facility codes";
            return "Unrecognized";
        }

        /// <summary>ST-001 §2.4.17 — container identification character <c>b</c> (Data Structure 017).</summary>
        private static string DescribeContainerIdChar(char b)
        {
            switch (b)
            {
                case '1': return "Primary collection container";
                case 'y': return "Entire set of integrally attached containers";
                case 'z': return "Carton containing blood collection containers";
                default:
                    if (char.IsLetterOrDigit(b)) return "Facility/manufacturer-defined container identifier";
                    return "Reserved for future use";
            }
        }

        private static Dictionary<string, object> DecodeAntigenPair(string value, string nameA, string nameB)
        {
            var (a, b) = ReferenceTables.PairedResultLegend.GetValueOrDefault(value, ("unknown", "unknown"));
            return new Dictionary<string, object> { [nameA] = a, [nameB] = b };
        }

        /// <summary>Shared decoder for Data Structures 012/013 (RBC Antigens — General/Finnish, §2.4.12/§2.4.13).</summary>
        private static Dictionary<string, object> DecodeRbcAntigens(string content)
        {
            var rhValue = content.Substring(0, 1);
            var fields = new Dictionary<string, object>
            {
                ["rhPhenotypeCode"] = rhValue,
                ["rhPhenotype"] = ReferenceTables.DescribeRhPhenotype(rhValue),
            };
            // Positions 2-9: four antithetical antigen pairs, digit-legend decoded (ST-001 §3.1 Table 9/10).
            for (var i = 0; i < 8; i += 2)
            {
                var posValue = content.Substring(1 + i / 2, 1);
                foreach (var kv in DecodeAntigenPair(posValue, ReferenceTables.Rt009AntigenNames[i], ReferenceTables.Rt009AntigenNames[i + 1]))
                {
                    fields[kv.Key] = kv.Value;
                }
            }
            // Positions 10-16: further antigen pairs whose exact names are ambiguous in the source
            // table's merged-cell continuation (see README.md); the pos/neg/nt/ni legend is unambiguous.
            var continuationPairs = new List<Dictionary<string, object>>();
            for (var i = 9; i < 16; i++)
            {
                var posValue = content.Substring(i, 1);
                var (a, b) = ReferenceTables.PairedResultLegend.GetValueOrDefault(posValue, ("unknown", "unknown"));
                continuationPairs.Add(new Dictionary<string, object> { ["position"] = i + 1, ["resultA"] = a, ["resultB"] = b });
            }
            fields["additionalAntigenPositions"] = continuationPairs;
            fields["positions17And18"] = content.Substring(16, 2);
            return fields;
        }

        public static readonly IReadOnlyList<StructureSpec> Fixed = new List<StructureSpec>
        {
            new StructureSpec
            {
                Number = "002", Name = "Blood Groups [ABO and RhD]", Di = "=%", ContentLength = 4, Reference = "ST-001 §2.4.2",
                Decode = c =>
                {
                    var gg = c.Substring(0, 2);
                    var r = c.Substring(2, 1);
                    var e = c.Substring(3, 1);
                    var (kind, description) = ReferenceTables.DescribeBloodGroupGg(gg);
                    return new Dictionary<string, object>
                    {
                        ["gg"] = gg, ["kind"] = kind, ["description"] = description,
                        ["r"] = r, ["phenotype"] = ReferenceTables.DescribeRhKellMia(r),
                        ["reservedForFutureUse"] = e,
                    };
                },
            },
            new StructureSpec
            {
                Number = "003", Name = "Product Code", Di = "=<", ContentLength = 8, Reference = "ST-001 §2.4.3",
                Decode = c =>
                {
                    var alpha = c[0];
                    var oooo = c.Substring(1, 4);
                    var t = c.Substring(5, 1);
                    var d = c.Substring(6, 1);
                    var s = c.Substring(7, 1);
                    return new Dictionary<string, object>
                    {
                        ["productDescriptionCodeFamily"] = alpha.ToString(),
                        ["productFamilyDescription"] = ProductFamily(alpha),
                        ["productDescriptionCode"] = $"{alpha}{oooo}",
                        ["collectionTypeOrDivisionRaw"] = $"{t}{d}{s}",
                        ["usesProductDivisions"] = d + s == "99",
                    };
                },
            },
            new StructureSpec { Number = "004", Name = "Expiration Date", Di = "=>", ContentLength = 6, Reference = "ST-001 §2.4.4", Decode = DateUtils.DecodeCyyjjj },
            new StructureSpec { Number = "005", Name = "Expiration Date and Time", Di = "&>", ContentLength = 10, Reference = "ST-001 §2.4.5", Decode = DateUtils.DecodeCyyjjjhhmm },
            new StructureSpec { Number = "006", Name = "Collection Date", Di = "=*", ContentLength = 6, Reference = "ST-001 §2.4.6", Decode = DateUtils.DecodeCyyjjj },
            new StructureSpec { Number = "007", Name = "Collection Date and Time", Di = "&*", ContentLength = 10, Reference = "ST-001 §2.4.7", Decode = DateUtils.DecodeCyyjjjhhmm },
            new StructureSpec { Number = "008", Name = "Production Date", Di = "=}", ContentLength = 6, Reference = "ST-001 §2.4.8", Decode = DateUtils.DecodeCyyjjj },
            new StructureSpec { Number = "009", Name = "Production Date and Time", Di = "&}", ContentLength = 10, Reference = "ST-001 §2.4.9", Decode = DateUtils.DecodeCyyjjjhhmm },
            new StructureSpec
            {
                Number = "010", Name = "Special Testing: General", Di = "&(", ContentLength = 5, Reference = "ST-001 §2.4.10",
                Decode = c => new Dictionary<string, object>
                {
                    ["code"] = c,
                    ["note"] = "Raw code only — resolved via the ICCBBA password-protected Special Testing database (RT029), not embedded in the standard document.",
                },
            },
            new StructureSpec { Number = "011", Name = "Special Testing: Red Blood Cell Antigens", Di = "={", ContentLength = 18, Retired = true, Reference = "ST-001 §2.4.11", Decode = _ => new Dictionary<string, object>() },
            new StructureSpec { Number = "012", Name = "Special Testing: Red Blood Cell Antigens — General", Di = "=\\", ContentLength = 18, Reference = "ST-001 §2.4.12", Decode = DecodeRbcAntigens },
            new StructureSpec { Number = "013", Name = "Special Testing: Red Blood Cell Antigens — Finnish", Di = "&\\", ContentLength = 18, Reference = "ST-001 §2.4.13", Decode = DecodeRbcAntigens },
            new StructureSpec
            {
                Number = "014", Name = "Special Testing: Platelet HLA and Platelet Specific Antigens", Di = "&{", ContentLength = 18, Reference = "ST-001 §2.4.14",
                Decode = c => new Dictionary<string, object>
                {
                    ["hlaA"] = new[] { c.Substring(0, 2), c.Substring(2, 2) },
                    ["hlaB"] = new[] { c.Substring(4, 2), c.Substring(6, 2) },
                    ["plateletSpecificAntigensRaw"] = c.Substring(8, 8),
                    ["reservedForFutureUse"] = c.Substring(16, 1),
                    ["highTiteredAntiABInfoRaw"] = c.Substring(17, 1),
                    ["note"] = "HLA-A/-B and platelet-specific antigen codes are raw — resolved via Table 14/15/44 [RT013/RT014/RT044], reproduced here only structurally due to source-table ambiguity (see README.md).",
                },
            },
            new StructureSpec { Number = "015", Name = "Special Testing: HLA-A and -B Alleles", Di = "=[", ContentLength = 18, Retired = true, Reference = "ST-001 §2.4.15", Decode = _ => new Dictionary<string, object>() },
            new StructureSpec { Number = "016", Name = "Special Testing: HLA-DRB1 Alleles", Di = "=\"", ContentLength = 18, Retired = true, Reference = "ST-001 §2.4.16", Decode = _ => new Dictionary<string, object>() },
            new StructureSpec
            {
                Number = "017", Name = "Container Manufacturer and Catalog Number", Di = "=)", ContentLength = 10, Reference = "ST-001 §2.4.17",
                Decode = c => new Dictionary<string, object>
                {
                    ["containerIdentificationCharacter"] = c.Substring(0, 1),
                    ["containerIdentificationDescription"] = DescribeContainerIdChar(c[0]),
                    ["manufacturerCode"] = c.Substring(1, 2),
                    ["catalogNumber"] = c.Substring(3, 7),
                },
            },
            new StructureSpec { Number = "018", Name = "Container Lot Number", Di = "&)", ContentLength = 10, Reference = "ST-001 §2.4.18", Decode = c => new Dictionary<string, object> { ["lotNumber"] = c } },
            new StructureSpec
            {
                Number = "019", Name = "Donor Identification Number", Di = "=;", ContentLength = 21, Reference = "ST-001 §2.4.19",
                Decode = c => new Dictionary<string, object> { ["facilityIdentificationNumber"] = c.Substring(0, 5), ["sequenceNumber"] = c.Substring(5, 16) },
            },
            new StructureSpec
            {
                Number = "020", Name = "Staff Member Identification Number", Di = "='", ContentLength = 11, Reference = "ST-001 §2.4.20",
                Decode = c => new Dictionary<string, object> { ["facilityIdentificationNumber"] = c.Substring(0, 5), ["staffMemberId"] = c.Substring(5, 6) },
            },
            new StructureSpec
            {
                Number = "021", Name = "Manufacturer and Catalog Number: Items Other Than Containers", Di = "=-", ContentLength = 10, Reference = "ST-001 §2.4.21",
                Decode = c => new Dictionary<string, object> { ["manufacturerCode"] = c.Substring(0, 2), ["catalogNumber"] = c.Substring(2, 8) },
            },
            new StructureSpec { Number = "022", Name = "Lot Number: Items Other Than Containers", Di = "&-", ContentLength = 10, Reference = "ST-001 §2.4.22", Decode = c => new Dictionary<string, object> { ["lotNumber"] = c } },
            new StructureSpec
            {
                Number = "023", Name = "Compound Message", Di = "=+", ContentLength = 5, Reference = "ST-001 §2.4.23",
                Decode = c => new Dictionary<string, object>
                {
                    ["declaredCount"] = int.Parse(c.Substring(0, 2)),
                    ["sequenceCode"] = c.Substring(2, 3),
                    ["isSpecifiedSequence"] = c.Substring(2, 3) != "000",
                },
            },
            new StructureSpec
            {
                Number = "024", Name = "Patient Date of Birth", Di = "=#", ContentLength = 10, Reference = "ST-001 §2.4.24",
                Decode = c => new Dictionary<string, object> { ["locationCode"] = c.Substring(0, 2), ["dateOfBirth"] = $"{c.Substring(2, 4)}-{c.Substring(6, 2)}-{c.Substring(8, 2)}" },
            },
            new StructureSpec
            {
                Number = "026", Name = "Expiration Month and Year", Di = "=]", ContentLength = 6, Reference = "ST-001 §2.4.26",
                Decode = c => new Dictionary<string, object> { ["expirationYear"] = c.Substring(0, 4), ["expirationMonth"] = c.Substring(4, 2), ["expirationYearMonth"] = $"{c.Substring(0, 4)}-{c.Substring(4, 2)}" },
            },
            new StructureSpec
            {
                Number = "028", Name = "Product Consignment", Di = "=$", ContentLength = 16, Reference = "ST-001 §2.4.28",
                Decode = c => new Dictionary<string, object>
                {
                    ["facilityIdentificationNumber"] = c.Substring(0, 5), ["year"] = c.Substring(5, 2), ["serialNumber"] = c.Substring(7, 5),
                    ["containerNumber"] = c.Substring(12, 2), ["totalContainersInConsignment"] = c.Substring(14, 2),
                },
            },
            new StructureSpec
            {
                Number = "031", Name = "Flexible Date and Time", Di = "=(", ContentLength = 16, Reference = "ST-001 §2.4.31",
                Decode = c => new Dictionary<string, object>
                {
                    ["timeZoneCode"] = c.Substring(0, 1), ["timeZone"] = ReferenceTables.DescribeTimeZone(c.Substring(0, 1)),
                    ["reservedForFutureUse"] = c.Substring(1, 1),
                    ["typeOfTimeCode"] = c.Substring(2, 2), ["typeOfTime"] = ReferenceTables.DescribeTypeOfTime(c.Substring(2, 2)),
                    ["date"] = $"{c.Substring(4, 4)}-{c.Substring(8, 2)}-{c.Substring(10, 2)}",
                    ["time"] = $"{c.Substring(12, 2)}:{c.Substring(14, 2)}",
                },
            },
            new StructureSpec
            {
                Number = "032", Name = "Product Divisions", Di = "=,", ContentLength = 6, Reference = "ST-001 §2.4.32",
                Decode = c => new Dictionary<string, object> { ["divisionCode"] = c },
                Validate = c => ProductDivisionsCharset.IsMatch(c),
            },
            new StructureSpec
            {
                Number = "033", Name = "Processing Facility Information Code", Di = "&+", ContentLength = 11, Reference = "ST-001 §2.4.33",
                Decode = c => new Dictionary<string, object> { ["facilityIdentificationNumberOfProcessor"] = c.Substring(0, 5), ["facilityDefinedProductCode"] = c.Substring(5, 6) },
            },
            new StructureSpec
            {
                Number = "034", Name = "Processor Product Identification Code", Di = "=/", ContentLength = 16, Reference = "ST-001 §2.4.34",
                Decode = c => new Dictionary<string, object>
                {
                    ["facilityIdentificationNumberOfProcessor"] = c.Substring(0, 5), ["facilityDefinedProductCode"] = c.Substring(5, 6), ["productDescriptionCode"] = c.Substring(11, 5),
                },
                Validate = c => FinPCharset.IsMatch(c.Substring(0, 5)) && FpcCharset.IsMatch(c.Substring(5, 6)) && PdcCharset.IsMatch(c.Substring(11, 5)),
            },
            new StructureSpec
            {
                Number = "035", Name = "MPHO Lot Number", Di = "&,1", ContentLength = 18, Reference = "ST-001 §2.4.35",
                Decode = c => new Dictionary<string, object> { ["lotNumber"] = c },
                Validate = c => LotNumberCharset.IsMatch(c),
            },
            new StructureSpec { Number = "036", Name = "MPHO Supplemental Identification Number", Di = "&,2", ContentLength = 18, Reference = "ST-001 §2.4.36", Decode = c => new Dictionary<string, object> { ["supplementalId"] = c } },
            new StructureSpec { Number = "037", Name = "Global Registration Identifier for Donors", Di = "&,3", ContentLength = 19, Retired = true, Reference = "ST-001 §2.4.37", Decode = _ => new Dictionary<string, object>() },
            new StructureSpec
            {
                Number = "039", Name = "Global Registration Identifier for Donors", Di = "&:", ContentLength = 19, Reference = "ST-001 §2.4.39",
                Decode = c =>
                {
                    var prefix = c.Substring(0, 17);
                    var bb = c.Substring(17, 2);
                    return new Dictionary<string, object>
                    {
                        ["issuingOrganizationNumber"] = c.Substring(0, 4), ["registrationDonorIdentifier"] = c.Substring(4, 13),
                        ["checksum"] = bb, ["checksumValid"] = Checksum.CalculateGridChecksum(prefix) == bb,
                    };
                },
            },
            new StructureSpec
            {
                Number = "040", Name = "Chain of Identity Identifier", Di = "&/", ContentLength = 15, Reference = "ST-001 §2.4.40",
                Decode = c => new Dictionary<string, object>
                {
                    ["literal"] = c.Substring(0, 2), ["facilityIdentificationNumber"] = c.Substring(2, 5), ["year"] = c.Substring(7, 2), ["sequenceNumber"] = c.Substring(9, 6),
                },
            },
        };

        public static readonly IReadOnlyDictionary<string, StructureSpec> FixedByDi = Fixed.ToDictionary(s => s.Di, s => s);
    }
}
