import { describe, expect, it } from 'vitest'
import { parseFurigana } from './furigana'

describe('parseFurigana', () => {
  it('memisahkan kanji ber-furigana dan teks biasa', () => {
    expect(parseFurigana('{日本|にほん}に{住|す}んでいます。')).toEqual([
      { text: '日本', reading: 'にほん' },
      { text: 'に' },
      { text: '住', reading: 'す' },
      { text: 'んでいます。' },
    ])
  })

  it('mengembalikan satu potongan untuk teks tanpa furigana', () => {
    expect(parseFurigana('ありがとう。')).toEqual([{ text: 'ありがとう。' }])
  })

  it('mengembalikan array kosong untuk string kosong', () => {
    expect(parseFurigana('')).toEqual([])
  })
})
