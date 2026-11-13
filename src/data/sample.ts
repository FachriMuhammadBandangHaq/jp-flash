import type { Kanji, Vocabulary } from '../types'

export const sampleKanji: Kanji[] = [
  {
    id: '日',
    character: '日',
    meanings: ['day', 'sun', 'Japan'],
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', 'か'],
    strokeCount: 4,
    jlptLevel: 'N5',
    jftLevel: 'A1',
    radical: '日',
  },
  {
    id: '本',
    character: '本',
    meanings: ['book', 'origin', 'main'],
    onyomi: ['ホン'],
    kunyomi: ['もと'],
    strokeCount: 5,
    jlptLevel: 'N5',
    jftLevel: 'A1',
    radical: '木',
  },
]

export const sampleVocabulary: Vocabulary[] = [
  {
    id: '日本-にほん',
    word: '日本',
    reading: 'にほん',
    meanings: ['Japan'],
    partOfSpeech: 'noun',
    jlptLevel: 'N5',
    jftLevel: 'A1',
    example: {
      sentence: '日本に住んでいます。',
      reading: 'にほんにすんでいます。',
    },
    kanjiIds: ['日', '本'],
  },
]
