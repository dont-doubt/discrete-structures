'use client'

import { useState } from 'react';
import { cn, randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask1 } from '@/tasks/task1';
import { Selectable } from '@/components/selectable';
import { solveTask11 } from '@/tasks/task11';
import { toast } from 'sonner';
import HintedTitle from '@/components/hintedTitle';

export default function Task11Form() {
  const [vectors, setVectors] = useState<string[]>();
  const [expected, setExpected] = useState('');
  const [answered, setAnswered] = useState(false);
  const [full, setFull] = useState(false);
  const [T0, setT0] = useState(false);
  const [T1, setT1] = useState(false);
  const [S, setS] = useState(false);
  const [M, setM] = useState(false);
  const [L, setL] = useState(false);

  const handleGenerate = safe(() => {
    const vectors = Array.from({length: randomInt(2, 4)}, () => solveTask1(randomInt(2, 3)));
    setVectors(vectors);
    setExpected(solveTask11(vectors));
    setFull(false);
    setT0(false);
    setT1(false);
    setS(false);
    setM(false);
    setL(false);
    setAnswered(false);
  });

  function isFull() {
    return full || (!T0 && !T1 && !S && !M && !L);
  }

  const handleClick = safe(() => {
    setAnswered(true);

    if (isFull() && expected === 'full') {
      toast.success('Правильно!');
      return;
    }
    let good = true;
    if (good && (T0 ? !expected.includes('T0') : expected.includes('T0'))) good = false;
    if (good && (T1 ? !expected.includes('T1') : expected.includes('T1'))) good = false;
    if (good && (S ? !expected.includes('S') : expected.includes('S'))) good = false;
    if (good && (M ? !expected.includes('M') : expected.includes('M'))) good = false;
    if (good && (L ? !expected.includes('L') : expected.includes('L'))) good = false;
    if (good) {
      toast.success('Правильно!');
    } else {
      toast.warning('Неверно!', {
        description: 'Попробуйте снова',
      });
    }
  });

  function isCorrect(selected: boolean, name: string): boolean | undefined {
    if (!answered || full) return undefined;
    if (expected === 'full') return selected ? false : undefined;
    if (expected.includes(name)) return true;
    if (selected ? !expected.includes(name) : expected.includes(name)) return false;
    return undefined;
  }

  return (
    <>
      <Title />
      <h2>Система предлагает векторы булевых функций, пользователь определяет полноту или предполные классы</h2>

      <CustomButton onClick={handleGenerate}>Начать</CustomButton>

      {vectors && (
        <>
          <h2 className="!pt-50">Выберите полноту функции и (или) её предполные классы</h2>
          <pre className="text-wrap">{`{${vectors.join(', ')}}`}</pre>
          <div className="flex flex-wrap gap-14">
            <Selectable value={full} setValue={setFull} disabled={answered} correct={answered ? expected === 'full' ? true : isFull() ? false : undefined : undefined}>Полная</Selectable>
            <div className={cn("transition-opacity flex flex-wrap gap-4", full && !answered && "opacity-0 pointer-events-none")}>
              <Selectable value={!full && T0} setValue={setT0} disabled={answered} correct={isCorrect(T0, 'T0')}>T0</Selectable>
              <Selectable value={!full && T1} setValue={setT1} disabled={answered} correct={isCorrect(T1, 'T1')}>T1</Selectable>
              <Selectable value={!full && S} setValue={setS} disabled={answered} correct={isCorrect(S, 'S')}>S</Selectable>
              <Selectable value={!full && M} setValue={setM} disabled={answered} correct={isCorrect(M, 'M')}>M</Selectable>
              <Selectable value={!full && L} setValue={setL} disabled={answered} correct={isCorrect(L, 'L')}>L</Selectable>
            </div>
          </div>
          <CustomButton onClick={handleClick} disabled={answered}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 11">
      <p>
        Множество функций K является <b>полным</b> тогда и только тогда, когда оно не входит ни в один из предполных классов булевых функций, т. е.
        K ⊈ L, K ⊈ M, K ⊈ T0, K ⊈ T1 и K ⊈ S.
      </p>

      <p><b>Пример:</b></p>
      <p>V = {'{(0001), (10)}'}</p>

      <table className="**:text-center">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th></th>
          <th>T0</th>
          <th>T1</th>
          <th>S</th>
          <th>L</th>
          <th>M</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>(0001)</td><td>+</td><td>+</td><td>-</td><td>-</td><td>+</td>
        </tr>
        <tr>
          <td>(10)</td><td>-</td><td>-</td><td>+</td><td>+</td><td>-</td>
        </tr>
        </tbody>
      </table>

      <p>
        В каждом столбце есть хотя бы один минус, поэтому V — полное.
      </p>
    </HintedTitle>
  )
}
