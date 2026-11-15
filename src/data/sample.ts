import type { Kanji, Vocabulary } from '../types'

/** Data kecil yang ditulis manual, dipakai untuk test. */
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
    id: 'sample-nihon',
    word: '日本',
    reading: 'にほん',
    meanings: ['Japan'],
    partsOfSpeech: ['n'],
    jlptLevel: 'N5',
    jftLevel: 'A1',
    examples: [
      {
        sentence: '日本に住んでいます。',
        furigana: '{日本|にほん}に{住|す}んでいます。',
        translation: 'I live in Japan.',
        tatoebaId: 0,
      },
    ],
    kanjiIds: ['日', '本'],
  },
  {
    id: 'sample-mainichi',
    word: '毎日',
    reading: 'まいにち',
    meanings: ['every day'],
    partsOfSpeech: ['n', 'adv'],
    jlptLevel: 'N5',
    jftLevel: 'A1',
    examples: [],
    // 毎 tidak ada di sampleKanji: kode harus tetap aman.
    kanjiIds: ['毎', '日'],
  },
  {
    id: 'sample-arigatou',
    word: 'ありがとう',
    reading: 'ありがとう',
    meanings: ['thank you'],
    partsOfSpeech: ['int'],
    jlptLevel: 'N5',
    jftLevel: 'A1',
    examples: [],
    kanjiIds: [],
  },
]
