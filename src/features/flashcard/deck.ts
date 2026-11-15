/**
 * Mengacak array dengan algoritma Fisher–Yates. Tidak mengubah array asli.
 * `random` bisa diganti saat test supaya hasilnya bisa diprediksi.
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Mengambil `size` item acak sebagai satu sesi belajar. */
export function createDeck<T>(items: readonly T[], size: number, random?: () => number): T[] {
  return shuffle(items, random).slice(0, size)
}
