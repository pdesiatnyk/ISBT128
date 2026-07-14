using System;
using System.Collections.Generic;

namespace Iccbba.Isbt128
{
    /// <summary>One decoded ISBT 128 (or ISBT 128-derived) data structure found within a barcode.</summary>
    public sealed class ParsedSegment
    {
        /// <summary>e.g. "001"; <c>null</c> for non-ICCBBA/unrecognized segments.</summary>
        public string DataStructureNumber { get; set; }

        /// <summary>Human-readable structure name, e.g. "Donation Identification Number".</summary>
        public string Name { get; set; }

        /// <summary>The raw data identifier characters as scanned, e.g. "=A", "&amp;,4".</summary>
        public string DataIdentifier { get; set; }

        /// <summary>The raw data content characters (excludes the data identifier, except DIN's shared 2nd char).</summary>
        public string RawContent { get; set; }

        /// <summary>Structure-specific decoded fields. Empty for opaque/unrecognized/retired segments.</summary>
        public IReadOnlyDictionary<string, object> Fields { get; set; } = new Dictionary<string, object>();

        /// <summary>True for data structures retired by ICCBBA (recognized for compatibility, not fully decoded).</summary>
        public bool IsRetired { get; set; }

        /// <summary>True for non-ICCBBA / nationally-defined segments whose content could not be decoded.</summary>
        public bool IsOpaque { get; set; }

        /// <summary>Citation into the standard, e.g. "ST-001 §2.4.1".</summary>
        public string StandardReference { get; set; }
    }

    public sealed class CompoundMessageInfo
    {
        /// <summary>Declared number of data structures following the Compound Message header.</summary>
        public int DeclaredCount { get; set; }

        /// <summary>Raw 3-digit <c>bbb</c> sequence code ("000" = unspecified sequence).</summary>
        public string SequenceCode { get; set; }

        public bool IsSpecifiedSequence { get; set; }
    }

    /// <summary>The result of parsing a barcode data string.</summary>
    public sealed class ParsedBarcode
    {
        public string Raw { get; set; }
        public bool IsCompoundMessage { get; set; }
        public CompoundMessageInfo CompoundMessage { get; set; }

        /// <summary>True when the input was recognized as an SEC eye-readable text string (ST-012 §2.3).</summary>
        public bool IsSecText { get; set; }

        public IReadOnlyList<ParsedSegment> Segments { get; set; }

        // --- Convenience accessors (present only when the corresponding structure occurs) ---
        public IReadOnlyDictionary<string, object> DonationIdentificationNumber { get; internal set; }
        public IReadOnlyDictionary<string, object> ProductCode { get; internal set; }
        public IReadOnlyDictionary<string, object> ExpirationDate { get; internal set; }
        public IReadOnlyDictionary<string, object> ProductDivisions { get; internal set; }
        public IReadOnlyDictionary<string, object> Sec { get; internal set; }
        public IReadOnlyDictionary<string, object> Udi { get; internal set; }
    }

    /// <summary>ST-017 UDI Device Identifier: the decoded Processor Product Identification Code [034].</summary>
    public sealed class UdiDeviceIdentifier
    {
        public string FacilityIdentificationNumberOfProcessor { get; set; }
        public string FacilityDefinedProductCode { get; set; }
        public string ProductDescriptionCode { get; set; }
    }

    /// <summary>The decoded Donation Identification Number [001], as carried by a UDI Production Identifier.</summary>
    public sealed class UdiDonationIdentificationNumber
    {
        public string FacilityIdentificationNumber { get; set; }
        public string Year { get; set; }
        public string SequenceNumber { get; set; }
        public string DonationIdentificationNumber { get; set; }
        public string FlagCharacters { get; set; }
        public string FlagMeaning { get; set; }
        public bool IsChecksumFlag { get; set; }
        public bool? ChecksumValid { get; set; }
    }

    /// <summary>ST-017 UDI Production Identifiers grouped by type. Present only when the corresponding
    /// data structure occurs in the barcode.</summary>
    public sealed class UdiProductionIdentifiers
    {
        public UdiDonationIdentificationNumber DonationIdentificationNumber { get; set; }
        public string ProductDivisions { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? ProductionDate { get; set; }
        public string LotNumber { get; set; }
    }

    /// <summary>The result of <see cref="Isbt128Parser.ParseUdi"/>: a barcode reshaped into ST-017's
    /// UDI grouping of a single Device Identifier (DS034) plus its Production Identifiers.</summary>
    public sealed class UdiResult
    {
        public string Raw { get; set; }

        /// <summary><c>null</c> when the barcode has no Processor Product Identification Code [034].</summary>
        public UdiDeviceIdentifier DI { get; set; }

        public UdiProductionIdentifiers PI { get; set; }
    }

    /// <summary>Input for <see cref="Isbt128Parser.BuildUdi"/>: the fields needed to encode a Device
    /// Identifier (DS034). All fields are fixed-length per ST-001 Table 2.</summary>
    public sealed class BuildUdiDeviceIdentifierInput
    {
        public string FacilityIdentificationNumberOfProcessor { get; set; }
        public string FacilityDefinedProductCode { get; set; }
        public string ProductDescriptionCode { get; set; }
    }

    /// <summary>Input for <see cref="Isbt128Parser.BuildUdi"/>: the fields needed to encode a Donation
    /// Identification Number (DS001).</summary>
    public sealed class BuildUdiDonationIdentificationNumberInput
    {
        public string FacilityIdentificationNumber { get; set; }
        public string Year { get; set; }
        public string SequenceNumber { get; set; }

        /// <summary>When omitted, auto-computed as the Type 3 mod-37,2 checksum flag (ST-001 Appendix A.2).</summary>
        public string FlagCharacters { get; set; }
    }

    /// <summary>Input for <see cref="Isbt128Parser.BuildUdi"/>: ST-017 UDI Production Identifiers.
    /// <see cref="DonationIdentificationNumber"/> and <see cref="ProductDivisions"/> are mandatory
    /// (ST-017 §4.1); the rest are conditional, included only if present on the label.</summary>
    public sealed class BuildUdiProductionIdentifiersInput
    {
        public BuildUdiDonationIdentificationNumberInput DonationIdentificationNumber { get; set; }
        public string ProductDivisions { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? ProductionDate { get; set; }
        public string LotNumber { get; set; }
    }

    /// <summary>Input for <see cref="Isbt128Parser.BuildUdi"/>.</summary>
    public sealed class BuildUdiInput
    {
        public BuildUdiDeviceIdentifierInput DI { get; set; }
        public BuildUdiProductionIdentifiersInput PI { get; set; }
    }
}
