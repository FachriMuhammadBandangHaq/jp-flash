import { describe, expect, it } from 'vitest'
import { JLPT_LEVELS, JFT_LEVELS } from '../types'
import { dictionary } from '.'
import { buildDictionary, getKanjiForVocabulary, getVocabularyForKanji } from './dictionary'
import { sampleKanji, sampleVocabulary } from './sample'

describe('buildDictionary (data contoh)', () => {
  const dict = buildDictionary(sampleKanji, sampleVocabulary)

  it('mencari kanji dan kosakata berdasarkan ID', () => {
    expect(dict.kanjiById.get('日')?.strokeCount).toBe(4)
    expect(dict.vocabularyById.get('sample-nihon')?.word).toBe('日本')
  })

  it('membangun relasi kebalikan: kanji → kosakata', () => {
    const words = getVocabularyForKanji(dict, '日').map((v) => v.word)
    expect(words).toEqual(['日本', '毎日'])
  })

  it('mengembalikan array kosong untuk kanji tanpa kosakata', () => {
    expect(getVocabularyForKanji(dict, '山')).toEqual([])
  })

  it('mengembalikan kanji penyusun sesuai urutan, melewati ID yang tidak ada datanya', () => {
    const nihon = dict.vocabularyById.get('sample-nihon')!
    expect(getKanjiForVocabulary(dict, nihon).map((k) => k.character)).toEqual(['日', '本'])

    const mainichi = dict.vocabularyById.get('sample-mainichi')!
    expect(getKanjiForVocabulary(dict, mainichi).map((k) => k.character)).toEqual(['日'])
  })
})

describe('data hasil import OpenJLPT', () => {
  const { kanjiList, vocabularyList, kanjiById } = dictionary

  it('berisi seluruh kosakata dan kanji N5', () => {
    expect(vocabularyList.filter((v) => v.jlptLevel === 'N5')).toHaveLength(674)
    expect(kanjiList.filter((k) => k.jlptLevel === 'N5')).toHaveLength(84)
  })

  it('setiap ID unik', () => {
    expect(new Set(vocabularyList.map((v) => v.id)).size).toBe(vocabularyList.length)
    expect(new Set(kanjiList.map((k) => k.id)).size).toBe(kanjiList.length)
  })

  it('setiap level valid (JSON tidak dicek oleh compiler)', () => {
    for (const item of [...kanjiList, ...vocabularyList]) {
      expect(JLPT_LEVELS).toContain(item.jlptLevel)
      if (item.jftLevel !== undefined) expect(JFT_LEVELS).toContain(item.jftLevel)
    }
  })

  it('setiap kanjiIds menunjuk kanji yang benar-benar ada (integritas referensi)', () => {
    const broken = vocabularyList.flatMap((v) =>
      v.kanjiIds.filter((id) => !kanjiById.has(id)).map((id) => `${v.word} → ${id}`),
    )
    expect(broken).toEqual([])
  })

  it('kanjiIds sesuai dengan kanji yang muncul di kata', () => {
    const kaimono = vocabularyList.find((v) => v.word === '買い物')!
    expect(kaimono.kanjiIds).toEqual(['買', '物'])
  })

  it('field array tidak pernah undefined', () => {
    for (const v of vocabularyList) {
      expect(Array.isArray(v.examples)).toBe(true)
      expect(Array.isArray(v.kanjiIds)).toBe(true)
    }
    for (const k of kanjiList) {
      expect(Array.isArray(k.onyomi)).toBe(true)
      expect(Array.isArray(k.kunyomi)).toBe(true)
    }
  })
})
