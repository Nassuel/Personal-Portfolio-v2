/**
 * Immutable value object: a chord symbol + its exact character position
 * within the chord line it came from.
 */
export class ChordToken {
  readonly chord: string
  readonly position: number

  constructor(chord: string, position: number) {
    this.chord = chord
    this.position = position
    Object.freeze(this)
  }
}
