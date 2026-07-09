namespace Iccbba.Isbt128;

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
    public required string Number { get; init; }
    public required string Name { get; init; }

    /// <summary>Exact data identifier as it appears on the wire, e.g. "=%", "&amp;,1".</summary>
    public required string Di { get; init; }

    /// <summary>Length of the data content that follows the data identifier.</summary>
    public required int ContentLength { get; init; }

    public bool Retired { get; init; }
    public required string Reference { get; init; }
    public required Func<string, Dictionary<string, object?>> Decode { get; init; }
}

public static class Structures
{
    /// <summary>ST-001 §3.1 Table 2 — Product Description Code family selector <c>α</c> (Data Structure 003).</summary>
    private static readonly Dictionary<char, string> ProductFamilyTable = new()
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
        if (alpha is >= 'A' and <= 'D') return "National or Local/Facility codes";
        return "Unrecognized";
    }

    /// <summary>ST-001 §2.4.17 — container identification character <c>b</c> (Data Structure 017).</summary>
    private static string DescribeContainerIdChar(char b) => b switch
    {
        '1' => "Primary collection container",
        'y' => "Entire set of integrally attached containers",
        'z' => "Carton containing blood collection containers",
        _ when char.IsLetterOrDigit(b) => "Facility/manufacturer-defined container identifier",
        _ => "Reserved for future use",
    };

    private static Dictionary<string, object?> DecodeAntigenPair(string value, string nameA, string nameB)
    {
        var (a, b) = ReferenceTables.PairedResultLegend.GetValueOrDefault(value, ("unknown", "unknown"));
        return new Dictionary<string, object?> { [nameA] = a, [nameB] = b };
    }

    /// <summary>Shared decoder for Data Structures 012/013 (RBC Antigens — General/Finnish, §2.4.12/§2.4.13).</summary>
    private static Dictionary<string, object?> DecodeRbcAntigens(string content)
    {
        var rhValue = content[..1];
        var fields = new Dictionary<string, object?>
        {
            ["rhPhenotypeCode"] = rhValue,
            ["rhPhenotype"] = ReferenceTables.DescribeRhPhenotype(rhValue),
        };
        // Positions 2-9: four antithetical antigen pairs, digit-legend decoded (ST-001 §3.1 Table 9/10).
        for (var i = 0; i < 8; i += 2)
        {
            var posValue = content[(1 + i / 2)..(2 + i / 2)];
            foreach (var kv in DecodeAntigenPair(posValue, ReferenceTables.Rt009AntigenNames[i], ReferenceTables.Rt009AntigenNames[i + 1]))
            {
                fields[kv.Key] = kv.Value;
            }
        }
        // Positions 10-16: further antigen pairs whose exact names are ambiguous in the source
        // table's merged-cell continuation (see README.md); the pos/neg/nt/ni legend is unambiguous.
        var continuationPairs = new List<Dictionary<string, object?>>();
        for (var i = 9; i < 16; i++)
        {
            var posValue = content[i..(i + 1)];
            var (a, b) = ReferenceTables.PairedResultLegend.GetValueOrDefault(posValue, ("unknown", "unknown"));
            continuationPairs.Add(new Dictionary<string, object?> { ["position"] = i + 1, ["resultA"] = a, ["resultB"] = b });
        }
        fields["additionalAntigenPositions"] = continuationPairs;
        fields["positions17And18"] = content[16..18];
        return fields;
    }

    public static readonly IReadOnlyList<StructureSpec> Fixed = new List<StructureSpec>
    {
        new()
        {
            Number = "002", Name = "Blood Groups [ABO and RhD]", Di = "=%", ContentLength = 4, Reference = "ST-001 §2.4.2",
            Decode = c =>
            {
                var gg = c[..2];
                var r = c[2..3];
                var e = c[3..4];
                var (kind, description) = ReferenceTables.DescribeBloodGroupGg(gg);
                return new Dictionary<string, object?>
                {
                    ["gg"] = gg, ["kind"] = kind, ["description"] = description,
                    ["r"] = r, ["phenotype"] = ReferenceTables.DescribeRhKellMia(r),
                    ["reservedForFutureUse"] = e,
                };
            },
        },
        new()
        {
            Number = "003", Name = "Product Code", Di = "=<", ContentLength = 8, Reference = "ST-001 §2.4.3",
            Decode = c =>
            {
                var alpha = c[0];
                var oooo = c[1..5];
                var t = c[5..6];
                var d = c[6..7];
                var s = c[7..8];
                return new Dictionary<string, object?>
                {
                    ["productDescriptionCodeFamily"] = alpha.ToString(),
                    ["productFamilyDescription"] = ProductFamily(alpha),
                    ["productDescriptionCode"] = $"{alpha}{oooo}",
                    ["collectionTypeOrDivisionRaw"] = $"{t}{d}{s}",
                    ["usesProductDivisions"] = d + s == "99",
                };
            },
        },
        new() { Number = "004", Name = "Expiration Date", Di = "=>", ContentLength = 6, Reference = "ST-001 §2.4.4", Decode = DateUtils.DecodeCyyjjj },
        new() { Number = "005", Name = "Expiration Date and Time", Di = "&>", ContentLength = 10, Reference = "ST-001 §2.4.5", Decode = DateUtils.DecodeCyyjjjhhmm },
        new() { Number = "006", Name = "Collection Date", Di = "=*", ContentLength = 6, Reference = "ST-001 §2.4.6", Decode = DateUtils.DecodeCyyjjj },
        new() { Number = "007", Name = "Collection Date and Time", Di = "&*", ContentLength = 10, Reference = "ST-001 §2.4.7", Decode = DateUtils.DecodeCyyjjjhhmm },
        new() { Number = "008", Name = "Production Date", Di = "=}", ContentLength = 6, Reference = "ST-001 §2.4.8", Decode = DateUtils.DecodeCyyjjj },
        new() { Number = "009", Name = "Production Date and Time", Di = "&}", ContentLength = 10, Reference = "ST-001 §2.4.9", Decode = DateUtils.DecodeCyyjjjhhmm },
        new()
        {
            Number = "010", Name = "Special Testing: General", Di = "&(", ContentLength = 5, Reference = "ST-001 §2.4.10",
            Decode = c => new Dictionary<string, object?>
            {
                ["code"] = c,
                ["note"] = "Raw code only — resolved via the ICCBBA password-protected Special Testing database (RT029), not embedded in the standard document.",
            },
        },
        new() { Number = "011", Name = "Special Testing: Red Blood Cell Antigens", Di = "={", ContentLength = 18, Retired = true, Reference = "ST-001 §2.4.11", Decode = _ => new Dictionary<string, object?>() },
        new() { Number = "012", Name = "Special Testing: Red Blood Cell Antigens — General", Di = "=\\", ContentLength = 18, Reference = "ST-001 §2.4.12", Decode = DecodeRbcAntigens },
        new() { Number = "013", Name = "Special Testing: Red Blood Cell Antigens — Finnish", Di = "&\\", ContentLength = 18, Reference = "ST-001 §2.4.13", Decode = DecodeRbcAntigens },
        new()
        {
            Number = "014", Name = "Special Testing: Platelet HLA and Platelet Specific Antigens", Di = "&{", ContentLength = 18, Reference = "ST-001 §2.4.14",
            Decode = c => new Dictionary<string, object?>
            {
                ["hlaA"] = new[] { c[..2], c[2..4] },
                ["hlaB"] = new[] { c[4..6], c[6..8] },
                ["plateletSpecificAntigensRaw"] = c[8..16],
                ["reservedForFutureUse"] = c[16..17],
                ["highTiteredAntiABInfoRaw"] = c[17..18],
                ["note"] = "HLA-A/-B and platelet-specific antigen codes are raw — resolved via Table 14/15/44 [RT013/RT014/RT044], reproduced here only structurally due to source-table ambiguity (see README.md).",
            },
        },
        new() { Number = "015", Name = "Special Testing: HLA-A and -B Alleles", Di = "=[", ContentLength = 18, Retired = true, Reference = "ST-001 §2.4.15", Decode = _ => new Dictionary<string, object?>() },
        new() { Number = "016", Name = "Special Testing: HLA-DRB1 Alleles", Di = "=\"", ContentLength = 18, Retired = true, Reference = "ST-001 §2.4.16", Decode = _ => new Dictionary<string, object?>() },
        new()
        {
            Number = "017", Name = "Container Manufacturer and Catalog Number", Di = "=)", ContentLength = 10, Reference = "ST-001 §2.4.17",
            Decode = c => new Dictionary<string, object?>
            {
                ["containerIdentificationCharacter"] = c[..1],
                ["containerIdentificationDescription"] = DescribeContainerIdChar(c[0]),
                ["manufacturerCode"] = c[1..3],
                ["catalogNumber"] = c[3..10],
            },
        },
        new() { Number = "018", Name = "Container Lot Number", Di = "&)", ContentLength = 10, Reference = "ST-001 §2.4.18", Decode = c => new Dictionary<string, object?> { ["lotNumber"] = c } },
        new()
        {
            Number = "019", Name = "Donor Identification Number", Di = "=;", ContentLength = 21, Reference = "ST-001 §2.4.19",
            Decode = c => new Dictionary<string, object?> { ["facilityIdentificationNumber"] = c[..5], ["sequenceNumber"] = c[5..21] },
        },
        new()
        {
            Number = "020", Name = "Staff Member Identification Number", Di = "='", ContentLength = 11, Reference = "ST-001 §2.4.20",
            Decode = c => new Dictionary<string, object?> { ["facilityIdentificationNumber"] = c[..5], ["staffMemberId"] = c[5..11] },
        },
        new()
        {
            Number = "021", Name = "Manufacturer and Catalog Number: Items Other Than Containers", Di = "=-", ContentLength = 10, Reference = "ST-001 §2.4.21",
            Decode = c => new Dictionary<string, object?> { ["manufacturerCode"] = c[..2], ["catalogNumber"] = c[2..10] },
        },
        new() { Number = "022", Name = "Lot Number: Items Other Than Containers", Di = "&-", ContentLength = 10, Reference = "ST-001 §2.4.22", Decode = c => new Dictionary<string, object?> { ["lotNumber"] = c } },
        new()
        {
            Number = "023", Name = "Compound Message", Di = "=+", ContentLength = 5, Reference = "ST-001 §2.4.23",
            Decode = c => new Dictionary<string, object?>
            {
                ["declaredCount"] = int.Parse(c[..2]),
                ["sequenceCode"] = c[2..5],
                ["isSpecifiedSequence"] = c[2..5] != "000",
            },
        },
        new()
        {
            Number = "024", Name = "Patient Date of Birth", Di = "=#", ContentLength = 10, Reference = "ST-001 §2.4.24",
            Decode = c => new Dictionary<string, object?> { ["locationCode"] = c[..2], ["dateOfBirth"] = $"{c[2..6]}-{c[6..8]}-{c[8..10]}" },
        },
        new()
        {
            Number = "026", Name = "Expiration Month and Year", Di = "=]", ContentLength = 6, Reference = "ST-001 §2.4.26",
            Decode = c => new Dictionary<string, object?> { ["expirationYear"] = c[..4], ["expirationMonth"] = c[4..6], ["expirationYearMonth"] = $"{c[..4]}-{c[4..6]}" },
        },
        new()
        {
            Number = "028", Name = "Product Consignment", Di = "=$", ContentLength = 16, Reference = "ST-001 §2.4.28",
            Decode = c => new Dictionary<string, object?>
            {
                ["facilityIdentificationNumber"] = c[..5], ["year"] = c[5..7], ["serialNumber"] = c[7..12],
                ["containerNumber"] = c[12..14], ["totalContainersInConsignment"] = c[14..16],
            },
        },
        new()
        {
            Number = "031", Name = "Flexible Date and Time", Di = "=(", ContentLength = 16, Reference = "ST-001 §2.4.31",
            Decode = c => new Dictionary<string, object?>
            {
                ["timeZoneCode"] = c[..1], ["timeZone"] = ReferenceTables.DescribeTimeZone(c[..1]),
                ["reservedForFutureUse"] = c[1..2],
                ["typeOfTimeCode"] = c[2..4], ["typeOfTime"] = ReferenceTables.DescribeTypeOfTime(c[2..4]),
                ["date"] = $"{c[4..8]}-{c[8..10]}-{c[10..12]}",
                ["time"] = $"{c[12..14]}:{c[14..16]}",
            },
        },
        new() { Number = "032", Name = "Product Divisions", Di = "=,", ContentLength = 6, Reference = "ST-001 §2.4.32", Decode = c => new Dictionary<string, object?> { ["divisionCode"] = c } },
        new()
        {
            Number = "033", Name = "Processing Facility Information Code", Di = "&+", ContentLength = 11, Reference = "ST-001 §2.4.33",
            Decode = c => new Dictionary<string, object?> { ["facilityIdentificationNumberOfProcessor"] = c[..5], ["facilityDefinedProductCode"] = c[5..11] },
        },
        new()
        {
            Number = "034", Name = "Processor Product Identification Code", Di = "=/", ContentLength = 16, Reference = "ST-001 §2.4.34",
            Decode = c => new Dictionary<string, object?>
            {
                ["facilityIdentificationNumberOfProcessor"] = c[..5], ["facilityDefinedProductCode"] = c[5..11], ["productDescriptionCode"] = c[11..16],
            },
        },
        new() { Number = "035", Name = "MPHO Lot Number", Di = "&,1", ContentLength = 18, Reference = "ST-001 §2.4.35", Decode = c => new Dictionary<string, object?> { ["lotNumber"] = c } },
        new() { Number = "036", Name = "MPHO Supplemental Identification Number", Di = "&,2", ContentLength = 18, Reference = "ST-001 §2.4.36", Decode = c => new Dictionary<string, object?> { ["supplementalId"] = c } },
        new() { Number = "037", Name = "Global Registration Identifier for Donors", Di = "&,3", ContentLength = 19, Retired = true, Reference = "ST-001 §2.4.37", Decode = _ => new Dictionary<string, object?>() },
        new()
        {
            Number = "039", Name = "Global Registration Identifier for Donors", Di = "&:", ContentLength = 19, Reference = "ST-001 §2.4.39",
            Decode = c =>
            {
                var prefix = c[..17];
                var bb = c[17..19];
                return new Dictionary<string, object?>
                {
                    ["issuingOrganizationNumber"] = c[..4], ["registrationDonorIdentifier"] = c[4..17],
                    ["checksum"] = bb, ["checksumValid"] = Checksum.CalculateGridChecksum(prefix) == bb,
                };
            },
        },
        new()
        {
            Number = "040", Name = "Chain of Identity Identifier", Di = "&/", ContentLength = 15, Reference = "ST-001 §2.4.40",
            Decode = c => new Dictionary<string, object?>
            {
                ["literal"] = c[..2], ["facilityIdentificationNumber"] = c[2..7], ["year"] = c[7..9], ["sequenceNumber"] = c[9..15],
            },
        },
    };

    public static readonly IReadOnlyDictionary<string, StructureSpec> FixedByDi = Fixed.ToDictionary(s => s.Di, s => s);
}
