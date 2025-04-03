'use client'

import { useState } from 'react';
import { randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask1 } from '@/tasks/task1';
import { Selectable } from '@/components/selectable';
import { solveTask11 } from '@/tasks/task11';
import { toast } from 'sonner';

export default function Task11Form() {
  const [vectors, setVectors] = useState<string[]>();
  const [full, setFull] = useState(false);
  const [T0, setT0] = useState(false);
  const [T1, setT1] = useState(false);
  const [S, setS] = useState(false);
  const [M, setM] = useState(false);
  const [L, setL] = useState(false);

  const handleGenerate = safe(() => {
    setVectors(Array.from({length: randomInt(2, 7)}, () => solveTask1(randomInt(2, 5))));
    setFull(false);
    setT0(false);
    setT1(false);
    setS(false);
    setM(false);
    setL(false);
  });

  const handleClick = safe(() => {
    if (!vectors) return;
    const realFull = full || (!T0 && !T1 && !S && !M && !L);

    const classes = solveTask11(vectors);
    if (realFull && classes === 'full') {
      toast.success('Правильно!');
      return;
    }
    let good = true;
    if (good && (T0 ? !classes.includes('T0') : classes.includes('T0'))) good = false;
    if (good && (T1 ? !classes.includes('T1') : classes.includes('T1'))) good = false;
    if (good && (S ? !classes.includes('S') : classes.includes('S'))) good = false;
    if (good && (M ? !classes.includes('M') : classes.includes('M'))) good = false;
    if (good && (L ? !classes.includes('L') : classes.includes('L'))) good = false;
    if (good) {
      toast.success('Правильно!');
    } else {
      toast.warning('Неверно!', {
        description: 'Попробуйте снова',
      });
    }
  });

  return (
    <>
      <h1>Задание 11</h1>
      <h2>Система предлагает векторы булевых функций, пользователь определяет полноту или предполные классы</h2>

      <CustomButton onClick={handleGenerate}>Начать</CustomButton>

      {vectors && (
        <>
          <h2 className="!pt-50">Выберите полноту функции и (или) её предполные классы</h2>
          <pre className="text-wrap">{`{${vectors.join(', ')}}`}</pre>
          <div className="flex flex-wrap gap-4">
            <Selectable value={full} setValue={setFull} className="me-10">Полная</Selectable>
            {!full && (
              <>
                <Selectable value={T0} setValue={setT0}>T0</Selectable>
                <Selectable value={T1} setValue={setT1}>T1</Selectable>
                <Selectable value={S} setValue={setS}>S</Selectable>
                <Selectable value={M} setValue={setM}>M</Selectable>
                <Selectable value={L} setValue={setL}>L</Selectable>
              </>
            )}
          </div>
          <CustomButton onClick={handleClick}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}
