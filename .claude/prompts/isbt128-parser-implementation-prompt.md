# Implementation Prompt: ICCBBA/ISBT 128 Barcode Parser (C# + TypeScript)

## 1. Goal

Implement a parser for ICCBBA/ISBT 128 barcodes in **two independent, functionally-equivalent
libraries**: one in C#, one in TypeScript. Each library must expose two primary entry points:

- **`check(barcode: string): bool`** — returns whether the given string is a structurally and
  semantically valid ISBT 128 (or ISBT 128-derived: SEC, MPHO/UDI) barcode data string.
- **`parse(barcode: string): ParsedBarcode`** — parses the barcode into a structured object exposing
  every data structure found and its decoded fields. Must handle **real-life barcodes**: single data
  structures, physically-concatenated pairs (§10), and Compound Messages (DS023, used in 2-D/Data
  Matrix symbols) containing many data structures — not just isolated textbook examples.

Exact method/class naming conventions are up to the implementer (PascalCase in C#, camelCase in TS),
but the two operations and their semantics above must exist and behave identically across both
languages.

## 2. Source documents (all in `documents/`, already analyzed)

| File | Standard | Covers |
|---|---|---|
| `iccbba.md` | ST-001 v6.2.2 — Technical Specification | Core spec: data identifiers (§2.1–2.2), full data structure index (§2.3 Table 2 [RT003]), per-structure definitions (§2.4.1–2.4.40), embedded reference tables (§3.1), DIN check-character algorithm (Appendix A), bar code concatenation (§10), label examples (Appendix C) |
| `ST-012-ISBT-128-and-the-Single-European-Code-SEC-v1.4.0.md` | ST-012 v1.4.0 | Single European Code (SEC): eye-readable text format and DS038 electronic format |
| `ST-017-ISBT-128-Coding-and-Labeling-of-Medical-Devices-Containing-MPHO-v1.0.0.md` | ST-017 v1.0.0 | UDI for medical devices containing MPHO: DS034 (Device Identifier / PPIC), UDI parsing (§5), Basic UDI-DI + its mod-37,2 checksum (Appendix 1) |
| `RT019.pdf` | Reference Table RT019 | DS027 Transfusion Transmitted Infection Marker code table (positions 1–18; also reproduced, minus positions 13–18, in `iccbba.md` Table 18) |

Treat `iccbba.md` as the primary/normative reference; ST-012 and ST-017 are supplements layered on top
of the same data-structure model.

**Licensing note:** ISBT 128 is a licensed ICCBBA standard. The structural/technical rules reproduced
in these docs (data identifiers, field lengths, check-character algorithms, the reference tables that
are fully embedded in the docs) are fair game to implement. Do **not** attempt to embed or fabricate the
proprietary, externally-hosted databases (Product Description Code database, Manufacturer Identifier
codes [RT016/Table W1], Facility/GRID databases) — those require live licensed data ICCBBA does not
publish in these documents, and are out of scope (see §7).

## 3. Core parsing model (read this before designing the algorithm)

An ISBT 128 data structure = **data identifier** (1–3 chars, first char always `=` [0x3D] or `&`
[0x26]) + **data content** (fixed length per structure, defined in `iccbba.md` §2.3 Table 2 [RT003]).
The **only** exception is the Donation Identification Number [001]: its second DI character is *also*
the first character of the data content (§2.1, §2.4.1).

A decoded/scanned "barcode" string you must be able to parse is one of:

1. **A single data structure** — DI + fixed-length content.
2. **A physically-concatenated pair** (§10) — two data structures back-to-back with *no* separator and
   no wrapper: `DI1 content1 DI2 content2`. This happens because ISBT 128 allows two adjacent linear
   (Code 128) bar codes to be scanned as one string when spatial/temporal constraints are met (§10.1–10.2).
   Common pairs are listed in §10.5, but any pair is technically legal — do not hardcode an allow-list
   for parsing (only use it as documentation/example data).
3. **A Compound Message [DS023]** — `=+aabbb` header (`aa` = count of following data structures, `bbb`
   = `000` for unspecified sequence or an RT017 reference number for a specified sequence) followed by
   exactly `aa` further data structures concatenated with no separator (§2.4.23, and ST-017 §4).
4. **An SEC eye-readable text string** (ST-012 §2.3) — `SEC: <20-char donation seq> <22-char product
   seq>` (space- or newline-separated), which is a distinct textual convention, **not** DI-delimited.
   This is different from the DS038 electronic encoding of the same information (`&,4` + 40 chars).

**Recommended algorithm for `parse()`:**
1. If the (trimmed) input starts with `SEC:` (case-insensitive), branch to the dedicated SEC text parser
   (§8 below) instead of the generic DI-scanning loop.
2. Otherwise, scan the string left-to-right in a loop:
   - Read the next char; it must be `=` or `&`, else the remaining string is malformed.
   - Determine which data structure this is: for `=` followed by an alphanumeric char in
     `{A–N,P–Z,1–9}`, it's DIN [001] (2-char DI, content length 15 including the DI's 2nd char).
     Otherwise, look up the (1–2 more) DI characters against Table 2 [RT003] (§2.3) to find the
     matching data structure and its fixed content length. Structures `&,1` / `&,2` / `&,3` / `&,4`
     (MPHO Lot Number / MPHO Supplemental ID / GRID-retired / SEC[DS038]) need a 3rd DI character to
     disambiguate from each other and from `=,` (Product Divisions).
   - If it's Compound Message [023], record `aa`/`bbb`, then keep looping for exactly `aa` more
     structures before considering the message complete; validate the declared count against what's
     actually found.
   - If the DI is `&` followed by a lowercase `a`–`z` (non-ICCBBA / nationally-defined structure, §2.5),
     its length is not standardized — treat it (and everything after it, unless you have a
     narrower convention to bound it) as an opaque trailing/unknown segment, and surface this
     clearly in the parsed output rather than silently guessing a length.
   - Stop when the string is exhausted. Any leftover/unparseable tail is a parse error.
3. `check()` should be implemented in terms of the same core parser (e.g., parse and catch/report
   validation errors) rather than as a separate, divergent implementation — keep one source of truth
   per language.

## 4. Data structure coverage (full standard)

Implement all data structures in `iccbba.md` §2.4 **except** those marked `[RETIRED]`
(DS011, DS015, DS016, DS037) — still *recognize* their data identifiers (so parsing doesn't choke on
legacy barcodes) and label them `retired: true` in the output, but full field decoding for retired
structures is not required. Cover at minimum:

DS001 DIN, DS002 Blood Groups, DS003 Product Code, DS004/005 Expiration Date(+Time), DS006/007
Collection Date(+Time), DS008/009 Production Date(+Time), DS010 Special Testing General, DS012/DS013
Special Testing RBC Antigens, DS014 Platelet HLA/Antigens, DS017/018 Container Manufacturer/Lot,
DS019 Donor ID Number, DS020 Staff Member ID, DS021/022 Manufacturer/Lot (non-container), DS023
Compound Message, DS024/025 Patient DOB/ID, DS026 Expiration Month/Year, DS027 TTI Marker, DS028
Product Consignment, DS029 Dimensions, DS030 RBC Antigens with Test History, DS031 Flexible Date/Time,
DS032 Product Divisions, DS033 Processing Facility Info, DS034 Processor Product ID Code (PPIC),
DS035 MPHO Lot Number, DS036 MPHO Supplemental ID Number, DS038 SEC, DS039 GRID, DS040 Chain of
Identity Identifier.

Each structure's data identifier, content layout, and field lengths are all given in §2.4.*; use those
sections (not just the summary Table 2) as the source of truth for content decoding — Table 2 only
gives shapes/lengths.

## 5. Reference-table decoding (per the "decode what's locally resolvable" decision)

Fully embedded in `iccbba.md` §3.1 (decode these into human-readable values where the relevant data
structure is parsed) — cross-reference the Table-of-Tables at lines 211–263 of `iccbba.md` for the full
list, including at least:
- RT004 DIN flag character meanings (Table 3)
- RT005/RT006/RT007 Blood Groups, Special Messages, Rh/Kell/Mia phenotypes (Table 4–6)
- RT008 Type of Collection (Table 7)
- RT009/RT010 RBC Antigens General/Finnish (Table 9–10)
- RT013/RT014/RT044 Platelet HLA/Antigens (Table 14–16)
- RT019 TTI Marker (Table 18) — supplement with the 2 extra reserved positions visible in `RT019.pdf`
- RT037/038/039 Dimensions symbols/units/decimal point (Table 19–21)
- RT040/041 RBC Serological Results / Number of Tests (Table 22–23)
- RT045/046 Time Zone / Type of Time (Table 24–25)
- RT035 ISO/IEC 7064 check-value table (Table 35, Appendix A) — needed for DIN/GRID checksum math

Leave as **raw codes only** (do not attempt to resolve to descriptive text) wherever the mapping lives
in an ICCBBA-hosted, licensed, external database not reproduced in these docs — notably: Product
Description Code → description (ST-001 §5.1, ST-017 §7), Manufacturer Identifier Codes [RT016/Table
W1], Facility Identification Number → organization name [RT030/Registered Facilities], GRID Issuing
Organization Number table, ICCBBA-Specified Compound Message sequences [RT017/Table W2] (you can still
carry the raw `bbb` reference number — just don't attempt to resolve *what* the specified sequence is
unless you hardcode the small excerpt given in ST-017 §4.2 Table 3, which is explicitly reproduced and
safe to embed).

## 6. Validation rules for `check()` / `parse()`

- Structural: every segment's DI must be recognized and its content must match the declared length and
  character set (alphabetic/numeric/alphanumeric ranges given per-structure in §2.4.*).
- Compound Message: declared `aa` must equal the actual number of trailing data structures found.
- GRID [039]: its `bb` is a **mandatory**, embedded mod-37,2 checksum over the preceding content —
  validate it (algorithm in Appendix A.1, applied to the GRID's own content per §2.4.39).
- DIN [001] `ff` flag: only validate as a checksum when `ff` falls in the **60–96** range (meaning
  "ISO 7064 mod 37-2 check character on the preceding 13 characters", §3.1 Table 3) — other `ff` values
  (00, 01–19, 20–59, 97–99) are informational flags, not checksums, and should not fail validation.
- The DIN **keyboard-entry check character K** (Appendix A.1) and the ST-017 Appendix 1 **Basic
  UDI-DI checksum** are both fully self-contained, documented algorithms, but neither is embedded in
  the electronic barcode content itself (K is a manually-entry aid printed on labels; Basic UDI-DI
  "never appears on any trade item"). Implement both as **separate exported utility
  functions** (e.g. `calculateDinCheckCharacter`, `calculateBasicUdiDiChecksum` /
  `verifyBasicUdiDiChecksum`) rather than folding them into `check()`/`parse()` of a scanned barcode.
- Do not validate the SEC's ISO 3166-1 country code against a real country list (that list isn't in the
  provided docs) — just validate it's 2 alphabetic characters.

## 7. Output shape for `parse()`

Both languages should return an equivalent shape, roughly:

```
ParsedBarcode {
  raw: string
  isCompoundMessage: bool
  compoundMessage?: { declaredCount: number, sequenceCode: string, isSpecifiedSequence: bool }
  segments: ParsedSegment[]          // one per data structure found, in encounter order
}

ParsedSegment {
  dataStructureNumber: string | null  // e.g. "001"; null for non-ICCBBA/unrecognized segments
  name: string                        // e.g. "Donation Identification Number"
  dataIdentifier: string              // raw DI characters as scanned, e.g. "=A"
  rawContent: string
  fields: { ...structure-specific decoded fields... }
  isRetired: bool
  standardReference: string           // e.g. "ST-001 §2.4.1"
}
```

On top of the generic `segments` array, add convenience accessors for the fields real users reach for
most often (present only when that structure occurs in the barcode): donation identification number,
product code, expiration date, product divisions/serial number, and — when applicable — the parsed SEC
and UDI DI/PI groupings (§8–9). Keep the convenience layer identical in shape across C# and TS.

For invalid input: `parse()` should throw a dedicated exception/error type (not return a
partially-filled object) — e.g. `Isbt128ParseException` (C#) / `Isbt128ParseError` (TS) — carrying
enough detail (position, reason) to be useful. Implement `check()` as a non-throwing wrapper around the
same core parsing/validation logic.

## 8. SEC specifics (ST-012)

Support both representations, both round-tripping to the same logical fields:
- **Eye-readable text**: `SEC: <2-char country><6-char TE code><13-char donation number>` + separator +
  `<1-char coding system id><7-char product code><3-char split number><8-char YYYYMMDD expiry>`
  (§2.1–2.3 of ST-012; example: `SEC: PL001499Z549917123456 A00T041600320171231`).
- **Electronic / DS038**: `&,4` + the same 40 content characters with no internal separator (§6.1 of
  ST-012; §2.4.38 of ST-001) — this form is what shows up embedded inside a Compound Message.

Coding System Identifier values: `A` = ISBT 128, `B` = Eurocode, `E` = EUTC (§2.2.2 of ST-012, embed
this 3-row table).

## 9. MPHO/UDI specifics (ST-017)

- DS034 (Processor Product Identification Code / Device Identifier): `=/` + 5-char FIN(P) + 6-char FPC
  + 5-char PDC (§2.1). This is the mandatory, fixed "DI" portion of the UDI.
- Mandatory Production Identifiers for MPHO-as-device: DIN [001] and Product Divisions [032]
  (used as the device serial number); Expiration Date [004], Production Date [008], and MPHO Lot
  Number [035] are conditional PIs, required only if present on the label (§3, Table 1).
- When parsing a UDI compound message, identify and label the DI (DS034) and each PI segment per
  Table 5 of ST-017 (§5) — reuse the same generic Compound Message + segment-scanning logic from §3
  above; this is not a separate wire format, just a documented usage pattern of DS023/DS034/DS001/etc.
- Basic UDI-DI (Appendix 1 of ST-017) is a *separate, derived* identifier (never itself scanned from a
  product barcode) — implement its mod-37,2 checksum calculation/verification as a standalone utility
  (see §6), not as part of barcode parsing.

## 10. Project layout & tooling

```
/documents/                         (existing — do not move)
/.claude/                           (existing — all files *you* download or create go here, incl. this prompt)
/csharp/
  Iccbba.Isbt128/                   class library — the parser implementation
  Iccbba.Isbt128.Tests/             unit tests (xUnit recommended)
  Iccbba.Isbt128.sln
/typescript/
  src/                              parser implementation
  test/                             unit tests (vitest or jest — implementer's choice)
  package.json
  tsconfig.json
  eslint.config.js                  ESLint required for the TS version (per task requirement)
README.md                           project-level: what this is, links to standard docs, how to build/test each library
.gitignore                          cover both ecosystems: bin/, obj/, node_modules/, dist/, etc.
```

The git repo is already initialized (`master` branch, one prior commit adding `documents/`). Create
`README.md` and `.gitignore` if they don't already exist at implementation time.

## 11. Documentation requirements

Every data structure's parsing/validation code must carry doc comments (XML `///` in C#, TSDoc in TS)
that cite the specific standard + section it implements (e.g. "ST-001 §2.4.32 — Product Divisions
[Data Structure 032]"), so the mapping from code to spec is auditable. The top-level README should list
which data structures are supported, and note the two categories from §5 above (fully decoded vs.
raw-code-only) so consumers know what to expect.

## 12. Testing / verification guidance

Use the worked examples already present in the docs as cross-language test fixtures (both C# and TS
should pass identical cases, to keep behavior in parity):
- DIN check character worked example: `iccbba.md` Appendix A.1 — `G1234 17 654321` → K = `A`.
- PPIC (DS034) example: ST-017 §2.1 — `=/A9997AB3456T0123` → FIN(P) `A9997`, FPC `AB3456`, PDC `T0123`.
- DIN (ST-017 form) example: ST-017 §3.1 — `=A99991712345600` → FIN `A9999`, year `17`, sequence
  `123456`, flags `00`.
- Compound message examples: ST-017 §4.3.1/§4.3.2 (unspecified and specified sequence), §5 full UDI
  example with DIN+serial+expiry+manufacturing date+lot number.
- SEC examples: ST-012 Figure 2 (eye-readable), Figure 9 (DS038 data content), §6.2 (Data Matrix
  symbol 1 & 2 — includes a compound message combining DIN/Product Code/Expiry/SEC).
- Basic UDI-DI checksum worked example: ST-017 Appendix 1 — `A9990ABC123T0480` → checksum `08`.
- Label examples in `iccbba.md` Appendix C for broader, "messy" real-world-shaped input.

Verify end-to-end by running `check()`/`parse()` against each of the above in both languages and
confirming matching results, plus negative tests (truncated content, bad checksum, unknown DI, wrong
declared compound-message count).

## 13. Open questions — resolved

These were settled with the user before implementation:
1. **SEC eye-readable text form**: Support both — `check()`/`parse()` must accept the `SEC: ...`
   eye-readable text form directly, alongside the DS038 electronic (`&,4` + 40 chars) form.
2. **Naming conventions**: C# namespace `Iccbba.Isbt128`, npm package `@iccbba/isbt128-parser`. No
   NuGet/npm publishing planned for now — local build/test only.
3. **Non-ICCBBA / nationally-defined data structures** (§2.5, `&` + a–z): Surface as a raw opaque
   segment — capture the DI and treat the remainder of the string as an opaque trailing blob, clearly
   labeled in output, rather than dropping it.
4. **Target framework/language versions**: .NET 8 class library; TypeScript 5.x targeting Node 20+.
