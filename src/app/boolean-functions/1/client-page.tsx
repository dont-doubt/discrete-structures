'use client'

import CustomButton from '@/components/custom-button';
import CustomNumberInput from '@/components/custom-number-input';
import { useMemo, useState } from 'react';
import { solveTask1 } from '@/tasks/task1';
import { safe } from '@/utils';
import Results from '@/components/results';
import HintedTitle from '@/components/hintedTitle';

function BooleanFunctionTable({value}: {value: string}) {
  const [heading, ...table] = useMemo(() => {
    const vars = Math.log2(value.length);
    const result: (number | string)[][] = [[...Array.from({length: vars}, (_, i) => 'x' + (i + 1)), 'f']];
    for (let i = 0; i < value.length; i++) {
      const row: (number | string)[] = [];
      for (let bit = vars - 1; bit >= 0; bit--) row.push((i >> bit) & 1);
      row.push(value[i]);
      result.push(row);
    }
    return result;
  }, [value]);

  return (
    <table>
      <thead>
        <tr>{heading.map((v, i) => <th key={i}>{v}</th>)}</tr>
      </thead>
      <tbody>
        {table.map((row, i) => (
          <tr key={i}>{row.map((v, i) => (
            <td key={i}>
              {v == 1 ? <b>{v}</b> : v}
            </td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Task1Form() {
  const [args, setArgs] = useState<number>();
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    if (!args) throw new Error('Введите количество аргументов');
    setResult(solveTask1(args));
  });

  return (
    <>
      <Title />
      <h2>Пользователь вводит число <b>n</b>, программа выводит булеву функцию</h2>
      <h4>Введите <b>n</b> аргументов:</h4>
      <ul>
        <li>Количество аргументов – целое положительное число.</li>
        <li>Ограничение: число аргументов не может превышать <b>5</b>.</li>
      </ul>
      <CustomNumberInput placeholder="Введите количество аргументов" value={args} setValue={setArgs} min={1} max={5} />
      <CustomButton onClick={handleClick}>Продолжить</CustomButton>
      {result && (
        <Results result={result}>
          <p>Получен вектор:</p>
          <pre>{result}</pre>
          <p>Или же в виде таблицы:</p>
          <BooleanFunctionTable value={result} />
        </Results>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 1">
      <p>
        <b>Двоичным набором</b> называется конечная последовательность, состоящая из нулей и единиц.
      </p>
      <p>E = {'{0, 1}'}; E<sup>n</sup> = {'{(a₁, ..., aₙ) | aᵢ ∈ E}'}.</p>

      <p>
        <b>Булевой функцией</b> называется отображение из E<sup>n</sup> в E. n — размерность функции. Если функция имеет размерность n, то это значит, что функция зависит от n аргументов.
      </p>

      <p>Для задания булевой функции размерности n каждому двоичному набору длины n ставится в соответствие 0 или 1:</p>

      <ul>
        <li>Функция может быть задана <i>таблицей</i> — два столбца: наборы и значения функции.</li>
        <li>
          Может быть задана <i>вектором</i> — значения функции для упорядоченных по натуральному порядку двоичных чисел от 0 до 2<sup>n</sup> - 1.
        </li>
        <li>Может быть задана <i>формулой</i>, по которой вычисляется значение функции.</li>
      </ul>

      <p><b>Пример:</b> n = 2</p>

      <p>Таблица:</p>

      <table className="**:text-center">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th>x1</th>
          <th>x2</th>
          <th>f(x1, x2)</th>
        </tr>
        </thead>
        <tbody>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>0</td><td>0</td><td>0</td>
        </tr>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>0</td><td>1</td><td>1</td>
        </tr>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>1</td><td>0</td><td>1</td>
        </tr>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>1</td><td>1</td><td>0</td>
        </tr>
        </tbody>
      </table>

      <ul>
        <li>Вектор: (0110)</li>
        <li>Формула: x1 + x2</li>
      </ul>

      <p>Число всех булевых функций размерности n равно 2<sup>2ⁿ</sup>.</p>
    </HintedTitle>
  )
}
