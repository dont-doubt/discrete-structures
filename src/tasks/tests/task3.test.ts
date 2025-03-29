import { solveTask3 } from "@/tasks/task3";
import { expect, test } from "@jest/globals";

test('Task3', () => {
  expect(solveTask3('0100', '0110', 2)).toBe('01010010');
  expect(solveTask3('0000', '1111', 1)).toBe('00001111');
  expect(solveTask3('1011', '1100', 3)).toBe('11011010');
  expect(() => solveTask3('2311', '0000', 1)).toThrow();
  expect(() => solveTask3('11101010', '0100', 1)).toThrow();
  expect(() => solveTask3('1111', '0000', -4)).toThrow();
  expect(() => solveTask3('', '', 1)).toThrow();
  expect(() => solveTask3('1111', '0000', 5)).toThrow();
  expect(() => solveTask3('11111111111111111111111111111111', '11111111111111111111111111111111', 4)).toThrow();
});