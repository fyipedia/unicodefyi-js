/**
 * Unicode general category names and block ranges.
 *
 * Provides human-readable names for Unicode general categories (UAX #44)
 * and block lookup by codepoint.
 */

// ── General category names (ISO 15924 / UAX #44) ───────────────────────────

/** Map of 2-letter category code to human-readable name. */
export const GENERAL_CATEGORY_NAMES: ReadonlyMap<string, string> = new Map<
  string,
  string
>([
  ["Lu", "Uppercase Letter"],
  ["Ll", "Lowercase Letter"],
  ["Lt", "Titlecase Letter"],
  ["Lm", "Modifier Letter"],
  ["Lo", "Other Letter"],
  ["Mn", "Nonspacing Mark"],
  ["Mc", "Spacing Mark"],
  ["Me", "Enclosing Mark"],
  ["Nd", "Decimal Number"],
  ["Nl", "Letter Number"],
  ["No", "Other Number"],
  ["Pc", "Connector Punctuation"],
  ["Pd", "Dash Punctuation"],
  ["Ps", "Open Punctuation"],
  ["Pe", "Close Punctuation"],
  ["Pi", "Initial Punctuation"],
  ["Pf", "Final Punctuation"],
  ["Po", "Other Punctuation"],
  ["Sm", "Math Symbol"],
  ["Sc", "Currency Symbol"],
  ["Sk", "Modifier Symbol"],
  ["So", "Other Symbol"],
  ["Zs", "Space Separator"],
  ["Zl", "Line Separator"],
  ["Zp", "Paragraph Separator"],
  ["Cc", "Control"],
  ["Cf", "Format"],
  ["Cs", "Surrogate"],
  ["Co", "Private Use"],
  ["Cn", "Unassigned"],
]);

// ── Unicode block ranges ────────────────────────────────────────────────────

/** A Unicode block defined by its start, end (inclusive), and name. */
type BlockRange = readonly [start: number, end: number, name: string];

/**
 * Unicode block ranges sorted by start codepoint.
 * Covers BMP and common supplementary plane blocks.
 */
const UNICODE_BLOCKS: readonly BlockRange[] = [
  [0x0000, 0x007f, "Basic Latin"],
  [0x0080, 0x00ff, "Latin-1 Supplement"],
  [0x0100, 0x017f, "Latin Extended-A"],
  [0x0180, 0x024f, "Latin Extended-B"],
  [0x0250, 0x02af, "IPA Extensions"],
  [0x02b0, 0x02ff, "Spacing Modifier Letters"],
  [0x0300, 0x036f, "Combining Diacritical Marks"],
  [0x0370, 0x03ff, "Greek and Coptic"],
  [0x0400, 0x04ff, "Cyrillic"],
  [0x0500, 0x052f, "Cyrillic Supplement"],
  [0x0530, 0x058f, "Armenian"],
  [0x0590, 0x05ff, "Hebrew"],
  [0x0600, 0x06ff, "Arabic"],
  [0x0700, 0x074f, "Syriac"],
  [0x0780, 0x07bf, "Thaana"],
  [0x0900, 0x097f, "Devanagari"],
  [0x0980, 0x09ff, "Bengali"],
  [0x0a00, 0x0a7f, "Gurmukhi"],
  [0x0a80, 0x0aff, "Gujarati"],
  [0x0b00, 0x0b7f, "Oriya"],
  [0x0b80, 0x0bff, "Tamil"],
  [0x0c00, 0x0c7f, "Telugu"],
  [0x0c80, 0x0cff, "Kannada"],
  [0x0d00, 0x0d7f, "Malayalam"],
  [0x0d80, 0x0dff, "Sinhala"],
  [0x0e00, 0x0e7f, "Thai"],
  [0x0e80, 0x0eff, "Lao"],
  [0x0f00, 0x0fff, "Tibetan"],
  [0x1000, 0x109f, "Myanmar"],
  [0x10a0, 0x10ff, "Georgian"],
  [0x1100, 0x11ff, "Hangul Jamo"],
  [0x1200, 0x137f, "Ethiopic"],
  [0x13a0, 0x13ff, "Cherokee"],
  [0x1400, 0x167f, "Unified Canadian Aboriginal Syllabics"],
  [0x1680, 0x169f, "Ogham"],
  [0x16a0, 0x16ff, "Runic"],
  [0x1700, 0x171f, "Tagalog"],
  [0x1780, 0x17ff, "Khmer"],
  [0x1800, 0x18af, "Mongolian"],
  [0x1e00, 0x1eff, "Latin Extended Additional"],
  [0x1f00, 0x1fff, "Greek Extended"],
  [0x2000, 0x206f, "General Punctuation"],
  [0x2070, 0x209f, "Superscripts and Subscripts"],
  [0x20a0, 0x20cf, "Currency Symbols"],
  [0x20d0, 0x20ff, "Combining Diacritical Marks for Symbols"],
  [0x2100, 0x214f, "Letterlike Symbols"],
  [0x2150, 0x218f, "Number Forms"],
  [0x2190, 0x21ff, "Arrows"],
  [0x2200, 0x22ff, "Mathematical Operators"],
  [0x2300, 0x23ff, "Miscellaneous Technical"],
  [0x2400, 0x243f, "Control Pictures"],
  [0x2440, 0x245f, "Optical Character Recognition"],
  [0x2460, 0x24ff, "Enclosed Alphanumerics"],
  [0x2500, 0x257f, "Box Drawing"],
  [0x2580, 0x259f, "Block Elements"],
  [0x25a0, 0x25ff, "Geometric Shapes"],
  [0x2600, 0x26ff, "Miscellaneous Symbols"],
  [0x2700, 0x27bf, "Dingbats"],
  [0x27c0, 0x27ef, "Miscellaneous Mathematical Symbols-A"],
  [0x27f0, 0x27ff, "Supplemental Arrows-A"],
  [0x2800, 0x28ff, "Braille Patterns"],
  [0x2900, 0x297f, "Supplemental Arrows-B"],
  [0x2980, 0x29ff, "Miscellaneous Mathematical Symbols-B"],
  [0x2a00, 0x2aff, "Supplemental Mathematical Operators"],
  [0x2b00, 0x2bff, "Miscellaneous Symbols and Arrows"],
  [0x2e80, 0x2eff, "CJK Radicals Supplement"],
  [0x2f00, 0x2fdf, "Kangxi Radicals"],
  [0x3000, 0x303f, "CJK Symbols and Punctuation"],
  [0x3040, 0x309f, "Hiragana"],
  [0x30a0, 0x30ff, "Katakana"],
  [0x3100, 0x312f, "Bopomofo"],
  [0x3130, 0x318f, "Hangul Compatibility Jamo"],
  [0x31f0, 0x31ff, "Katakana Phonetic Extensions"],
  [0x3200, 0x32ff, "Enclosed CJK Letters and Months"],
  [0x3300, 0x33ff, "CJK Compatibility"],
  [0x3400, 0x4dbf, "CJK Unified Ideographs Extension A"],
  [0x4dc0, 0x4dff, "Yijing Hexagram Symbols"],
  [0x4e00, 0x9fff, "CJK Unified Ideographs"],
  [0xa000, 0xa48f, "Yi Syllables"],
  [0xa490, 0xa4cf, "Yi Radicals"],
  [0xac00, 0xd7af, "Hangul Syllables"],
  [0xe000, 0xf8ff, "Private Use Area"],
  [0xf900, 0xfaff, "CJK Compatibility Ideographs"],
  [0xfb00, 0xfb06, "Alphabetic Presentation Forms"],
  [0xfb50, 0xfdff, "Arabic Presentation Forms-A"],
  [0xfe00, 0xfe0f, "Variation Selectors"],
  [0xfe20, 0xfe2f, "Combining Half Marks"],
  [0xfe30, 0xfe4f, "CJK Compatibility Forms"],
  [0xfe50, 0xfe6f, "Small Form Variants"],
  [0xfe70, 0xfeff, "Arabic Presentation Forms-B"],
  [0xff00, 0xffef, "Halfwidth and Fullwidth Forms"],
  [0xfff0, 0xffff, "Specials"],
  [0x10000, 0x1007f, "Linear B Syllabary"],
  [0x10080, 0x100ff, "Linear B Ideograms"],
  [0x10300, 0x1032f, "Old Italic"],
  [0x10330, 0x1034f, "Gothic"],
  [0x10400, 0x1044f, "Deseret"],
  [0x1d000, 0x1d0ff, "Byzantine Musical Symbols"],
  [0x1d100, 0x1d1ff, "Musical Symbols"],
  [0x1d400, 0x1d7ff, "Mathematical Alphanumeric Symbols"],
  [0x1f000, 0x1f02f, "Mahjong Tiles"],
  [0x1f030, 0x1f09f, "Domino Tiles"],
  [0x1f0a0, 0x1f0ff, "Playing Cards"],
  [0x1f100, 0x1f1ff, "Enclosed Alphanumeric Supplement"],
  [0x1f200, 0x1f2ff, "Enclosed Ideographic Supplement"],
  [0x1f300, 0x1f5ff, "Miscellaneous Symbols and Pictographs"],
  [0x1f600, 0x1f64f, "Emoticons"],
  [0x1f680, 0x1f6ff, "Transport and Map Symbols"],
  [0x1f900, 0x1f9ff, "Supplemental Symbols and Pictographs"],
  [0x20000, 0x2a6df, "CJK Unified Ideographs Extension B"],
  [0xe0000, 0xe007f, "Tags"],
  [0xe0100, 0xe01ef, "Variation Selectors Supplement"],
  [0xf0000, 0xfffff, "Supplementary Private Use Area-A"],
  [0x100000, 0x10ffff, "Supplementary Private Use Area-B"],
];

/**
 * Look up the Unicode block name for a codepoint.
 * Uses binary search over the sorted block ranges.
 *
 * @returns The block name, or empty string if the codepoint falls in a gap.
 */
export function getBlockName(cp: number): string {
  let lo = 0;
  let hi = UNICODE_BLOCKS.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const [start, end, name] = UNICODE_BLOCKS[mid];

    if (cp < start) {
      hi = mid - 1;
    } else if (cp > end) {
      lo = mid + 1;
    } else {
      return name;
    }
  }

  return "";
}

/** Convert a block or script name to a URL-friendly slug. */
export function slugify(name: string): string {
  return name.toLowerCase().replace(/ /g, "-").replace(/_/g, "-");
}
