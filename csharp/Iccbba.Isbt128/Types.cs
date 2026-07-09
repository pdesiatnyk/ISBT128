namespace Iccbba.Isbt128;

/// <summary>One decoded ISBT 128 (or ISBT 128-derived) data structure found within a barcode.</summary>
public sealed class ParsedSegment
{
    /// <summary>e.g. "001"; <c>null</c> for non-ICCBBA/unrecognized segments.</summary>
    public string? DataStructureNumber { get; init; }

    /// <summary>Human-readable structure name, e.g. "Donation Identification Number".</summary>
    public required string Name { get; init; }

    /// <summary>The raw data identifier characters as scanned, e.g. "=A", "&amp;,4".</summary>
    public required string DataIdentifier { get; init; }

    /// <summary>The raw data content characters (excludes the data identifier, except DIN's shared 2nd char).</summary>
    public required string RawContent { get; init; }

    /// <summary>Structure-specific decoded fields. Empty for opaque/unrecognized/retired segments.</summary>
    public IReadOnlyDictionary<string, object?> Fields { get; init; } = new Dictionary<string, object?>();

    /// <summary>True for data structures retired by ICCBBA (recognized for compatibility, not fully decoded).</summary>
    public bool IsRetired { get; init; }

    /// <summary>True for non-ICCBBA / nationally-defined segments whose content could not be decoded.</summary>
    public bool IsOpaque { get; init; }

    /// <summary>Citation into the standard, e.g. "ST-001 §2.4.1".</summary>
    public required string StandardReference { get; init; }
}

public sealed class CompoundMessageInfo
{
    /// <summary>Declared number of data structures following the Compound Message header.</summary>
    public required int DeclaredCount { get; init; }

    /// <summary>Raw 3-digit <c>bbb</c> sequence code ("000" = unspecified sequence).</summary>
    public required string SequenceCode { get; init; }

    public required bool IsSpecifiedSequence { get; init; }
}

/// <summary>The result of parsing a barcode data string.</summary>
public sealed class ParsedBarcode
{
    public required string Raw { get; init; }
    public bool IsCompoundMessage { get; init; }
    public CompoundMessageInfo? CompoundMessage { get; init; }

    /// <summary>True when the input was recognized as an SEC eye-readable text string (ST-012 §2.3).</summary>
    public bool IsSecText { get; init; }

    public required IReadOnlyList<ParsedSegment> Segments { get; init; }

    // --- Convenience accessors (present only when the corresponding structure occurs) ---
    public IReadOnlyDictionary<string, object?>? DonationIdentificationNumber { get; internal set; }
    public IReadOnlyDictionary<string, object?>? ProductCode { get; internal set; }
    public IReadOnlyDictionary<string, object?>? ExpirationDate { get; internal set; }
    public IReadOnlyDictionary<string, object?>? ProductDivisions { get; internal set; }
    public IReadOnlyDictionary<string, object?>? Sec { get; internal set; }
    public IReadOnlyDictionary<string, object?>? Udi { get; internal set; }
}

/// <summary>ST-017 UDI Device Identifier: the decoded Processor Product Identification Code [034].</summary>
public sealed class UdiDeviceIdentifier
{
    public required string FacilityIdentificationNumberOfProcessor { get; init; }
    public required string FacilityDefinedProductCode { get; init; }
    public required string ProductDescriptionCode { get; init; }
}

/// <summary>The decoded Donation Identification Number [001], as carried by a UDI Production Identifier.</summary>
public sealed class UdiDonationIdentificationNumber
{
    public required string FacilityIdentificationNumber { get; init; }
    public required string Year { get; init; }
    public required string SequenceNumber { get; init; }
    public required string DonationIdentificationNumber { get; init; }
    public required string FlagCharacters { get; init; }
    public required string FlagMeaning { get; init; }
    public bool IsChecksumFlag { get; init; }
    public bool? ChecksumValid { get; init; }
}

/// <summary>ST-017 UDI Production Identifiers grouped by type. Present only when the corresponding
/// data structure occurs in the barcode.</summary>
public sealed class UdiProductionIdentifiers
{
    public UdiDonationIdentificationNumber? DonationIdentificationNumber { get; init; }
    public string? ProductDivisions { get; init; }
    public DateOnly? ExpirationDate { get; init; }
    public DateOnly? ProductionDate { get; init; }
    public string? LotNumber { get; init; }
}

/// <summary>The result of <see cref="Isbt128Parser.ParseUdi"/>: a barcode reshaped into ST-017's
/// UDI grouping of a single Device Identifier (DS034) plus its Production Identifiers.</summary>
public sealed class UdiResult
{
    public required string Raw { get; init; }

    /// <summary><c>null</c> when the barcode has no Processor Product Identification Code [034].</summary>
    public UdiDeviceIdentifier? DI { get; init; }

    public required UdiProductionIdentifiers PI { get; init; }
}
