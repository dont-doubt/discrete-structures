import { expect, test } from "@jest/globals";
import { solveTask4 } from "@/tasks/task4";

test('Task4', () => {
  expect(solveTask4('0000', "zero")).toBe(true);
  expect(solveTask4('1001', "xor")).toBe(true);
  expect(solveTask4('1110', "штрих Шеффера")).toBe(true);
  expect(solveTask4('1010', "отрицание второго аргумента")).toBe(true);
  expect(solveTask4('0001', "zero")).toBe(false);
  expect(solveTask4('0011', "константа 1")).toBe(false);
});