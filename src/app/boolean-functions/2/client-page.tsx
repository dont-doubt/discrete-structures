'use client'

import { useState } from 'react';
import { parseVector, safe, stringifyVector } from '@/utils';
import CustomNumberInput from '@/components/custom-number-input';
import CustomInput from '@/components/custom-input';
import CustomButton from '@/components/custom-button';
import { solveTask2 } from '@/tasks/task2';
import Results from '@/components/results';
import HintedTitle from '@/components/hintedTitle';

export default function Task2Form() {
  const [vector, setVector] = useState('');
  const [type, setType] = useState<string>();
  const [id, setID] = useState<number>();
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    if (!vector) throw new Error('Введите булеву функцию');
    if (!type) throw new Error('Введите тип остаточной');
    if (!id) throw new Error('Введите номер аргумента');
    const result = solveTask2(parseVector(vector), type ? 1 : 0, id);
    setResult(stringifyVector(result));
  });

  return (
    <>
      <Title />
      <h2>Пользователь вводит вектор функции, <b>0</b> или <b>1</b>, номер аргумента, программа выводит остаточную</h2>
      <h4>Введите вектор булевой функции:</h4>
      <ul>
        <li>Вектор должен состоять из <b>0</b> и <b>1</b></li>
        <li>Запись в формате <b>01010101</b></li>
        <li>Ограничение: не может содержать более <b>5</b> аргументов</li>
      </ul>
      <CustomInput placeholder="Введите вектор булевой функции" value={vector} setValue={setVector} regex={/^[01]*$/} />
      <h4>Введите тип остаточной:</h4>
      <ul>
        <li><b>0</b> или <b>1</b> – нулевая или единичная остаточная соответственно</li>
      </ul>
      <CustomInput placeholder="Введите тип остаточной" value={type} setValue={setType} regex={/^[01]?$/}/>
      <h4>Введите номер аргумента булевой функции:</h4>
      <ul>
        <li>Для <b>x<sub>n</sub></b> аргумента, введите <b>n</b></li>
        <li>Номер указанного аргумента - целое положительное число, не превышающее количество аргументов булевой функции</li>
        <li>Ограничение: не может превышать <b>5</b></li>
      </ul>
      <CustomNumberInput placeholder="Введите номер аргумента" value={id} setValue={setID} min={1} />
      <CustomButton onClick={handleClick}>Продолжить</CustomButton>
      {result && (
        <Results result={result}>
          <p>Результат нахождения остаточной от булевой функции:</p>
          <pre>{result}</pre>
        </Results>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 2">
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
        <li>по второму: объединение 1+3, 2+4 четвертей исходного вектора</li>
        <li>по третьему: склеиваются 1,3,5,7 и 2,4,6,8 части соответственно</li>
        <li>
          по k-му: разбивается на 2<sup>k</sup> частей; нулевая — нечётные, единичная — чётные части
        </li>
      </ol>

      <p><b>Пример:</b><br />n = 3, f(x1, x2, x3) = (10010110)</p>

      <table className="*:text-center border border-black">
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
