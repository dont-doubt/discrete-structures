import { solveTask2 } from '@/tasks/task2';
import { expect, test } from '@jest/globals';

test('Task2', () => {
  expect(solveTask2([0, 1, 1, 0, 1, 0, 1, 1], 0, 1)).toEqual([0, 1, 1, 0]);
  expect(solveTask2([0, 1, 1, 0, 1, 0, 1, 1], 0, 2)).toEqual([0, 1, 1, 0]);
  expect(solveTask2([0, 1, 1, 0, 1, 0, 1, 1], 0, 3)).toEqual([0, 1, 1, 1]);
  expect(solveTask2([0, 1, 1, 0, 1, 0, 1, 1], 1, 1)).toEqual([1, 0, 1, 1]);
  expect(solveTask2([0, 1, 1, 0, 1, 0, 1, 1], 1, 2)).toEqual([1, 0, 1, 1]);
  expect(solveTask2([0, 1, 1, 0, 1, 0, 1, 1], 1, 3)).toEqual([1, 0, 0, 1]);
});
