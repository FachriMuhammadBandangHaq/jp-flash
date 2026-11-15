/**
 * Mengubah data OpenJLPT menjadi format JP Flash.
 *
 * Pemakaian:
 *   git clone --depth 1 https://github.com/evanclan/OpenJLPT.git ../OpenJLPT
 *   npm run import:data -- ../OpenJLPT
 *
 * Hasil: src/data/generated/{kanji,vocabulary,meta}.json (ikut di-commit).
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { JLPT_LEVELS, JLPT_TO_JFT, isJlptLevel } from '../src/types/level'
import type { ExampleSentence, Kanji, Vocabulary } from '../src/types'

/** Level kosakata yang di-import. Tambahkan 'N4' dst. saat siap. */
const VOCAB_LEVELS = ['N5'] as const

// ---- Bentuk data mentah OpenJLPT (hanya field yang kita pakai) ----
interface RawKanji {
  character: string
  level: string
  strokes: number
  radical?: string
  onyomi: string[]
  kunyomi: string[]
  meanings: string[]
}

interface RawExample {
  ja: string
  furigana?: string
  en: string
  tatoeba_id: number
}

interface RawVocab {
  id: string
  word: string
  reading: string
  meanings: string[]
  level: string
  pos: string[]
  examples?: RawExample[]
}

const sourceDir = resolve(process.argv[2] ?? '../OpenJLPT')
const outDir = resolve('src/data/generated')

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(join(sourceDir, path), 'utf8')) as T
}

function toLevel(value: string) {
  if (!isJlptLevel(value)) throw new Error(`Level tidak dikenal: "${value}"`)
  return value
}

// 1. Semua kanji (N5–N1), supaya setiap kanji di kosakata bisa ditemukan.
const allKanji = new Map<string, Kanji>()
for (const level of JLPT_LEVELS) {
  for (const raw of readJson<RawKanji[]>(`data/json/kanji/${level.toLowerCase()}.json`)) {
    const jlptLevel = toLevel(raw.level)
    allKanji.set(raw.character, {
      id: raw.character,
      character: raw.character,
      meanings: raw.meanings,
      onyomi: raw.onyomi,
      kunyomi: raw.kunyomi,
      strokeCount: raw.strokes,
      jlptLevel,
      jftLevel: JLPT_TO_JFT[jlptLevel],
      radical: raw.radical || undefined,
    })
  }
}

// 2. Kosakata level terpilih, dengan relasi ke kanji.
const vocabulary: Vocabulary[] = []
for (const level of VOCAB_LEVELS) {
  for (const raw of readJson<RawVocab[]>(`data/json/vocab/${level.toLowerCase()}.json`)) {
    const jlptLevel = toLevel(raw.level)
    vocabulary.push({
      id: raw.id,
      word: raw.word,
      reading: raw.reading,
      meanings: raw.meanings,
      partsOfSpeech: raw.pos,
      jlptLevel,
      jftLevel: JLPT_TO_JFT[jlptLevel],
      examples: (raw.examples ?? []).map(
        (e): ExampleSentence => ({
          sentence: e.ja,
          furigana: e.furigana || undefined,
          translation: e.en,
          tatoebaId: e.tatoeba_id,
        }),
      ),
      // Ambil karakter yang ada di data kanji. 々 (tanda pengulangan) dan kanji tanpa data otomatis terlewati.
      kanjiIds: [...new Set([...raw.word].filter((char) => allKanji.has(char)))],
    })
  }
}

// 3. Simpan hanya kanji yang relevan: semua kanji level terpilih + kanji yang dipakai kosakata.
const neededIds = new Set(vocabulary.flatMap((v) => v.kanjiIds))
const kanji = [...allKanji.values()].filter(
  (k) => (VOCAB_LEVELS as readonly string[]).includes(k.jlptLevel) || neededIds.has(k.id),
)

function write(name: string, data: unknown) {
  writeFileSync(join(outDir, name), JSON.stringify(data, null, 2) + '\n')
}

const sourceMeta = readJson<{ version: string }>('data/json/meta.json')
let commit = 'unknown'
try {
  commit = execSync('git rev-parse --short HEAD', { cwd: sourceDir }).toString().trim()
} catch {
  // Sumber bukan repo git: biarkan 'unknown'.
}

write('kanji.json', kanji)
write('vocabulary.json', vocabulary)
write('meta.json', {
  source: 'OpenJLPT',
  sourceVersion: sourceMeta.version,
  sourceCommit: commit,
  license: 'CC BY-SA 4.0',
  vocabLevels: VOCAB_LEVELS,
  counts: { kanji: kanji.length, vocabulary: vocabulary.length },
})

console.log(`✔ ${vocabulary.length} kosakata, ${kanji.length} kanji → ${outDir}`)
