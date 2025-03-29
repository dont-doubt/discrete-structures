import { expect, test } from "@jest/globals";
import { solveTask8 } from "@/tasks/task8";

test('Task8', () => {
  const f1 = solveTask8('11010011');
  expect(f1).toBe('(-x1 * -x2 * -x3) v (-x1 * -x2 * x3) v (-x1 * x2 * x3) v (x1 * x2 * -x3) v (x1 * x2 * x3)');
  const f2 = solveTask8('1010');
  expect(f2).toBe('(-x1 * -x2) v (x1 * -x2)');
  const f3 = solveTask8('1010101010101010');
  expect(f3).toBe('(-x1 * -x2 * -x3 * -x4) v (-x1 * -x2 * x3 * -x4) v (-x1 * x2 * -x3 * -x4) v (-x1 * x2 * x3 * -x4) v (x1 * -x2 * -x3 * -x4) v (x1 * -x2 * x3 * -x4) v (x1 * x2 * -x3 * -x4) v (x1 * x2 * x3 * -x4)');
  const f4 = solveTask8('0000');
  expect(f4).toBe('0');
  const f5 = solveTask8('0100');
  expect(f5).toBe('(-x1 * x2)');
  const f6 = solveTask8('01');
  expect(f6).toBe('(x1)');
  expect(() => solveTask8('')).toThrow();
  expect(() => solveTask8('010')).toThrow();
  expect(() => solveTask8('1111111111111111111111111111111111111111111111111111111111111111')).toThrow();
});