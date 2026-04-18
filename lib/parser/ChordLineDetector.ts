/**
 * Interface — swap implementations for different notation systems
 * (e.g. Nashville Number System) without touching any other class. (OCP / DIP)
 */
export interface IChordLineDetector {
  isChordLine(line: string): boolean
}

/**
 * Detects standard Western chord notation.
 * A line is a chord line when ≥60% of its tokens match the chord pattern.
 * Supports: C, Dm, C#, Bb, Cmaj7, Dsus4, Cadd9, G/B, D/F#, etc.
 */
export class WesternChordLineDetector implements IChordLineDetector {
  private static readonly CHORD_PATTERN =
    /^[A-G][b#]?(maj|min|m|M|aug|dim|sus|add|dom)?[0-9]*(\/[A-G][b#]?)?$/

  private static readonly THRESHOLD = 0.6

  isChordLine(line: string): boolean {
    const tokens = line.trim().split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return false
    const chordCount = tokens.filter(t =>
      WesternChordLineDetector.CHORD_PATTERN.test(t)
    ).length
    return chordCount / tokens.length >= WesternChordLineDetector.THRESHOLD
  }
}