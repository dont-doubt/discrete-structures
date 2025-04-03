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
  return stsOne;
}

function groupSet(sets1: string[]): string[][] {
  const grSt: string[][] = [];
  for (const st of sets1) {
    const cnt = countOnes(st);
    if (!grSt[cnt]) {
      grSt[cnt] = [];
    }
    grSt[cnt].push(st);
  }
  return grSt.filter(group => group !== undefined);
}

function countOnes(str: string): number {
  let count = 0;
  for (const char of str) {
    if (char === '1') count++;
  }
  return count;
}

function glueSets(groupSet: string[][] ): string[] {
  const glSets: string[] = [];
  for (let i = 0; i < groupSet.length-1; i++) {
    for (let j = 0; j < groupSet[i].length; j++) {
      for (let k = 0; k < groupSet[i+1].length; k++) {
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
  return glSets;
}

function adjacentSets (first: string, second: string): boolean {
  let cnt: number = 0;
  const len = first.length;
  for (let i = 0; i < len; i++) {
    if(first[i] !== second[i]) cnt++;
    if(cnt > 1) return false;
  }
  return true;
}

function glueRes(glSets: string[]): string[] {
  const groupGlueSets: string[][] = [];
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
          glRes = glRes.filter(gl => gl !== group[i]);
          glRes = glRes.filter(gl => gl !== group[j]);
          let g: string = '';
          for(let char = 0; char < group[i].length; char++) {
            if(group[i][char] === group[j][char]) g += group[i][char];
            else g += '-';
          }
          if(!glRes.includes(g)) glRes.push(g);
          flag = true;
        }
      }
    }
  }
  if(flag) return glueRes(glRes);
  return glRes;
}

// Новая версия minimalCover с использованием битовых масок и мемоизации
function minimalCover(glRes: string[], sets1: string[]): string[] {
  // Если нет склеек, возвращаем исходные наборы
  if (glRes.length === 0) {
    return sets1;
  }

  const n = sets1.length;
  const fullMask = (1 << n) - 1;

  // Для каждого импликанта вычисляем битовую маску покрытых наборов
  const implicants = glRes.map(imp => {
    let mask = 0;
    for (let i = 0; i < sets1.length; i++) {
      if (isCovered(sets1[i], imp)) mask |= (1 << i);
    }
    return { imp, mask };
  });

  let bestSolution: string[] | null = null;
  const memo = new Map<number, number>(); // сохраняем минимальное количество импликант для данной маски

  function dfs(currentMask: number, start: number, current: string[]): void {
    if (currentMask === fullMask) {
      if (bestSolution === null || current.length < bestSolution.length) {
        bestSolution = [...current];
      }
      return;
    }
    // Если уже набрали больше элементов, чем лучший найденный вариант, прекращаем
    if (bestSolution !== null && current.length >= bestSolution.length) return;
    // Мемоизация: если для текущей маски уже найдено решение с меньшим или равным числом импликант, прерываем
    if (memo.has(currentMask) && memo.get(currentMask)! <= current.length) return;
    memo.set(currentMask, current.length);

    for (let i = start; i < implicants.length; i++) {
      const newMask = currentMask | implicants[i].mask;
      if (newMask === currentMask) continue;
      current.push(implicants[i].imp);
      dfs(newMask, i + 1, current);
      current.pop();
    }
  }

  dfs(0, 0, []);

  return bestSolution ? (bestSolution as string[]).sort() : [];
}

function isCovered(set1: string, implicant: string): boolean {
  for (let i = 0; i < set1.length; i++) {
    if (implicant[i] !== '-' && implicant[i] !== set1[i]) {
      return false;
    }
  }
  return true;
}

function formatDNF(coverage: string[]): string {
  const minDNF: string[] = [];
  for (const st of coverage) {
    const term: string[] = [];
    for(let i = 0; i < st.length; i++) {
      const variable = `x${i+1}`;
      if(st[i] === '1') term.push(variable);
      if(st[i] === '0') term.push(`-${variable}`);
    }
    minDNF.push(`(${term.join(' * ')})`);
  }
  return minDNF.join(' v ') || "0";
}
