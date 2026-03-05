import { getEncodings, charInfo, searchCharacters } from './dist/index.js'

const C = { r: '\x1b[0m', b: '\x1b[1m', d: '\x1b[2m', y: '\x1b[33m', g: '\x1b[32m', c: '\x1b[36m' }

// 1. Encode λ to 17 formats
const enc = getEncodings('\u03BB')
console.log(`${C.b}${C.y}Encode: λ ${C.d}(GREEK SMALL LETTER LAMDA)${C.r}`)
console.log(`  ${C.c}Unicode ${C.r} ${C.g}${enc.unicode}${C.r}`)
console.log(`  ${C.c}HTML    ${C.r} ${C.g}${enc.htmlHex}${C.r}`)
console.log(`  ${C.c}CSS     ${C.r} ${C.g}${enc.css}${C.r}`)
console.log(`  ${C.c}JS      ${C.r} ${C.g}${enc.javascript}${C.r}`)
console.log(`  ${C.c}Python  ${C.r} ${C.g}${enc.python}${C.r}`)
console.log(`  ${C.c}UTF-8   ${C.r} ${C.g}${enc.utf8Bytes}${C.r}`)

console.log()

// 2. Character info
const info = charInfo('\u03C0')
console.log(`${C.b}${C.y}Info: ${info.character} ${C.d}(${info.name})${C.r}`)
console.log(`  ${C.c}Category${C.r} ${C.g}${info.categoryName}${C.r} ${C.d}(${info.category})${C.r}`)
console.log(`  ${C.c}Block   ${C.r} ${C.g}${info.block}${C.r}`)
console.log(`  ${C.c}Unicode ${C.r} ${C.g}${info.encodings.unicode}${C.r}`)

console.log()

// 3. Search
const results = searchCharacters('arrow', 5)
console.log(`${C.b}${C.y}Search: "arrow"${C.r}`)
for (const r of results) {
  console.log(`  ${C.g}${r.character || ' '}${C.r}  ${C.c}${r.encodings.unicode}${C.r}  ${C.d}${r.name}${C.r}`)
}
