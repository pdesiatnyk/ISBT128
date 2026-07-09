# ISBT 128 Data Structures — Implementer Spec

**Source of truth:** `documents/iccbba.md` — ISBT 128 Standard Technical Specification, ICCBBA
ST-001, Version 6.2.2 (April 2023). All section/table/page citations below (e.g. "§2.4.1", "Table 9",
"page 95") refer to this document unless otherwise noted. This file is a structured, implementer-ready
extraction intended to be the **single source of truth** for both the C# and TypeScript parser
implementations — it should not be necessary to re-open `iccbba.md` during implementation.

This document was produced per `.claude/prompts/isbt128-parser-implementation-prompt.md` (see that
file for the overall project scope, resolved open questions, and non-goals).

Large lookup tables (blood group codes, antigen tables, TTI marker table, checksum table, etc.) are
reproduced **verbatim** below, using the same HTML-in-markdown `<table>` markup found in the source
document, to eliminate transcription risk — these are the tables meant to become lookup
tables/enums/dictionaries in code. Where the source document's own PDF→text conversion left ambiguous
merged-cell structure (noted inline), the raw markup is preserved and the ambiguity is flagged rather
than silently "resolved" by guesswork.

---

## Table of Contents

1. [Data Identifier Rules & Disambiguation](#1-data-identifier-rules--disambiguation)
2. [Table 2 — Index of Data Structures \[RT003\]](#2-table-2--index-of-data-structures-rt003-23)
3. [Per-Structure Field Layouts (§2.4.1–§2.4.40, §2.5)](#3-per-structure-field-layouts)
4. [Embedded Reference Tables (§3.1)](#4-embedded-reference-tables-31)
5. [Appendix A — DIN Check Character \[K\]](#5-appendix-a--din-check-character-k)
6. [§10 — Bar Code Concatenation Rules](#6-10-bar-code-concatenation-rules)
7. [Appendix C — Label Examples / Test Fixtures](#7-appendix-c--label-examples--test-fixtures)
8. [§9 — Worked Coding/Decoding Examples](#8-9-worked-codingdecoding-examples)

---

## 1. Data Identifier Rules & Disambiguation

Source: §2.1 (page 14–17), §2.2 (page 17), Table 1 [RT001] (page 16).

### 1.1 General rule

Every ISBT 128 data structure has a **data identifier (DI)** of 2 or 3 ASCII characters, followed by
fixed-length **data content**.

- The **first DI character** is always `=` (ASCII 61) or `&` (ASCII 38). These two characters are
  reserved by ANSI (ANSI MH10.8.2:2010) exclusively for ISBT 128.
- In ICCBBA internationally-defined data structures, the **second DI character** is a
  non-alphanumeric ASCII character (see Table 1 below for the legal set) — **except** for DIN
  [001] (see §1.2).
- Some data structures have a **third DI character**, which is alphanumeric (see §1.3).
- DI pairs whose first char is `&` and second char is in `a`–`z` are reserved for **non-ICCBBA
  (nationally/regionally/facility) defined** data structures (§2.5.1) — length and content are not
  standardized; treat as opaque (see §3.6 below and §2.5 field layout).
- The DI pairs `&;` and `&!` are "hybrid" structures: ICCBBA-defined *context* (donor ID / unit
  exclusion status) but **non-ICCBBA-defined structure** — content layout is nationally defined
  (§2.5.2, §2.5.3).

### 1.2 Special case: DIN [Data Structure 001]

> "This is the only data structure in which the second character of the data identifier shall be
> part of the data content." (§2.4.1)

- First DI char: `=`.
- Second DI char (**α**): alphanumeric `{A–N; P–Z; 1–9}` — i.e. any uppercase letter except `O`, plus
  digits 1–9, but **not** `0` and **not** any lowercase letter. This makes DIN structurally
  distinguishable from every other `=`-prefixed structure, because all other `=` structures use a
  **non-alphanumeric** second DI character (per Table 1 [RT001]).
- Consequence for a scanning parser: after reading `=`, if the next character is one of
  `{A-N, P-Z, 1-9}` (alphanumeric, excluding `O` and `0`), the segment **must** be DIN [001]; that
  character is simultaneously DI-char-2 *and* data-content-char-1 (`α` of `αppppyynnnnnnff`). Total
  consumed length for DIN = 1 (`=`) + 15 (`αppppyynnnnnnff`) = **16 characters**, i.e. the DI is
  logically 2 chars but only 1 of those 2 chars (`=`) is *not* reused as content.
  If the next character after `=` is instead a non-alphanumeric character from Table 1, look it up
  as an ordinary 2-character DI in Table 2.

### 1.3 Three-character DI structures

Only two families of data structures use a 3-character DI in this document:

| DI (2 chars) | 3rd char | Full DI | Data Structure | Notes |
|---|---|---|---|---|
| `&,` | `1` | `&,1` | 035 — MPHO Lot Number | |
| `&,` | `2` | `&,2` | 036 — MPHO Supplemental Identification Number | |
| `&,` | `3` | `&,3` | 037 — Global Registration Identifier for Donors **[RETIRED]** | replaced by 039 |
| `&,` | `4` | `&,4` | 038 — Single European Code (SEC) | electronic/DS038 form; see ST-012 |

Disambiguation rule: whenever the scanner reads DI-chars `&,` (ampersand + comma), it **must** read one
more character to determine the data structure — `1`/`2`/`3`/`4` are the only legal third characters,
selecting 035/036/037/038 respectively. There is no valid 2-character `&,` data structure.

This 3-char family must also be disambiguated from **Product Divisions [032]**, whose DI is `=,`
(**equals**-comma, not ampersand-comma) — first character differs (`=` vs `&`), so no ambiguity exists
between `=,dddddd` (032) and `&,1…`/`&,2…`/`&,3…`/`&,4…` (035/036/037/038) provided the parser always
checks the first DI character first.

Full comparison of the "comma" DI family:

| Full DI | 1st char | 2nd char | 3rd char | Data Structure |
|---|---|---|---|---|
| `=,` | `=` (61) | `,` (44) | N/A (2-char DI) | 032 — Product Divisions |
| `&,1` | `&` (38) | `,` (44) | `1` (49) | 035 — MPHO Lot Number |
| `&,2` | `&` (38) | `,` (44) | `2` (50) | 036 — MPHO Supplemental ID Number |
| `&,3` | `&` (38) | `,` (44) | `3` (51) | 037 — GRID **[RETIRED]** |
| `&,4` | `&` (38) | `,` (44) | `4` (52) | 038 — Single European Code (SEC) |

### 1.4 Table 1 — Code 128 Subset B Characters Available as 2nd DI Character [RT001] (§2.1, page 16)

<table>
<tr><th>ASCII Value</th><th>Character</th><th>Name</th></tr>
<tr><td>33</td><td>!</td><td>exclamation mark</td></tr>
<tr><td>34</td><td>"</td><td>inch, double quotation mark</td></tr>
<tr><td>35</td><td>#</td><td>number sign</td></tr>
<tr><td>36</td><td>$</td><td>dollar sign</td></tr>
<tr><td>37</td><td>%</td><td>percent sign</td></tr>
<tr><td>38</td><td>&</td><td>ampersand</td></tr>
<tr><td>39</td><td>'</td><td>foot, single quotation mark</td></tr>
<tr><td>40</td><td>(</td><td>left parenthesis</td></tr>
<tr><td>41</td><td>)</td><td>right parenthesis</td></tr>
<tr><td>42</td><td>*</td><td>asterisk</td></tr>
<tr><td>43</td><td>+</td><td>plus sign</td></tr>
<tr><td>44</td><td>,</td><td>comma</td></tr>
<tr><td>45</td><td>-</td><td>dash</td></tr>
<tr><td>46</td><td>.</td><td>period</td></tr>
<tr><td>47</td><td>/</td><td>forward slash</td></tr>
<tr><td>58</td><td>:</td><td>colon</td></tr>
<tr><td>59</td><td>;</td><td>semicolon</td></tr>
<tr><td>60</td><td>&lt;</td><td>less than</td></tr>
<tr><td>61</td><td>=</td><td>equal to</td></tr>
<tr><td>62</td><td>&gt;</td><td>greater than</td></tr>
<tr><td>63</td><td>?</td><td>question mark</td></tr>
<tr><td>64</td><td>@</td><td>at sign</td></tr>
<tr><td>91</td><td>[</td><td>left square bracket</td></tr>
<tr><td>92</td><td>\</td><td>backward slash</td></tr>
<tr><td>93</td><td>]</td><td>right square bracket</td></tr>
<tr><td>94</td><td>^</td><td>circumflex, caret</td></tr>
<tr><td>95</td><td>_</td><td>underscore</td></tr>
<tr><td>96</td><td>`</td><td>grave accent</td></tr>
<tr><td>123</td><td>{</td><td>left brace</td></tr>
<tr><td>124</td><td>|</td><td>vertical bar</td></tr>
<tr><td>125</td><td>}</td><td>right brace</td></tr>
<tr><td>126</td><td>~</td><td>tilde</td></tr>
</table>

### 1.5 Non-ICCBBA defined data structures (§2.5.1, page 83)

- DI = `&` + one lowercase char `a`–`z` (ASCII 97–122).
- Further content is **not standardized by ICCBBA** — nationally/regionally/facility defined.
- Shall **not** be used inside Compound Messages [023] (§2.5.1: "Non-ICCBBA defined data structures
  shall not be used in Compound Messages").
- Parser guidance (per resolved open question, prompt §13.3): surface as a raw opaque segment —
  capture the 2-char DI and treat the remainder of the input as an opaque trailing blob (there is no
  general way to know its length), clearly labeled in output (e.g. `dataStructureNumber: null`,
  `name: "Non-ICCBBA Defined Data Structure"`, `isOpaque: true`).

### 1.6 Reserved hybrid/national structures (§2.5.2, §2.5.3, page 84)

| DI | Purpose | Content |
|---|---|---|
| `&;` | Reserved for a **nationally specified Donor Identification Number** (alternative to DS019) | nationally defined, not standardized here |
| `&!` | **Confidential Unit Exclusion Status** data structure | nationally defined, not standardized here |

## 2. Table 2 — Index of Data Structures [RT003] (§2.3)

Source: §2.3, Table 2 [RT003], pages 18–24. This is the authoritative shape/length index; per-field
decoding for every non-retired structure is in Part 3 below (Table 2 alone is not sufficient — it
gives length/shape only, not field semantics).

Legend for "Data Content" pattern strings: each distinct lowercase/uppercase Greek/Latin letter
represents one data-content character position; a repeated letter (e.g. `yy`) means "N characters of
that field". `N/A` = not applicable (structure has no 3rd DI character).

<table>
<tr><th>No.</th><th>Data Structure Name</th><th># DI chars</th><th>DI char 1</th><th>ASCII</th><th>DI char 2</th><th>ASCII</th><th>DI char 3</th><th>ASCII</th><th>Data Content pattern</th><th>Content length</th><th>§</th><th>Retired?</th></tr>
<tr><td>001</td><td>Donation Identification Number</td><td>2</td><td>=</td><td>61</td><td>A-N,P-Z,1-9 (α)</td><td>65-78,80-90,49-57</td><td>N/A</td><td>N/A</td><td>αppppyynnnnnnff</td><td>15 (incl. α)</td><td>2.4.1</td><td></td></tr>
<tr><td>002</td><td>Blood Groups [ABO and RhD]</td><td>2</td><td>=</td><td>61</td><td>%</td><td>37</td><td>N/A</td><td>N/A</td><td>ggre</td><td>4</td><td>2.4.2</td><td></td></tr>
<tr><td>003</td><td>Product Code</td><td>2</td><td>=</td><td>61</td><td>&lt;</td><td>60</td><td>N/A</td><td>N/A</td><td>αooootds</td><td>8</td><td>2.4.3</td><td></td></tr>
<tr><td>004</td><td>Expiration Date</td><td>2</td><td>=</td><td>61</td><td>&gt;</td><td>62</td><td>N/A</td><td>N/A</td><td>cyyjjj</td><td>6</td><td>2.4.4</td><td></td></tr>
<tr><td>005</td><td>Expiration Date and Time</td><td>2</td><td>&amp;</td><td>38</td><td>&gt;</td><td>62</td><td>N/A</td><td>N/A</td><td>cyyjjjhhmm</td><td>10</td><td>2.4.5</td><td></td></tr>
<tr><td>006</td><td>Collection Date</td><td>2</td><td>=</td><td>61</td><td>*</td><td>42</td><td>N/A</td><td>N/A</td><td>cyyjjj</td><td>6</td><td>2.4.6</td><td></td></tr>
<tr><td>007</td><td>Collection Date and Time</td><td>2</td><td>&amp;</td><td>38</td><td>*</td><td>42</td><td>N/A</td><td>N/A</td><td>cyyjjjhhmm</td><td>10</td><td>2.4.7</td><td></td></tr>
<tr><td>008</td><td>Production Date</td><td>2</td><td>=</td><td>61</td><td>}</td><td>125</td><td>N/A</td><td>N/A</td><td>cyyjjj</td><td>6</td><td>2.4.8</td><td></td></tr>
<tr><td>009</td><td>Production Date and Time</td><td>2</td><td>&amp;</td><td>38</td><td>}</td><td>125</td><td>N/A</td><td>N/A</td><td>cyyjjjhhmm</td><td>10</td><td>2.4.9</td><td></td></tr>
<tr><td>010</td><td>Special Testing: General</td><td>2</td><td>&amp;</td><td>38</td><td>(</td><td>40</td><td>N/A</td><td>N/A</td><td>zzzzz</td><td>5</td><td>2.4.10</td><td></td></tr>
<tr><td>011</td><td>Special Testing: Red Blood Cell Antigens</td><td>2</td><td>=</td><td>61</td><td>{</td><td>123</td><td>N/A</td><td>N/A</td><td>aaaaaaaaaaaaaaaaii</td><td>18</td><td>2.4.11</td><td><b>RETIRED</b> (v2.1.0, Aug 2004; replaced by 012/013)</td></tr>
<tr><td>012</td><td>Special Testing: Red Blood Cell Antigens – General</td><td>2</td><td>=</td><td>61</td><td>\</td><td>92</td><td>N/A</td><td>N/A</td><td>aaaaaaaaaaaaaaaaii</td><td>18</td><td>2.4.12</td><td></td></tr>
<tr><td>013</td><td>Special Testing: Red Blood Cell Antigens – Finnish</td><td>2</td><td>&amp;</td><td>38</td><td>\</td><td>92</td><td>N/A</td><td>N/A</td><td>aaaaaaaaaaaaaaaaii</td><td>18</td><td>2.4.13</td><td></td></tr>
<tr><td>014</td><td>Special Testing: Platelet HLA and Platelet Specific Antigens</td><td>2</td><td>&amp;</td><td>38</td><td>{</td><td>123</td><td>N/A</td><td>N/A</td><td>AAAABBBBCCCCCCCCDE</td><td>18</td><td>2.4.14</td><td></td></tr>
<tr><td>015</td><td>Special Testing: HLA-A and -B Alleles</td><td>2</td><td>=</td><td>61</td><td>[</td><td>91</td><td>N/A</td><td>N/A</td><td>EEEEFFFFGGGGHHHHLM</td><td>18</td><td>2.4.15</td><td><b>RETIRED</b> (v4.1.0, Dec 2011)</td></tr>
<tr><td>016</td><td>Special Testing: HLA-DRB1 Alleles</td><td>2</td><td>=</td><td>61</td><td>" (34)</td><td>34</td><td>N/A</td><td>N/A</td><td>IIIIJJJJMMMMMMMMMM</td><td>18</td><td>2.4.16</td><td><b>RETIRED</b> (v4.1.0, Dec 2011)</td></tr>
<tr><td>017</td><td>Container Manufacturer and Catalog Number</td><td>2</td><td>=</td><td>61</td><td>)</td><td>41</td><td>N/A</td><td>N/A</td><td>bqqwwwwwww</td><td>10</td><td>2.4.17</td><td></td></tr>
<tr><td>018</td><td>Container Lot Number</td><td>2</td><td>&amp;</td><td>38</td><td>)</td><td>41</td><td>N/A</td><td>N/A</td><td>xxxxxxxxxx</td><td>10</td><td>2.4.18</td><td></td></tr>
<tr><td>019</td><td>Donor Identification Number</td><td>2</td><td>=</td><td>61</td><td>;</td><td>59</td><td>N/A</td><td>N/A</td><td>αppppvvvvvvvvvvvvvvvv</td><td>21</td><td>2.4.19</td><td></td></tr>
<tr><td>020</td><td>Staff Member Identification Number</td><td>2</td><td>=</td><td>61</td><td>' (39)</td><td>39</td><td>N/A</td><td>N/A</td><td>αppppuuuuuu</td><td>11</td><td>2.4.20</td><td></td></tr>
<tr><td>021</td><td>Manufacturer and Catalog Number: Items Other Than Containers</td><td>2</td><td>=</td><td>61</td><td>-</td><td>45</td><td>N/A</td><td>N/A</td><td>NNOOOOOOOO</td><td>10</td><td>2.4.21</td><td></td></tr>
<tr><td>022</td><td>Lot Number: Items Other Than Containers</td><td>2</td><td>&amp;</td><td>38</td><td>-</td><td>45</td><td>N/A</td><td>N/A</td><td>PPPPPPPPPP</td><td>10</td><td>2.4.22</td><td></td></tr>
<tr><td>023</td><td>Compound Message</td><td>2</td><td>=</td><td>61</td><td>+</td><td>43</td><td>N/A</td><td>N/A</td><td>aabbb</td><td>5</td><td>2.4.23</td><td></td></tr>
<tr><td>024</td><td>Patient Date of Birth</td><td>2</td><td>=</td><td>61</td><td>#</td><td>35</td><td>N/A</td><td>N/A</td><td>aayyyymmdd</td><td>10</td><td>2.4.24</td><td></td></tr>
<tr><td>025</td><td>Patient Identification Number</td><td>2</td><td>&amp;</td><td>38</td><td>#</td><td>35</td><td>N/A</td><td>N/A</td><td>aallxx...xx</td><td>variable (4 + ll)</td><td>2.4.25</td><td></td></tr>
<tr><td>026</td><td>Expiration Month and Year</td><td>2</td><td>=</td><td>61</td><td>]</td><td>93</td><td>N/A</td><td>N/A</td><td>yyyymm</td><td>6</td><td>2.4.26</td><td></td></tr>
<tr><td>027</td><td>Transfusion Transmitted Infection Marker</td><td>2</td><td>&amp;</td><td>38</td><td>" (34)</td><td>34</td><td>N/A</td><td>N/A</td><td>nnnnnnnnnnnnnnnnnn</td><td>18</td><td>2.4.27</td><td></td></tr>
<tr><td>028</td><td>Product Consignment</td><td>2</td><td>=</td><td>61</td><td>$</td><td>36</td><td>N/A</td><td>N/A</td><td>αppppyynnnnnccdd</td><td>16</td><td>2.4.28</td><td></td></tr>
<tr><td>029</td><td>Dimensions</td><td>2</td><td>&amp;</td><td>38</td><td>$</td><td>36</td><td>N/A</td><td>N/A</td><td>nn + (aabbbbcccccdee) × nn</td><td>2 + 14×nn (16 in the single-segment example shown in Table 2)</td><td>2.4.29</td><td></td></tr>
<tr><td>030</td><td>Red Cell Antigens with Test History</td><td>2</td><td>&amp;</td><td>38</td><td>%</td><td>37</td><td>N/A</td><td>N/A</td><td>nnn + (pppppprrss) × nnn</td><td>3 + 10×nnn (13 in the single-segment example)</td><td>2.4.30</td><td></td></tr>
<tr><td>031</td><td>Flexible Date and Time</td><td>2</td><td>=</td><td>61</td><td>(</td><td>40</td><td>N/A</td><td>N/A</td><td>ZUTTYYYYMMDDhhmm</td><td>16</td><td>2.4.31</td><td></td></tr>
<tr><td>032</td><td>Product Divisions</td><td>2</td><td>=</td><td>61</td><td>,</td><td>44</td><td>N/A</td><td>N/A</td><td>dddddd</td><td>6</td><td>2.4.32</td><td></td></tr>
<tr><td>033</td><td>Processing Facility Information Code</td><td>2</td><td>&amp;</td><td>38</td><td>+</td><td>43</td><td>N/A</td><td>N/A</td><td>nnnnnpppppp</td><td>11</td><td>2.4.33</td><td></td></tr>
<tr><td>034</td><td>Processor Product Identification Code</td><td>2</td><td>=</td><td>61</td><td>/</td><td>47</td><td>N/A</td><td>N/A</td><td>nnnnnppppppqqqqq</td><td>16</td><td>2.4.34</td><td></td></tr>
<tr><td>035</td><td>MPHO Lot Number</td><td>3</td><td>&amp;</td><td>38</td><td>,</td><td>44</td><td>1</td><td>49</td><td>xxxxxxxxxxxxxxxxxx</td><td>18</td><td>2.4.35</td><td></td></tr>
<tr><td>036</td><td>MPHO Supplemental Identification Number</td><td>3</td><td>&amp;</td><td>38</td><td>,</td><td>44</td><td>2</td><td>50</td><td>xxxxxxxxxxxxxxxxxx</td><td>18</td><td>2.4.36</td><td></td></tr>
<tr><td>037</td><td>Global Registration Identifier for Donors</td><td>3</td><td>&amp;</td><td>38</td><td>,</td><td>44</td><td>3</td><td>51</td><td>nnnnaaaaaaaaaaaaaaa</td><td>19</td><td>2.4.37</td><td><b>RETIRED</b> (v5.8.0, June 2017; replaced by 039)</td></tr>
<tr><td>038</td><td>Single European Code (SEC)</td><td>3</td><td>&amp;</td><td>38</td><td>,</td><td>44</td><td>4</td><td>52</td><td>x × 40</td><td>40</td><td>2.4.38</td><td></td></tr>
<tr><td>039</td><td>Global Registration Identifier for Donors</td><td>2</td><td>&amp;</td><td>38</td><td>:</td><td>58</td><td>N/A</td><td>N/A</td><td>nnnnaaaaaaaaaaaaabb</td><td>19</td><td>2.4.39</td><td></td></tr>
<tr><td>040</td><td>Chain of Identity Identifier</td><td>2</td><td>&amp;</td><td>38</td><td>/</td><td>47</td><td>N/A</td><td>N/A</td><td>CHαppppyynnnnnn</td><td>15</td><td>2.4.40</td><td></td></tr>
<tr><td>N/A</td><td>Data Structures Not Defined by ICCBBA</td><td>2</td><td>&amp;</td><td>38</td><td>a-z</td><td>97-122</td><td>N/A</td><td>N/A</td><td>(nationally/facility defined)</td><td>not standardized</td><td>2.5.1</td><td></td></tr>
<tr><td>N/A</td><td>Reserved DI for a Nationally Specified Donor Identification Number</td><td>2</td><td>&amp;</td><td>38</td><td>;</td><td>59</td><td>N/A</td><td>N/A</td><td>(nationally defined)</td><td>not standardized</td><td>2.5.2</td><td></td></tr>
<tr><td>N/A</td><td>Confidential Unit Exclusion Status Data Structure</td><td>2</td><td>&amp;</td><td>38</td><td>!</td><td>33</td><td>N/A</td><td>N/A</td><td>(nationally defined)</td><td>not standardized</td><td>2.5.3</td><td></td></tr>
</table>

**Retired structures** (recognize the DI for backward compatibility; do not need full field decoding):
**DS011**, **DS015**, **DS016**, **DS037**. Per the resolved open question (prompt §4), label these
`retired: true` in parser output and skip detailed field decoding — DI + total length is enough to
consume/skip the segment correctly.

## 3. Per-Structure Field Layouts

Notation used throughout this part: `{X-Y}` = inclusive character range; alphanumeric ranges follow
the source document's own capitalization/case conventions exactly (e.g. `{A–N; P–Z; 1–9}` deliberately
excludes `O` and `0`).

### DS001 — Donation Identification Number [`=α` / 001] (§2.4.1, page 25)

Structure: `=αppppyynnnnnnff` — DI is `=` + α (α is content char 1). Total on-wire length after `=`:
15 characters. The 13-character **DIN proper** is `αppppyynnnnnn`; `ff` are flag characters **not**
part of the 13-char DIN.

| Field | Length | Position (within 15-char content) | Type | Notes |
|---|---|---|---|---|
| α | 1 | 1 | alphanumeric `{A–N; P–Z; 1–9}` | 2nd DI char; part of Facility Identification Number (FIN) |
| pppp | 4 | 2–5 | chars 1–2: alphanumeric `{A–N; P–Z; 0–9}`; chars 3–4: numeric `{0–9}` (current usage: numeric for all 4) | rest of FIN; `αpppp` together = FIN, looked up against ICCBBA Registered Facilities database (external, not embedded) |
| yy | 2 | 6–7 | numeric `{0–9}` | last 2 digits of nominal year DIN assigned (±1 month overlap allowed) |
| nnnnnn | 6 | 8–13 | numeric `{0–9}` | sequence number within nominal year for the FIN |
| ff | 2 | 14–15 | alphanumeric `{0–9, A–H, J–N, P, R–Y}` | flag characters, see Table 3 [RT004] (§4.1 below) — **not** part of the 13-char DIN |

- The 13-character DIN = `αppppyynnnnnn` must be **globally unique for a 100-year period**.
- A separate **keyboard entry check character K** (Appendix A) is calculated from the 13-char DIN and
  printed in eye-readable text — it is not part of the electronic data content (see §5 below).
- Flag types (Table 3): Type 1 (ICCBBA-defined process control), Type 2 (locally-defined process
  control), Type 3 (weighted ISO/IEC 7064 mod 37-2 check character on the preceding 13 chars — flag
  value 60–96, i.e. 60 + checksum). Default/unused value: `00`.

### DS002 — Blood Groups [ABO and RhD] [`=%` / 002] (§2.4.2, page 28)

Structure: `=%ggre`. Content length: 4.

| Field | Length | Type | Notes |
|---|---|---|---|
| gg | 2 | alphanumeric `{A–Z; a–z; 0–9}` | EITHER ABO/RhD blood group + optional collection-type info (Table 4 [RT005]) OR a special message code (Table 5 [RT006]) |
| r | 1 | alphanumeric `{A–Z; 0–9}` | Rh + Kell or Mi<sup>a</sup>/Mur phenotype (Table 6 [RT007]); `0` = no phenotype info |
| e | 1 | alphanumeric `{A–Z; 0–9}` | reserved for future use; always `0` currently |

### DS003 — Product Code [`=<` / 003] (§2.4.3, page 30)

Structure: `=<αooootds`. Content length: 8.

| Field | Length | Type | Notes |
|---|---|---|---|
| α | 1 | alphabetic `{A–Z}` | selects Product Description Code "family" — see mapping table below |
| oooo | 4 | alphanumeric `{A–Z; 0–9}` | rest of Product Description Code (PDC); `αoooo` looked up in external Product Description Code database (not embedded — out of scope per licensing) |
| t | 1 | alphanumeric `{A–Z; a–z; 0–9}`, meaning depends on α | see below |
| d | 1 | alphanumeric `{A–Z; 0–9}`, meaning depends on α | see below |
| s | 1 | alphanumeric `{a–z; 0–9}`, meaning depends on α | see below |

**α → product family mapping:**

| α | Type of Product |
|---|---|
| E, F | Blood Components |
| H | MPHO with INN and/or USAN names |
| M | Other Therapies: Human Milk = M0001–M0999; not assigned M1000–M8999; Topical Products of Human Origin = M9000–M9999 |
| N | Organs: assigned N0001–N0999; not assigned N1000–N9999 |
| P | Regenerated Tissue products |
| R | Reproductive Tissue and Cell products: assigned R0001–R0999; not assigned R1000–R9999 |
| S | Cellular Therapy products |
| T | Tissue products |
| V | Ocular Tissue products |
| W | Fecal Microbiota: assigned W0001–W0999; not assigned W1000–W9999 |
| X | Other Blood products: Plasma Derivatives X0001–X0999; not assigned X1000–X4999; In Vivo Diagnostic MPHO X5000–X5999; not assigned X6000–X9999 |
| Y | Clinical Trials products (partially assigned YA000–YZ999) |
| A–D | National or Local/Facility codes: National = A–C alphanumeric; Local/Facility = D alphanumeric; both/either A0000–D9999 |

**`tds` interpretation, depends on α:**

- For α ∈ `{E, F, H, S, P, X0, YA…YZ}`: `t` = **Collection Type Code** (see Table 7 [RT008], §4.1
  below); `ds` = **Division Code** — `d` uppercase letter, `s` lowercase letter (unless used together
  with DS032, in which case case rules are relaxed). Example: `S12954A0` = PDC `S1295`, division
  `4A0`... (see Figure 3: PDC bracket over `S1295`, division bracket over `A0`, collection-type arrow
  at position `4`). If undivided, `ds` = `00`.
- For α ∈ `{M, N, R, T, V, W}`: `tds` (all 3 chars together) = a **3-digit Division/Pack Code**. If
  undivided (or no multiple packs sharing PDC+DIN), `tds` = `000`.
- For α ∈ `{X1–X9}`: `tds` reserved for future use, value `000`.
- For α ∈ `{A–D}`: `tds` defined in conjunction with the national/local code assignment (not
  standardized here).
- When DS032 (Product Divisions) is used together with DS003, positions 7–8 of the Product Code
  (`ds`) shall be `99` (signals "see DS032 for the actual division code").

### DS004 — Expiration Date [`=>` / 004] (§2.4.4, page 34)

Structure: `=>cyyjjj`. Content length: 6. Recommended only for devices/supplies; DS005 preferred for
blood/tissue/cellular therapy products.

| Field | Length | Type | Notes |
|---|---|---|---|
| c | 1 | numeric `{0–9}` | century of expiration year |
| yy | 2 | numeric `{0–9}` | year within century |
| jjj | 3 | numeric `{0–9}` | ordinal day within year (Julian date), i.e. day-of-year 001–366 |

### DS005 — Expiration Date and Time [`&>` / 005] (§2.4.5, page 35)

Structure: `&>cyyjjjhhmm`. Content length: 10.

| Field | Length | Type | Notes |
|---|---|---|---|
| c | 1 | numeric | century |
| yy | 2 | numeric | year in century |
| jjj | 3 | numeric | Julian day of year |
| hh | 2 | numeric `00–23` | hour |
| mm | 2 | numeric `00–59` | minute |

Day begins at midnight = `0000`, ends 23:59 = `2359`. **Default when time unspecified: `2359`.**

### DS006 — Collection Date [`=*` / 006] (§2.4.6, page 36)

Structure: `=*cyyjjj`. Content length: 6. Same `cyyjjj` layout/semantics as DS004 but for
collection/recovery date.

### DS007 — Collection Date and Time [`&*` / 007] (§2.4.7, page 37)

Structure: `&*cyyjjjhhmm`. Content length: 10. Same layout/semantics as DS005 but for
collection/recovery date+time. Same default-time rule (`2359` when unspecified).

### DS008 — Production Date [`=}` / 008] (§2.4.8, page 38)

Structure: `=}cyyjjj`. Content length: 6. Same `cyyjjj` layout as DS004/006 but for production date.

### DS009 — Production Date and Time [`&}` / 009] (§2.4.9, page 39)

Structure: `&}cyyjjjhhmm`. Content length: 10. Same layout as DS005/007 but for production date+time.
Same default-time rule (`2359`).

### DS010 — Special Testing: General [`&(` / 010] (§2.4.10, page 40)

Structure: `&(zzzzz`. Content length: 5.

| Field | Length | Type | Notes |
|---|---|---|---|
| zzzzz | 5 | alphanumeric `{A–Z; 0–9}` | code into the external "Special Testing" database table (§5.2, password-protected ICCBBA website) — **raw code only**, not resolvable from this document (licensed external database, out of scope per licensing note) |

<!-- APPEND_POINT -->
