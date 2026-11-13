export const PROGRESS_STATUSES = ['locked', 'reviewing', 'mastered'] as const
export type ProgressStatus = (typeof PROGRESS_STATUSES)[number]

export type StudyItemType = 'kanji' | 'vocabulary'

/** Progres belajar satu user untuk satu item. Terpisah dari data konten (Kanji/Vocabulary). */
export interface UserProgress {
  itemId: string
  itemType: StudyItemType
  status: ProgressStatus
  correctCount: number
  incorrectCount: number
  /** Waktu terakhir dipelajari, format ISO 8601 (mis. '2026-11-13T07:30:00.000Z'). */
  lastReviewedAt?: string
}
