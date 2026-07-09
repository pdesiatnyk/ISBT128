# **ISBT 128 STANDARD**

# **Coding and Labeling of Medical Devices Containing MPHO**

Version 1.0.0
**February 2019**

Tracking Number ICCBBA ST-017

ISBN-13: 978-1-933243-81-8
ISBN-10: 1-933243-81-3

Published by:
ICCBBA
PO Box 11309, San Bernardino, CA 92423-1309 USA

© 2019 ICCBBA, All Rights Reserved www.iccbba.org

> Copyright notice, licensing terms, and warranty disclaimer are identical in form to those in
> ST-001/ST-012 — implementation requires registration and an ICCBBA license; reproduction
> without written permission is forbidden. See the original PDF for full legal text.

## Editor

Erwin Cabana, Technical Manager, ICCBBA

## Standards Committee

John Armitage (UK), Paul Ashford (ICCBBA), Wayne Bolton (Australia), Suzanne Butch (USA),
Erwin Cabana (ICCBBA), Mónica Freire (ICCBBA), Jørgen Georgsen (Denmark), Mario Muon
(Portugal), Stefan Poniatowski (Australia), Leigh Sims Poston (USA), Ineke Slaper-Cortenbach
(Netherlands), Zbigniew Szczepiorkowski (USA), Izabela Uhrynowska-Tyszkiewicz (Poland).

## Table of Contents

1. Introduction (§1.1–1.6)
2. Device Identifier (§2.1 Processor Product Identification Code [DS034])
3. Production Identifiers (§3.1 DIN [DS001], §3.2 Product Divisions [DS032], §3.3 Expiration
   Date [DS004], §3.4 Production Date [DS008], §3.5 MPHO Lot Number [DS035])
4. Compound Messages (§4.1 [DS023], §4.2 Reference Table, §4.3 Creating Compound Messages)
5. Parsing the ISBT 128 UDI to Extract the Data Items
6. Labeling (§6.1 Bar Codes/2-D Symbols, §6.2 Text, §6.3 UDI on Higher Levels of Packaging)
7. Internationally Standardized Product Description Codes (PDCs)
8. Administrative Processes
9. Abbreviations
10. Glossary
Appendix 1: Basic UDI-DI
Appendix 2: Use Case for Medical Device Containing HCT/P in the United States

---

# 1 Introduction

## 1.1 Purpose

The purpose of this document is to provide requirements and guidance on using the ISBT 128
Standard for the coding and labeling of Medical Products of Human Origin (MPHO) that are
regulated as a medical device, or medical devices containing a MPHO component. The guidance
is designed to provide an ISBT 128 UDI solution that is compatible with the IMDRF UDI
Guidance: Unique Device Identification (UDI) of Medical Devices (2013). The European Union
requirement for a Basic UDI-DI is addressed in Appendix 1.

## 1.2 Scope

This document is a supplement to the *ISBT 128 Standard Technical Specification* (ST-001). It
provides specific requirements and guidance for facilities labeling medical devices that
contain Medical Products of Human Origin (MPHO) that are regulated as medical devices. It
focuses on Unique Device Identification (UDI) labeling.

## 1.3 Intended Audience

- Staff (management, IT, quality, validation, laboratory) in tissue banks or cellular therapy
  facilities that produce MPHO products regulated as medical devices;
- Software developers and label vendors that provide products for these facilities;
- Regulators/Competent Authorities.

## 1.4 Normative References

- *ISBT 128 Standard Technical Specification* (ST-001)
- *ISBT 128 Standard Product Description Code Database* (ST-010)
- IMDRF/UDI WG/N7 FINAL 2013 UDI Guidance: Unique Device Identification (UDI) of Medical
  Devices
- ISO/IEC 15415:2011(E) — 2-D bar code symbol print quality
- ISO/IEC 15459-2:2015(E) — Unique identifiers, registration procedures
- ISO/IEC 15459-4-2014(E) — Unique Identification, individual products and product packages
- ISO/IEC 15459-3:2014(E) — Unique identifiers, common rules
- ISO/IEC 16022:2006(E) (+Cor 1:2008, Cor 2:2011) — Data Matrix bar code symbology
- REGULATION (EU) 2017/745 on medical devices

## 1.5 Other References

- ICCBBA Website (www.iccbba.org)
- *Implementation Guide: Use of Dimensions [Data Structure 029]* (IG-026)
- *Implementation Guide: Use of the Donation Identification Number [Data Structure 001]* (IG-033)
- *ISBT 128 Facility Identification Number* (IG-034)

## 1.6 Background

In some countries, MPHO may be classified as biologics, drugs, advanced medicinal therapies,
medical devices, or other regulatory categories. This classification affects how the products
are labeled.

From a traceability standpoint, it is essential that all MPHO, regardless of regulatory
classification, be traceable from donor to recipient, and that all MPHO from a single donor
can be readily cross-referenced to support effective recall. Effective biovigilance requires
standardization of terminology and coding of products at a generic level.

This document discusses the coding and labeling of products containing an MPHO that are
classified as medical devices and fall within a regulatory requirement to carry a UDI.
Regulations describe a unique device identifier (UDI) that consists of a **device identifier
(DI)** and one or more **production identifiers (PI)**. This information must appear on the
label in two formats: Automatic Identification and Data Capture (AIDC) and Human Readable
Interpretation (HRI).

The DI includes static elements related to the device. **The DI is a mandatory, fixed portion
of a UDI that identifies the specific version or model of a device and the manufacturer of
that device.**

ICCBBA has developed an ISBT 128 UDI that satisfies international requirements of the
International Medical Device Regulators Forum (IMDRF), and also carries the critical
information required for biologics traceability and biovigilance.

The ISBT 128 UDI is based on ISBT 128 data structures that contain data identifiers. ISBT 128
UDI data strings will include such data identifiers that will allow the parsing of the DI and
PI elements.

**The ISBT 128 DI includes three elements: a Facility Identification Number, a Facility-defined
Product Code, and the ISBT 128 standardized Product Description Code (PDC).**

**The ISBT 128 Standard mandates the use of two production identifiers that are essential to
ensure traceability back to the donor and to other products derived from the same donor:**
- **the Donation Identification Number, and**
- **the Product Divisions Code (serial number).**

Other PIs may be optional, but if present on the label must be included in the UDI.

---

# 2 Device Identifier

Within ISBT 128, the Processor Product Identification Code [Data Structure 034] shall be used
to encode the Device Identifier (UDI-DI). This data structure includes a facility identifier
and an identifier specific to the type of product that is made up of two elements: a
6-character Facility-defined Product Code (FPC) and a 5-character standardized ISBT 128
Product Description Code (PDC).

## 2.1 Processor Product Identification Code (PPIC) [Data Structure 034]

**Purpose:** Data Structure 034 shall identify the processing or labeling facility, a
Facility-defined Product Code (FPC), and a standardized Product Description Code (PDC).

**Structure:** `=/nnnnnppppppqqqqq`

| Element | Length | Type |
|---|---|---|
| `=` | 1 | data identifier, first character |
| `/` | 1 | data identifier, second character |
| `nnnnn` | 5 | alphanumeric {A-N, P-Z, 0-9} |
| `pppppp` | 6 | alphanumeric {A-Z, 0-9} |
| `qqqqq` | 5 | alphanumeric {A–Z, 0-9} |

The 16-character data string, `nnnnnppppppqqqqq`, shall be encoded and interpreted as follows:

- **`nnnnn`** shall specify the Facility Identification Number, or the FIN(P), of the facility
  that assigned the PDC. For a UDI, this facility would be the manufacturer. The FIN(P) is
  issued by ICCBBA as the Issuing Agency for ISBT 128 identifiers and is encoded/interpreted by
  reference to the Registered Facilities Database. The facility that assigned the PDC may, or
  may not, be the same facility that assigned the Donation Identification Number (DIN).
- **`pppppp`** shall specify a Facility-defined Product Code (FPC) assigned by the processing or
  manufacturing facility indicating a catalog or other number that identifies the type of
  product within its system. If a value is not required, the default value `000000` (zeroes)
  shall be used; if shorter than 6 characters, leading zeroes shall be used. **This code shall
  distinguish between two products that have the same standardized PDC but require different
  DIs** (e.g. two slightly different product lines, or a product change requiring a new DI but
  not a new PDC).
- **`qqqqq`** shall specify the Product Description Code (PDC), encoded/interpreted by
  reference to the ISBT 128 Product Description Code Database. See §7 for selection guidance.

**Figure 1 — example:** `=/A9997AB3456T0123` → FIN(P) = `A9997`, FPC = `AB3456`, PDC = `T0123`.

---

# 3 Production Identifiers

The IMDRF Guidance indicates that Production Identifiers (PIs) include: Serial number,
Lot/Batch number, Manufacturing and/or Expiration date. **For medical devices containing MPHO
the donation identification number is an additional essential PI.**

**Table 1 — Production Identifiers**

| UDI Identifier | ISBT 128 Data Structure [Number] |
|---|---|
| Donation Identification Number | Donation Identification Number [001] |
| Serial Number | Product Divisions [032] |
| Expiration Date | Expiration Date [004] |
| Manufacturing Date | Production Date [008] |
| Lot/Batch Number | MPHO Lot Number [035] |

**To provide traceability for a MPHO, ISBT 128 requires that the PI shall include:**
- **The Donation Identification Number (DIN)**
- **The Product Divisions Code** (this code, in conjunction with the Product Description Code
  within the DI, is used to uniquely identify each product from a donation event)

The expiration date, manufacturing (production) date, and lot number shall be included as part
of the PI if they are used on the label.

## 3.1 Donation Identification Number [Data Structure 001]

> Note: This is the only data structure in which the second character of the data identifier
> shall be part of the data content.

**Purpose:** Data Structure 001 shall specify a Donation Identification Number (DIN) that is a
unique identification of: (1) a donation event [collection or recovery]; (2) a product pool;
(3) for plasma derivatives, a unique identification of an aliquot from a pooled plasma
derivative product; and (4) a fertilized oocyte/embryo formed through ART. Also specifies flag
character values. **The DIN shall be globally unique for a one hundred year period.**

**Structure:** `=αppppyynnnnnnff`

| Element | Length | Type |
|---|---|---|
| `=` | 1 | data identifier, first character |
| `α` | 1 | data identifier, second character, alphanumeric {A–N; P–Z; 1–9} |
| `pppp` | 4 | first 2 chars alphanumeric {A-N, P-Z, 0-9}; last 2 numeric {0-9} (current usage: all 4 numeric) |
| `yy` | 2 | numeric {0–9} |
| `nnnnnn` | 6 | numeric {0–9} |
| `ff` | 2 | alphanumeric {0–9}, {A-H, J-N, P, R-Y} |

The 15-character content `αppppyynnnnnnff`:
- **`αpppp`** = Facility Identification Number (FIN) of the organization that assigned the DIN
  (Registered Facilities Database).
- **`yy`** = last two digits of the year in which the DIN was assigned ("nominal" year — DIN
  labels may be used up to one month before/after the shown year; for a tissue processing
  facility, the year code may be the donation-event year OR the year of first processing,
  used consistently within the facility).
- **`nnnnnn`** = sequence number for the collection/recovery event, product pool, or aliquot,
  within the given year for that FIN.
- **`ff`** = flag characters — at present, **shall not be used** for medical devices with an
  MPHO element; value set to `00`. Part of the DIN data structure but not part of the DIN itself.

**Figure 2 — example:** `=A99991712345600` → FIN `A9999`, Year `17`, Sequence `123456`, flags `00`.

## 3.2 Product Divisions [Data Structure 032]

**Purpose:** Data Structure 032 shall convey information about: aliquots, or one or more
individual collections from the donor within the same donation event. The division code may
represent: one of the subunits from a single divided container (aliquot/split); one of the
containers from a collection requiring more than one container; or a single collection into
one container. **The Product Divisions shall serve as a serial number for MPHO regulated as
medical devices.**

**Structure:** `=,dddddd`

| Element | Length | Type |
|---|---|---|
| `=` | 1 | data identifier, first character |
| `,` | 1 | data identifier, second character |
| `dddddd` | 6 | alphanumeric {A-Z, 0-9} |

`dddddd` shall specify the division code.

While ISBT 128 is used for all MPHO, not all MPHO use the same set of data structures as
medical devices. **Within medical devices, the essential traceability identifiers are the
FIN(P) and PDC from the DI, and the DIN and Product Divisions Code from the PI.** The FPC is
used to identify sub-categories of products sharing one PDC, but the FPC is **not** part of the
ISBT 128 traceability information (not internationally standardized) and **cannot be used to
create uniqueness for the product** — if multiple FPCs map to one PDC, Product Division Codes
must be used to uniquely identify each product.

**Table 2 — Use of Product Division Codes to Create Uniqueness** (all products share DIN
`A9998 17 132343`):

| FPC | PDC | FIN(P) | Product Divisions Code | Description |
|---|---|---|---|---|
| XYZ123 | T0475 | A9999 | 000001 | Bone, Putty ... Carrier and applicator, 2 mL |
| XYZ124 | T0475 | A9999 | 000002 | Bone, Putty ... Carrier and applicator, 5 mL |
| XYZ125 | T0475 | A9999 | 000003 | Bone, Putty ... Carrier and applicator, 10 mL |
| XYZ126 | T0475 | A9999 | 000004 | Bone, Putty ... Carrier and applicator, 15 mL |

For products with the same DIN, if the PDC and FIN(P) are the same, **the Product Divisions
Code must be used to create uniqueness — the FPC cannot be used for this purpose** (in this
example the FPC happens to encode volume, which isn't part of the PDC).

## 3.3 Expiration Date [Data Structure 004]

**Purpose:** Data Structure 004 shall indicate the date at the end of which the item expires.

**Structure:** `=>cyyjjj`

| Element | Length | Type |
|---|---|---|
| `=` | 1 | data identifier, first character |
| `>` | 1 | data identifier, second character |
| `c` | 1 | numeric {0–9} |
| `yy` | 2 | numeric {0–9} |
| `jjj` | 3 | numeric {0–9} |

`c` = century of the expiry year; `yy` = year within century; `jjj` = ordinal (Julian) day
within the calendar year.

## 3.4 Production Date [Data Structure 008]

**Purpose:** Data Structure 008 shall indicate the date on which the product was produced.

**Structure:** `=}cyyjjj` (same `c`/`yy`/`jjj` encoding as §3.3, but for production date).

## 3.5 MPHO Lot Number [Data Structure 035]

**Purpose:** Data Structure 035 shall be used for the lot number of medical products of human
origin.

**Structure:** `&,1xxxxxxxxxxxxxxxxxx`

| Element | Length | Type |
|---|---|---|
| `&` | 1 | data identifier, first character |
| `,` | 1 | data identifier, second character |
| `1` | 1 | data identifier, third character |
| `xxxxxxxxxxxxxxxxxx` | 18 | alphanumeric {A–Z; 0–9} |

`xxxxxxxxxxxxxxxxxx` = facility-defined lot number, up to 18 characters.

---

# 4 Compound Messages

To convey the full UDI (DI + PI) in a single encoded message, a compound message is needed.
This data structure allows multiple data structures to be combined into a single message and
may be used with high-capacity delivery mechanisms such as 2-D symbols and RFID tags.

## 4.1 Compound Message [Data Structure 023]

**Purpose:** Data Structure 023 shall allow multiple data structures to be combined into a
single data string.

**Structure:** `=+aabbb`

| Element | Length | Type |
|---|---|---|
| `=` | 1 | data identifier, first character |
| `+` | 1 | data identifier, second character |
| `aa` | 2 | numeric {0-9} |
| `bbb` | 3 | numeric {0-9} |

- `aa` = number of ISBT 128 data structures that follow.
- `bbb` = all zeroes (undefined message — sequence not specified), or a 3-digit reference into
  ICCBBA's Table W2 [RT017] "ICCBBA-Specified Compound Messages" (ST-001) specifying the exact
  sequence. ICCBBA now encourages the use of undefined messages, given the combinatorial
  complexity of specified-sequence codes.

**Rules for constructing compound messages:**
1. Comprises a string of ISBT 128 data structures (excluding nationally defined structures),
   beginning with DS023.
2. Data structures are combined with no intervening characters; each begins with its own DI.
3. Only ISBT 128 data structures (non-national) may appear.
4. `aa` = the count of following data structures.
5. Unspecified sequence: `bbb` = `000`.
6. Specified sequence: `bbb` = the RT017 reference number; order must match RT017's listing.

**To satisfy medical device regulations, the compound message shall always begin with the
Processor Product Identification Code [Data Structure 034] (the DI).** In addition, to meet
traceability requirements, the Product Divisions [032] and Donation Identification Number [001]
shall also be present. Any additional PIs present on the label must also be encoded (additional
PIs not on the label may optionally be included). Non-UDI data structures, if included, must
appear after the PIs.

## 4.2 Reference Table for Compound Messages (Specified Sequence)

**Table 3 — Specified Sequence Compound Messages for MPHO Devices** (excerpt from Table W2
[RT017]):

| ICCBBA-Specified Message Number | Data Structures |
|---|---|
| 034 | Processor Product Identification Code [034], Product Divisions [032], Donation Identification Number [001] |
| 035 | [034], [032], [001], Expiration Date [004] |
| 036 | [034], [032], [001], Production Date [008] |
| 037 | [034], [032], [001], Expiration Date [004], Production Date [008] |

## 4.3 Creating Compound Messages

### 4.3.1 Creating a Compound Message (Unspecified Sequence)

Desired structures/order: PPIC [034], DIN [001], Product Divisions [032], Expiration Date
[004].

| Data Structure | Information | Data Identifier + Content |
|---|---|---|
| PPIC (DI) | Facility A9997, FPC XYZ100, PDC T0479 | `=/A9997XYZ100T0479` |
| DIN | A999917123456 | `=A99991712345600` |
| Product Divisions | 12 | `=,000012` |
| Expiration Date | 31 JAN 2019 | `=>019031` |

Resulting compound message: `=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031`

(`=+` compound-message DI, `04` = four structures follow, `000` = unspecified sequence.)

### 4.3.2 Creating a Compound Message (Specified Sequence)

Same four structures, ordered PPIC → Product Divisions → DIN → Expiration Date, correspond to
RT017 message `035`:

**Table 4 — Excerpt from RT017**

| ID | # Structures | Data Structure Numbers | Data Structures |
|---|---|---|---|
| 035 | 04 | [034];[032];[001];[004] | Processor Product Identification Code;Product Divisions;Donation Identification Number;Expiration Date |

Resulting compound message: `=+04035=/A9997XYZ100T0479=,000012=A99991712345600=>019031`

---

# 5 Parsing the ISBT 128 UDI to Extract the Data Items

**Table 5 — ISBT 128 UDI for Medical Devices Containing MPHO**

| Issuing Agency | Data Identifiers | Identifier | Data type | Human Readable Barcode Field Size | Database Field Size |
|---|---|---|---|---|---|
| ICCBBA | `=/` | DI (Device Identifier) | Alphanumeric | 18 | 16 |
| ICCBBA | `=,` | Serial Number | Alphanumeric | 8 | 6 |
| ICCBBA | `=` | Donation Identification Number | Alphanumeric | 16 | 15 |
| ICCBBA | `=>` | Expiration Date | numeric [YYYJJJ] | 8 | 6 |
| ICCBBA | `=}` | Manufacturing Date | numeric [YYYJJJ] | 8 | 6 |
| ICCBBA | `&,1` | MPHO Lot Number | Alphanumeric | 21 | 18 |

Example Human Readable Interpretation:
`=/A9999XYZ100T0476=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123`

Example full compound-message input:
`=+06000=/A9999XYZ100T0476=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123`

Parsing notes:
- Elements are divided by `=` or `&`.
- First element (`=+06000`) is the compound message header.
- Second element (`=/...`) is the DI — the 16 data characters following `=/` are
  `A9999XYZ100T0476`.
- Remaining elements are PIs and may appear in any order, each self-identified by its DI. DIN
  and Product Divisions (serial number) are the mandatory PIs; any other PI present on the
  label must also be encoded.
- Product Divisions (`=,000025`) = "the serial number of a specific device."
- DIN (`=` + 15 chars, but only the first 13 are the DIN itself — the trailing 2 are flag
  characters, ignored): `A999717123456`.
- Expiration Date (`=>019032`) and Manufacturing Date (`=}017032`) use `YYYJJJ` (3-digit year +
  3-digit Julian day).
- Lot Number (`&,1` + 18 chars) = `000000000000XYZ123`.
- If non-UDI data structures are included, they appear after the PIs.
- If presented as linear barcodes (not a compound message), each element is carried in its own
  Code 128 symbol, individually identified by its DI.

---

# 6 Labeling

## 6.1 Bar Codes and 2-D Symbols

Linear bar codes use Code 128; 2-D symbols use Data Matrix, per ISO/IEC 15415/15416/15417/16022
and ST-001. Linear bar codes may be used if label space permits, but separate bar codes are
needed for the DI and each PI data structure.

## 6.2 Text

Both AIDC-corresponding human-readable text and ICCBBA-specified text should be printed.

### 6.2.1 ICCBBA-Specified Text

Should be human-readable, may be printed in any order, may omit leading zeroes. Font must
distinguish similar characters (0/O, 1/I). At minimum, near the electronically-readable symbol:
the Donation Identification Number, the Product Description Code, and the Product Divisions
Code (serial number). Processor identity, expiration date, and lot number placement is
flexible.

**Table 6 — Abbreviations Found on Labels**

| Information | Recommended Abbreviation(s) |
|---|---|
| Donation Identification Number | DIN |
| Product Description Code | Prod Code or PC |
| Product Divisions Code | Pack, Serial Number, or SN |
| Expiration Date | Exp or Exp Date |
| Manufacturing or Production Date | Mnf Date or Prod Date |
| Lot Number | Lot No. or LN |

Expiration date, if printed as ICCBBA-specified text, uses `YYYY-MM-DD`. Printed DIN should
include a check character (see IG-033) — the FIN, year, sequence, flag characters (rotated 90°),
and check character (boxed); the first DI character is never printed, the second is printed
only because it doubles as the first FIN character.

### 6.2.2 UDI Human Readable Interpretation

Follows the ISBT 128-specified format; data structures appear in the order they appear in the
electronically-readable symbol. **Do NOT print** the compound-message data identifier and
message code (`=+04000`/`=+04035` etc.) in the human-readable text — only the DI and PI
segments themselves.

## 6.3 UDI on Higher Levels of Packaging

Most MPHO ship as individual devices (one-device packages). Facilities routinely packaging
multiple devices should consult ICCBBA (iccbba@iccbba.org) for guidance on both individual- and
multi-device-package UDIs.

---

# 7 Internationally Standardized Product Description Codes (PDCs)

Standardized PDCs are the last 5 characters of the Processor Product Identification Code [034]
(the DI), mapping via a reference table to a standardized product description. Products are
described via Class + Attributes (ST-002). The PDC contains manufacturing information but is
**not** a complete manufacturing-process record.

## 7.1 Terminology

- **Class** — a general product description (e.g. "Bone, Paste" or "Tendon, Achilles").
- **Attributes** — additional descriptive information, organized into mutually-exclusive
  groups, each with a default value if unselected.

## 7.2 Structure of Product Descriptions within the Database

Class and Attributes are `|`-delimited in the database description field: `CLASS|Attribute`
or `CLASS|Attribute|Attribute`. E.g. `T0474` → `BONE, PUTTY|Demineralized:Yes`; `T0475` →
`BONE, PUTTY|Radiation sterilization|Demineralized:Yes|Carrier and applicator`. Description-field
attribute order does not dictate label text order (consult national guidelines).

## 7.3 PDC Database

Full structure in *ISBT 128 Standard Product Description Code Database* (ST-010); published as
a password-protected Microsoft Access file on the ICCBBA website.

## 7.4 Selecting PDCs

Tissue PDCs begin with `T`. "Retired" codes (flagged via a Retired Date column) are kept for
backward compatibility but should not be assigned to new products. Facilities determine
encoding detail level per national guidelines; product dimensions (volume, length, etc.) are
carried separately via Dimensions [Data Structure 029] (IG-026), not the PDC. The online
Product Lookup Program (iccbba.org/lookup-tools/find-product-information) simplifies PDC
search, refreshed ~monthly.

## 7.5 Requesting New PDCs

Via the Product Lookup Program if no exact match exists (new Class/Attribute combinations added
~10×/year); for wholly new Classes/Attribute groups, contact the ICCBBA Technical Manager with
an ST-002-compatible definition for Standards-Committee review.

---

# 8 Administrative Processes

## 8.1 Registration and Licensing

ISBT 128 coding is limited to MPHO; devices without an MPHO component should use another issuing
agency. Facilities must register with ICCBBA and pay the annual license fee before
implementing. FINs (including the one used for the DI, Data Structure 034) are assigned by
ICCBBA; an organization may hold more than one FIN (see IG-034).

## 8.2 Nonconformities with the ISBT 128 Standard

ICCBBA provides technical support (including label review) via its help desk
(iccbba@iccbba.org), and works with non-compliant facilities toward a Corrective Action Plan.

## 8.3 Suspension and Revocation of License

A license is suspended if a facility can't substantially comply within a reasonable time after
notification; revoked if the suspension exceeds 12 months with no compliance attempt. ICCBBA
notifies the facility and appropriate competent authorities in writing.

---

# 9 Abbreviations

| Abbreviation | Meaning |
|---|---|
| AIDC | Automatic Identification and Data Capture |
| ASTM | (Formerly) American Society for Testing and Materials, now ASTM International |
| DI | Device Identifier |
| DIN | Donation Identification Number |
| EU | European Union |
| FIN | Facility Identification Number |
| FIN(P) | Facility Identification Number of the Processing Facility |
| FPC | Facility-Defined Product Code |
| GUDID | Global Unique Device Identification Database |
| HCT/P | Human Cells, Tissues, and Cellular and Tissue-Based Products |
| HRI | Human Readable Interpretation |
| IEC | International Electrotechnical Commission |
| IMDRF | International Medical Device Regulators Forum |
| ISO | International Standards Organization |
| MPHO | Medical Products of Human Origin |
| PDC | Product Description Code |
| PI | Production Identifier(s) |
| PPIC | Processor Product Identification Code |
| UDI | Unique Device Identifier |
| UDID | Unique Device Identifier Database |

---

# 10 Glossary

| Term | Definition |
|---|---|
| **Data Content** | The characters in a data structure that encode the information for which it is named; excludes the data identifier (DIN, §3.1, is the one exception). |
| **Data Identifier** | The first 2–3 characters identifying the data structure. Always present in a bar code; may be omitted where identity is otherwise unambiguous (e.g. electronic messaging). DIN's second DI character can never be dropped, since it's also part of the data content. |
| **Data Structure** | Information content comprising the data identifier + data content. Excludes symbology-specific start/stop codes, check characters, and control characters when represented as a bar code. |
| **Device Identifier (DI)** | A mandatory, fixed portion of a UDI that identifies the specific version or model of a device and the Manufacturer of that device. |
| **Medical Device** | Per the Global Harmonization Task Force definition (GHTF/SG1/N29:2005 revision): any instrument/apparatus/implement/machine/appliance/implant/reagent/software/material intended for one or more specific medical purposes (diagnosis, prevention, monitoring, treatment, alleviation of disease/injury; investigation/replacement/modification/support of anatomy or physiological process; supporting/sustaining life; contraception; disinfection of medical devices; in vitro diagnostic information) that does not achieve its primary action by pharmacological/immunological/metabolic means (though may be assisted by such means). |
| **Ordinal Date** | Numbers Jan 1 as day 1, Dec 31 as day 365/366 (leap year). Also called Julian Date. |
| **Production Identifier (PI)** | A conditional, variable portion of a UDI identifying one or more of: (i) lot/batch; (ii) serial number of a specific device; (iii) expiration date; (iv) manufacture date; (v) for MPHO regulated as a device, **the donation identification number**. |
| **Text** | The human-readable representation of information. |
| **Human Readable Interpretation (HRI)** | A legible interpretation of the data characters encoded in the UDI Carrier; must include the DI, PIs, and their data identifiers. |
| **ICCBBA-specified text** | Text corresponding to traceability-required information plus a descriptive label (e.g. "Donation Identification Number"). Traceability-required info: FIN(P), DIN, Product Code, Product Divisions Code. |
| **Unique Device Identifier (UDI)** | An identifier that adequately identifies a device through its distribution and use; composed of a device identifier and a production identifier. |

---

# Appendix 1: Basic UDI-DI

## Background

EU UDI implementation (Regulation (EU) 2017/745/746) requires a **Basic UDI-DI** as the main
key in the EU database (Eudamed), linking products with different UDI-DI that share the same
intended purpose, risk class, and essential design/manufacturing characteristics. Per European
Commission requirements: max 25 characters, format as close as possible to the UDI-DI, and must
include a check digit/character based on an issuing-entity algorithm provided to the Commission
and manufacturers.

ICCBBA's Basic UDI-DI format is **identical to the UDI-DI format**, plus 2 additional digits
forming a mod-37,2 checksum. Manufacturers must retain a mapping between Basic UDI-DI and every
related UDI-DI:
- **1:1 mapping**: data content (excluding checksum) is identical in both identifiers.
- **1:many, same PDC**: Basic UDI-DI carries that PDC in `qqqqq`.
- **1:many, multiple PDCs**: `qqqqq` is set to `00000`.

## Purpose and Structure of the Basic UDI-DI

**Purpose:** Main key in Eudamed and relevant documentation, connecting devices sharing intended
purpose/risk class/essential design & manufacturing characteristics. Independent of the
device's packaging/labelling; never appears on any trade item.

**Structure:** `nnnnnppppppqqqqqbb`

| Element | Length | Type |
|---|---|---|
| `nnnnn` | 5 | alphanumeric {A-N, P-Z, 0-9} |
| `pppppp` | 6 | alphanumeric {A-Z, 0-9} |
| `qqqqq` | 5 | alphanumeric {A–Z, 0-9} |
| `bb` | 2 | alphanumeric {A–Z, 0-9} |

`nnnnn`/`pppppp`/`qqqqq` are as in DS034 (§2.1) — FIN(P), FPC, PDC (`qqqqq` = `00000` if the
Basic UDI-DI maps to multiple PDCs). `bb` = 2-digit modulus 37-2 checksum.

## Calculating the Basic UDI-DI Checksum

Verify by computing the checksum over the first 16 characters and comparing to the last 2.
Based on ISO 7064 Mod 37-2:

1. Look up each of the 16 characters' ISO 7064 check value (Table 7).
2. Weight each by 2^n, where n = position from the right-hand end (rightmost = 1).
3. Sum the weighted values.
4. Take modulus 37 of the sum.
5. Subtract that value from 38.
6. Take modulus 37 of the result.
7. Zero-pad to 2 digits if a single digit.
8. Result = the mod 37-2 checksum.

**Table 7 — Character to ISO/IEC 7064 Check Values [RT061]**

| Char | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Value | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 |

### Example Calculation — `A9990ABC123T0480`

| Char | Check value | Position (n, from right) | 2^n | Weighted |
|---|---|---|---|---|
| A | 10 | 16 | 65536 | 655360 |
| 9 | 9 | 15 | 32768 | 294912 |
| 9 | 9 | 14 | 16384 | 147456 |
| 9 | 9 | 13 | 8192 | 73728 |
| 0 | 0 | 12 | 4096 | 0 |
| A | 10 | 11 | 2048 | 20480 |
| B | 11 | 10 | 1024 | 11264 |
| C | 12 | 9 | 512 | 6144 |
| 1 | 1 | 8 | 256 | 256 |
| 2 | 2 | 7 | 128 | 256 |
| 3 | 3 | 6 | 64 | 192 |
| T | 29 | 5 | 32 | 928 |
| 0 | 0 | 4 | 16 | 0 |
| 4 | 4 | 3 | 8 | 32 |
| 8 | 8 | 2 | 4 | 32 |
| 0 | 0 | 1 | 2 | 0 |

Sum = 1,211,040 → mod 37 = 30 → 38 − 30 = 8 → mod 37 = 8 → zero-padded = `08`.

Result: **`A9990ABC123T048008`** (Basic UDI-DI with checksum `08`).

---

# Appendix 2: Use Case for Medical Device Containing HCT/P in the United States

## Background

HCT/P products are derived from human donors and have unique supply-chain characteristics:
- A single donor can source many different products (skin, tendons, heart valves, bone, etc.)
  sharing a common history.
- HCT/P carry a disease-transmission risk that testing/processing minimizes but never
  eliminates.
- Following any detected transmission, all products from that donor must be rapidly
  recallable, and all recipients traceable/followable-up.
- HCT/P traceability therefore needs an identifier trackable recipient→donor and donor→recipient
  — FDA regulation calls this the **"distinct identification code"** (21 CFR 1271.290(c)).
- This identifier must be captured at every supply-chain point for rapid tracking/recall.

Past traceability has been sub-optimal (slow, sometimes incomplete) due to lack of
standardization in the distinct identification code's structure/presentation, lack of its
uniqueness across the supply chain, and lack of a standardized electronic format.

**Within ISBT 128, the Donation Identification Number (DIN) fulfils the role of the distinct
identification code** — standardized, globally unique, and carried with its own PI for easy
parsing from the UDI.

## Use Case in the United States

> Note: ISBT 128 requires that the same distinct identification code (DIN) be used on all
> tissue products prepared from a particular donor by a specified tissue processor.

Mr. Smith requires a tendon-with-suture implant (a medical device containing an HCT/P) during
ACL repair. The product, received via a tissue bank and distributor, is entered into hospital
inventory by scanning its ISBT 128 UDI barcodes (DI + PIs for DIN, serial number, expiration
date — see the example HCT/P label: `Donation Identification Number: A9997 17 123456`, `Product
Code: T0480`, `Serial Number: 02`, `Expiration Date: 2018-01-08`). At transplant time, the UDI
label is scanned; the implant record uses the UDI DI and PIs in Mr. Smith's electronic medical
record.

Months later, Mr. Smith tests positive for Hepatitis C. The hospital informs the tissue
processor and CDRH, who alert CDC. The tissue processor's additional donor-sample testing
detects low-level HCV; CDC's epidemiologic/laboratory investigation finds significant
transmission probability, and issues a Health Alert Network advisory to withdraw all HCT/P
carrying the implicated distinct identification code (DIN). The manufacturer issues a voluntary
recall; CDC/state/local health departments identify and contact other hospitals that may have
received product from the same donor.

Facilities enter the distinct identification code (DIN) into their tissue/materials-management
systems, which search inventory for products to withdraw and flag the code on a reference list
(alerting on any future attempt to receive recalled product), and into their electronic patient
record systems, which search for patients who received a UDI carrying that DIN for follow-up.
