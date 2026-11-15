import { parseFurigana } from './parseFurigana'

interface FuriganaProps {
  /** Teks berformat `{漢字|かんじ}`. */
  text: string
}

/** Menampilkan teks Jepang dengan furigana memakai elemen HTML <ruby>. */
export function Furigana({ text }: FuriganaProps) {
  return (
    <>
      {parseFurigana(text).map((segment, i) =>
        segment.reading ? (
          <ruby key={i}>
            {segment.text}
            <rt>{segment.reading}</rt>
          </ruby>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  )
}
