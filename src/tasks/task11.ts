import { L, M, S, solveTask10, T0, T1 } from "./task10";
import { assertBooleanVector } from '@/utils/asserts';

function isFull(vector: string): boolean {
  return solveTask10(vector) === '';
}

export function solveTask11(vectors: string[]) {
  let cntFull = 0;

  for (const vector of vectors) {
    assertBooleanVector(vector);
    if (isFull(vector)) cntFull++;
  }

  if (cntFull === 5) return 'full';

  const isT0 = vectors.every(vector => T0(vector));
  const isT1 = vectors.every(vector => T1(vector));
  const isS = vectors.every(vector => S(vector));
  const isL = vectors.every(vector => L(vector));
  const isM = vectors.every(vector => M(vector));

  const z: string[] = [];
  if (isT0) z.push('T0');
  if (isT1) z.push('T1');
  if (isS) z.push('S');
  if (isL) z.push('L');
  if (isM) z.push('M');

  if (z.length === 0) return 'full';

  return z.join(' ');
}