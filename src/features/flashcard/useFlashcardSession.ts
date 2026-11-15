import { useState } from 'react'

export type CardResult = 'known' | 'unknown'

/**
 * State satu sesi flashcard: kartu ke berapa, sedang dibalik atau tidak,
 * dan hasil "tahu / belum tahu" per kartu.
 */
export function useFlashcardSession<T>(cards: T[]) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<CardResult[]>([])

  const isFinished = cards.length > 0 && results.length === cards.length
  const current = isFinished ? undefined : cards[index]

  function flip() {
    setIsFlipped((flipped) => !flipped)
  }

  function answer(result: CardResult) {
    if (isFinished) return
    setResults((prev) => [...prev, result])
    setIndex((i) => i + 1)
    setIsFlipped(false)
  }

  function restart() {
    setIndex(0)
    setIsFlipped(false)
    setResults([])
  }

  return {
    current,
    index,
    total: cards.length,
    isFlipped,
    isFinished,
    knownCount: results.filter((r) => r === 'known').length,
    unknownCount: results.filter((r) => r === 'unknown').length,
    flip,
    answer,
    restart,
  }
}
