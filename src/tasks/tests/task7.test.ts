import { expect, test } from "@jest/globals";
import { solveTask7 } from "@/tasks/task7";

test('Task7', () => {
  let f = solveTask7([1, 1, 0, 1, 1, 1, 0, 0], "(x1vx2)*(x2v-x3)");
  expect(f).toBe(true);
  f = solveTask7([1, 1, 1, 1, 1, 1, 0, 0], "(x1vx2)*(x2v-x3)");
  expect(f).toBe(false);
  f = solveTask7([1, 1, 1, 1, 0, 0, 0, 0], "(x1)");
  expect(f).toBe(true)
  f = solveTask7([0, 1, 1, 1, 0, 0, 0, 0], "(x1)");
  expect(f).toBe(false)
  f = solveTask7([0, 1, 0, 1, 0, 1, 0, 1], "(-x3)");
  expect(f).toBe(true)
  f = solveTask7([0, 1, 0, 1, 0, 1, 0, 0], "(-x3)");
  expect(f).toBe(false)
});