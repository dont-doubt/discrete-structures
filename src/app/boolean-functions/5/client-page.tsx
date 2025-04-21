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
import HintedTitle from '@/components/hintedTitle';

function VectorPicker({fictive, setFictive, vector, expected, answered}: {
  fictive: number[],
  setFictive: Setter<number[]>,
  vector: string,
  expected: string,
  answered: boolean,
}) {
  const args = useMemo(() => Array.from({length: Math.log2(vector.length)}, (_, i) => i + 1), [vector.length]);

  return (
    <div className="flex flex-wrap gap-4">
      {args.map((i) => (
        <Selectable
          key={i}
          value={fictive.includes(i)}
          setValue={(v) => {
            setFictive(v ? [...fictive, i].toSorted() : fictive.filter((it) => it !== i));
          }}
          correct={answered ? expected.includes(i.toString()) ? true : fictive.includes(i) ? false : undefined : undefined}
          disabled={answered}
        >
          x{i}
        </Selectable>
      ))}
    </div>
  )
}

export default function Task5Form() {
  const [args, setArgs] = useState<number>();
  const [fictive, setFictive] = useState<number[]>([]);
  const [vector, setVector] = useState<string>();
  const [expected, setExpected] = useState('');
  const [answered, setAnswered] = useState(false);

  const handleFirstClick = safe(() => {
    if (!args) throw new Error('Введите n');
    const vector = solveTask1(args);
    setVector(vector);
    setFictive([]);
    setAnswered(false);
    setExpected(solveTask5(vector));
  });

  const handleClick = safe(() => {
    setAnswered(true);
    if (expected === fictive.join('')) {
      toast.success('Правильно!');
    } else {
      toast.warning('Неверно!', {
        description: 'Попробуйте снова',
      });
    }
  });

  return (
    <>
      <Title />
      <h2>Система предлагает вектор булевой функции от <b>n</b> аргументов, пользователь выбирает фиктивные аргументы</h2>

      <CustomNumberInput placeholder="Введите n" value={args} setValue={setArgs} />
      <CustomButton onClick={handleFirstClick}>Начать</CustomButton>

      {vector && (
        <>
          <h2 className="!pt-50">Выберите <b>фиктивные</b> аргументы:</h2>
          <pre>{vector}</pre>
          <VectorPicker fictive={fictive} setFictive={setFictive} vector={vector} answered={answered} expected={expected} />
          <CustomButton onClick={handleClick} disabled={answered}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 5">
      <p>
        i-й аргумент функции f называется <b>фиктивным</b>, если f<sup>0</sup><sub>i</sub> = f<sup>1</sup><sub>i</sub>
        (совпадают нулевая и единичная остаточные по этому аргументу) и
        <b> существенным </b> в противном случае.
      </p>
    </HintedTitle>
  )
}
