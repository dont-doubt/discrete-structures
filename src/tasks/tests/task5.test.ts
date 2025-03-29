import { expect, test } from "@jest/globals";
import { solveTask5 } from "../task5";

test('Task5', () => {
  expect(solveTask5('10010110')).toBe('');
  expect(solveTask5('0011')).toBe('2');
  expect(() => solveTask5('2311')).toThrow();
  expect(solveTask5('11111111')).toBe('123');
  expect(() => solveTask5('')).toThrow();
  expect(() => solveTask5('010')).toThrow();
  expect(() => solveTask5('1111111111111111111111111111111111111111111111111111111111111111')).toThrow();
});
