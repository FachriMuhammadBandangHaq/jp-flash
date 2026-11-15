import { describe, expect, it } from 'vitest'
import { createDeck, shuffle } from './deck'

describe('shuffle', () => {
  it('tidak mengubah array asli', () => {
    const original = [1, 2, 3, 4]
    shuffle(original)
    expect(original).toEqual([1, 2, 3, 4])
  })

  it('berisi item yang sama, hanya urutannya berbeda', () => {
    const result = shuffle([1, 2, 3, 4, 5])
    expect([...result].sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('hasilnya bisa diprediksi jika random dikontrol', () => {
    // random() selalu 0 → setiap elemen ditukar dengan elemen pertama.
    expect(shuffle([1, 2, 3, 4], () => 0)).toEqual([2, 3, 4, 1])
  })
})

describe('createDeck', () => {
  it('mengambil sejumlah item sesuai ukuran', () => {
    expect(createDeck([1, 2, 3, 4, 5], 3)).toHaveLength(3)
  })

  it('tidak error jika ukuran lebih besar dari jumlah item', () => {
    expect(createDeck([1, 2], 10)).toHaveLength(2)
  })
})
