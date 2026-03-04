/**
 * Unicode character encoding engine -- 17 formats, zero dependencies.
 *
 * Computes encoding representations for any Unicode character (BMP or
 * supplementary plane). Provides character info (name, category, block)
 * and name-based search. Ported from the Python unicodefyi package.
 *
 * @see https://unicodefyi.com
 * @see https://pypi.org/project/unicodefyi/
 */

import type { CharInfo, EncodingInfo } from "./types.js";
import { HTML_ENTITIES, HTML_ENTITY_TO_CHAR } from "./data/entities.js";
import { CHAR_NAMES } from "./data/names.js";
import {
  GENERAL_CATEGORY_NAMES,
  getBlockName,
  slugify,
} from "./data/unicode.js";

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Get the single Unicode codepoint from a (possibly surrogate-pair) string.
 * Throws if the input is not exactly one Unicode codepoint.
 */
function toCodePoint(char: string): number {
  const cp = char.codePointAt(0);
  if (cp === undefined) {
    throw new Error("Empty string: expected exactly one character");
  }
  // Verify the string contains exactly one codepoint
  const len = cp > 0xffff ? 2 : 1;
  if (char.length !== len) {
    throw new Error(
      `Expected exactly one character, got ${[...char].length} codepoints`,
    );
  }
  return cp;
}

/** Pad a hex string to at least `width` characters with leading zeros. */
function hexPad(n: number, width: number): string {
  return n.toString(16).padStart(width, "0");
}

/** Upper-case hex padded to `width`. */
function hexPadUpper(n: number, width: number): string {
  return n.toString(16).toUpperCase().padStart(width, "0");
}

/**
 * Encode a string as UTF-8 bytes.
 * Uses TextEncoder (available in Node 11+, all modern browsers).
 */
function encodeUtf8(char: string): Uint8Array {
  return new TextEncoder().encode(char);
}

/**
 * Encode a codepoint as UTF-16 Big-Endian bytes.
 * BMP characters produce 2 bytes; supplementary produce 4 (surrogate pair).
 */
function encodeUtf16BE(cp: number): Uint8Array {
  if (cp <= 0xffff) {
    return new Uint8Array([(cp >> 8) & 0xff, cp & 0xff]);
  }
  // Surrogate pair
  const high = 0xd800 + ((cp - 0x10000) >> 10);
  const low = 0xdc00 + ((cp - 0x10000) & 0x3ff);
  return new Uint8Array([
    (high >> 8) & 0xff,
    high & 0xff,
    (low >> 8) & 0xff,
    low & 0xff,
  ]);
}

/**
 * Encode a codepoint as UTF-32 Big-Endian (4 bytes, always).
 */
function encodeUtf32BE(cp: number): Uint8Array {
  return new Uint8Array([
    (cp >> 24) & 0xff,
    (cp >> 16) & 0xff,
    (cp >> 8) & 0xff,
    cp & 0xff,
  ]);
}

/** Format a Uint8Array as space-separated hex bytes, e.g. `"e2 9c 93"`. */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => hexPad(b, 2))
    .join(" ");
}

/**
 * Percent-encode a character (UTF-8 bytes), matching Python's
 * `urllib.parse.quote`.  Unreserved characters (A-Z, a-z, 0-9, `-._~`)
 * pass through; everything else is encoded.
 */
function urlEncode(char: string): string {
  const bytes = encodeUtf8(char);
  const unreserved =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  return Array.from(bytes)
    .map((b) => {
      const ch = String.fromCharCode(b);
      if (unreserved.includes(ch)) {
        return ch;
      }
      return `%${hexPadUpper(b, 2)}`;
    })
    .join("");
}

/**
 * Get the Unicode general category for a character.
 * Uses a lightweight regex-based approach covering common categories.
 */
function getCategory(char: string): string {
  // Test against known category patterns
  if (/^\p{Lu}$/u.test(char)) return "Lu";
  if (/^\p{Ll}$/u.test(char)) return "Ll";
  if (/^\p{Lt}$/u.test(char)) return "Lt";
  if (/^\p{Lm}$/u.test(char)) return "Lm";
  if (/^\p{Lo}$/u.test(char)) return "Lo";
  if (/^\p{Mn}$/u.test(char)) return "Mn";
  if (/^\p{Mc}$/u.test(char)) return "Mc";
  if (/^\p{Me}$/u.test(char)) return "Me";
  if (/^\p{Nd}$/u.test(char)) return "Nd";
  if (/^\p{Nl}$/u.test(char)) return "Nl";
  if (/^\p{No}$/u.test(char)) return "No";
  if (/^\p{Pc}$/u.test(char)) return "Pc";
  if (/^\p{Pd}$/u.test(char)) return "Pd";
  if (/^\p{Ps}$/u.test(char)) return "Ps";
  if (/^\p{Pe}$/u.test(char)) return "Pe";
  if (/^\p{Pi}$/u.test(char)) return "Pi";
  if (/^\p{Pf}$/u.test(char)) return "Pf";
  if (/^\p{Po}$/u.test(char)) return "Po";
  if (/^\p{Sm}$/u.test(char)) return "Sm";
  if (/^\p{Sc}$/u.test(char)) return "Sc";
  if (/^\p{Sk}$/u.test(char)) return "Sk";
  if (/^\p{So}$/u.test(char)) return "So";
  if (/^\p{Zs}$/u.test(char)) return "Zs";
  if (/^\p{Zl}$/u.test(char)) return "Zl";
  if (/^\p{Zp}$/u.test(char)) return "Zp";
  if (/^\p{Cc}$/u.test(char)) return "Cc";
  if (/^\p{Cf}$/u.test(char)) return "Cf";
  if (/^\p{Co}$/u.test(char)) return "Co";
  if (/^\p{Cn}$/u.test(char)) return "Cn";
  return "Cn"; // Default to unassigned
}

// ── Main API ────────────────────────────────────────────────────────────────

/**
 * Compute 17 encoding representations for a single Unicode character.
 *
 * Accepts any single character, including supplementary-plane characters
 * (emoji, CJK Extension B, etc.) that are represented as surrogate pairs
 * in JavaScript strings.
 *
 * @example
 * ```ts
 * const enc = getEncodings("\u2713"); // CHECK MARK
 * enc.unicode    // "U+2713"
 * enc.htmlEntity // "&check;"
 * enc.utf8Bytes  // "e2 9c 93"
 * enc.rust       // "\\u{2713}"
 * ```
 *
 * @example
 * ```ts
 * const enc = getEncodings("\uD83D\uDE00"); // GRINNING FACE
 * enc.unicode       // "U+1F600"
 * enc.java          // "\\uD83D\\uDE00"
 * enc.utf32beBytes  // "00 01 f6 00"
 * ```
 */
export function getEncodings(char: string): EncodingInfo {
  const cp = toCodePoint(char);

  // Language-specific escapes differ for BMP vs supplementary plane
  let pythonRepr: string;
  let javaRepr: string;
  let goRepr: string;
  let cRepr: string;

  if (cp <= 0xffff) {
    pythonRepr = `\\u${hexPad(cp, 4)}`;
    javaRepr = `\\u${hexPadUpper(cp, 4)}`;
    goRepr = `\\u${hexPadUpper(cp, 4)}`;
    cRepr = `\\u${hexPad(cp, 4)}`;
  } else {
    pythonRepr = `\\U${hexPad(cp, 8)}`;
    // Java uses surrogate pairs
    const high = 0xd800 + ((cp - 0x10000) >> 10);
    const low = 0xdc00 + ((cp - 0x10000) & 0x3ff);
    javaRepr = `\\u${hexPadUpper(high, 4)}\\u${hexPadUpper(low, 4)}`;
    goRepr = `\\U${hexPadUpper(cp, 8)}`;
    cRepr = `\\U${hexPad(cp, 8)}`;
  }

  const hexUpper = cp.toString(16).toUpperCase();

  return {
    unicode: `U+${hexPadUpper(cp, 4)}`,
    decimal: String(cp),
    htmlDecimal: `&#${cp};`,
    htmlHex: `&#x${hexUpper};`,
    htmlEntity: HTML_ENTITIES.get(cp) ?? "",
    css: `\\${hexPadUpper(cp, 4)}`,
    javascript: `\\u{${hexUpper}}`,
    python: pythonRepr,
    java: javaRepr,
    go: goRepr,
    ruby: `\\u{${hexUpper}}`,
    rust: `\\u{${hexUpper}}`,
    cCpp: cRepr,
    urlEncoded: urlEncode(char),
    utf8Bytes: bytesToHex(encodeUtf8(char)),
    utf16beBytes: bytesToHex(encodeUtf16BE(cp)),
    utf32beBytes: bytesToHex(encodeUtf32BE(cp)),
  };
}

/**
 * Get full Unicode character info including name, category, block,
 * and all 17 encoding formats.
 *
 * Returns `null` if the character name is not in the bundled dataset
 * (~2,950 common BMP characters). The encodings are always computed,
 * so use `getEncodings()` directly if you only need encoding data.
 *
 * @example
 * ```ts
 * const info = charInfo("\u2713");
 * info?.name         // "CHECK MARK"
 * info?.category     // "So"
 * info?.categoryName // "Other Symbol"
 * info?.block        // "Dingbats"
 * ```
 */
export function charInfo(char: string): CharInfo | null {
  const cp = toCodePoint(char);
  const name = CHAR_NAMES.get(cp);
  if (name === undefined) {
    return null;
  }

  const category = getCategory(char);
  const block = getBlockName(cp);

  return {
    codepoint: cp,
    character: char,
    name,
    category,
    categoryName: GENERAL_CATEGORY_NAMES.get(category) ?? category,
    block,
    blockSlug: slugify(block),
    encodings: getEncodings(char),
  };
}

/**
 * Search Unicode characters by name substring.
 *
 * Performs a case-insensitive search over the bundled character name dataset
 * (~2,950 common BMP characters). Returns up to `limit` results.
 *
 * @param query - Case-insensitive name substring to search for.
 * @param limit - Maximum results to return (default: 50).
 *
 * @example
 * ```ts
 * const results = searchCharacters("CHECK MARK");
 * results[0].name       // "CHECK MARK"
 * results[0].character  // "\u2713"
 * ```
 *
 * @example
 * ```ts
 * const arrows = searchCharacters("arrow", 5);
 * // Returns up to 5 characters with "ARROW" in their name
 * ```
 */
export function searchCharacters(query: string, limit = 50): CharInfo[] {
  const queryUpper = query.toUpperCase();
  const results: CharInfo[] = [];

  for (const [cp, name] of CHAR_NAMES) {
    if (results.length >= limit) break;
    if (name.includes(queryUpper)) {
      const char = String.fromCodePoint(cp);
      const category = getCategory(char);
      const block = getBlockName(cp);

      results.push({
        codepoint: cp,
        character: char,
        name,
        category,
        categoryName: GENERAL_CATEGORY_NAMES.get(category) ?? category,
        block,
        blockSlug: slugify(block),
        encodings: getEncodings(char),
      });
    }
  }

  return results;
}

/**
 * Get the full name for a Unicode general category code.
 *
 * @example
 * ```ts
 * getCategoryName("Sm") // "Math Symbol"
 * getCategoryName("Lu") // "Uppercase Letter"
 * ```
 */
export function getCategoryName(categoryCode: string): string {
  return GENERAL_CATEGORY_NAMES.get(categoryCode) ?? categoryCode;
}

/**
 * Look up the character for a named HTML entity.
 *
 * @example
 * ```ts
 * lookupHtmlEntity("&amp;")    // "&"
 * lookupHtmlEntity("&hearts;") // "\u2665"
 * lookupHtmlEntity("&fake;")   // null
 * ```
 */
export function lookupHtmlEntity(entity: string): string | null {
  return HTML_ENTITY_TO_CHAR.get(entity) ?? null;
}

// Re-export data maps for direct access
export { HTML_ENTITIES, HTML_ENTITY_TO_CHAR } from "./data/entities.js";
export { GENERAL_CATEGORY_NAMES } from "./data/unicode.js";
export { CHAR_NAMES } from "./data/names.js";
