import { expect, test } from "@jest/globals";
import { solveTask10 } from "@/tasks/task10";

test('Task10', () => {
  const f1 = solveTask10('00001111');
  expect(f1).toBe('T0 T1 S L M');
  const f2 = solveTask10('0000');
  expect(f2).toBe('T0 L M');
  const f3 = solveTask10('1111');
  expect(f3).toBe('T1 L M');
  const f4 = solveTask10('01011111');
  expect(f4).toBe('T0 T1 M');
  const f5 = solveTask10('01011011');
  expect(f5).toBe('T0 T1');
  const f6 = solveTask10('0111');
  expect(f6).toBe('T0 T1 M');
  const f7 = solveTask10('10');
  expect(f7).toBe('S L');
  const f8 = solveTask10('0110');
  expect(f8).toBe('T0 L');
  const f9 = solveTask10('00010111');
  expect(f9).toBe('T0 T1 S M');
  const f10 = solveTask10('00011110');
  expect(f10).toBe('T0');
  const f11 = solveTask10('11110100');
  expect(f11).toBe('');
});