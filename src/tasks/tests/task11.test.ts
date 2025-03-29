import { expect, test } from "@jest/globals";
import { solveTask11 } from "@/tasks/task11";

test('Task11', () => {
  const f1 = solveTask11('0000', '0000', '0000', '0000', '0111');
  expect(f1).toBe('T0 M');
  const f2 = solveTask11('11110100', '0000', '01011111', '00001111', '0111');
  expect(f2).toBe('Система полная');
});