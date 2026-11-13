export const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const
export type JlptLevel = (typeof JLPT_LEVELS)[number]

// JFT-Basic hanya menilai A1 dan A2 (setara kira-kira JLPT N5–N4).
export const JFT_LEVELS = ['A1', 'A2'] as const
export type JftLevel = (typeof JFT_LEVELS)[number]
