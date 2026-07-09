namespace Iccbba.Isbt128;

/// <summary>
/// Reference tables reproduced from ST-001 §3.1 (embedded in the standard document, not requiring
/// ICCBBA's externally-hosted licensed databases). See README.md for the fully-decoded vs.
/// raw-code-only policy.
/// </summary>
public static class ReferenceTables
{
    /// <summary>Table 3 — DIN flag characters <c>ff</c> [RT004] (ST-001 §3.1).</summary>
    public static string DescribeDinFlag(string ff)
    {
        if (ff == "00") return "Flag not used; null value";
        if (int.TryParse(ff, out var value))
        {
            if (value is >= 1 and <= 4) return $"Container {value} of a set";
            if (value == 5) return "Second (or repeated) \"demand-printed\" label";
            if (value == 6) return "Pilot tube label";
            if (value == 7) return "Test tube label";
            if (value == 8) return "Donor record label";
            if (value == 9) return "Sample tube for NAT testing";
            if (value == 10) return "Samples for bacterial testing";
            if (value == 11) return "Match with Unit label";
            if (value == 12) return "Affixed partial label";
            if (value == 13) return "Attached label (intended to be used with affixed partial label)";
            if (value == 14) return "Reserved for future assignment";
            if (value is >= 15 and <= 19) return $"Container {value - 14 + 4} of a set";
            if (value is >= 20 and <= 59) return "Reserved for assignment/use by the local facility (FIN-specific meaning)";
            if (value is >= 60 and <= 96) return "ISO/IEC 7064 modulus 37-2 check character on the preceding 13 DIN characters";
            if (value is >= 97 and <= 99) return "Reserved for future assignment";
        }
        return "Reserved for future assignment";
    }

    public static bool IsDinChecksumFlag(string ff) => int.TryParse(ff, out var value) && value is >= 60 and <= 96;

    /// <summary>Table 4 — Blood Groups [ABO and RhD], including type-of-collection column [RT005] (ST-001 §3.1).</summary>
    private static readonly Dictionary<string, string> BloodGroupGg = new()
    {
        ["95"] = "O RhD negative", ["51"] = "O RhD positive",
        ["06"] = "A RhD negative", ["62"] = "A RhD positive",
        ["17"] = "B RhD negative", ["73"] = "B RhD positive",
        ["28"] = "AB RhD negative", ["84"] = "AB RhD positive",
        ["55"] = "O (collection use unspecified)", ["66"] = "A (collection use unspecified)",
        ["77"] = "B (collection use unspecified)", ["88"] = "AB (collection use unspecified)",
        ["D6"] = "para-Bombay, RhD negative", ["E6"] = "para-Bombay, RhD positive",
        ["G6"] = "Bombay, RhD negative", ["H6"] = "Bombay, RhD positive",
        ["I6"] = "O para-Bombay, RhD negative", ["J6"] = "O para-Bombay, RhD positive",
        ["K6"] = "A para-Bombay, RhD negative", ["L6"] = "B para-Bombay, RhD negative",
        ["M6"] = "AB para-Bombay, RhD negative", ["N6"] = "A para-Bombay, RhD positive",
        ["O6"] = "B para-Bombay, RhD positive", ["Q6"] = "AB para-Bombay, RhD positive",
        ["A0"] = "Group A, Pooled RhD", ["B0"] = "Group B, Pooled RhD", ["C0"] = "Group AB, Pooled RhD [Pooled Products]",
        ["D0"] = "Group O, Pooled RhD", ["E0"] = "Pooled ABO, RhD Positive", ["F0"] = "Pooled ABO, RhD Negative",
        ["G0"] = "Pooled ABO, Pooled RhD", ["H0"] = "Pooled ABO (RhD not specified)",
        ["I0"] = "A1", ["J0"] = "A2", ["K0"] = "A1B", ["L0"] = "A2B",
    };

    /// <summary>Table 5 — Data Structure 002 Special Messages [RT006] (ST-001 §3.1).</summary>
    private static readonly Dictionary<string, string> SpecialMessagesGg = new()
    {
        ["00"] = "No ABO or Rh information is available",
        ["Ma"] = "Autologous collection", ["Mb"] = "Biohazardous", ["Md"] = "Discard (to be destroyed)",
        ["Mf"] = "For fractionation use only", ["Mq"] = "Quarantine/hold for further testing or processing",
        ["Mr"] = "For research use only", ["Mx"] = "Not for transfusion based on test results",
        ["T1"] = "ABO not specified, RhD positive (tissue only)", ["T2"] = "ABO not specified, RhD negative (tissue only)",
        ["T3"] = "ABO not specified, RhD not specified (tissue only)", ["T4"] = "Autologous collection/in quarantine (tissue only)",
        ["T5"] = "See outer packaging for product status (tissue only)", ["T6"] = "Must be sterilized before release (tissue only)",
    };

    /// <summary>Blood Groups [002] <c>gg</c> field: resolves to an ABO/RhD blood group or a special message (Tables 4 &amp; 5).</summary>
    public static (string Kind, string Description) DescribeBloodGroupGg(string gg)
    {
        if (BloodGroupGg.TryGetValue(gg, out var bg)) return ("blood-group", bg);
        if (SpecialMessagesGg.TryGetValue(gg, out var sm)) return ("special-message", sm);
        return ("unknown", $"Unrecognized code '{gg}'");
    }

    /// <summary>
    /// Table 6 — Rh, Kell, and Mia/Mur Phenotypes [RT007] (ST-001 §3.1). Maps the Blood Groups [002]
    /// <c>r</c> field to Kell antibody test result plus C/c/E/e phenotype (or Mia/Mur result for U/V).
    /// </summary>
    public static Dictionary<string, object?> DescribeRhKellMia(string r)
    {
        Dictionary<string, (string Kell, string C, string CLower, string E, string ELower)> table = new()
        {
            ["0"] = ("No Information", "No Information", "No Information", "No Information", "No Information"),
            ["1"] = ("Negative", "negative", "positive", "negative", "positive"),
            ["2"] = ("Positive", "positive", "positive", "negative", "positive"),
            ["3"] = ("Negative", "positive", "positive", "positive", "positive"),
            ["4"] = ("Positive", "positive", "positive", "positive", "negative"),
            ["5"] = ("Negative", "negative", "positive", "positive", "positive"),
            ["6"] = ("Positive", "negative", "positive", "positive", "negative"),
            ["7"] = ("Negative", "positive", "negative", "negative", "positive"),
            ["8"] = ("Positive", "positive", "negative", "positive", "positive"),
            ["9"] = ("Negative", "positive", "negative", "positive", "negative"),
            ["X"] = ("Positive", "negative", "No Information", "negative", "No Information"),
        };
        if (table.TryGetValue(r, out var t))
        {
            return new Dictionary<string, object?> { ["kell"] = t.Kell, ["c"] = t.C, ["cLower"] = t.CLower, ["e"] = t.E, ["eLower"] = t.ELower };
        }
        if (r == "U") return new Dictionary<string, object?> { ["mia"] = "negative" };
        if (r == "V") return new Dictionary<string, object?> { ["mia"] = "positive" };
        if (r == "W") return new Dictionary<string, object?> { ["special"] = "Special Testing bar code present and must be scanned and interpreted" };
        return new Dictionary<string, object?> { ["unknown"] = $"Unrecognized code '{r}'" };
    }

    /// <summary>Table 19 — Dimensions Symbols [RT037] (ST-001 §3.1, Data Structure 029).</summary>
    private static readonly Dictionary<string, string> DimensionSymbols = new()
    {
        ["01"] = "Dimension is equal to the expressed value within a tolerance defined by the facility",
        ["02"] = "Dimension is greater than the expressed value",
        ["03"] = "Dimension is greater than or equal to the expressed value",
        ["04"] = "Dimension is less than the expressed value",
        ["05"] = "Dimension is less than or equal to the expressed value",
        ["06"] = "Dimension is the nominal value as defined within a circular of information/package insert",
    };
    public static string DescribeDimensionSymbol(string aa) => DimensionSymbols.GetValueOrDefault(aa, $"Unrecognized symbol code '{aa}'");

    /// <summary>Table 20 — Dimensions [RT038] (ST-001 §3.1, Data Structure 029).</summary>
    private static readonly Dictionary<string, (string Unit, string Description)> DimensionUnits = new()
    {
        ["0001"] = ("mL", "Volume of the associated product including anticoagulant/additive"),
        ["0002"] = ("mm", "Length of the associated product"),
        ["0003"] = ("mm", "Width of the associated product"),
        ["0004"] = ("mm", "Height of the associated product"),
        ["0005"] = ("mm", "Particle size of the associated product"),
        ["0006"] = ("cm²", "Area of the associated product"),
        ["0007"] = ("1E9", "Total number of platelets in the container"),
        ["0008"] = ("g", "Weight of associated product excluding container, including anticoagulant/additive"),
        ["0009"] = ("g", "Tare weight of container"),
        ["0010"] = ("g", "Tare weight of container and attached tubing"),
        ["0011"] = ("rings", "Length of trachea expressed in number of rings"),
    };
    public static (string Unit, string Description) DescribeDimensionUnit(string bbbb) =>
        DimensionUnits.GetValueOrDefault(bbbb, ("unknown", $"Unrecognized dimension code '{bbbb}'"));

    /// <summary>Table 21 — Dimensions Decimal Point [RT039] (ST-001 §3.1, Data Structure 029).</summary>
    public static string ApplyDimensionDecimalPoint(string ccccc, string d) => d switch
    {
        "0" => ccccc,
        "1" => $"{ccccc[..4]}.{ccccc[4..]}",
        "2" => $"{ccccc[..3]}.{ccccc[3..]}",
        "3" => $"{ccccc[..2]}.{ccccc[2..]}",
        "4" => $"{ccccc[..1]}.{ccccc[1..]}",
        "5" => $".{ccccc}",
        _ => ccccc,
    };

    /// <summary>Table 22 — RBC Serological Results [RT040] (ST-001 §3.1, Data Structure 030).</summary>
    private static readonly Dictionary<string, string> RbcSerologicalResult = new()
    {
        ["01"] = "Negative – Test methodology not specified",
        ["02"] = "Positive – Test methodology not specified",
        ["03"] = "Negative – Serological testing",
        ["04"] = "Positive – Serological testing",
        ["05"] = "Negative – Predicted phenotype based on genotyping",
        ["06"] = "Positive – Predicted phenotype based on genotyping",
    };
    public static string DescribeRbcSerologicalResult(string rr) => RbcSerologicalResult.GetValueOrDefault(rr, $"Unrecognized result code '{rr}'");

    /// <summary>Table 23 — Number of Tests [RT041] (ST-001 §3.1, Data Structure 030).</summary>
    private static readonly Dictionary<string, string> NumberOfTestsTable = new()
    {
        ["01"] = "Tested once on this collection",
        ["02"] = "Tested once on prior collection",
        ["03"] = "Tested ≥ twice on different collections (current and historic) with concordant results",
        ["04"] = "Tested ≥ twice on different collections (historic only) with concordant results",
        ["05"] = "Tested ≥ twice on this collection only, different samples, with concordant results",
        ["06"] = "Test history not specified",
    };
    public static string DescribeNumberOfTests(string ss) => NumberOfTestsTable.GetValueOrDefault(ss, $"Unrecognized code '{ss}'");

    /// <summary>Table 24 — Time Zone [RT045] (ST-001 §3.1, Data Structure 031).</summary>
    private static readonly Dictionary<string, string> TimeZoneTable = new()
    {
        ["1"] = "Local time zone of facility assigning the date",
        ["2"] = "Coordinated Universal Time (UTC)",
    };
    public static string DescribeTimeZone(string z) => TimeZoneTable.GetValueOrDefault(z, $"Unrecognized code '{z}'");

    /// <summary>Table 25 — Type of Time [RT046] (ST-001 §3.1, Data Structure 031).</summary>
    private static readonly Dictionary<string, string> TypeOfTimeTable = new()
    {
        ["01"] = "Expiration date and time",
        ["02"] = "Collection date and time",
        ["03"] = "Production date and time",
        ["04"] = "Cross Clamp date and time",
        ["05"] = "Time of preservation",
        ["06"] = "Time of death of donor",
    };
    public static string DescribeTypeOfTime(string tt) => TypeOfTimeTable.GetValueOrDefault(tt, $"Unrecognized code '{tt}'");

    /// <summary>ST-012 §2.2.2 — SEC Coding System Identifier (3-row table, safe to embed verbatim).</summary>
    private static readonly Dictionary<string, string> SecCodingSystemTable = new()
    {
        ["A"] = "ISBT 128", ["B"] = "Eurocode", ["E"] = "EUTC (European Union Tissue Code)",
    };
    public static string DescribeSecCodingSystem(string id) => SecCodingSystemTable.GetValueOrDefault(id, $"Unrecognized coding system identifier '{id}'");

    /// <summary>
    /// Generic decoder for the paired-antigen result tables RT009 (Table 9) and RT010 (Table 10):
    /// every antigen position pair (positions 2-9, and the continuation positions 10-15/16) shares
    /// this same digit 0-9 legend, verified identical across every pair column in both tables.
    /// Position 1 (Rh) is a distinct 10-value phenotype enumeration, not a pair (see
    /// <see cref="DescribeRhPhenotype"/>).
    /// </summary>
    public static readonly Dictionary<string, (string A, string B)> PairedResultLegend = new()
    {
        ["0"] = ("nt", "nt"), ["1"] = ("nt", "neg"), ["2"] = ("nt", "pos"),
        ["3"] = ("neg", "nt"), ["4"] = ("neg", "neg"), ["5"] = ("neg", "pos"),
        ["6"] = ("pos", "nt"), ["7"] = ("pos", "neg"), ["8"] = ("pos", "pos"),
        ["9"] = ("ni", "ni"),
    };

    /// <summary>Table 9 [RT009] position 1 — Rh phenotype enumeration (ST-001 §3.1, Data Structure 012).</summary>
    private static readonly Dictionary<string, string> RhPhenotypeTable = new()
    {
        ["0"] = "C+c-E+e-", ["1"] = "C+c+E+e-", ["2"] = "C-c+E+e-", ["3"] = "C+c-E+e+", ["4"] = "C+c+E+e+",
        ["5"] = "C-c+E+e+", ["6"] = "C+c-E-e+", ["7"] = "C+c+E-e+", ["8"] = "C-c+E-e+", ["9"] = "ni",
    };
    public static string DescribeRhPhenotype(string value) => RhPhenotypeTable.GetValueOrDefault(value, $"Unrecognized code '{value}'");

    /// <summary>Table 9 [RT009] positions 2-9 antigen names (ST-001 §3.1, Data Structure 012 — General); reused for Table 10 (Finnish).</summary>
    public static readonly string[] Rt009AntigenNames = ["K", "k", "Cw", "Mia", "M", "N", "S", "s", "U", "P1", "Lua", "Kpa", "Lea", "Leb", "Fya", "Fyb"];

    // Table 18 [RT019] (ST-001 §3.1, Data Structure 027 — TTI Marker) is intentionally not decoded
    // to named markers/results here — see Structures.cs for the rationale (internally inconsistent
    // merged-cell HTML table, documented in README.md).
}
