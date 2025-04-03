'use client'

import { useState } from 'react';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import Results from '@/components/results';
import { solveTask8 } from '@/tasks/task8';

export default function Task8Form() {
  const [vector, setVector] = useState('');
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    setResult(solveTask8(vector));
  });

  return (
    <>
      <h1>Задание 8</h1>
      <h2>Пользователь вводит вектор булевой функции, программа выводит её СДНФ</h2>

      <h4>Введите вектор булевой функции:</h4>
      <ul>
        <li>Вектор должен состоять из <b>0</b> и <b>1</b></li>
        <li>Запись в формате <b>01010101</b></li>
        <li>Ограничение: не может содержать более <b>5</b> аргументов</li>
      </ul>
      <CustomInput placeholder="Введите вектор булевой функции" value={vector} setValue={setVector} regex={/^[01]*$/} />
      <CustomButton onClick={handleClick}>Продолжить</CustomButton>

      {result && (
        <Results key={result}>
          <p>Создан СДНФ:</p>
          <pre>{result}</pre>
        </Results>
      )}
    </>
  )
}
