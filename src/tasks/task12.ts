import { assertBooleanVector } from '@/utils/asserts';

export function solveTask12(vector: string) {
  assertBooleanVector(vector);
  const sets1: string[] = setsOne(vector);
  const grSets: string[][] = groupSet(sets1);
  const glSets: string[] = glueSets(grSets);
  const glRes: string[] = glueRes(glSets);
  const setsMinDNF: string[] = minimalCover(glRes, sets1);
  const minDNF: string = formatDNF(setsMinDNF);
  return minDNF === '()' ? '1' : minDNF;
}

// Возьмем как пример вектор '0001110101011100'

// Функция, которая возвращает массив из наборов, на которых функция возвращает 1
function setsOne(vector: string): string[] {
  const len = vector.length;
  const n = Math.log2(len);
  const stsOne: string[] = [];
  for (let i = 0; i < len; i++) {
    if (vector[i] === '1') {
      const binaryStr = i.toString(2).padStart(n, '0');
      stsOne.push(binaryStr);
    }
  }
  return stsOne; // ['0011', '0100', '0101', '0111', '1001', '1011', '1100', '1101']
}

// Функция, которая разбивает наборы на группы по весу (количеству единиц)
function groupSet(sets1: string[]): string[][] {
  const grSt: string[][] = [];
  for (const st of sets1) {
    const cnt = countOnes(st); // Количество '1'
    if (!grSt[cnt]) { // Если подмассива для этого cnt ещё нет, создаём его
      grSt[cnt] = [];
    }
    grSt[cnt].push(st);
  }
  return grSt.filter(group => group !== undefined); // [['0100'], ['0011', '0101', '1001', '1100'], ['0111', '1011', '1101']]
}

// Функция, которая находит вес набора
function countOnes(str: string): number {
  let count = 0;
  for (const char of str) {
    if (char === '1') count++;
  }
  return count;
}

// Функция, которая склеивает соседние наборы (первый раз)
function glueSets(groupSet: string[][] ): string[] {
  const glSets: string[] =[];
  for (let i = 0; i < groupSet.length-1; i++) {
    for (let j = 0; j < groupSet[i].length; j++) { // 0
      for (let k = 0; k < groupSet[i+1].length; k++) { // 0..4
        if (adjacentSets(groupSet[i][j], groupSet[i+1][k])) {
          let g: string = '';
          for(let char = 0; char < groupSet[i][j].length; char++) {
            if (groupSet[i][j][char] === groupSet[i+1][k][char]) g += groupSet[i+1][k][char];
            else g += '-';
          }
          glSets.push(g);
        }
      }
    }
  }
  return glSets; // ['010-', '-100', '0-11', '-011', '01-1', '-101', '10-1', '1-01', '110-']
}

// Функция, которая проверяет являются ли наборы соседними
function adjacentSets (first: string, second: string): boolean {
  let cnt: number = 0;
  const len = first.length;
  for (let i = 0; i < len; i++) {
    if(first[i] !== second[i]) cnt++;
    if(cnt > 1) return false;
  }
  return true;
}

// Функция, которая склеивает соседние наборы (рекурсивно)
function glueRes(glSets: string[]): string[] {
  const groupGlueSets: string[][] = []; // [['-100', '-011', '-101'], ['0-11', '1-01'], ['01-1', '10-1'], ['010-', '110-']]
  for (const g of glSets) {
    for (let i = 0; i < g.length; i++) {
      if(g[i] === '-') {
        if (!groupGlueSets[i]) groupGlueSets[i] = [];
        groupGlueSets[i].push(g);
      }
    }
  }
  let glRes: string[] = glSets;
  let flag: boolean = false;
  for (const group of groupGlueSets) {
    if (!group) break;
    for (let i = 0; i < group.length-1; i++) {
      for (let j = i+1; j < group.length; j++) {
        if(adjacentSets(group[i], group[j])) {
          glRes = glRes.filter(gl => gl !== group[i]); // удаляем используемый для склейки набор
          glRes = glRes.filter(gl => gl !== group[j]); // удаляем используемый для склейки набор
          let g: string = '';
          for(let char = 0; char < group[i].length; char++) {
            if(group[i][char] === group[j][char]) g += group[i][char];
            else g += '-';
          }
          if(!glRes.includes(g)) glRes.push(g); // если нет такой склейки
          flag = true;
        }
      }
    }
  }
  if(flag) return glueRes(glRes);
  return glRes; // ['0-11', '-011', '01-1', '10-1', '1-01', '-10-']
}

// Функция, которая находит минимальное покрытие
function minimalCover(glRes: string[], sets1: string[]): string[] {
  // Если нет склеек, используем исходные наборы
  if (glRes.length === 0) {
    return sets1;
  }
  let minCover: string[] = [];
  function backtrack(current: string[], index: number, covered: Set<number>) { // current - текущий набор импликант, covered - покрытые наборы (множество индексов)
    if (minCover.length && current.length >= minCover.length) return;
    if (covered.size === sets1.length) {
      if (!minCover.length || current.length < minCover.length) {
        minCover = [...current];
      }
      return;
    }
    for (let i = index; i < glRes.length; i++) {
      const imp = glRes[i];
      const newCovered = new Set(covered);
      sets1.forEach((set, idx) => {
        if (isCovered(set, imp)) newCovered.add(idx);
      });
      backtrack([...current, imp], i + 1, newCovered);
    }
  }
  backtrack([], 0, new Set<number>());
  return minCover.sort(); // ['-10-', '0-11', '10-1']
}

// Проверяет, покрывает ли импликант набор
function isCovered(set1: string, implicant: string): boolean {
  for (let i = 0; i < set1.length; i++) {
    if (implicant[i] !== '-' && implicant[i] !== set1[i]) {
      return false;
    }
  }
  return true;
}

// Функция, которая превращает минимальный набор простых импликант, покрывающих sets1, в ДНФ
function formatDNF(coverage: string[]): string {
  const minDNF: string[] = [];
  for (const st of coverage) {
    const term: string[] = [];
    for(let i = 0; i < st.length; i++) {
      const variable = `x${i+1}`;
      if(st[i]=== '1') term.push(variable);
      if(st[i]=== '0') term.push(`-${variable}`);
    }
    minDNF.push(`(${term.join(' * ')})`);
  }
  return minDNF.join(' v ') || "0"; // '(x2 * -x3) v (x1 * -x2 * x4) v (-x1 * x3 * x4)'
}