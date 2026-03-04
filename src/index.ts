/**
 * unicodefyi -- Pure TypeScript Unicode toolkit.
 *
 * Compute 17 encoding representations (Unicode, HTML, CSS, JavaScript,
 * Python, Java, Go, Ruby, Rust, C/C++, UTF-8, UTF-16, UTF-32, URL)
 * for any Unicode character. Includes character info (name, category,
 * block), name-based search, and 92 HTML entity mappings.
 *
 * Zero dependencies.
 *
 * @example
 * ```ts
 * import { getEncodings, charInfo, searchCharacters } from "unicodefyi";
 *
 * const enc = getEncodings("\u2713");
 * console.log(enc.unicode);    // "U+2713"
 * console.log(enc.htmlEntity); // "&check;"
 * console.log(enc.rust);       // "\\u{2713}"
 * console.log(enc.utf8Bytes);  // "e2 9c 93"
 *
 * const info = charInfo("\u2713");
 * console.log(info?.name);         // "CHECK MARK"
 * console.log(info?.categoryName); // "Other Symbol"
 * console.log(info?.block);        // "Dingbats"
 *
 * const results = searchCharacters("arrow", 5);
 * console.log(results[0].name); // "LEFTWARDS ARROW"
 * ```
 *
 * @see https://unicodefyi.com
 * @see https://pypi.org/project/unicodefyi/
 * @packageDocumentation
 */

// Types
export type { EncodingInfo, CharInfo } from "./types.js";

// Core functions
export {
  getEncodings,
  charInfo,
  searchCharacters,
  getCategoryName,
  lookupHtmlEntity,
} from "./engine.js";

// Data maps
export {
  HTML_ENTITIES,
  HTML_ENTITY_TO_CHAR,
  GENERAL_CATEGORY_NAMES,
  CHAR_NAMES,
} from "./engine.js";
