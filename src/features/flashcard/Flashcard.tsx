import { Furigana } from '../../lib/Furigana'
import type { Kanji, Vocabulary } from '../../types'
import styles from './Flashcard.module.css'

interface FlashcardProps {
  vocabulary: Vocabulary
  /** Kanji penyusun kata, sudah dicari oleh komponen induk. */
  kanji: Kanji[]
  isFlipped: boolean
  onFlip: () => void
}

/**
 * Komponen "presentational": hanya menampilkan data dari props.
 * Tidak tahu soal urutan kartu atau skor. Itu urusan komponen induk.
 */
export function Flashcard({ vocabulary, kanji, isFlipped, onFlip }: FlashcardProps) {
  const example = vocabulary.examples[0]

  return (
    <button
      type="button"
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      onClick={onFlip}
      aria-label={isFlipped ? 'Tampilkan kata' : 'Tampilkan jawaban'}
    >
      <div className={styles.inner}>
        <div className={styles.front} aria-hidden={isFlipped} data-side="front">
          <span className={styles.word} lang="ja">
            {vocabulary.word}
          </span>
          <span className={styles.hint}>Klik atau tekan Space untuk membalik</span>
        </div>

        <div className={styles.back} aria-hidden={!isFlipped} data-side="back">
          <span className={styles.reading} lang="ja">
            {vocabulary.reading}
          </span>
          <span className={styles.meaning}>{vocabulary.meanings.join(', ')}</span>

          {kanji.length > 0 && (
            <ul className={styles.kanjiList} aria-label="Kanji penyusun">
              {kanji.map((k) => (
                <li key={k.id}>
                  <span lang="ja">{k.character}</span> {k.meanings.slice(0, 2).join(', ')}
                </li>
              ))}
            </ul>
          )}

          {example && (
            <p className={styles.example}>
              <span lang="ja">
                <Furigana text={example.furigana ?? example.sentence} />
              </span>
              <br />
              <small>{example.translation}</small>
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
