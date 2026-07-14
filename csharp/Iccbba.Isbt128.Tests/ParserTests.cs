namespace Iccbba.Isbt128.Tests;

public class ParserTests
{
    // ST-017 §3.1 Figure 2: DIN form example.
    [Fact]
    public void ParsesStandaloneDin()
    {
        var result = Isbt128Parser.Parse("=A99991712345600");
        Assert.Single(result.Segments);
        var seg = result.Segments[0];
        Assert.Equal("001", seg.DataStructureNumber);
        Assert.Equal("A9999", seg.Fields["facilityIdentificationNumber"]);
        Assert.Equal("17", seg.Fields["year"]);
        Assert.Equal("123456", seg.Fields["sequenceNumber"]);
        Assert.Equal("00", seg.Fields["flagCharacters"]);
        Assert.Same(seg.Fields, result.DonationIdentificationNumber);
        Assert.True(Isbt128Parser.Check("=A99991712345600"));
    }

    // ST-017 §2.1 Figure 1: PPIC [034] example.
    [Fact]
    public void ParsesStandalonePpic()
    {
        var result = Isbt128Parser.Parse("=/A9997AB3456T0123");
        var seg = result.Segments[0];
        Assert.Equal("034", seg.DataStructureNumber);
        Assert.Equal("A9997", seg.Fields["facilityIdentificationNumberOfProcessor"]);
        Assert.Equal("AB3456", seg.Fields["facilityDefinedProductCode"]);
        Assert.Equal("T0123", seg.Fields["productDescriptionCode"]);
    }

    [Fact]
    public void ValidatesDinType3ChecksumFlag()
    {
        // 13-char DIN "G123417654321" has ISO 7064 mod 37-2 checksum 10 -> flag 70 (Appendix A.2).
        var result = Isbt128Parser.Parse("=G12341765432170");
        var seg = result.Segments[0];
        Assert.Equal(true, seg.Fields["isChecksumFlag"]);
        Assert.Equal(true, seg.Fields["checksumValid"]);
    }

    [Fact]
    public void FlagsIncorrectDinChecksumAsInvalidWithoutThrowing()
    {
        var result = Isbt128Parser.Parse("=G12341765432171");
        Assert.Equal(false, result.Segments[0].Fields["checksumValid"]);
    }

    [Fact]
    public void ParsesTwoDataStructuresConcatenatedWithNoSeparator()
    {
        var result = Isbt128Parser.Parse("=A99991712345600=,000012");
        Assert.Equal(2, result.Segments.Count);
        Assert.Equal("001", result.Segments[0].DataStructureNumber);
        Assert.Equal("032", result.Segments[1].DataStructureNumber);
        Assert.Equal("000012", result.Segments[1].Fields["divisionCode"]);
        Assert.False(result.IsCompoundMessage);
    }

    // ST-017 §4.3.1: unspecified-sequence compound message.
    [Fact]
    public void ParsesUnspecifiedSequenceCompoundMessage()
    {
        const string barcode = "=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031";
        var result = Isbt128Parser.Parse(barcode);
        Assert.True(result.IsCompoundMessage);
        Assert.Equal(4, result.CompoundMessage!.DeclaredCount);
        Assert.False(result.CompoundMessage.IsSpecifiedSequence);
        Assert.Equal(5, result.Segments.Count);
        Assert.Equal(new[] { "023", "034", "001", "032", "004" }, result.Segments.Select(s => s.DataStructureNumber));
        Assert.True(Isbt128Parser.Check(barcode));
    }

    // ST-017 §4.3.2: specified-sequence compound message (RT017 message 035).
    [Fact]
    public void ParsesSpecifiedSequenceCompoundMessage()
    {
        const string barcode = "=+04035=/A9997XYZ100T0479=,000012=A99991712345600=>019031";
        var result = Isbt128Parser.Parse(barcode);
        Assert.True(result.CompoundMessage!.IsSpecifiedSequence);
        Assert.Equal("035", result.CompoundMessage.SequenceCode);
    }

    // ST-017 §5: full UDI compound message (DI + DIN + serial + expiry + mfg date + lot number).
    [Fact]
    public void ParsesFullUdiCompoundMessageExample()
    {
        const string barcode = "=+06000=/A9999XYZ100T0476=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123";
        var result = Isbt128Parser.Parse(barcode);
        Assert.Equal(6, result.CompoundMessage!.DeclaredCount);
        Assert.Equal(7, result.Segments.Count);
        Assert.NotNull(result.Udi);
        var lot = Assert.IsType<Dictionary<string, object?>>(result.Udi!["lotNumber"]);
        Assert.Equal("000000000000XYZ123", lot["lotNumber"]);
    }

    // ST-017 §4.3.1: ParseUdi groups the same compound message into DI + PI.
    [Fact]
    public void ParseUdiGroupsDeviceAndProductionIdentifiers()
    {
        const string barcode = "=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031";
        var udi = Isbt128Parser.ParseUdi(barcode);
        Assert.Equal(barcode, udi.Raw);
        Assert.NotNull(udi.DI);
        Assert.Equal("A9997", udi.DI!.FacilityIdentificationNumberOfProcessor);
        Assert.Equal("XYZ100", udi.DI!.FacilityDefinedProductCode);
        Assert.Equal("T0479", udi.DI!.ProductDescriptionCode);
        Assert.NotNull(udi.PI.DonationIdentificationNumber);
        Assert.Equal("A9999", udi.PI.DonationIdentificationNumber!.FacilityIdentificationNumber);
        Assert.Equal("000012", udi.PI.ProductDivisions);
        Assert.Equal(new DateOnly(2019, 1, 31), udi.PI.ExpirationDate);
        Assert.Null(udi.PI.ProductionDate);
        Assert.Null(udi.PI.LotNumber);
    }

    [Fact]
    public void ParseUdiReturnsNullDeviceIdentifierForNonUdiBarcode()
    {
        var udi = Isbt128Parser.ParseUdi("=A99991712345600");
        Assert.Null(udi.DI);
        Assert.NotNull(udi.PI.DonationIdentificationNumber);
        Assert.Null(udi.PI.ProductDivisions);
        Assert.Null(udi.PI.ExpirationDate);
        Assert.Null(udi.PI.ProductionDate);
        Assert.Null(udi.PI.LotNumber);
    }

    // ST-017 §4.3.1: BuildUdi is the inverse of ParseUdi — round-trips through both.
    [Fact]
    public void BuildUdiRoundTripsThroughParseUdi()
    {
        var input = new BuildUdiInput
        {
            DI = new BuildUdiDeviceIdentifierInput
            {
                FacilityIdentificationNumberOfProcessor = "A9997",
                FacilityDefinedProductCode = "XYZ100",
                ProductDescriptionCode = "T0479",
            },
            PI = new BuildUdiProductionIdentifiersInput
            {
                DonationIdentificationNumber = new BuildUdiDonationIdentificationNumberInput
                {
                    FacilityIdentificationNumber = "A9999",
                    Year = "17",
                    SequenceNumber = "123456",
                    FlagCharacters = "00",
                },
                ProductDivisions = "000012",
                ExpirationDate = new DateOnly(2019, 1, 31),
            },
        };

        const string expected = "=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031";
        var barcode = Isbt128Parser.BuildUdi(input);
        Assert.Equal(expected, barcode);

        var udi = Isbt128Parser.ParseUdi(barcode);
        Assert.Equal("A9997", udi.DI!.FacilityIdentificationNumberOfProcessor);
        Assert.Equal("A9999", udi.PI.DonationIdentificationNumber!.FacilityIdentificationNumber);
        Assert.Equal("000012", udi.PI.ProductDivisions);
        Assert.Equal(new DateOnly(2019, 1, 31), udi.PI.ExpirationDate);
    }

    // ST-001 Appendix A.2 worked example: DIN "G123417654321" -> Type 3 flag "70".
    [Fact]
    public void BuildUdiAutoComputesDinType3FlagWhenOmitted()
    {
        var input = new BuildUdiInput
        {
            DI = new BuildUdiDeviceIdentifierInput
            {
                FacilityIdentificationNumberOfProcessor = "A9997",
                FacilityDefinedProductCode = "XYZ100",
                ProductDescriptionCode = "T0479",
            },
            PI = new BuildUdiProductionIdentifiersInput
            {
                DonationIdentificationNumber = new BuildUdiDonationIdentificationNumberInput
                {
                    FacilityIdentificationNumber = "G1234",
                    Year = "17",
                    SequenceNumber = "654321",
                },
                ProductDivisions = "000000",
            },
        };

        var barcode = Isbt128Parser.BuildUdi(input);
        Assert.Contains("=G12341765432170", barcode);
    }

    [Fact]
    public void BuildUdiThrowsOnWrongFieldLength()
    {
        var input = new BuildUdiInput
        {
            DI = new BuildUdiDeviceIdentifierInput
            {
                FacilityIdentificationNumberOfProcessor = "A999", // 4 chars, should be 5
                FacilityDefinedProductCode = "XYZ100",
                ProductDescriptionCode = "T0479",
            },
            PI = new BuildUdiProductionIdentifiersInput
            {
                DonationIdentificationNumber = new BuildUdiDonationIdentificationNumberInput
                {
                    FacilityIdentificationNumber = "A9999",
                    Year = "17",
                    SequenceNumber = "123456",
                },
                ProductDivisions = "000012",
            },
        };

        var ex = Assert.Throws<Isbt128BuildException>(() => Isbt128Parser.BuildUdi(input));
        Assert.Equal("DI.FacilityIdentificationNumberOfProcessor", ex.Field);
    }

    // ST-012 §6.2 "Data Matrix symbol 1": DIN + Blood Groups + Product Code + Expiry(+Time) + SEC.
    [Fact]
    public void ParsesDataMatrixSymbol1CompoundMessage()
    {
        const string barcode = "=+05000=Z54991712345600=%T300=<T0416003&>0183652359&,4PL001499Z549917123456A00T041600320181231";
        var result = Isbt128Parser.Parse(barcode);
        Assert.Equal(5, result.CompoundMessage!.DeclaredCount);
        Assert.Equal(new[] { "023", "001", "002", "003", "005", "038" }, result.Segments.Select(s => s.DataStructureNumber));
        Assert.Equal("2018-12-31", result.Sec!["expiryDate"]);
        Assert.Equal("2018-12-31", result.ExpirationDate!["date"]);
    }

    [Fact]
    public void ThrowsWhenDeclaredCompoundMessageCountDoesNotMatchReality()
    {
        const string barcode = "=+05000=/A9997XYZ100T0479=A99991712345600=,000012=>019031"; // declares 5, only 4 present
        Assert.Throws<Isbt128ParseException>(() => Isbt128Parser.Parse(barcode));
        Assert.False(Isbt128Parser.Check(barcode));
    }

    [Fact]
    public void ParsesSecEyeReadableTextFormDirectly()
    {
        var result = Isbt128Parser.Parse("SEC: PL001499Z549917123456 A00T041600320171231");
        Assert.True(result.IsSecText);
        Assert.Equal("Z549917123456", result.Sec!["uniqueDonationNumber"]);
        Assert.True(Isbt128Parser.Check("SEC: PL001499Z549917123456 A00T041600320171231"));
    }

    [Fact]
    public void ParsesSecElectronicFormStandalone()
    {
        var result = Isbt128Parser.Parse("&,4PL001499Z549917123456A00T041600320181231");
        Assert.Equal("038", result.Segments[0].DataStructureNumber);
        Assert.Equal("2018-12-31", result.Sec!["expiryDate"]);
    }

    [Fact]
    public void RecognizesRetiredDataStructureWithoutDecodingFields()
    {
        var content = new string('a', 16) + "00";
        var result = Isbt128Parser.Parse($"=[{content}");
        Assert.True(result.Segments[0].IsRetired);
        Assert.Equal("015", result.Segments[0].DataStructureNumber);
        Assert.Empty(result.Segments[0].Fields);
    }

    [Fact]
    public void SurfacesNonIccbbaDefinedDataStructureAsOpaqueTrailingSegment()
    {
        var result = Isbt128Parser.Parse("=A99991712345600&xSOME-LOCAL-DATA");
        Assert.Equal(2, result.Segments.Count);
        var opaque = result.Segments[1];
        Assert.True(opaque.IsOpaque);
        Assert.Null(opaque.DataStructureNumber);
        Assert.Equal("SOME-LOCAL-DATA", opaque.RawContent);
    }

    [Fact]
    public void ParsesPatientIdentificationNumberUsingLengthPrefix()
    {
        var result = Isbt128Parser.Parse("&#0105ABC12"); // aa=01 (location), ll=05, patient id "ABC12"
        var seg = result.Segments[0];
        Assert.Equal("025", seg.DataStructureNumber);
        Assert.Equal("ABC12", seg.Fields["patientId"]);
    }

    [Fact]
    public void ParsesDimensionsWithRepeatCount()
    {
        // aa(2) + bbbb(4) + ccccc(5) + d(1) + ee(2) = 14 chars per repeating segment (§2.4.29).
        const string seg1 = "01" + "0001" + "00001" + "0" + "00"; // symbol 01, volume (mL) = 1
        const string seg2 = "02" + "0002" + "00002" + "0" + "00"; // symbol 02, length (mm) = 2
        var barcode = $"&$02{seg1}{seg2}";
        var result = Isbt128Parser.Parse(barcode);
        var seg = result.Segments[0];
        Assert.Equal("029", seg.DataStructureNumber);
        var dims = Assert.IsType<List<Dictionary<string, object?>>>(seg.Fields["dimensions"]);
        Assert.Equal(2, dims.Count);
        Assert.Equal("mL", dims[0]["unit"]);
        Assert.Equal("00001", dims[0]["formattedValue"]);
    }

    [Fact]
    public void RejectsTruncatedInput()
    {
        Assert.False(Isbt128Parser.Check("=A999917123456"));
    }

    [Fact]
    public void RejectsUnrecognizedDataIdentifier()
    {
        Assert.False(Isbt128Parser.Check("=zINVALID_DI_TEST"));
    }

    [Fact]
    public void RejectsInputNotStartingWithMarker()
    {
        Assert.False(Isbt128Parser.Check("GARBAGE"));
    }

    [Fact]
    public void RejectsEmptyInput()
    {
        Assert.False(Isbt128Parser.Check(""));
    }
}
