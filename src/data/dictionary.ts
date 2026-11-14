import type { Kanji, Vocabulary } from '../types'

/**
 * "Kamus" dalam memori: semua data + index untuk pencarian cepat.
 * Dibuat sekali dari array, lalu dipakai di seluruh aplikasi.
 */
export interface Dictionary {
  kanjiList: Kanji[]
  vocabularyList: Vocabulary[]
  kanjiById: Map<string, Kanji>
  vocabularyById: Map<string, Vocabulary>
  /** Index kebalikan: ID kanji → kosakata yang memakai kanji tersebut. */
  vocabularyByKanjiId: Map<string, Vocabulary[]>
}

export function buildDictionary(kanjiList: Kanji[], vocabularyList: Vocabulary[]): Dictionary {
  const kanjiById = new Map(kanjiList.map((k) => [k.id, k]))
  const vocabularyById = new Map(vocabularyList.map((v) => [v.id, v]))

  // Inilah "relasi diturunkan lewat kode": kita hanya menyimpan Vocabulary.kanjiIds,
  // lalu membalik arahnya di sini sekali saja (O(n)).
  const vocabularyByKanjiId = new Map<string, Vocabulary[]>()
  for (const vocab of vocabularyList) {
    for (const kanjiId of vocab.kanjiIds) {
      const list = vocabularyByKanjiId.get(kanjiId)
      if (list) list.push(vocab)
      else vocabularyByKanjiId.set(kanjiId, [vocab])
    }
  }

  return { kanjiList, vocabularyList, kanjiById, vocabularyById, vocabularyByKanjiId }
}

/** Kanji penyusun sebuah kata, sesuai urutan di kata tersebut. */
export function getKanjiForVocabulary(dict: Dictionary, vocab: Vocabulary): Kanji[] {
  return vocab.kanjiIds
    .map((id) => dict.kanjiById.get(id))
    .filter((k): k is Kanji => k !== undefined)
}

/** Kosakata yang memakai sebuah kanji. Array kosong jika tidak ada. */
export function getVocabularyForKanji(dict: Dictionary, kanjiId: string): Vocabulary[] {
  return dict.vocabularyByKanjiId.get(kanjiId) ?? []
}
