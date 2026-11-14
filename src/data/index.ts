import type { Kanji, Vocabulary } from '../types'
import { buildDictionary } from './dictionary'
import kanjiJson from './generated/kanji.json'
import vocabularyJson from './generated/vocabulary.json'

export { default as dataMeta } from './generated/meta.json'
export * from './dictionary'

// JSON di-import sebagai tipe umum (mis. jlptLevel: string), jadi kita nyatakan bentuknya.
// Kebenaran data ini dijamin oleh test di dictionary.test.ts, bukan oleh compiler.
export const dictionary = buildDictionary(kanjiJson as Kanji[], vocabularyJson as Vocabulary[])
