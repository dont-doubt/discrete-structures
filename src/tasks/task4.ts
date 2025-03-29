import { assertBooleanVector } from "@/utils/asserts";

export const functionNames = {
  "0000": ["zero", "константа 0"],
  "0001": ["or", "конъюнкция"],
  "0010": ["le", "коимпликация"],
  "0011": ["yes2", "функция равна первому аргументу"],
  "0100": ["ge", "обратная коимпликация"],
  "0101": ["yes1", "функция равна второму аргументу"],
  "0110": ["eqv", "сложение по модулю 2"],
  "0111": ["and", "дизъюнкция"],
  "1000": ["nand", "стрелка Пирса"],
  "1001": ["xor", "эквивалентность"],
  "1010": ["not1", "отрицание второго аргумента"],
  "1011": ["lt", "обратная импликация"],
  "1100": ["not2", "отрицание первого аргумента"],
  "1101": ["gt", "импликация"],
  "1110": ["nor", "штрих Шеффера"],
  "1111": ["one", "константа 1"],
}

export function solveTask4(vector: string, answer: string) {
  assertBooleanVector(vector);
  let x = 0;
  const namearray = Object.values(functionNames)
  const funcarray = Object.keys(functionNames)
  for (let i = 0; i < funcarray.length; i++) {
    if (funcarray[i] === vector) {
      x = i
    }
  }
  return namearray[x].some((temp) => temp.toLowerCase() === answer.toLowerCase());
}
