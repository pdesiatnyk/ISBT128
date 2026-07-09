# ICCBBA / ISBT 128 Barcode Parser

Independent, functionally-equivalent parser/validator libraries for ICCBBA/ISBT 128 barcodes, in
**C#** (`csharp/`) and **TypeScript** (`typescript/`). Each library exposes two entry points:

- **`check(barcode)`** — returns whether a string is a structurally/semantically valid ISBT 128
  (or ISBT 128-derived: SEC, MPHO/UDI) barcode data string.
- **`parse(barcode)`** — parses the barcode into a structured object, decoding every data
  structure found. Handles real-life barcodes: single data structures, physically-concatenated
  pairs (§10), Compound Messages (DS023, used in 2-D/Data Matrix symbols), and the SEC
  eye-readable text form.

Implementation is derived from four source documents in `documents/`:

| File | Standard | Covers |
|---|---|---|
| `iccbba.md` | ST-001 v6.2.2 — Technical Specification | Core spec: data identifiers, all data structures, embedded reference tables, DIN check-character algorithm, bar code concatenation, label examples |
| `ST-012-...md` | ST-012 v1.4.0 | Single European Code (SEC): eye-readable text and DS038 electronic format |
| `ST-017-...md` | ST-017 v1.0.0 | UDI for medical devices containing MPHO: PPIC [034], UDI parsing, Basic UDI-DI checksum |
| `RT019.pdf` | Reference Table RT019 | DS027 Transfusion Transmitted Infection Marker code table |

The implementation prompt used to drive this work is at
[`.claude/prompts/isbt128-parser-implementation-prompt.md`](.claude/prompts/isbt128-parser-implementation-prompt.md).

## Data structure coverage

All ISBT 128 data structures (DS001–DS040) are recognized and structurally parsed/validated
(data identifier, content length, variable-length headers for DS023/025/029/030). Retired
structures (DS011, DS015, DS016, DS037) are recognized so parsing doesn't choke on legacy
barcodes, and are labeled `isRetired`/`IsRetired: true`, without full field decoding.

### Fully decoded (field-level, human-readable)

DS001 (DIN), DS002 (Blood Groups), DS003 (Product Code), DS004–DS009 (dates/times), DS017/018
(Container Manufacturer/Lot), DS019 (Donor ID), DS020 (Staff ID), DS021/022 (Manufacturer/Lot),
DS023 (Compound Message), DS024/026 (Patient DOB / Expiration Month-Year), DS028 (Product
Consignment), DS029 (Dimensions), DS030 (RBC Antigens with Test History — result codes decoded,
antigen identity left raw per §4.4 being website-maintained), DS031 (Flexible Date/Time), DS032
(Product Divisions), DS033/034 (Processing Facility Info / PPIC), DS035/036 (MPHO Lot/Supplemental
ID), DS038 (SEC, both eye-readable and electronic forms), DS039 (GRID, including checksum
validation), DS040 (Chain of Identity), plus DS012/013 (RBC Antigens — General/Finnish: Rh
phenotype and the first 8 antigen pairs are fully named; see caveat below for positions 10–16).

### Raw code only (requires ICCBBA's externally-hosted, licensed databases)

Per the licensing note in the implementation prompt, these are validated structurally but their
codes are **not** resolved to descriptive text, because the mapping lives in a password-protected
ICCBBA database not reproduced in the source documents: Product Description Code → description
(DS003/034), Manufacturer Identifier Codes [RT016] (DS017/021), Facility Identification Number →
organization name [RT030] (all FIN-bearing structures), GRID Issuing Organization Number, Special
Testing codes [RT029] (DS010), Location Codes [RT018] (DS024/025), platelet/HLA antigen codes
[RT013/RT014/RT044] (DS014).

### Scoping decisions on ambiguous source tables

Two of ST-001's embedded reference tables have internally inconsistent HTML in the source
document (a known PDF→Markdown conversion artifact — column/row counts contradict the
structure's own prose description of its content length):

- **Table 18 [RT019], DS027 (TTI Marker):** exposed structurally only (18 raw digit positions),
  not decoded to named markers/results.
- **Table 9/10 [RT009/RT010] continuation (DS012/013 positions 10–16):** the antigen *names* for
  this range are ambiguous in the source table; the pos/neg/nt/ni digit legend itself is
  unambiguous (verified identical across every pair column in both tables) and is applied, but
  positions 10–16 are labeled generically (`position: 10`..`16`) rather than by antigen name.

Rather than silently guess at a mapping that can't be verified against the document, both are
surfaced as raw/generic data so callers can see exactly what is and isn't resolved. See inline
code comments in `referenceTables.ts` / `ReferenceTables.cs` for details.

One date-arithmetic convention (`c` + `yy` century/year fields on dates like DS004 Expiration
Date) is inferred rather than explicitly specified in ST-001: `c` counts whole centuries from
2000 (0 = 2000s), based on the ST-012 §6.2 worked example. This is documented at
`dateUtils.ts` / `DateUtils.cs`.

Character-set validation (e.g. rejecting a numeric field containing a letter) is not enforced
per-field; `check()`/`parse()` validate data identifiers, content lengths, variable-length
headers, and the documented checksums (DIN Type 3 flag, GRID, Basic UDI-DI).

## Utility functions (not part of barcode scanning)

Both libraries export these as standalone utilities, per ST-001 Appendix A and ST-017 Appendix 1:

- `calculateDinCheckCharacter` / `CalculateDinCheckCharacter` — DIN keyboard-entry check character K.
- `calculateBasicUdiDiChecksum` / `verifyBasicUdiDiChecksum` (`CalculateBasicUdiDiChecksum` /
  `VerifyBasicUdiDiChecksum` in C#) — Basic UDI-DI mod-37,2 checksum.

## Project layout

```
/documents/       Source ISBT 128 standard documents (ST-001, ST-012, ST-017, RT019)
/.claude/         Implementation prompt and working spec notes
/csharp/          Iccbba.Isbt128 class library (.NET 8) + Iccbba.Isbt128.Tests (xUnit)
/typescript/      @iccbba/isbt128-parser (TypeScript 5.x / Node 20+) + vitest + ESLint
```

## Building and testing

### C# (`csharp/`)

```
dotnet build
dotnet test
```

### TypeScript (`typescript/`)

```
npm install
npm run build       # tsc
npm run typecheck    # tsc --noEmit (includes tests)
npm run lint         # eslint
npm test             # vitest
```

## Naming / versioning

- C# namespace: `Iccbba.Isbt128`. Target framework: .NET 8.
- npm package: `@iccbba/isbt128-parser`. Target: TypeScript 5.x, Node 20+.
- No NuGet/npm publishing configured; local build/test only.

## Known open questions (not settled by the source documents)

- The eye-readable `SEC: ...` text form is accepted directly by both `check()`/`parse()`
  alongside the DS038 electronic form (resolved: both are in scope).
- Non-ICCBBA / nationally-defined data structures (`&` + a–z) are surfaced as a raw opaque
  segment with the DI captured and the remainder of the input treated as an unbounded opaque
  blob (resolved: not dropped, clearly labeled `isOpaque`/`IsOpaque`).
