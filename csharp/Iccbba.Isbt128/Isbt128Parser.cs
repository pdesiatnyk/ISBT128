using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace Iccbba.Isbt128
{
    /// <summary>
    /// Core ISBT 128 barcode scanner/parser (ST-001 §2.1-2.3, §2.4.23 Compound Message, §10
    /// concatenation rules) plus <see cref="Check"/>/<see cref="Parse"/> — the two public entry points.
    /// </summary>
    public static class Isbt128Parser
    {
        private static readonly Regex DinAlphanumeric = new Regex("^[A-NP-Z1-9]$", RegexOptions.Compiled);
        private static readonly Regex NonIccbbaLowercase = new Regex("^[a-z]$", RegexOptions.Compiled);

        private static Dictionary<string, object> DecodeDin(string content15)
        {
            var alpha = content15.Substring(0, 1);
            var fin = alpha + content15.Substring(1, 4);
            var din13 = content15.Substring(0, 13);
            var ff = content15.Substring(13, 2);
            var isChecksum = ReferenceTables.IsDinChecksumFlag(ff);
            return new Dictionary<string, object>
            {
                ["facilityIdentificationNumber"] = fin,
                ["year"] = content15.Substring(5, 2),
                ["sequenceNumber"] = content15.Substring(7, 6),
                ["donationIdentificationNumber"] = din13,
                ["flagCharacters"] = ff,
                ["flagMeaning"] = ReferenceTables.DescribeDinFlag(ff),
                ["isChecksumFlag"] = isChecksum,
                ["checksumValid"] = isChecksum ? (Checksum.IsoMod37_2(din13) + 60).ToString().PadLeft(2, '0') == ff : (bool?)null,
            };
        }

        private static List<Dictionary<string, object>> DecodeDimensions(string content)
        {
            var segments = new List<Dictionary<string, object>>();
            var count = int.Parse(content.Substring(0, 2));
            for (var i = 0; i < count; i++)
            {
                var seg = content.Substring(2 + i * 14, 14);
                var aa = seg.Substring(0, 2);
                var bbbb = seg.Substring(2, 4);
                var ccccc = seg.Substring(6, 5);
                var d = seg.Substring(11, 1);
                var ee = seg.Substring(12, 2);
                var (unit, description) = ReferenceTables.DescribeDimensionUnit(bbbb);
                segments.Add(new Dictionary<string, object>
                {
                    ["symbolCode"] = aa, ["symbol"] = ReferenceTables.DescribeDimensionSymbol(aa),
                    ["dimensionCode"] = bbbb, ["unit"] = unit, ["dimensionDescription"] = description,
                    ["rawValue"] = ccccc, ["decimalPlacesCode"] = d, ["formattedValue"] = ReferenceTables.ApplyDimensionDecimalPoint(ccccc, d),
                    ["reservedForFutureUse"] = ee,
                });
            }
            return segments;
        }

        private static List<Dictionary<string, object>> DecodeRbcAntigensWithHistory(string content)
        {
            var segments = new List<Dictionary<string, object>>();
            var count = int.Parse(content.Substring(0, 3));
            for (var i = 0; i < count; i++)
            {
                var seg = content.Substring(3 + i * 10, 10);
                var antigenCode = seg.Substring(0, 6);
                var rr = seg.Substring(6, 2);
                var ss = seg.Substring(8, 2);
                segments.Add(new Dictionary<string, object>
                {
                    ["antigenCode"] = antigenCode, ["resultCode"] = rr, ["result"] = ReferenceTables.DescribeRbcSerologicalResult(rr),
                    ["numberOfTestsCode"] = ss, ["numberOfTests"] = ReferenceTables.DescribeNumberOfTests(ss),
                });
            }
            return segments;
        }

        private sealed class ScanState
        {
            public int Pos;
            public readonly List<ParsedSegment> Segments = new List<ParsedSegment>();
            public CompoundMessageInfo CompoundInfo;
            public bool CompoundOpen;
            public int CompoundSeen;
        }

        private static Exception Fail(string reason, int position, string message) =>
            throw new Isbt128ParseException(message, position, reason);

        private static void RegisterCompoundProgress(ScanState state)
        {
            if (state.CompoundOpen && state.CompoundInfo != null)
            {
                state.CompoundSeen++;
                if (state.CompoundSeen >= state.CompoundInfo.DeclaredCount)
                {
                    state.CompoundOpen = false;
                }
            }
        }

        private static void ScanOne(string input, ScanState state)
        {
            var pos = state.Pos;
            var marker = input[pos];
            if (marker != '=' && marker != '&')
            {
                throw Fail("UNEXPECTED_CHARACTER", pos, $"Expected '=' or '&' but found '{marker}'");
            }
            if (pos + 1 >= input.Length)
            {
                throw Fail("TRUNCATED_DATA_IDENTIFIER", pos, "Data identifier is truncated at end of input");
            }
            var next = input[pos + 1];

            // Special case: Donation Identification Number [001] — 2nd DI char doubles as content char 1.
            if (marker == '=' && DinAlphanumeric.IsMatch(next.ToString()))
            {
                var contentStart = pos + 1;
                var contentEnd = contentStart + 15;
                if (contentEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "DIN [001] content is truncated");
                var content = input.Substring(contentStart, contentEnd - contentStart);
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = "001", Name = "Donation Identification Number",
                    DataIdentifier = input.Substring(pos, contentStart - pos), RawContent = content,
                    Fields = DecodeDin(content), IsRetired = false, IsOpaque = false, StandardReference = "ST-001 §2.4.1",
                });
                state.Pos = contentEnd;
                RegisterCompoundProgress(state);
                return;
            }

            // Non-ICCBBA defined data structures (§2.5.1): opaque, unbounded length.
            if (marker == '&' && NonIccbbaLowercase.IsMatch(next.ToString()))
            {
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = null, Name = "Non-ICCBBA Defined Data Structure",
                    DataIdentifier = input.Substring(pos, 2), RawContent = input.Substring(pos + 2),
                    Fields = new Dictionary<string, object>(), IsRetired = false, IsOpaque = true, StandardReference = "ST-001 §2.5.1",
                });
                state.Pos = input.Length;
                return;
            }

            // Reserved hybrid national structures (§2.5.2 / §2.5.3): opaque, unbounded length.
            if (marker == '&' && (next == ';' || next == '!'))
            {
                var isDonorId = next == ';';
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = null,
                    Name = isDonorId ? "Reserved: Nationally Specified Donor Identification Number" : "Confidential Unit Exclusion Status Data Structure",
                    DataIdentifier = input.Substring(pos, 2), RawContent = input.Substring(pos + 2),
                    Fields = new Dictionary<string, object>(), IsRetired = false, IsOpaque = true,
                    StandardReference = isDonorId ? "ST-001 §2.5.2" : "ST-001 §2.5.3",
                });
                state.Pos = input.Length;
                return;
            }

            // 3-character DI family: &,1 / &,2 / &,3 / &,4 (035/036/037/038).
            if (marker == '&' && next == ',')
            {
                if (pos + 2 >= input.Length) throw Fail("TRUNCATED_DATA_IDENTIFIER", pos, "Data identifier '&,' requires a 3rd character");
                var di = input.Substring(pos, 3);
                if (di == "&,4")
                {
                    var contentStart = pos + 3;
                    var contentEnd = contentStart + 40;
                    if (contentEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "SEC [038] content is truncated");
                    var content = input.Substring(contentStart, contentEnd - contentStart);
                    state.Segments.Add(new ParsedSegment
                    {
                        DataStructureNumber = "038", Name = "Single European Code (SEC)", DataIdentifier = di, RawContent = content,
                        Fields = Sec.DecodeSecContent(content), IsRetired = false, IsOpaque = false, StandardReference = "ST-001 §2.4.38 / ST-012",
                    });
                    state.Pos = contentEnd;
                    RegisterCompoundProgress(state);
                    return;
                }
                if (!Structures.FixedByDi.TryGetValue(di, out var spec3))
                {
                    throw Fail("UNKNOWN_DATA_IDENTIFIER", pos, $"Unrecognized data identifier '{di}'");
                }
                var cStart = pos + 3;
                var cEnd = cStart + spec3.ContentLength;
                if (cEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, $"{spec3.Name} [{spec3.Number}] content is truncated");
                var content3 = input.Substring(cStart, cEnd - cStart);
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = spec3.Number, Name = spec3.Name, DataIdentifier = di, RawContent = content3,
                    Fields = spec3.Retired ? new Dictionary<string, object>() : spec3.Decode(content3),
                    IsRetired = spec3.Retired, IsOpaque = false, StandardReference = spec3.Reference,
                });
                state.Pos = cEnd;
                RegisterCompoundProgress(state);
                return;
            }

            var diTwo = input.Substring(pos, 2);

            // Patient Identification Number [025]: length-prefixed variable content.
            if (diTwo == "&#")
            {
                var headerStart = pos + 2;
                var headerEnd = headerStart + 4;
                if (headerEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "Patient Identification Number [025] header is truncated");
                var aa = input.Substring(headerStart, 2);
                var ll = input.Substring(headerStart + 2, headerEnd - (headerStart + 2));
                if (!int.TryParse(ll, out var llNum) || llNum < 0)
                {
                    throw Fail("INVALID_LENGTH_PREFIX", pos, $"Invalid patient id length '{ll}'");
                }
                var contentEnd = headerEnd + llNum;
                if (contentEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "Patient Identification Number [025] content is truncated");
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = "025", Name = "Patient Identification Number", DataIdentifier = diTwo, RawContent = input.Substring(headerStart, contentEnd - headerStart),
                    Fields = new Dictionary<string, object> { ["locationCode"] = aa, ["patientIdLength"] = ll, ["patientId"] = input.Substring(headerEnd, contentEnd - headerEnd) },
                    IsRetired = false, IsOpaque = false, StandardReference = "ST-001 §2.4.25",
                });
                state.Pos = contentEnd;
                RegisterCompoundProgress(state);
                return;
            }

            // Dimensions [029]: repeat-count-prefixed variable content.
            if (diTwo == "&$")
            {
                var headerStart = pos + 2;
                var headerEnd = headerStart + 2;
                if (headerEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "Dimensions [029] header is truncated");
                var nn = int.Parse(input.Substring(headerStart, headerEnd - headerStart));
                var contentEnd = headerEnd + 14 * nn;
                if (contentEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "Dimensions [029] content is truncated");
                var content = input.Substring(headerStart, contentEnd - headerStart);
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = "029", Name = "Dimensions", DataIdentifier = diTwo, RawContent = content,
                    Fields = new Dictionary<string, object> { ["count"] = nn, ["dimensions"] = DecodeDimensions(content) },
                    IsRetired = false, IsOpaque = false, StandardReference = "ST-001 §2.4.29",
                });
                state.Pos = contentEnd;
                RegisterCompoundProgress(state);
                return;
            }

            // Red Cell Antigens with Test History [030]: repeat-count-prefixed variable content.
            if (diTwo == "&%")
            {
                var headerStart = pos + 2;
                var headerEnd = headerStart + 3;
                if (headerEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "Red Cell Antigens with Test History [030] header is truncated");
                var nnn = int.Parse(input.Substring(headerStart, headerEnd - headerStart));
                var contentEnd = headerEnd + 10 * nnn;
                if (contentEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "Red Cell Antigens with Test History [030] content is truncated");
                var content = input.Substring(headerStart, contentEnd - headerStart);
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = "030", Name = "Red Cell Antigens with Test History", DataIdentifier = diTwo, RawContent = content,
                    Fields = new Dictionary<string, object> { ["count"] = nnn, ["antigens"] = DecodeRbcAntigensWithHistory(content) },
                    IsRetired = false, IsOpaque = false, StandardReference = "ST-001 §2.4.30",
                });
                state.Pos = contentEnd;
                RegisterCompoundProgress(state);
                return;
            }

            // Transfusion Transmitted Infection Marker [027]: fixed length, structural decode only
            // (see ReferenceTables.cs for why the position→marker table is not semantically decoded).
            if (diTwo == "&\"")
            {
                var contentStart = pos + 2;
                var contentEnd = contentStart + 18;
                if (contentEnd > input.Length) throw Fail("TRUNCATED_CONTENT", pos, "TTI Marker [027] content is truncated");
                var content = input.Substring(contentStart, contentEnd - contentStart);
                state.Segments.Add(new ParsedSegment
                {
                    DataStructureNumber = "027", Name = "Transfusion Transmitted Infection Marker", DataIdentifier = diTwo, RawContent = content,
                    Fields = new Dictionary<string, object> { ["positions"] = content.Select(ch => ch.ToString()).ToArray() },
                    IsRetired = false, IsOpaque = false, StandardReference = "ST-001 §2.4.27",
                });
                state.Pos = contentEnd;
                RegisterCompoundProgress(state);
                return;
            }

            if (!Structures.FixedByDi.TryGetValue(diTwo, out var spec))
            {
                throw Fail("UNKNOWN_DATA_IDENTIFIER", pos, $"Unrecognized data identifier '{diTwo}'");
            }
            var contentStart2 = pos + 2;
            var contentEnd2 = contentStart2 + spec.ContentLength;
            if (contentEnd2 > input.Length) throw Fail("TRUNCATED_CONTENT", pos, $"{spec.Name} [{spec.Number}] content is truncated");
            var content2 = input.Substring(contentStart2, contentEnd2 - contentStart2);
            var fields = spec.Retired ? new Dictionary<string, object>() : spec.Decode(content2);
            state.Segments.Add(new ParsedSegment
            {
                DataStructureNumber = spec.Number, Name = spec.Name, DataIdentifier = diTwo, RawContent = content2,
                Fields = fields, IsRetired = spec.Retired, IsOpaque = false, StandardReference = spec.Reference,
            });
            state.Pos = contentEnd2;

            if (spec.Number == "023")
            {
                var aa = int.Parse(content2.Substring(0, 2));
                var bbb = content2.Substring(2, 3);
                state.CompoundInfo = new CompoundMessageInfo { DeclaredCount = aa, SequenceCode = bbb, IsSpecifiedSequence = bbb != "000" };
                state.CompoundOpen = true;
                state.CompoundSeen = 0;
                return;
            }
            RegisterCompoundProgress(state);
        }

        private static IReadOnlyDictionary<string, object> GetSegmentFields(IReadOnlyList<ParsedSegment> segments, string number) =>
            segments.FirstOrDefault(s => s.DataStructureNumber == number)?.Fields;

        private static void BuildConvenienceAccessors(ParsedBarcode result)
        {
            IReadOnlyDictionary<string, object> ByNumber(string n) => GetSegmentFields(result.Segments, n);

            result.DonationIdentificationNumber = ByNumber("001");
            result.ProductCode = ByNumber("003");
            result.ExpirationDate = ByNumber("004") ?? ByNumber("005");
            result.ProductDivisions = ByNumber("032");
            result.Sec = ByNumber("038");
            var ppic = ByNumber("034");
            if (ppic != null)
            {
                result.Udi = new Dictionary<string, object>
                {
                    ["deviceIdentifier"] = ppic,
                    ["donationIdentificationNumber"] = ByNumber("001"),
                    ["productDivisions"] = ByNumber("032"),
                    ["expirationDate"] = ByNumber("004"),
                    ["productionDate"] = ByNumber("008"),
                    ["lotNumber"] = ByNumber("035"),
                };
            }
        }

        /// <summary>
        /// Parses an ISBT 128 (or ISBT 128-derived: SEC, MPHO/UDI) barcode data string into its
        /// constituent data structures. Throws <see cref="Isbt128ParseException"/> for structurally invalid input.
        /// </summary>
        public static ParsedBarcode Parse(string barcode)
        {
            if (string.IsNullOrEmpty(barcode))
            {
                throw Fail("EMPTY_INPUT", 0, "Input must be a non-empty string");
            }

            if (Sec.IsSecText(barcode))
            {
                var fields = Sec.ParseSecText(barcode);
                var secResult = new ParsedBarcode
                {
                    Raw = barcode, IsCompoundMessage = false, IsSecText = true,
                    Segments = new List<ParsedSegment>
                    {
                        new ParsedSegment
                        {
                            DataStructureNumber = "038", Name = "Single European Code (SEC)", DataIdentifier = "SEC:",
                            RawContent = barcode, Fields = fields, IsRetired = false, IsOpaque = false, StandardReference = "ST-012 §2.3",
                        },
                    },
                };
                BuildConvenienceAccessors(secResult);
                return secResult;
            }

            var state = new ScanState();
            while (state.Pos < barcode.Length)
            {
                ScanOne(barcode, state);
            }
            if (state.CompoundInfo != null && state.CompoundSeen != state.CompoundInfo.DeclaredCount)
            {
                throw Fail(
                    "COMPOUND_MESSAGE_COUNT_MISMATCH",
                    barcode.Length,
                    $"Compound Message declared {state.CompoundInfo.DeclaredCount} data structures but only {state.CompoundSeen} were found");
            }

            var result = new ParsedBarcode
            {
                Raw = barcode,
                IsCompoundMessage = state.CompoundInfo != null,
                CompoundMessage = state.CompoundInfo,
                IsSecText = false,
                Segments = state.Segments,
            };
            BuildConvenienceAccessors(result);
            return result;
        }

        /// <summary>Returns whether <paramref name="barcode"/> is a structurally/semantically valid ISBT 128 barcode data string.</summary>
        public static bool Check(string barcode)
        {
            try
            {
                Parse(barcode);
                return true;
            }
            catch (Isbt128ParseException)
            {
                return false;
            }
        }

        private static UdiDeviceIdentifier DecodeDeviceIdentifier(IReadOnlyList<ParsedSegment> segments)
        {
            var fields = GetSegmentFields(segments, "034");
            if (fields == null) return null;
            return new UdiDeviceIdentifier
            {
                FacilityIdentificationNumberOfProcessor = (string)fields["facilityIdentificationNumberOfProcessor"],
                FacilityDefinedProductCode = (string)fields["facilityDefinedProductCode"],
                ProductDescriptionCode = (string)fields["productDescriptionCode"],
            };
        }

        private static UdiDonationIdentificationNumber DecodeDonationIdentificationNumber(IReadOnlyList<ParsedSegment> segments)
        {
            var fields = GetSegmentFields(segments, "001");
            if (fields == null) return null;
            return new UdiDonationIdentificationNumber
            {
                FacilityIdentificationNumber = (string)fields["facilityIdentificationNumber"],
                Year = (string)fields["year"],
                SequenceNumber = (string)fields["sequenceNumber"],
                DonationIdentificationNumber = (string)fields["donationIdentificationNumber"],
                FlagCharacters = (string)fields["flagCharacters"],
                FlagMeaning = (string)fields["flagMeaning"],
                IsChecksumFlag = (bool)fields["isChecksumFlag"],
                ChecksumValid = (bool?)fields["checksumValid"],
            };
        }

        private static string DecodeSegmentString(IReadOnlyList<ParsedSegment> segments, string number, string key)
        {
            var fields = GetSegmentFields(segments, number);
            return fields == null ? null : (string)fields[key];
        }

        private static DateTime? DecodeSegmentDate(IReadOnlyList<ParsedSegment> segments, string number)
        {
            var fields = GetSegmentFields(segments, number);
            return fields == null ? (DateTime?)null : DateTime.ParseExact((string)fields["date"], "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// Parses a barcode and reshapes the result into ST-017's UDI grouping: a single Device
        /// Identifier (DS034) plus its Production Identifiers (DS001/032/004/008/035). Throws the same
        /// way <see cref="Parse"/> does for structurally invalid input. <see cref="UdiResult.DI"/> is
        /// <c>null</c> when the barcode has no Processor Product Identification Code [034] segment.
        /// </summary>
        public static UdiResult ParseUdi(string barcode)
        {
            var result = Parse(barcode);
            return new UdiResult
            {
                Raw = barcode,
                DI = DecodeDeviceIdentifier(result.Segments),
                PI = new UdiProductionIdentifiers
                {
                    DonationIdentificationNumber = DecodeDonationIdentificationNumber(result.Segments),
                    ProductDivisions = DecodeSegmentString(result.Segments, "032", "divisionCode"),
                    ExpirationDate = DecodeSegmentDate(result.Segments, "004"),
                    ProductionDate = DecodeSegmentDate(result.Segments, "008"),
                    LotNumber = DecodeSegmentString(result.Segments, "035", "lotNumber"),
                },
            };
        }

        private static void RequireLength(string value, int length, string field)
        {
            if (value.Length != length)
            {
                throw new Isbt128BuildException($"Must be exactly {length} characters, got {value.Length}", field, "INVALID_LENGTH");
            }
        }

        private static string EncodeDeviceIdentifier(BuildUdiDeviceIdentifierInput di)
        {
            RequireLength(di.FacilityIdentificationNumberOfProcessor, 5, "DI.FacilityIdentificationNumberOfProcessor");
            RequireLength(di.FacilityDefinedProductCode, 6, "DI.FacilityDefinedProductCode");
            RequireLength(di.ProductDescriptionCode, 5, "DI.ProductDescriptionCode");
            return "=/" + di.FacilityIdentificationNumberOfProcessor + di.FacilityDefinedProductCode + di.ProductDescriptionCode;
        }

        private static string EncodeDonationIdentificationNumber(BuildUdiDonationIdentificationNumberInput din)
        {
            RequireLength(din.FacilityIdentificationNumber, 5, "PI.DonationIdentificationNumber.FacilityIdentificationNumber");
            RequireLength(din.Year, 2, "PI.DonationIdentificationNumber.Year");
            RequireLength(din.SequenceNumber, 6, "PI.DonationIdentificationNumber.SequenceNumber");
            var din13 = din.FacilityIdentificationNumber + din.Year + din.SequenceNumber;
            var flag = din.FlagCharacters ?? Checksum.CalculateDinType3Flag(din13);
            RequireLength(flag, 2, "PI.DonationIdentificationNumber.FlagCharacters");
            return "=" + din13 + flag;
        }

        private static string EncodeProductDivisions(string divisionCode)
        {
            RequireLength(divisionCode, 6, "PI.ProductDivisions");
            return "=," + divisionCode;
        }

        private static string EncodeLotNumber(string lotNumber)
        {
            RequireLength(lotNumber, 18, "PI.LotNumber");
            return "&,1" + lotNumber;
        }

        /// <summary>
        /// Encodes a UDI (Device Identifier + Production Identifiers) into an ISBT 128 Compound
        /// Message barcode string — the inverse of <see cref="ParseUdi"/>. Throws
        /// <see cref="Isbt128BuildException"/> if any field is missing or the wrong fixed length.
        /// </summary>
        public static string BuildUdi(BuildUdiInput input)
        {
            var segments = new List<string>
            {
                EncodeDeviceIdentifier(input.DI),
                EncodeDonationIdentificationNumber(input.PI.DonationIdentificationNumber),
                EncodeProductDivisions(input.PI.ProductDivisions),
            };
            if (input.PI.ExpirationDate.HasValue) segments.Add("=>" + DateUtils.EncodeCyyjjj(input.PI.ExpirationDate.Value));
            if (input.PI.ProductionDate.HasValue) segments.Add("=}" + DateUtils.EncodeCyyjjj(input.PI.ProductionDate.Value));
            if (input.PI.LotNumber != null) segments.Add(EncodeLotNumber(input.PI.LotNumber));

            return $"=+{segments.Count:D2}000" + string.Join("", segments);
        }
    }
}
