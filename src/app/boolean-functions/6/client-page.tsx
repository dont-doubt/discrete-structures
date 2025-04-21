'use client'

import { useState } from 'react';
import { parseVector, randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import { solveTask1 } from '@/tasks/task1';
import { toast } from 'sonner';
import { solveTask6 } from '@/tasks/task6';
import HintedTitle from '@/components/hintedTitle';

export default function Task6Form() {
  const [vector, setVector] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleGenerate = safe(() => {
    setVector(solveTask1(randomInt(2, 5)));
    setUserInput('');
  });

  const handleClick = safe(() => {
    const result = solveTask6(parseVector(vector), userInput);
    if (result) {
      toast.success('Правильно!');
    } else {
      toast.warning('Неверно!', {
        description: 'Попробуйте снова',
      });
    }
  });

  return (
    <>
      <Title />
      <h2>Система предлагает вектор булевой функции, пользователь вводит её ДНФ</h2>
      <CustomButton onClick={handleGenerate}>Начать</CustomButton>
      {vector && (
        <>
          <h2 className="!pt-50">Введите ДНФ по вектору:</h2>
          <pre>{vector}</pre>
          <ul>
            <li>Для обозначения переменных нужно использовать «<b>x</b>» и «<b>порядковый номер</b>», например, <b>x1</b> – для первой
            переменной, <b>x2</b> – для второй и так далее;</li>
            <li>Для обозначения конъюнкции нужно использовать «<b>*</b>», дизъюнкции – «<b>v</b>», отрицания «<b>-</b>»;</li>
            <li>Пробелы ставить не нужно</li>
            <li>Пример: <b>(x1*x2)v(x2*-x3)</b></li>
          </ul>
          <CustomInput placeholder="Введите ДНФ" value={userInput} setValue={setUserInput} regex={/^[vx12345()\-* ]*$/} />
          <CustomButton onClick={handleClick}>Проверить</CustomButton>
        </>
      )}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 6">
      <p>
        <b>Дизъюнктивной нормальной формой</b> (ДНФ) называется дизъюнкция элементарных конъюнкций.
      </p>

      <p>
        <i>Элементарной конъюнкцией</i> называется выражение, представляющее собой конъюнкцию переменных и/или их отрицаний.
      </p>

      <p><b>Теорема:</b></p>
      <p>
        Любую булеву функцию f(x₁, ..., x<sub>n</sub>) можно представить в виде:<br/>
        f(x₁, ..., x<sub>i</sub>, ..., x<sub>n</sub>) = x<sub>i</sub> · f<sub>x<sub>i</sub>=1</sub>(x₁, ..., x<sub>n</sub>) ∨
        -x<sub>i</sub> · f<sub>x<sub>i</sub>=0</sub>(x₁, ..., x<sub>n</sub>)
      </p>

      <p><b>Теорема:</b></p>
      <p>
        Любую булеву функцию можно представить в виде:<br/>
        f(x₁, ..., x<sub>i₁</sub>, ..., x<sub>i<sub>k</sub></sub>, ..., x<sub>n</sub>) =
        ⋁<sub>(σ₁,...,σ<sub>k</sub>)∈E<sup>k</sup></sub>
        x<sub>i₁</sub><sup>σ₁</sup> · ... · x<sub>i<sub>k</sub></sub><sup>σ<sub>k</sub></sup> ·
        f(x₁, ..., σ₁, ..., σ<sub>k</sub>, ..., x<sub>n</sub>)
      </p>

      <p><b>Теорема:</b></p>
      <p>
        Булеву функцию f(x₁, ..., x<sub>n</sub>), которая хотя бы на одном наборе равна 1, можно представить в виде:
      </p>

      <p>
        ⋁<sub>f(σ₁,...,σ<sub>n</sub>)=1</sub>
        x₁<sup>σ₁</sup> · ... · x<sub>n</sub><sup>σ<sub>n</sub></sup>
      </p>

      <p><b>Теорема:</b></p>
      <p>
        Любую булеву функцию можно представить в дизъюнктивной нормальной форме.
      </p>
    </HintedTitle>
  )
}
