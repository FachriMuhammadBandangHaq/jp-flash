export interface FuriganaSegment {
  text: string
  /** Bacaan di atas teks. Tidak ada untuk bagian yang bukan kanji. */
  reading?: string
}

const FURIGANA_PATTERN = /\{([^|}]+)\|([^}]+)\}/g

/**
 * Mengubah format OpenJLPT `{漢字|かんじ}を{読|よ}む` menjadi potongan-potongan
 * yang bisa dirender sebagai <ruby>.
 */
export function parseFurigana(input: string): FuriganaSegment[] {
  const segments: FuriganaSegment[] = []
  let lastIndex = 0

  for (const match of input.matchAll(FURIGANA_PATTERN)) {
    if (match.index > lastIndex) {
      segments.push({ text: input.slice(lastIndex, match.index) })
    }
    segments.push({ text: match[1], reading: match[2] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < input.length) {
    segments.push({ text: input.slice(lastIndex) })
  }
  return segments
}
