'use client'

import { useState } from 'react';
import { parseVector, safe, stringifyVector } from '@/utils';
import CustomNumberInput from '@/components/custom-number-input';
import CustomInput from '@/components/custom-input';
import CustomButton from '@/components/custom-button';
import { solveTask2 } from '@/tasks/task2';
import Results from '@/components/results';

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
      <h1>Задание 2</h1>
      <h2>Пользователь вводит вектор функции, 0 или 1, номер аргумента, программа выводит остаточную</h2>
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
      <CustomInput placeholder="Введите тип остаточной" value={type} setValue={setType} regex={/^[01]$/}/>
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
