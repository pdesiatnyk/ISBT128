# ISBT 128 Data Structure Map

Cross-reference between the standard, the two implementations, and how completely each data
structure is decoded. Generated from `structures.ts` / `Structures.cs` (the fixed-length
registries) plus the special-cased variable-length structures handled directly in
`parser.ts` / `Isbt128Parser.cs`. Keep this in sync if a data structure's decode behavior changes.

## Decode status legend

| Status | Meaning |
|---|---|
| **Full** | All fields decoded to human-readable values. |
| **Partial** | Structurally decoded; one or more sub-fields left as a raw code because the lookup lives in an ICCBBA-hosted licensed database not reproduced in the source documents (see README §"Raw code only"). |
| **Raw** | Recognized and length-validated; content exposed as raw code(s), no semantic decode attempted (external database). |
| **Structural-only** | Length-validated only; no semantic decode attempted because the source table's own HTML is internally ambiguous (see README §"Scoping decisions"). |
| **Retired** | Data identifier recognized (so parsing doesn't choke on legacy barcodes); content not decoded. |
| **Opaque** | Unbounded-length segment (non-ICCBBA / hybrid national structure); consumed to end of input, not decoded. |

## Data structures

| # | Name | Standard § | DI | C# | TS | Status |
|---|---|---|---|---|---|---|
| 001 | Donation Identification Number | ST-001 §2.4.1 | `=α` | `Isbt128Parser.cs` (`DecodeDin`, DIN branch in `ScanOne`) | `parser.ts` (`decodeDin`, DIN branch in `scanOne`) | Full (checksum-flag validated; FIN institution lookup is external) |
| 002 | Blood Groups [ABO and RhD] | ST-001 §2.4.2 | `=%` | `Structures.cs` (`Fixed`, `Di="=%"`) | `structures.ts` (`FIXED_STRUCTURES`, `di: '=%'`) | Full |
| 003 | Product Code | ST-001 §2.4.3 | `=<` | `Structures.cs` (`Di="=<"`) | `structures.ts` (`di: '=<'`) | Partial (PDC description is external DB) |
| 004 | Expiration Date | ST-001 §2.4.4 | `=>` | `DateUtils.DecodeCyyjjj` | `dateUtils.ts` (`decodeCyyjjj`) | Full |
| 005 | Expiration Date and Time | ST-001 §2.4.5 | `&>` | `DateUtils.DecodeCyyjjjhhmm` | `dateUtils.ts` (`decodeCyyjjjhhmm`) | Full |
| 006 | Collection Date | ST-001 §2.4.6 | `=*` | `DateUtils.DecodeCyyjjj` | `dateUtils.ts` (`decodeCyyjjj`) | Full |
| 007 | Collection Date and Time | ST-001 §2.4.7 | `&*` | `DateUtils.DecodeCyyjjjhhmm` | `dateUtils.ts` (`decodeCyyjjjhhmm`) | Full |
| 008 | Production Date | ST-001 §2.4.8 | `=}` | `DateUtils.DecodeCyyjjj` | `dateUtils.ts` (`decodeCyyjjj`) | Full |
| 009 | Production Date and Time | ST-001 §2.4.9 | `&}` | `DateUtils.DecodeCyyjjjhhmm` | `dateUtils.ts` (`decodeCyyjjjhhmm`) | Full |
| 010 | Special Testing: General | ST-001 §2.4.10 | `&(` | `Structures.cs` (`Di="&("`) | `structures.ts` (`di: '&('`) | Raw (RT029, external) |
| 011 | Special Testing: RBC Antigens | ST-001 §2.4.11 | `={` | `Structures.cs` (`Di="={"`, `Retired=true`) | `structures.ts` (`di: '={'`, `retired: true`) | Retired |
| 012 | Special Testing: RBC Antigens — General | ST-001 §2.4.12 | `=\` | `Structures.cs` (`DecodeRbcAntigens`) | `structures.ts` (`decodeRbcAntigens`) | Partial (positions 1-9 named; positions 10-16 generic — see caveat) |
| 013 | Special Testing: RBC Antigens — Finnish | ST-001 §2.4.13 | `&\` | `Structures.cs` (`DecodeRbcAntigens`) | `structures.ts` (`decodeRbcAntigens`) | Partial (same caveat as 012) |
| 014 | Special Testing: Platelet HLA/Antigens | ST-001 §2.4.14 | `&{` | `Structures.cs` (`Di="&{"`) | `structures.ts` (`di: '&{'`) | Raw (RT013/RT014/RT044, source-table ambiguity) |
| 015 | Special Testing: HLA-A/-B Alleles | ST-001 §2.4.15 | `=[` | `Structures.cs` (`Retired=true`) | `structures.ts` (`retired: true`) | Retired |
| 016 | Special Testing: HLA-DRB1 Alleles | ST-001 §2.4.16 | `="` | `Structures.cs` (`Retired=true`) | `structures.ts` (`retired: true`) | Retired |
| 017 | Container Manufacturer and Catalog Number | ST-001 §2.4.17 | `=)` | `Structures.cs` (`Di="=)"`) | `structures.ts` (`di: '=)'`) | Partial (manufacturer code RT016, external) |
| 018 | Container Lot Number | ST-001 §2.4.18 | `&)` | `Structures.cs` (`Di="&)"`) | `structures.ts` (`di: '&)'`) | Full (opaque by nature — facility-assigned lot number) |
| 019 | Donor Identification Number | ST-001 §2.4.19 | `=;` | `Structures.cs` (`Di="=;"`) | `structures.ts` (`di: '=;'`) | Full (FIN institution lookup is external) |
| 020 | Staff Member Identification Number | ST-001 §2.4.20 | `='` | `Structures.cs` (`Di="='"`) | `structures.ts` (`di: "='"`) | Full |
| 021 | Manufacturer/Catalog: Non-Container Items | ST-001 §2.4.21 | `=-` | `Structures.cs` (`Di="=-"`) | `structures.ts` (`di: '=-'`) | Partial (manufacturer code RT016, external) |
| 022 | Lot Number: Non-Container Items | ST-001 §2.4.22 | `&-` | `Structures.cs` (`Di="&-"`) | `structures.ts` (`di: '&-'`) | Full |
| 023 | Compound Message | ST-001 §2.4.23 | `=+` | `Structures.cs` (`Di="=+"`); loop-control in `Isbt128Parser.ScanOne`/`Parse` | `structures.ts` (`di: '=+'`); loop-control in `parser.ts` `scanOne`/`parse` | Full |
| 024 | Patient Date of Birth | ST-001 §2.4.24 | `=#` | `Structures.cs` (`Di="=#"`) | `structures.ts` (`di: '=#'`) | Partial (location code RT018, external) |
| 025 | Patient Identification Number | ST-001 §2.4.25 | `&#` | `Isbt128Parser.cs` (`&#` branch in `ScanOne`) | `parser.ts` (`&#` branch in `scanOne`) | Partial (variable length via `ll`; location code RT018 external) |
| 026 | Expiration Month and Year | ST-001 §2.4.26 | `=]` | `Structures.cs` (`Di="=]"`) | `structures.ts` (`di: '=]'`) | Full |
| 027 | Transfusion Transmitted Infection Marker | ST-001 §2.4.27 | `&"` | `Isbt128Parser.cs` (`&"` branch in `ScanOne`) | `parser.ts` (`&"` branch in `scanOne`) | Structural-only (Table 18 [RT019] ambiguity) |
| 028 | Product Consignment | ST-001 §2.4.28 | `=$` | `Structures.cs` (`Di="=$"`) | `structures.ts` (`di: '=$'`) | Full |
| 029 | Dimensions | ST-001 §2.4.29 | `&$` | `Isbt128Parser.cs` (`DecodeDimensions`, `&$` branch) | `parser.ts` (`decodeDimensions`, `&$` branch) | Full |
| 030 | Red Cell Antigens with Test History | ST-001 §2.4.30 | `&%` | `Isbt128Parser.cs` (`DecodeRbcAntigensWithHistory`, `&%` branch) | `parser.ts` (`decodeRbcAntigensWithHistory`, `&%` branch) | Partial (antigen identity §4.4, external; result/test codes decoded) |
| 031 | Flexible Date and Time | ST-001 §2.4.31 | `=(` | `Structures.cs` (`Di="=("`) | `structures.ts` (`di: '=('`) | Full |
| 032 | Product Divisions | ST-001 §2.4.32 | `=,` | `Structures.cs` (`Di="=,"`) | `structures.ts` (`di: '=,'`) | Full (opaque by nature — facility-assigned division code) |
| 033 | Processing Facility Information Code | ST-001 §2.4.33 | `&+` | `Structures.cs` (`Di="&+"`) | `structures.ts` (`di: '&+'`) | Partial (FIN institution lookup external) |
| 034 | Processor Product Identification Code (PPIC) | ST-001 §2.4.34 / ST-017 §2.1 | `=/` | `Structures.cs` (`Di="=/"`) | `structures.ts` (`di: '=/'`) | Partial (PDC description external) |
| 035 | MPHO Lot Number | ST-001 §2.4.35 | `&,1` | `Structures.cs` (`Di="&,1"`) | `structures.ts` (`di: '&,1'`) | Full |
| 036 | MPHO Supplemental Identification Number | ST-001 §2.4.36 | `&,2` | `Structures.cs` (`Di="&,2"`) | `structures.ts` (`di: '&,2'`) | Full |
| 037 | GRID (old) | ST-001 §2.4.37 | `&,3` | `Structures.cs` (`Retired=true`) | `structures.ts` (`retired: true`) | Retired |
| 038 | Single European Code (SEC) — electronic | ST-001 §2.4.38 / ST-012 §6.1 | `&,4` | `Sec.cs` (`DecodeSecContent`); `&,4` branch in `Isbt128Parser.ScanOne` | `sec.ts` (`decodeSecContent`); `&,4` branch in `parser.ts` `scanOne` | Full |
| 038 | Single European Code (SEC) — eye-readable text | ST-012 §2.3 | `SEC:` prefix | `Sec.cs` (`ParseSecText`); top-level branch in `Isbt128Parser.Parse` | `sec.ts` (`parseSecText`); top-level branch in `parser.ts` `parse` | Full |
| 039 | Global Registration Identifier for Donors (GRID) | ST-001 §2.4.39 | `&:` | `Structures.cs` (`Di="&:"`, checksum via `Checksum.CalculateGridChecksum`) | `structures.ts` (`di: '&:'`, checksum via `calculateGridChecksum`) | Full (checksum validated; ION lookup external) |
| 040 | Chain of Identity Identifier | ST-001 §2.4.40 | `&/` | `Structures.cs` (`Di="&/"`) | `structures.ts` (`di: '&/'`) | Full |
| — | Non-ICCBBA Defined Data Structure | ST-001 §2.5.1 | `&` + `a`-`z` | `Isbt128Parser.cs` (lowercase branch in `ScanOne`) | `parser.ts` (lowercase branch in `scanOne`) | Opaque |
| — | Reserved: Nationally Specified Donor ID | ST-001 §2.5.2 | `&;` | `Isbt128Parser.cs` (`&;`/`&!` branch in `ScanOne`) | `parser.ts` (`&;`/`&!` branch in `scanOne`) | Opaque |
| — | Confidential Unit Exclusion Status | ST-001 §2.5.3 | `&!` | `Isbt128Parser.cs` (`&;`/`&!` branch in `ScanOne`) | `parser.ts` (`&;`/`&!` branch in `scanOne`) | Opaque |

## Utility functions (not part of barcode scanning)

| Function | Standard § | C# | TS |
|---|---|---|---|
| DIN keyboard-entry check character (K) | ST-001 Appendix A.1 | `Checksum.CalculateDinCheckCharacter` | `checksum.ts` (`calculateDinCheckCharacter`) |
| DIN Type 3 flag | ST-001 Appendix A.2 | `Checksum.CalculateDinType3Flag` | `checksum.ts` (`calculateDinType3Flag`) |
| GRID checksum | ST-001 §2.4.39 | `Checksum.CalculateGridChecksum` | `checksum.ts` (`calculateGridChecksum`) |
| Basic UDI-DI checksum | ST-017 Appendix 1 | `Checksum.CalculateBasicUdiDiChecksum` / `VerifyBasicUdiDiChecksum` | `checksum.ts` (`calculateBasicUdiDiChecksum` / `verifyBasicUdiDiChecksum`) |
