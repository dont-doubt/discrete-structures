'use client'

import { useState } from 'react';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import { solveTask9 } from '@/tasks/task9';
import Results from '@/components/results';
import HintedTitle from '@/components/hintedTitle';

export default function Task9Form() {
  const [vector, setVector] = useState('');
  const [result, setResult] = useState<string>();

  const handleClick = safe(() => {
    setResult(solveTask9(vector));
  });

  return (
    <>
      <Title />
      <h2>Пользователь вводит вектор булевой функции, программа выводит её СКНФ</h2>

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
          <p>Создан СКНФ:</p>
          <pre>{result}</pre>
        </Results>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 9">
      <p>
        Совершенную конъюнктивную нормальную форму (СКНФ) можно построить только для функции, которая хотя бы на одном наборе равна 0 (вектор, состоящий только из единиц даст в результате 1).
      </p>

      <p><b>Алгоритм:</b></p>
      <ol>
        <li>Выбираем наборы, на которых функция равна 0.</li>
        <li>
          Каждому выбранному набору ставим в соответствие элементарную дизъюнкцию, в которую входят все аргументы по одному разу.<br />
          Если на наборе σ<sub>i</sub> = 0, то в дизъюнкцию войдёт x<sub>i</sub>, если 1 — то -x<sub>i</sub>.
        </li>
        <li>Строим конъюнкцию элементарных дизъюнкций. Полученная КНФ является СКНФ.</li>
      </ol>
    </HintedTitle>
  )
}
