import type { JftLevel, JlptLevel } from './level'

export interface Vocabulary {
  /** Format: `${word}-${reading}`, mis. '日本-にほん'. `word` saja tidak unik (今日: きょう / こんにち). */
  id: string
  word: string
  reading: string
  meanings: string[]
  /** Disimpan sebagai string karena format dari sumber data (OpenJLPT) belum diketahui. */
  partOfSpeech: string
  jlptLevel: JlptLevel
  jftLevel?: JftLevel
  example?: ExampleSentence
  /**
   * ID kanji penyusun kata, berurutan. Array kosong untuk kata tanpa kanji (mis. ありがとう).
   * Relasi kebalikannya (kanji → kosakata) TIDAK disimpan, tapi diturunkan lewat kode.
   */
  kanjiIds: string[]
}

/** Kalimat dan bacaannya selalu berpasangan, jadi digabung dalam satu objek. */
export interface ExampleSentence {
  sentence: string
  reading: string
}
