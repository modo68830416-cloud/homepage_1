/** Minimal Levenshtein distance for typo correction (TASK-006 §2 오타 보정). */
function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

/** Finds the closest known term within an edit-distance threshold, or null. */
export function correctTypo(query: string, vocabulary: string[], maxDistance = 2): string | null {
  let best: { term: string; distance: number } | null = null;

  for (const term of vocabulary) {
    const distance = levenshtein(query, term);
    if (distance <= maxDistance && (!best || distance < best.distance)) {
      best = { term, distance };
    }
  }

  return best && best.distance > 0 ? best.term : null;
}
