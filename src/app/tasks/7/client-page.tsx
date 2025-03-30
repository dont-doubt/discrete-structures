'use client'

import { useState } from 'react';
import { parseVector, randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { solveTask1 } from '@/tasks/task1';
import { toast } from 'sonner';
import CustomInput from '@/components/custom-input';
import { solveTask7 } from '@/tasks/task7';

export default function Task7Form() {
  const [vector, setVector] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleGenerate = safe(() => {
    setVector(solveTask1(randomInt(2, 5)));
    setUserInput('');
  });

  const handleClick = safe(() => {
    const result = solveTask7(parseVector(vector), userInput);
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
      <h1>Задание 7</h1>
      <h2>Система предлагает рандомный вектор булевой функции от n аргументов. Пользователь вводит КНФ</h2>
      <CustomButton onClick={handleGenerate}>Начать</CustomButton>
      {vector && (
        <>
          <h2 className="!pt-100">Введите КНФ по вектору:</h2>
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
