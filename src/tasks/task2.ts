import { assert, assertBooleanVector, assertN } from '@/utils/asserts';

export function solveTask2(vector: number[], type: number, id: number): number[] {
  assertBooleanVector(vector);
  assertN(id);
  assert(id <= Math.log2(vector.length), 'Номер вектора не должен превышать количество аргументов');

  const vsize = vector.length;
  const partsize = vsize / (2 ** id);
  let ans0: number[] = [];
  let ans1: number[] = [];
  for (let i = 0; i < vsize; i = i + (partsize * 2)) {
    ans0 = ans0.concat(vector.slice(i, i + partsize));
    ans1 = ans1.concat(vector.slice(i + partsize, i + (partsize * 2)));
  }
  return type === 0 ? ans0 : ans1;
}
