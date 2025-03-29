import { expect, test } from "@jest/globals";
import { solveTask12 } from "../task12";

test('Task12', () => {
  const f1 = solveTask12('0001110101011100');
  expect(f1).toBe('(x2 * -x3) v (-x1 * x3 * x4) v (x1 * -x2 * x4)');
  const f2 = solveTask12('10101010');
  expect(f2).toBe('(-x3)');
  const f3 = solveTask12('10110011');
  expect(f3).toBe('(x2) v (-x1 * -x3)');
  const f4 = solveTask12('1001');
  expect(f4).toBe('(-x1 * -x2) v (x1 * x2)');
  const f5 = solveTask12('1010');
  expect(f5).toBe('(-x2)');
  const f6 = solveTask12('0111');
  expect(f6).toBe('(x2) v (x1)');
  const f7 = solveTask12('00010111');
  expect(f7).toBe('(x2 * x3) v (x1 * x3) v (x1 * x2)');
  const f8 = solveTask12('0001110101011100');
  expect(f8).toBe('(x2 * -x3) v (-x1 * x3 * x4) v (x1 * -x2 * x4)');
  expect(() => solveTask12('')).toThrow();
  expect(() => solveTask12('010')).toThrow();
  expect(() => solveTask12('1111111111111111111111111111111111111111111111111111111111111111')).toThrow();
});