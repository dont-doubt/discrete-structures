import { expect, test } from "@jest/globals";
import { solveTask9 } from "@/tasks/task9";

test('Task9', () => {
  const f1 = solveTask9('11010011');
  expect(f1).toBe('(x1 v -x2 v x3) * (-x1 v x2 v x3) * (-x1 v x2 v -x3)');
  const f2 = solveTask9('1010');
  expect(f2).toBe('(x1 v -x2) * (-x1 v -x2)');
  const f3 = solveTask9('1010101010101010');
  expect(f3).toBe('(x1 v x2 v x3 v -x4) * (x1 v x2 v -x3 v -x4) * (x1 v -x2 v x3 v -x4) * (x1 v -x2 v -x3 v -x4) * (-x1 v x2 v x3 v -x4) * (-x1 v x2 v -x3 v -x4) * (-x1 v -x2 v x3 v -x4) * (-x1 v -x2 v -x3 v -x4)');
  const f4 = solveTask9('1111');
  expect(f4).toBe('1');
  const f5 = solveTask9('1011');
  expect(f5).toBe('(x1 v -x2)');
  const f6 = solveTask9('10');
  expect(f6).toBe('(-x1)');
  expect(() => solveTask9('')).toThrow();
  expect(() => solveTask9('010')).toThrow();
  expect(() => solveTask9('1111111111111111111111111111111111111111111111111111111111111111')).toThrow();
});