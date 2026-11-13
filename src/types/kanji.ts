import type { JftLevel, JlptLevel } from './level'

export interface Kanji {
  /** Natural key: karakter kanji itu sendiri, mis. '日'. Unik di Unicode. */
  id: string
  character: string
  meanings: string[]
  /** Bacaan on'yomi (katakana). Array kosong jika tidak ada. */
  onyomi: string[]
  /** Bacaan kun'yomi (hiragana). Array kosong jika tidak ada. */
  kunyomi: string[]
  strokeCount: number
  jlptLevel: JlptLevel
  /** Hanya kanji level N5–N4 yang punya padanan JFT. */
  jftLevel?: JftLevel
  /** Karakter radikal, mis. '木'. Optional karena belum tentu ada di sumber data. */
  radical?: string
}
