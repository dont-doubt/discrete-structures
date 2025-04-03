'use client'

import { useState } from 'react';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import Results from '@/components/results';
import { solveTask12 } from '@/tasks/task12';

export default function Task12Form() {
  const [vector, setVector] = useState('');
  const [result, setResult] = useState<string>();

  const handleClick = safe(async () => {
    setResult(solveTask12(vector));
  });

  return (
    <>
      <h1>Задание 12</h1>
      <h2>Пользователь вводит вектор булевой функции, программа выводит её минимальную ДНФ</h2>

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
          <p>Создана минимальная ДНФ:</p>
          <pre>{result}</pre>
        </Results>
      )}
    </>
  )
}
