'use client'

import { useState } from "react";
import CustomInput from '@/components/custom-input';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask3 } from "@/tasks/task3";
import CustomNumberInput from "@/components/custom-number-input";
import Results from '@/components/results';

export default function Task3Form() {
  const [zeroResidual, setZeroResidual] = useState('');
  const [oneResidual, setOneResidual] = useState('');
  const [argIndex, setArgIndex] = useState<number>();
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    if (!zeroResidual) throw new Error('Введите нулевую остаточную');
    if (!zeroResidual) throw new Error('Введите первую остаточную');
    if (!argIndex) throw new Error('Введите номер остаточной');
    setResult(solveTask3(zeroResidual, oneResidual, argIndex));
  });

  return (
    <>
      <h1>Задание 3</h1>
      <h2>Пользователь вводит два вектора (нулевая и единичная остаточные по некоторому аргументу) и номер аргумента, программа выводит вектор булевой функции</h2>
      <p>Введите нулевую и единичную остаточные по некоторому аргументу и номер этого аргумента, чтобы получить вектор булевой функции</p>
      <h4>Введите нулевую остаточную:</h4>
      <ul>
        <li>Вектор должен состоять из <b>0</b> и <b>1</b></li>
        <li>Запись в формате <b>01010101</b></li>
        <li>Ограничение: не может содержать более <b>5</b> аргументов</li>
      </ul>
      <CustomInput placeholder="Введите нулевую остаточную" value={zeroResidual} setValue={setZeroResidual} regex={/^[01]*$/} />

      <h4>Введите первую остаточную:</h4>
      <ul>
        <li>Вектор должен состоять из <b>0</b> и <b>1</b></li>
        <li>Запись в формате <b>01010101</b></li>
        <li>Ограничение: не может содержать более <b>5</b> аргументов</li>
      </ul>
      <CustomInput placeholder="Введите первую остаточную" value={oneResidual} setValue={setOneResidual} regex={/^[01]*$/} />

      <h4>Введите номер остаточной:</h4>
      <CustomNumberInput placeholder="Введите номер остаточной" value={argIndex} setValue={setArgIndex} min={1} />

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
