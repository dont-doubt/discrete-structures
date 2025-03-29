import { expect, test } from '@jest/globals';
import { solveTask1 } from '@/tasks/task1';

test('Task1', () => {
  const f4 = solveTask1(4);
  expect(f4.length).toBe(16);
  const f2 = solveTask1(2);
  const expectedValues = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111',
    '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'];
  expect(expectedValues).toContain(f2);
  const f1 = solveTask1(1);
  const f3 = solveTask1(3);
  const f5 = solveTask1(5);
  expect(f1.length).toBe(2);
  expect(f2.length).toBe(4);
  expect(f3.length).toBe(8);
  expect(f5.length).toBe(32);
  expect(() => solveTask1(6)).toThrow();
  expect(() => solveTask1(-1)).toThrow();
});
