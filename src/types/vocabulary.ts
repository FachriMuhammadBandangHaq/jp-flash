import type { JftLevel, JlptLevel } from './level'

export interface Vocabulary {
  /** ID stabil dari OpenJLPT (mis. 'ada066edfd'). Tetap sama walau data diperbarui. */
  id: string
  word: string
  reading: string
  meanings: string[]
  /** Kode part of speech JMdict, mis. ['v5u', 'vi']. Satu kata bisa punya beberapa. */
  partsOfSpeech: string[]
  jlptLevel: JlptLevel
  jftLevel?: JftLevel
  /** Contoh kalimat. Array kosong jika tidak ada. */
  examples: ExampleSentence[]
  /**
   * ID kanji penyusun kata, berurutan. Array kosong untuk kata tanpa kanji (mis. ありがとう).
   * Hanya berisi kanji yang datanya tersedia, sehingga setiap ID pasti bisa ditemukan.
   * Relasi kebalikannya (kanji → kosakata) TIDAK disimpan, tapi diturunkan lewat kode.
   */
  kanjiIds: string[]
}

export interface ExampleSentence {
  sentence: string
  /** Kalimat dengan furigana, format `{漢字|かんじ}`. Tidak semua contoh memilikinya. */
  furigana?: string
  translation: string
  /** ID kalimat di Tatoeba, untuk atribusi: https://tatoeba.org/sentences/show/<id> */
  tatoebaId: number
}
