import { assertBooleanVector } from "@/utils/asserts";

export function solveTask9(vector: string) {
  assertBooleanVector(vector);
  const l = vector.length; // Длина вектора
  const n = Math.log2(l); // Количество переменных
  const sknf: string[] = [];
  for (let i = 0; i < l; i++) {
    if (vector[i] === '0') {
      const term: string[] = [];
      for (let j = 1; j <= n; j++) {
        const variable = `x${j}`; // x1, x2, x3, ...
        const value = (i >> (n - j)) & 1;
        if (value === 0) {
          term.push(variable);
        } else {
          term.push(`-${variable}`);
        }
      }
      sknf.push(`(${term.join(' v ')})`);
    }
  }
  return sknf.join(' * ') || "1"; // Если СКНФ пуста, возвращаем "1"
}