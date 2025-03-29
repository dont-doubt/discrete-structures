import { assertBooleanVector } from '@/utils/asserts';

export function solveTask5(vector: string) {
  assertBooleanVector(vector);
  const l = vector.length; // Длина вектора
  const n = Math.log2(l); // Количество переменных
  let res: string = '';
  for (let arg = 1; arg <= n; arg++) {
    let len = l / 2; // Длина чередующихся "кусочков" остаточных, из которых состоит функция
    for (let j = 1; j < arg; j++) {
      len = len >> 1; // Делим на 2
    }
    let zeroResidual: string = '';
    let oneResidual: string = '';
    for (let j = 0; j < l; j += 2 * len) {
      for (let k = j; k < j + len; k++) {
        zeroResidual += vector[k];
      }
      for (let k = j + len; k < 2 * len + j; k++) {
        oneResidual += vector[k];
      }
    }
    if (zeroResidual === oneResidual) {
      res += arg.toString();
    }
  }
  return res; // Выводятся номера фиктивных переменных
}