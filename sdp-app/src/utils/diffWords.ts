export interface DiffSegment {
  type: 'equal' | 'added' | 'deleted'
  text: string
}

/**
 * Word-level diff between oldText and newText.
 * Returns separate segment arrays for rendering each side:
 * - newSegments: 'equal' + 'added' (added = green highlight)
 * - oldSegments: 'equal' + 'deleted' (deleted = red highlight + strikethrough)
 */
export function diffWords(
  oldText: string,
  newText: string,
): { newSegments: DiffSegment[]; oldSegments: DiffSegment[] } {
  const tokenize = (text: string): string[] =>
    text.match(/\S+|\s+/g) || []

  const oldTokens = tokenize(oldText)
  const newTokens = tokenize(newText)
  const m = oldTokens.length
  const n = newTokens.length

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldTokens[i - 1] === newTokens[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Backtrack
  const oldDiff: { type: 'equal' | 'deleted'; token: string }[] = []
  const newDiff: { type: 'equal' | 'added'; token: string }[] = []
  let i = m
  let j = n

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldTokens[i - 1] === newTokens[j - 1]) {
      oldDiff.unshift({ type: 'equal', token: oldTokens[i - 1] })
      newDiff.unshift({ type: 'equal', token: newTokens[j - 1] })
      i--
      j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      newDiff.unshift({ type: 'added', token: newTokens[j - 1] })
      j--
    } else {
      oldDiff.unshift({ type: 'deleted', token: oldTokens[i - 1] })
      i--
    }
  }

  // Merge consecutive segments of the same type
  const merge = <T extends DiffSegment>(
    diffs: { type: T['type']; token: string }[],
  ): DiffSegment[] => {
    const result: DiffSegment[] = []
    for (const d of diffs) {
      const last = result[result.length - 1]
      if (last && last.type === d.type) {
        last.text += d.token
      } else {
        result.push({ type: d.type, text: d.token })
      }
    }
    return result
  }

  return {
    newSegments: merge(newDiff),
    oldSegments: merge(oldDiff),
  }
}
