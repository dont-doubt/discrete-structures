import { assertBooleanVector } from '@/utils/asserts';

export function T0(vector: string): boolean {
  return vector[0] === '0';
}

export function T1(vector: string): boolean {
  return vector[vector.length - 1] === '1';
}

export function S(vector: string): boolean {
  for (let i = 0; i < vector.length; i++) {
    if (vector[i] === vector[vector.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

export function L(vector: string): boolean {
  const n = Math.log2(vector.length);
  const len = vector.length;

  if (vector === "0".repeat(len) || vector === "1".repeat(len)) {
    return true;
  }

  const t = triangleVector(vector);

  for (let i = 0; i < len; i++) {
    if (t[i] === '1') {
      let cnt1 = 0;
      for (let j = 1; j <= n; j++) {
        const value = (i >> (n - j)) & 1; // значение j-го аргумента в i-м наборе
        if (value === 1) cnt1++;
      }
      if (cnt1 > 1) return false;
    }
  }

  return true;
}

function triangleVector(vector: string) {
  const len = vector.length;
  let vec: string[] = [vector]; // Уровень 0 записан

  for (let lvl = 1; lvl < len; lvl++) {
    const prLvl = vec[lvl - 1]; // Предыдущий уровень
    let curLvl = ''; // Текущий уровень

    // Вычисляем текущий уровень
    for (let i = 0; i < prLvl.length - 1; i++) {
      const a = prLvl[i] === '1' ? 1 : 0;
      const b = prLvl[i + 1] === '1' ? 1 : 0;
      curLvl += (a ^ b).toString(); // XOR между соседними элементами
    }

    vec.push(curLvl); // Добавляем текущий уровень в результат
  }

  // Уровень 0: "1100"                                   1
  // Уровень 1: (1^1=0), (1^0=1), (0^0=0) → "010"        1 0
  // Уровень 2: (0^1=1), (1^0=1) → "11"                  0 1 1
  // Уровень 3: (1^1=0) → "0"                            0 0 1 0

  let res: string[] = [];
  for (const lvl of vec) {
    if (lvl.length > 0) {
      res.push(lvl[0]);
    }
  }

  return res;
}

export function M(vector: string): boolean {
  const n = Math.log2(vector.length);
  const len = vector.length;

  if (vector === "0".repeat(len) || vector === "1".repeat(len)) {
    return true;
  }

  for(let i = 0; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
      if (isLessOrEqual(i, j, n)) {
        if (vector[i] > vector[j]) {
          return false;
        }
      }
    }
  }

  return true;
}

function isLessOrEqual(i: number, j: number, n: number): boolean {
  for (let k = 0; k < n; k++) {
    const bitI = (i >> k) & 1;
    const bitJ = (j >> k) & 1;
    if (bitI > bitJ) {
      return false;
    }
  }
  return true;
}

export function solveTask10(vector: string) {
  assertBooleanVector(vector);
  const classes: string[] = [];
  if (T0(vector)) classes.push('T0');
  if (T1(vector)) classes.push('T1');
  if (S(vector)) classes.push('S');
  if (L(vector)) classes.push('L');
  if (M(vector)) classes.push('M');
  return classes.join(' ');
}