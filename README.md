# unicodefyi

[![npm](https://img.shields.io/npm/v/unicodefyi)](https://www.npmjs.com/package/unicodefyi)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/unicodefyi)

Pure TypeScript Unicode toolkit -- character info, name search, and 17 encoding formats.

Look up any Unicode character's name, category, and block. Encode into 17 formats: UTF-8, UTF-16, UTF-32, HTML (decimal, hex, named entity), CSS, URL encoding, and language-specific escapes for JavaScript, Python, Java, Go, Ruby, Rust, and C/C++. Search ~2,950 characters by name. Includes 90 HTML named entity mappings.

**Zero dependencies. Works in Node.js, Deno, Bun, and all modern browsers.**

<p align="center">
  <img src="demo.gif" alt="unicodefyi demo — Unicode character encoding and search" width="800">
</p>

## Table of Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [What You Can Do](#what-you-can-do)
  - [Character Lookup](#character-lookup)
  - [Character Search](#character-search)
  - [17 Encoding Formats](#17-encoding-formats)
  - [Supplementary Plane Characters (Emoji)](#supplementary-plane-characters-emoji)
  - [HTML Entity Lookup](#html-entity-lookup)
- [Raw Data Access](#raw-data-access)
- [API Reference](#api-reference)
- [Learn More About Unicode](#learn-more-about-unicode)
- [Also Available](#also-available)
- [Creative FYI Family](#creative-fyi-family)
- [License](#license)

## Install

```bash
npm install unicodefyi
```

## Quick Start

```typescript
import { getEncodings, charInfo, searchCharacters, lookupHtmlEntity } from "unicodefyi";

// Encode any character into 17 formats
const enc = getEncodings("\u2713"); // CHECK MARK
console.log(enc.unicode);     // "U+2713"
console.log(enc.htmlEntity);  // "&check;"
console.log(enc.css);         // "\2713"
console.log(enc.javascript);  // "\u{2713}"
console.log(enc.python);      // "\u2713"
console.log(enc.java);        // "\u2713"
console.log(enc.go);          // "\u2713"
console.log(enc.ruby);        // "\u{2713}"
console.log(enc.rust);        // "\u{2713}"
console.log(enc.cCpp);        // "\u2713"
console.log(enc.urlEncoded);  // "%E2%9C%93"
console.log(enc.utf8Bytes);   // "e2 9c 93"
console.log(enc.utf16beBytes);// "27 13"
console.log(enc.utf32beBytes);// "00 00 27 13"

// Character info -- name, category, block
const info = charInfo("\u2713");
console.log(info?.name);         // "CHECK MARK"
console.log(info?.category);     // "So"
console.log(info?.categoryName); // "Other Symbol"
console.log(info?.block);        // "Dingbats"

// Search characters by name
const arrows = searchCharacters("arrow", 5);
console.log(arrows[0].name);      // "LEFTWARDS ARROW"
console.log(arrows[0].character);  // "\u2190"

// HTML entity reverse lookup
lookupHtmlEntity("&hearts;"); // "\u2665"
```

## What You Can Do

### Character Lookup

Get the Unicode name, general category, and block for any character in the bundled dataset (~2,950 common BMP characters covering Latin, Greek, Cyrillic, symbols, arrows, math operators, dingbats, and more). The Unicode Standard assigns every character a unique name, a two-letter general category code, and a block designation indicating which range of the codespace it belongs to.

```typescript
import { charInfo } from "unicodefyi";

const info = charInfo("A");
info?.name         // "LATIN CAPITAL LETTER A"
info?.category     // "Lu"
info?.categoryName // "Uppercase Letter"
info?.block        // "Basic Latin"
info?.blockSlug    // "basic-latin"
info?.codepoint    // 65
info?.encodings    // all 17 encoding formats
```

Learn more: [Unicode Character Search](https://unicodefyi.com/search/) · [Unicode Blocks](https://unicodefyi.com/block/) · [Scripts](https://unicodefyi.com/script/)

### Character Search

Search the bundled character name dataset by substring:

```typescript
import { searchCharacters } from "unicodefyi";

const results = searchCharacters("ARROW");
// Returns CharInfo[] with name, category, block, encodings
// e.g. LEFTWARDS ARROW, UPWARDS ARROW, RIGHTWARDS ARROW, ...

const limited = searchCharacters("LETTER", 10);
// Limit results (default: 50)
```

Learn more: [Unicode Block Browser](https://unicodefyi.com/block/) · [REST API Docs](https://unicodefyi.com/developers/)

### 17 Encoding Formats

Encode any Unicode character into **17 different representations** covering web standards, programming languages, and binary formats. This is the most comprehensive encoding toolkit available -- covering 6 more formats than symbolfyi's 11, adding Go, Ruby, Rust, C/C++, UTF-32, and decimal output.

| Format | Field | Example (`U+2713`) | Description |
|--------|-------|---------------------|-------------|
| Unicode | `unicode` | `U+2713` | Standard Unicode notation |
| Decimal | `decimal` | `10003` | Decimal codepoint value |
| HTML Decimal | `htmlDecimal` | `&#10003;` | HTML numeric character reference |
| HTML Hex | `htmlHex` | `&#x2713;` | HTML hex character reference |
| HTML Entity | `htmlEntity` | `&check;` | Named entity (90 supported) |
| CSS | `css` | `\2713` | CSS escape sequence |
| JavaScript | `javascript` | `\u{2713}` | ES6 Unicode escape |
| Python | `python` | `\u2713` | Python string escape |
| Java | `java` | `\u2713` | Java Unicode escape |
| Go | `go` | `\u2713` | Go Unicode escape |
| Ruby | `ruby` | `\u{2713}` | Ruby Unicode escape |
| Rust | `rust` | `\u{2713}` | Rust Unicode escape |
| C/C++ | `cCpp` | `\u2713` | C/C++ universal character name |
| URL Encoded | `urlEncoded` | `%E2%9C%93` | Percent-encoded UTF-8 |
| UTF-8 Bytes | `utf8Bytes` | `e2 9c 93` | Raw UTF-8 byte values |
| UTF-16 BE | `utf16beBytes` | `27 13` | Big-endian UTF-16 bytes |
| UTF-32 BE | `utf32beBytes` | `00 00 27 13` | Big-endian UTF-32 bytes |

Learn more: [Character Lookup Tool](https://unicodefyi.com/tools/lookup/) · [REST API Docs](https://unicodefyi.com/developers/) · [OpenAPI Spec](https://unicodefyi.com/api/openapi.json)

### Supplementary Plane Characters (Emoji)

Characters above U+FFFF (including emoji) are fully supported. Language-specific
escapes automatically use the correct format:

```typescript
const enc = getEncodings("\uD83D\uDE00"); // GRINNING FACE U+1F600

enc.unicode;       // "U+1F600"
enc.python;        // "\U0001f600"        (8-digit)
enc.java;          // "\uD83D\uDE00"      (surrogate pair)
enc.go;            // "\U0001F600"         (8-digit uppercase)
enc.rust;          // "\u{1F600}"          (braces)
enc.cCpp;          // "\U0001f600"         (8-digit)
enc.utf8Bytes;     // "f0 9f 98 80"
enc.utf16beBytes;  // "d8 3d de 00"        (surrogate pair bytes)
enc.utf32beBytes;  // "00 01 f6 00"
```

### HTML Entity Lookup

Resolve **90 named HTML entities** back to their characters. The HTML specification defines named entities as shortcuts for commonly used characters -- `&amp;` for ampersand, `&hearts;` for the heart suit, `&euro;` for the euro sign, and more.

```typescript
import { lookupHtmlEntity } from "unicodefyi";

lookupHtmlEntity("&amp;");    // "&"
lookupHtmlEntity("&hearts;"); // "\u2665" (BLACK HEART SUIT)
lookupHtmlEntity("&check;");  // "\u2713" (CHECK MARK)
lookupHtmlEntity("&euro;");   // "\u20AC" (EURO SIGN)
lookupHtmlEntity("&fake;");   // null
```

Learn more: [HTML Entity Reference](https://unicodefyi.com/search/) · [Unicode Character Search](https://unicodefyi.com/search/)

## Raw Data Access

Access the bundled data maps directly:

```typescript
import { HTML_ENTITIES, HTML_ENTITY_TO_CHAR, GENERAL_CATEGORY_NAMES, CHAR_NAMES } from "unicodefyi";

// 90 HTML entity mappings
HTML_ENTITIES.get(0x2713);          // "&check;"
HTML_ENTITY_TO_CHAR.get("&check;"); // "\u2713"

// 30 Unicode general category names
GENERAL_CATEGORY_NAMES.get("Sm");   // "Math Symbol"

// ~2,950 character names
CHAR_NAMES.get(0x2713);             // "CHECK MARK"
```

## API Reference

### `getEncodings(char: string): EncodingInfo`

Compute 17 encoding representations for a single Unicode character. Accepts BMP characters and supplementary plane characters (emoji, etc.). Throws if the input is not exactly one codepoint.

### `charInfo(char: string): CharInfo | null`

Get full Unicode character info (name, category, block) plus all 17 encodings. Returns `null` if the character is not in the bundled ~2,950 character dataset. Throws if input is not exactly one codepoint.

### `searchCharacters(query: string, limit?: number): CharInfo[]`

Search characters by name substring (case-insensitive). Returns up to `limit` results (default: 50). Each result includes name, category, block, and all encodings.

### `getCategoryName(code: string): string`

Get the human-readable name for a Unicode general category code (e.g., `"Sm"` returns `"Math Symbol"`).

### `lookupHtmlEntity(entity: string): string | null`

Look up the character for a named HTML entity string (e.g., `"&amp;"`). Returns `null` if not found.

### `HTML_ENTITIES: ReadonlyMap<number, string>`

Map of codepoint numbers to HTML entity strings (90 entries).

### `HTML_ENTITY_TO_CHAR: ReadonlyMap<string, string>`

Reverse map of HTML entity strings to characters.

### `GENERAL_CATEGORY_NAMES: ReadonlyMap<string, string>`

Map of 2-letter category codes to human-readable names (30 entries).

### `CHAR_NAMES: ReadonlyMap<number, string>`

Map of codepoints to official Unicode character names (~2,950 entries).

## Learn More About Unicode

- **Browse**: [Unicode Search](https://unicodefyi.com/search/) · [Unicode Blocks](https://unicodefyi.com/block/) · [Scripts](https://unicodefyi.com/script/)
- **Tools**: [Character Lookup](https://unicodefyi.com/tools/lookup/)
- **API**: [REST API Docs](https://unicodefyi.com/developers/) · [OpenAPI Spec](https://unicodefyi.com/api/openapi.json)
- **Python**: [PyPI Package](https://pypi.org/project/unicodefyi/)

## Also Available

- **Python**: [`unicodefyi`](https://pypi.org/project/unicodefyi/) on PyPI -- same 17 encodings + Unicode properties + character search
- **Web**: [unicodefyi.com](https://unicodefyi.com) -- interactive Unicode character explorer

## Creative FYI Family

Part of the [FYIPedia](https://fyipedia.com) open-source developer tools ecosystem — design, typography, and character encoding.

| Package | PyPI | npm | Description |
|---------|------|-----|-------------|
| colorfyi | [PyPI](https://pypi.org/project/colorfyi/) | [npm](https://www.npmjs.com/package/@fyipedia/colorfyi) | Color conversion, WCAG contrast, harmonies -- [colorfyi.com](https://colorfyi.com/) |
| emojifyi | [PyPI](https://pypi.org/project/emojifyi/) | [npm](https://www.npmjs.com/package/emojifyi) | Emoji encoding & metadata for 3,953 emojis -- [emojifyi.com](https://emojifyi.com/) |
| symbolfyi | [PyPI](https://pypi.org/project/symbolfyi/) | [npm](https://www.npmjs.com/package/symbolfyi) | Symbol encoding in 11 formats -- [symbolfyi.com](https://symbolfyi.com/) |
| **unicodefyi** | [PyPI](https://pypi.org/project/unicodefyi/) | [npm](https://www.npmjs.com/package/unicodefyi) | **Unicode lookup with 17 encodings -- [unicodefyi.com](https://unicodefyi.com/)** |
| fontfyi | [PyPI](https://pypi.org/project/fontfyi/) | [npm](https://www.npmjs.com/package/fontfyi) | Google Fonts metadata & CSS -- [fontfyi.com](https://fontfyi.com/) |

## License

MIT
