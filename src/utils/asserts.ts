
export function assert(value: boolean, error?: string) {
  if (!value) throw new Error(error);
}

export function assertN(n: number) {
  assert(n >= 1, "Количество аргументов должно быть положительным целым числом");
  assert(n <= 5, "Функция должна зависеть не более, чем от 5 аргументов");
}

export function assertBooleanVector(value: string | number[], checkN: boolean = true) {
  assert(value.length !== 0, "Вектор не должен быть пустым");
  assert((value.length & (value.length - 1)) === 0, `Длина вектора должна быть степенью двойки (сейчас ${value.length})`);
  if (checkN) assertN(Math.log2(value.length));
  if (Array.isArray(value)) {
    assert(value.every((v) => v === 0 || v === 1), "Вектор должен состоять только из символов '0' и '1'");
  } else {
    assert(/^[01]+$/.test(value), "Вектор должен состоять только из символов '0' и '1'");
  }
}

export function assertBooleanResiduals(zeroResidual: string, oneResidual: string, argumentIndex: number) {
  assertBooleanVector(zeroResidual, false);
  assertBooleanVector(oneResidual, false);
  assert(zeroResidual.length === oneResidual.length, "Векторы должны быть одинаковой длины");
  assertN(Math.log2(zeroResidual.length) + 1);
  assert(argumentIndex >= 1, "Аргумент должен быть положительным целым числом");
  assert(argumentIndex <= Math.log2(zeroResidual.length) + 1, "Номер аргумента слишком велик");
}
