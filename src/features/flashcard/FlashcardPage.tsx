import { useEffect, useState } from 'react'
import { getKanjiForVocabulary, type Dictionary } from '../../data'
import type { Vocabulary } from '../../types'
import { createDeck } from './deck'
import { Flashcard } from './Flashcard'
import styles from './FlashcardPage.module.css'
import { useFlashcardSession } from './useFlashcardSession'

interface FlashcardPageProps {
  dictionary: Dictionary
  /** Kosakata yang bisa muncul di sesi ini (mis. semua N5). */
  vocabulary: Vocabulary[]
  deckSize?: number
}

export function FlashcardPage({ dictionary, vocabulary, deckSize = 20 }: FlashcardPageProps) {
  // Fungsi di dalam useState hanya dijalankan sekali (lazy initial state),
  // jadi deck tidak diacak ulang setiap kali komponen render.
  const [deck, setDeck] = useState(() => createDeck(vocabulary, deckSize))
  const session = useFlashcardSession(deck)
  const { current, isFinished, flip, answer } = session

  // Pintasan keyboard: Space = balik, → = tahu, ← = belum tahu.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isFinished || !current) return
      if (event.key === ' ') {
        event.preventDefault()
        flip()
      } else if (event.key === 'ArrowRight') {
        answer('known')
      } else if (event.key === 'ArrowLeft') {
        answer('unknown')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    // Cleanup: lepas listener saat komponen hilang atau dependency berubah.
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, isFinished, flip, answer])

  function startNewDeck() {
    setDeck(createDeck(vocabulary, deckSize))
    session.restart()
  }

  if (deck.length === 0) {
    return <p>Belum ada kosakata untuk dipelajari.</p>
  }

  if (isFinished || !current) {
    return (
      <section className={styles.summary} aria-live="polite">
        <h2>Sesi selesai 🎉</h2>
        <p>
          Tahu: <strong>{session.knownCount}</strong> · Belum tahu:{' '}
          <strong>{session.unknownCount}</strong>
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={session.restart}>
            Ulangi kartu yang sama
          </button>
          <button type="button" onClick={startNewDeck}>
            Kartu baru
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <p className={styles.progress}>
        Kartu {session.index + 1} / {session.total}
      </p>
      <progress value={session.index} max={session.total} className={styles.progressBar} />

      <Flashcard
        vocabulary={current}
        kanji={getKanjiForVocabulary(dictionary, current)}
        isFlipped={session.isFlipped}
        onFlip={flip}
      />

      <div className={styles.actions}>
        <button type="button" onClick={() => answer('unknown')}>
          ← Belum tahu
        </button>
        <button type="button" onClick={() => answer('known')}>
          Tahu →
        </button>
      </div>
    </section>
  )
}
