'use client'

import { useMemo, useState } from 'react';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask1 } from '@/tasks/task1';
import CustomNumberInput from '@/components/custom-number-input';
import { Setter } from '@/utils/types';
import { toast } from 'sonner';
import { solveTask5 } from '@/tasks/task5';
import { Selectable } from '@/components/selectable';

function VectorPicker({fictive, setFictive, vector}: {
  fictive: number[],
  setFictive: Setter<number[]>,
  vector: string,
}) {
  const args = useMemo(() => Array.from({length: Math.log2(vector.length)}, (_, i) => i + 1), [vector.length]);

  return (
    <div className="flex flex-wrap gap-4">
      {args.map((i) => (
        <Selectable key={i} value={fictive.includes(i)} setValue={(v) => {
          setFictive(v ? [...fictive, i] : fictive.filter((it) => it !== i));
        }}>x{i}</Selectable>
      ))}
    </div>
  )
}

export default function Task5Form() {
  const [args, setArgs] = useState<number>();
  const [fictive, setFictive] = useState<number[]>([]);
  const [vector, setVector] = useState<string>();
  const [expected, setExpected] = useState<string>();

  const handleFirstClick = safe(() => {
    if (!args) throw new Error('Введите n');
    const vector = solveTask1(args);
    setVector(vector);
    setFictive([]);
    setExpected(solveTask5(vector));
  });

  const handleClick = safe(() => {
    const selected = fictive.toSorted().join('');
    if (expected === selected) {
      toast.success('Правильно!');
    } else {
      toast.warning('Неверно!', {
        description: 'Попробуйте снова',
      });
    }
  });

  return (
    <>
      <h1>Задание 5</h1>
      <h2>Система предлагает рандомный вектор булевой функции от n аргументов. Пользователь выбирает фиктивные аргументы</h2>

      <CustomNumberInput placeholder="Введите n" value={args} setValue={setArgs} />
      <CustomButton onClick={handleFirstClick}>Начать</CustomButton>

      {vector && (
        <>
          <h2 className="!pt-100">Выберите <b>фиктивные</b> аргументы:</h2>
          <pre>{vector}</pre>
          <VectorPicker fictive={fictive} setFictive={setFictive} vector={vector} />
          <CustomButton onClick={handleClick}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}
