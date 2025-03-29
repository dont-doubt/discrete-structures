'use client'

import CustomButton from '@/components/custom-button';
import CustomNumberInput from '@/components/custom-number-input';
import { useMemo, useState } from 'react';
import { solveTask1 } from '@/tasks/task1';
import { safe } from '@/utils';
import Results from '@/components/results';

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
          <tr key={i}>{row.map((v, i) => <td key={i}>{v}</td>)}</tr>
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
      <h1>Задание 1</h1>
      <h2>Пользователь вводит число n, программа выводит булеву функцию от n аргументов</h2>
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
