import { assertN } from '@/utils/asserts';
import { stringifyVector } from '@/utils';

export function solveTask1(n: number): string {
  assertN(n);
  const m = 1 << n; // 2^n
  const f: boolean[] = [];
  for (let i = 0; i < m; i++) {
    f[i] = Math.random() < 0.5;
  }
  return stringifyVector(f);
}

