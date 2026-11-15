import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { buildDictionary } from '../../data/dictionary'
import { sampleKanji, sampleVocabulary } from '../../data/sample'
import { FlashcardPage } from './FlashcardPage'

const dictionary = buildDictionary(sampleKanji, sampleVocabulary)
const nihon = sampleVocabulary.filter((v) => v.word === '日本')

// Sisi depan dan belakang kartu sama-sama ada di DOM (supaya animasi balik bisa jalan),
// jadi teks seperti 日本 bisa muncul di dua sisi. Kita cari di dalam sisi tertentu saja.
function side(name: 'front' | 'back') {
  return within(document.querySelector<HTMLElement>(`[data-side="${name}"]`)!)
}

function renderPage(vocabulary = nihon) {
  return render(<FlashcardPage dictionary={dictionary} vocabulary={vocabulary} />)
}

describe('FlashcardPage', () => {
  it('menampilkan kata di sisi depan', () => {
    renderPage()
    expect(side('front').getByText('日本')).toBeInTheDocument()
    expect(screen.getByText('Kartu 1 / 1')).toBeInTheDocument()
  })

  it('membalik kartu saat diklik dan menampilkan bacaan, arti, dan kanji penyusun', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Tampilkan jawaban' }))

    expect(screen.getByRole('button', { name: 'Tampilkan kata' })).toBeInTheDocument()
    const back = side('back')
    expect(back.getByText('にほん', { selector: 'span' })).toBeInTheDocument()
    expect(back.getByText('Japan')).toBeInTheDocument()
    expect(back.getByLabelText('Kanji penyusun')).toHaveTextContent('日')
    expect(back.getByText('I live in Japan.')).toBeInTheDocument()
  })

  it('membalik kartu dengan tombol Space', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.keyboard(' ')

    expect(screen.getByRole('button', { name: 'Tampilkan kata' })).toBeInTheDocument()
  })

  it('menampilkan ringkasan setelah semua kartu dijawab', async () => {
    const user = userEvent.setup()
    renderPage(sampleVocabulary)

    await user.click(screen.getByRole('button', { name: /Tahu/ }))
    await user.click(screen.getByRole('button', { name: /Belum tahu/ }))
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('heading', { name: /Sesi selesai/ })).toBeInTheDocument()
    expect(screen.getByText(/Tahu:/)).toHaveTextContent('Tahu: 2 · Belum tahu: 1')
  })

  it('bisa mengulang sesi dari awal', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /Tahu/ }))
    await user.click(screen.getByRole('button', { name: 'Ulangi kartu yang sama' }))

    expect(screen.getByText('Kartu 1 / 1')).toBeInTheDocument()
  })
})
