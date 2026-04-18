/**
 * Immutable value object: a paired chord line + lyric line.
 * chordLine is null when a lyric has no chord annotation above it.
 */
export class ChordLyricBlock {
  readonly chordLine: string | null
  readonly lyricLine: string

  constructor(chordLine: string | null, lyricLine: string) {
    this.chordLine = chordLine
    this.lyricLine = lyricLine
    Object.freeze(this)
  }

  hasChords(): boolean {
    return this.chordLine !== null
  }
}
