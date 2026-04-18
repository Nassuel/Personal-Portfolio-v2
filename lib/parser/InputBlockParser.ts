import { ChordLyricBlock } from '../domain/ChordLyricBlock'
import { IChordLineDetector } from './ChordLineDetector'

/**
 * Splits raw pasted text into ChordLyricBlocks.
 *
 * Rules:
 *   - Chord line + following lyric line  → one paired block
 *   - Chord line with no lyric beneath   → block with empty lyric
 *   - Lyric with no chord above          → block with null chord line
 *   - Blank line                         → spacer block (preserves structure)
 *
 * SRP — only responsible for segmentation.
 * DIP — depends on IChordLineDetector, not a concrete class.
 */
export class InputBlockParser {
  private readonly detector: IChordLineDetector

  constructor(detector: IChordLineDetector) {
    this.detector = detector
  }

  parse(rawText: string): ChordLyricBlock[] {
    const lines = rawText.split('\n')
    const blocks: ChordLyricBlock[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      if (line.trim() === '') {
        blocks.push(new ChordLyricBlock(null, ''))
        i++
        continue
      }

      if (this.detector.isChordLine(line)) {
        const nextLine = lines[i + 1]
        const nextIsLyric =
          nextLine !== undefined &&
          nextLine.trim() !== '' &&
          !this.detector.isChordLine(nextLine)

        if (nextIsLyric) {
          blocks.push(new ChordLyricBlock(line, nextLine))
          i += 2
        } else {
          blocks.push(new ChordLyricBlock(line, ''))
          i++
        }
      } else {
        blocks.push(new ChordLyricBlock(null, line))
        i++
      }
    }

    return blocks
  }
}