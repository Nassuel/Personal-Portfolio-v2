import { ChordToken } from '../domain/ChordToken'

/**
 * Parses a raw chord line into ChordTokens with exact character positions.
 * SRP — only responsible for tokenizing.
 */
export class ChordLineParser {
  parse(chordLine: string): ChordToken[] {
    const tokens: ChordToken[] = []
    const regex = /\S+/g
    let match: RegExpExecArray | null
    while ((match = regex.exec(chordLine)) !== null) {
      tokens.push(new ChordToken(match[0], match.index))
    }
    return tokens
  }
}