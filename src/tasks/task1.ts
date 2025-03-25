import { E } from '@/utils/types';
import { test, expect } from '@jest/globals';

export function solveTask1(n: number) {
  return (...args: E[]) => {
    if (args.length !== n) throw new Error(`Expected ${n} arguments`);
    return args.every((v) => v) ? 1 : 0;
  }
}

test('Task1', () => {
  const f = solveTask1(4);
  console.log(f(0, 0, 0, 0));
  expect(f(0, 0, 0, 0)).toBe(0);
});
