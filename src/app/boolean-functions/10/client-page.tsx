'use client'

import { useState } from 'react';
import { randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask1 } from '@/tasks/task1';
import { toast } from 'sonner';
import { solveTask10 } from '@/tasks/task10';
import { Selectable } from '@/components/selectable';
import HintedTitle from '@/components/hintedTitle';

export default function Task10Form() {
  const [vector, setVector] = useState('');
  const [expected, setExpected] = useState('');
  const [answered, setAnswered] = useState(false);
  const [T0, setT0] = useState(false);
  const [T1, setT1] = useState(false);
  const [S, setS] = useState(false);
  const [M, setM] = useState(false);
  const [L, setL] = useState(false);

  const handleGenerate = safe(() => {
    const vector = solveTask1(randomInt(2, 5));
    setVector(vector);
    setExpected(solveTask10(vector));
    setT0(false);
    setT1(false);
    setS(false);
    setM(false);
    setL(false);
    setAnswered(false);
  });

  const handleClick = safe(() => {
    let good = true;
    if (good && (T0 ? !expected.includes('T0') : expected.includes('T0'))) good = false;
    if (good && (T1 ? !expected.includes('T1') : expected.includes('T1'))) good = false;
    if (good && (S ? !expected.includes('S') : expected.includes('S'))) good = false;
    if (good && (M ? !expected.includes('M') : expected.includes('M'))) good = false;
    if (good && (L ? !expected.includes('L') : expected.includes('L'))) good = false;
    setAnswered(true);
    if (good) {
      toast.success('Правильно!');
    } else {
      toast.warning('Неверно!', {
        description: 'Попробуйте снова',
      });
    }
  });

  function isCorrect(selected: boolean, name: string): boolean | undefined {
    if (!answered) return undefined;
    if (expected.includes(name)) return true;
    if (selected ? !expected.includes(name) : expected.includes(name)) return false;
    return undefined;
  }

  return (
    <>
      <Title />
      <h2>Система предлагает вектор булевой функции, пользователь определяет предполные классы</h2>

      <CustomButton onClick={handleGenerate}>Начать</CustomButton>

      {vector && (
        <>
          <h2 className="!pt-50">Выберите предполные классы</h2>
          <pre>{vector}</pre>
          <div className="flex flex-wrap gap-4">
            <Selectable value={T0} setValue={setT0} disabled={answered} correct={isCorrect(T0, 'T0')}>T0</Selectable>
            <Selectable value={T1} setValue={setT1} disabled={answered} correct={isCorrect(T1, 'T1')}>T1</Selectable>
            <Selectable value={S} setValue={setS} disabled={answered} correct={isCorrect(S, 'S')}>S</Selectable>
            <Selectable value={M} setValue={setM} disabled={answered} correct={isCorrect(M, 'M')}>M</Selectable>
            <Selectable value={L} setValue={setL} disabled={answered} correct={isCorrect(L, 'L')}>L</Selectable>
          </div>
          <CustomButton onClick={handleClick} disabled={answered}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 10">
      <p>
        Функция f(x) называется <b>монотонной</b> (принадлежит классу M), если для любых наборов a и b из того, что a ≤ b следует, что f(a) ≤ f(b).
      </p>

      <p>
        Функция f(x) называется <b>самодвойственной</b> (принадлежит классу S), если выполняется тождество -f(x₁, ..., x<sub>n</sub>) = f(-x₁, ..., -x<sub>n</sub>). Другими словами: на противоположных наборах значения противоположны.
      </p>

      <p>
        Функция f(x) называется функцией, <b>сохраняющей ноль</b> (принадлежит классу T0), если f(0...0) = 0. Другими словами: функция, сохраняющая ноль, на наборе из всех нулей возвращает 0.
      </p>

      <p>
        Функция f(x) называется функцией, <b>сохраняющей единицу</b> (принадлежит классу T1), если f(1...1) = 1. Другими словами: функция, сохраняющая 1, на наборе из всех единиц возвращает 1.
      </p>

      <p>
        Полиномиальным представлением будем называть представления, в которых внешней функцией терма является сложение по модулю 2.
      </p>

      <p>
        <i>Полиномом Жегалкина</i> будем называть выражение α · S + β, где S — это сумма произведений переменных, α, β ∈ E.
      </p>

      <p><b>Пример:</b></p>
      <p>f = (0100)</p>

      <table className="**:text-center">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th>x1</th>
          <th>x2</th>
          <th>f(x1, x2)</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>0</td><td>0</td><td>0</td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td>0</td><td>1</td><td>1</td><td><b>1 (0 + 1)</b></td><td></td><td></td>
        </tr>
        <tr>
          <td>1</td><td>0</td><td>0</td><td>1 (1 + 0)</td><td>0</td><td></td>
        </tr>
        <tr>
          <td>1</td><td>1</td><td>1</td><td>1 (0 + 1)</td><td>0</td><td>0</td>
        </tr>
        </tbody>
      </table>
      <p>f = <b>x<sub>2</sub></b></p>
      <p>
        Функция называется <b>линейной</b>, если она представима полиномом Жегалкина степени не выше 1.
      </p>
    </HintedTitle>
  )
}
