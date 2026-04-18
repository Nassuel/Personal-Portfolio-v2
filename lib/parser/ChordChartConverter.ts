import { ChordLineParser } from './ChordLineParser'
import { ChordLyricMerger } from './ChordLyricMerger'
import { InputBlockParser } from './InputBlockParser'
import { IChordLineDetector, WesternChordLineDetector } from './ChordLineDetector'

/**
 * Orchestrates the full conversion pipeline:
 *   raw text → ChordLyricBlocks → Planning Center bracket notation.
 *
 * OCP  — extend for new output formats without modifying this class.
 * DIP  — all collaborators injected; defaults to WesternChordLineDetector.
 */
export class ChordChartConverter {
  private readonly blockParser: InputBlockParser
  private readonly lineParser: ChordLineParser
  private readonly merger: ChordLyricMerger

  constructor(detector: IChordLineDetector = new WesternChordLineDetector()) {
    this.blockParser = new InputBlockParser(detector)
    this.lineParser = new ChordLineParser()
    this.merger = new ChordLyricMerger()
  }

  convert(rawText: string): string {
    if (!rawText.trim()) return ''
    return this.blockParser
      .parse(rawText)
      .map(block => {
        if (!block.hasChords()) return block.lyricLine
        const tokens = this.lineParser.parse(block.chordLine!)
        return this.merger.merge(tokens, block.lyricLine)
      })
      .join('\n')
  }
}