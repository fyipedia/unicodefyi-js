import { describe, expect, it } from "vitest";
import {
  getEncodings,
  charInfo,
  searchCharacters,
  getCategoryName,
  lookupHtmlEntity,
  HTML_ENTITIES,
  HTML_ENTITY_TO_CHAR,
  GENERAL_CATEGORY_NAMES,
  CHAR_NAMES,
} from "../src/index.js";

// ── getEncodings ────────────────────────────────────────────────────────────

describe("getEncodings", () => {
  describe("ASCII character: A (U+0041)", () => {
    const enc = getEncodings("A");

    it("unicode", () => expect(enc.unicode).toBe("U+0041"));
    it("decimal", () => expect(enc.decimal).toBe("65"));
    it("htmlDecimal", () => expect(enc.htmlDecimal).toBe("&#65;"));
    it("htmlHex", () => expect(enc.htmlHex).toBe("&#x41;"));
    it("htmlEntity", () => expect(enc.htmlEntity).toBe(""));
    it("css", () => expect(enc.css).toBe("\\0041"));
    it("javascript", () => expect(enc.javascript).toBe("\\u{41}"));
    it("python", () => expect(enc.python).toBe("\\u0041"));
    it("java", () => expect(enc.java).toBe("\\u0041"));
    it("go", () => expect(enc.go).toBe("\\u0041"));
    it("ruby", () => expect(enc.ruby).toBe("\\u{41}"));
    it("rust", () => expect(enc.rust).toBe("\\u{41}"));
    it("cCpp", () => expect(enc.cCpp).toBe("\\u0041"));
    it("urlEncoded", () => expect(enc.urlEncoded).toBe("A"));
    it("utf8Bytes", () => expect(enc.utf8Bytes).toBe("41"));
    it("utf16beBytes", () => expect(enc.utf16beBytes).toBe("00 41"));
    it("utf32beBytes", () => expect(enc.utf32beBytes).toBe("00 00 00 41"));
  });

  describe("BMP character: CHECK MARK (U+2713)", () => {
    const enc = getEncodings("\u2713");

    it("unicode", () => expect(enc.unicode).toBe("U+2713"));
    it("decimal", () => expect(enc.decimal).toBe("10003"));
    it("htmlDecimal", () => expect(enc.htmlDecimal).toBe("&#10003;"));
    it("htmlHex", () => expect(enc.htmlHex).toBe("&#x2713;"));
    it("htmlEntity", () => expect(enc.htmlEntity).toBe("&check;"));
    it("css", () => expect(enc.css).toBe("\\2713"));
    it("javascript", () => expect(enc.javascript).toBe("\\u{2713}"));
    it("python", () => expect(enc.python).toBe("\\u2713"));
    it("java", () => expect(enc.java).toBe("\\u2713"));
    it("go", () => expect(enc.go).toBe("\\u2713"));
    it("ruby", () => expect(enc.ruby).toBe("\\u{2713}"));
    it("rust", () => expect(enc.rust).toBe("\\u{2713}"));
    it("cCpp", () => expect(enc.cCpp).toBe("\\u2713"));
    it("urlEncoded", () => expect(enc.urlEncoded).toBe("%E2%9C%93"));
    it("utf8Bytes", () => expect(enc.utf8Bytes).toBe("e2 9c 93"));
    it("utf16beBytes", () => expect(enc.utf16beBytes).toBe("27 13"));
    it("utf32beBytes", () => expect(enc.utf32beBytes).toBe("00 00 27 13"));
  });

  describe("Supplementary plane: GRINNING FACE (U+1F600)", () => {
    const enc = getEncodings("\uD83D\uDE00"); // U+1F600

    it("unicode", () => expect(enc.unicode).toBe("U+1F600"));
    it("decimal", () => expect(enc.decimal).toBe("128512"));
    it("htmlDecimal", () => expect(enc.htmlDecimal).toBe("&#128512;"));
    it("htmlHex", () => expect(enc.htmlHex).toBe("&#x1F600;"));
    it("htmlEntity", () => expect(enc.htmlEntity).toBe(""));
    it("css", () => expect(enc.css).toBe("\\1F600"));
    it("javascript", () => expect(enc.javascript).toBe("\\u{1F600}"));
    it("python", () => expect(enc.python).toBe("\\U0001f600"));
    it("java", () => expect(enc.java).toBe("\\uD83D\\uDE00"));
    it("go", () => expect(enc.go).toBe("\\U0001F600"));
    it("ruby", () => expect(enc.ruby).toBe("\\u{1F600}"));
    it("rust", () => expect(enc.rust).toBe("\\u{1F600}"));
    it("cCpp", () => expect(enc.cCpp).toBe("\\U0001f600"));
    it("urlEncoded", () => expect(enc.urlEncoded).toBe("%F0%9F%98%80"));
    it("utf8Bytes", () => expect(enc.utf8Bytes).toBe("f0 9f 98 80"));
    it("utf16beBytes", () => expect(enc.utf16beBytes).toBe("d8 3d de 00"));
    it("utf32beBytes", () => expect(enc.utf32beBytes).toBe("00 01 f6 00"));
  });

  describe("HTML entity characters", () => {
    it("ampersand has named entity", () => {
      const enc = getEncodings("&");
      expect(enc.htmlEntity).toBe("&amp;");
      expect(enc.unicode).toBe("U+0026");
    });

    it("less-than has named entity", () => {
      const enc = getEncodings("<");
      expect(enc.htmlEntity).toBe("&lt;");
    });

    it("greater-than has named entity", () => {
      const enc = getEncodings(">");
      expect(enc.htmlEntity).toBe("&gt;");
    });

    it("copyright sign has named entity", () => {
      const enc = getEncodings("\u00A9");
      expect(enc.htmlEntity).toBe("&copy;");
    });

    it("hearts suit has named entity", () => {
      const enc = getEncodings("\u2665");
      expect(enc.htmlEntity).toBe("&hearts;");
    });

    it("euro sign has named entity", () => {
      const enc = getEncodings("\u20AC");
      expect(enc.htmlEntity).toBe("&euro;");
    });
  });

  describe("edge cases", () => {
    it("space character", () => {
      const enc = getEncodings(" ");
      expect(enc.unicode).toBe("U+0020");
      expect(enc.decimal).toBe("32");
      expect(enc.urlEncoded).toBe("%20");
    });

    it("tilde is unreserved in URL encoding", () => {
      const enc = getEncodings("~");
      expect(enc.urlEncoded).toBe("~");
    });

    it("slash is percent-encoded", () => {
      const enc = getEncodings("/");
      expect(enc.urlEncoded).toBe("%2F");
    });

    it("throws on empty string", () => {
      expect(() => getEncodings("")).toThrow();
    });

    it("throws on multi-character string", () => {
      expect(() => getEncodings("AB")).toThrow();
    });
  });

  describe("cross-validation with Python output formats", () => {
    it("CSS uses 4-digit minimum padding", () => {
      // Python: f"\\{cp:04X}" -> \0041 for 'A'
      expect(getEncodings("A").css).toBe("\\0041");
      // But for codepoints > 4 hex digits, no padding needed
      expect(getEncodings("\uD83D\uDE00").css).toBe("\\1F600");
    });

    it("Python uses lowercase hex", () => {
      expect(getEncodings("\uD83D\uDE00").python).toBe("\\U0001f600");
    });

    it("Java uses uppercase hex", () => {
      expect(getEncodings("\u2713").java).toBe("\\u2713");
    });

    it("Go uses uppercase for supplementary", () => {
      expect(getEncodings("\uD83D\uDE00").go).toBe("\\U0001F600");
    });

    it("C/C++ uses lowercase hex", () => {
      expect(getEncodings("\uD83D\uDE00").cCpp).toBe("\\U0001f600");
    });
  });
});

// ── charInfo ────────────────────────────────────────────────────────────────

describe("charInfo", () => {
  describe("CHECK MARK (U+2713)", () => {
    const info = charInfo("\u2713");

    it("returns non-null for known character", () => {
      expect(info).not.toBeNull();
    });

    it("has correct codepoint", () => {
      expect(info?.codepoint).toBe(0x2713);
    });

    it("has correct character", () => {
      expect(info?.character).toBe("\u2713");
    });

    it("has correct name", () => {
      expect(info?.name).toBe("CHECK MARK");
    });

    it("has correct category", () => {
      expect(info?.category).toBe("So");
    });

    it("has correct category name", () => {
      expect(info?.categoryName).toBe("Other Symbol");
    });

    it("has correct block", () => {
      expect(info?.block).toBe("Dingbats");
    });

    it("has correct block slug", () => {
      expect(info?.blockSlug).toBe("dingbats");
    });

    it("includes encodings", () => {
      expect(info?.encodings.unicode).toBe("U+2713");
      expect(info?.encodings.htmlEntity).toBe("&check;");
    });
  });

  describe("LATIN CAPITAL LETTER A (U+0041)", () => {
    const info = charInfo("A");

    it("has correct name", () => {
      expect(info?.name).toBe("LATIN CAPITAL LETTER A");
    });

    it("has correct category", () => {
      expect(info?.category).toBe("Lu");
    });

    it("has correct category name", () => {
      expect(info?.categoryName).toBe("Uppercase Letter");
    });

    it("has correct block", () => {
      expect(info?.block).toBe("Basic Latin");
    });

    it("has correct block slug", () => {
      expect(info?.blockSlug).toBe("basic-latin");
    });
  });

  describe("EURO SIGN (U+20AC)", () => {
    const info = charInfo("\u20AC");

    it("has correct name", () => {
      expect(info?.name).toBe("EURO SIGN");
    });

    it("has correct category", () => {
      expect(info?.category).toBe("Sc");
    });

    it("has correct category name", () => {
      expect(info?.categoryName).toBe("Currency Symbol");
    });

    it("has correct block", () => {
      expect(info?.block).toBe("Currency Symbols");
    });
  });

  describe("LEFTWARDS ARROW (U+2190)", () => {
    const info = charInfo("\u2190");

    it("has correct name", () => {
      expect(info?.name).toBe("LEFTWARDS ARROW");
    });

    it("has correct block", () => {
      expect(info?.block).toBe("Arrows");
    });
  });

  describe("edge cases", () => {
    it("returns null for supplementary plane character not in dataset", () => {
      // Emoji are not in the bundled name dataset
      expect(charInfo("\uD83D\uDE00")).toBeNull();
    });

    it("returns null for CJK ideograph not in dataset", () => {
      expect(charInfo("\u4E00")).toBeNull();
    });

    it("throws on empty string", () => {
      expect(() => charInfo("")).toThrow();
    });

    it("throws on multi-character string", () => {
      expect(() => charInfo("AB")).toThrow();
    });
  });

  describe("various categories", () => {
    it("lowercase letter", () => {
      const info = charInfo("a");
      expect(info?.category).toBe("Ll");
      expect(info?.categoryName).toBe("Lowercase Letter");
    });

    it("digit", () => {
      const info = charInfo("0");
      expect(info?.category).toBe("Nd");
      expect(info?.categoryName).toBe("Decimal Number");
    });

    it("punctuation", () => {
      const info = charInfo("!");
      expect(info?.category).toBe("Po");
      expect(info?.categoryName).toBe("Other Punctuation");
    });

    it("math symbol", () => {
      const info = charInfo("+");
      expect(info?.category).toBe("Sm");
      expect(info?.categoryName).toBe("Math Symbol");
    });

    it("space separator", () => {
      const info = charInfo(" ");
      expect(info?.category).toBe("Zs");
      expect(info?.categoryName).toBe("Space Separator");
    });
  });
});

// ── searchCharacters ────────────────────────────────────────────────────────

describe("searchCharacters", () => {
  it("finds CHECK MARK", () => {
    const results = searchCharacters("CHECK MARK");
    expect(results.length).toBeGreaterThan(0);
    // Multiple characters contain "CHECK MARK" in their name
    const exact = results.find((r) => r.name === "CHECK MARK");
    expect(exact).toBeDefined();
    expect(exact?.character).toBe("\u2713");
  });

  it("is case-insensitive", () => {
    const upper = searchCharacters("CHECK MARK");
    const lower = searchCharacters("check mark");
    expect(upper.length).toBe(lower.length);
    expect(upper[0].name).toBe(lower[0].name);
  });

  it("finds multiple arrow characters", () => {
    const results = searchCharacters("ARROW");
    expect(results.length).toBeGreaterThan(10);
    // All results should contain "ARROW" in the name
    for (const r of results) {
      expect(r.name.toUpperCase()).toContain("ARROW");
    }
  });

  it("respects limit parameter", () => {
    const results = searchCharacters("ARROW", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns empty for non-matching query", () => {
    const results = searchCharacters("XYZNONEXISTENT");
    expect(results).toEqual([]);
  });

  it("returns CharInfo with all fields", () => {
    const results = searchCharacters("EURO SIGN", 1);
    expect(results.length).toBe(1);
    const r = results[0];
    expect(r.codepoint).toBe(0x20ac);
    expect(r.character).toBe("\u20AC");
    expect(r.name).toBe("EURO SIGN");
    expect(r.category).toBe("Sc");
    expect(r.categoryName).toBe("Currency Symbol");
    expect(r.block).toBe("Currency Symbols");
    expect(r.encodings.htmlEntity).toBe("&euro;");
  });

  it("finds SPACE", () => {
    const results = searchCharacters("SPACE", 5);
    expect(results.length).toBeGreaterThan(0);
    const spaceResult = results.find((r) => r.name === "SPACE");
    expect(spaceResult).toBeDefined();
    expect(spaceResult?.character).toBe(" ");
  });

  it("defaults to limit of 50", () => {
    // "LETTER" should match many characters
    const results = searchCharacters("LETTER");
    expect(results.length).toBeLessThanOrEqual(50);
  });
});

// ── getCategoryName ─────────────────────────────────────────────────────────

describe("getCategoryName", () => {
  it("returns name for known categories", () => {
    expect(getCategoryName("Lu")).toBe("Uppercase Letter");
    expect(getCategoryName("Ll")).toBe("Lowercase Letter");
    expect(getCategoryName("Nd")).toBe("Decimal Number");
    expect(getCategoryName("Sm")).toBe("Math Symbol");
    expect(getCategoryName("So")).toBe("Other Symbol");
    expect(getCategoryName("Sc")).toBe("Currency Symbol");
    expect(getCategoryName("Zs")).toBe("Space Separator");
    expect(getCategoryName("Cc")).toBe("Control");
  });

  it("returns the code itself for unknown categories", () => {
    expect(getCategoryName("XX")).toBe("XX");
  });
});

// ── lookupHtmlEntity ────────────────────────────────────────────────────────

describe("lookupHtmlEntity", () => {
  it("resolves &amp; to &", () => {
    expect(lookupHtmlEntity("&amp;")).toBe("&");
  });

  it("resolves &hearts; to heart suit", () => {
    expect(lookupHtmlEntity("&hearts;")).toBe("\u2665");
  });

  it("resolves &check; to check mark", () => {
    expect(lookupHtmlEntity("&check;")).toBe("\u2713");
  });

  it("resolves &euro; to euro sign", () => {
    expect(lookupHtmlEntity("&euro;")).toBe("\u20AC");
  });

  it("returns null for unknown entity", () => {
    expect(lookupHtmlEntity("&fake;")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(lookupHtmlEntity("")).toBeNull();
  });
});

// ── Data maps ───────────────────────────────────────────────────────────────

describe("HTML_ENTITIES", () => {
  it("has 90 entries", () => {
    expect(HTML_ENTITIES.size).toBe(90);
  });

  it("HTML_ENTITY_TO_CHAR is the reverse", () => {
    expect(HTML_ENTITY_TO_CHAR.size).toBe(90);
    for (const [cp, entity] of HTML_ENTITIES) {
      expect(HTML_ENTITY_TO_CHAR.get(entity)).toBe(String.fromCodePoint(cp));
    }
  });
});

describe("GENERAL_CATEGORY_NAMES", () => {
  it("has 30 category entries", () => {
    expect(GENERAL_CATEGORY_NAMES.size).toBe(30);
  });

  it("covers all standard categories", () => {
    const expected = [
      "Lu", "Ll", "Lt", "Lm", "Lo",
      "Mn", "Mc", "Me",
      "Nd", "Nl", "No",
      "Pc", "Pd", "Ps", "Pe", "Pi", "Pf", "Po",
      "Sm", "Sc", "Sk", "So",
      "Zs", "Zl", "Zp",
      "Cc", "Cf", "Cs", "Co", "Cn",
    ];
    for (const code of expected) {
      expect(GENERAL_CATEGORY_NAMES.has(code)).toBe(true);
    }
  });
});

describe("CHAR_NAMES", () => {
  it("has approximately 2950 entries", () => {
    expect(CHAR_NAMES.size).toBeGreaterThan(2900);
    expect(CHAR_NAMES.size).toBeLessThan(3100);
  });

  it("includes common characters", () => {
    expect(CHAR_NAMES.get(0x0041)).toBe("LATIN CAPITAL LETTER A");
    expect(CHAR_NAMES.get(0x2713)).toBe("CHECK MARK");
    expect(CHAR_NAMES.get(0x20ac)).toBe("EURO SIGN");
    expect(CHAR_NAMES.get(0x2190)).toBe("LEFTWARDS ARROW");
  });
});
