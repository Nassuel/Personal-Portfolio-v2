'use client'

import { useState, useMemo, useCallback } from 'react'
import { ChordChartConverter } from "@/lib/parser/ChordChartConverter"

const SAMPLE = `[Verse 1]
G       Em      C           D
Amazing grace how sweet the sound
G           Em    C       G
That saved a wretch like me
G         Em    C         D
I once was lost but now am found
G      Em    C    G
Was blind but now I see

[Chorus]
D           G      Em
Twas grace that taught my heart to fear
D           G
And grace my fears relieved`

export type CopyState = 'idle' | 'copied' | 'error'

/**
 * Encapsulates all state and behaviour for the chord converter.
 * UI components stay purely presentational — they receive data + callbacks only.
 * SRP — hook owns state; components own rendering.
 */
export function useChordConverter() {
  const converter = useMemo(() => new ChordChartConverter(), [])
  const [input, setInput] = useState<string>(SAMPLE)
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const output = useMemo(() => {
    try {
      return converter.convert(input)
    } catch {
      return '⚠ Could not parse input — please check the format.'
    }
  }, [input, converter])

  const handleCopy = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2000)
    }
  }, [output])

  const handleClear = useCallback(() => setInput(''), [])
  const handleLoadSample = useCallback(() => setInput(SAMPLE), [])

  return { input, output, copyState, setInput, handleCopy, handleClear, handleLoadSample }
}