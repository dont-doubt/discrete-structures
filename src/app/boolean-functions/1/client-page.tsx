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

      <h1>Задание 2.</h1>

      <p>
        Пусть σ<sub>i</sub> ∈ {'{0, 1}'}. <b>σ<sub>i</sub>-остаточной функцией</b> f по i-му аргументу называется функция размерности на единицу меньше, обозначаемая и определяемая следующим образом:
      </p>

      <p>
        f<sup>σ<sub>i</sub></sup><sub>i</sub>(τ₁, ..., τ<sub>n-1</sub>) = f(τ₁, ..., τ<sub>i-1</sub>, σ<sub>i</sub>, τ<sub>i</sub>, ..., τ<sub>n-1</sub>)
      </p>

      <ul>
        <li>Если σ<sub>i</sub> = 0 — нулевая остаточная</li>
        <li>Если σ<sub>i</sub> = 1 — единичная остаточная</li>
      </ul>

      <p><b>Остаточные по аргументам:</b></p>
      <ol>
        <li>по первому: 1-я половина — нулевая, 2-я — единичная</li>
        <li>по второму: объединение 1+3, 2+4 четвертей</li>
        <li>по третьему: объединяются 1+3+5+7 и 2+4+6+8 части</li>
        <li>
          по k-му: разбивается на 2<sup>k</sup> частей; нулевая — нечётные части, единичная — чётные
        </li>
      </ol>

      <p><b>Пример:</b><br />n = 3, f(x1, x2, x3) = (10010110)</p>

      <table className="**:text-center">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th>x1</th>
          <th>x2</th>
          <th>x3</th>
          <th>f(x1, x2, x3)</th>
        </tr>
        </thead>
        <tbody>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>0</td><td>0</td><td>0</td><td>1</td>
        </tr>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>0</td><td>0</td><td>1</td><td>0</td>
        </tr>
        <tr className="bg-pink-100 dark:bg-pink-900">
          <td>0</td><td>1</td><td>0</td><td>0</td>
        </tr>
        <tr className="bg-pink-100 dark:bg-pink-900">
          <td>0</td><td>1</td><td>1</td><td>1</td>
        </tr>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>1</td><td>0</td><td>0</td><td>0</td>
        </tr>
        <tr className="bg-green-100 dark:bg-green-900">
          <td>1</td><td>0</td><td>1</td><td>1</td>
        </tr>
        <tr className="bg-pink-100 dark:bg-pink-900">
          <td>1</td><td>1</td><td>0</td><td>1</td>
        </tr>
        <tr className="bg-pink-100 dark:bg-pink-900">
          <td>1</td><td>1</td><td>1</td><td>0</td>
        </tr>
        </tbody>
      </table>

      <p>
        f<sup>1</sup><sub>2</sub> = (0110) — <b>единичная остаточная по второму аргументу</b>.
      </p>

      <p>
        f<sup>1</sup><sub>2</sub>(00) = f(<b>010</b>) = 0<br />
        f<sup>1</sup><sub>2</sub>(01) = f(<b>011</b>) = 1<br />
        f<sup>1</sup><sub>2</sub>(10) = f(<b>110</b>) = 1
      </p>
    </HintedTitle>
  )
}
