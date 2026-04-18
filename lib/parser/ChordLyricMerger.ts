import { ChordToken } from '../domain/ChordToken'

/**
 * Merges ChordTokens into a lyric string using Planning Center bracket notation.
 * Inserts [Chord] at the exact character position; applies right-to-left
 * so earlier positions are not shifted by prior insertions.
 * SRP — only responsible for merging.
 */
export class ChordLyricMerger {
  merge(tokens: ChordToken[], lyricLine: string): string {
    if (tokens.length === 0) return lyricLine
    const sorted = [...tokens].sort((a, b) => b.position - a.position)
    let result = lyricLine
    for (const token of sorted) {
      const insertAt = Math.min(token.position, result.length)
      result =
        result.slice(0, insertAt) + `[${token.chord}]` + result.slice(insertAt)
    }
    return result
  }
}