
export function assert(value: boolean, error: string = "Неизвестная ошибка") {
  if (!value) throw new Error(error);
}

export function assertN(n: number) {
  assert(n >= 1, "Количество аргументов должно быть положительным целым числом")
  assert(n <= 5, "Функция должна зависеть не более, чем от 5 аргументов")
}

export function assertBooleanVector(value: string | number[]) {
  assert(value.length !== 0, "Вектор не должен быть пустым")
  assert((value.length & (value.length - 1)) === 0, "Длина вектора должна быть степенью двойки")
  assertN(Math.log2(value.length));
  if (Array.isArray(value)) {
    assert(value.every((v) => v === 0 || v === 1), "Вектор должен состоять только из символов '0' и '1'")
  } else {
    assert(/^[01]+$/.test(value), "Вектор должен состоять только из символов '0' и '1'")
  }
}

export function assertBooleanResiduals(zeroResidual: string, oneResidual:string, argumentIndex: number) {
  assert(zeroResidual.length !== 0 && oneResidual.length !== 0, "Векторы не должны быть пустыми")
  assert(zeroResidual.length === oneResidual.length, "Векторы должны быть одинаковой длины")
  assert((2*zeroResidual.length & (2*zeroResidual.length - 1)) === 0, "Векторы записаны некорректно")
  assertN(Math.log2(zeroResidual.length) + 1);
  assert(/^[01]+$/.test(zeroResidual) && /^[01]+$/.test(oneResidual), "Векторы должны состоять только из символов '0' и '1'")
  assert(argumentIndex >= 1, "Аргумент должен быть положительным целым числом")
  assert(argumentIndex <= Math.log2(zeroResidual.length) + 1, "Номер аргумента слишком велик")
}
