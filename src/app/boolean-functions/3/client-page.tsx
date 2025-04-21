'use client'

import { useState } from "react";
import CustomInput from '@/components/custom-input';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask3 } from "@/tasks/task3";
import CustomNumberInput from "@/components/custom-number-input";
import Results from '@/components/results';
import HintedTitle from '@/components/hintedTitle';

export default function Task3Form() {
  const [zeroResidual, setZeroResidual] = useState('');
  const [oneResidual, setOneResidual] = useState('');
  const [argIndex, setArgIndex] = useState<number>();
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    if (!zeroResidual) throw new Error('Введите нулевую остаточную');
    if (!oneResidual) throw new Error('Введите единичную остаточную');
    if (!argIndex) throw new Error('Введите номер аргумента');
    setResult(solveTask3(zeroResidual, oneResidual, argIndex));
  });

  return (
    <>
      <Title />
      <h2>Пользователь вводит нулевую и единичную остаточные по некоторому аргументу и номер аргумента, программа выводит вектор булевой функции</h2>
      <p>Введите нулевую и единичную остаточные по некоторому аргументу и номер этого аргумента, чтобы получить вектор булевой функции</p>
      <li>Ограничение: не может содержать более <b>5</b> аргументов</li>
      <h4>Введите нулевую остаточную:</h4>
      <ul>
        <li>Вектор должен состоять из <b>0</b> и <b>1</b></li>
        <li>Запись в формате <b>01010101</b></li>
        <li>Длины векторов остаточных должны совпадать</li>
      </ul>
      <CustomInput placeholder="Введите нулевую остаточную" value={zeroResidual} setValue={setZeroResidual} regex={/^[01]*$/} />

      <h4>Введите единичную остаточную:</h4>
      <ul>
        <li>Вектор должен состоять из <b>0</b> и <b>1</b></li>
        <li>Запись в формате <b>01010101</b></li>
        <li>Длины векторов остаточных должны совпадать</li>
      </ul>
      <CustomInput placeholder="Введите единичную остаточную" value={oneResidual} setValue={setOneResidual} regex={/^[01]*$/} />

      <h4>Введите номер аргумента:</h4>
      <ul>
        <li>Для <b>x<sub>n</sub></b> аргумента, введите <b>n</b></li>
        <li>Номер указанного аргумента - целое положительное число</li>
        <li>Не должен превышать количество аргументов ожидаемой булевой функции</li>
        <li>Ограничение: не должен превышать <b>5</b></li>
      </ul>
      <CustomNumberInput placeholder="Введите номер аргумента" value={argIndex} setValue={setArgIndex} min={1} />

      <CustomButton onClick={handleClick}>Продолжить</CustomButton>

      {result && (
        <Results key={result}>
          <p>Результат выполнения функции:</p>
          <pre>{result}</pre>
        </Results>
      )}

      {/*-	Остаточные не должны быть пустыми.
      -	Остаточные должны быть одинаковой длины.
      -	Длина остаточных должна быть степенью двойки.
      -	Остаточные могут состоять только из 0 и 1.
      -	Номер аргумента – целое положительное число.
      -	Номер указанного аргумента не должен превышать число аргументов булевой функции.
      -	Ограничение: число аргументов не может превышать 5.*/}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 3">
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
