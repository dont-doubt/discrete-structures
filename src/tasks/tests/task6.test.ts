import { solveTask6 } from '@/tasks/task6';
import { expect, test } from '@jest/globals';

test('Task6', () => {
  let f = solveTask6([0, 0, 1, 0, 0, 0, 1, 1], "(x1*x2)v(x2*-x3)");
  expect(f).toBe(true);
  f = solveTask6([0, 0, 0, 0, 0, 0, 1, 1], "(x1*x2)v(x2*-x3)");
  expect(f).toBe(false);
  f = solveTask6([0, 0, 0, 0, 1, 1, 1, 1], "(x1)");
  expect(f).toBe(true)
  f = solveTask6([1, 0, 0, 0, 1, 1, 1, 1], "(x1)");
  expect(f).toBe(false)
  f = solveTask6([1, 0, 1, 0, 1, 0, 1, 0], "(-x3)");
  expect(f).toBe(true)
  f = solveTask6([1, 0, 1, 0, 1, 0, 1, 1], "(-x3)");
  expect(f).toBe(false)
});