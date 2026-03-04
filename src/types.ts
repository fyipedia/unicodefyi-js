/**
 * TypeScript interfaces for the unicodefyi Unicode toolkit.
 *
 * Encoding formats cover: Unicode notation, HTML (decimal, hex, named entity),
 * CSS, URL encoding, language escapes (JS, Python, Java, Go, Ruby, Rust, C/C++),
 * and raw bytes (UTF-8, UTF-16 BE, UTF-32 BE).
 */

/**
 * 17 encoding representations for a Unicode character.
 */
export interface EncodingInfo {
  /** Unicode notation, e.g. `U+2713` */
  unicode: string;
  /** Decimal codepoint, e.g. `10003` */
  decimal: string;
  /** HTML decimal reference, e.g. `&#10003;` */
  htmlDecimal: string;
  /** HTML hex reference, e.g. `&#x2713;` */
  htmlHex: string;
  /** HTML named entity if available, e.g. `&check;`, or empty string */
  htmlEntity: string;
  /** CSS escape, e.g. `\2713` */
  css: string;
  /** JavaScript/ES6 escape, e.g. `\u{2713}` */
  javascript: string;
  /** Python escape, e.g. `\u2713` or `\U0001f600` */
  python: string;
  /** Java escape, e.g. `\u2713` or surrogate pair `\uD83D\uDE00` */
  java: string;
  /** Go escape, e.g. `\u2713` or `\U0001F600` */
  go: string;
  /** Ruby escape, e.g. `\u{2713}` */
  ruby: string;
  /** Rust escape, e.g. `\u{2713}` */
  rust: string;
  /** C/C++ escape, e.g. `\u2713` or `\U0001f600` */
  cCpp: string;
  /** URL (percent) encoding, e.g. `%E2%9C%93` */
  urlEncoded: string;
  /** UTF-8 bytes as hex, e.g. `e2 9c 93` */
  utf8Bytes: string;
  /** UTF-16 BE bytes as hex, e.g. `27 13` */
  utf16beBytes: string;
  /** UTF-32 BE bytes as hex, e.g. `00 00 27 13` */
  utf32beBytes: string;
}

/**
 * Full Unicode properties and encodings for a character.
 */
export interface CharInfo {
  /** Numeric codepoint value, e.g. `0x2713` */
  codepoint: number;
  /** The character itself */
  character: string;
  /** Official Unicode name, e.g. `"CHECK MARK"` */
  name: string;
  /** 2-letter general category code, e.g. `"So"` */
  category: string;
  /** Human-readable category name, e.g. `"Other Symbol"` */
  categoryName: string;
  /** Unicode block name, e.g. `"Dingbats"` */
  block: string;
  /** URL-friendly block slug, e.g. `"dingbats"` */
  blockSlug: string;
  /** 17 encoding representations */
  encodings: EncodingInfo;
}
