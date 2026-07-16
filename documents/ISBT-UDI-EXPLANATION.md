# Understanding `UdiResult` — a plain-language guide

This document explains the `UdiResult` object returned by `parseUdi()` (TypeScript:
`typescript/src/parser.ts`) / `Isbt128Parser.ParseUdi()` (C#: `csharp/Iccbba.Isbt128/Isbt128Parser.cs`),
field by field, assuming no prior knowledge of barcodes or medical-device standards.

## 0. The big picture, first

Every unit of blood, tissue, cells, or a device made from them needs a barcode that answers two
different questions:

1. **"What *kind* of thing is this?"** — same answer for every unit of the same product
   (e.g. "this is a 500 mL bag of Leukocyte-Reduced Red Blood Cells, made by Acme Blood Co.").
   This is the **Device Identifier (DI)**.
2. **"Which *specific* unit is this?"** — different for every single bag/vial/package, even if
   they're the same product type (e.g. "this exact bag came from donation #4471 collected on
   14 March 2024"). This is the **Production Identifier(s) (PI)**.

Put together, DI + PI is called a **UDI — Unique Device Identifier**. This concept comes from
international medical-device regulation (the DI/PI split is required by law in the US, EU, and
elsewhere), and ICCBBA (the organization behind the ISBT 128 barcode standard) defined exactly
how to encode a UDI using its own barcode building blocks. The rules live in standard **ST-017**.

A barcode is built out of small chunks called **Data Structures**, each with its own 2–3
character prefix (a "Data Identifier", like `=/` or `=,`) that tells the scanner what kind of
data comes next, followed by a fixed number of characters of content. `parseUdi()` reads the raw
barcode, finds the specific Data Structures that make up a UDI, and hands them back to you as one
tidy `UdiResult` object instead of a flat list of chunks.

```
UdiResult
├── raw                                     the original barcode string, unmodified
├── DI  (Device Identifier)                 "what kind of product is this?"
│   ├── facilityIdentificationNumberOfProcessor
│   ├── facilityDefinedProductCode
│   └── productDescriptionCode
└── PI  (Production Identifiers)            "which specific unit is this?"
    ├── donationIdentificationNumber
    │   ├── facilityIdentificationNumber
    │   ├── year
    │   ├── sequenceNumber
    │   ├── donationIdentificationNumber
    │   ├── flagCharacters
    │   ├── flagMeaning
    │   ├── isChecksumFlag
    │   └── checksumValid
    ├── productDivisions
    ├── expirationDate
    ├── productionDate
    └── lotNumber
```

---

## 1. Top-level `UdiResult` fields

| Field | Type | Meaning in plain language |
|---|---|---|
| `raw` | `string` | The exact barcode text that was scanned/decoded, unchanged. Kept around so you can always trace an answer back to its source. |
| `DI` | `UdiDeviceIdentifier \| null` | The product's "make and model." `null` only if the barcode didn't contain a Processor Product Identification Code segment (Data Structure **034**) — meaning this particular barcode wasn't encoded as a full UDI. |
| `PI` | `UdiProductionIdentifiers` | Everything that identifies *this one specific unit* rather than the product line in general. |

---

## 2. `DI` — Device Identifier (`UdiDeviceIdentifier`)

Comes from a single barcode chunk called **Data Structure 034 "Processor Product Identification
Code"**, written with the prefix `=/`. Think of the DI as roughly equivalent to a retail product's
barcode number (the thing that's the same on every can of soup off the same production line) —
except here it's split into three sub-parts instead of one number, because ICCBBA wanted "who
made it," "the maker's own catalog number," and "a standardized description," all separately
readable.

| Field | Length | Meaning in plain language |
|---|---|---|
| `facilityIdentificationNumberOfProcessor` | 5 characters | An ID number for the facility (manufacturer/processor) that assigned this product's description code. Every hospital, blood center, and manufacturer that uses ISBT 128 is registered with ICCBBA and gets one of these unique 5-character codes — like a company's DUNS number, but specific to this standard. Often abbreviated **FIN(P)**. |
| `facilityDefinedProductCode` | 6 characters | The manufacturer's *own* internal catalog/product number for this item — whatever code they'd use on their own invoice or catalog. Two products can share the same standardized description (below) but still need different DIs (e.g. a minor packaging change); this field is what tells them apart. Abbreviated **FPC**. |
| `productDescriptionCode` | 5 characters | A code looked up in ICCBBA's shared **Product Description Code database** — a standardized, industry-wide description of what the product actually is (e.g. "Red Blood Cells, Leukocytes Reduced"). Unlike the previous field, this one means the same thing no matter which facility printed the barcode. Abbreviated **PDC**. |

**Analogy:** if this were a GS1 retail barcode, `facilityIdentificationNumberOfProcessor` +
`facilityDefinedProductCode` + `productDescriptionCode` together play the role that a single
**GTIN** (the number under a supermarket barcode) plays — they identify the *product type*, not
the individual item.

**Character sets:** each of these three fields is restricted to uppercase letters and digits only
— no lowercase, no punctuation. `facilityDefinedProductCode` and `productDescriptionCode` allow
the full `A-Z, 0-9`; `facilityIdentificationNumberOfProcessor` additionally excludes the letter
`O` (to avoid confusion with digit `0`). `parseUdi()`/`buildUdi()` (and their C# equivalents)
enforce this and throw with reason `INVALID_CHARACTER_SET` on a violation.

---

## 3. `PI` — Production Identifiers (`UdiProductionIdentifiers`)

These fields identify the one physical unit in your hand (this specific bag, vial, or package),
as opposed to the product line. Every field here is optional in the type *except* that ST-017
requires `donationIdentificationNumber` and `productDivisions` to both be present for something
to legally count as a complete UDI — the others appear only if the label actually carries them.

| Field | Meaning in plain language |
|---|---|
| `donationIdentificationNumber` | *(see §4 below — it's a whole sub-object)* Identifies the original donation event this unit traces back to. |
| `productDivisions` | A short code (6 characters) that, combined with the DI's `productDescriptionCode`, tells apart multiple individual products that all came from the *same donation*. **Example:** one whole-blood donation is commonly split ("divided") into a red-cell unit and a plasma unit — each division gets a different `productDivisions` code so the two resulting bags aren't confused with each other, even though they share a DIN. This is effectively ISBT 128's version of a **serial number**. |
| `expirationDate` | The date after which the unit must no longer be used/transfused, decoded into a normal JavaScript/.NET `Date`. Present only if the barcode included Data Structure **004** ("Expiration Date"). |
| `productionDate` | The date the unit was processed/manufactured into its current form, decoded into a `Date`. Present only if the barcode included Data Structure **008** ("Production Date"). |
| `lotNumber` | A manufacturer-assigned batch/lot number (18 characters), used the same way "lot numbers" are used on any manufactured good — to trace a manufacturing batch (e.g. of a reagent or device) if something goes wrong with that batch. Present only if the barcode included Data Structure **035** ("MPHO Lot Number"). |

---

## 4. `donationIdentificationNumber` — the DIN (`UdiDonationIdentificationNumber`)

This is arguably the single most important field in the whole object. The **Donation
Identification Number (DIN)** identifies the original donation (a person's blood donation, a
tissue recovery, an egg/embryo, etc.) that this unit ultimately came from — and by international
rule, **it is guaranteed to be unique across the entire world for 100 years.** This is what makes
it possible to trace a unit of blood all the way back to the donor (and to every other product
made from that same donation) decades later if, say, a disease transmission is discovered.

It comes from Data Structure **001**, and is unusual among ISBT 128 structures because the barcode
prefix's second character doubles up as the first character of the actual data — a quirk of how
the standard was originally designed to save space.

| Field | Length | Meaning in plain language |
|---|---|---|
| `facilityIdentificationNumber` | 5 characters | The ID of the facility that *collected the donation* (e.g. the blood center where you rolled up your sleeve). Same kind of registered facility ID as the DI's `facilityIdentificationNumberOfProcessor`, but here it identifies the *collector*, not necessarily the *processor* — they can be different organizations. |
| `year` | 2 characters | The 2-digit year the donation was collected (e.g. `"24"` for 2024). |
| `sequenceNumber` | 6 characters | A sequential number the collecting facility assigns, incrementing for every donation it collects that year — like a ticket number. Facility + year + this sequence number together is what makes the whole thing globally unique. |
| `donationIdentificationNumber` | 13 characters | The full DIN: `facilityIdentificationNumber` + `year` + `sequenceNumber` concatenated together. This is the number you'd actually write down or search for in a database — the three fields above are just its component parts. |
| `flagCharacters` | 2 characters | Two extra characters tacked onto the end of the DIN. Historically these marked things like "this is a duplicate/reprinted label" or "this is a sample tube, not the main bag" — see `flagMeaning` below for what a given value means. In modern use, they most often carry a checksum instead (see `isChecksumFlag`). |
| `flagMeaning` | text | A human-readable translation of `flagCharacters`, e.g. `"Container 2 of a set"`, `"Pilot tube label"`, `"Donor record label"`, or `"ISO/IEC 7064 modulus 37-2 check character on the preceding 13 DIN characters"`. Looked up from ICCBBA's official flag-value table (ST-001 Table 3) so you don't have to memorize the numeric codes. |
| `isChecksumFlag` | `boolean` | `true` if, for this particular barcode, the flag characters were used as a **checksum** (an error-detecting code) rather than one of the "container/tube/label type" meanings above. Flag values 60–96 mean checksum; anything else means a label-type flag. |
| `checksumValid` | `boolean \| null` | Only meaningful when `isChecksumFlag` is `true`. `true` means the checksum was recomputed from the 13-digit DIN and it matches what's printed in the barcode — i.e. the scan almost certainly wasn't corrupted or mistyped. `false` means it does *not* match (possible scan error or data corruption — treat the DIN with suspicion). `null`/`undefined` when there was no checksum to check in the first place. |

**Why a checksum matters here:** because the DIN is the thread that ties a unit back to its donor
for a full century, a single mis-scanned digit could in theory link a product to the *wrong*
donor. The checksum lets software catch that kind of error automatically instead of silently
trusting a corrupted scan.

---

## 5. Quick glossary of abbreviations used above

| Abbreviation | Stands for | Where it appears |
|---|---|---|
| **DI** | Device Identifier | `UdiResult.DI` |
| **PI** | Production Identifier(s) | `UdiResult.PI` |
| **DIN** | Donation Identification Number | `PI.donationIdentificationNumber` |
| **FIN(P)** | Facility Identification Number (of the Processor) | `DI.facilityIdentificationNumberOfProcessor` |
| **FPC** | Facility-defined Product Code | `DI.facilityDefinedProductCode` |
| **PDC** | Product Description Code | `DI.productDescriptionCode` |
| **MPHO** | Medical Product of Human Origin (blood, tissue, cells, organs) | the general category ISBT 128 covers |
| **ICCBBA** | The nonprofit organization that owns/maintains the ISBT 128 standard | issues all the facility IDs and product codes referenced above |
| **ST-017** | The specific ICCBBA standard document that defines how to build a UDI out of ISBT 128 data structures | source of most definitions in this document |

---

## 6. Where each field's rules come from, if you want to go deeper

- `documents/ST-017-ISBT-128-Coding-and-Labeling-of-Medical-Devices-Containing-MPHO-v1.0.0.md` —
  defines the DI/PI split, Data Structure 034 (§2), and the PI table (§3).
- `documents/iccbba.md` — the full ISBT 128 technical specification (ST-001), including the DIN
  flag-character table (§3.1 / Table 3) referenced by `flagMeaning`.
- `typescript/src/types.ts` / `csharp/Iccbba.Isbt128/Types.cs` — the actual type definitions.
- `typescript/src/parser.ts` (`parseUdi`, `decodeDeviceIdentifier`, `decodeDonationIdentificationNumber`)
  / `csharp/Iccbba.Isbt128/Isbt128Parser.cs` — the code that fills in these fields from a raw barcode.
