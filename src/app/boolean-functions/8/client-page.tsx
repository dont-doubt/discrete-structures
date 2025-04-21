'use client'

import { useState } from 'react';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import Results from '@/components/results';
import { solveTask8 } from '@/tasks/task8';
import HintedTitle from '@/components/hintedTitle';

export default function Task8Form() {
  const [vector, setVector] = useState('');
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    setResult(solveTask8(vector));
  });

  return (
    <>
      <Title />
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

function Title() {
  return (
    <HintedTitle title="Задание 8">
      <p>
        Совершенную дизъюнктивную нормальную форму (СДНФ) можно построить только для функции, которая хотя бы на одном наборе равна 1 (вектор, состоящий только из нулей даст в результате 0).
      </p>

      <p><b>Алгоритм:</b></p>
      <ol>
        <li>Выбираем наборы, на которых функция равна 1.</li>
        <li>
          Каждому выбранному набору ставим в соответствие элементарную конъюнкцию, в которую входят все аргументы по одному разу.<br />
          Если на наборе σ<sub>i</sub> = 1, то в конъюнкцию войдёт x<sub>i</sub>, если 0 — то -x<sub>i</sub>.
        </li>
        <li>Строим дизъюнкцию элементарных конъюнкций. Полученная ДНФ является СДНФ.</li>
      </ol>
    </HintedTitle>
  )
}
