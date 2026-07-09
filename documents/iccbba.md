ISBT 128 logo

# ISBT 128 STANDARD
## Technical Specification

Version 6.2.2
**April 2023**

Tracking Number ICCBBA ST-001

ISBN-13: 978-1-957177-07-6

ICCBBA logo

Published by:
**ICCBBA**
PO Box 11309, San Bernardino, CA 92423-1309 USA

ISBT 128 Standard Technical Specification v6.2.2                                               2

# COPYRIGHT, WARRANTY, AND LIABILITY NOTICE

Copyright 2023. ISBT 128 is not in the public domain and is protected by law.
Implementation of ISBT 128 requires the end-user to register with ICCBBA and to pay an annual license fee. License fees are established by the ICCBBA Board of Directors to cover the expenses of maintaining and extending ISBT 128, and making available current versions of documents and database tables.

Any use of this document, or the accompanying database tables, by other than registered organizations, or facilities that have obtained their computer software from a registered and licensed developer, is strictly forbidden. Copying any portion of the Standard, or of any accompanying database table, either in electronic or other format, without express written permission from ICCBBA is strictly forbidden. Posting of any portion of the Standard, or of any accompanying database tables, to any online service by anyone other than ICCBBA is strictly forbidden.

ICCBBA provides no representation or warranty that the Licensee’s use of ISBT 128 is suitable for any particular purpose and the selection, use, efficiency and suitability of ISBT 128 is the sole responsibility of the Licensee.

ICCBBA’s liability is limited to that specified in the ICCBBA License Agreement which is available on the ICCBBA website. Under no circumstances shall ICCBBA’s liability to licensee or any third party under any theory or cause of action exceed the current annual license fee payable by the licensee to ICCBBA hereunder, and ICCBBA will in no circumstances be liable for any direct or indirect damages whatsoever, including without limitation special, incidental, consequential, or punitive damages or damages for loss of data, business or goodwill or any other consequential losses of any nature arising from the use of ISBT 128 or the marks.

This document may be translated, without written permission, provided that the translation indicates that it is a translation from an ICCBBA copyrighted document and that ICCBBA is not responsible for the accuracy of the translation.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 3

### Editors

Erwin Cabana, BA
Technical Manager, ICCBBA

### Standards Committee

Wayne Bolton, BAppSc, MAppSc | Standards Committee, APTAG, TAG-IT Chair
Jolanta Antoniewicz-Papis, PhD | EMATAG Chair
Debbie Barnett, MBE, RGN, RM, BSc | MBTAG Chair
Suzanne Butch, MA, MT(ASCP)SBB | Technical Expert
Jørgen Georgsen, MD | Technical Expert
Martin Hildebrandt, MD | RMTAG Chair
Jelena Holovati, PhD, MLT(CSMLS), MT(ASCP) | NATTAG Chair
Kathleen Hopping, MS, BS | ATAG Chair
Eoin McGrath, BA | ICCBBA Executive Director
Karen Moniz, MHA, MT(ASCP)SBB | ICCBBA Technical Director
Diego Ponzin, MD | EBTAG Chair
Leigh Sims Poston, BS, MT(ASCP) | Technical Expert
Zbigniew Szczepiorkowski, MD, PhD, FCAP | CTCLAG Chair
Kelly Tilleman, PhD, MSc | ARTTAG Chair
Izabela Uhrynowska-Tyszkiewicz, MD, PhD | ETTAG, ITTAG Chair



<page_number>3</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 4

# Table of Contents

1 Introduction ................................................................................................................................... 8
 1.1 Purpose ................................................................................................................................... 8
 1.2 Scope ...................................................................................................................................... 8
 1.3 Intended Audience ................................................................................................................... 8
 1.4 Normative References .............................................................................................................. 8
 1.5 Other References ................................................................................................................... 11
 1.6 Background ............................................................................................................................ 12
 1.7 Changes in this Version .......................................................................................................... 13
2 Data Structures ........................................................................................................................... 14
 2.1 Data Identifiers ....................................................................................................................... 14
 2.2 The Role of Data Identifiers in ISBT 128 Bar Codes ............................................................... 17
 2.3 Data Structure Index .............................................................................................................. 17
 2.4 Description of the Data Structures .......................................................................................... 25
  2.4.1 Donation Identification Number [Data Structure 001] .......................................................... 25
  2.4.2 Blood Groups [ABO and RhD] [Data Structure 002] .......................................................... 28
  2.4.3 Product Code [Data Structure 003] .................................................................................... 30
  2.4.4 Expiration Date [Data Structure 004] ................................................................................. 34
  2.4.5 Expiration Date and Time [Data Structure 005] .................................................................. 35
  2.4.6 Collection Date [Data Structure 006] ................................................................................. 36
  2.4.7 Collection Date and Time [Data Structure 007] .................................................................. 37
  2.4.8 Production Date [Data Structure 008] ................................................................................ 38
  2.4.9 Production Date and Time [Data Structure 009] ................................................................. 39
  2.4.10 Special Testing: General [Data Structure 010] .................................................................. 40
  2.4.11 Special Testing: Red Blood Cell Antigens [Data Structure 011]—RETIRED ....................... 41
  2.4.12 Special Testing: Red Blood Cell Antigens—General [Data Structure 012] .......................... 42
  2.4.13 Special Testing: Red Blood Cell Antigens—Finnish [Data Structure 013] .......................... 43
  2.4.14 Special Testing: Platelet HLA and Platelet Specific Antigens [Data Structure 014] ............ 44
  2.4.15 Special Testing: HLA-A and -B Alleles [Data Structure 015]—RETIRED ........................... 46
  2.4.16 Special Testing: HLA-DRB1 Alleles [Data Structure 016]—RETIRED ................................ 48
  2.4.17 Container Manufacturer and Catalog Number [Data Structure 017] ................................... 49
  2.4.18 Container Lot Number [Data Structure 018] ...................................................................... 51
  2.4.19 Donor Identification Number [Data Structure 019] ............................................................. 52
  2.4.20 Staff Member Identification Number [Data Structure 020] ................................................. 54
  2.4.21 Manufacturer and Catalog Number: Items Other Than Containers [Data Structure 021] ..... 55
  2.4.22 Lot Number: Items Other Than Containers [Data Structure 022] ........................................ 56
  2.4.23 Compound Message [Data Structure 023] ........................................................................ 57
  2.4.24 Patient Date of Birth [Data Structure 024] ........................................................................ 59
  2.4.25 Patient Identification Number [Data Structure 025] ........................................................... 60
  2.4.26 Expiration Month and Year [Data Structure 026] .............................................................. 61
  2.4.27 Transfusion Transmitted Infection Marker [Data Structure 027] ......................................... 62
  2.4.28 Product Consignment [Data Structure 028] ....................................................................... 63
  2.4.29 Dimensions [Data Structure 029] ..................................................................................... 65
  2.4.30 Red Cell Antigens with Test History [Data Structure 030] ................................................. 67
  2.4.31 Flexible Date and Time [Data Structure 031] .................................................................... 69
  2.4.32 Product Divisions [Data Structure 032] ............................................................................. 71
  2.4.33 Processing Facility Information Code [Data Structure 033] ............................................... 73
  2.4.34 Processor Product Identification Code [Data Structure 034] .............................................. 75
  2.4.35 MPHO Lot Number [Data Structure 035] .......................................................................... 77
  2.4.36 MPHO Supplemental Identification Number [Data Structure 036] ...................................... 78
  2.4.37 Global Registration Identifier for Donors [Data Structure 037]—RETIRED ........................ 79
  2.4.38 Single European Code [Data Structure 038] ..................................................................... 80
  2.4.39 Global Registration Identifier for Donors [Data Structure 039] .......................................... 81
  2.4.40 Chain of Identity Identifier [Data Structure 040] ................................................................ 82
 2.5 Non-ICCBBA Defined Data Structures ................................................................................... 83
  2.5.1 Data Structures Not Defined by ICCBBA ............................................................................ 83

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 5

2.5.2 Reserved Data Identifiers for a Nationally Specified Donor Identification Number ........................ 84
2.5.3 Confidential Unit Exclusion Status Data Structure .................................................................... 84
3 Reference Tables ............................................................................................................................. 85
3.1 Reference Tables Maintained in this Document ........................................................................... 85
4 Reference Tables Maintained on Websites ..................................................................................... 111
4.1 Data Structures 015 and 016: HLA Genomic Typing................................................................... 111
4.2 Table W1 Data Structures 017 and 021: Manufacturer Identifier Codes [RT016] ....................... 111
4.3 Table W2 Data Structure 023: ICCBBA-Specified Compound Messages [RT017] ....................... 111
4.4 Data Structure 030: Red Cell Antigens with Test History ............................................................ 112
4.5 Data Structures 024 and 025: Patient Date of Birth and Patient Identification Number,
Location Code Table [RT018] ........................................................................................................ 112
4.6 Facility Type Codes Used in the Registered Facilities Database Table [RT058] ......................... 112
5 Database Tables.............................................................................................................................. 113
5.1 Product Description Codes .......................................................................................................... 113
5.2 Special Testing: General [Data Structure 010] ............................................................................. 115
5.3 Facility Identification Number Identification Code ........................................................................ 116
5.4 GRID Issuing Organization Identification Number ........................................................................ 117
6 Delivery Mechanisms for ISBT 128 Data Structures ....................................................................... 118
6.1 Linear Bar Codes ......................................................................................................................... 118
6.1.1 General Requirements .............................................................................................................. 118
6.1.2 Bar Code Print Quality .............................................................................................................. 118
6.1.3 Bar Code Dimensions ............................................................................................................... 118
6.2 2-D Symbols ................................................................................................................................ 120
6.2.1 General Requirements .............................................................................................................. 120
6.2.2 Symbol Print Quality ................................................................................................................. 120
6.2.3 Symbol Dimensions .................................................................................................................. 120
6.2.4 Reading and Interpreting Information ....................................................................................... 120
6.3 RFID Tags.................................................................................................................................... 120
6.4 EDI Messages .............................................................................................................................. 121
7 Product Labeling ............................................................................................................................. 122
7.1 Specific Product Labeling ............................................................................................................ 122
7.2 National Labeling Guidelines ....................................................................................................... 122
7.3 General Principles........................................................................................................................ 122
7.3.1 Minimum Information ................................................................................................................ 123
7.4 Printing Label Text ....................................................................................................................... 123
7.4.1 Donation Identification Number [001] ....................................................................................... 124
7.4.2 Other Data Structures – Linear Bar Codes ............................................................................... 125
7.4.3 Other Data Structures – 2-D Symbols ...................................................................................... 128
7.4.4 Text Associated with Specific Data Structures .......................................................................... 128
7.4.5 Text Not Associated with Electronically-Readable Information ................................................. 131
7.5 Keyboard Entry Check Character K............................................................................................. 132
7.5.1 Other Data Structures ............................................................................................................... 132
8 Outer Package Labeling for Containers and Supplies .................................................................... 135
9 Data Structure Coding and Decoding: Examples of Use ................................................................ 136
9.1 Data Structure 012: Special Testing: Red Blood Cell Antigens–General ..................................... 136
9.2 Data Structure 014: Special Testing: HLA and Platelet-Specific Antigens ................................... 137
9.3 Data Structure 027: Transfusion Transmitted Infection Marker ................................................... 139
10 Bar Code Concatenation ............................................................................................................... 140
10.1 Temporal/Spatial Constraints ..................................................................................................... 140
10.2 Output Data String ..................................................................................................................... 141
10.3 Controlling the Concatenation Process ...................................................................................... 141
10.4 Verification of Valid Concatenation ............................................................................................ 141
10.5 Commonly Concatenated Bar Code Pairs ................................................................................. 142
11 Blood Container Manufacturers Information Data File Specification.............................................. 143
11.1 Introduction ................................................................................................................................ 143
11.2 Structure of the Data File ........................................................................................................... 144
11.3 Container Identification Character .............................................................................................. 149
11.4 Further Guidance ....................................................................................................................... 149

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 6

12 ICCBBA ................................................................................................................................. 150
12.1 Formation and Incorporation................................................................................................ 150
12.2 Registration and Licensing................................................................................................... 150
12.3 Global Registration Identifier for Donors (GRID) Issuing Organization Number .................... 150
12.4 Code Assignment................................................................................................................. 151
12.5 Issuing Agency Identifier ..................................................................................................... 151
Acronyms ................................................................................................................................... 152
Glossary ..................................................................................................................................... 153
Appendix A: Donation Identification Number Check Character [K].............................................. 159
A.1 Keyboard Entry Check Character ......................................................................................... 159
A.2 Calculating Type 3 Flag Characters...................................................................................... 161
A.3 Computer Programs for Calculating K Using ISO 7064........................................................ 162
Appendix B: ISBT 128 Standard Numbering of Versions of Documents and Databases ............. 164
Appendix C: Label Examples ...................................................................................................... 166
Appendix D: Cross-Reference for Table Numbers ...................................................................... 173
Index........................................................................................................................................... 179

# TABLES

Table 1 Code 128 Subset B Characters Available for Use as the Second Character of ISBT 128
Data Identifiers [RT001] ............................................................................................................. 16
Table 2 Index of Data Structures [RT003] ................................................................................... 18
Table 3 Data Structure 001: Donation Identification Number Flag Characters, ff [RT004] ............. 85
Table 4 Data Structure 002: Blood Groups [ABO and RhD], Including Optional Type of Collection
Information [RT005] ..................................................................................................................... 86
Table 5 Data Structure 002: Special Messages [RT006] ............................................................. 89
Table 6 Data Structure 002: Rh, Kell, and Mia/Mur Phenotypes [RT007] .................................... 90
Table 7 Data Structure 003: Type of Collection in 6<sup>th</sup> Position of Product Code [RT008] ............ 91
Table 8 Data Structure 011: Special Testing: Red Blood Cell Antigens [RETIRED] .................... 93
Table 9 Data Structure 012: Special Testing: Red Blood Cell Antigens — General [RT009] ......... 95
Table 10 Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish [RT010] ......... 97
Table 11 Data Structure 011: Special Testing: Red Blood Cell Antigens, Positions 17 and 18:
Erythrocyte Antigen Specified Has Been Tested and Found Negative [RETIRED] ...................... 99
Table 12 Data Structure 012: Special Testing: Red Blood Cell Antigens — General, Positions 17
and 18: Erythrocyte Antigen Specified Has Been Tested and Found Negative [RT011].. 100
Table 13 Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish, Positions 17
and 18: Erythrocyte Antigen Specified Has Been Tested and Found Negative [RT012].. 101
Table 14 Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens,
Positions 1 through 8 [RT013] ..................................................................................................... 102
Table 15 Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens,
Positions 9 through 16 [RT014] ................................................................................................... 104
Table 16 Data Structure 014: Special Testing: Platelet HLA and Platelet Specific Antigens, Position
18 [RT044] .................................................................................................................................. 105
Table 17 Data Structure 015: Special Testing: HLA-A and –B Alleles, Position 17 (CMV Antibody
Status) [RT015] [RETIRED] ........................................................................................................ 106
Table 18 Data Structure 027: Transfusion Transmitted Infection Marker [RT019] ......................... 107
Table 19 Data Structure 029: Symbols [RT037] ........................................................................... 109
Table 20 Data Structure 029: Dimensions [RT038] ...................................................................... 109
Table 21 Data Structure 029: Decimal Point [RT039] .................................................................. 109
Table 22 Data Structure 030: RBC Serological Results [RT040] ................................................. 110
Table 23 Data Structure 030: Number of Tests [RT041] .............................................................. 110
Table 24 Data Structure 031: Time Zone [RT045] ........................................................................ 110
Table 25 Data Structure 031: Type of Time [RT046] .................................................................... 110
Table 26 Product Categories and Assigned Prefixes ................................................................... 113
Table 27 Special Testing: General [RT029] ................................................................................. 115
Table 28 Version Table (Special Testing) [RT043] ....................................................................... 115
Table 29 Registered Facilities [RT030] ........................................................................................ 116

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 7

Table 30 Keyboard Entry Check Character Requirements for ISBT 128 Data Structures Utilizing Code 128 [RT002] ................................................................................................................... 133
Table 31 Header Line [RT031] ................................................................................................................... 144
Table 32 Data Lines [RT032] ...................................................................................................................... 145
Table 33 Footer Line [RT033] ..................................................................................................................... 145
Table 34 ICCBBA-Assigned Data Labels and Content (Version 07) [RT034] ................................................. 146
Table 35 Mapping from Characters to ISO/IEC 7064 Check Values and Calculated Values to the Checksum Character [RT035] ........................................................................................................ 159
Table 36 Cross-Reference for Table Numbers [RT036] ............................................................................... 173

# FIGURES

Figure 1 Data Structure ............................................................................................................................... 14
Figure 2 Donation Numbering ..................................................................................................................... 27
Figure 3 Product Code Data Content for α values of E, F, H, S, P, X0, or YA to YZ ................................. 32
Figure 4 Product Code Data Content for α values of M, N, R, T, V, or W ................................................... 33
Figure 5 Container Manufacturer and Catalog Number Data Content ......................................................... 50
Figure 6 Donor Identification Number ......................................................................................................... 53
Figure 7 Example of Data Content for Data Structure 28 ............................................................................ 64
Figure 8 Example of Data Content for Data Structure 033 .......................................................................... 74
Figure 9 Example of Data Content for Data Structure 034 .......................................................................... 76
Figure 10 Example of Data Content for Single European Code [Data Structure 038] ................................... 80
Figure 11 Examples of Data Labels (in Red Boxes) .................................................................................... 124
Figure 12 Text Corresponding to Data Content in a Linear Bar Code (in Red Boxes) .................................. 126
Figure 13 Other Text Associated with Electronically-Readable Information (in Red Boxes) ......................... 127
Figure 14 Text Corresponding to Electronically-Readable Information in a 2-D Symbol with Associated Data Labels where Appropriate (in Red Boxes) ........................................................... 128
Figure 15 Relative Text Size of Class, Modifier, and Attributes ................................................................... 129
Figure 16 Text Not Assoicated with Electronically-Readable Information (in Red Boxes) ............................ 131
Figure 17 GS1 Outer Packaging Bar Code .................................................................................................. 135
Figure 18 Use of Type 3 Flag Characters .................................................................................................... 161
Figure 19 Cellular Therapy Example Labels ................................................................................................ 166
Figure 20 Blood Product Example Labels .................................................................................................... 167
Figure 21 Human Tissue Example Labels .................................................................................................... 169
Figure 22 Ocular Tissue Example Labels ..................................................................................................... 170
Figure 23 Human Milk Example Labels ....................................................................................................... 170
Figure 24 Example Base Label .................................................................................................................... 171
Figure 25 Example Small Base Label .......................................................................................................... 172



<page_number>7</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                            8

# 1 Introduction

## 1.1 Purpose
The purpose of this document is to provide standards and guidance for the coding and labeling of medical products of human origin (MPHO): blood, cellular therapy, tissues, regenerated tissue, milk, fecal microbiota, topical products of human origin, in vivo diagnostic MPHO, and organs for transplant, as well as those plasma derivatives for which ABO is relevant.

## 1.2 Scope
This document is a comprehensive description of the rules surrounding the use of ISBT 128, as well as guidance in the interpretation of these rules. It contains many, but not all, of the reference tables. Locations of reference tables not found in this document may be found in Table 36 [RT036], page 173.

This document is supplemented with other guidance documents that provide greater detail on how ISBT 128 may be implemented.

## 1.3 Intended Audience
This document is intended for anyone interested in ISBT 128, including:

* Staff of facilities utilizing, or planning to utilize, the ISBT 128 Standard (management, information technology, validation, quality management, laboratory, etc.)
* Software developers
* Vendors of labels for medical products of human origin
* Vendors of containers for blood and cellular therapy products
* Vendors of products that utilize ISBT 128
* Regulators and auditors

## 1.4 Normative References
**ICCBBA:**
*ISBT 128 Standard Terminology for Medical Products of Human Origin* (ST-002)
*ISBT 128 Standard, Labeling of Human Tissues* (ST-003)
*ISBT 128 Standard, Labeling of Cellular Therapy Products* (ST-004)
*ISBT 128 Standard, Labeling of Blood Components* (ST-005)
*ISBT 128 Standard, Labeling of Ocular Tissue* (ST-009)
*ISBT 128 Standard, Product Description Code Database* (ST-010)
*ISBT 128 Standard, Coding and Labeling of Medical Devices Using ISBT 128* (ST-011)
*ISBT 128 Standard, ISBT 128 and the Single European Code (SEC)* (ST-012)
*ISBT 128 Standard, Labeling of Human Milk Banking Products* (ST-013)
*ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules* (ST-015)
*ISBT 128 Standard Labeling of Medical Products of Human Origin with INN and USAN Nonproprietary Names* (ST-016)
*ISBT 128 Standard Coding and Labeling of Medical Devices Containing MPHO* (ST-017)
*ISBT 128 Standard Labeling of Collection Products for Cellular Therapy Manufacturing* (ST-018)



<page_number>8</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                     www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 9

* ISBT 128 Standard Labeling of Reproductive Tissue and Cell Products (ST-019)
* ISBT 128 Standard for XML Electronic messaging - Standardized XML Elements for Medical Products of Human Origin (ST-020)
* ISBT 128 Standard Use of Clinical Trials Product Description Codes (PDCs) (ST-022)
* ISBT 128 Standard for Base Labels (ST-023)
* ISBT 128 Standard for the Medical Products of Human Origin (MPHO) Unique Identifier (ST-026)
* ISBT 128 Dictionary of Standard Data Elements (ST-027)
* ISBT 128 Standard Chain of Identity Identifier (ST-028)

These documents are found in the Technical Library section on the ICCBBA Website.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 10

# Other Standards and Guidelines:

**American National Standards Institute (ANSI):**

ANSI MH10.8.2:2010, Data Identifier and Application Identifier Standard (18 May 2010)

**European Union:**

Directive 2004/23/EC of the European Parliament and of the Council
Commission Directive 2006/86/EC
Commission Directive (EU) 2015/565

**International Standards Organization (ISO):**

ISO/IEC 646 Information technology – ISO 7-bit coded character set for Information
Interchange

ISO 3166-1 Country Codes

ISO/IEC 7064:2003(E): Information technology—Security techniques—Check character
systems

ISO 8601 (2004)(E) Data elements and interchange formats — Information interchange
—Representation of dates and times

ISO/IEC 15415:2011(E): Information technology—Automatic identification and data
capture techniques — Bar code print quality test specification — Two-dimensional
symbols.

ISO/IEC 15416:2000(E): Information technology—Automatic identification and data
capture techniques — Bar code print quality test specification — Linear symbols

ISO/IEC 15417: 2007(E): Information technology—Automatic Identification and data
capture techniques—Code 128 bar code symbology specification

ISO/IEC 15459-4-2014(E): Information technology – Automatic identification and data
capture techniques – Unique Identification—Part 4 Individual products and product
packages

ISO/IEC 16022:2006(E): Information technology—International symbology
specification—Data Matrix (and correction ISO/IEC 16022:2006/Cor 1:2008)

ISO/TS 18530:2021 Health Informatics—Automatic identification and data capture
marking and labelling – Subject of care and individual provider identification

**Other:**

Knels R, Davis R, Ashford P, et al: Guidelines for the use of RFID technology in
transfusion medicine. Vox Sang 2010; 98(s2):1-24.



<page_number>10</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 11

# 1.5 Other References

**ICCBBA:**
ICCBBA publications are maintained on the ICCBBA Website. It is the responsibility of registered and licensed establishments to ensure that they have the most recent version of all ICCBBA publications by regularly consulting the listing maintained on the ICCBBA Website. A subscription email notification system is available on the ICCBBA Website.
The following listing is current as of the date on the front cover of this document.

**Implementation Guidance Material:**
* Bar Code Scanner Implementation of ISBT 128 Concatenation (IG-008)
* Use of Flags in the Donation Identification Number for Process Control of Critical Points during Processing and Distribution (IG-010)
* ISBT 128 Bar Codes: Valid and Invalid Examples (IG-013)
* Use of Data Matrix Symbols with ISBT 128 (IG-014)
* Use of the Manufacturers Data File (IG-015)
* Length of the Product Code Bar Code and Concatenation (IG-017)
* Manufacturer's Catalog Number and Lot Number (Items Other Than Containers) (IG-019)
* Encoding Product Information [Data Structures 003, 032, 033, and 034] – Tissues (IG-020)
* Use of Product Code [Data Structure 003] – Blood (IG-021)
* Product Coding [Data Structure 003 and 032] – Cellular Therapy (IG-022)
* Use of Product Divisions [Data Structure 032] (IG-023)
* Use of Flexible Date and Time [Data Structure 031] (IG-024)
* Use of Dimensions [Data Structure 029] (IG-026)
* Use of Red Cell Antigens with Test History [Data Structure 030] (IG-027)
* Choosing an On-Demand Label Printer (IG-029)
* Use of the Processing Facility Information Code [Data Structure 033] (IG-031)
* Use of Product Code [Data Structure 003] – Ocular Tissue (IG-032)
* Use of the Donation Identification Number [Data Structure 001] (IG-033)
* ISBT 128 Facility Identification Number (IG-034)
* Use of ISBT 128 in Resource-Limited Countries (IG-041)
* A Validation Tool for ISBT 128 Data Structures (IG-043)
* Applying ISBT 128 Labels to Collection Products for Further Manufacture (IG-045)
* Shipping ISBT 128 Labeled Products through a GS1 Supply Chain (IG-046)
* Blood Bag Identification Using ISBT 128 and GS1 (JP-003)
* Assigning a Patient Identification Number (JP-004)

**Introductory Materials:**
* ISBT 128 for Blood Components, An Introduction (IN-003)
* ISBT 128 for Cellular Therapy, An Introduction (IN-005)
* ISBT 128 for Tissues, An Introduction (IN-007)
* ISBT 128 for Human Milk, An Introduction (IN-031)
* ISBT 128 for Human Organs, An Introduction (IN-032)
* Traceability, An Introduction (IN-033)
* An Introduction to ISBT 128
    - English (IN-015)
    - Arabic (IN-017)
    - Chinese (IN-019)
    - French (IN-021)



<page_number>11</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           12

Russian (IN-023)
Spanish (IN-026)
Portuguese (IN-028)

**Non-ICCBBA:**
Palmer, RC. The Bar Code Book. 5th ed. Victoria, BC Canada: Trafford
Publishing 2007.

ISO/IEC 15459-2:2015(E): Information technology — Unique identifiers — Part 2:
Registration procedures

ISO/IEC 15459-3:2015(E): Information technology — Unique identifiers — Part 3:
Common rules for unique identifiers

# 1.6 Background
The ISBT 128 Standard has been utilized in various countries for many years. It has proven capable of achieving its purpose of conveying information about medical products of human origin (MPHO) accurately and unambiguously. As communication technology advances, it becomes increasingly important that ISBT 128 is not linked to a particular data transfer technology. This means a variety of delivery mechanisms can be used to transfer information.

From its original role as a labeling standard, ISBT 128 has been re-defined as an international standard for the transfer of information associated with MPHO. It provides for a globally unique donation numbering system, internationally standardized product definitions, and standard data structures for bar coding and electronic data interchange.

The ISBT 128 Standard is a dynamic standard. Changes occur continually as different needs are recognized. Proposals for change follow a managed process, being carefully reviewed by experts in the field in many countries before they are incorporated into the Standard. Proposals are posted on the ICCBBA Website and users from ICCBBA registered facilities can view and comment upon proposals. Every effort is made to ensure that all changes are backward compatible.

The ISBT 128 Standard must meet the needs of its users, and those users come from a wide variety of facilities in many countries. These facilities include highly complex and large blood centers and less complex operations in small organizations. A guidance document has been developed for users in developing countries that addresses those aspects of ISBT 128 that are most pertinent to them. Users from developing countries are encouraged to read *Implementation Guide: Use of ISBT 128 in Resource-Limited Countries* (IG-041).

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 13

# 1.7 Changes in this Version
The following table indicates the major changes between Version 6.2.1 and Version 6.2.2. Actual changes or additions to requirements of the ISBT 128 Standard are in bold print; changes to formatting or organization, or additional guidance, are in regular print.
When changes were a result of a formal proposal, the number of the proposal is listed in the Rationale column.

ISBT 128 Standard Technical Specification Version Control: Version 6.2.1 vs. Version 6.2.2

<table>
<tr><th></th><th>Version 6.2.1 Chapter, Section, Table, or Figure</th><th>Version 6.2.2 Chapter, Section, Table, or Figure</th><th>Change</th><th>Rationale</th></tr>
<tr><td>1.</td><td>7.5</td><td>7.5</td><td>Updated the list of data structures that require the use of the check character.</td><td>For consistency with reference table RT002.</td></tr>
</table>



<page_number>13</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                               14

# 2 Data Structures

Data structures defined in this document are internationally agreed upon entities for encoding information relevant to MPHO. Data structures define the technical characteristics necessary for the interpretation of the information. They specify the context and structure and provide the links to the appropriate reference tables for conversion of codes to meaningful information.

Data structures need to be clear and unambiguous and must take into account any constraints imposed by the anticipated delivery mechanisms. For example, data structures that will be used in linear bar codes are limited in the number of characters they can contain.

Data structures generally comprise two elements:

* Data identifier: a two or three-character code that identifies the data structure (described in more detail in Section 2.1) and
* Data content: the data characters that provide the information to be conveyed (e.g., coded information that conveys the unit is A, RhD positive).

Figure 1 Data Structure

Data Structure diagram showing =< E1234V00 with brackets indicating =< as Data Identifier and E1234V00 as Data Content

Data characters are the individual ASCII characters that make up the data content.

Some information may be conveyed at different levels of detail in different data structures. For example, the volume of a blood product may be conveyed in two data structures:

* Product Code [Data Structure 003] as part of the Final Volume attribute group (e.g., equal to or greater than 200 mL to less than 400 mL) or
* Dimensions [Data Structure 029] as a specific value (e.g., 223 mL).

If a facility chooses to use more than one data structure to convey similar information, systems shall be in place to ensure accurate entry of data so the information being conveyed is consistent.

## 2.1 Data Identifiers

Data identifier characters shall be used in circumstances in which the context of the data structure presentation makes it necessary to also indicate the nature of the information being conveyed. For example, in bar codes the data identifiers are essential to ensure correct interpretation.

However, in applications in which the data structures are being used within an existing framework, such as an electronic data interchange (EDI) message, the data identifier may be omitted provided that the message definition unambiguously indicates that the field contains a specific ISBT 128 data structure.


<page_number>14</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                      www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                          15

Each ISBT 128 data structure shall have two or three ASCII characters that serve to identify the data structure. The first ASCII character is the first character of the data identifier. It shall always be = (ASCII 61) or & (ASCII 38). These identifiers have been reserved by ANSI (ANSI MH10.8.2:2010) as ISBT 128 data identifiers to distinguish ISBT 128 data structures from all others.

In ICCBBA internationally defined data structures, the second character of the data identifier shall be a non-alphanumeric ASCII character. The exception to this is the Donation Identification Number (DIN) [Data Structure 001]. The DIN shall have a first data identifier character of = and a second data identifier character that can be any of the alphanumeric characters 1–9, A–N, P–Z (but not a–z). Note that for this data structure only, the second data identifier character shall be the first character of the data content.

Data identifiers with the first character “&”, and a second character from the range a-z shall be reserved for non-ICCBBA defined data structures (see section 2.5). The data identifier pairs &; and &! Shall be hybrid structures which have an ICCBBA-defined context but a non-ICCBBA-defined structure.

The characters used as the second character of the ISBT 128 data identifiers are shown in Table 1, page 16, together with their ASCII values. All ICCBBA documents shall use the US ASCII mapping shown in Table 1 using characters defined in ISO/IEC 646. The character assigned to a particular ASCII value may vary according to the character map being used, but the ASCII value itself provides the definitive description of the data identifier character.

Some ICCBBA internationally defined data structures shall have a third data identifier that shall be an alphanumeric character.

Data identifiers for ISBT 128 data structures are as indicated in Table 2, beginning on page 18.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 16

Table 1 Code 128 Subset B Characters Available for Use as the Second Character of ISBT 128 Data Identifiers [RT001]

<table>
<tr><th></th><th>ASCII Value</th><th>Character</th><th>Name</th></tr>
<tr><td>33</td><td>!</td><td>exclamation mark</td><td></td></tr>
<tr><td>34</td><td>"</td><td>inch, double quotation mark</td><td></td></tr>
<tr><td>35</td><td>#</td><td>number sign</td><td></td></tr>
<tr><td>36</td><td>$</td><td>dollar sign</td><td></td></tr>
<tr><td>37</td><td>%</td><td>percent sign</td><td></td></tr>
<tr><td>38</td><td>&</td><td>ampersand</td><td></td></tr>
<tr><td>39</td><td>'</td><td>foot, single quotation mark</td><td></td></tr>
<tr><td>40</td><td>(</td><td>left parenthesis</td><td></td></tr>
<tr><td>41</td><td>)</td><td>right parenthesis</td><td></td></tr>
<tr><td>42</td><td>*</td><td>asterisk</td><td></td></tr>
<tr><td>43</td><td>+</td><td>plus sign</td><td></td></tr>
<tr><td>44</td><td>,</td><td>comma</td><td></td></tr>
<tr><td>45</td><td>-</td><td>dash</td><td></td></tr>
<tr><td>46</td><td>.</td><td>period</td><td></td></tr>
<tr><td>47</td><td>/</td><td>forward slash</td><td></td></tr>
<tr><td>58</td><td>:</td><td>colon</td><td></td></tr>
<tr><td>59</td><td>;</td><td>semicolon</td><td></td></tr>
<tr><td>60</td><td><</td><td>less than</td><td></td></tr>
<tr><td>61</td><td>=</td><td>equal to</td><td></td></tr>
<tr><td>62</td><td>></td><td>greater than</td><td></td></tr>
<tr><td>63</td><td>?</td><td>question mark</td><td></td></tr>
<tr><td>64</td><td>@</td><td>at sign</td><td></td></tr>
<tr><td>91</td><td>[</td><td>left square bracket</td><td></td></tr>
<tr><td>92</td><td>\</td><td>backward slash</td><td></td></tr>
<tr><td>93</td><td>]</td><td>right square bracket</td><td></td></tr>
<tr><td>94</td><td>^</td><td>circumflex, caret</td><td></td></tr>
<tr><td>95</td><td>_</td><td>underscore</td><td></td></tr>
<tr><td>96</td><td>`</td><td>grave accent</td><td></td></tr>
<tr><td>123</td><td>{</td><td>left brace</td><td></td></tr>
<tr><td>124</td><td></td><td></td><td>vertical bar</td></tr>
<tr><td>125</td><td>}</td><td>right brace</td><td></td></tr>
<tr><td>126</td><td>~</td><td>tilde</td><td></td></tr>
</table>



<page_number>16</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                              17

## 2.2 The Role of Data Identifiers in ISBT 128 Bar Codes
As shown in Figure 1, ISBT 128 bar codes comprise two elements: a data identifier and data content.

In order to accurately interpret information from an ISBT 128 bar code, application software shall carry out the following two steps before interpreting the data values:

1. Analyze the data identifier characters to ensure that the bar code entered is of the correct type;
2. Verify that the length and format of the data content match that defined for the corresponding data structure.

Failure to carry out these checks could lead to incorrect assignment of critical information.

The following example illustrates this.

> An ISBT 128 Blood Groups [ABO and RhD] [Data Structure 002] bar code for an A, RhD positive unit reads as:
>
> =%6200
>
> where “=%” are the data identifier characters indicating that this is Blood Groups [ABO and RhD] data structure, and “6200” are the data values for A, RhD Positive with no information encoded concerning C, c, E, e, K, or Miltenberger phenotypes.
>
> A Special Testing: Red Blood Cell Antigens — General [Data Structure 012] bar code on a Group O, RhD negative unit reads as:
>
> =\620000000000000000
>
> If the data identifier characters are ignored by the application software, entry of this second bar code in response to a blood groups prompt could cause the system to incorrectly assign a blood group for the unit as A, RhD positive.

## 2.3 Data Structure Index
An index of data structures is provided in Table 2, beginning on page 18, which cross-references them to their descriptions in this document.



<page_number>17</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                                                     18

Table 2 Index of Data Structures [RT003]

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>001</td><td>Donation Identification Number</td><td>2</td><td>=</td><td>61</td><td>A-N P-Z 1-9</td><td>65-78 80-90 49-57</td><td>N/A</td><td>N/A</td><td>αppppyynnnnnnff</td><td>2.4.1</td></tr>
<tr><td>002</td><td>Blood Groups [ABO and RhD]</td><td>2</td><td>=</td><td>61</td><td>%</td><td>37</td><td>N/A</td><td>N/A</td><td>ggre</td><td>2.4.2</td></tr>
<tr><td>003</td><td>Product Code</td><td>2</td><td>=</td><td>61</td><td><</td><td>60</td><td>N/A</td><td>N/A</td><td>αooootds</td><td>2.4.3</td></tr>
<tr><td>004</td><td>Expiration Date</td><td>2</td><td>=</td><td>61</td><td>></td><td>62</td><td>N/A</td><td>N/A</td><td>cyyjjj</td><td>2.4.4</td></tr>
<tr><td>005</td><td>Expiration Date and Time</td><td>2</td><td>&</td><td>38</td><td>></td><td>62</td><td>N/A</td><td>N/A</td><td>cyyjjjhhmm</td><td>2.4.5</td></tr>
<tr><td>006</td><td>Collection Date</td><td>2</td><td>=</td><td>61</td><td>*</td><td>42</td><td>N/A</td><td>N/A</td><td>cyyjjj</td><td>2.4.6</td></tr>
<tr><td>007</td><td>Collection Date and Time</td><td>2</td><td>&</td><td>38</td><td>*</td><td>42</td><td>N/A</td><td>N/A</td><td>cyyjjjhhmm</td><td>2.4.7</td></tr>
<tr><td>008</td><td>Production Date</td><td>2</td><td>=</td><td>61</td><td>}</td><td>125</td><td>N/A</td><td>N/A</td><td>cyyjjj</td><td>2.4.8</td></tr>
<tr><td>009</td><td>Production Date and Time</td><td>2</td><td>&</td><td>38</td><td>}</td><td>125</td><td>N/A</td><td>N/A</td><td>cyyjjjhhmm</td><td>2.4.9</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved                                                                                        www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                                                     19

Table 2 Index of Data Structures [RT003] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier Char- acter</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier Char- acter</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier Char- acter</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>010</td><td>Special Testing: General</td><td>2</td><td>&</td><td>38</td><td>(</td><td>40</td><td>N/A</td><td>N/A</td><td>zzzzz</td><td>2.4.10</td></tr>
<tr><td>011</td><td>Special Testing: Red Blood Cell Antigens [RETIRED]</td><td>2</td><td>=</td><td>61</td><td>{</td><td>123</td><td>N/A</td><td>N/A</td><td>aaaaaaaaaaaaaaaaii</td><td>2.4.11</td></tr>
<tr><td>012</td><td>Special Testing: Red Blood Cell Antigens – General</td><td>2</td><td>=</td><td>61</td><td>\</td><td>92</td><td>N/A</td><td>N/A</td><td>aaaaaaaaaaaaaaaaii</td><td>2.4.12</td></tr>
<tr><td>013</td><td>Special Testing: Red Blood Cell Antigens – Finnish</td><td>2</td><td>&</td><td>38</td><td>\</td><td>92</td><td>N/A</td><td>N/A</td><td>aaaaaaaaaaaaaaaaii</td><td>2.4.13</td></tr>
<tr><td>014</td><td>Special Testing: Platelet HLA and Platelet Specific Antigens</td><td>2</td><td>&</td><td>38</td><td>{</td><td>123</td><td>N/A</td><td>N/A</td><td>AAAABBBBCCCCCCCCDE</td><td>2.4.14</td></tr>
<tr><td>015</td><td>Special Testing: HLA-A and -B Alleles [RETIRED]</td><td>2</td><td>=</td><td>61</td><td>[</td><td>91</td><td>N/A</td><td>N/A</td><td>EEEEFFFFGGGGHHHHLM</td><td>2.4.15</td></tr>
</table>



<page_number>19</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                                                     20

## Table 2 Index of Data Structures [RT003] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier Char- acter</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier Char- acter</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier Char- acter</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>016</td><td>Special Testing: HLA-DRB1 Alleles [RETIRED]</td><td>2</td><td>=</td><td>61</td><td>“</td><td>34</td><td>N/A</td><td>N/A</td><td>IIIIJJJJMMMMMM MMMM</td><td>2.4.16</td></tr>
<tr><td>017</td><td>Container Manufacturer and Catalog Number</td><td>2</td><td>=</td><td>61</td><td>)</td><td>41</td><td>N/A</td><td>N/A</td><td>bqqwwwwwww</td><td>2.4.17</td></tr>
<tr><td>018</td><td>Container Lot Number</td><td>2</td><td>&</td><td>38</td><td>)</td><td>41</td><td>N/A</td><td>N/A</td><td>xxxxxxxxxx</td><td>2.4.18</td></tr>
<tr><td>019</td><td>Donor Identification Number</td><td>2</td><td>=</td><td>61</td><td>;</td><td>59</td><td>N/A</td><td>N/A</td><td>αppppvvvvvvvvvvv vvvvv</td><td>2.4.19</td></tr>
<tr><td>020</td><td>Staff Member Identification Number</td><td>2</td><td>=</td><td>61</td><td>‘</td><td>39</td><td>N/A</td><td>N/A</td><td>αppppuuuuuu</td><td>2.4.20</td></tr>
<tr><td>021</td><td>Manufacturer and Catalog Number: Items Other Than Containers</td><td>2</td><td>=</td><td>61</td><td>-</td><td>45</td><td>N/A</td><td>N/A</td><td>NNOOOOOOOO</td><td>2.4.21</td></tr>
</table>



<page_number>20</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                                                     21

Table 2 Index of Data Structures [RT003] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier Char- acter</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier Char- acter</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier Char- acter</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>022</td><td>Lot Number: Items Other Than Containers</td><td>2</td><td>&</td><td>38</td><td>-</td><td>45</td><td>N/A</td><td>N/A</td><td>PPPPPPPPPP</td><td>2.4.22</td></tr>
<tr><td>023</td><td>Compound Message</td><td>2</td><td>=</td><td>61</td><td>+</td><td>43</td><td>N/A</td><td>N/A</td><td>aabbb</td><td>2.4.23</td></tr>
<tr><td>024</td><td>Patient Date of Birth</td><td>2</td><td>=</td><td>61</td><td>#</td><td>35</td><td>N/A</td><td>N/A</td><td>aayyyymmdd</td><td>2.4.24</td></tr>
<tr><td>025</td><td>Patient Identification Number</td><td>2</td><td>&</td><td>38</td><td>#</td><td>35</td><td>N/A</td><td>N/A</td><td>aallxx...xx</td><td>2.4.25</td></tr>
<tr><td>026</td><td>Expiration Month and Year</td><td>2</td><td>=</td><td>61</td><td>]</td><td>93</td><td>N/A</td><td>N/A</td><td>yyyymm</td><td>2.4.26</td></tr>
<tr><td>027</td><td>Transfusion Transmitted Infection Marker</td><td>2</td><td>&</td><td>38</td><td>“</td><td>34</td><td>N/A</td><td>N/A</td><td>nnnnnnnnnnnnnnn nnn</td><td>2.4.27</td></tr>
<tr><td>028</td><td>Product Consignment</td><td>2</td><td>=</td><td>61</td><td>$</td><td>36</td><td>N/A</td><td>N/A</td><td>αppppyynnnnnccdd</td><td>2.4.28</td></tr>
</table>



<page_number>21</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 22

Table 2 Index of Data Structures [RT003] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier Char- acter</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier Char- acter</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier Char- acter</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>029</td><td>Dimensions</td><td>2</td><td>&</td><td>38</td><td>$</td><td>36</td><td>N/A</td><td>N/A</td><td>nnaabbbbcccccdee...aabbbbcccccdee</td><td>2.4.29</td></tr>
<tr><td>030</td><td>Red Cell Antigens with Test History</td><td>2</td><td>&</td><td>38</td><td>%</td><td>37</td><td>N/A</td><td>N/A</td><td>nnnpppppprrss...pppppprrss</td><td>2.4.30</td></tr>
<tr><td>031</td><td>Flexible Date and Time</td><td>2</td><td>=</td><td>61</td><td>(</td><td>40</td><td>N/A</td><td>N/A</td><td>ZUTTYYYYMMDDhhmm</td><td>2.4.31</td></tr>
<tr><td>032</td><td>Product Divisions</td><td>2</td><td>=</td><td>61</td><td>,</td><td>44</td><td>N/A</td><td>N/A</td><td>dddddd</td><td>2.4.32</td></tr>
<tr><td>033</td><td>Processing Facility Information Code</td><td>2</td><td>&</td><td>38</td><td>+</td><td>43</td><td>N/A</td><td>N/A</td><td>nnnnnpppppp</td><td>2.4.33</td></tr>
<tr><td>034</td><td>Processor Product Identification Code</td><td>2</td><td>=</td><td>61</td><td>/</td><td>47</td><td>N/A</td><td>N/A</td><td>nnnnnppppppqqqq</td><td>2.4.34</td></tr>
<tr><td>035</td><td>MPHO Lot Number</td><td>3</td><td>&</td><td>38</td><td>,</td><td>44</td><td>1</td><td>49</td><td>xxxxxxxxxxxxxxxxx</td><td>2.4.35</td></tr>
<tr><td>036</td><td>MPHO Supplemental Identification Number</td><td>3</td><td>&</td><td>38</td><td>,</td><td>44</td><td>2</td><td>50</td><td>xxxxxxxxxxxxxxxxx</td><td>2.4.36</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 23

## Table 2 Index of Data Structures [RT003] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier Char- acter</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier Char- acter</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier Char- acter</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>037</td><td>Global Registration Identifier for Donors [RETIRED]</td><td>3</td><td>&</td><td>38</td><td>,</td><td>44</td><td>3</td><td>51</td><td>nnnnaaaaaaaaaaa aaaa</td><td>2.4.37</td></tr>
<tr><td>038</td><td>Single European Code (SEC)</td><td>3</td><td>&</td><td>38</td><td>,</td><td>44</td><td>4</td><td>52</td><td>xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxx xxxxxx</td><td>2.4.38</td></tr>
<tr><td>039</td><td>Global Registration Identifier for Donors</td><td>2</td><td>&</td><td>38</td><td>:</td><td>58</td><td>N/A</td><td>N/A</td><td>nnnnaaaaaaaaaaa aabb</td><td>2.4.39</td></tr>
<tr><td>040</td><td>Chain of Identity Identifier</td><td>2</td><td>&</td><td>38</td><td>/</td><td>47</td><td>N/A</td><td>N/A</td><td>CHαppppyynnnnnn</td><td>2.4.40</td></tr>
<tr><td>N/A</td><td>Data Structures Not Defined by ICCBBA</td><td>2</td><td>&</td><td>38</td><td>a-z</td><td>97- 122</td><td>N/A</td><td>N/A</td><td>These data identifiers may be assigned by a facility or a regional, national, or supranational authority</td><td>2.5.1</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                                                       24

Table 2 Index of Data Structures [RT003] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Number of Characters in Data Identifier</th><th>First Character of the Data Identifier</th><th>First Character of the Data Identifier ASCII Value</th><th>Second Character of the Data Identifier</th><th>Second Character of the Data Identifier ASCII Value</th><th>Third Character of the Data Identifier</th><th>Third Character of the Data Identifier ASCII Value</th><th>Data Content</th><th>See Section</th></tr>
<tr><td>N/A</td><td>Reserve Data Identifiers for a Nationally Specified Donor Identification Number</td><td>2</td><td>&</td><td>38</td><td>;</td><td>59</td><td>N/A</td><td>N/A</td><td>Defined nationally</td><td>2.5.2</td></tr>
<tr><td>N/A</td><td>Confidential Unit Exclusion Status Data Structure</td><td>2</td><td>&</td><td>38</td><td>!</td><td>33</td><td>N/A</td><td>N/A</td><td>Defined nationally</td><td>2.5.3</td></tr>
</table>

N/A = Not applicable

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                    25

# 2.4 Description of the Data Structures

## 2.4.1 Donation Identification Number [Data Structure 001]

Purpose: Data Structure 001 shall specify:

* a thirteen (13)-character Donation Identification Number (DIN) that is a unique identification of:
    * a donation event [collection or recovery]
    * a product pool
    * for plasma derivatives, a unique identification of an aliquot from a pooled plasma derivative product
    * a zygote/embryo formed through ART
    AND
* flag character values

The 13-character DIN shall be globally unique for a one hundred year period.

Structure: **=αppppyynnnnnnff**

This is the only data structure in which the second character of the data identifier shall be part of the data content.

The elements of the Donation Identification Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>α</td><td>1</td><td>data identifier, second character; alphanumeric {A–N; P–Z; 1–9}.</td></tr>
<tr><td>pppp</td><td>4</td><td>First two characters alphanumeric {A–N; P–Z; 0–9}; second two characters numeric {0–9}. Current usage is numeric for all four characters. Alpha characters may be introduced into positions 1 and 2 in the future (e.g., if α = A and pppp = BC12, the αpppp will be ABC12).</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>nnnnnn</td><td>6</td><td>numeric {0–9}</td></tr>
<tr><td>ff</td><td>2</td><td>alphanumeric {0–9}, {A–H; J–N; P; R–Y}</td></tr>
</table>

The fifteen (15)-character data content string, **αppppyynnnnnnff**, shall be encoded and interpreted as follows:

© 2004-2023 ICCBBA, All Rights Reserved                                               www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 26

**αpppp**
* shall specify the Facility Identification Number (FIN) of the organization that assigned the DIN.
* shall be encoded and interpreted by reference to the ICCBBA Registered Facilities database.

**yy** shall specify the last two digits of the nominal year in which the DIN was assigned.

The nominal year may overlap +/- one month of the year assigned.

**nnnnnn** shall specify the sequence number, within the given nominal year for the FIN.

**ff** shall specify flag characters. Flag characters are not part of the 13-character DIN. See Figure 2.

As shown in Table 3 on page 85, there are three general types of flag characters:

Type 1: Two-character code used for process control and defined by ICCBBA.

Type 2: Two-character code used for process control, but locally defined.

Type 3: Two-character code used to convey a weighted ISO/IEC 7064 modulo 37-2 check character. See Appendix A: Donation Identification Number Check Character [K].

When not used, the value of the flag characters shall be 00 (zeroes).

Type 2 flag characters shall only be interpreted by the facility that has defined them, or within the group of facilities that have agreed on a common definition.

Refer to *Implementation Guide: Use of Flags in the Donation Identification Number for Process Control of Critical Points during Processing and Distribution* (IG-010) for additional guidance regarding flag characters.

A keyboard entry check character is also not part of the 13-character DIN, but is calculated from the DIN and printed in eye-readable text (see Section 7.5).

Refer to *Implementation Guide: Use of the Donation Identification Number [Data Structure 001]* (IG-033) for further information regarding the check character.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 27

Figure 2 Donation Numbering

Diagram showing the structure of a Donation Identification Number (DIN): A9999 (Facility Identification Number (FIN)), 21 (Year), 123456 (Sequence Number), 01 (Flag Characters), and 3 (Check Character). The DIN is marked as (Required), the Check Character as (Required), and the Flag Characters as (Optional).

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 28

## 2.4.2 Blood Groups [ABO and RhD] [Data Structure 002]

Purpose: Data Structure 002 EITHER:

* shall indicate the blood groups [ABO and RhD] of a product, AND
* may convey information regarding C, c, E, e, K, <u>or</u> Miltenberger phenotypes, and/or
* may include information defining the type of collection,

OR

* shall convey special messages, such as the status of a collection, restrictions on use, or processing instructions.

Structure: =%ggre

The elements of the Blood Groups [ABO and RhD] data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>%</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>gg</td><td>2</td><td>alphanumeric {A–Z; a–z; 0–9}</td></tr>
<tr><td>r</td><td>1</td><td>alphanumeric {A–Z; 0–9}</td></tr>
<tr><td>e</td><td>1</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The four (4)-character data content string, **ggre**, shall be encoded and interpreted as follows:

**gg** EITHER:

* shall specify ABO and RhD blood groups, and type of collection information
* shall be encoded and interpreted by reference to Table 4, page 86

OR

* shall specify a range of special messages, as shown in Table 5, page 89.

**r**

* shall specify Rh, and Kell or Miltenberger phenotypes
* shall be encoded and interpreted by reference to Table 6, page 90

A value of 0 (zero) shall be used if the data structure does not contain information about these phenotypes.

**e**

* shall be reserved for future use



<page_number>28</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 29

* shall always be set to 0 (zero).



<page_number>29</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                             30

## 2.4.3     Product Code [Data Structure 003]

Purpose:    Data Structure 003 shall:
*     identify a product intended for human use;
*     optionally, encode information about the type of collection;
*     encode whether or not the product has been divided.

Structure:  =<αooootds

The elements of the Product Code data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td><</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>α</td><td>1</td><td>alphabetic {A–Z}</td></tr>
<tr><td>oooo</td><td>4</td><td>alphanumeric {A–Z; 0–9}</td></tr>
<tr><td>t</td><td>1</td><td>alphanumeric {A–Z; a–z; 0–9} (depends on value of α; see below)</td></tr>
<tr><td>d</td><td>1</td><td>alphanumeric {A–Z; 0–9} (depends on value of α; see below)</td></tr>
<tr><td>s</td><td>1</td><td>alphanumeric {a–z; 0–9} (depends on value of α; see below)</td></tr>
</table>

The eight (8)-character data content string, **αooootds**, shall be encoded and interpreted as follows:

**αoooo**
*     shall specify the Product Description Code (PDC)
*     shall be encoded and interpreted by reference to the Product Description Codes database table. An exception to this is the clinical trials products indicated in the mapping table below, which are coded in a separate database.

Mapping of **α** values to Type of Product

<table>
<tr><th>α Values</th><th>Type of Product</th></tr>
<tr><td>E or F</td><td>Blood Components</td></tr>
<tr><td>H</td><td>MPHO with INN and/or USAN names</td></tr>
<tr><td>M</td><td>Other Therapies (partially assigned): <ul><li>Human Milk = M0001 to M0999</li><li>Not assigned (M1000 through M8999)</li><li>Topical Products of Human Origin = M9000 to M9999</li></ul></td></tr>
<tr><td>N</td><td>Organs (partially assigned: N0001 to N0999) Not assigned (N1000 through N9999)</td></tr>
<tr><td>P</td><td>Regenerated Tissue products</td></tr>
</table>


<page_number>30</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                              www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 31

<table>
<tr><th>α Values</th><th>Type of Product</th></tr>
<tr><td>R</td><td>Reproductive Tissue and Cell products (partially assigned: R0001 to R0999) Not assigned (R1000 through R9999)</td></tr>
<tr><td>S</td><td>Cellular Therapy products</td></tr>
<tr><td>T</td><td>Tissue products</td></tr>
<tr><td>V</td><td>Ocular Tissue products</td></tr>
<tr><td>W</td><td>Fecal Microbiota (partially assigned: W0001 to W0999) Not assigned (W1000 through W9999)</td></tr>
<tr><td>X</td><td>Other Blood products (partially assigned): • Plasma Derivatives = X0001 to X0999 • Not assigned (X1000 to X4999) • In Vivo Diagnostic MPHO = X5000 to X5999 • Not assigned (X6000 through X9999)</td></tr>
<tr><td>Y</td><td>Clinical Trials products (partially assigned: YA000 to YZ999)</td></tr>
<tr><td>A to D</td><td>National or Local/Facility codes: • National Codes = A-alphanumeric to C-alphanumeric [e.g., AE134, BT123, CRA12] • Local/Facility Codes = D (alphanumeric) [e.g., DAX12] • Both/Either = A0000 to D9999 [e.g., A1234, B1234, C1234, D1234]</td></tr>
</table>

Local codes should be used where there is not an appropriate international code and there is good reason why an international code should not be allocated.

Facilities should contact the ICCBBA office if they are unsure whether or not to assign a local code to their product.

A national authority should assign/approve nationally defined Product Description Codes to ensure products in different categories (e.g., Blood, Cellular Therapy, Tissues, Organs, and Human Milk) do not use the same Product Description Codes for different products.

Refer to the various product coding implementation guide publications for further guidance on assigning local and national codes.

Once a national or local/facility code is assigned, the code shall not be reassigned within the same boundaries.

Controls shall be in place to ensure that local and national codes are appropriately interpreted.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 32

**tds** The encoding and interpretation of **tds** shall depend upon the value of **α**.

For **α** values of **E**, **F**, **H**, **S**, **P**, **X0**, or **YA** to **YZ** the **t** portion of the Product Code shall specify the Collection Type Code. See Table 7 for collection types.

For **α** values of **E**, **F**, **H**, **S**, **P**, **X0**, or **YA** to **YZ** the **ds** portion of the Product Code shall specify the Division Code.

The **d** portion of the Division Code shall be encoded using capital letters, unless Data Structure 032 is used in conjunction with Data Structure 003.

The **s** portion of the Division Code shall be encoded using lower case letters, unless Data Structure 032 is used in conjunction with Data Structure 003.

Figure 3 Product Code Data Content for **α** values of **E**, **F**, **H**, **S**, **P**, **X0**, or **YA** to **YZ**

Product Code diagram showing S12954A0 with brackets indicating Product Description Code, Division Code, and an arrow pointing to Collection Type Code

For **α** values of **M**, **N**, **R**, **T**, **V**, or **W**, the **tds** portion of the Product Code shall specify the three digit Division Code. See Figure 4.

If the product has not been divided (or there are not multiple product packs with the same Product Description Code and DIN), **tds** shall be set to 000 (zero, zero, zero).

Refer to the various product coding implementation guide publications for further guidance on assigning division codes.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 33

Figure 4 Product Code Data Content for α values of M, N, R, T, V, or W

Product Code
T1295003
Product Description Code
Division or Pack Code

If α is X1-X9, tds shall be reserved for future use and the value 000 shall be used.

For α values of A to D, the **tds** portion of the Product Code shall be defined in conjunction with the nationally or locally/facility defined code assignment.


<page_number>33</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                      34

## 2.4.4 Expiration Date [Data Structure 004]

Purpose: Data Structure 004 shall indicate the date at the end of which the item expires. This is intended to be used for medical devices with a human tissue component or for supplies such as filters or solutions. While in the past this data structure has been used for blood, tissue, or cellular therapy products, it is now recommended that Data Structure 005 be used for these products.

Structure: **=>cyyjjj**

The elements of the Expiration Date data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>></td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>c</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>jjj</td><td>3</td><td>numeric {0–9}</td></tr>
</table>

The six (6)-character data content string, **cyyjjj**, shall be encoded and interpreted as follows:

**c** shall specify the century of the year in which the item expires.

**yy** shall specify the year within the century in which the item expires.

**jjj** shall specify the ordinal number within the calendar year (Julian date) on which the item expires.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                          35

## 2.4.5     Expiration Date and Time [Data Structure 005]

Purpose:       Data Structure 005 shall indicate the date and time when the product expires.

Structure:     **&>cyyjjjhhmm**

The elements of the Expiration Date and Time data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>></td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>c</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>jjj</td><td>3</td><td>numeric {0–9}</td></tr>
<tr><td>hh</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>mm</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The ten (10)-character data content string, **cyyjjjhhmm**, shall be encoded and interpreted as follows:

**c**       shall specify the century of the year in which the product expires.

**yy**      shall specify the year within the century in which the product expires.

**jjj**     shall specify the ordinal number within the calendar year (Julian date) on which the product expires.

**hh**      shall specify the hour at which the product expires (00 to 23).

**mm**      shall specify the minute at which the product expires (00 to 59).

A day shall be defined as beginning at midnight (encoded as 0000) and ending at 23:59 (encoded as 2359).

When a time is not specified, the default value of 2359 shall be encoded in the data structure.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                               36

## 2.4.6 Collection Date [Data Structure 006]

Purpose: Data Structure 006 shall indicate the date on which the product was collected or recovered.

Structure: =*cyyjjj

The elements of the Collection Date data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>*</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>c</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>jjj</td><td>3</td><td>numeric {0–9}</td></tr>
</table>

The six (6)-character data content string, **cyyjjj**, shall be encoded and interpreted as follows:

**c** shall specify the century of the year in which the product was collected or recovered.

**yy** shall specify the year within the century in which the product was collected or recovered.

**jjj** shall specify the ordinal number within the calendar year (Julian date) on which the product was collected or recovered.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 37

## 2.4.7 Collection Date and Time [Data Structure 007]

Purpose: Data Structure 007 shall indicate the date and time of the collection or recovery of the product.

Structure: **&*cyyjjjhhmm**

The elements of the Collection Date and Time data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>*</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>c</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>jjj</td><td>3</td><td>numeric {0–9}</td></tr>
<tr><td>hh</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>mm</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The ten (10)-character data content string, **cyyjjjhhmm**, shall be encoded and interpreted as follows:

**c** shall specify the century of the year in which the product was collected or recovered.

**yy** shall specify the year within the century in which the product was collected or recovered.

**jjj** shall specify the ordinal number within the calendar year (Julian date) on which the product was collected or recovered.

**hh** shall specify the hour at which the product was collected or recovered (00 to 23).

**mm** shall specify the minute at which the product was collected or recovered (00 to 59).

A day shall be defined as beginning at midnight (encoded as 0000) and ending at 23:59 (encoded as 2359).

When a time is not specified, the default value of 2359 shall be encoded in the data structure.



<page_number>37</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                         38

## 2.4.8 Production Date [Data Structure 008]

Purpose: Data Structure 008 shall indicate the date on which the product was produced.

Structure: **=}cyyjjj**

The elements of the Production Date data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>}</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>c</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>jjj</td><td>3</td><td>numeric {0–9}</td></tr>
</table>

The six (6)-character data content string, **cyyjjj**, shall be encoded and interpreted as follows:

**c** shall specify the century of the year in which the product was produced.

**yy** shall specify the year within the century in which the product was produced.

**jjj** shall specify the ordinal number within the calendar year (Julian date) on which the product was produced.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                          39

## 2.4.9     Production Date and Time [Data Structure 009]

Purpose:       Data Structure 009 shall indicate the date and time of production of the product.

Structure:     **&}cyyjjjhhmm**

The elements of the Production Date and Time data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>}</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>c</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>jjj</td><td>3</td><td>numeric {0–9}</td></tr>
<tr><td>hh</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>mm</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The ten (10)-character data content string, **cyyjjjhhmm**, shall be encoded and interpreted as follows:

**c**      shall specify the century of the year in which the product was produced.

**yy**     shall specify the year within the century in which the product was produced.

**jjj**     shall specify the ordinal number within the calendar year (Julian date) on which the product was produced.

**hh**     shall specify the hour at which the product was produced (00 to 23).

**mm**     shall specify the minute at which the product was produced (00 to 59).

A day shall be defined as beginning at midnight (encoded as 0000) and ending at 23:59 (encoded as 2359).

When a time is not specified, the default value of 2359 shall be encoded in the data structure.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                           40

## 2.4.10 Special Testing: General [Data Structure 010]

**Purpose:** Data Structure 010 shall indicate special characteristics of a product, such as whether it has been phenotyped, the presence of antibodies, CMV antibody status, Hemoglobin S status, etc.

**Structure:** **&(zzzzz**

The elements of the Special Testing: General data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>(</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>zzzzz</td><td>5</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The five (5)-character data content string, **zzzzz**, shall be encoded and interpreted by reference to the Special Testing database table (see Section 5.2, page 115) published and maintained by ICCBBA in the password-protected area of the ICCBBA Website.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                        41

## 2.4.11 Special Testing: Red Blood Cell Antigens [Data Structure 011]—RETIRED

Data Structure 011 should not be used. It was **RETIRED** in Version 2.1.0 of the *ISBT 128 Standard Technical Specification* (August 2004), and replaced by Data Structures 012 and 013.

Purpose: Data Structure 011 is maintained for backwards compatibility. It provided information regarding the red blood cell phenotypes and CMV antibody status of the product.

Structure: **={aaaaaaaaaaaaaaaaii**

The elements of the Special Testing: Red Blood Cell Antigens data structure were defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>{</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>aaaaaaaaaaaaaaaa</td><td>16</td><td>numeric {0–9}</td></tr>
<tr><td>ii</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The eighteen (18)-character data content string, **aaaaaaaaaaaaaaaaii**, shall be encoded and interpreted using Table 8, starting on page 93, and Table 11, page 99.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                      42

## 2.4.12 Special Testing: Red Blood Cell Antigens—General
[Data Structure 012]

Purpose: Data Structure 012 shall provide information regarding the red blood cell phenotypes (see Glossary), CMV antibody, IgA status, Parvovirus B19, Hemoglobin S, and/or nationally specified characteristic(s) of the product.

Structure: =\aaaaaaaaaaaaaaaaii

The elements of the Special Testing: Red Blood Cell Antigens—General data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>\</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>aaaaaaaaaaaaaaaa</td><td>16</td><td>numeric {0–9}</td></tr>
<tr><td>ii</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The eighteen (18)-character data content string, **aaaaaaaaaaaaaaaaii**, shall be encoded and interpreted using Table 9, starting on page 95, and Table 12, page 100.

Common Rh antigens may be encoded together as a phenotype (Rh column 1 on Table 9, page 95) or as individual Rh antigens (C,c,E,e, columns 14-16). If Rh antigens are encoded individually using positions 14, 15, and/or 16, then the value of column 1 shall be set to 9, ni (no information).

Conversely, if the phenotype is present in column 1, then the values of the C,c,E,e antigens shall all be set to 9, ni (no information).

See Examples of Use in Section 9.1, page 136.

If there are red blood cell antigen test results that cannot be encoded using Table 9 or Table 12, positions 17 and 18 may be set to 00 (zeroes; see Table 12) and information concerning the status of those antigens may be indicated in the label text.

Alternatively, red blood cell antigens not found in these tables may be encoded using the Red Cell Antigens with Test History [Data Structure 030]. For information on this data structure, see Section 2.4.30, page 67.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 43

## 2.4.13 Special Testing: Red Blood Cell Antigens—Finnish
[Data Structure 013]

Purpose: Data Structure 013 shall provide information regarding the red blood cell phenotypes (see Glossary), CMV antibody, and IgA status of the product. The Finnish table reflects different antigen distributions in the Finnish population.

Structure: **&\aaaaaaaaaaaaaaaaii**

The elements of the Special Testing: Red Blood Cell Antigens—Finnish data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>\</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>aaaaaaaaaaaaaaaa</td><td>16</td><td>numeric {0–9}</td></tr>
<tr><td>ii</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The eighteen (18)-character data content string, **aaaaaaaaaaaaaaaaii**, shall be encoded and interpreted using Table 10, starting on page 97, and Table 13, page 101.

If there are red blood cell antigen test results that cannot be encoded using Table 10 or Table 13, positions 17 and 18 may be set to 00 (see Table 13), and information concerning the status of those antigens may be indicated in the label text.

Alternatively, red blood cell antigens not found in these tables may be encoded using the Red Cell Antigens with Test History (Data Structure 030). For information on this data structure, see Section 2.4.30, page 67.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 44

## 2.4.14 Special Testing: Platelet HLA and Platelet Specific Antigens [Data Structure 014]

**Purpose:** Data Structure 014 shall provide information regarding the HLA and HPA phenotypes, CMV antibody, IgA status, and anti-A and – B antibodies for platelet products.

If genomic typing is used, only the first two digits of the type shall be encoded.

**Structure:** &{AAAABBBBCCCCCCCCDE

The elements of the Special Testing: Platelet HLA and Platelet Specific Antigens data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>{</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>AAAA</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>BBBB</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>CCCCCCCC</td><td>8</td><td>numeric {0–9}</td></tr>
<tr><td>D</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>E</td><td>1</td><td>numeric {0–9}</td></tr>
</table>

The eighteen (18)-character data content string, **AAAABBBBCCCCCCCCDE**, shall be encoded and interpreted as follows:

**AAAA**
* shall specify HLA-A antigens
* shall be encoded and interpreted according to Table 14, beginning on page 102

**BBBB**
* shall specify HLA-B antigens
* shall be encoded and interpreted according to Table 14, beginning on page 102

Two **AA** values shall be encoded, followed by two **BB** values. The lower value shall always be listed first. See Examples of Use in Section 9.2, page 137.

**CCCCCCCC**
* shall specify platelet-specific antigens, IgA antigen and CMV antibody status
* shall be encoded and interpreted according to Table 15, page 104

**D**
* shall be reserved for future use
* shall be set to 0 (zero) at this time

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* <page_number>45</page_number>

**E**
* shall specify information about high-titered antibodies to A and B antigens
* shall be encoded and interpreted according to Table 16, page 105

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                             46

## 2.4.15 Special Testing: HLA-A and -B Alleles [Data Structure 015]—RETIRED

Data Structure 015 should not be used. It was **RETIRED** in Version 4.1.0 of the *ISBT 128 Standard Technical Specification* (December 2011).

Purpose: Data Structure 015 is retained for backward compatibility. It provided information regarding HLA-A and -B alleles for Cellular Therapy and Tissue products. This is the first of a pair of data structures (see Section 2.4.16).

Structure: **=[EEEEFFFFGGGGHHHHLM**

The elements of the Special Testing: HLA-A and –B Alleles data structure were defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>[</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>EEEE</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>FFFF</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>GGGG</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>HHHH</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>L</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>M</td><td>1</td><td>numeric {0–9}</td></tr>
</table>

The sixteen (16)-character data content string, **EEEEFFFFGGGGHHHH**, shall be encoded and interpreted using the table described in Section 4.1, page 111. The lower value of each pair shall always be listed first.

**EEEE** shall specify the first four digits of the first of the pair of HLA-A (usually) genomically determined alleles.

**FFFF** shall specify the first four digits of the second of the pair of HLA-A (usually) genomically determined alleles.

**GGGG** shall specify the first four digits of the first of the pair of HLA-B (usually) genomically determined alleles.

**HHHH** shall specify the first four digits of the second of the pair of HLA-B (usually) genomically determined alleles.

Only the first four digits of the HLA-A and -B alleles are significant for transfusion and transplantation, because the fifth and any subsequent characters describe synonymous mutations.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                           47

00 (zeroes) shall be used after the first two characters to signify that typing of the respective HLA-locus has been performed using a method that does not allow allele discrimination at higher resolution than two digits.

The value in the data structure for a null allele shall be 0000 (zeroes).

**L** shall specify the CMV antibody status (see Table 17, page 106).

**M**
* shall be reserved for future use
* shall be set to 9 at this time



<page_number>47</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           48

## 2.4.16 Special Testing: HLA-DRB1 Alleles [Data Structure 016]—RETIRED

Data Structure 016 should not be used. It was **RETIRED** in Version 4.1.0 of the *ISBT 128 Standard Technical Specification* (December 2011).

Purpose: Data Structure 016 is retained for backward compatibility. It provided information regarding HLA-DRB1 alleles for Cellular Therapy and Tissue products. This is the second of a pair of data structures (see Section 2.4.15).

Structure: =”IIIIJJJJMMMMMMMMMM

The elements of the Special Testing: HLA-DRB1 Alleles data structure were defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>“</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>IIII</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>JJJJ</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>MMMMMMMMMM</td><td>10</td><td>numeric {0–9}</td></tr>
</table>

The eight (8)-character data content string, IIIIJJJJ, shall be encoded and interpreted using the table described in Section 4.1, page 111. The lower value of each pair shall always be listed first.

IIII shall specify the first four digits of the first of the pair of HLA-DRB1 (usually) genomically determined alleles.

JJJJ shall specify the first four digits of the second of the pair of HLA-DRB1 (usually) genomically determined alleles.

Only the first four digits of the HLA-DRB1 alleles are significant for transfusion and transplantation, because the fifth and any subsequent characters describe synonymous mutations.

00 shall be used after the first two characters to signify that typing of the respective HLA-locus has been performed using a method that does not allow allele discrimination at higher resolution than two digits.

The value in the data structure for a null allele shall be 0000 (zeroes).

MMMMMMMMMM
* shall be reserved for future use
* shall be set to 9999999999 at this time

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                49

## 2.4.17 Container Manufacturer and Catalog Number [Data Structure 017]

Purpose: Data Structure 017 shall specify the manufacturer and catalog number of the container set and the identifying character(s) of the individual container(s) in the set.

Structure: **=)bqqwwwwwww**

The elements of the Container Manufacturer and Catalog Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>)</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>b</td><td>1</td><td>alphanumeric {A–Z; a-z; 0–9}</td></tr>
<tr><td>qq</td><td>2</td><td>alphanumeric {A–Z; 0–9}</td></tr>
<tr><td>wwwwwww</td><td>7</td><td>alphanumeric {A–Z; a–z; 0–9}*</td></tr>
</table>

The ten (10)-character data content string, **bqqwwwwwww**, shall be encoded and interpreted as follows:

**b** shall specify the container identification character in a container or transfer set. The value of **b** is set as follows:
* the character “1” shall be reserved for the primary collection container;
* other numbers and uppercase alpha characters may be used as container manufacturers choose;
* for an entire set of integrally attached containers, the character “y” shall be used. This code may appear on a set wrapper or individual container;
* for cartons containing blood collection containers, the character “z” shall be used. This code may appear on a packaging carton containing many sets of a given type;
* remaining lowercase alphas shall be reserved for future use.

**qq**
* shall specify the identity of the container set manufacturer.
* shall be encoded and interpreted using Table W1, Manufacturer Identifier Codes (described in Section 4.2, page 111).

**wwwwwww**
* shall specify the manufacturer’s catalog number.
* shall be interpreted using information provided by the manufacturer.

© 2004-2023 ICCBBA, All Rights Reserved                                             www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 50

If the catalog number is less than seven (7) characters, it shall be padded with zeroes at the beginning of the string (i.e., the catalog number 27QzE would be transmitted as 0027QzE).

Used in conjunction with the Manufacturer’s Data file [see Chapter 11, page 143, and *Implementation Guide: Use of the Manufacturers Data File* (IG-015)], this data structure can be a powerful tool for process control.

With use of appropriate software and downloading of the data file, much information about the container set can be determined automatically. This information includes the number of bags in the set, the anticoagulant/preservative, the intended nominal collection volume, etc.

Figure 5 Container Manufacturer and Catalog Number Data Content

Diagram showing the string 2XX00AB123. A bracket under the first character '2' is labeled "Container Identification Character". A bracket under the next two characters 'XX' is labeled "Manufacturer Code". A bracket under the remaining seven characters '00AB123' is labeled "Catalog Number".


<page_number>50</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 51

## 2.4.18 Container Lot Number [Data Structure 018]

Purpose: Data Structure 018 shall specify the manufacturer’s lot number for the container set.

Structure: **&)**xxxxxxxxxx

The elements of the Container Lot Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>)</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>xxxxxxxxxx</td><td>10</td><td>alphanumeric {A–Z; a–z; 0–9}*</td></tr>
</table>

The ten (10)-character data content string, **xxxxxxxxxx**, shall be encoded and interpreted as follows:

**xxxxxxxxxx** shall specify the manufacturer’s lot number.

If the lot number is less than ten (10) characters, it shall be padded with zeroes at the beginning of the string (i.e., the lot number 1234rZ would be transmitted as 00001234rZ).

If the lot number begins with a 0 (zero), the manufacturer shall have a mechanism to ensure it is correctly identified—even if a problem is reported in which the lot number is indicated without the leading 0 (zero).

This data structure shall be used in conjunction with Data Structure 017.


<page_number>51</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                    52

## 2.4.19 Donor Identification Number [Data Structure 019]

Purpose: Data Structure 019 shall specify a donor identification number that is unique anywhere in the world.

Structure: **=;αppppvvvvvvvvvvvvvvvv**

The elements of the Donor Identification Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>;</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>α</td><td>1</td><td>alphanumeric {A–N; P–Z; 1–9}</td></tr>
<tr><td>pppp</td><td>4</td><td>First two characters alphanumeric {A–N; P–Z; 0–9}; second two characters numeric {0–9}. Current usage is numeric for all four characters. Alpha characters may be introduced into positions 1 and 2 in the future.</td></tr>
<tr><td>vvvvvvvvvvvvvvvv</td><td>16</td><td>numeric {0–9}</td></tr>
</table>

The twenty-one (21)-character data content string, **αppppvvvvvvvvvvvvvvvv**, shall be encoded and interpreted as follows:

**αpppp**
* shall specify the Facility Identification Number (FIN)
* shall be encoded and interpreted by reference to the ICCBBA Registered Facility table (see Section 5.3, page 116) published and maintained by ICCBBA in the password-protected area of the ICCBBA Website

**vvvvvvvvvvvvvvvv** shall specify either a nationally or facility assigned sequence number identifying the donor.

The interpretation of the assigned number requires knowledge of how such numbers are assigned in the country of the facility specified by the FIN.

If the number assigned is less than sixteen (16) characters, it shall be padded with zeroes at the beginning of the string (i.e., the sequence number 395421746 would be transmitted as 0000000395421746).

However, in some countries, the assigned number can begin with zero, therefore the specific length of the


<page_number>52</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                     www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 53

assigned number must be known in order to correctly interpret this data structure.

*Note: This is not the same as the Global Registration Identifier for Donors (GRID). (See Section 2.4.37, page 79).*

Figure 6 Donor Identification Number

A9999 0000222244445555
{  } {              }
FIN Sequence Number

**Use of a National Donor Identification Number**
If the donor identification number is nationally assigned using this data structure, a dedicated FIN can be assigned by ICCBBA to distinguish nationally from facility assigned numbers. To exercise this option, a national authority should contact the ICCBBA office (support@isbt128.org).

*Note: There is an alternative, nationally defined data structure that may be used for a donor identification number (see Section 2.5.2, page 84).*

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                    54

## 2.4.20 Staff Member Identification Number [Data Structure 020]

Purpose: Data Structure 020 shall specify a staff identification number.

Structure: =’αppppuuuuuu

The elements of the Staff Member Identification Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>‘</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>α</td><td>1</td><td>alphanumeric {A–N; P–Z; 1–9}</td></tr>
<tr><td>pppp</td><td>4</td><td>First two characters alphanumeric {A–N; P–Z; 0–9}; second two characters numeric {0–9}. Current usage is numeric for all four characters. Alpha characters may be introduced into positions 1 and 2 in the future.</td></tr>
<tr><td>uuuuuu</td><td>6</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The eleven (11)-character data content string, αppppuuuuuu, shall be encoded and interpreted as follows:

**αpppp**
* shall specify the Facility Identification Number (FIN)
* shall be encoded and interpreted by reference to the ICCBBA Registered Facility table (see 5.3, page 116) published and maintained by ICCBBA in the password-protected area of the ICCBBA Website

**uuuuuu** shall specify a facility-assigned staff member identification number.

If the string assigned is less than six (6) characters, it shall be padded with zeroes at the beginning of the string (i.e., the staff member identification 395A would be transmitted as 00395A).

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 55

## 2.4.21 Manufacturer and Catalog Number: Items Other Than Containers [Data Structure 021]

**Purpose:** Data Structure 021 shall specify a manufacturer and a catalog number of an item used in collection or processing other than the container (set).

**Structure:** =-NNOOOOOOOO

The elements of the Manufacturer and Catalog Number: Items Other Than Containers data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>-</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>NN</td><td>2</td><td>alphanumeric {A–Z; 0–9}</td></tr>
<tr><td>OOOOOOOO</td><td>8</td><td>alphanumeric {A–Z; a–z; 0–9}</td></tr>
</table>

The ten (10)-character data content string, **NNOOOOOOOO**, shall be encoded and interpreted as follows:

**NN**
* shall specify the identity of the item manufacturer
* shall be encoded and interpreted using Table W1, Manufacturer Identifier Codes (described in Section 4.2, page 111)

**OOOOOOOO**
* shall specify the manufacturer’s catalog number
* shall be interpreted using information provided by the manufacturer

If the catalog number is less than eight (8) characters, it shall be padded with zeroes at the beginning of the string (i.e., the catalog number 27QzE would be transmitted as 00027QzE).

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 56

## 2.4.22 Lot Number: Items Other Than Containers [Data Structure 022]

Purpose: Data Structure 022 shall specify a manufacturer’s lot number for an item used in collection or processing other than the container (set).

Structure: **&-PPPPPPPPPP**

The elements of the Lot Number: Items Other Than Containers data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>-</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>PPPPPPPPPP</td><td>10</td><td>alphanumeric {A–Z; a–z; 0–9}</td></tr>
</table>

The ten (10)-character data content string, **PPPPPPPPPP**, shall be encoded and interpreted as follows:

**PPPPPPPPPP** shall specify the manufacturer’s lot number.

If the lot number is less than ten (10) characters, it shall be padded with zeroes at the beginning of the string (i.e., the lot number 1234rZ would be transmitted as 00001234rZ).

If the lot number begins with a 0 (zero), the manufacturer shall have a mechanism to ensure it is correctly identified—even if a problem is reported in which the lot number is indicated without the leading 0 (zero).

This data structure shall be used in conjunction with Data Structure 021.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                               57

## 2.4.23 Compound Message [Data Structure 023]

Purpose: Data Structure 023 shall allow multiple data structures to be combined into a single data string to facilitate the use of newer technology delivery systems.

Structure: =+aabbb

The elements of the Compound Message data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>+</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>aa</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>bbb</td><td>3</td><td>numeric {0–9}</td></tr>
</table>

The five (5)-character data content string, **aabbb**, shall be encoded and interpreted as follows:

**aa** shall specify the number of ISBT 128 data structures that follow.

**bbb** EITHER:

* shall be all zeroes—indicating this is an undefined message, i.e., only the number of data structures is identified, but not what each one is, or the order in which they occur,

OR

* shall be a three-digit number, referencing an entry in an ICCBBA maintained table, that defines the sequence of the data structures within a compound message (see Table W2, [RT017] ICCBBA-Specified Compound Messages described in Section 4.3, page 111).

*Note: Because of the complexity created by multiple product categories and the many codes that would result from permutations of order of data structures, ICCBBA now encourages the use of undefined messages.*

Rules for constructing compound messages:

1. A compound message shall comprise a string of ISBT 128 data structures (excluding nationally defined structures), beginning with the Compound Message [Data Structure 023].
2. Data structures shall be combined with no intervening characters.

© 2004-2023 ICCBBA, All Rights Reserved                                              www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 58

Each data structure shall begin with its data identifier characters.

3. The string shall only contain ISBT 128 data structures.

4. The number of data structures following the Compound Message data structure shall be indicated in element **aa** of the Compound Message data structure.

5. If the sequence of the message is unspecified, the Compound Message data structure shall have element **bbb** set to zeroes.

6. If a specified sequence is used, the reference number of the selected message from Table RT017 shall be included in element **bbb** of the Compound Message data structure.

The order of the data structures shall be that shown in Table RT017 for the reference number selected.

ICCBBA-specified compound messages are defined in Table W2, ICCBBA-Specified Compound Messages (described in Section 4.3, page 111). Requests for additional entries may be submitted to the ICCBBA office (technical.mgr@isbt128.org).

Software designed to interpret ICCBBA compound messages should be able to interpret both undefined sequence and ICCBBA-specified sequence compound messages.

The software should always verify the integrity of the data string, including checking that the correct number of data structures appear and, when specified sequence messages are used, that the sequence of data structures is correct.

Data should only be interpreted if the integrity of the relevant data structures has been confirmed.

For examples of its use, see *Implementation Guide: Use of Data Matrix Symbols with ISBT 128* (IG-014).

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                          59

## 2.4.24 Patient Date of Birth [Data Structure 024]

Purpose: Data Structure 024 shall indicate the date of birth of the patient and the location where this occurrence of the information was located.

Structure: **=#aayyyymmdd**

The elements of the Patient Date of Birth data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>#</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>aa</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>yyyy</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>mm</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>dd</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The ten (10)-character data content string, **aayyyymmdd**, shall be encoded and interpreted as follows:

**aa** shall specify a location code identifying where this occurrence of the information was located. For acceptable values, see Table RT018.

**yyyy** shall specify the year of birth.

**mm** shall specify the month of birth.

**dd** shall specify the day of birth.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 60

## 2.4.25 Patient Identification Number [Data Structure 025]

**Note:** Patient identification should preferably be implemented by using GS1 standards, in particular when facilities are implementing Patient ID, or have already implemented Patient ID for processes other than transfusion. Data Structure 025 is maintained to support those users who have already implemented an ISBT 128 patient identification number. See Assigning a Patient Identification Number (JP-004). ISO/TS 18530:2021 should be referenced for an identifier that would be unique globally.

**Purpose:** Data Structure 025 shall indicate a patient identification number and the location of where this occurrence of the information was located.

**Structure:** **&#aallxx…xx**

The elements of the Patient Identification Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>#</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>aa</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>ll</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>xx…xx</td><td>var</td><td>alphanumeric {A-Z; a–z; 0–9}</td></tr>
</table>

The variable length data content string, **aallxx…xx**, shall be encoded and interpreted as follows:

**aa** shall specify a location code identifying where this occurrence of the information was located. For acceptable values, see Table RT018.

**ll** shall specify the length of the following patient number field.

**xx…xx** shall specify the patient identification number—alphanumeric only—punctuation characters and spaces are not permitted.

Reading software should always verify the integrity of the data content string, including checking that the correct number (as defined by **ll**) of characters appear in the patient identification number.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 61

## 2.4.26 Expiration Month and Year [Data Structure 026]

Purpose: Data Structure 026 shall indicate a month and year of expiration for supplies. This data structure shall not be used for MPHO products.

Structure: **=]yyyymm**

The elements of the Expiration Month and Year data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>]</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>yyyy</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>mm</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The six (6)-character data string, **yyyymm**, shall be encoded and interpreted as follows:

**yyyy** shall specify the year of expiration.

**mm** shall specify the month of expiration.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                              62

## 2.4.27 Transfusion Transmitted Infection Marker [Data Structure 027]

**Purpose:** Data Structure 027 shall provide information regarding the infectious disease screening status of a product.

**Structure:** &”nnnnnnnnnnnnnnnnnn

The elements of the Transfusion Transmitted Infection Marker data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>“</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>nnnnnnnnnnnnnnnnnn</td><td>18</td><td>numeric {0–9}</td></tr>
</table>

The eighteen (18)-character data content string, **nnnnnnnnnnnnnnnnnn**, shall be encoded and interpreted as follows:

**nnnnnnnnnnnnnnnnnn** shall specify a string of digits—each of which shall identify the result status of a pair of markers—as indicated in Table 18, page 107.

Currently, only values in the first ten positions have been defined; therefore, positions 11-18 shall be set to a value of 0 (zero).

For each marker, there shall be three possible outcomes:

**pos** reactive for the specified marker in the screening process.

**neg** specific marker not detected in the screening process.

**ni** no information encoded. Additional information may be present in accompanying documentation.

The information shall be specific to a particular collection; therefore, it must be provided in a manner that can be securely linked to the Donation Identification Number.

The results provided in the data content string shall be the final outcome of the approved screening process of the testing facility.

For an example of use for this data structure, see Section 9.3, page 139.

© 2004-2023 ICCBBA, All Rights Reserved                                    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                  63

## 2.4.28 Product Consignment [Data Structure 028]

Purpose: Data Structure 028 shall specify information about product shipments.

Structure: **=$αppppyynnnnnccdd**

The elements of the Product Consignment data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>$</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>α</td><td>1</td><td>alphanumeric {A–N; P–Z; 1–9}</td></tr>
<tr><td>pppp</td><td>4</td><td>First two characters alphanumeric {A–N; P–Z; 0–9}; second two characters numeric {0–9}. Current usage is numeric for all four characters. Alpha characters may be introduced into positions 1 and 2 in the future.</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>nnnnn</td><td>5</td><td>numeric {0–9}</td></tr>
<tr><td>cc</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>dd</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The sixteen (16)-character data content string, **αppppyynnnnnccdd**, shall be encoded and interpreted as follows:

**αpppp**
* shall specify the Facility Identification Number (FIN)
* shall be encoded and interpreted by reference to the ICCBBA Registered Facility table (see Section 5.3, page 116) published and maintained by ICCBBA in the password-protected area of the ICCBBA Website

**yy** shall specify the year.

**nnnnn** shall specify a serial number.

**cc** shall specify the number of the container within the consignment.

For dispatch documentation (paper or electronic), this field shall be set to 00 (zeroes).

**dd** shall specify the total number of containers in the consignment.

© 2004-2023 ICCBBA, All Rights Reserved                                    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 64

Figure 7 Example of Data Content for Data Structure 28

Diagram showing the breakdown of the string A999917123450102. The first four characters 'A999 are labeled 'FIN'. The next character '9' is labeled 'Year'. The next five characters '17123' are labeled 'Facility - assigned serial number'. The next character '4' is labeled 'Container number'. The last two characters '50' are labeled 'Total number of containers in shipment'. Note: The brackets in the diagram indicate the following groupings: A999 (FIN), 9 (Year), 1712345 (Facility-assigned serial number), 0 (Container number), 10 (Total number of containers in shipment).](data_structure_28_diagram.png)


<page_number>64</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                             65

## 2.4.29 Dimensions [Data Structure 029]

Purpose:            Data Structure 029 shall carry information about the dimensions
                    (length, area, volume, etc.) of a product.

Structure:          &$nnaabbbbcccccdee…aabbbbcccccdee

The elements of the Dimensions data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>$</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>nn</td><td>2</td><td>numeric value {00–99}</td></tr>
<tr><td></td><td></td><td>Repeating segments (repeats nn times):</td></tr>
<tr><td>aa</td><td>2</td><td>numeric value {0–9}</td></tr>
<tr><td>bbbb</td><td>4</td><td>numeric value {0–9}</td></tr>
<tr><td>ccccc</td><td>5</td><td>numeric value {0–9}</td></tr>
<tr><td>d</td><td>1</td><td>numeric value {0–9}</td></tr>
<tr><td>ee</td><td>2</td><td>numeric value {0–9}</td></tr>
</table>

The sixteen (16)-character data content string, nnaabbbbcccccdee, shall be encoded and interpreted as follows:

**nn**                    number of repeating segments.

                        Repeating segment (repeats nn times):

**aa**                    refers to a symbol as defined by Table 19, page 109.

**bbbb**                  refers to a dimension as defined by Table 20, page 109.

**ccccc**                 value of the dimension specified in the associated Product
                        Description Code.
                        Dimension values are in accordance with the limits of accuracy
                        specified in the supplier’s product catalog or product insert.
                        Should the measured value be less than five characters, leading
                        zeroes shall be used.

**d**                     number of decimal places as defined in Table 21, page 109.

**ee**                    reserved for future use.
                        Shall be set to 00 (zeroes) at this time.

There is no requirement for the order in which dimensions may appear in the
data content string.

© 2004-2023 ICCBBA, All Rights Reserved                                              www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 66

Software shall be written to place a value in the appropriate field based on the value of **aa** and **bbbb** in the Dimensions data structure.

Reading software should always verify the integrity of the data content string, including checking that the correct number of repeating segments occur.

Data should only be interpreted if the integrity of the entire data content string has been confirmed.

For examples of use and implementation guidance, see *Implementation Guide: Use of Dimensions [Data Structure 029]* (IG-026), on the ICCBBA Website.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 67

## 2.4.30 Red Cell Antigens with Test History [Data Structure 030]

Purpose: Data Structure 030 shall specify information about red cell antigen phenotypes (see Glossary), including whether the test has been performed more than once, and if the results represent current or historical data.

Structure: **&%nnnpppppprrss...pppppprrss**

The elements of the Red Cell Antigens with Test History data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>%</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>nnn</td><td>3</td><td>numeric {0–9}</td></tr>
<tr><td></td><td></td><td>Repeating segment (repeats nnn times):</td></tr>
<tr><td>pppppp</td><td>6</td><td>numeric {0–9}</td></tr>
<tr><td>rr</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>ss</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The thirteen (13)-character data content string, **nnnpppppprrss**, shall be encoded and interpreted as follows:

**nnn** shall indicate the number of occurrences of the repeating segment in the data structure.

**Repeating segment (repeats nnn times):**

**pppppp** ISBT-defined antigen as listed in the table described in Section 4.4, page 112.

The blood group system number shall be listed first, followed by the antigen number.

**rr** result interpretation as defined by Table 22, page 110.

**ss** number of tests as defined by Table 23, page 110.

There is no requirement for the order in which antigens may appear in the data content string.

Software shall be written to place an antigen in the appropriate field based on the value of **pppppp**.


<page_number>67</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                   68

When utilizing this data structure to express more than one test result, the results shall be concordant.

Information in the Red Cell Antigen with Test History Data Structure shall be firmly linked to the DIN to which it corresponds.

Reading software should always verify the integrity of the data content string, including checking that the correct number of repeating segments occur.

Data should only be interpreted if the integrity of the entire data content string has been confirmed.

For examples of use and implementation guidance, see *Implementation Guide: Use of Red Cell Antigens with Test History [Data Structure 030] (IG-027)* on the ICCBBA Website.



<page_number>68</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 69

## 2.4.31 Flexible Date and Time [Data Structure 031]

**Purpose:** Data Structure 031 shall convey information about date and time, including the type of time (collection, recovery, production, cross clamp, etc.) and the time zone (local or UTC).

**Date of Implementation:** For cellular therapy, regenerated tissue, ocular tissue, and organs, this data structure is available for use immediately. For other product categories, this data structure is not yet an option. This will allow software developers to create, and users to validate, software capable of reading and interpreting the data structure. When it becomes available to these facilities, this document will be updated.

**Structure:** =(ZUTTYYYYMMDDhhmm

The elements of the Flexible Date and Time data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>(</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>Z</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>U</td><td>1</td><td>numeric {0–9}</td></tr>
<tr><td>TT</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>YYYY</td><td>4</td><td>numeric {0–9}</td></tr>
<tr><td>MM</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>DD</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>hh</td><td>2</td><td>numeric {0–9}</td></tr>
<tr><td>mm</td><td>2</td><td>numeric {0–9}</td></tr>
</table>

The sixteen (16)-character data content string, **ZUTTYYYYMMDDhhmm**, shall be encoded and interpreted as follows:

**Z**
* shall specify local or UTC time
* shall be interpreted using Table 24, page 110

**U**
* shall be reserved for future use
* shall be set to 0 (zero) at this time

**TT**
* shall specify the type of time
* shall be interpreted using Table 25, page 110

**YYYY** shall specify the year.

**MM** shall specify the month (01 to 12).

**DD** shall specify the day (01 to 31).

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 70

**hh** shall specify the hour (00 to 23).
**mm** shall specify the minute (00 to 59).

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           71

## 2.4.32 Product Divisions [Data Structure 032]

Purpose: Data Structure 032 shall convey information about:
* aliquots, or
* one or more individual collections from the donor within the same donation event.

The Product Divisions Code may represent:
* one of the subunits from a single container that has been divided. This can also be referred to as an aliquot or a split.
* one of the containers from a collection, where the volume of product collected required the use of more than one container.
* a single collection into one container.

Date of implementation depends on the data structure with which it will be used. That is:

When used in conjunction with Data Structure 003: Because this data structure becomes part of the unique identification of a product, implementation of the data structure must be coordinated so that computer systems of facilities receiving the product are able to scan and interpret the codes.

This data structure may be used for Cellular Therapy or Regenerated Tissue products if:

* a product will remain within the facility that labeled it with this data structure,

OR

* there is an agreement between the supplier and the receiver of a product to utilize this data structure sooner.

Note: At the present time, use of the Product Divisions data structure with Data Structure 003 is restricted to Cellular Therapy and Regenerated Tissue Product Codes (where α is S and P, respectively) and for products identified using Data Structure 034. However, in the future the use of the Product Divisions Data Structure may be extended to blood products (where α is E or F).

When used in conjunction with Data Structure 034: This data structure may be used at any time.

Structure: =,dddddd

The elements of the Product Divisions data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>,</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>dddddd</td><td>6</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved                                     www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                  72

The six (6)-character data content string, **dddddd**, shall be encoded and interpreted as follows:

**dddddd** shall specify the Product Divisions Code.

The Product Divisions Code allows for a high level of flexibility:

* digits shall be used where a single level of divisions is required (allowing up to 999,999 divisions).
* if it is desirable to show levels of divisions (to allow for divisions of divisions), alpha characters shall be used. In this situation, the six character field may be split into three pairs, each allowing **AA** through to **ZZ**. This provides up to three levels of division.

When the Product Divisions data structure is used in conjunction with the Product Code [Data Structure 003], “99” shall appear in the 7<sup>th</sup> and 8<sup>th</sup> positions of the Product Code. See Section 2.4.3.

The Product Divisions data structure, when used, is essential for traceability.

Software shall require that when a 99 appears in positions 7 and 8 of the Product Code [Data Structure 003], the Product Divisions data structure shall be scanned and recorded.

If manual records are maintained, the Divisions Code shall be recorded along with the DIN and the Product Code for all records required for traceability.

Each Product Divisions code shall be unique for a given Product Code [Data Structure 003] and DIN.

For use of this data structure in conjunction with the Product Code [Data Structure 003], see *Implementation Guide, Use of Product Divisions [Data Structure 032]* (IG-023).

For use of this data structure in conjunction with the Processor Product Identification Code [Data Structure 034], see *ISBT 128 Standard Coding and Labeling of Medical Devices Containing MPHO* (ST-017).

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                              73

## 2.4.33 Processing Facility Information Code [Data Structure 033]

Purpose: Data Structure 033 shall convey information about the facility that assigned the Product Code, and may include a Facility-defined Product Code (FPC) assigned by the processing or labeling facility.

Structure: **&+nnnnnpppppp**

The elements of the Processing Facility Information Code data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>+</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>nnnnn</td><td>5</td><td>alphanumeric {A–N; P–Z; 0–9}</td></tr>
<tr><td>pppppp</td><td>6</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The eleven (11)-character data content string, **nnnnnpppppp**, shall be encoded and interpreted as follows:

**nnnnn**
* shall specify the Facility Identification Number of the facility that assigned the Product Code [FIN(P)].
* shall be encoded and interpreted by reference to the ICCBBA Registered Facility table published and maintained by ICCBBA in the password-protected area of the ICCBBA Website.

The facility that assigned the Product Code may, or may not, be the same facility that assigned the DIN.

This code, in conjunction with the DIN [Data Structure 001] and Product Code [Data Structure 003], may be required for unique identification of the product.

If the FIN(P) within Data Structure 033 is required to ensure unique identification of the product, then these data structures shall be presented in a 2-D symbol to ensure all information required for traceability is read.

See *Implementation Guide: Use of Processing Facility Information Code [Data Structure 033]* for an explanation of when the FIN(P) is required for traceability.

**pppppp** shall specify the Facility-defined Product Code (FPC) assigned by the processing or labeling facility, which indicates a catalog or other number that identifies the product within its system.

The FPC shall not be used to create uniqueness for the product.

© 2004-2023 ICCBBA, All Rights Reserved                                              www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 74

If a value is not required, the default value of 000000 (zeroes) shall be used.

Figure 8 Example of Data Content for Data Structure 033

A 9 9 9 9 A B 3 4 5 6
└───────────┘ └───────────┘
Facility Facility
Identification defined
Number of the Product
Facility Code
Assigning the (FPC)
Product Codes
[FIN(P)]

See *Implementation Guide: Use of the Processing Facility Information Code [Data Structure 033]* (IG-031) for more information.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                             75

## 2.4.34 Processor Product Identification Code [Data Structure 034]

**Purpose:** Data Structure 034, the Processor Product Identification Code (PPIC), shall identify:
* a processing or labeling facility
* a Facility-defined Product Code (FPC)
* a standardized Product Description Code (PDC).

This data structure may be used for medical device identification.

**Structure:** =/nnnnnppppppqqqqq

The elements of the Processor Product Identification Code data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>=</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>/</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>nnnnn</td><td>5</td><td>alphanumeric {A–N; P–Z; 0–9}</td></tr>
<tr><td>pppppp</td><td>6</td><td>alphanumeric {A–Z; 0–9}</td></tr>
<tr><td>qqqqq</td><td>5</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The sixteen (16)-character data string, **nnnnnppppppqqqqq**, shall be encoded and interpreted as follows:

**nnnnn**
* shall specify the Facility Identification Number of the facility that assigned the PDC [FIN(P)]
* shall be encoded and interpreted by reference to the ICCBBA Registered Facility table published and maintained by ICCBBA in the password-protected area of the ICCBBA Website

The facility that assigned the PDC may, or may not, be the same facility that assigned the DIN.

**pppppp** shall specify a Facility-defined Product Code (FPC) assigned by the processing or labeling facility, which indicates a catalog or other number that identifies the product within its system.

This code shall not be used to create uniqueness for the product.

If a value is not required, the default value of 000000 (zeroes) shall be used.

**qqqqq** shall be encoded and interpreted by reference to the Product Description Code database table, with the exception of Clinical Trials PDCs which are in a separate database. The Product

© 2004-2023 ICCBBA, All Rights Reserved                                              www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 76

Description Code Database is published and maintained by
ICCBBA in the password-protected area of the ICCBBA Website.

Medical devices with a human donor component shall be uniquely identified
using Data Structure 034, the Donation Identification Number [Data Structure
001], and Product Divisions [Data Structure 032].

See *ISBT 128 Standard, Coding and Labeling of Medical Devices Using ISBT I28*
(ST-011) for more information.

Figure 9 Example of Data Content for Data Structure 034

A 9 9 9 7 A B 3 4 5 6 T 0 1 2 3
└───────────┴───────┴───────────┘
      │         │         │
  Facility   Facility  Standardized
Identification defined     Product
Number of the Product    Description
   Facility   Code (FPC)     Code
Assigning the                (PDC)
Product Codes
   [FIN(P)]

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                77

## 2.4.35 MPHO Lot Number [Data Structure 035]

Purpose: Data Structure 035 shall specify a lot number for medical products of human origin (MPHO).

Structure: **&,1xxxxxxxxxxxxxxxxxx**

The elements of the MPHO Lot Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>,</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>1</td><td>1</td><td>data identifier, third character</td></tr>
<tr><td>xxxxxxxxxxxxxxxxxx</td><td>18</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The eighteen (18)-character data content string shall be encoded and interpreted as follows:

**xxxxxxxxxxxxxxxxxx** shall specify a lot number assigned by the processing facility.

If the lot number is less than 18 characters, it shall be padded with zeroes at the beginning of the string (i.e., the lot number 5434RZ would be transmitted as 0000000000005434RZ).

If the lot number begins with a 0 (zero), the manufacturer shall have a mechanism to ensure it is correctly identified—even if a problem is reported in which the lot number is indicated without the leading zero.

This data structure shall not be used to uniquely identify a product.

When used as part of a production identifier in the labeling of a medical device, this data structure must comply with ISO 15459-4.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                          78

## 2.4.36 MPHO Supplemental Identification Number [Data Structure 036]

Purpose: Data Structure 036 shall specify a supplemental identification number for MPHO.

Structure: **&,2xxxxxxxxxxxxxxxxxx**

The elements of the MPHO Supplemental Identification Number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>,</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>2</td><td>1</td><td>data identifier, third character</td></tr>
<tr><td>xxxxxxxxxxxxxxxxxx</td><td>18</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The eighteen (18)-character data content string shall be encoded and interpreted as follows:

**xxxxxxxxxxxxxxxxxx** shall specify a supplemental identification number assigned by the processing facility

If the supplemental identification number is less than 18 characters, it shall be padded with zeroes at the beginning of the string (i.e., the supplemental identification number 1234RZ would be transmitted as 0000000000001234RZ).

If the supplemental identification number begins with a 0 (zero), the manufacturer shall have a mechanism to ensure it is correctly identified—even if a problem is reported in which the number is indicated without the leading zero.

This data structure shall not be used to uniquely identify a product.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                    79

## 2.4.37 Global Registration Identifier for Donors [Data Structure 037]—RETIRED

Data Structure 037 shall not be used. It was **RETIRED** in version 5.8.0 of the *ISBT 128 Technical Specification* (June 2017). It was replaced with Data Structure 039.

Purpose: Data Structure 037 is maintained for backwards compatibility. It provided information regarding the Global Registration Identifier for Donors (GRID).

Structure: &,3nnnnaaaaaaaaaaaaaaa

The elements of the Global Registration Identifier for Donors data structure were defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>,</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>3</td><td>1</td><td>data identifier, third character</td></tr>
<tr><td>nnnn</td><td>4</td><td>numeric {0–9}; first character shall not be 0 (zero).</td></tr>
<tr><td>aaaaaaaaaaaaaaa</td><td>15</td><td>alphanumeric {A–Z; 0–9}</td></tr>
</table>

The nineteen (19)-character data content string shall be encoded and interpreted as follows:

**nnnn**
* shall specify the GRID Issuing Organization Number (ION)
* shall be encoded and interpreted by reference to the ICCBBA GRID Issuing Organization Number table published and maintained by ICCBBA in the password-protected area of the ICCBBA Website

**aaaaaaaaaaaaaaa**
shall specify a sequence number that identifies a donor, potential donor, or registry listing, for cord blood stem cell products within the registration organization.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                   80

# 2.4.38 Single European Code [Data Structure 038]

Purpose: Data Structure 038 shall encode the Single European Code (SEC) as described in the EU Commission Directive 2015/565.

Structure: **&,4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx**

The elements of the Single European Code data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>,</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>4</td><td>1</td><td>data identifier, third character</td></tr>
<tr><td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td><td>40</td><td>alphanumeric {A–Z; a-z; 0–9}</td></tr>
</table>

The forty (40)-character data content string shall be encoded and interpreted as follows:

**xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx** shall specify the SEC as described in the EU Commission Directive 2015/565.

The data content string comprises two segments: the Donation Identification Sequence and the Product Identification Sequence. See Figure 10.

The use of this data structure is described in detail in *ISBT 128 Standard, ISBT 128 and the Single European Code (SEC) (ST-012)*.

Figure 10 Example of Data Content for Single European Code [Data Structure 038]

Example of Data Content for Single European Code



<page_number>80</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                               www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 81

## 2.4.39 Global Registration Identifier for Donors [Data Structure 039]

**Purpose:** Data Structure 039 shall specify a globally unique identifier for HPC donors or potential donors. This replaces Data Structure 037.

**Structure:** **&:nnnnaaaaaaaaaaaaaabb**

The elements of the Global Registration Identifier for Donors data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>:</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td>nnnn</td><td>4</td><td>numeric {0–9}; first character shall not be 0 (zero).</td></tr>
<tr><td>aaaaaaaaaaaaa</td><td>13</td><td>alphanumeric {A–Z; 0–9}</td></tr>
<tr><td>bb</td><td>2</td><td>Two-digit checksum {00–36}</td></tr>
</table>

The nineteen (19)-character data content string shall be encoded and interpreted as follows:

**nnnn**
* shall specify the GRID Issuing Organization Number (ION)
* shall be encoded and interpreted by reference to the ICCBBA GRID Issuing Organization Number table published and maintained by ICCBBA on the ICCBBA Website

**aaaaaaaaaaaaa**
* shall specify the Registration Donor Identifier (RDI)
* shall uniquely identify a donor, or potential donor, within the registration organization

**bb**
shall specify the two-digit modulus 37-2 checksum.

See *ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules* (ST-015) for additional requirements when assigning a GRID.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 82

# 2.4.40 Chain of Identity Identifier [Data Structure 040]

Purpose: Data Structure 040 shall specify an ISBT 128 CoI Identifier.

Structure: &/CHαppppyynnnnnn

The elements of the Chain of Identity Identifier data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&/</td><td>2</td><td>data identifiers</td></tr>
<tr><td>CH</td><td>2</td><td>literal “CH”</td></tr>
<tr><td>α</td><td>1</td><td>Alphanumeric {A–N; P–Z; 1–9}</td></tr>
<tr><td>pppp</td><td>4</td><td>First two characters alphanumeric {A–N; P–Z; 0–9}; second two characters numeric {0– 9}. Current usage is numeric for all four characters. Alpha characters may be introduced into positions 1 and 2 in the future (e.g., if α = A and pppp = BC12, the αpppp will be ABC12).</td></tr>
<tr><td>yy</td><td>2</td><td>numeric {0-9}</td></tr>
<tr><td>nnnnnn</td><td>6</td><td>Alphanumeric {A-Z; 0-9}</td></tr>
</table>

The fifteen (15)-character data content string shall be encoded and interpreted as follows:

**CH** The literal string “CH”

**αpppp** The five-character Facility Identification Number of the Issuing Organization

**yy** Two-digit year indicator. (Nominal year of issue)

**nnnnnn** Six-character Alphanumeric sequence number assigned by the Issuing Organization

See *ISBT 128 Standard Chain of Identity (CoI) Identifier* (ST-028) for additional requirements when assigning a CoI Identifier.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                         83

# 2.5 Non-ICCBBA Defined Data Structures

## 2.5.1 Data Structures Not Defined by ICCBBA

Data structures that fit in the ISBT 128 model, but are not internationally defined by ICCBBA, may be desirable for use by individual facilities or by regional, national, or supranational authorities.

The data identifiers **&a** through **&z** shall be reserved to support such data structures.

There should be a national consensus regarding which data identifiers are reserved for national use and which, if any, are allowed for regional or supranational use.

The Facility Identification Numbers (FINs) to which the definitions of these data structures apply shall be documented.

Software shall only interpret these data structures within the context of the documented FIN(s).

Non-ICCBBA defined data structures shall not be used in Compound Messages.

The elements of non-ICCBBA defined data structures are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>a–z</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td colspan="3">Further elements will be nationally (or regionally) defined.</td></tr>
</table>

*Note: Care should be taken not to confuse these non-ICCBBA defined data structures with locally/facility- or nationally assigned Product Description Codes (see Section 2.4.3, page 30).*

*Note: There are internationally defined data structures for both the nationally defined Donor Identification Number [Data Structure 019] and the Patient Identification Number [Data Structure 025].*

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           84

## 2.5.2 Reserved Data Identifiers for a Nationally Specified Donor Identification Number
A nationally specified data structure may be defined to contain a unique donor (not donation) identification number.

The data identifier shall be **&;**

The elements of a nationally specified donor identification number data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>;</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td colspan="3">Further elements will be nationally defined.</td></tr>
</table>

*Note: There is an alternative internationally defined data structure that may be used for a donor identification number (see Section 2.4.19, page 52).*

## 2.5.3 Confidential Unit Exclusion Status Data Structure
A nationally specified data structure may be defined to contain information regarding a donor’s confidential decision to request that a donated unit be EITHER:

* accepted for testing and processing,
OR
* discarded.

The data identifier shall be **&!**

The elements of a nationally defined, confidential unit exclusion status data structure are defined as follows:

<table>
<tr><th>Element</th><th>Length</th><th>Type</th></tr>
<tr><td>&</td><td>1</td><td>data identifier, first character</td></tr>
<tr><td>!</td><td>1</td><td>data identifier, second character</td></tr>
<tr><td colspan="3">Further elements will be nationally defined.</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 85

# 3 Reference Tables

## 3.1 Reference Tables Maintained in this Document

Table 3 Data Structure 001: Donation Identification Number Flag Characters, ff [RT004]

<table>
<tr><th>Value of ff</th><th>Meaning When Used with the Donation Identification Number</th></tr>
<tr><td>00</td><td>Flag not used; null value</td></tr>
<tr><td>01</td><td>Container 1 of a set</td></tr>
<tr><td>02</td><td>Container 2 of a set</td></tr>
<tr><td>03</td><td>Container 3 of a set</td></tr>
<tr><td>04</td><td>Container 4 of a set</td></tr>
<tr><td>05</td><td>Second (or repeated) “demand-printed” label</td></tr>
<tr><td>06</td><td>Pilot tube label</td></tr>
<tr><td>07</td><td>Test tube label</td></tr>
<tr><td>08</td><td>Donor record label</td></tr>
<tr><td>09</td><td>Sample tube for NAT testing</td></tr>
<tr><td>10</td><td>Samples for bacterial testing</td></tr>
<tr><td>11</td><td>Match with Unit label</td></tr>
<tr><td>12</td><td>Affixed partial label</td></tr>
<tr><td>13</td><td>Attached label (intended to be used with affixed partial label)</td></tr>
<tr><td>14</td><td>Reserved for future assignment</td></tr>
<tr><td>15</td><td>Container 5 of a set</td></tr>
<tr><td>16</td><td>Container 6 of a set</td></tr>
<tr><td>17</td><td>Container 7 of a set</td></tr>
<tr><td>18</td><td>Container 8 of a set</td></tr>
<tr><td>19</td><td>Container 9 of a set</td></tr>
<tr><td>20-59</td><td>Reserved for assignment and use by each local facility. Therefore the meaning and interpretation of flag values 20–59 may differ with each FIN and should not be interpreted at any other site</td></tr>
<tr><td>60–96</td><td>ISO/IEC 7064 modulo 37-2 check character on the preceding thirteen (13) data characters, αppppyynnnnnn including the FIN, year and the unit sequence number — value is assigned as 60 plus the modulo 37-2 checksum</td></tr>
<tr><td>97–99</td><td>Reserved for future assignment</td></tr>
<tr><td>Alphanumeric using numbers in the range 0-9 and alphas in the range A-N, P, R-Y</td><td>Reserved for future assignment</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification Version v6.2.2                                                               86

Table 4 Data Structure 002: Blood Groups [ABO and RhD], Including Optional Type of Collection Information [RT005]

<table>
<tr><th>ABO and RhD Blood Groups</th><th>Default: Intended Use Not Specified</th><th>Directed (Dedicated/ Designated) Collection Use Only</th><th>For Emergency Use Only</th><th>Directed (Dedicated/ Designated) Collection/ Biohazardous</th><th>Directed (Dedicated/ Designated) Collection/ Eligible for Crossover</th><th>Autologous Collection/ Eligible for Crossover</th><th>For Autologous Use Only</th><th>For Autologous Use Only/ Biohazardous</th></tr>
<tr><td>O RhD negative</td><td>95</td><td>91</td><td>92</td><td>93</td><td>94</td><td>96</td><td>97</td><td>98</td></tr>
<tr><td>O RhD positive</td><td>51</td><td>47</td><td>48</td><td>49</td><td>50</td><td>52</td><td>53</td><td>54</td></tr>
<tr><td>A RhD negative</td><td>06</td><td>02</td><td>03</td><td>04</td><td>05</td><td>07</td><td>08</td><td>09</td></tr>
<tr><td>A RhD positive</td><td>62</td><td>58</td><td>59</td><td>60</td><td>61</td><td>63</td><td>64</td><td>65</td></tr>
<tr><td>B RhD negative</td><td>17</td><td>13</td><td>14</td><td>15</td><td>16</td><td>18</td><td>19</td><td>20</td></tr>
<tr><td>B RhD positive</td><td>73</td><td>69</td><td>70</td><td>71</td><td>72</td><td>74</td><td>75</td><td>76</td></tr>
<tr><td>AB RhD negative</td><td>28</td><td>24</td><td>25</td><td>26</td><td>27</td><td>29</td><td>30</td><td>31</td></tr>
<tr><td>AB RhD positive</td><td>84</td><td>80</td><td>81</td><td>82</td><td>83</td><td>85</td><td>86</td><td>87</td></tr>
<tr><td>O</td><td>55</td><td>P2</td><td>P3</td><td>P4</td><td>P5</td><td>P7</td><td>P8</td><td>P9</td></tr>
<tr><td>A</td><td>66</td><td>A2</td><td>A3</td><td>A4</td><td>A5</td><td>A7</td><td>A8</td><td>A9</td></tr>
<tr><td>B</td><td>77</td><td>B2</td><td>B3</td><td>B4</td><td>B5</td><td>B7</td><td>B8</td><td>B9</td></tr>
<tr><td>AB</td><td>88</td><td>C2</td><td>C3</td><td>C4</td><td>C5</td><td>C7</td><td>C8</td><td>C9</td></tr>
<tr><td>para-Bombay, RhD negative</td><td>D6</td><td>D2</td><td>D3</td><td>D4</td><td>D5</td><td>D7</td><td>D8</td><td>D9</td></tr>
</table>



<page_number>86</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification Version v6.2.2                                                                       87

Table 4 Data Structure 002: Blood Groups [ABO and RhD], Including Optional Type of Collection Information [RT005] (continued)

<table>
<tr><th>ABO and RhD Blood Groups</th><th>Default: Intended Use Not Specified</th><th>Directed (Dedicated/ Designated) Collection Use Only</th><th>For Emergency Use Only</th><th>Directed (Dedicated/ Designated) Collection/ Biohazardous</th><th>Directed (Dedicated/ Designated) Collection/ Eligible for Crossover</th><th>Autologous Collection/ Eligible for Crossover</th><th>For Autologous Use Only</th><th>For Autologous Use Only/ Biohazardous</th></tr>
<tr><td>para-Bombay. RhD positive</td><td>E6</td><td>E2</td><td>E3</td><td>E4</td><td>E5</td><td>E7</td><td>E8</td><td>E9</td></tr>
<tr><td>Bombay, RhD negative</td><td>G6</td><td>G2</td><td>G3</td><td>G4</td><td>G5</td><td>G7</td><td>G8</td><td>G9</td></tr>
<tr><td>Bombay, RhD positive</td><td>H6</td><td>H2</td><td>H3</td><td>H4</td><td>H5</td><td>H7</td><td>H8</td><td>H9</td></tr>
<tr><td>O para-Bombay, Rh D negative</td><td>I6</td><td>I2</td><td>I3</td><td>I4</td><td>I5</td><td>I7</td><td>I8</td><td>I9</td></tr>
<tr><td>O para-Bombay, RhD positive</td><td>J6</td><td>J2</td><td>J3</td><td>J4</td><td>J5</td><td>J7</td><td>J8</td><td>J9</td></tr>
<tr><td>A para-Bombay, RhD negative</td><td>K6</td><td>K2</td><td>K3</td><td>K4</td><td>K5</td><td>K7</td><td>K8</td><td>K9</td></tr>
<tr><td>B para-Bombay, RhD negative</td><td>L6</td><td>L2</td><td>L3</td><td>L4</td><td>L5</td><td>L7</td><td>L8</td><td>L9</td></tr>
<tr><td>AB para-Bombay, RhD negative</td><td>M6</td><td>M2</td><td>M3</td><td>M4</td><td>M5</td><td>M7</td><td>M8</td><td>M9</td></tr>
<tr><td>A para-Bombay, RhD positive</td><td>N6</td><td>N2</td><td>N3</td><td>N4</td><td>N5</td><td>N7</td><td>N8</td><td>N9</td></tr>
<tr><td>B para-Bombay, RhD positive</td><td>O6</td><td>O2</td><td>O3</td><td>O4</td><td>O5</td><td>O7</td><td>O8</td><td>O9</td></tr>
<tr><td>AB para-Bombay, RhD positive</td><td>Q6</td><td>Q2</td><td>Q3</td><td>Q4</td><td>Q5</td><td>Q7</td><td>Q8</td><td>Q9</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved                                                                                   www.isbt128.org

ISBT 128 Standard Technical Specification Version v6.2.2 88

Table 4 Data Structure 002: Blood Groups [ABO and RhD], Including Optional Type of Collection Information [RT005] (continued)

<table>
<tr><th>ABO and RhD Blood Groups</th><th>Default: Intended Use Not Specified</th><th>Directed (Dedicated/ Designated) Collection Use Only</th><th>For Emergency Use Only</th><th>Directed (Dedicated/ Designated) Collection/ Biohazardous</th><th>Directed (Dedicated/ Designated) Collection/ Eligible for Crossover</th><th>Autologous Collection/ Eligible for Crossover</th><th>For Autologous Use Only</th><th>For Autologous Use Only/ Biohazardous</th></tr>
<tr><td>Group A, Pooled RhD</td><td>A0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Group B, Pooled RhD</td><td>B0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Group AB, Pooled RhD [Pooled Products]</td><td>C0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Group O, Pooled RhD</td><td>D0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pooled ABO, RhD Positive</td><td>E0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pooled ABO, RhD Negative</td><td>F0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pooled ABO, Pooled RhD</td><td>G0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pooled ABO (RhD not specified)</td><td>H0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>A<sub>1</sub></td><td>I0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>A<sub>2</sub></td><td>J0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>A<sub>1</sub>B</td><td>K0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>A<sub>2</sub>B</td><td>L0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 89

Table 5 Data Structure 002: Special Messages [RT006]

<table>
<tr><th>gg</th><th>Interpretation</th></tr>
<tr><td>00</td><td>No ABO or Rh information is available</td></tr>
<tr><td>Ma</td><td>Autologous collection</td></tr>
<tr><td>Mb</td><td>Biohazardous</td></tr>
<tr><td>Md</td><td>Discard (to be destroyed)</td></tr>
<tr><td>Mf</td><td>For fractionation use only</td></tr>
<tr><td>Mq</td><td>Quarantine/hold for further testing or processing</td></tr>
<tr><td>Mr</td><td>For research use only</td></tr>
<tr><td>Mx</td><td>Not for transfusion based on test results</td></tr>
<tr><td>T1</td><td>ABO not specified, RhD positive*</td></tr>
<tr><td>T2</td><td>ABO not specified, RhD negative*</td></tr>
<tr><td>T3</td><td>ABO not specified, RhD not specified*</td></tr>
<tr><td>T4</td><td>Autologous collection/in quarantine*</td></tr>
<tr><td>T5</td><td>See outer packaging for product status*</td></tr>
<tr><td>T6</td><td>Must be sterilized before release*</td></tr>
</table>

*Values in Table 5 that begin with the letter T (T1-T6) shall be used only with tissue products.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 90

## Table 6 Data Structure 002: Rh, Kell, and Mia/Mur Phenotypes [RT007]

<table>
<tr><th colspan="3">Results with Anti-Kell:</th><th colspan="4">Phenotype:</th></tr>
<tr><th>No Information</th><th>Negative</th><th>Positive</th><th>C</th><th>c</th><th>E</th><th>e</th></tr>
<tr><td>0</td><td>S</td><td>T</td><td>No Information</td><td>No Information</td><td>No Information</td><td>No Information</td></tr>
<tr><td>1</td><td>A</td><td>J</td><td>negative</td><td>positive</td><td>negative</td><td>positive</td></tr>
<tr><td>2</td><td>B</td><td>K</td><td>positive</td><td>positive</td><td>negative</td><td>positive</td></tr>
<tr><td>3</td><td>C</td><td>L</td><td>positive</td><td>positive</td><td>positive</td><td>positive</td></tr>
<tr><td>4</td><td>D</td><td>M</td><td>positive</td><td>positive</td><td>positive</td><td>negative</td></tr>
<tr><td>5</td><td>E</td><td>N</td><td>negative</td><td>positive</td><td>positive</td><td>positive</td></tr>
<tr><td>6</td><td>F</td><td>O</td><td>negative</td><td>positive</td><td>positive</td><td>negative</td></tr>
<tr><td>7</td><td>G</td><td>P</td><td>positive</td><td>negative</td><td>negative</td><td>positive</td></tr>
<tr><td>8</td><td>H</td><td>Q</td><td>positive</td><td>negative</td><td>positive</td><td>positive</td></tr>
<tr><td>9</td><td>I</td><td>R</td><td>positive</td><td>negative</td><td>positive</td><td>negative</td></tr>
<tr><td>X</td><td>Y</td><td>Z</td><td>negative</td><td>No Information</td><td>negative</td><td>No Information</td></tr>
<tr><td>U</td><td></td><td></td><td>Mi<sup>a</sup>/Mur negative</td><td></td><td></td><td></td></tr>
<tr><td>V</td><td></td><td></td><td>Mi<sup>a</sup>/Mur positive</td><td></td><td></td><td></td></tr>
<tr><td>W</td><td></td><td></td><td>Special Testing bar code present and must be scanned and interpreted</td><td></td><td></td><td></td></tr>
</table>

Values of **r** {0–9, A–T, X–Z} are used to encode the results of testing for K, C, c, E, and e as shown in this table. (For example, if the value of **r** is **E**, then the red blood cells are K-negative, C-negative, c-positive, E-positive and e-positive). Values U and V encode Mi<sup>a</sup>/Mur antigen test results.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 91

Table 7 Data Structure 003: Type of Collection in 6<sup>th</sup> Position of Product Code [RT008]

<table>
<tr><th>Character</th><th>Type of Collection</th></tr>
<tr><td>0 (zero)</td><td>Not specified (null value)</td></tr>
<tr><td>V</td><td>Volunteer homologous (allogeneic) (default)</td></tr>
<tr><td>R</td><td>Volunteer research (Product not intended for human application)</td></tr>
<tr><td>S</td><td>Volunteer source</td></tr>
<tr><td>T</td><td>Volunteer therapeutic</td></tr>
<tr><td>P</td><td>Paid homologous (allogeneic)</td></tr>
<tr><td>r</td><td>Paid research (Product not intended for human application)</td></tr>
<tr><td>s</td><td>Paid source</td></tr>
<tr><td>A</td><td>Autologous, eligible for crossover</td></tr>
<tr><td>1 (one)</td><td>For autologous use only</td></tr>
<tr><td>X</td><td>For autologous use only, biohazard</td></tr>
<tr><td>D</td><td>Volunteer directed, eligible for crossover</td></tr>
<tr><td>d</td><td>Paid directed, eligible for crossover</td></tr>
<tr><td>2</td><td>For directed recipient use only</td></tr>
<tr><td>L</td><td>For directed recipient use only, limited exposure</td></tr>
<tr><td>E</td><td>Medical exception, for specified recipient only (allogeneic)</td></tr>
<tr><td>Q</td><td>See (i.e., read [scan]) Special Testing bar code</td></tr>
<tr><td>3</td><td>For directed recipient use only, biohazard</td></tr>
<tr><td>4</td><td>Designated</td></tr>
<tr><td>5</td><td>Dedicated</td></tr>
<tr><td>6</td><td>Designated, biohazard</td></tr>
<tr><td>F</td><td>Family reserved</td></tr>
<tr><td>C</td><td>Replacement</td></tr>
<tr><td>7</td><td>For allogeneic use.</td></tr>
<tr><td>8</td><td>For autologous use. Contains allogeneic material.</td></tr>
<tr><td>B</td><td>Directed/Dedicated/Designated Collection Use Only</td></tr>
<tr><td>H</td><td>Directed/Dedicated/Designated Collection/Biohazardous</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 92

<table>
<tr><th>Character</th><th>Type of Collection</th></tr>
<tr><td>J</td><td>Directed/Dedicated/Designated Collection/Eligible for Crossover</td></tr>
<tr><td>G</td><td>For Emergency Use Only</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 93

Table 8 Data Structure 011: Special Testing: Red Blood Cell Antigens **[RETIRED]**
Positions 1 through 9


<table>
    <thead>
    <tr>
        <th>Position</th>
        <th>1</th>
        <th colspan="2">2</th>
        <th colspan="2">3</th>
        <th colspan="2">4</th>
        <th colspan="2">5</th>
        <th colspan="2">6</th>
        <th colspan="2">7</th>
        <th colspan="2">8</th>
        <th colspan="2">9</th>
    </tr>
    </thead>
    <tr>
        <td>Antibody</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Antigen
Value</td>
        <td>Rh</td>
        <td>K</td>
        <td>k</td>
        <td>C<sup>w</sup></td>
        <td>VS/V</td>
        <td>A1</td>
        <td>M</td>
        <td>N</td>
        <td>S</td>
        <td>s</td>
        <td>U</td>
        <td>Mi<sup>a</sup>†</td>
        <td>P1</td>
        <td>Lu<sup>a</sup></td>
        <td>Kp<sup>a</sup></td>
        <td>Js<sup>a</sup></td>
        <td>Wr<sup>a</sup></td>
    </tr>
    <tr>
        <td>0</td>
        <td>C+c-E+e-</td>
        <td>nt</td>
        <td>Nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>1</td>
        <td>C+c+E+e-</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>2</td>
        <td>C-c+E+e-</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>3</td>
        <td>C+c-E+e+</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>4</td>
        <td>C+c+E+e+</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>5</td>
        <td>C-c+E+e+</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>6</td>
        <td>C+c-E-e+</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>7</td>
        <td>C+c+E-e+</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>8</td>
        <td>C-c+E-e+</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>9</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
    </tr>
</table>


Key: † most commonly associated with GP.Mur (Mi.III); nt — not tested; neg — negative; pos — positive; ni — no information (position not used)

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                                                                                                   94

Table 8 (continued) Data Structure 011: Special Testing: Red Blood Cell Antigens **[RETIRED]**
Positions 10 through 16

<table>
<tr><th></th><th rowspan="2">Position</th><th colspan="2">10</th><th colspan="2">11</th><th colspan="2">12</th><th colspan="2">13</th><th colspan="2">14</th><th colspan="2">15</th><th>16</th></tr>
<tr><th colspan="2">Antibody</th><th colspan="2"></th><th colspan="2"></th><th colspan="2"></th><th colspan="2"></th><th colspan="2"></th><th>CMV</th><th></th><th></th></tr>
<tr><th>Antigen Value</th><th>Le<sup>a</sup></th><th>Le<sup>b</sup></th><th>Fy<sup>a</sup></th><th>Fy<sup>b</sup></th><th>Jk<sup>a</sup></th><th>Jk<sup>b</sup></th><th>Di<sup>a</sup></th><th>Di<sup>b</sup></th><th>Do<sup>a</sup></th><th>Do<sup>b</sup></th><th>Co<sup>a</sup></th><th>Co<sup>b</sup></th><th>In<sup>a</sup></th><th></th></tr>
<tr><td>0</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td></tr>
<tr><td>1</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td></tr>
<tr><td>2</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td></tr>
<tr><td>3</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td></tr>
<tr><td>4</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td></tr>
<tr><td>5</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td></tr>
<tr><td>6</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td></tr>
<tr><td>7</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td></tr>
<tr><td>8</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td></tr>
<tr><td>9</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td></tr>
</table>

Key: nt — not tested; neg — negative; pos — positive; ni — no information (position not used)

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 95

Table 9 Data Structure 012: Special Testing: Red Blood Cell Antigens — General [RT009]
Positions 1 through 9


<table>
    <thead>
    <tr>
        <th>Position</th>
        <th>1</th>
        <th colspan="2">2</th>
        <th colspan="2">3</th>
        <th colspan="2">4</th>
        <th colspan="2">5</th>
        <th colspan="2">6</th>
        <th colspan="2">7</th>
        <th colspan="2">8</th>
        <th colspan="2">9</th>
    </tr>
    </thead>
    <tr>
        <td>Antibody</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Antigen
Value</td>
        <td>Rh*</td>
        <td>K</td>
        <td>k</td>
        <td>C<sup>w</sup></td>
        <td>Mi<sup>a</sup>†</td>
        <td>M</td>
        <td>N</td>
        <td>S</td>
        <td>s</td>
        <td>U</td>
        <td>P1</td>
        <td>Lu<sup>a</sup></td>
        <td>Kp<sup>a</sup></td>
        <td>Le<sup>a</sup></td>
        <td>Le<sup>b</sup></td>
        <td>Fy<sup>a</sup></td>
        <td>Fy<sup>b</sup></td>
    </tr>
    <tr>
        <td>0</td>
        <td>C+c-E+e-</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>1</td>
        <td>C+c+E+e-</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>2</td>
        <td>C-c+E+e-</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>3</td>
        <td>C+c-E+e+</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>4</td>
        <td>C+c+E+e+</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>5</td>
        <td>C-c+E+e+</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>6</td>
        <td>C+c-E-e+</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>7</td>
        <td>C+c+E-e+</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>8</td>
        <td>C-c+E-e+</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>9</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
    </tr>
</table>


Key: † most commonly associated with GP.Mur (Mi.III); nt — not tested; neg — negative; pos — positive; ni — no information (position not used)

*Common Rh antigens may be encoded together as a phenotype (Rh column 1) or as individual Rh antigens (C,c,E,e, columns 14-16). If Rh antigens are encoded individually using positions 14, 15, and/or 16, then the value of column one shall be set to 9 (no information). Conversely, if the phenotype is present in column 1, then the values of the C,c,E,e antigens shall all be set to ni or nt.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 96

Table 9 (continued) Data Structure 012: Special Testing: Red Blood Cell Antigens — General [RT009]
Positions 10 through 16

<table>
<tr><th>Position</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
<tr><th>Antibody</th><th></th><th></th><th></th><th></th><th></th><th></th><th>CMV</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
<tr><th>Antigen Value</th><th>Jkᵃ</th><th>Jkᵇ</th><th>Doᵃ</th><th>Doᵇ</th><th>Inᵃ</th><th>Coᵇ</th><th>Diᵃ</th><th>VS/V</th><th>Jsᵃ</th><th>C*</th><th>c*</th><th>E*</th><th>e*</th><th></th></tr>
<tr><td>0</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td></tr>
<tr><td>1</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td></tr>
<tr><td>2</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td></tr>
<tr><td>3</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td></tr>
<tr><td>4</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td></tr>
<tr><td>5</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td></tr>
<tr><td>6</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td></tr>
<tr><td>7</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td></tr>
<tr><td>8</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td></tr>
<tr><td>9</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td></tr>
</table>

Key: res — reserved; nt — not tested; neg — negative; pos — positive; ni — no information (position not used)

*Common Rh antigens may be encoded together as a phenotype (Rh column 1) or as individual Rh antigens (C,c,E,e, columns 14-16). If Rh antigens are encoded individually using positions 14, 15, and/or 16, then the value of column one shall be set to 9 (no information). Conversely, if the phenotype is present in column 1, then the values of the C,c,E,e antigens shall all be set to ni or nt.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 97

## Table 10 Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish [RT010]
### Positions 1 through 9


<table>
    <thead>
    <tr>
        <th>Position</th>
        <th>1</th>
        <th colspan="2">2</th>
        <th colspan="2">3</th>
        <th colspan="2">4</th>
        <th colspan="2">5</th>
        <th colspan="2">6</th>
        <th colspan="2">7</th>
        <th colspan="2">8</th>
        <th colspan="2">9</th>
    </tr>
    </thead>
    <tr>
        <td>Antibody</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Antigen
Value</td>
        <td>Rh</td>
        <td>K</td>
        <td>k</td>
        <td>C<sup>w</sup></td>
        <td>Mi<sup>a</sup>†</td>
        <td>M</td>
        <td>N</td>
        <td>S</td>
        <td>s</td>
        <td>U</td>
        <td>P1</td>
        <td>Lu<sup>a</sup></td>
        <td>Kp<sup>a</sup></td>
        <td>Le<sup>a</sup></td>
        <td>Le<sup>b</sup></td>
        <td>Fy<sup>a</sup></td>
        <td>Fy<sup>b</sup></td>
    </tr>
    <tr>
        <td>0</td>
        <td>C+c-E+e-</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>1</td>
        <td>C+c+E+e-</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>2</td>
        <td>C-c+E+e-</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>3</td>
        <td>C+c-E+e+</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>4</td>
        <td>C+c+E+e+</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>5</td>
        <td>C-c+E+e+</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>6</td>
        <td>C+c-E-e+</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>7</td>
        <td>C+c+E-e+</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>8</td>
        <td>C-c+E-e+</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>9</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
    </tr>
</table>


Key: † most commonly associated with GP.Mur (Mi.III); nt — not tested; neg — negative; pos — positive; ni — no information (position not used)

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 98

Table 10 (continued) Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish [RT010]
Positions 10 through 16

<table>
<tr><th colspan="2">Position</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
<tr><th colspan="2">Antibody</th><th></th><th></th><th></th><th></th><th></th><th></th><th>CMV</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
<tr><th>Value</th><th>Antigen</th><th>Jk<sup>a</sup></th><th>Jk<sup>b</sup></th><th>Do<sup>a</sup></th><th>Do<sup>b</sup></th><th>C<sup>x</sup></th><th>Co<sup>b</sup></th><th>WES<sup>a</sup></th><th>LW<sup>b</sup></th><th>Ul<sup>a</sup></th><th>Ls<sup>a</sup></th><th>An<sup>a</sup></th><th>res</th><th>res</th><th></th></tr>
<tr><td>0</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td>nt</td><td></td></tr>
<tr><td>1</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td></td></tr>
<tr><td>2</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td></td></tr>
<tr><td>3</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td>neg</td><td>nt</td><td></td></tr>
<tr><td>4</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td>neg</td><td></td></tr>
<tr><td>5</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td></td></tr>
<tr><td>6</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td>pos</td><td>nt</td><td></td></tr>
<tr><td>7</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td>pos</td><td>neg</td><td></td></tr>
<tr><td>8</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td>pos</td><td></td></tr>
<tr><td>9</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td>ni</td><td></td></tr>
</table>

Key: res — reserved; nt — not tested; neg — negative; pos — positive; ni — no information (position not used)



<page_number>98</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 99

Table 11 Data Structure 011: Special Testing: Red Blood Cell Antigens, Positions 17 and 18: Erythrocyte Antigen Specified Has Been Tested and Found Negative **[RETIRED]**

<table>
<tr><th>Value</th><th>Antigen</th><th>Value</th><th>Antigen</th><th>Value</th><th>Antigen</th><th>Value</th><th>Antigen</th></tr>
<tr><td>00</td><td>see Note</td><td>25</td><td>Kp<sup>b</sup></td><td>50</td><td>Au<sup>a</sup></td><td>75</td><td>An<sup>a</sup></td></tr>
<tr><td>01</td><td>En<sup>a</sup></td><td>26</td><td>Kp<sup>c</sup></td><td>51</td><td>Au<sup>b</sup></td><td>76</td><td>Dh<sup>a</sup></td></tr>
<tr><td>02</td><td>‘N’</td><td>27</td><td>Js<sup>b</sup></td><td>52</td><td>Fy4</td><td>77</td><td>Cr<sup>a</sup></td></tr>
<tr><td>03</td><td>V<sup>w</sup></td><td>28</td><td>Ul<sup>a</sup></td><td>53</td><td>Fy5</td><td>78</td><td>IFC</td></tr>
<tr><td>04</td><td>Mur</td><td>29</td><td>K11</td><td>54</td><td>Fy6</td><td>79</td><td>Kn<sup>a</sup></td></tr>
<tr><td>05</td><td>Hut</td><td>30</td><td>K12</td><td>55</td><td>removed</td><td>80</td><td>In<sup>b</sup></td></tr>
<tr><td>06</td><td>Hil</td><td>31</td><td>K13</td><td>56</td><td>Sd<sup>a</sup></td><td>81</td><td>Cs<sup>a</sup></td></tr>
<tr><td>09</td><td>hr<sup>S</sup></td><td>34</td><td>K18</td><td>59</td><td>Xg<sup>a</sup></td><td>84</td><td>Vel</td></tr>
<tr><td>10</td><td>hr<sup>B</sup></td><td>35</td><td>K19</td><td>60</td><td>Sc1</td><td>85</td><td>Lan</td></tr>
<tr><td>11</td><td>f</td><td>36</td><td>K22</td><td>61</td><td>Sc2</td><td>86</td><td>At<sup>a</sup></td></tr>
<tr><td>12</td><td>Ce</td><td>37</td><td>K23</td><td>62</td><td>Sc3</td><td>87</td><td>Jr<sup>a</sup></td></tr>
<tr><td>13</td><td>G</td><td>38</td><td>K24</td><td>63</td><td>Jo<sup>a</sup></td><td>88</td><td>Ok<sup>a</sup></td></tr>
<tr><td>14</td><td>Hr<sub>0</sub></td><td>39</td><td>Lu<sup>b</sup></td><td>64</td><td>Do<sup>b</sup></td><td>89</td><td>reserved for future use</td></tr>
<tr><td>15</td><td>CE</td><td>40</td><td>Lu3</td><td>65</td><td>Hy</td><td>90</td><td>reserved for future use</td></tr>
<tr><td>16</td><td>cE</td><td>41</td><td>Lu4</td><td>66</td><td>Gy<sup>a</sup></td><td>91</td><td>reserved for future use</td></tr>
<tr><td>17</td><td>C<sup>x</sup></td><td>42</td><td>Lu5</td><td>67</td><td>Co3</td><td>92</td><td>reserved for future use</td></tr>
<tr><td>18</td><td>E<sup>w</sup></td><td>43</td><td>Lu6</td><td>68</td><td>LW<sup>a</sup></td><td>93</td><td>reserved for future use</td></tr>
<tr><td>19</td><td>D<sup>w</sup></td><td>44</td><td>Lu7</td><td>69</td><td>LW<sup>b</sup></td><td>94</td><td>reserved for future use</td></tr>
<tr><td>20</td><td>hr<sup>H</sup></td><td>45</td><td>Lu8</td><td>70</td><td>Kx</td><td>95</td><td>reserved for future use</td></tr>
<tr><td>21</td><td>Go<sup>a</sup></td><td>46</td><td>Lu11</td><td>71</td><td>Ge2</td><td>96</td><td>reserved for future use</td></tr>
<tr><td>22</td><td>Rh32</td><td>47</td><td>Lu12</td><td>72</td><td>Ge3</td><td>97</td><td>reserved for future use</td></tr>
<tr><td>23</td><td>Rh33</td><td>48</td><td>Lu13</td><td>73</td><td>Wb</td><td>98</td><td>IgA deficient</td></tr>
<tr><td>24</td><td>Tar</td><td>49</td><td>Lu20</td><td>74</td><td>Ls<sup>a</sup></td><td>99</td><td>default</td></tr>
</table>

*Note: When this data structure was retired, Table E3, to which value 00 referred, was also retired.*

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 100

Table 12 Data Structure 012: Special Testing: Red Blood Cell Antigens — General, Positions 17 and 18: Erythrocyte Antigen Specified Has Been Tested for and Found Negative [RT011]


<table>
    <thead>
    <tr>
        <th>Value</th>
        <th>Antigen</th>
        <th>Value</th>
        <th>Antigen</th>
        <th>Value</th>
        <th>Antigen</th>
        <th>Value</th>
        <th>Antigen</th>
    </tr>
    </thead>
    <tr>
        <td>00</td>
        <td>information 
elsewhere</td>
        <td>25</td>
        <td>Kp<sup>b</sup></td>
        <td>50</td>
        <td>Au<sup>a</sup></td>
        <td>75</td>
        <td>An<sup>a</sup></td>
    </tr>
    <tr>
        <td>01</td>
        <td>En<sup>a</sup></td>
        <td>26</td>
        <td>Kp<sup>c</sup></td>
        <td>51</td>
        <td>Au<sup>b</sup></td>
        <td>76</td>
        <td>Dh<sup>a</sup></td>
    </tr>
    <tr>
        <td>02</td>
        <td>‘N’</td>
        <td>27</td>
        <td>Js<sup>b</sup></td>
        <td>52</td>
        <td>Fy4</td>
        <td>77</td>
        <td>Cr<sup>a</sup></td>
    </tr>
    <tr>
        <td>03</td>
        <td>V<sup>w</sup></td>
        <td>28</td>
        <td>Ul<sup>a</sup></td>
        <td>53</td>
        <td>Fy5</td>
        <td>78</td>
        <td>IFC</td>
    </tr>
    <tr>
        <td>04</td>
        <td>Mur*</td>
        <td>29</td>
        <td>K11</td>
        <td>54</td>
        <td>Fy6</td>
        <td>79</td>
        <td>Kn<sup>a</sup></td>
    </tr>
    <tr>
        <td>05</td>
        <td>Hut</td>
        <td>30</td>
        <td>K12</td>
        <td>55</td>
        <td>Di<sup>b</sup></td>
        <td>80</td>
        <td>In<sup>b</sup></td>
    </tr>
    <tr>
        <td>06</td>
        <td>Hil</td>
        <td>31</td>
        <td>K13</td>
        <td>56</td>
        <td>Sd<sup>a</sup></td>
        <td>81</td>
        <td>Cs<sup>a</sup></td>
    </tr>
    <tr>
        <td>07</td>
        <td>P</td>
        <td>32</td>
        <td>K14</td>
        <td>57</td>
        <td>Wr<sup>b</sup></td>
        <td>82</td>
        <td>I</td>
    </tr>
    <tr>
        <td>08</td>
        <td>PP<sub>1</sub>P<sup>k</sup></td>
        <td>33</td>
        <td>K17</td>
        <td>58</td>
        <td>Yt<sup>b</sup></td>
        <td>83</td>
        <td>Er<sup>a</sup></td>
    </tr>
    <tr>
        <td>09</td>
        <td>hr<sup>S</sup></td>
        <td>34</td>
        <td>K18</td>
        <td>59</td>
        <td>Xg<sup>a</sup></td>
        <td>84</td>
        <td>Vel</td>
    </tr>
    <tr>
        <td>10</td>
        <td>hr<sup>B</sup></td>
        <td>35</td>
        <td>K19</td>
        <td>60</td>
        <td>Sc1</td>
        <td>85</td>
        <td>Lan</td>
    </tr>
    <tr>
        <td>11</td>
        <td>f</td>
        <td>36</td>
        <td>K22</td>
        <td>61</td>
        <td>Sc2</td>
        <td>86</td>
        <td>At<sup>a</sup></td>
    </tr>
    <tr>
        <td>12</td>
        <td>Ce</td>
        <td>37</td>
        <td>K23</td>
        <td>62</td>
        <td>Sc3</td>
        <td>87</td>
        <td>Jr<sup>a</sup></td>
    </tr>
    <tr>
        <td>13</td>
        <td>G</td>
        <td>38</td>
        <td>K24</td>
        <td>63</td>
        <td>Jo<sup>a</sup></td>
        <td>88</td>
        <td>Ok<sup>a</sup></td>
    </tr>
    <tr>
        <td>14</td>
        <td>Hr<sub>0</sub></td>
        <td>39</td>
        <td>Lu<sup>b</sup></td>
        <td>64</td>
        <td>removed</td>
        <td>89</td>
        <td>Wr<sup>a</sup></td>
    </tr>
    <tr>
        <td>15</td>
        <td>CE</td>
        <td>40</td>
        <td>Lu3</td>
        <td>65</td>
        <td>Hy</td>
        <td>90</td>
        <td>Ge4</td>
    </tr>
    <tr>
        <td>16</td>
        <td>cE</td>
        <td>41</td>
        <td>Lu4</td>
        <td>66</td>
        <td>Gy<sup>a</sup></td>
        <td>91</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>17</td>
        <td>C<sup>x</sup></td>
        <td>42</td>
        <td>Lu5</td>
        <td>67</td>
        <td>Co3</td>
        <td>92</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>18</td>
        <td>E<sup>w</sup></td>
        <td>43</td>
        <td>Lu6</td>
        <td>68</td>
        <td>LW<sup>a</sup></td>
        <td>93</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>19</td>
        <td>D<sup>w</sup></td>
        <td>44</td>
        <td>Lu7</td>
        <td>69</td>
        <td>LW<sup>b</sup></td>
        <td>94</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>20</td>
        <td>hr<sup>H</sup></td>
        <td>45</td>
        <td>Lu8</td>
        <td>70</td>
        <td>Kx</td>
        <td>95</td>
        <td>Nationally specified</td>
    </tr>
    <tr>
        <td>21</td>
        <td>Go<sup>a</sup></td>
        <td>46</td>
        <td>Lu11</td>
        <td>71</td>
        <td>Ge2</td>
        <td>96</td>
        <td>Hemoglobin S negative</td>
    </tr>
    <tr>
        <td>22</td>
        <td>Rh32</td>
        <td>47</td>
        <td>Lu12</td>
        <td>72</td>
        <td>Ge3</td>
        <td>97</td>
        <td>parvovirus B19 antibody 
present</td>
    </tr>
    <tr>
        <td>23</td>
        <td>Rh33</td>
        <td>48</td>
        <td>Lu13</td>
        <td>73</td>
        <td>Wb</td>
        <td>98</td>
        <td>IgA deficient</td>
    </tr>
    <tr>
        <td>24</td>
        <td>Tar</td>
        <td>49</td>
        <td>Lu20</td>
        <td>74</td>
        <td>Ls<sup>a</sup></td>
        <td>99</td>
        <td>no information provided</td>
    </tr>
</table>


<hr>
© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* <page_number>101</page_number>

Table 13 Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish, Positions 17 and 18: Erythrocyte Antigen Specified Has Been Tested for and Found Negative [RT012]


<table>
    <thead>
    <tr>
        <th>Value</th>
        <th>Antigen</th>
        <th>Value</th>
        <th>Antigen</th>
        <th>Value</th>
        <th>Antigen</th>
        <th>Value</th>
        <th>Antigen</th>
    </tr>
    </thead>
    <tr>
        <td>00</td>
        <td>information 
elsewhere</td>
        <td>25</td>
        <td>Kp<sup>b</sup></td>
        <td>50</td>
        <td>Au<sup>a</sup></td>
        <td>75</td>
        <td>An<sup>a</sup></td>
    </tr>
    <tr>
        <td>01</td>
        <td>En<sup>a</sup></td>
        <td>26</td>
        <td>Kp<sup>c</sup></td>
        <td>51</td>
        <td>Au<sup>b</sup></td>
        <td>76</td>
        <td>Dh<sup>a</sup></td>
    </tr>
    <tr>
        <td>02</td>
        <td>‘N’</td>
        <td>27</td>
        <td>Js<sup>b</sup></td>
        <td>52</td>
        <td>Fy4</td>
        <td>77</td>
        <td>Cr<sup>a</sup></td>
    </tr>
    <tr>
        <td>03</td>
        <td>V<sup>w</sup></td>
        <td>28</td>
        <td>Ul<sup>a</sup></td>
        <td>53</td>
        <td>Fy5</td>
        <td>78</td>
        <td>IFC</td>
    </tr>
    <tr>
        <td>04</td>
        <td>Mur*</td>
        <td>29</td>
        <td>K11</td>
        <td>54</td>
        <td>Fy6</td>
        <td>79</td>
        <td>Kn<sup>a</sup></td>
    </tr>
    <tr>
        <td>05</td>
        <td>Hut</td>
        <td>30</td>
        <td>K12</td>
        <td>55</td>
        <td>removed</td>
        <td>80</td>
        <td>In<sup>b</sup></td>
    </tr>
    <tr>
        <td>06</td>
        <td>Hil</td>
        <td>31</td>
        <td>K13</td>
        <td>56</td>
        <td>Sd<sup>a</sup></td>
        <td>81</td>
        <td>Cs<sup>a</sup></td>
    </tr>
    <tr>
        <td>07</td>
        <td>P</td>
        <td>32</td>
        <td>K14</td>
        <td>57</td>
        <td>Wr<sup>b</sup></td>
        <td>82</td>
        <td>I</td>
    </tr>
    <tr>
        <td>08</td>
        <td>PP<sub>1</sub>P<sup>k</sup></td>
        <td>33</td>
        <td>K17</td>
        <td>58</td>
        <td>Yt<sup>b</sup></td>
        <td>83</td>
        <td>Er<sup>a</sup></td>
    </tr>
    <tr>
        <td>09</td>
        <td>hr<sup>S</sup></td>
        <td>34</td>
        <td>K18</td>
        <td>59</td>
        <td>Xg<sup>a</sup></td>
        <td>84</td>
        <td>Vel</td>
    </tr>
    <tr>
        <td>10</td>
        <td>hr<sup>B</sup></td>
        <td>35</td>
        <td>K19</td>
        <td>60</td>
        <td>Sc1</td>
        <td>85</td>
        <td>Lan</td>
    </tr>
    <tr>
        <td>11</td>
        <td>f</td>
        <td>36</td>
        <td>K22</td>
        <td>61</td>
        <td>Sc2</td>
        <td>86</td>
        <td>At<sup>a</sup></td>
    </tr>
    <tr>
        <td>12</td>
        <td>Ce</td>
        <td>37</td>
        <td>K23</td>
        <td>62</td>
        <td>Sc3</td>
        <td>87</td>
        <td>Jr<sup>a</sup></td>
    </tr>
    <tr>
        <td>13</td>
        <td>G</td>
        <td>38</td>
        <td>K24</td>
        <td>63</td>
        <td>Jo<sup>a</sup></td>
        <td>88</td>
        <td>Ok<sup>a</sup></td>
    </tr>
    <tr>
        <td>14</td>
        <td>Hr<sub>0</sub></td>
        <td>39</td>
        <td>Lu<sup>b</sup></td>
        <td>64</td>
        <td>Do<sup>b</sup></td>
        <td>89</td>
        <td>Wr<sup>a</sup></td>
    </tr>
    <tr>
        <td>15</td>
        <td>CE</td>
        <td>40</td>
        <td>Lu3</td>
        <td>65</td>
        <td>Hy</td>
        <td>90</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>16</td>
        <td>cE</td>
        <td>41</td>
        <td>Lu4</td>
        <td>66</td>
        <td>Gy<sup>a</sup></td>
        <td>91</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>17</td>
        <td>C<sup>x</sup></td>
        <td>42</td>
        <td>Lu5</td>
        <td>67</td>
        <td>Co3</td>
        <td>92</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>18</td>
        <td>E<sup>w</sup></td>
        <td>43</td>
        <td>Lu6</td>
        <td>68</td>
        <td>LW<sup>a</sup></td>
        <td>93</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>19</td>
        <td>D<sup>w</sup></td>
        <td>44</td>
        <td>Lu7</td>
        <td>69</td>
        <td>LW<sup>b</sup></td>
        <td>94</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>20</td>
        <td>hr<sup>H</sup></td>
        <td>45</td>
        <td>Lu8</td>
        <td>70</td>
        <td>Kx</td>
        <td>95</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>21</td>
        <td>Go<sup>a</sup></td>
        <td>46</td>
        <td>Lu11</td>
        <td>71</td>
        <td>Ge2</td>
        <td>96</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>22</td>
        <td>Rh32</td>
        <td>47</td>
        <td>Lu12</td>
        <td>72</td>
        <td>Ge3</td>
        <td>97</td>
        <td>reserved for future use</td>
    </tr>
    <tr>
        <td>23</td>
        <td>Rh33</td>
        <td>48</td>
        <td>Lu13</td>
        <td>73</td>
        <td>Wb</td>
        <td>98</td>
        <td>IgA deficient</td>
    </tr>
    <tr>
        <td>24</td>
        <td>Tar</td>
        <td>49</td>
        <td>Lu20</td>
        <td>74</td>
        <td>Ls<sup>a</sup></td>
        <td>99</td>
        <td>no information provided</td>
    </tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2  102

Table 14  Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens,
Positions 1 through 8 [RT013]

<table>
<tr><th>HLA-A</th><th>Value of AA</th><th>HLA-B</th><th>Value of BB</th></tr>
<tr><td>nt</td><td>00</td><td>nt</td><td>00</td></tr>
<tr><td>A1</td><td>01</td><td>B5</td><td>05</td></tr>
<tr><td>A2<br>A203<br>A210</td><td>02</td><td>B7<br>B703</td><td>07</td></tr>
<tr><td>A3</td><td>03</td><td>B8</td><td>08</td></tr>
<tr><td>A9</td><td>09</td><td>B12</td><td>12</td></tr>
<tr><td>A10</td><td>10</td><td>B13</td><td>13</td></tr>
<tr><td>A11</td><td>11</td><td>B14</td><td>14</td></tr>
<tr><td>A19</td><td>19</td><td>B15</td><td>15</td></tr>
<tr><td>A23</td><td>23</td><td>B16</td><td>16</td></tr>
<tr><td>A24<br>A2403</td><td>24</td><td>B17</td><td>17</td></tr>
<tr><td>A25</td><td>25</td><td>B18</td><td>18</td></tr>
<tr><td>A26</td><td>26</td><td>B21</td><td>21</td></tr>
<tr><td>A28</td><td>28</td><td>B22</td><td>22</td></tr>
<tr><td>A29</td><td>29</td><td>B27<br>B2708</td><td>27</td></tr>
<tr><td>A30</td><td>30</td><td>B35</td><td>35</td></tr>
<tr><td>A31</td><td>31</td><td>B37</td><td>37</td></tr>
<tr><td>A32</td><td>32</td><td>B38</td><td>38</td></tr>
<tr><td>A33</td><td>33</td><td>B39</td><td>39</td></tr>
<tr><td>A34</td><td>34</td><td>B40<br>B4005</td><td>40</td></tr>
<tr><td>A36</td><td>36</td><td>B41</td><td>41</td></tr>
<tr><td>A43</td><td>43</td><td>B42</td><td>42</td></tr>
<tr><td>A66</td><td>66</td><td>B44</td><td>44</td></tr>
<tr><td>A68</td><td>68</td><td>B45</td><td>45</td></tr>
<tr><td>A69</td><td>69</td><td>B46</td><td>46</td></tr>
<tr><td>A74</td><td>74</td><td>B47</td><td>47</td></tr>
<tr><td>A80</td><td>80</td><td>B48</td><td>48</td></tr>
<tr><td>ni</td><td>99</td><td>B49</td><td>49</td></tr>
<tr><td></td><td></td><td>B50</td><td>50</td></tr>
<tr><td></td><td></td><td>B51<br>B5102<br>B5103</td><td>51</td></tr>
<tr><td></td><td></td><td>B52</td><td>52</td></tr>
<tr><td></td><td></td><td>B53</td><td>53</td></tr>
<tr><td></td><td></td><td>B54</td><td>54</td></tr>
<tr><td></td><td></td><td>B55</td><td>55</td></tr>
<tr><td></td><td></td><td>B56</td><td>56</td></tr>
<tr><td></td><td></td><td>B57</td><td>57</td></tr>
<tr><td></td><td></td><td>B58</td><td>58</td></tr>
<tr><td></td><td></td><td>B59</td><td>59</td></tr>
<tr><td></td><td></td><td>B60</td><td>60</td></tr>
<tr><td></td><td></td><td>B61</td><td>61</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved  www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 103

Table 14 Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens,
Positions 1 through 8 [RT013] (continued)

<table>
<tr><th>HLA-A</th><th>Value of AA</th><th>HLA-B</th><th>Value of BB</th></tr>
<tr><td></td><td></td><td>B62</td><td>62</td></tr>
<tr><td></td><td></td><td>B63</td><td>63</td></tr>
<tr><td></td><td></td><td>B64</td><td>64</td></tr>
<tr><td></td><td></td><td>B65</td><td>65</td></tr>
<tr><td></td><td></td><td>B67</td><td>67</td></tr>
<tr><td></td><td></td><td>B70</td><td>70</td></tr>
<tr><td></td><td></td><td>B71</td><td>71</td></tr>
<tr><td></td><td></td><td>B72</td><td>72</td></tr>
<tr><td></td><td></td><td>B73</td><td>73</td></tr>
<tr><td></td><td></td><td>B75</td><td>75</td></tr>
<tr><td></td><td></td><td>B76</td><td>76</td></tr>
<tr><td></td><td></td><td>B77</td><td>77</td></tr>
<tr><td></td><td></td><td>B78</td><td>78</td></tr>
<tr><td></td><td></td><td>B81</td><td>81</td></tr>
<tr><td></td><td></td><td>B82</td><td>82</td></tr>
<tr><td></td><td></td><td>B83</td><td>83</td></tr>
<tr><td></td><td></td><td>ni</td><td>99</td></tr>
</table>

nt — not tested; ni — no information

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 104

Table 15 Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens, Positions 9 through 16 [RT014]


<table>
    <thead>
    <tr>
        <th>Position</th>
        <th colspan="2">9</th>
        <th colspan="2">10</th>
        <th colspan="2">11</th>
        <th colspan="2">12</th>
        <th colspan="2">13</th>
        <th colspan="2">14</th>
        <th colspan="2">15</th>
        <th colspan="2">16</th>
    </tr>
    </thead>
    <tr>
        <td>Antibody</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>CMV</td>
    </tr>
    <tr>
        <td>Antigen
Value</td>
        <td>HPA-
1a</td>
        <td>HPA-
1b</td>
        <td>HPA-
2a</td>
        <td>HPA-
2b</td>
        <td>HPA-
3a</td>
        <td>HPA-
3b</td>
        <td>HPA-
4a</td>
        <td>HPA-
4b</td>
        <td>HPA-
5a</td>
        <td>HPA-
5b</td>
        <td>HPA-
15a</td>
        <td>HPA-
6bw</td>
        <td>HPA-
15b</td>
        <td>HPA-
7bw</td>
        <td>IgA</td>
        <td></td>
    </tr>
    <tr>
        <td>0</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>1</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>2</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>3</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
        <td>neg</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>4</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>5</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>Neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>6</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
        <td>pos</td>
        <td>nt</td>
    </tr>
    <tr>
        <td>7</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>8</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>9</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
    </tr>
</table>


nt — not tested; neg — negative; pos — positive; ni — no information (position not used)


<page_number>104</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 105

Table 16 Data Structure 014: Special Testing: Platelet HLA and Platelet Specific Antigens,
Position 18 [RT044]

<table>
<tr><th>Value</th><th>Titer status for antibody to A and/or B antigens</th></tr>
<tr><td>0</td><td>Not tested</td></tr>
<tr><td>1</td><td>High titered anti-A and -B not detected</td></tr>
<tr><td>2</td><td>Reserved for future use</td></tr>
<tr><td>3</td><td>Reserved for future use</td></tr>
<tr><td>4</td><td>Reserved for future use</td></tr>
<tr><td>5</td><td>Reserved for future use</td></tr>
<tr><td>6</td><td>Reserved for future use</td></tr>
<tr><td>7</td><td>Reserved for future use</td></tr>
<tr><td>8</td><td>Reserved for future use</td></tr>
<tr><td>9</td><td>No information</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 106

Table 17 Data Structure 015: Special Testing: HLA-A and –B Alleles, Position 17 (CMV Antibody Status) [RT015] [**RETIRED**]

<table>
<tr><th>Value</th><th>CMV Antibody Status</th></tr>
<tr><td>0</td><td>nt</td></tr>
<tr><td>1</td><td>neg</td></tr>
<tr><td>2</td><td>pos</td></tr>
</table>



<page_number>106</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 107

Table 18 Data Structure 027: Transfusion Transmitted Infection Marker [RT019]
Positions 1 through 9


<table>
    <thead>
    <tr>
        <th>Position</th>
        <th colspan="2">1</th>
        <th colspan="2">2</th>
        <th colspan="2">3</th>
        <th colspan="2">4</th>
        <th colspan="2">5</th>
        <th colspan="2">6</th>
        <th colspan="2">7</th>
        <th colspan="2">8</th>
        <th colspan="2">9</th>
    </tr>
    </thead>
    <tr>
        <td>Antibody</td>
        <td>HIV-
1/2</td>
        <td></td>
        <td></td>
        <td>HCV</td>
        <td></td>
        <td></td>
        <td>HBc</td>
        <td></td>
        <td></td>
        <td>HTLV-
I/II</td>
        <td>Syph-
ilis</td>
        <td>CMV</td>
        <td></td>
        <td></td>
        <td></td>
        <td>Parvo 
B19</td>
        <td></td>
        <td>Chagas</td>
    </tr>
    <tr>
        <td>Antigen</td>
        <td></td>
        <td>HIV-
p24</td>
        <td></td>
        <td></td>
        <td>HCV</td>
        <td></td>
        <td></td>
        <td>HBs</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Genome
Value</td>
        <td></td>
        <td></td>
        <td>HIV</td>
        <td></td>
        <td></td>
        <td>HCV</td>
        <td></td>
        <td></td>
        <td>HBV</td>
        <td></td>
        <td></td>
        <td></td>
        <td>CMV</td>
        <td>EBV</td>
        <td>WNV</td>
        <td></td>
        <td>Parvo 
B19</td>
        <td></td>
    </tr>
    <tr>
        <td>0</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
    </tr>
    <tr>
        <td>1</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>2</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>3</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
        <td>neg</td>
        <td>ni</td>
    </tr>
    <tr>
        <td>4</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>5</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
    </tr>
    <tr>
        <td>6</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
        <td>pos</td>
        <td>ni</td>
    </tr>
    <tr>
        <td>7</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
        <td>pos</td>
        <td>neg</td>
    </tr>
    <tr>
        <td>8</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
        <td>pos</td>
    </tr>
</table>


neg — negative; pos — positive; ni — No information encoded. Additional information may be present in accompanying documentation.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 108

Table 18 (continued) Data Structure 027: Transfusion Transmitted Infection Marker [RT019]
Positions 10 through 18


<table>
    <thead>
    <tr>
        <th>Position</th>
        <th colspan="2">10</th>
        <th colspan="2">11</th>
        <th colspan="2">12</th>
        <th colspan="2">13</th>
        <th colspan="2">14</th>
        <th colspan="2">15</th>
        <th colspan="2">16</th>
        <th colspan="2">17</th>
        <th colspan="2">18</th>
    </tr>
    </thead>
    <tr>
        <td>Antibody</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Antigen</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Genome
Value</td>
        <td>HEV</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>0</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
        <td>ni</td>
    </tr>
    <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>2</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>3</td>
        <td>neg</td>
        <td>ni</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>4</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>5</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>6</td>
        <td>pos</td>
        <td>ni</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>7</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>8</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>


neg — negative; pos — positive; ni — No information encoded. Additional information may be present in accompanying documentation.

*Note: Positions 11 through 18 have been reserved for future use.*

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                             109

Table 19 Data Structure 029: Symbols [RT037]

<table>
<tr><th>Value</th><th>Description</th></tr>
<tr><td>01</td><td>Dimension is equal to the expressed value within a tolerance defined by the facility</td></tr>
<tr><td>02</td><td>Dimension is greater than the expressed value</td></tr>
<tr><td>03</td><td>Dimension is greater than or equal to the expressed value</td></tr>
<tr><td>04</td><td>Dimension is less than the expressed value</td></tr>
<tr><td>05</td><td>Dimension is less than or equal to the expressed value</td></tr>
<tr><td>06</td><td>Dimension is the nominal value as defined within a circular of information/package insert for the product</td></tr>
</table>

Table 20 Data Structure 029: Dimensions [RT038]

<table>
<tr><th>Value</th><th>Units</th><th>Description</th></tr>
<tr><td>0001</td><td>mL</td><td>Volume of the associated product including the anticoagulant/additive</td></tr>
<tr><td>0002</td><td>mm</td><td>Length of the associated product</td></tr>
<tr><td>0003</td><td>mm</td><td>Width of the associated product</td></tr>
<tr><td>0004</td><td>mm</td><td>Height of the associated product</td></tr>
<tr><td>0005</td><td>mm</td><td>Particle size of the associated product</td></tr>
<tr><td>0006</td><td>cm²</td><td>Area of the associated product</td></tr>
<tr><td>0007</td><td>1E9</td><td>Total number of platelets in the container of the associated product</td></tr>
<tr><td>0008</td><td>g</td><td>Weight of associated product excluding the container but including the anticoagulant/additive</td></tr>
<tr><td>0009</td><td>g</td><td>Tare weight of container</td></tr>
<tr><td>0010</td><td>g</td><td>Tare weight of container and attached tubing</td></tr>
<tr><td>0011</td><td>rings</td><td>Length of trachea expressed in number of rings</td></tr>
</table>

Table 21 Data Structure 029: Decimal Point [RT039]

<table>
<tr><th>Value</th><th>Meaning</th><th>Example</th></tr>
<tr><td>0</td><td>Integer value</td><td>12345</td></tr>
<tr><td>1</td><td>Decimal point between fourth and fifth numbers</td><td>1234.5</td></tr>
<tr><td>2</td><td>Decimal point between third and fourth numbers</td><td>123.45</td></tr>
<tr><td>3</td><td>Decimal point between second and third numbers</td><td>12.345</td></tr>
<tr><td>4</td><td>Decimal point between first and second numbers</td><td>1.2345</td></tr>
<tr><td>5</td><td>Decimal point is in the first position</td><td>.12345</td></tr>
</table>



<page_number>109</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 110

Table 22 Data Structure 030: RBC Serological Results [RT040]

<table>
<tr><th>Value</th><th>Meaning</th></tr>
<tr><td>01</td><td>Negative – Test methodology not specified</td></tr>
<tr><td>02</td><td>Positive – Test methodology not specified</td></tr>
<tr><td>03</td><td>Negative – Serological testing</td></tr>
<tr><td>04</td><td>Positive – Serological testing</td></tr>
<tr><td>05</td><td>Negative – Predicted phenotype based on genotyping</td></tr>
<tr><td>06</td><td>Positive – Predicted phenotype based on genotyping</td></tr>
</table>

Table 23 Data Structure 030: Number of Tests [RT041]

<table>
<tr><th>Value</th><th>Meaning</th></tr>
<tr><td>01</td><td>Tested once on this collection</td></tr>
<tr><td>02</td><td>Tested once on prior collection</td></tr>
<tr><td>03</td><td>Tested ≥ twice on different collections (current and historic) with concordant results</td></tr>
<tr><td>04</td><td>Tested ≥ twice on different collections (historic only) with concordant results</td></tr>
<tr><td>05</td><td>Tested ≥ twice on this collection only, different samples, with concordant results</td></tr>
<tr><td>06</td><td>Test history not specified.</td></tr>
</table>

Table 24 Data Structure 031: Time Zone [RT045]

<table>
<tr><th>Value</th><th>Meaning</th></tr>
<tr><td>1</td><td>Local time zone of facility assigning the date</td></tr>
<tr><td>2</td><td>Coordinated Universal Time (abbreviated UTC)</td></tr>
</table>

Table 25 Data Structure 031: Type of Time [RT046]

<table>
<tr><th>Value</th><th>Meaning</th></tr>
<tr><td>01</td><td>Expiration date and time</td></tr>
<tr><td>02</td><td>Collection date and time</td></tr>
<tr><td>03</td><td>Production date and time</td></tr>
<tr><td>04</td><td>Cross Clamp date and time</td></tr>
<tr><td>05</td><td>Time of preservation</td></tr>
<tr><td>06</td><td>Time of death of donor</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                          111

# 4 Reference Tables Maintained on Websites

## 4.1 Data Structures 015 and 016: HLA Genomic Typing
To encode for HLA-A, -B, and –DRB1 alleles, ISBT 128 utilized a database maintained by the European Bioinformatics Institute, which is part of the European Molecular Biology Laboratory. This database provided for sequences of the human major histocompatibility complex (HLA) and included the official sequences for the WHO Nomenclature Committee for factors of the HLA System. The IMGT/HLA Database is part of the international ImMunoGeneTics project (IMGT).

Data Structures 015 and 016 have been retired as of Version 4.1.0 of the ISBT 128 Standard Technical Specification (December 2011). The data structures were retired because they could not accommodate the increased number of characters required to encode HLA alleles that occurred in April 2010.

While use in the labeling of new products is not recommended, continued use of Data Structures 015 and 016 should reflect terminology used prior to April 2010. The data structures cannot support newer antigens which require more than 4 characters. A crosswalk of allele names from their current name to the name prior to April 2010 may be found at:

[http://ftp.ebi.ac.uk/pub/databases/imgt/mhc/hla/Nomenclature_2009.txt](http://ftp.ebi.ac.uk/pub/databases/imgt/mhc/hla/Nomenclature_2009.txt)

## 4.2 Table W1 Data Structures 017 and 021: Manufacturer Identifier Codes [RT016]
This table is maintained on the ICCBBA Website at:

[https://www.isbt128.org/p-databases-ref-tables](https://www.isbt128.org/p-databases-ref-tables)

## 4.3 Table W2 Data Structure 023: ICCBBA-Specified Compound Messages [RT017]
This table is maintained on the ICCBBA Website at:

[https://www.isbt128.org/p-databases-ref-tables](https://www.isbt128.org/p-databases-ref-tables)



<page_number>111</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 112

## 4.4 Data Structure 030: Red Cell Antigens with Test History
There are multiple tables supporting this data structure, and all are maintained by the Working Party on Red Cell Immunogenetics and Blood Group Terminology of the International Society of Blood Transfusion (ISBT) and posted on their website: [http://www.isbtweb.org/working-parties/red-cell-immunogenetics-and-blood-group-terminology/](http://www.isbtweb.org/working-parties/red-cell-immunogenetics-and-blood-group-terminology/).

This website also includes instructions for requesting an ISBT number for an antigen.

## 4.5 Data Structures 024 and 025: Patient Date of Birth and Patient Identification Number, Location Code Table [RT018]
This table is maintained on the ICCBBA Website at:

[https://www.isbt128.org/p-databases-ref-tables](https://www.isbt128.org/p-databases-ref-tables)

## 4.6 Facility Type Codes Used in the Registered Facilities Database Table [RT058]
This table is maintained on the ICCBBA Website at:

[https://www.isbt128.org/p-databases-ref-tables](https://www.isbt128.org/p-databases-ref-tables)

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           113

# 5 Database Tables

In addition to the Reference Tables in Chapter 3, ICCBBA maintains ISBT 128 database tables using Microsoft Access® or Microsoft Excel®. These tables are too large and/or complex, or change too frequently, to be maintained as simple tables in this document.

These database tables are kept in the password-protected area of the ICCBBA Website and are only available to registered users who are current with their annual license fee.

## 5.1 Product Description Codes

There shall be a single ISBT 128 Product Description Code database for all types of products, with the exception of Clinical Trials products. These products shall have assigned prefix character(s) as shown in Table 26 that permit individual tables to be extracted.

Table 26 Product Categories and Assigned Prefixes

<table>
<tr><th>Product Category</th><th>Assigned Prefix Character(s)</th></tr>
<tr><td>Blood</td><td>E or F</td></tr>
<tr><td>MPHO with INN and/or USAN names</td><td>H</td></tr>
<tr><td>Milk</td><td>M0</td></tr>
<tr><td>Topical Products of Human Origin</td><td>M9</td></tr>
<tr><td>Organs for Transplant</td><td>N0</td></tr>
<tr><td>Regenerated Tissue</td><td>P</td></tr>
<tr><td>Reproductive Tissue</td><td>R0</td></tr>
<tr><td>Cellular Therapy</td><td>S</td></tr>
<tr><td>Tissues</td><td>T</td></tr>
<tr><td>Ocular Tissue</td><td>V</td></tr>
<tr><td>Fecal Microbiota</td><td>W0</td></tr>
<tr><td>Plasma Derivatives (for which blood group is significant)</td><td>X0</td></tr>
<tr><td>In Vivo Diagnostic MPHO</td><td>X5</td></tr>
<tr><td>Clinical Trials</td><td>YA to YZ</td></tr>
</table>

The Product Description Code forms the first five characters of the eight-character Product Code [Data Structure 003] and the last five characters of the 16-character Processor Product Identification Code [Data Structure 034].

A product in the ISBT 128 database shall be defined by a unique combination of the characteristics. Each such combination shall be given a five-character Product Description Code, the first character(s) of which shall identify the different product types (E, F, H, M0, M9, N0, P, R0, S, T, V, W0, X0, X5, or YA to YZ as noted in Table 26), and the remaining characters shall provide a unique sequence number. These codes, with the exception of Clinical Trials products, shall be maintained in a table in the database named ISBT 128 Product Description Code Database. The Product Description Code shall identify a product by mapping, via the Product Description Codes table, to the unique combination of Class, Modifier, and Attribute(s) characteristics, which are referenced in the associated database tables. Product Description Codes beginning with YA to YZ are maintained in a separate database.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                   114

Version numbers for the database table shall be derived as described in Appendix B.
The version of a database is maintained in a table named Version.

Details of the database structure may be found in **ISBT 128 Standard,
Product Description Code Database (ST-010)**.

All Product Description Code database tables shall be published in the password-
protected area of the ICCBBA Website. This file is a Microsoft Access® file and is
named:

ISBT 128 Product Description Code Database

More information about use of the Product Description Code database for different
product categories may be found in the following documents:

*   *Encoding Product Information [Data Structures 003, 032, 033, and 034] – Tissues*
    (IG-020)
*   *Use of Product Code [Data Structure 003], Blood* (IG-021)
*   *Product Coding [Data Structure 003 and 032], Cellular Therapy* (IG-022)
*   *Use of the Product Code [Data Structure 003], Ocular Tissue* (IG-032)
*   *Coding and Labeling of Medical Devices Using ISBT I28* (ST-011)

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                115

# 5.2 Special Testing: General [Data Structure 010]
This database shall contain the test names and codes for data conveyed in Data Structure 010. It shall be published in the password-protected area of the ICCBBA Website. This file shall be a Microsoft Access® file and shall be named:

Special Testing General

A comma-delimited text file of the table in the Special Testing: General database (Special Testing General Text) shall also be provided to permit end-users to incorporate this table into any preferred database application.

Version numbers for the database table shall be derived as described in Appendix B.

For additional screening/testing, details of the test methodology and status are not encoded unless otherwise stated in the definition. Such details may be included in accompanying documentation.

Table 27 Special Testing: General [RT029]

<table>
<tr><th>Field Name</th><th>Field Size</th><th>Constraints</th><th>Field Description</th></tr>
<tr><td>NCODE</td><td>5</td><td>Primary key Required, no duplicates</td><td>UNIQUE ISBT 128 Special Testing Code</td></tr>
<tr><td>INTERPRETATION</td><td>200</td><td>Required, no duplicates</td><td>Information conveyed by the Special Testing Code</td></tr>
<tr><td>RETIREDATE</td><td>11</td><td></td><td>Date on which it was recommended that code no longer be used for new products. Code is maintained in the database for backward compatibility. Format is DD MMM YYYY. The field is blank for current codes.</td></tr>
<tr><td>DEFINITION</td><td>255</td><td></td><td>Definition of the interpretation. This field is optional.</td></tr>
</table>

Table 28 Version Table (Special Testing) [RT043]

<table>
<tr><th>Field</th><th>Field Type</th><th>Field Size</th><th>Description</th></tr>
<tr><td>Version Number</td><td>Text</td><td>50</td><td>The version number of the special testing database</td></tr>
<tr><td>Date</td><td>Text</td><td>11</td><td>The date issued. The format is DD MMM YYYY</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                   116

# 5.3 Facility Identification Number Identification Code
This database shall contain the names and locations of all ICCBBA registered facilities.
It is published in the password-protected area of the ICCBBA Website. This file shall be a Microsoft Excel® file and be named:

Registered Facilities

It shall also be available on the Website as a tab delimited text file (Registered Facilities – Text).

Table 29 Registered Facilities [RT030]

<table>
<tr><th>Field Name</th><th>Field Size</th><th>Field Description</th></tr>
<tr><td>FIN</td><td>5</td><td>Facility Identification Number*</td></tr>
<tr><td>Firm Name</td><td>100</td><td>Legal name of facility</td></tr>
<tr><td>City</td><td>60</td><td>Mailing address details of facility</td></tr>
<tr><td>State/Province</td><td>20</td><td>Mailing address details of facility</td></tr>
<tr><td>Country</td><td>20</td><td>Mailing address details of facility</td></tr>
<tr><td>Postal Code</td><td>10</td><td>Mailing address details of facility</td></tr>
<tr><td>Website</td><td>100</td><td>Website of the facility</td></tr>
<tr><td>Alternative Name</td><td>100</td><td>A second name associated with the facility</td></tr>
<tr><td>Country ISO</td><td>2</td><td>Code for country as assigned in ISO 3166-1*</td></tr>
<tr><td>Facility Type</td><td>80</td><td>Indicates category or categories of products the facility manages</td></tr>
</table>

*10 FINs have been set aside for validation purposes. These are A9990-A9999. ICCBBA has used the user-defined country code of XA (as allowed by ISO 3166-1) for these FINs.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 117

# 5.4 GRID Issuing Organization Identification Number

This Microsoft Excel® spreadsheet contains the names and locations of all GRID Issuing Organizations. It is published on the ICCBBA Website and is called:

GRID Issuing Organizations – xlsx

An XML file and its associated XML Schema are also available on the ICCBBA Website:

GRID Issuing Organizations Data File – xml
GRID Issuing Organizations XML Schema – xsd

*Note:* The XML data file contains IONs that have an “Active” status only while the Excel spreadsheet provides both “Active” and “Inactive” IONs.

Version number related information is also provided in the XML file. Version numbers for the database table shall be derived as described in Appendix B.

The information about each organization held in the ICCBBA database is provided by the World Marrow Donor Association (WMDA) at the time of listing. It is the responsibility of the Issuing Organization to ensure that it remains accurate by notifying WMDA of any changes. WMDA will, in turn, notify ICCBBA of changes.

For more information, including the structure of the database tables, see *ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules* (ST-015).

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                              118

# 6 Delivery Mechanisms for ISBT 128 Data Structures

ISBT 128 data structures can be delivered using a number of different technologies including linear bar codes, two-dimensional (2-D) symbols, wireless radio frequency identification transponders (RFID tags), and EDI messages. Rules for such uses of ISBT 128 data structures will depend on the delivery mechanism.

## 6.1 Linear Bar Codes

### 6.1.1 General Requirements
ISBT 128 data structures represented as linear bar codes shall use Code 128 symbology and be compliant with ISO/IEC 15417.

Implementers shall ensure that a switch can be made to subset C of the Code 128 symbology where appropriate in order to reduce bar code length.

### 6.1.2 Bar Code Print Quality
Following methodology described in ISO/IEC 15416, the print quality of a Code 128 linear bar code shall be 1.5/6/670, where:
* 1.5 is the overall quality,
* 6 is the measuring aperture reference number (corresponding to a 0.15 mm diameter aperture), and
* 670 is the peak response wave length in nanometers.

### 6.1.3 Bar Code Dimensions
The nominal module width (X dimension) shall be constant throughout a given linear bar code. The X dimension is the width of the narrowest bar within the bar code.

For ISBT 128 linear bar codes on a container label, the target X dimension shall be 0.25 mm.

The minimum X dimension shall be 0.17mm.

Any use of an ISBT 128 data structure as a linear printed bar code other than on a container label should use an X dimension that meets these criteria.

In situations in which this recommendation is still too large to allow labeling of specific usage, a nominal X dimension of ≥0.127 mm may be used, provided it has been verified that this dimension is compatible with the instruments that will be reading the linear bar code.

Non-ICCBBA defined linear bar codes (such as national use bar codes) used on blood labels should meet the criteria listed above.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                  119

**Bar Code Quiet Zones:** The minimum width of a quiet zone shall be 10 times the X dimension.

A “quiet zone” is the clear space preceding the start character of the linear bar code and that following the stop character. This quiet zone is essential for the reading of the bar code.

There shall be no printing in direct contact with the top and bottom of the linear bar code.

**Bar Code Height:** In accordance with the recommendation in Annex G of ISO/IEC 15417, the linear bar code height should be at least 5 mm or 15% of the bar code length, whichever is greater, on product labels that will leave the facility in which the products were labeled. For bar codes on labels or documents that will not leave the facility in which they were created, users should validate the minimum height of a label that can be read with their scanning equipment and ensure labels meet this internal requirement.

**Concatenated Bar Codes:** For linear bar codes that may be concatenated, the distance between the two bar codes shall fall within the specified range (see Chapter 10).



<page_number>119</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                        120

# 6.2 2-D Symbols

## 6.2.1 General Requirements
Data Matrix (ECC 200) shall be used as the 2-D symbology for ISBT 128 container labels. The ISO/IEC 16022 Information technology—International symbology specification—Data Matrix shall be followed.

For applications of ISBT 128 other than container labels, Data Matrix is recommended.

## 6.2.2 Symbol Print Quality
Following methodology described in ISO/IEC 15415, the print quality of a Data Matrix (ECC 200) 2-D symbol shall be 1.5/6/670, where:
* 1.5 is the overall quality,
* 6 is the measuring aperture reference number (corresponding to a 0.15 mm diameter aperture), and
* 670 is the peak response wave length in nanometers.

## 6.2.3 Symbol Dimensions
The nominal X dimension shall be a minimum of 0.25 mm.

The nominal X dimension shall be a maximum of 1 mm.

Within these criteria, as large an X dimension as practical should be used.

**Finder pattern:** The width of the finder pattern shall equal X.

**Alignment pattern:** The width of the alignment pattern shall equal 2X.

**Quiet zone:** The minimum quiet zone shall be equal to X on all four sides. For applications with moderate to excessive reflected noise in close proximity to the 2-D symbol, a quiet zone of 2X to 4X is recommended.

## 6.2.4 Reading and Interpreting Information
Single data structures shall be encoded as they would be within a linear bar code.

For further information on implementation of 2-D symbols, see *Implementation Guide: Use of Data Matrix Symbols with ISBT 128 (IG-014)*.

# 6.3 RFID Tags
Use of RFID technology for blood components should comply with the guidelines published in Vox Sanguinis [Knels R, Davis R, Ashford P, et al: Guidelines for the use of RFID technology in transfusion medicine. Vox Sang 2010; 98(S2):1-24]. These guidelines recommend:

* The use of passive HF (13.56 MHz)

© 2004-2023 ICCBBA, All Rights Reserved                                  www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                         121

*   That the user follow ISO 18000-3, tag standard and the ISO 15961 and ISO 15962 data encoding rules.
*   That ISBT 128 data structures be used within the message.

Additional guidance will be provided as this technology develops.

# 6.4 EDI Messages
Rules for incorporating ISBT 128 data structures into EDI messages will normally be specified by the body responsible for the message standard.

The data identifier characters shall be part of the data field unless the message standard provides an alternative means of unambiguously identifying a data field as containing a specific ISBT 128 data structure.

For messages following the HL7 Standard, see reference table RT042 on the ICCBBA website.



<page_number>121</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                             122

# 7 Product Labeling

## 7.1 Specific Product Labeling
For information on labeling of specific products, see
* *ISBT 128 Standard, Labeling of Blood Components* (ST-005)
* *ISBT 128 Standard, Labeling of Cellular Therapy Products* (ST-004)
* *ISBT 128 Standard, Labeling of Human Tissues* (ST-003)
* *ISBT 128 Standard, Labeling of Ocular Tissue* (ST-009)
* *ISBT 128 Standard, Coding and Labeling of Medical Devices Using ISBT 128* (ST-011)
* *ISBT 128 Standard, Labeling of Human Milk Banking Products* (ST-013)

## 7.2 National Labeling Guidelines
National bodies may publish guidelines for labeling which adhere to the ISBT 128 Standard. ICCBBA maintains on its Website examples of such national documents. For assistance in creating such national guidelines, or to share a national guideline on the ICCBBA Website, contact the ICCBBA office (technical.mgr@isbt128.org).

## 7.3 General Principles
Two label types are specified in ISBT 128: The label applied by the manufacturer of the container referred to as the base label and the label placed on a product container by the processing facility referred to as the final label. Facilities may also apply intermediate, or in-process, labels.

The following general principles apply to label design:

Primary considerations in label design shall include improving the safety of the product and the efficiency of processing/administering. If these two considerations conflict, safety shall take precedence over efficiency.

Critical information on the container shall dominate the label via position and prominence and shall take precedence over information that is of little importance to the end-user (clinician, nurse, laboratory staff, and other hospital personnel).

To assist in label design, if more than one linear bar code is to be placed in a quadrant of a 100 mm x 100 mm label, e.g., Expiration Date and Special Testing, some adjustment of the absolute position of bar codes other than those for Data Structures 001, 002, 003 and 005 is permissible. Additionally, depending on the amount of text that is required, it may be necessary to reduce bar code height in accordance with bar code height requirements described 6.1.3, beginning on page 118.

Examples of labels are shown in Appendix C. A library of example labels from different countries is posted on the ICCBBA Website.

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                123

### 7.3.1 Minimum Information

Traceability of MPHO labeled with ISBT 128 requires, at a minimum:

1. Every ISBT 128-labeled product shall carry electronically-readable information required for traceability. This includes the DIN, the standardized Product Description Code (Data Structure 003 or 034), and a divisions/pack code (Data Structure 003 or 032). If the processing facility identification code [FIN(P)] is required for traceability, this too shall be present in an electronically-readable format (Data Structure 033 or 034). See *Implementation Guide: Use of the Processing Facility Information Code [Data Structure 033] (IG-031)* for an explanation of when the FIN(P) is required for traceability.
2. Every ISBT 128-labeled product shall carry text corresponding to the required electronically-readable information.

The information in 1 and 2 above should appear on the affixed label whenever possible.

If linear bar codes are used and the affixed label is too small to carry the required bar codes, then the DIN bar code shall appear on the affixed label, along with text for the DIN, Product Description Code, and divisions/pack code. On the attached or accompanying documentation, the DIN, Product Description Code (Data Structures 003 or 034), and divisions/pack code (Data Structure 003 or 032) shall be present in both electronically-readable and eye-readable format.

If the FIN(P) is required for traceability, a 2-D symbol shall be used. The DIN shall be present in electronically-readable and eye-readable format on the affixed label. The Product Description Code, a divisions/pack code, and the FIN(P) shall be encoded in the 2-D symbol. Text corresponding to the information in the 2-D symbol should be present on the affixed label. If space does not permit this, a 2-D symbol with corresponding text information shall be present on attached or accompanying documentation.

Additional information may be required based on product category and/or country. See specific labeling documents for additional information.

## 7.4 Printing Label Text

Fonts selected for labels shall allow differentiation between similar characters (e.g., 0/O and 1/I).

Particular font sizes and types are not specified, but designers shall ensure clarity of all text and use larger fonts to emphasize critical information. The use of color (for example, for ABO) is neither prohibited nor encouraged.

At a minimum, data labels (i.e., text indicating the meaning of the data item) should be used when the purpose of the code is not apparent by its position on the label or by its


<page_number>123</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                  www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 124

context. See Figure 11. Appropriate abbreviations (e.g., Prod Code for Product Code)
may be used when space is limited.

Figure 11 Examples of Data Labels (in Red Boxes)

Example of a data label for skin, full with hypodermis, including barcodes and text fields for expiry date, product code, and DIN.

## 7.4.1 Donation Identification Number [001]

All data characters in the 13-character DIN shall be printed. This includes the second data identifier character as in this specific case the second data identifier character is also a data character. A national authority should determine how it should be displayed, for example:

V0043 14 499999
A123 4140 12346
7004 203 123 456

The flag characters may be used to convey specific information other than the unique identification of the product and shall be distinguished from the Donation Identification Number (see Section 2.4.1, page 25).

When the default (00) is used for flag characters, it does not have to be printed.

When Type 1 or Type 2 flag characters are used they shall be printed as either:

* Numeric Presentation: The two-digit values of flag characters **ff**, shall be printed rotated 90° clockwise to make them visually different from the DIN.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 125

W0000 09 123456 02 G
Arrow pointing to the characters 02
Flag Characters

*   Non-numeric Presentation: A graphical icon or other representation of the value of ff. For example, for the flag characters “07”, printing an icon showing a small test tube may be used.

Type 3 flag characters shall not be printed.

When linear bar codes are used, the DIN shall be printed beneath the corresponding bar code, but it does not need to be printed left justified. This allows the DIN to be printed in a larger font.

See Section 7.5.1.1, page 132, for printing of keyboard entry check characters.

## 7.4.2 Other Data Structures – Linear Bar Codes

### 7.4.2.1 Text Corresponding to the Data Content of Linear Bar Codes

General rules:

*   Every ISBT 128 linear bar code on a container label shall be accompanied by text that corresponds to the data content, unless otherwise specified.
*   Data identifiers shall not appear in the text, unless otherwise specified.
*   Text corresponding to the data content shall be printed left justified (in line with the leftmost bar of the bar code) immediately below, but not touching, a linear bar code, unless otherwise specified
*   Text shall be in font that differentiates similar characters with a maximum height of 2 mm.

See Figure 12.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 126

Figure 12 Text Corresponding to Data Content in a Linear Bar Code (in Red Boxes)

Blood bag label with bar codes and text

Exceptions to these rules are:

1. **Special Testing: Red Blood Cell Antigens [Data Structures 012 and 013]**
   For Red Blood Cell Antigens, text corresponding to the data content of the linear bar code is not required. Printing the interpretation of the electronically-readable information (e.g., C-, E-) is sufficient. This recommendation is based on the rationale that should the bar code not be scanned, it is likely that entering each antigen result will be more accurate than entering a string of 18 numbers. This is a recommendation, not a requirement, and not all computer systems may support it.

2. **Special Testing: Platelet HLA and Platelet Specific Antigens [Data Structure 014]**
   For Platelet HLA and Platelet Specific Antigens, text corresponding to the data content of the linear bar code is not required. Printing the interpretation of the electronically-readable information (e.g., HLA-A2,A19; B27,B40) is sufficient. This recommendation is based on the rationale that should the bar code not be scanned, it is likely that entering each antigen result will be more accurate than entering a string of 18 numbers. This is a recommendation, not a requirement, and not all computer systems may support it.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 127

3. **Container Manufacturer and Catalog Number [017] and Container Lot Number [018]**

    Information on printing text for these data structures is found in *ISBT 128 Standard, Labeling of Blood Components* (ST-005).

7.4.2.2 **Other Text Associated with Electronically-Readable Information**

    Except in situations described in Section 7.4.4, other text on the label that is associated with electronically-readable information may be nationally defined to allow for differences in language, regulatory requirements, and preferences.

    Text associated with electronically-readable information should appear near its corresponding bar code. If the size of the label does not support the information content required by this standard, appropriate regulations and requirements of standard setting organizations should be consulted. Some required information may need to appear on secondary packaging, if permitted by regulations and pertinent standards.

    See Figure 13.

Figure 13 Other Text Associated with Electronically-Readable Information (in Red Boxes)

Label example with red boxes highlighting text associated with electronically-readable information

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 128

## 7.4.3 Other Data Structures – 2-D Symbols

Text corresponding to the information encoded in a 2-D symbol should appear on the label. If the size of the label does not support the information content required by this standard, appropriate regulations and requirements of standard setting organizations should be consulted. Some required information may need to appear on secondary packaging, if permitted by regulations and pertinent standards.

Except in situations described in Section 7.4.4, text on the label that is associated with electronically-readable information may be nationally defined to allow for differences in language, regulatory requirements, and preferences.

Figure 14 Text Corresponding to Electronically-Readable Information in a 2-D Symbol with Associated Data Labels where Appropriate (in Red Boxes)

Diagram showing a blue box with text pointing to a label example. The label contains a 2-D barcode and text, with certain sections highlighted in red boxes.

*Note: In this example, the time of death and the time of preservation are not encoded in the 2-D symbol. This information could be encoded into the 2-D symbol, and if it were, this text would be considered to be text associated with information in a 2-D symbol.*

## 7.4.4 Text Associated with Specific Data Structures

### 7.4.4.1 Product Descriptions [Data Structure 003]

See specific labeling standards for blood, cellular therapy, tissue, ocular tissue, medical devices, and human milk products for printing of product descriptions.

In general, product description text should be printed with the Modifier (when present) proportionally smaller than the Class name and Attribute(s) text should be proportionately smaller than Modifier text.

See Figure 15.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 129

Figure 15 Relative Text Size of Class, Modifier, and Attributes

Diagram showing arrows pointing from labels "Modifier", "Class", and "Attribute" to the text "WASHED", "RED BLOOD CELLS", and "IRRADIATED" respectively.

7.4.4.2 Dates and Times [Data Structures 004, 005, 006, 007, 008, 009, 024]

Dates shall be printed in compliance with ISO 8601-2004 extended format or in the format day — month — year. In the latter case, the day shall be numerical and the month alphabetical using a three-letter abbreviation.
The year shall be a four-digit numerical representation.

Expiration Date:

2017-03-17
OR
17 MAR 2017

*Note: Abbreviations for month shall comply with relevant national standards where applicable.*

Times shall be printed based on a twenty-four hour clock with a colon placed between the hours and minutes.

Other standards setting organizations may place additional restrictions on the eye-readable format of the date (e.g., may restrict it to the ISO 8601-2004). See product category specific or national/regional labeling guidance documents.

For Cellular Therapy products with text expiration times, time zones shall be taken into consideration. If the product is to be shipped across time zones, FACT and JACIE Standards require that the text expiration date and time include the local time zone abbreviation. In addition, the ISBT 128 Standard requires that the label include the Coordinated Universal Time (UTC) when the product is to be shipped across an international time zone.

The UTC shall be printed beneath the local time in parenthesis with the designation “UTC”. Italics may also be used to clearly differentiate UTC from local time. For example:

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 130

2017-01-15 15:15 EST
(2017-01-15 15:15 UTC)
OR
15 JAN 2017 15:15 EST
(15 JAN 2017 20:15 UTC)

*Note: It is recognized that local time zone designations may have little meaning internationally since two time zones may have the same abbreviation (e.g., EST can mean Eastern Standard Time in Australia, which is UTC+10 hours or Eastern Standard Time in North America, which is UTC -5 hours). However, the Cellular Therapy Coding and Advisory Group (CTCLAG) believe that local time zones are more readily interpreted within a continent. For products shipped to different continents, UTC should be used to interpret time.*

### 7.4.4.3 Month-Year [Data Structure 026]

The date shall be printed in compliance with ISO 8601-2004 extended format or in the format month — year. In the latter case, the month alphabetical expression shall use a three-letter abbreviation. The year shall be a four-digit numerical representation.

2017-03
OR
MAR 2017

*Note: Abbreviations for month shall comply with relevant national standards where applicable.*

### 7.4.4.4 Donor Identification Number [Data Structure 019]

When the sequence number portion of the Donor Identification Number is less than 16 digits, the sequence number shall be padded with zeroes at the beginning of the actual number. If desired, software developers can routinely strip off padding and present the sequence number when displaying the number on a screen within the facility that assigned it.

For example:

In Denmark, a possible data content string would be:

V0100 000000 080656 1665

a 10-digit sequence number with six leading zeroes as padding. This number might display on a screen within the facility as 080656 1665.
In France, it might be:

F2499 0 1 56 05 18 033 087 78

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           131

a 15-digit number with a single leading zero as padding. This number might display on the screen within the facility that assigned it as 1 56 05 18 033 087 78.

### 7.4.5 Text Not Associated with Electronically-Readable Information

Text not associated with electronically-readable information includes warnings such as “This product may transmit infectious agents”.

The placement of this information is not standardized internationally, but may be standardized nationally. Users should review national documents for additional information.

If not nationally defined, facilities may add additional text to the label where space permits and there is need.

See Figure 16.

Figure 16 Text Not Assoicated with Electronically-Readable Information (in Red Boxes)

Diagram showing a blue box labeled "Encoded Information: DIN, Product Code (which maps to product description through the ISBT 128 Product Description Code Database), and Expiry Date" pointing to a label example with red boxes highlighting non-encoded text.

*Note: In this example, the time of death and the time of preservation are not encoded in the 2-D symbol. This information could be encoded into the 2-D symbol, and if it were, this text would be considered text associated with electronically-readable information.*


<page_number>131</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                              132

# 7.5 Keyboard Entry Check Character K
A keyboard entry check character **K** shall be printed when text appears in conjunction with the following data structures in order to verify correct manual entry of the data content:

* Donation Identification Number [001]
* Donor Identification Number [019]
* Transfusion Transmitted Infection Marker [027]
* Global Registration Identifier for Donors [037] **[RETIRED]**
* Chain of Identity Identifier [040]

If text corresponding to the data content of the following data structures is printed, a keyboard entry check character **K** shall be printed.

* Special Testing: Red Blood Cell Antigens [011] **[RETIRED]**
* Special Testing: Red Blood Cell Antigens—General [012]
* Special Testing: Red Blood Cell Antigens—Finnish [013]
* Special Testing: Platelet HLA and Platelet-Specific Antigens [014]
* Special Testing: HLA-A and -B Alleles [015] **[RETIRED]**
* Special Testing: HLA-DRB1 Alleles [016] **[RETIRED]**

**K** is not part of the data content string, but is calculated from it using the ISO/IEC 7064 modulo 37-2 checksum method. **K** is a character in the range {A-Z, 0-9, *}, and is determined from the modulo 37 remainder of the weighted sum of the data content string, as shown in Table 35 in Appendix A. For an example of the calculation for the 13-character string αppppyynnnnnn of the Donation Identification Number, see Appendix A.

In the case of Data Structure 001 (Donation Identification Number), the calculation shall be based on the 13-character DIN only, i.e., excluding the flag characters.

## 7.5.1 Other Data Structures
For other bar codes, the keyboard entry character may be used or even required (see Table 30, page 133). Because the ISO/IEC 7064 modulo 37-2 checksum method does not allow for lower case alpha characters, it shall not be used in data structures that have lower case alpha characters.

### 7.5.1.1 Printing the Check Character
Wherever the keyboard check character is printed, it shall be clearly distinguished from data content. When printed in association with the text of a code, a box shall be drawn around the keyboard entry check character.

For example, a 13-character DIN would be printed with its check character:

A9998 18 123456 8 N



<page_number>132</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 133

Because of the significance of this particular character, it shall be printed in a typeface that clearly distinguishes alphabetic and numeric characters; e.g., there shall be no confusion between 1 (one) and I (capital letter I), or between 0 (zero) and O (capital letter O).

Table 30 Keyboard Entry Check Character Requirements for ISBT 128 Data Structures
Utilizing Code 128 [RT002]

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Modulo 37-2
Keyboard Entry
Check Character [K]</th></tr>
<tr><td>001</td><td>Donation Identification Number</td><td>Required</td></tr>
<tr><td>002</td><td>Blood Groups [ABO and RhD]</td><td>Not applicable</td></tr>
<tr><td>003</td><td>Product Code</td><td>Not applicable</td></tr>
<tr><td>004</td><td>Expiration Date</td><td>Optional</td></tr>
<tr><td>005</td><td>Expiration Date and Time</td><td>Optional</td></tr>
<tr><td>006</td><td>Collection Date</td><td>Optional</td></tr>
<tr><td>007</td><td>Collection Date and Time</td><td>Optional</td></tr>
<tr><td>008</td><td>Production Date</td><td>Optional</td></tr>
<tr><td>009</td><td>Production Date and Time</td><td>Optional</td></tr>
<tr><td>010</td><td>Special Testing: General</td><td>Optional</td></tr>
<tr><td>011</td><td>Special Testing: Red Blood Cell Antigens [RETIRED]</td><td>Required</td></tr>
<tr><td>012</td><td>Special Testing: Red Blood Cell Antigens—General</td><td>Required if text corresponding to the 18-character code is printed</td></tr>
<tr><td>013</td><td>Special Testing: Red Blood Cell Antigens—Finnish</td><td>Required if text corresponding to the 18-character code is printed</td></tr>
<tr><td>014</td><td>Special Testing: Platelet HLA and Platelet-Specific Antigens</td><td>Required if text corresponding to the 18-character code is printed</td></tr>
<tr><td>015</td><td>Special Testing: HLA-A and –B Alleles [RETIRED]</td><td>Required if text corresponding to the 18-character code is printed</td></tr>
<tr><td>016</td><td>Special Testing: HLA-DRB1 Alleles [RETIRED]</td><td>Required if text corresponding to the 18-character code is printed</td></tr>
<tr><td>017</td><td>Container Manufacturer and Catalog Number</td><td>Not applicable</td></tr>
<tr><td>018</td><td>Container Lot Number</td><td>Not applicable</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 134

Table 30 Keyboard Entry Check Character Requirements for ISBT 128 Data Structures
Utilizing Code 128 [RT002] (continued)

<table>
<tr><th>Number</th><th>Data Structure Name</th><th>Modulo 37-2
Keyboard Entry
Check Character [K]</th></tr>
<tr><td>019</td><td>Donor Identification Number</td><td>Required</td></tr>
<tr><td>020</td><td>Staff Member Identification Number</td><td>Optional</td></tr>
<tr><td>021</td><td>Manufacturer and Catalog Number: Items Other Than Containers</td><td>Not applicable</td></tr>
<tr><td>022</td><td>Lot Number: Items Other Than Containers</td><td>Not applicable</td></tr>
<tr><td>023</td><td>Compound Message</td><td>Not applicable</td></tr>
<tr><td>024</td><td>Patient Date of Birth</td><td>Optional</td></tr>
<tr><td>025</td><td>Patient Hospital Identification Number</td><td>Not applicable</td></tr>
<tr><td>026</td><td>Expiration Month and Year</td><td>Optional</td></tr>
<tr><td>027</td><td>Transfusion Transmitted Infection Marker</td><td>Required</td></tr>
<tr><td>028</td><td>Product Consignment</td><td>Optional</td></tr>
<tr><td>029</td><td>Dimensions</td><td>Optional</td></tr>
<tr><td>030</td><td>Red Cell Antigens with Test History</td><td>Not applicable</td></tr>
<tr><td>031</td><td>Flexible Date and Time</td><td>Optional</td></tr>
<tr><td>032</td><td>Product Divisions</td><td>Optional</td></tr>
<tr><td>033</td><td>Processing Facility Information Code</td><td>Optional</td></tr>
<tr><td>034</td><td>Processor Product Identification Code</td><td>Optional</td></tr>
<tr><td>035</td><td>MPHO Lot Number</td><td>Optional</td></tr>
<tr><td>036</td><td>MPHO Supplemental Identification Number</td><td>Optional</td></tr>
<tr><td>037</td><td>Global Registration Identifier for Donors [RETIRED]</td><td>Required</td></tr>
<tr><td>038</td><td>Single European Code (SEC)</td><td>Not applicable</td></tr>
<tr><td>039</td><td>Global Registration Identifier for Donors</td><td>Not applicable</td></tr>
<tr><td>040</td><td>Chain of Identity Identifier</td><td>Required</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 135

# 8 Outer Package Labeling for Containers and Supplies

Outer cartons containing collection containers or other supplies should be marked for electronic data capture using bar coded information in accordance with the GS1 standard. At a minimum the information encoded should include (GS1 Application Identifier shown in parentheses):

* Global Trade Item Number (01);
* Batch or Lot Number (10);
* Expiration Date (17).

According to GS1 recommendations, this information should be carried in a GS1-128 bar code placed on the carton. GS1 general specifications give full detail about the data structure and the encryption into the bar code. The following example illustrates how the information is carried in a GS1-128 bar code.

Figure 17 GS1 Outer Packaging Bar Code

GS1-128 bar code with the text: (01) 0 3205000 00400 4 (17) 090930 (10) abc123((01) 0 3205000 00400 4 (17) 090930 (10) abc123)

*Blood Bag Identification Using ISBT 128 and GS1* (JP-003), which is available on the ICCBBA Website, provides guidance to blood bag manufacturers, their customers, and software developers on the bar coding of blood bags and their shipping containers. It deals with the relationship between information held in the GS1 carton codes and the ISBT 128 blood container label codes and recommends ways to simplify the mapping of this information.


<page_number>135</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 136

# 9 Data Structure Coding and Decoding: Examples of Use

## 9.1 Data Structure 012: Special Testing: Red Blood Cell Antigens–General

The following is an example of the use of Data Structure 012 (Table 9).

**Example 1:**

Consider the following data content string:

880000008700000000

This data content string is decoded as follows:

C-c+E-e+, K+k+;
Cw, Mi<sup>a</sup>, M, N, S, s, U, P1, Lu<sup>a</sup>, Kp<sup>a</sup>, Le<sup>a</sup>, Le<sup>b</sup> not tested;
Fy(a+b+), Jk(a+b-),
Do<sup>a</sup>, Do<sup>b</sup>, In<sup>a</sup>, Co<sup>b</sup>, Di<sup>a</sup>, VS/V, Js<sup>a</sup>, CMV antibody not tested.

**Example 2:**

679999999999999900

decodes as:

C+c-E-e+, K+k-, no other information.

**Example 3:**

999999999999999100

decodes as:

CMV antibody negative; no other information.

**Example 4:**

486881355800000000

decodes (rearranged to conform to a typical reporting practice) as:

C+C<sup>w</sup>+c+E+e+ K+ k+ M+N+S+s+ P1- Lu(a-) Le(a-b+) Fy(a-b+) Jk(a+b+);
VS/V Mi<sup>a</sup> U Kp<sup>a</sup> Js<sup>a</sup> Di<sup>a</sup> Do<sup>a</sup> Do<sup>b</sup> Co<sup>b</sup> In<sup>a</sup> and CMV not tested.



<page_number>136</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                 137

The interpretation of the two (2)-character “ii” data content string is as follows. If the “ii” string is “99,” then no information is provided (the default). If a number between “01” and “98” appears, the antigen (or characteristic) shown next to the value in Table 12, page 100, has been tested for and found negative (except for parvovirus). For example, “55” indicates Di(b-). If the value is “00,” then further information is provided, either on the container label, or in some other manner.

National guidelines should be consulted for specific information regarding the printing of this text. As a further example, rather than the complete red blood cell phenotype associated with Data Structure 012, the text may read:

Phenotype provided in accompanying documentation

or some similar phrase. Alternatively, the antigen profile relevant to the recipient may be emphasized with the notation that the remainder of the interpretation of the bar code is presented elsewhere.

# 9.2 Data Structure 014: Special Testing: HLA and Platelet-Specific Antigens

Examples of Use

Refer to Table 14, beginning on page 102, Table 15, page 104, and Table 16, page 105.

An individual of homozygous HLA-A2, B7 type and no information about platelet-specific antigens would be coded as:

029907999999999900 (if only the phenotype is known)
020207079999999900 (if the genotype is known)

Two AA values are always needed, followed by two BB values. To conform to practice the lower value should always be listed first.

An individual of HLA-A210, 24; B8, 2708 and no information about platelet-specific antigens would be coded as:

022408279999999900

An HPA-1a (PlA1)-negative individual when there is no HLA typing data would be coded as:

999999993999999900

An HPA-1a (PlA1)-negative individual of HLA phenotype A2, B8 would be coded as:

029908993999999900

An IgA-deficient, CMV-antibody negative individual would be coded as:

999999999999999400

© 2004-2023 ICCBBA, All Rights Reserved                                   www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                           138

An individual of homozygous HLA-A2, B7 type with no information about platelet-specific antigens and with no high titered anti-A and –B detected would be coded as:

029907999999999901 (if only the phenotype is known)
020207079999999901 (if the genotype is known)



<page_number>138</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 139

# 9.3 Data Structure 027: Transfusion Transmitted Infection Marker
The Infectious Markers Data Structure allows complex testing information to be conveyed electronically (see Section 2.4.27, page 62).

Example: A product has the following test results:

<table>
<tr><td>HIV-1/2 antibody</td><td>Negative</td></tr>
<tr><td>HIV-p24</td><td>Not tested</td></tr>
<tr><td>HIV genomic</td><td>Not tested</td></tr>
<tr><td>HCV antibody</td><td>Positive</td></tr>
<tr><td>HCV antigen</td><td>Not tested</td></tr>
<tr><td>HCV genomic</td><td>Negative</td></tr>
<tr><td>HBc antibody</td><td>Negative</td></tr>
<tr><td>HBs antigen</td><td>Negative</td></tr>
<tr><td>HBV genomic</td><td>Not tested</td></tr>
<tr><td>HTLV-I/II antibody</td><td>Negative</td></tr>
<tr><td>Syphilis antibody</td><td>Negative</td></tr>
<tr><td>CMV antibody</td><td>Positive</td></tr>
<tr><td>CMV genomic</td><td>Not tested</td></tr>
<tr><td>EBV genomic</td><td>Not tested</td></tr>
<tr><td>WNV genomic</td><td>Not tested</td></tr>
<tr><td>Parvo B19 antibody</td><td>Not tested</td></tr>
<tr><td>Parvo B19 genomic</td><td>Not tested</td></tr>
<tr><td>Chagas antibody</td><td>Not tested</td></tr>
<tr><td>HEV genomic</td><td>Not tested</td></tr>
</table>

Using the Infectious Markers Data Structure, this would be encoded according to Table 18, page 107, as:

321415000000000000

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           140

# 10 Bar Code Concatenation

This chapter provides the technical description of ISBT 128 concatenation for Code 128 symbols. It assumes an understanding of concatenation concepts and the basic differences between ISBT 128 concatenation and standard Code 128 concatenation. Additional background information can be obtained from the ICCBBA publications *Technical Note 2, Length of the Product Code Bar Code and Concatenation* (IG-017) and *Technical Bulletin 5, Bar Code Scanner ISBT 128 Concatenation* (IG-008). These documents may be found on the ICCBBA Website.

## 10.1 Temporal/Spatial Constraints

Temporal and/or spatial constraints shall be met before a pair of codes can be concatenated. The detailed requirements are:

* the gap between last bar of the left bar code and the first bar of the right bar code shall be 36X ± 16X (That is equivalent to 9 ± 4 mm when the X dimension is 0.25 mm)
* both bar codes shall be oriented in the same manner (the Standard allows flexibility to accommodate slight misalignment, but labels should be affixed so that the bars in the bar codes are as close to parallel as possible)
* vertical alignment shall allow a single straight line scan to pass completely through both bar codes
* no vertical lines may appear between pairs of bar codes that are meant to be concatenated
* the stop codes shall be on the same side of both bar codes

Other variations of label design or placement shall not interfere with concatenation of paired bar codes (Donation Identification Number [001] and Blood Groups [ABO and RhD] [002]; Product Code [003] and Expiration Date and Time [005]; Container Manufacturer and Catalog Number [017] and Container Lot Number [018]).

In addition to these requirements, the X dimensions of both bar codes should be the same.

*Note: The previous mandatory requirement for having the same X dimension for both bar codes was removed in version 3.0.0. However, recent evidence indicates this may cause problems. Until further evidence is available, we strongly recommend that the two bar codes be of the same X dimensions.*

If any of the above constraints are not met the concatenation process shall be aborted.
The scanner/decoder should immediately output the data of the correctly-read first bar code as if read without concatenation (this may be either bar code of the pair depending on the direction of scan). Reading and output of data from any other bar codes scanned then continues as an independent operation, as if a new scan had been started.

The techniques recommended to scanner manufacturers to ensure that the spatial separation constraint is applied are detailed in *Technical Bulletin 5, Bar Code Scanner Implementation of ISBT 128 Concatenation* (IG-008).

© 2004-2023 ICCBBA, All Rights Reserved                                 www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 141

No maximum length for a pair of bar codes for concatenation is defined. However, the maximum length of a code pair that can be read will be determined by the scanner design.

## 10.2 Output Data String
ISBT 128 concatenation shall result in a single output data string containing the data from the left bar code followed by the data from the right bar code, regardless of the order of scanning. The terms left and right bar code are defined such that the stop code of the left bar code is adjacent to the start code of the right bar code.

The output data string shall contain all data characters in each bar code, including the data identifiers, in left-to-right byte order (i.e., starting with the left primary data identifier) regardless of the direction in which the bar codes are scanned. Internal Code 128 control characters, such as start, stop, and subset shift are non-data characters and thus do not appear in the output string.

## 10.3 Controlling the Concatenation Process
At any point in the bar code data entry process one of the following concatenation requirements shall apply:

a) concatenated read required;
b) concatenated read prohibited;
c) concatenated read permitted but not required.

Enforcement of these requirements may be carried out either by the host application software or by programming the scanner.

Where control is carried out by the application software, the scanner shall be configured to allow both single and ISBT 128 concatenated reads. The application software can then apply the required control (a, b, or c) for each scanning transaction.

Alternatively, scanners that support internal control of ISBT 128 concatenation mode may be programmed to allow ISBT 128 concatenation mode configuration, allowing the scanner to be set to operate according to a, b, or c above. Requirements a and b are referred to as static modes, and when configured to one of these the scanner will enforce the requirement every time an ISBT 128 bar code is scanned. If the scanner is configured to dynamic mode, c, then both single and concatenated reads are allowed.

## 10.4 Verification of Valid Concatenation
The above rules ensure that a concatenated read occurs only when required. This section is concerned with verifying the pair of bar codes once they have been received.

The ISBT 128 concatenation methodology allows the concatenation of any pair of ISBT 128 bar codes; however, in general, only a limited set of bar code pairs will be concatenated. Once again, control over this verification can be carried out either by the host application software or by the scanner software.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                    142

Using application software control, the application may be written to accept only the expected concatenated pair at each input event. The scanner in this situation shall be configured to pass through any pair of valid ISBT 128 bar codes.

Alternatively, the scanner may be configured to allow only specific pairs of bar codes to be accepted. Where such control is used it is essential that the scanner configuration permit the table of acceptable bar code pairs to be modified and extended. A Concatenation Programming Bar Code has been provided as an ISBT 128 data structure to support the management of acceptable pairs. Detailed consideration of this process is provided in *Technical Bulletin 5, Bar Code Scanner ISBT 128 Concatenation* (IG-008).

## 10.5 Commonly Concatenated Bar Code Pairs

The following is a list of bar code pairs that are commonly concatenated. The list is not exhaustive and the Standard allows any pair of ISBT 128 codes to be concatenated. Reference to the corresponding data structure is given in brackets.

* Donation Identification Number [001] and Blood Groups [ABO and RhD] [002].
* Product Code [003] and Expiration Date and Time [005].
* Donation Identification Number [001] and Product Code [003].
* Donation Identification Number [001] and Donor Identification Number [019].
* Container Manufacturer and Catalog Number [017] and Container Lot Number [018].
* Manufacturer and Catalog Number: Items Other Than Containers [021] and Lot Number: Items Other Than Containers [022].
* Patient Birth Date [024] and Patient Identification Number [025].

It is possible to concatenate other pairs of ISBT 128 bar codes and these can be specified within some scanner systems (see *Technical Bulletin 5, Bar Code Scanner Implementation of ISBT 128 Concatenation* (IG-008)).

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                     143

# 11 Blood Container Manufacturers
# Information Data File Specification

## 11.1 Introduction
The purpose of this data file is to provide a mechanism for electronically transferring information about blood container sets that will assist in process control. This data can be used to track and/or limit usage of the set; to verify that the product in the container is appropriate for the container; and to minimize the need for manual record keeping.

For the purposes of standardization, the data file structure, field definitions and formats, and default values are defined by ICCBBA.

Manufacturers are responsible for providing their own data files which are maintained in an electronic format available to their customers.

Data files are associated with a container set through the Container Manufacturer and Catalog Number [Data Structure 017] present on the base label of the container. The data file for each catalog number includes information that is:

Specific to the collection set:

* Number of containers in the set
* Intended use of each container (i.e., red cells, whole blood, plasma, platelets, or buffy coat)
* Nominal collection volume for the primary container (optional)
* Presence of fluids in containers that are not suitable for storage of blood or cellular therapy products (optional)

Specific to the container:

* Which container (red cell/whole blood, plasma, platelets, or buffy coat) within the set is being scanned
* Amount and type of fluid as supplied (anticoagulant, additive, etc.)
* Nominal, minimum, and/or maximum volume that each container is designed to hold (optional)
* Whether the container is downstream from a leukocyte reduction filter

Users may download into their information system the data file for each blood container catalog number purchased. With appropriate software, the catalog number bar code on a blood container can be scanned during use and linked to the data file to obtain or document a complete description of the set and containers. For example, by scanning the bar code on a whole blood collection set and linking it to the data file, the user can document the set manufacturer, the intended collection volume (e.g., 450 mL), the anticoagulant and its volume, and the number and type of attached containers.

The information in this data file is not intended as a specification of a container or a container set, but solely to provide process control information for use in blood collection management systems.

© 2004-2023 ICCBBA, All Rights Reserved                                    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                         144

# 11.2 Structure of the Data File
The data file structure specifies the field definitions and formats together with default values and lookup table references. Beginning with Version 05 of the Manufacturers Data File, the message structure may be in either an XML message or an ASCII text file using comma separated values (CSV). A separate data file shall be created for each catalog number. The structure shall comprise a header line, a variable number of data lines, and for CSV files, a footer line.

Each data line shall be identified by a data label indicating what information the line contains. Data labels, together with the format of the data content, shall be assigned by ICCBBA to ensure commonality across all suppliers. The data line shall also contain a container identification character to indicate which container in the set is being described. The container identification character shall be set to the hash/number symbol (#) for information common to the entire set.

The data file specification shall be version controlled with the version number being held in the header line.

Table 31 Header Line [RT031]

<table>
<tr><th>Field</th><th>Length</th><th>Format</th><th>Comment</th></tr>
<tr><td>1</td><td>8</td><td>alpha (8)</td><td>Fixed text “ICCBBAMF” identifies this as an ICCBBA-specified Manufacturers File format</td></tr>
<tr><td>2</td><td>2</td><td>numeric (2)</td><td>Two (2)-digit version number identifies the version of the data structure with which this message is compliant (currently all messages are 07, i.e., this version of the data file)</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           145

### Table 32 Data Lines [RT032]

<table>
<tr><th></th><th>Field</th><th>Length</th><th>Format</th><th>Comment</th></tr>
<tr><td>1</td><td>max 20</td><td>alphanumeric (max 20)</td><td>ICCBBA-defined data label (see Table 34)</td><td></td></tr>
<tr><td>2</td><td>1</td><td>alphanumeric or “#” (1)</td><td>Set to # for information relevant to the whole set, or the container identification character from the Container Manufacturer and Catalog Number [Data Structure 017] for information specific to all containers with this identification character in the set. Numeric and upper case alpha characters shall be used to identify individual containers within the set. 1 shall be reserved for the primary collection container of a whole blood set.</td><td></td></tr>
<tr><td>3</td><td>variable</td><td>alphanumeric (var)</td><td>Data content (see below). Data shall not contain the comma character as this is the field delimiter. Other non-alphanumeric characters used as default delimiters in HL7 messages should also be avoided (</td><td>^\~\&)</td></tr>
</table>

### Table 33 Footer Line [RT033]

<table>
<tr><th>Field</th><th>Length</th><th>Format</th><th>Comment</th></tr>
<tr><td>1</td><td>8</td><td>alpha (8)</td><td>fixed text “FILETERM”</td></tr>
<tr><td>2</td><td>variable</td><td>numeric</td><td>count of number of data lines in file</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 146

Table 34 ICCBBA-Assigned Data Labels and Content (Version 07) [RT034] (continued)

<table>
<tr><th>Data Label</th><th>Content</th><th>Format (max length)</th><th>Required *</th><th>Default Value</th><th>Application</th></tr>
<tr><td>MANUFACTURER</td><td>Identity of the container set manufacturer (uses the ICCBBA identification letters assigned in the Manufacturer Identifier Codes, see RT016)</td><td>Alpha (2)</td><td>M</td><td>N/A</td><td>Set</td></tr>
<tr><td>CATALOGNUMB</td><td>Manufacturer’s catalog number (seven data characters as read from Container Manufacturer and Catalog Number Data Structure)</td><td>Alphanumeric (7)</td><td>M</td><td>N/A</td><td>Set</td></tr>
<tr><td>CATNUMBTEXT</td><td>Manufacturer’s catalog number as printed in documentation</td><td>free format</td><td>M</td><td>N/A</td><td>Set</td></tr>
<tr><td>GS1GTIN</td><td>The GS1 Global Trade Item Number</td><td>Numeric (14)</td><td>O</td><td>N/A</td><td>Set</td></tr>
<tr><td>GS1GTINCONTENT</td><td>The number of items in the carton</td><td>Numeric (3)</td><td>O</td><td>N/A</td><td>Set</td></tr>
<tr><td>CONTAINERNUMB</td><td>Number of containers in set (when field 2 = #) or number of containers with specified container identification character (when field 2 = container identification character).</td><td>Numeric (2)</td><td>M</td><td>N/A</td><td>Set</td></tr>
<tr><td>COLLECTIONVOL</td><td>The nominal collection volume for whole blood collections (in mL)</td><td>Numeric (3)</td><td>O</td><td>N/A</td><td>Set</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 147

Table 34 ICCBBA-Assigned Data Labels and Content (Version 07) [RT034] (continued)

<table>
<tr><th>Data Label</th><th>Content</th><th>Format (max length)</th><th>Required *</th><th>Default Value</th><th>Application</th></tr>
<tr><td>CONTENT</td><td>The fluid content of the container as supplied (anticoagulant, additive, etc.)</td><td>select from ICCBBA lookup table‡</td><td>D</td><td>NONE</td><td>Container</td></tr>
<tr><td>CONTENTVOL</td><td>The volume of the fluid described in the CONTENT field (in mL)</td><td>Numeric (3)</td><td>O</td><td>N/A</td><td>Container</td></tr>
<tr><td>PLTCONTAINER</td><td>Indicator if this is a container suitable for the storage of platelets (liquid phase)</td><td>Y or N</td><td>D†</td><td>N</td><td>Container</td></tr>
<tr><td>PMACONTAINER</td><td>Indicator if this is a container suitable for the storage of plasma (liquid or frozen)</td><td>Y or N</td><td>D†</td><td>N</td><td>Container</td></tr>
<tr><td>RBCCONTAINER</td><td>Indicator if this is a container suitable for the storage of red cells (liquid phase)</td><td>Y or N</td><td>D†</td><td>N</td><td>Container</td></tr>
<tr><td>BFYCONTAINER</td><td>Indicator if this is a container suitable for the storage of buffy coat (liquid phase)</td><td>Y or N</td><td>D†</td><td>N</td><td>Container</td></tr>
<tr><td>PROCONLY CONTAINER</td><td>Indicator that this is a container suitable for in-process product only (not designed for storage of final product)</td><td>Y or N</td><td>D†</td><td>N</td><td>Container</td></tr>
<tr><td>LEUKREDFILTER</td><td>Indicates whether the container is downstream of a leukocyte reduction filter</td><td>Y or N</td><td>D†</td><td>N</td><td>Container</td></tr>
<tr><td>NOMINALVOLUME</td><td>The volume of final product that the container is designed to hold (in mL)</td><td>Numeric (4)</td><td>O</td><td>N/A</td><td>Container</td></tr>
</table>



<page_number>147</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 148

Table 34 ICCBBA-Assigned Data Labels and Content (Version 07) [RT034] (continued)

<table>
<tr><th>Data Label</th><th>Content</th><th>Format (max length)</th><th>Required *</th><th>Default Value</th><th>Application</th></tr>
<tr><td>MINVOL</td><td>The minimum amount of product that the container is designed to hold (in mL)</td><td>Numeric (4)</td><td>O</td><td>N/A</td><td>Container</td></tr>
<tr><td>MAXVOL</td><td>The maximum amount of liquid product the container is designed to hold (in mL)</td><td>Numeric (4)</td><td>O</td><td>N/A</td><td>Container</td></tr>
<tr><td>MAXFRZVOL</td><td>The maximum amount of frozen product the container is designed to hold (in mL)</td><td>Numeric (4)</td><td>O</td><td>N/A</td><td>Container</td></tr>
<tr><td>SOLN1</td><td>A solution (e.g., additive solution or pathogen inactivation solution) that is integrally attached to the set but not contained within a container designed to store blood components</td><td>Alphanumeric (7)</td><td>O</td><td>N/A</td><td>Set</td></tr>
<tr><td>SOLN1VOL</td><td>The volume (in mL) of Solution 1</td><td>Numeric (4)</td><td>O</td><td>N/A</td><td>Set</td></tr>
<tr><td>COMMENT</td><td>Field that is available for manufacturers to add comments; end-users are not expected to upload this information</td><td>Alpha (200)</td><td>O</td><td>N/A</td><td>Both</td></tr>
</table>

N/A = not applicable*; Y = yes; N = no
M = mandatory; O = optional (included at manufacturer’s discretion); D = default value applies if the data line is not present
† At least one of the PLTCONTAINER, PMACONTAINER, RBCCONTAINER, BFYCONTAINER , or PROCONLYCONTAINER fields shall be set to Y for each container type
‡ This table can be found in the definitions for Core Conditions in the ICCBBA document ISBT 128 Standard, Standard Terminology for Medical Products of Human Origin (ST-002) in the Technical Documentation area of the ICCBBA Website.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

<page_number>148</page_number>

ISBT 128 Standard Technical Specification v6.2.2 149

# 11.3 Container Identification Character
The container identification character used on blood containers can be implemented in two distinct ways. The option adopted by any particular manufacturer will depend upon their manufacturing process. It would not be appropriate for a customer to place a requirement on a manufacturer to adopt either of these options. The structure of the data file has been configured to accommodate both options and software systems should to be designed to accept both.

**Option 1:**
Each container in the set bears a unique container identification character. This is the simplest format, and each container will have a set of entries in the data file corresponding to its container identification character.

**Option 2:**
Each distinct container in a set bears a unique container identification character.
Where a set contains two or more containers that are identical in terms of their composition, purpose, and position in the configuration, then these containers may be given the same container identification character. In this case, the data field for the number of containers will indicate how many containers there are with the specified container identification character and there will be a single set of entries in the data file common to all these containers.

# 11.4 Further Guidance
Detailed information about implantation of the Manufacturers Data File, multiple examples of use, and example data files may be found in *Implementation Guide: Use of the Manufacturers Data File* (IG-015). This document may be found on the ICCBBA Website.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                           150

# 12 ICCBBA

## 12.1 Formation and Incorporation
ICCBBA was established in 1994 to support ISBT 128 and to assist in its implementation. ICCBBA was incorporated in the Commonwealth of Virginia in 1995, and is a 501(c)(3) not-for-profit organization.

ICCBBA is a Non-State actor in official relations with the World Health Organization (WHO).

## 12.2 Registration and Licensing
Each facility that implements ISBT 128, or plans to implement ISBT 128, and needs access to password-protected information from the ICCBBA Website, must register with ICCBBA. Specific requirements for registration and a form for this purpose may be found on the ICCBBA Website. Special arrangements are available for facilities in developing countries that wish to use ISBT 128 Donation Identification Numbers in an eye-readable format only.

Before implementing ISBT 128, each registered facility shall pay the annual license fee. The annual license fee is set by the ICCBBA Board of Directors to cover the anticipated expenses for the fiscal year for which the fee is assessed. It is invoiced to every registered facility at its last known address early in each calendar year. The terms under which ISBT 128 is licensed for use are provided in the ICCBBA License Agreement, a copy of which can be found on the ICCBBA Website.

ICCBBA assigns Facility Identification Numbers (FINs) to facilities for use in certain data structures. The FINs are published in the password-protected area of the ICCBBA Website. An organization may have more than one FIN if it is useful for its operational needs. See *Implementation Guide: ISBT 128 Facility Identification Number* (IG-034) for further information about assignment of FINs, inactivation of FINs, the process to follow when an organization changes its name, etc.

Each vendor whose products or services include software or instrumentation that assists in the reading, storing, interpreting, transferring, printing, or other manipulation of ISBT 128 data identifiers, data structures and/or databases, any product bearing an ISBT 128 data structure (e.g. bar code, RFID tag) or any part thereof, must register with ICCBBA and pay an annual licensing fee.

Vendor codes for manufacturers who encode their identities in Data Structure 017 or 021 are found on Table W1 [RT016] on the ICCBBA Website. Vendors may obtain codes by contacting the ICCBBA office.

## 12.3 Global Registration Identifier for Donors (GRID)
### Issuing Organization Number
Each organization that needs to assign a Global Registration Identifier for Donors must maintain a registration with ICCBBA. This may be done through the WMDA following instructions found in *ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules* (ST-015).

© 2004-2023 ICCBBA, All Rights Reserved                              www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2* 151

## 12.4 Code Assignment
All codes used in ICCBBA data structures are assigned by ICCBBA, except those codes designed specifically for national or local/facility use and the Facility-defined Product Code. Once assigned, the codes are kept in the appropriate reference table or database table. Reference tables and database tables are found in this document, other ISBT 128 standards documents, or on the ICCBBA Website.

## 12.5 Issuing Agency Identifier
ICCBBA has been recognized as an Issuing Agency of unique identifiers under ISO/IEC 15459. This standard specifies procedural requirements to maintain a non-significant, unique identifier for item management applications and outlines the obligations of the Registration Authority and Issuing Agencies.

The ICCBBA Issuing Agency Code (IAC) is **LI**.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 152

# Acronyms

ANSI American National Standards Institute
ASCII American Standard Code for Information Interchange
DIN Donation Identification Number
EBI European Bioinformatics Institute
EBMT European Group for Blood and Marrow Transplantation
EDI Electronic Data Interchange
FACT Foundation for the Accreditation of Cellular Therapy
FIN Facility Identification Number
FIN(P) FIN of the facility assigning the Product Code
FPC Facility-defined Product Code
GRID Global Registration Identifier for Donors
HLA Human Leukocyte Antigen
HL7 Health Level 7
ID Identification
IEC International Electrotechnical Commission
IMGT International ImMunoGeneTics project
ION Issuing Organization Number (for GRID)
ISCT International Society of Cellular Therapy
ISO International Organization for Standardization
JACIE Joint Accreditation Committee of ISCT and EBMT
MPHO Medical Products of Human Origin
NGO Nongovernmental Organization
OID Object Identifier
PDC Product Description Code
RDI Registration Donor Identifier
RFID Radio Frequency Identification
UTC Coordinated Universal Time
WHO World Health Organization
WMDA World Marrow Donor Association



<page_number>152</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                 153

# Glossary

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>Bar Code</td><td colspan="2">A symbolic representation of a data structure that also includes the symbology-specific start and stop codes.</td></tr>
<tr><td></td><td>Linear Bar Code</td><td>Single row of bars and spaces.
In this document, the unqualified use of “linear bar code” implies the use of Code 128 symbology with its associated modulo 103 check character.</td></tr>
<tr><td></td><td>2-D Symbol</td><td>Two-dimensional (2-D) pattern of data cells.
In this document, the unqualified use of “2-D symbol” implies the use of Data Matrix symbology.</td></tr>
<tr><td>Check Character</td><td colspan="2">A character used to ensure the accuracy of data. The value is calculated based on an algorithm applied to the data. Examples are the modulo 103 check character internal to Code 128, and the ISO/IEC 7064 modulo 37-2 check character appended to text that verifies accurate keyboard entry.</td></tr>
<tr><td>Collection Type</td><td colspan="2">A designation indicating why a product was collected.</td></tr>
<tr><td></td><td>Autologous</td><td>A product collected from an individual for his or her own use.</td></tr>
<tr><td></td><td>Dedicated</td><td>A product collected through an arrangement by the collecting facility to support a specific recipient on a frequent basis (for example, to ensure limited exposure to allogeneic products) when the collections occur more frequently than would normally be allowed.</td></tr>
<tr><td></td><td>Designated</td><td>A special product (for example, HLA-compatible) collected through an arrangement by the collecting facility to be used by a specific recipient (or for Cellular Therapy products, possibly a small group of recipients).</td></tr>
<tr><td></td><td>Directed</td><td>A product collected from an individual who presents to the collecting facility at the request of another person intending his/her product to be used by that person.</td></tr>
<tr><td></td><td>Family Reserved</td><td>A product collected from an individual that is reserved for use in the treatment of that individual or a member of his/her family with the consent of that individual or his/her representative. Crossover is not precluded if allowed by pertinent regulations, provided all necessary regulatory and consent requirements are satisfied.</td></tr>
</table>



<page_number>153</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                  www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                   154

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td></td><td>**Medical Exception**</td><td>A product collected from an individual who did not meet the usual eligibility criteria. Because of the special value of the product to a specified recipient (e.g., HLA type), a medical director or other authorizer has approved the collection for the specified recipient. An example would be a donor whose travel history would normally preclude him from donating. This category should not be used for biohazard collections.</td></tr>
<tr><td></td><td>**Replacement**</td><td>Replacement collection is defined by national authorities rather than by ICCBBA since the definition may vary by country.</td></tr>
<tr><td></td><td>**Research**</td><td>Product not intended for human application. Note: A future version will specify that this collection type should not be applied to product intended for clinical use. The term “research” has not been intended in the past for clinical use and in the future it will be explicitly defined as not intended for clinical use. After the new definition is in place, time will be given for backward compatibility.</td></tr>
<tr><td>**Concatenation**</td><td></td><td>A method by which the information held in two bar codes is combined in the scanner into a single string of data before being sent to the host computer. ISBT 128 places specific rules on the operation of concatenation which ensures that the two codes are adjacent to one another, hence allowing this feature to be used in label process control. (Note: ISBT 128 concatenation is a specific enhancement to the Code 128 Specification. See Chapter 10 for more information.)</td></tr>
<tr><td>**Container Set**</td><td></td><td>Any combination of containers, tubing, and other items as packaged by the manufacturer, intended for the collection of whole blood, apheresis, or cellular therapy procedures.</td></tr>
<tr><td>**Control Character**</td><td></td><td>A character inserted into a bar code to control the decoding process (such as that used to indicate a change in the Code 128 symbology subset). In most circumstances these are stripped by the scanner and not transmitted to the host.</td></tr>
<tr><td>**Data Character**</td><td></td><td>The individual ASCII characters that make up the data content.</td></tr>
<tr><td>**Data Content**</td><td></td><td>The characters in a data structure that encode the information for which the data structure is named. The data content does not include the data identifier. (The Donation Identification Number is an exception to this rule. See Section 2.4.1, page 25.)</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 155

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>Data Identifier</td><td>The first two or three characters in a data structure that identify the data structure. These will always be present when the data structure is used as a bar code, but may be omitted when the data structure is used in situations in which the data structure identity is unambiguously and explicitly defined. (The Donation Identification Number is an exception to this rule. The second character of the data identifier can never be dropped because it is also part of the data content. See Section 2.4.1, page 25.)</td><td></td></tr>
<tr><td>Data Structure</td><td>Information content comprising the data identifier and data content. When a data structure is represented as a bar code, the term data structure does not include the symbology-specific and always present start and stop codes, the modulo 103 check character, or any specified control characters.</td><td></td></tr>
<tr><td>Donation Event (Collection or Recovery)</td><td>The meaning of this term varies depending on the MPHO involved. National requirements should be consulted as they may provide specific guidance in the assignment of DINs.</td><td></td></tr>
<tr><td></td><td>Blood and Cellular Therapy Products from Peripheral Blood</td><td>A single session during which whole blood or blood product(s) are collected from a donor.</td></tr>
<tr><td></td><td>Marrow</td><td>A single session during which product(s) are collected from a donor. The session may include the use of multiple needles and/or collection containers.</td></tr>
<tr><td></td><td>Cord Blood</td><td>The collection of blood from the umbilical cord of one infant. For multiple births, the collection of blood from the umbilical cord of each child is considered a separate donation event and must be assigned a different DIN.</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                   156

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td></td><td>Tissue and Organs from a Deceased Donor</td><td>Two options exist:
1. The entire recovery event associated with one donor. This may include the activities of multiple recovery agencies over a period of time. In this situation, there is a national agreement that all recovery agencies will use the same DIN for a given donor. For example, over a period of time, organ, cardiac valve, ocular tissue, and musculoskeletal recovery teams obtain products from a donor. All products from this donor would have the same DIN. (This is the preferred option, where it is feasible.)

2. The recovery event associated with one donor and one recovery agency. Products collected by different recovery teams at different times would constitute separate events and each event would be assigned a different DIN.

During a transition from option 1 to option 2, or by a national decision, a hybrid situation may exist (e.g., all tissues may share the same DIN, but not organs).</td></tr>
<tr><td></td><td>Tissue or Organs from a Living Donor</td><td>A single session during which organs or tissues are procured.</td></tr>
<tr><td>Facility</td><td></td><td>An organization that is responsible for the collection/recovery, processing, and/or distribution of ISBT 128-encoded products.</td></tr>
<tr><td>Flag Character</td><td></td><td>Part of the data content of a data structure used in process control or data transmission checking. For ISBT 128, flag characters are used with the Donation Identification Number. Printed in eye-readable format, but distinguished in some manner from the representation of the other data characters.</td></tr>
<tr><td>ISBT 128</td><td></td><td>An international standard for the transfer of information associated with medical products of human origin. It provides for a globally unique donation numbering system, internationally standardized product definitions, and standard data structures for bar coding and electronic data interchange.</td></tr>
<tr><td>Julian Date</td><td></td><td>See Ordinal Number.</td></tr>
<tr><td>Label</td><td></td><td>An independent entity that may carry one or more bar codes and also provides eye-readable information about the product.</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved                                www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                          157

<table>
<tr><td></td><td>**Affixed Label**</td><td>A label that adheres in physical contact with the product container.</td></tr>
<tr><td></td><td>**Attached Label**</td><td>A label that is fastened securely to the product container by means of a tie-tag or comparable alternative.</td></tr>
<tr><td></td><td>**Accompanying Documentation**</td><td>Documentation containing product information that is together with the product, or is available to the appropriate individual(s) electronically, but is not affixed or attached to the product.</td></tr>
<tr><td></td><td>**Base Label**</td><td>The label placed on a container by a manufacturer. It carries the manufacturer’s identity, the catalog number of the container (or container set), and the lot number of the container (or container set) encoded as ISBT 128 data structures.</td></tr>
<tr><td></td><td>**Final Label**</td><td>Labeling as it appears on a product ready for release to another entity or for administration to a recipient.</td></tr>
<tr><td></td><td>**Partial Label**</td><td>A label that because of size or other constraints does not contain all the required information.</td></tr>
<tr><td>**Ordinal Number**</td><td></td><td>A system for maintaining dates that numbers the first day of the year (January 1) as 1 and the last (December 31) as 365 or 366 (in a leap year). Also known as **Julian Date**.</td></tr>
<tr><td>**Phenotype**</td><td></td><td>The observable expression of the genes inherited by a person that reflects the biological activity of the genes. In ISBT 128 coding of test results, the term phenotype includes predicted phenotypes based on genotyping where there is evidence in the literature to support such a prediction.</td></tr>
<tr><td>**Plasma Derivative**</td><td></td><td>A product that contains concentrated fractions of plasma proteins that have been separated using physical-chemical or other fractionation processes. It is made from pooling plasma from large numbers of donors and is traced based on the lot or batch number of the pooled product.</td></tr>
<tr><td>**Primary container**</td><td></td><td>The container into which the whole blood is drawn.</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                     158

<table>
<tr><th></th><th></th></tr>
<tr><td>Retired</td><td>A mechanism utilized by ICCBBA to phase out a data structure or code that has become outdated, inadequate, inappropriate, redundant, or discovered to be in error. Because data structures or codes may exist on the labels of products in inventories across the world, the data structures and codes must be retained in the database for backward compatibility. The date on which a data structure or code is retired will be noted in the document in which it appears. This date indicates the date on which ICCBBA recommended the data structure or code no longer be used for new products. Software should be written to recognize these codes, but not assign them to newly created products. It is understood that facilities need time to retire codes after ICCBBA has made its recommendation.</td></tr>
<tr><td>Satellite container</td><td>A container other than the primary container in a container set.</td></tr>
<tr><td>Transfer container</td><td>A container intended for post-manufacturing connection to a container set.</td></tr>
<tr><td>UTC</td><td>Coordinated Universal Time, similar to GMT (Greenwich Mean Time), marks the starting point of every time zone in the World. UTC does not change based on daylight saving (summer) time; thus, the relationship of local time to UTC changes if daylight saving (summer) time is observed.</td></tr>
</table>



<page_number>158</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                   159

# Appendix A: Donation Identification Number Check Character [K]

## A.1 Keyboard Entry Check Character

ISBT 128 Donation Identification Numbers utilize checksum characters based on the ISO 7064 Mod 37-2 algorithm. This appendix shows how to calculate the checksum character for any given Donation Identification Number. The calculation is based on the thirteen (13)-character DIN (i.e., excluding the leading “=” symbol and the flag characters).

The steps In the process are as follows:

1. For each character in the string determine its check value as required by ISO 7064 from Table 35;
2. For each character in the string determine its weighted check value by multiplying the check value from Table 35 by the nth power of 2 where n is the position of the character from the right hand end of the string;
3. Sum the weighted check values from step 2;
4. Find the modulus 37 value of the sum from step 3 (the value **remaining** when the weighted sum is divided by 37);
5. Subtract the value obtained in step 4 from 38;
6. Find the modulus 37 value of the result of step 5 (the value **remaining** when divided by 37);
7. The result of step 6 is the ISO/IEC modulus 37-2 checksum.
8. Using the value in Step 6, determine the check character by again referring to Table 35 (this time read the character from the value). This is the modulo 37-2 checksum character (referred to as K throughout this *Standard*).

Table 35 Mapping from Characters to ISO/IEC 7064 Check Values and Calculated Values to the Checksum Character [RT035]

<table>
<tr><th>Character</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>A</th><th>B</th><th>C</th></tr>
<tr><th>Value</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th></tr>
<tr><td>Character</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td></tr>
<tr><td>Value</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr>
<tr><td>Character</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td><td>*</td><td></td><td></td></tr>
<tr><td>Value</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td></td><td></td></tr>
</table>



<page_number>159</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 160

# Example of Calculation

**Donation Identification Number: G1234 17 654321**

<table>
<tr><th>Position from right (n)</th><th>2<sup>n</sup> (a)</th><th>Character</th><th>ISO 7064 value (step 1) (b)</th><th>Weighted value (step 2) (a x b)</th></tr>
<tr><td>13</td><td>8192</td><td>G</td><td>16</td><td>131072</td></tr>
<tr><td>12</td><td>4096</td><td>1</td><td>1</td><td>4096</td></tr>
<tr><td>11</td><td>2048</td><td>2</td><td>2</td><td>4096</td></tr>
<tr><td>10</td><td>1024</td><td>3</td><td>3</td><td>3072</td></tr>
<tr><td>9</td><td>512</td><td>4</td><td>4</td><td>2048</td></tr>
<tr><td>8</td><td>256</td><td>1</td><td>1</td><td>256</td></tr>
<tr><td>7</td><td>128</td><td>7</td><td>7</td><td>896</td></tr>
<tr><td>6</td><td>64</td><td>6</td><td>6</td><td>384</td></tr>
<tr><td>5</td><td>32</td><td>5</td><td>5</td><td>160</td></tr>
<tr><td>4</td><td>16</td><td>4</td><td>4</td><td>64</td></tr>
<tr><td>3</td><td>8</td><td>3</td><td>3</td><td>24</td></tr>
<tr><td>2</td><td>4</td><td>2</td><td>2</td><td>8</td></tr>
<tr><td>1</td><td>2</td><td>1</td><td>1</td><td>2</td></tr>
<tr><td>Step 3</td><td>sum of weighted values</td><td></td><td></td><td>146178</td></tr>
<tr><td>Step 4</td><td>modulo 37 (first MOD)</td><td></td><td></td><td>28</td></tr>
<tr><td>Step 5</td><td>subtract from 38</td><td></td><td></td><td>10</td></tr>
<tr><td>Step 6</td><td>modulo 37 (second MOD)</td><td></td><td></td><td>10</td></tr>
<tr><td></td><td>ISO/IEC 37-2 checksum</td><td></td><td></td><td>10</td></tr>
<tr><td></td><td>ISBT 128 check character (K)</td><td></td><td></td><td>A</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

*ISBT 128 Standard Technical Specification v6.2.2*                                    161

# A.2 Calculating Type 3 Flag Characters

1. To calculate Type 3 flag characters, follow the steps in Section A.1 to step 7.
2. To the ISO/IEC modulus 37-2 checksum obtained in step 7 of Section A.1, add 60.
   This gives the Type 3 flag characters.

For example, in the example used in Section A.1 (DIN = G1234 17 654321), the ISO/IEC 37-2 checksum is 10. The Type 3 flag characters would be 10 + 60, or 70. Thus the data content of Data Structure 001 for this DIN would be: G12341765432170.

Because Type 3 flag characters are not printed, this would appear as shown in Figure 18.

Figure 18 Use of Type 3 Flag Characters

The characters in this data structure are =G12341765432170 A For Type 3 flag characters, no text corresponding to the flag characters is printed.



<page_number>161</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 162

# A.3 Computer Programs for Calculating K Using ISO 7064

This is an *informative* section designed to assist programmers by giving two representative methods for the calculation of the ISO 7064 modulo 37-2 check character for the Donation Identification Number. Both use the “*Pure system recursive method*” for calculation of the check character, as documented in Section 7.1 of the ISO/IEC 7064 specification: “Information technology—Security techniques—Check character systems.”

**Programmers must validate that their programs and algorithms comply with the normative ISO/IEC 7064 2003 specification and good programming practice.**
Programs to generate the check character should also contain sufficient error checking to verify that the first character of the input Donation Identification Number is either an uppercase A–Z, or a digit 1–9 and that all subsequent characters in the input Donation Identification Number are digits.

The following PASCAL language function **ISOmod37_2** calculates and/or validates the ISO 7064 Mod 37-2 pure check character:

**function** ISOmod37_2(DonationInfo:**string**; K:**integer**) : **char**;
(*Calculate or validate ISO mode 37-2 pure check character*)
**function** ISOvalue(InputString:**string**; I:**integer**) : **integer**;
**begin** {Convert ASCII character value to ISO 7064 value in ral...36}
**case** InputString[I] **of**
‘0’ .. ‘9’: ISOValue := (**ord**(InputStrin–[I]) –‘48’);
‘A’ .. ‘Z’: ISOValue := (**ord**(InputStrin–[I]) –‘55’);
‘*’: ISOValue := 36;
**end**;
**end** {function ISOvalue};
**var**
J,Sum,CharValue,CheckValue : **integer**;
**const**
ISOCharTable : **string**[37] = ‘0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*’;
**begin**
Sum := 0;
**for** J:= 1 **to** K **do**
**begin**
CharValue := ISOvalue(DonationInfo,J);
Sum := ((Sum + CharValue)*2) **mod** 37;
**end**;
{*Check character value is defined to be congruent to 1 mod 37*}
CheckValue := (38 – Sum) **mod** 37;
ISOmod37_2 := ISOCharTable[CheckValue + 1];
**end** {function ISOmod 37_2};



<page_number>162</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 163

The following ‘C’ language function **CalculateMod37_2** also implements the “*Pure system recursive method*” documented in Section 7.1 of the ISO/IEC 7064: specification:

```
int CalculateISO7064Mod37_2(char *inputString)
{
int ch, sum, charValue, isDigit, isUpperAlpha;
static char iso7064ValueToCharTabl[] =
"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*";
// Read the characters from left to right.
For (sum = 0; ch = *inputString; inputString++)
{
// Ignore invalid characters as per ISO 7064.
isDigit = ((‘h’>= ‘0’) && (‘h’<= ‘9’));
isUpperAlpha = ((‘h’>= ‘A’) && (‘h’<= ‘Z’));
if (isDigit || isUpperAlpha)
{
// Convert the character to its ISO 7064 value.
If (isDigit)
charValue=‘c’ – ‘0’;
else
charValue=‘c’ – ‘A’ + 10;
// Add the character value to the accumulating sum,
// multiply by two, and do an intermediate modulus to
// prevent integer overflow.
Sum = ((sum + charValue) * 2) % 37;
}
}
// Find the value, that when added to the result of the above
// calculation, would result in a number who’s modulus 37
// result is equal to 1.
charValue = (38 – sum) % 37;
// Convert the value to a character and return it.
Return (iso7064ValueToCharTable[charValue]);
}
```

ICCBBA thanks Dr. Clive Hohberger for providing the PASCAL function ISOmod37_2, and Mr. Harold Boe for providing the C-language function CalculateISO7064Mod37_2.

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                               164

# Appendix B: ISBT 128 Standard
# Numbering of Versions of Documents
# and Databases

Databases and documents will be versioned.

**For documents:**
ISBT 128 Standard documents shall include a version control sheet within the document.
Versioning shall have three digits and be numbered as follows:

* The third digit shall be increased by one whenever minor typographical errors are corrected or when language is clarified.
* The second digit shall be increased by one and the third digit returns to zero whenever discrete new entries are made (e.g., a new data structure is inserted) or typographical errors with operational significance are corrected.
* The first digit shall indicate a major revision to the standard or to the document.

**For databases:**
Databases shall have a version control sheet that shall be maintained on the ICCBBA Website.

**For Product Description Code database:**
The Product Description Code database shall have a three-digit version number.
* The third digit shall be increased by one if the only change to the database is the addition of Product Description Codes or minor corrections (e.g., spelling) in existing codes.
* The second digit shall be increased by one and the third digit returns to zero if changes are made to other tables.
* The first digit shall tie the database to the controlling version of the *ISBT 128 Standard*,
  *Product Description Code Database* (ST-010). That is, if ST-010 is version 6.x.x, the
  database is version 6.y.y.

**For Special Testing database:**
The Special Testing database shall have a three-digit version number.
* The third digit shall be increased by one if a typographical error is corrected.
* The second digit shall be increased by one and the third returns to zero each time a new item is added.
* The first digit shall tie the database to the controlling version of the *ISBT 128 Standard*
  *Technical Specification* (ST-001). That is, if ST-001 is version 5.x.x, the database is
  version 5.y.y.

**For GRID Issuing Organization Number database:**
The Issuing Organization Number database shall have a two-digit version.
* The second digit shall be increased by one if facilities are added or information is changed (e.g., a status becomes inactive).
* The first digit shall tie the database to the controlling version of the *ISBT 128 Standard*
  *Global Registration Identifier for Donors: ION Database and GRID Rules* (ST-015). That is,
  if ST-015 is version 3.x.x, the database is version 3.y.

© 2004-2023 ICCBBA, All Rights Reserved                                       www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 165

**For Clinical Trials PDC database:**
The Clinical Trials PDC database shall have a three-digit version number.
* The third digit shall be increased by one if the only change to the database is a minor correction (e.g., spelling) to an existing code.
* The second digit shall be increased by one and the third digit returns to zero if there are additions of new PDCs or other revisions to an existing code (e.g., the PDC is retired).
* The first digit shall tie the database to the controlling version of the *ISBT 128 Standard, Use of Clinical Trials PDCs* (ST-022). That is, if ST-022 is version 1.x.x, the database is version 1.y.y.



<page_number>165</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                            166

# Appendix C: Label Examples

Note: A library of example labels from different countries is posted on the ICCBBA Website.
Additional label examples may be found in:
* ISBT 128 Standard, Labeling of Blood Components (ST-005)
* ISBT 128 Standard, Labeling of Cellular Therapy Products (ST-004)
* ISBT 128 Standard, Labeling of Human Tissues (ST-003)
* ISBT 128 Standard, Labeling of Ocular Tissue (ST-009)
* ISBT 128 Standard, Coding and Labeling of Medical Devices Using ISBT I28 (ST-011)
* ISBT 128 Standard, ISBT 128 and the Single European Code (SEC) (ST-012)
* ISBT 128 Standard, Labeling of Human Milk Banking Products (ST-013)

Standardized labels for organs for transplant and reproductive tissue have not yet been designed.

### Figure 19 Cellular Therapy Example Labels

Cellular Therapy Example Labels

© 2004-2023 ICCBBA, All Rights Reserved                                      www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2    167

<u>Figure 20</u> Blood Product Example Labels

Blood product label with linear barcodes, text, and RhD POSITIVE status

Blood product label with linear barcodes, a 2-D symbol, text, and Rh NEGATIVE status

Note: When a 2-D symbol containing information for multiple data structures is present with multiple linear bar codes, it is considered a “transition label”. Transition labels allow facilities receiving products time to develop the software capacity to read and interpret 2-D symbols. In this case, the location of the 2-D symbol may be nationally defined. In discussions of Technical Advisory Groups, the recommendation has been made to place such a 2-D symbol as close as possible to its eventual location. Thus, this example shows the 2-D symbol in the upper half of the label. This is not standardized and facilities may select a different location.

© 2004-2023 ICCBBA, All Rights Reserved                        www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                168

Blood label example

A9998 20 123456 8 E
Product: E4306V00
Apheresis
RED BLOOD CELLS

Store at 2C to 6C
Contains approx ___ mL ACD-A
VOLUNTEER DONOR

This area may be used for
additional national or regulatory
required text

Collection Facility:
Blood Collection Center
Anywhere, World

Ref: 1FE1234567

O
RhD POS

Exp: 31 MAY 2020 23:59
250 mL

Negative for:
C, E, K, Fya, Jka, S, Jsb
CMV, HbS

Lot: 4R12345678

Note: The design of a blood label with a 2-D symbol replacing a number of linear bar codes has been approved through the ICCBBA proposal process. However, computer software around the world may not be ready to read and interpret the compound message within the symbol. Therefore, the timing of implementation should be coordinated between blood suppliers and their customers. Implementation of this label format shall follow the requirements specified in the ISBT 128 Standard, Labeling of Blood Components (ST-005).

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2    169

# Figure 21 Human Tissue Example Labels

Label 1: SKIN, FULL WITH HYPODERMIS, Frozen, Decellularized, Radiation Sterilization, Pack 3, Store at <-20 C, Expiry Date: 2018-01-22, Product Code: T0326003, DIN: A9999 17 123456 8 9, Generis Tissue Bank, Anywhere, World

Label 2: Generis Tissue Bank, Donated Human Tissue. Passes USP <71> Sterility Tests. DESCR: Achilles Tendon with Bone Block, PRODUCT CODE: 550530, DIMEN: L:20.0cm T:9mm W:10mm, SERIAL #: 12345678912345, EXP: 23Jan2020, Store at room temperature, Tissue is recovered under aseptic conditions. Tissue is aseptically processed and passes USP <71> Sterility Tests. Trace amounts of processing agents may remain. See package insert for these, as well as for contraindications, warnings and preparation for use. FOR SINGLE PATIENT USE ONLY. 123 ANY STREET ANYTOWN, CA 92000 (800) 123-4567

ISBT 128 Portion of Label Non-ISBT 128 Bar Code

Label 3: SKIN, FULL WITH HYPODERMIS, Frozen, Decellularized, Radiation Sterilization, Pack 3, Store at <-20C, Expiry Date: 2018-01-22, Product Code: T0326003, DIN: A9999 17 123456 8 9, Generis Tissue Bank, Anywhere, World

Label 4: A9999 17 123654 9 Y, T300, Reliable Tissue Center, Anywhere Worldwide, FIT FOR CLINICAL USE, T0269000, 0180292359, TENDON, TIBIALIS POSTERIOR, FROZEN, LEFT, Expiry Date: 29 JAN 2018, If stored at -20 C or lower, See package insert for more information

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2    170

### Figure 22  Ocular Tissue Example Labels

GENERIS EYE BANK
Any Street, Anywhere, Worldwide
Data Matrix barcode DIN: A9999 17 345628 8 [★]
Product Code: V0006000
Processor: A9997
SINGLE PATIENT USE ONLY
NOT STERILE
Storage: 2 - 8 C

CORNEA
Anterior and Posterior Layers
Right

Expiration Date: 2017-01-18
Date|Time of Death: 2017-01-04 12:16
Date|Time of Preservation: 2017-01-04 14:29
See Product Insert

GENERIS EYE BANK
Any Street, Anywhere, Worldwide
Data Matrix barcode DIN: A9999 17 345658 8 [O]
Product Code: V0051000
SINGLE PATIENT USE ONLY
NOT STERILE
Storage: Room Temperature

SCLERA
Whole, Right
Saline

Expiration Date: 2022-06-02
Date|Time of Death: 2017-06-02 14:25
Date|Time of Preservation: 2017-06-03 16:54
See Product Insert

### Figure 23  Human Milk Example Labels

Data Matrix barcode Human Milk Pasteurized
For Nutritional Use

A9999 15 000001 [25] [M]
Split No. 13
Product Code: M0001013

Store at or below -30 C
Expires on 01 JAN 2016
Use within 24 hours of thawing

Data Matrix barcode A9999 18 000001 [25] [8]
Split No. 13
Product Code: M0001013

Human Milk Pasteurized
For Nutritional Use

Store at -30 C or Colder
Expires on 01 JAN 2019
Use within 24 hours of thawing

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 171

### Figure 24 Example Base Label

Example Base Label showing two barcodes with the text 2FE1234567 and 4R12345678 underneath them

This example represents the minimum amount of ISBT 128 information that shall appear on the base label. Manufacturers may include additional information such as:

* icons
* user friendly catalog numbers and lot numbers
* the intended use of the bag in text (e.g., For Platelet Storage)
* appropriate warnings (e.g., Not Suitable for Storage of Red Blood Cells or the number of days a platelet product can be stored within the container)

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 172

Figure 25 Example Small Base Label

0CH222V222 123F5678V0

This example represents the minimum amount of ISBT 128 information that shall appear on the base label. Manufacturers may include additional information such as:

* icons
* user friendly catalog numbers and lot numbers
* the intended use of the bag in text (e.g., For Platelet Storage)
* appropriate warnings (e.g., Not Suitable for Storage of Red Blood Cells or the number of days a platelet product can be stored within the container)

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                      173

# Appendix D: Cross-Reference for Table Numbers

Table 36 Cross-Reference for Table Numbers [RT036]

<table>
<tr><th>Reference Table Number</th><th>Table Number in ISBT 128 Standard Technical Specification or the Name of Document in which Table Appears or Website Reference</th><th>Name of Table in the ISBT 128 Standard Technical Specification or other ICCBBA Document (URL if the table is found on a Website)</th></tr>
<tr><td>RT001</td><td>Table 1</td><td>Code 128 Subset B Characters Available for Use as the Second Character of ISBT 128 Data Identifiers [RT001]</td></tr>
<tr><td>RT002</td><td>Table 30</td><td>Keyboard Entry Check Character Requirements for ISBT 128 Data Structures Utilizing Code 128 [RT002]</td></tr>
<tr><td>RT003</td><td>Table 2</td><td></td></tr>
<tr><td>RT004</td><td>Table 3</td><td>Data Structure 001: Donation Identification Number Flag Characters, ff [RT004]</td></tr>
<tr><td>RT005</td><td>Table 4</td><td>Data Structure 002: Blood Groups [ABO and RhD], Including Optional Type of Collection Information [RT005]</td></tr>
<tr><td>RT006</td><td>Table 5</td><td>Data Structure 002: Special Messages [RT006]</td></tr>
<tr><td>RT007</td><td>Table 6</td><td>Data Structure 002: Rh, Kell, and Mia/Mur Phenotypes [RT007]</td></tr>
<tr><td>RT008</td><td>Table 7</td><td>Data Structure 003: Type of Collection in 6th Position of Product Code [RT008]</td></tr>
<tr><td>RT009</td><td>Table 9</td><td>Data Structure 012: Special Testing: Red Blood Cell Antigens — General [RT009]</td></tr>
<tr><td>RT010</td><td>Table 10</td><td>Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish [RT010]</td></tr>
<tr><td>RT011</td><td>Table 12</td><td>Data Structure 012: Special Testing: Red Blood Cell Antigens — General, Positions 17 and 18: Erythrocyte Antigen Specified Has Been Tested for and Found Negative [RT011]</td></tr>
<tr><td>RT012</td><td>Table 13</td><td>Data Structure 013: Special Testing: Red Blood Cell Antigens — Finnish, Positions 17 and 18: Erythrocyte Antigen Specified Has Been Tested for and Found Negative [RT012]</td></tr>
</table>



<page_number>173</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                             www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 174

Table 36 Cross-Reference for Table Numbers [RT036] (continued)

<table>
<tr><th>Reference Table Number</th><th>Table Number in <i>ISBT 128 Standard Technical Specification</i> or the Name of Document in which Table Appears or Website Reference</th><th>Name of Table in the <i>ISBT 128 Standard Technical Specification</i> or other ICCBBA Document (URL if the table is found on a Website)</th></tr>
<tr><td>RT013</td><td>Table 14</td><td>Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens, Positions 1 through 8 [RT013]</td></tr>
<tr><td>RT014</td><td>Table 15</td><td>Data Structure 014: Special Testing: Platelet HLA and Platelet-Specific Antigens, Positions 9 through 16 [RT014]</td></tr>
<tr><td>RT015 [RETIRED]</td><td>Table 17</td><td>Data Structure 015: Special Testing: HLA-A and –B Alleles, Position 17 (CMV Antibody Status) [RT015]</td></tr>
<tr><td>RT016</td><td>ICCBBA Website</td><td>Data Structures 0017 and 021 W1 Manufacturer ID Codes https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>RT017</td><td>ICCBBA Website</td><td>Data Structure 023: W2 ICCBBA-Specified Compound Messages (previously called Structured Compound Messages) https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>RT018</td><td>ICCBBA Website</td><td>Data Structures 024 and 025: Patient Date of Birth and Patient Identification Number, Location Code https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>RT019</td><td>Table 18</td><td>Data Structure 027: Transfusion Transmitted Infection Marker [RT019]</td></tr>
<tr><td>RT020</td><td>ISBT 128 Standard, Labeling of Blood Components (ST-005)</td><td>Positioning Bar Codes on Base Labels [RT020]</td></tr>
<tr><td>RT021</td><td>ISBT 128 Standard, Labeling of Blood Components (ST-005)</td><td>Positioning Bar Codes on 50 mm x 75 mm Containers [RT021]</td></tr>
<tr><td>RT022</td><td>ISBT 128 Standard, Labeling of Blood Components (ST-005)</td><td>Final Label Quadrants and Bar Codes [RT022]</td></tr>
<tr><td>RT023</td><td>ISBT 128 Standard, Labeling of Blood Components (ST-005)</td><td>Required Positioning of Bar Codes on Final Labels [RT023]</td></tr>
</table>



<page_number>174</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                 175

Table 36 Cross-Reference for Table Numbers [RT036] (continued)

<table>
<tr><th>Reference Table Number</th><th>Table Number in ISBT 128 Standard Technical Specification or the Name of Document in which Table Appears or Website Reference</th><th>Name of Table in the ISBT 128 Standard Technical Specification or other ICCBBA Document (URL if the table is found on a Website)</th></tr>
<tr><td>RT024</td><td>ISBT 128 Standard, Labeling of Blood Components (ST-005)</td><td>Recommended Positioning of Bar Codes on Final Labels [RT024]</td></tr>
<tr><td>RT025 (Retired)</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>CLASS Table [RT025]</td></tr>
<tr><td>RT026 (Retired)</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>ATTRIBUTE Table [RT026]</td></tr>
<tr><td>RT027 (Retired)</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>PRODUCT DESCRIPTION Table [RT027]</td></tr>
<tr><td>RT028</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Version Table Field Definitions [RT028]</td></tr>
<tr><td>RT029</td><td>Table 27</td><td>Special Testing: General [RT029]</td></tr>
<tr><td>RT030</td><td>Table 29</td><td>Registered Facilities [RT030]</td></tr>
<tr><td>RT031</td><td>Table 31</td><td>Header Line [RT031]</td></tr>
<tr><td>RT032</td><td>Table 32</td><td>Data Lines [RT032]</td></tr>
<tr><td>RT033</td><td>Table 33</td><td>Footer Line [RT033]</td></tr>
<tr><td>RT034</td><td>Table 34</td><td>ICCBBA-Assigned Data Labels and Content (Version 07) [RT034]</td></tr>
<tr><td>RT035</td><td>Table 35</td><td>Mapping from Characters to ISO/IEC 7064 Check Values and Calculated Values to the Checksum Character [RT035]</td></tr>
<tr><td>RT036</td><td>Table 36</td><td>Cross-Reference for Table Numbers [RT036]</td></tr>
<tr><td>RT037</td><td>Table 19</td><td>Data Structure 029: Symbols [RT037]</td></tr>
<tr><td>RT038</td><td>Table 20</td><td>Data Structure 029: Dimensions [RT038]</td></tr>
<tr><td>RT039</td><td>Table 21</td><td>Data Structure 029: Decimal Point [RT039]</td></tr>
<tr><td>RT040</td><td>Table 22</td><td>Data Structure 030: RBC Serological Results [RT040]</td></tr>
<tr><td>RT041</td><td>Table 23</td><td>Data Structure 030: Number of Tests [RT041]</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved                                             www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                    176

Table 36 Cross-Reference for Table Numbers [RT036] (continued)

<table>
<tr><th>Reference Table Number</th><th>Table Number in <i>ISBT 128 Standard Technical Specification</i> or the Name of Document in which Table Appears or Website Reference</th><th>Name of Table in the <i>ISBT 128 Standard Technical Specification</i> or other ICCBBA Document (URL if the table is found on a Website)</th></tr>
<tr><td>RT042</td><td>ICCBBA website</td><td>ISBT 128 Data References for use in Electronic Messages [RT042] https://www.isbt128.org/uri/</td></tr>
<tr><td>RT043</td><td>Table 28</td><td>Version Table (Special Testing) [RT043]</td></tr>
<tr><td>RT044</td><td>Table 16</td><td>Data Structure 014: Special Testing: Platelet HLA and Platelet Specific Antigens, Position 18 [RT044]</td></tr>
<tr><td>RT045</td><td>Table 24</td><td>Data Structure 031: Time Zone [RT045]</td></tr>
<tr><td>RT046</td><td>Table 25</td><td>Data Structure 031: Type of Time [RT046]</td></tr>
<tr><td>RT047</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Categories Table Field Definitions [RT047]</td></tr>
<tr><td>RT048</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Subcategories Table Field Definitions [RT048]</td></tr>
<tr><td>RT049</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Classes Table Field Definitions [RT049]</td></tr>
<tr><td>RT050</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Modifiers Table Field Definitions [RT050]</td></tr>
<tr><td>RT051</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Class Modifier Combinations Table Field Definitions [RT051]</td></tr>
<tr><td>RT052</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Attribute Groups Table Field Definitions [RT052]</td></tr>
<tr><td>RT053</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Attribute Values Table Field Definitions [RT053]</td></tr>
</table>



<page_number>176</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                         www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                                  177

Table 36 Cross-Reference for Table Numbers [RT036] (continued)

<table>
<tr><th>Reference<br>Table<br>Number</th><th>Table Number in<br>ISBT 128 Standard<br>Technical<br>Specification or the<br>Name of Document<br>in which Table<br>Appears or Website<br>Reference</th><th>Name of Table in the ISBT 128 Standard<br>Technical Specification or other ICCBBA<br>Document<br>(URL if the table is found on a Website)</th></tr>
<tr><td>RT054</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Product Description Codes Table Field Definitions [RT054]</td></tr>
<tr><td>RT055</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Modifier Category Map Table Field Definitions [RT055]</td></tr>
<tr><td>RT056</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Product Attribute Map Table Field Definitions [RT056]</td></tr>
<tr><td>RT057 (Retired)</td><td>ISBT 128 Standard, Product Description Code Database (ST-010)</td><td>Attr Old New Map [RT057]</td></tr>
<tr><td>RT058</td><td>ICCBBA Website</td><td>Facility Type Codes Used in the Registered Facilities Database [https://www.isbt128.org/p-databases-ref-tables](https://www.isbt128.org/p-databases-ref-tables)</td></tr>
<tr><td>RT059</td><td>ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules (ST-015)</td><td>GRID Issuing Organization Database Structure [RT059]</td></tr>
<tr><td>RT060</td><td>ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules (ST-015)</td><td>Version Table (ION Database) [RT060]</td></tr>
<tr><td>RT061</td><td>ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules (ST-015)</td><td>Character to ISO/IEC 7064 Check Values [RT061]</td></tr>
<tr><td>RT062</td><td>ISBT 128 Standard Labeling of Cellular Therapy Products (ST-004)</td><td>Positioning of Bar Codes on a 100 mm by 100 mm Cellular Therapy Label</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved                                     www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 178

Table 36 Cross-Reference for Table Numbers [RT036] (continued)

<table>
<tr><th>Reference Table Number</th><th>Table Number in ISBT 128 Standard Technical Specification or the Name of Document in which Table Appears or Website Reference</th><th>Name of Table in the ISBT 128 Standard Technical Specification or other ICCBBA Document (URL if the table is found on a Website)</th></tr>
<tr><td>RT063</td><td>ISBT 128 Standard Labeling of Cellular Therapy Products (ST-004)</td><td>Recommended Bar Code Alignment on a 100 mm x 100 mm Cellular Therapy Label</td></tr>
<tr><td>RT064</td><td>ICCBBA website</td><td>Product Description Codes (PDC Database) https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>RT065</td><td>ICCBBA website</td><td>Registered Facilities Database https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>RT066</td><td>ICCBBA website</td><td>List of Coding Reference Tables [RT066] https://www.isbt128.org/urirt/</td></tr>
<tr><td>RT067</td><td>ICCBBA website</td><td>Data Structure Data Elements [RT067] https://www.isbt128.org/urids/</td></tr>
<tr><td>RT068</td><td>ICCBBA website</td><td>Special Testing General Codes [RT068] https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>RT500</td><td>ICCBBA website</td><td>ABO and RhD Coding Values https://www.isbt128.org/p-databases-ref-tables</td></tr>
<tr><td>[RETIRED]</td><td>Table 8</td><td>Data Structure 011: Special Testing: Red Blood Cell Antigens, Positions 1 Through 9 [RETIRED]</td></tr>
<tr><td>[RETIRED]</td><td>Table 11</td><td>Data Structure 011: Special Testing: Red Blood Cell Antigens, Positions 17 and 18: Erythrocyte Antigen Specified Has Been Tested and Found Negative [RETIRED]</td></tr>
</table>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                               179

# Index

ABO
 Bar code concatenation, 142
 Data Structure 002, 28
 Special message codes, 89
Attribute
 Label example, 128
 Product code data structure, 30
Bar Code Requirements
 2-D, 120
 Linear, 118
Bar Code Size
 X dimension, 118
Bar codes
 2-D, 120
Blood Groups [ABO and RhD]
 Data Structure 002, 28
Check Character
 Calculation of Modulo 37,2 character, 159
 Computer programs for calculating, 162
 Keyboard entry, 132
 requirement table, 133
 Type 3 flag
 Codes, 85
CMV
 Special Testing
 General Data Structure, 40
 Special Testing Platelets HLA and Platelet
 Specific Antigens, 44
 Special Testing Red Blood Cell Antigens Data
 Structure 012, 41, 42
 Special Testing Red Cell Antigens Finnish
 Data Structure 013, 43
Code 128, 118
Collection Date
 Data Structure 006, 36
Collection Date and Time
 Data Structure 007, 37
Collection Type
 Coding in Product Code Data Structure, 91
Compound Message
 Data Structure 023, 57
Concatenation
 Controlling the process, 141
 Definition, 154
 Output string, 141
 Temporal and spatial constraints, 140
 Verification, 141
Confidential Unit Exclusion Status
 Nationally-specified, 84

Container Manufacturer and Catalog
 Number
 Data Structure 017, 49
 **Printing**, 126, 127
Data Identifiers, 14
 Data structures index, 18
 Definition, 155
 List of available ISBT 128 data identifiers, 16
 Role in ISBT 128, 17
Data Matrix, 120
Data Structures
 Background, 14
 Blood Group [002], 28
 Collection Date [006], 36
 Collection Date and Time [007], 37
 Compound Message [023], 57
 Container Lot Number [018], 51
 Container Manufacturer and Catalog Number
 [017], 49
 Dimensions [029], 65
 Donation Identification Number [001], 25
 Donor Identification Number [019], 52
 Expiration Date [004], 33
 Expiration Date and Time [005], 35
 Expiration Month and Year [026], 61
 Flexible Date and Time [031], 69
 For Local or Regional Use, 83
 Global Registration Identifier for Donors, 79
 Infectious Markers [027], 62
 Lot Number
 Items Other Than Containers [022], 56
 Manufacturer and Catalog Number
 Items Other Than Containers [021], 55
MPHO Lot Number [035], 77
MPHO Supplemental Identification Number
 [036], 78
Nationally-specified Confidential Unit
 Exclusion Status, 84
Nationally-specified Donor Identification
 Number, 84
Patient Date of Birth [024], 59
Patient Identification Number [025], 60
Processing Facility Information Code [033],
 73
Processor Product Identification Code [034],
 75
Product Code [003], 30
Product Consignment [028], 63
Product Divisions [032], 71
Production Date [008], 38
Production Date and Time [009], 39

© 2004-2023 ICCBBA, All Rights Reserved                                          www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 180

Red Cell Antigens with Test History [030], 67
Single European Code [Data Structure 038], 80
Special Testing
 HLA-A and -B Alleles [015], 46
 HLA-DRB1 Alleles [016], 48
 Platelet HLA and Platelet Specific Antigens [014], 44
 Red Blood Cell Antigens (Retired) [011], 41
 Red Blood Cell Antigens General [012], 42
 Red Blood Cell Antigens—Finnish [013], 43
Special Testing General [010], 40
Staff Member Identification Number [020], 54
Table, 18
Database Tables
 Facility Identification Number, 116, 117
 Grid Issuing Organization Identification Number, 117
 Product Description Code, 113
 Special Testing General, 115
Dates
 Printing, 129
Delivery Mechanisms, 118
 Code 128, 118
 EDI, 121
Dimensions
 Data Structure 029, 65
Dimensions codes, Data Structure 029, 109
Divided Products, 136
 Product code data structure
  Blood, 32
  Cellular therapy, 32
  Tissues, 32
Donation Identification Number
 [Data Structure 001], 25
 Printing, 124
Donor Identification Number
 Data Structure 019, 52
 Nationally-specified, 84
Electronic Messaging, 121
Expiration Date
 Concatenation, 142
 Data Structure 004, 33
 Multiple bar codes in lower right quadrant, 122
Expiration Date and Time
 Data Structure 005, 35
Expiration Month and Year
 Data Structure 026, 61
Facility Identification Number
 Database table, 116, 117
 Donor Identification Number Data Structure, 52

Processing Facility Information Code Data Structure, 73
Processor Product Identification Code Data Structure, 75
Product Consignment Data Structure, 63
Staff Member Identification Number Data Structure, 54
Final Label
 Text Requirements, 127
Flag Characters
 Calculating Type 3 Flag Charact, 161
 Coding and interpretation, 85
 Non-numeric presentation, 125
 Numeric presentation, 124
 Printing, 124
 Technical Bulletin 7, 26
Flexible Date and Time
 Data Structure 031, 69
Global Registration Identifier for Donors
 Data Structure 037, 79
Global Trade Number, 135
GRID Issuing Organization Identification Number, 79, 81, 117
GS1, 135
HLA
 Check Character
  Keyboard entry, 132, 133
  codes for data structure 014, 102
 Data Structure [015] HLA-A and -B Alleles
  For tissues and cellular therapy, 46
 Data Structure [016] HLA-DRB1
  For tissues and cellular therapy, 48
 Platelets coding
  Examples of Use, 137
ICCBBA
 History, 150
Infectious Markers
 Codes, 107
 Data Structure 027, 62
 Example of use, 139
Kell
 coding in ABO/RhD data structure, 90
Label Design
 General principles, 122
Labels, 122
Linear bar codes, 118
Locally Defined Data Structures, 83
Manufacturer’s Information
 Blood container manufacturers information data file, 143
 Container Lot Number
  Data Structure 018, 51
 Container Manufacturer and Catalog Number
  Data Structure 017, 49


<page_number>180</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                              181

Lot Number Items Other Than Containers
 Data Structure 022, 56
Manufacturer and Catalog Number Items
 Other Than Containers
 Data Structure 021, 55
Miltenberger
 coding in ABO/RhD data structure, 90
MPHO Lot Number
 Data Structure 035, 77
MPHO Supplemental Identification Number
 Data Structure 036, 78
Nationally Specified Confidential Unit
 Exclusion Status, 84
Nationally Specified Donor Identification
 Number, 84
Nominal X Dimension, 118
Outer Package Labeling, 135
Patient Date of Birth
 Data Structure 024, 59
Patient Identification Number
 Data Structure 025, 60
Processing Facility Information Code
 Data Structure 033, 73
Processor Product Identification Code
 Data Structure 034, 75
Product Code
 Data Structure 003, 30
Product Consignment
 Data Structure 028, 63
Product Divisions
 Data Structure 032, 71
Production Date
 Data Structure 008, 38
Production Date and Time
 Data Structure 009, 39

Quiet Zones, 119
Red Cell Antigen Coding
 Examples of use, 136
Red cell antigen with history codes, 110
Red Cell Antigens
 Coding Finnish for Data Structure 013, 97
 Coding for Data Structure 012, 95
Red Cell Antigens – Finnish
 Coding for Data Structure 013, 101
Red Cell Antigens with Test History
 Data Structure 030, 67
Regionally Defined Data Structures, 83
RhD
 Bar code concatenation, 142
 Coding in ABO/RhD data structure, 90
 Data Structure 002, 28
 Special messages, 89
Single European Code
 Data Structure 038, 80
Special Testing
 Platelet HLA and Platelet Specific Antigens
 Data Structure 014, 44
 HLA-A and _B Alleles
 Data Structure 015, 46
 General
 Data Structure 010, 40
 HLA-DRB1 Alleles
 Data Structure 016, 48
 Red Blood Cell Antigens–Finnish
 Data Structure 013, 43
 Red Cell Antigens General
 Data Structure 012, 42
Staff Member Identification Number
 Data Structure 020, 54
X Dimension, 118



<page_number>181</page_number>

© 2004-2023 ICCBBA, All Rights Reserved    www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2                                      182

END OF PUBLICATION

FOR ICCBBA USE ONLY

These links are for internal document control and cannot be used externally:

ST-003 ISBT 128 Standard Labeling of Human Tissues
ST-004 ISBT 128 Standard Labeling of Cellular Therapy Products
ST-005 ISBT 128 Standard Labeling of Blood Components
ST-009 ISBT 128 Standard Labeling of Ocular Tissue
ST-010 ISBT 128 Standard Product Description Code Database
ST-011 ISBT 128 Standard Coding and Labeling of Medical Devices using ISBT 128
ST-012 ISBT 128 and the Single European Code (SEC)
ST-013 ISBT 128 Standard Labeling of Human Milk Banking Products
ST-015 ISBT 128 Standard Global Registration Identifier for Donors: ION Database and GRID Rules
ST-016 ISBT 128 Standard Labeling of Medical Products of Human Origin with INN and USAN Nonproprietary Names
ST-017 ISBT 128 Standard Coding and Labeling of Medical Devices Containing MPHO
ST-018 ISBT 128 Standard Labeling of Collection Products for Cellular Therapy Manufacturing
ST-019 ISBT 128 Standard Labeling of Reproductive Tissue and Cell Products
ST-020 ISBT 128 Standard for XML
ST-022 ISBT 128 Standard Use of Clinical Trials Product Description Codes (PDCs)
ST-023 ISBT 128 Standard for Base Labels
ST-026 ISBT 128 Standard for the Medical Products of Human Origin (MPHO) Unique Identifier
ST-027 ISBT 128 Dictionary of Standard Data Elements
ST-028 ISBT 128 Standard Chain of Identity Identifier

IG-008 Technical Bulletin 5: Bar Code Scanner Implementation of ISBT 128 Concatenation
IG-010 Use of Flags in the Donation Identification Number for Process Control of Critical Points during Processing and Distribution
IG-013 ISBT 128 Bar Codes: Valid and Invalid Examples
IG-014 Use of Data Matrix Symbols with ISBT 128
IG-015 Use of the Manufacturers Data File
IG-017 Length of the Product Code Bar Code and Concatenation
IG-019 Manufacturer's Catalog Number and Lot Number (NOT Containers)
IG-020 Encoding Product Information [Data Structures 003, 032, 033, and 034] - Tissues
IG-021 Use of Product Code [Data Structure 003] - Blood
IG-022 Product Coding [Data Structures 003 and 032] - Cellular Therapy
IG-023 Use of Product Divisions [Data Structure 032]
IG-024 Use of Flexible Date and Time [Data Structure 031]
IG-026 Use of Dimensions [Data Structure 029]
IG-027 Use of Red Cell Antigens with Test History Data Structure [030]
IG-029 Choosing an On-Demand Label Printer
IG-031 Use of the Processing Facility Information Code [Data Structure 033]
IG-032 Use of Product Code [Data Structure 003] - Ocular Tissue
IG-033 Use of the Donation Identification Number [Data Structure 001]
IG-034 ISBT 128 Facility Identification Number
IG-041 Use of ISBT 128 in Resource-Limited Countries
IG-043 A Validation Tool for ISBT 128 Data Structures


<page_number>182</page_number>

© 2004-2023 ICCBBA, All Rights Reserved                                     www.isbt128.org

ISBT 128 Standard Technical Specification v6.2.2 183

IG-045 Applying ISBT 128 Labels to Collection Products for Further Manufacture
IG-046 Shipping ISBT 128 Labeled Products Through a GS1 Supply Chain

JP-003 Blood Bag Identification Using ISBT 128 and GS1
JP-004 Assigning a Patient Identification Number

IN-003 ISBT 128 for Blood Components, An Introduction
IN-005 ISBT 128 for Cellular Therapy, An Introduction
IN-007 ISBT 128 for Tissues, An Introduction
IN-015 An Introduction to ISBT 128 - English
IN-017 An Introduction to ISBT 128 - Arabic
IN-019 An Introduction to ISBT 128 - Chinese
IN-021 An Introduction to ISBT 128 - French
IN-023 An Introduction to ISBT 128 - Russian
IN-023 An Introduction to ISBT 128 - Russian
IN-026 An Introduction to ISBT 128 - Spanish
IN-028 An Introduction to ISBT 128 - Portuguese
IN-031 ISBT 128 For Human Milk, An Introduction
IN-032 ISBT 128 for Organs, An Introduction
IN-032 ISBT 128 for Organs, An Introduction



<page_number>183</page_number>

© 2004-2023 ICCBBA, All Rights Reserved www.isbt128.org