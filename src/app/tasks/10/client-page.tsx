'use client'

import { useState } from 'react';
import { randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask1 } from '@/tasks/task1';
import { toast } from 'sonner';
import { solveTask10 } from '@/tasks/task10';
import { Selectable } from '@/components/selectable';

export default function Task10Form() {
  const [vector, setVector] = useState('');
  const [T0, setT0] = useState(false);
  const [T1, setT1] = useState(false);
  const [S, setS] = useState(false);
  const [M, setM] = useState(false);
  const [L, setL] = useState(false);

  const handleGenerate = safe(() => {
    setVector(solveTask1(randomInt(2, 5)));
    setT0(false);
    setT1(false);
    setS(false);
    setM(false);
    setL(false);
  });

  const handleClick = safe(() => {
    const classes = solveTask10(vector);
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
      <h1>Задание 10</h1>
      <h2>Система предлагает вектор булевой функции, пользователь определяет предполные классы</h2>

      <CustomButton onClick={handleGenerate}>Начать</CustomButton>

      {vector && (
        <>
          <h2 className="!pt-50">Выберите предполные классы</h2>
          <pre>{vector}</pre>
          <div className="flex flex-wrap gap-4">
            <Selectable value={T0} setValue={setT0}>T0</Selectable>
            <Selectable value={T1} setValue={setT1}>T1</Selectable>
            <Selectable value={S} setValue={setS}>S</Selectable>
            <Selectable value={M} setValue={setM}>M</Selectable>
            <Selectable value={L} setValue={setL}>L</Selectable>
          </div>
          <CustomButton onClick={handleClick}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}
