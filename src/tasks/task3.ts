import { assertBooleanResiduals } from '@/utils/asserts';

export function solveTask3(zeroResidual: string, oneResidual: string, argumentIndex: number) {
  assertBooleanResiduals(zeroResidual, oneResidual, argumentIndex);
  let res: string = '';
  let len = zeroResidual.length; // Длина чередующихся "кусочков" остаточных, из которых состоит функция
  for (let i = 1; i < argumentIndex; i++) {
    len = len >> 1; // Делим на 2
  }
  for(let i = 0; i < zeroResidual.length; i+=len) {
    for(let j = i; j < i+len; j++) {
      res += zeroResidual[j];
    }
    for(let j = i; j < i+len; j++) {
      res += oneResidual[j];
    }
  }
  return res;
}
