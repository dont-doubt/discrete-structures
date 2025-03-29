import { assertBooleanVector } from '@/utils/asserts';

export function solveTask8(vector: string) {
  assertBooleanVector(vector);
  const l = vector.length; // Длина вектора
  const n = Math.log2(l); // Количество переменных
  const sdnf: string[] = [];
  for (let i = 0; i < l; i++) {
    if (vector[i] === '1') {
      const term: string[] = [];
      for (let j = 1; j <= n; j++) {
        const variable = `x${j}`; // Используем x1, x2, x3, ...
        const value = (i >> (n - j)) & 1;
        if (value === 0) {
          term.push(`-${variable}`);
        } else {
          term.push(variable);
        }
      }
      sdnf.push(`(${term.join(' * ')})`);
    }
  }
  return sdnf.join(' v ') || "0"; // Если СДНФ пуста, возвращаем "0"
}