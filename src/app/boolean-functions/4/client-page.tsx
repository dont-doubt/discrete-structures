'use client'

import { useState } from 'react';
import { randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { Selectable } from '@/components/selectable';
import { functionNames } from '@/tasks/task4';
import { toast } from 'sonner';
import HintedTitle from '@/components/hintedTitle';

export default function Task4Form() {
  const [vector, setVector] = useState<number>();
  const [selected, setSelected] = useState<number>();
  const [answered, setAnswered] = useState(false);

  const handleGenerate = safe(() => {
    setVector(randomInt(0, 15));
    setSelected(undefined);
    setAnswered(false);
  });

  const handleClick = safe(() => {
    if (selected === undefined) throw new Error('Выберите название функции');
    setAnswered(true);
    if (selected === vector) {
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
      <h2>Система предлагает вектор булевой функции от 2 аргументов, пользователь выбирает имя функции</h2>
      <CustomButton onClick={handleGenerate}>Начать</CustomButton>

      {vector !== undefined && (
        <>
          <h4 className="!pt-20">Выберите имя вектора булевой функции:</h4>
          <pre>{Object.keys(functionNames)[vector]}</pre>
          <div className="flex flex-col gap-y-4 my-10">
            {Array.from({length: 16}).map((_, i) => (
              <Selectable
                key={i}
                value={selected === i}
                setValue={() => setSelected(i)}
                disabled={answered}
                correct={answered ? vector === i ? true : selected === i ? false : undefined : undefined}
              >
                {Object.values(functionNames)[i][1]}
              </Selectable>
            ))}
          </div>
          <CustomButton onClick={handleClick} disabled={answered}>Проверить</CustomButton>
        </>
      )}

      {/*Пользователь должен выбрать одно «имя».
      Программа должна вывести «Правильно!» или «Неправильно» (можно и как-то по-другому).
      Думаю, на данной странице справку можно не делать.*/}

      {/*-	Поле с описанием задания «Выберите имя функции от 2-х аргументов»;
      -	Поле с вектором булевой функции от 2-х аргументов;
      -	16 блоков (кнопок) с именами (нужно сделать так, чтобы при нажатии на одну кнопку она выделялась, но если пользователь решит нажать на другую кнопку, то первая должна перестать выделяться);
      -	Кнопка «Проверить» или «Назад» и «Далее» (если будет несколько раундов и тогда на последнем раунде вместо «Далее» сделаем «Завершить»);
      -	Кнопка «Начать заново»;
      -	Кнопка «На главную страницу» (или «Назад», либо сделать в виде стрелочки);*/}

      {/*Здесь можно сделать несколько раундов (допустим 5) и вести счёт правильных ответов.
      В конце раунда нужно вывести окно с количеством правильных ответов, рядом можно сделать кнопки «На главную», «Начать заново» и «Показать ответы», при нажатии на кнопку «Показать ответы» появится три столбца, в первом будет функция, во втором ответ пользователя – выделить неправильные ответы пользователя красным, а верные – зеленым. В третьем столбце написать правильные ответы.*/}
    </>
  )
}

function Title() {
  return (
    <HintedTitle title="Задание 4">
      <p>У каждой булевой функции от 2-х аргументов есть свое «имя». Постарайтесь их запомнить.</p>

      <table className="**:text-center border border-black">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th>f<sub>n</sub></th>
          <th>Вектор</th>
          <th>Имя / выражение</th>
        </tr>
        </thead>
        <tbody>
        <tr><td>f1</td><td>(0000)</td><td>константа 0</td></tr>
        <tr><td>f2</td><td>(0001)</td><td>конъюнкция (x · y = x&amp;y)</td></tr>
        <tr><td>f3</td><td>(0010)</td><td>компликация (x ⊅ y)</td></tr>
        <tr><td>f4</td><td>(0011)</td><td>функция-переменная (первый аргумент)</td></tr>
        <tr><td>f5</td><td>(0100)</td><td>обратная компликация (x ⊄ y)</td></tr>
        <tr><td>f6</td><td>(0101)</td><td>функция-переменная (второй аргумент)</td></tr>
        <tr><td>f7</td><td>(0110)</td><td>сложение по модулю 2 (x ⊕ y)</td></tr>
        <tr><td>f8</td><td>(0111)</td><td>дизъюнкция (x ∨ y)</td></tr>
        <tr><td>f9</td><td>(1000)</td><td>стрелка (Пирса) (x ↑ y)</td></tr>
        <tr><td>f10</td><td>(1001)</td><td>эквивалентность (x ↔ y)</td></tr>
        <tr><td>f11</td><td>(1010)</td><td>функция-отрицания (второй аргумент)</td></tr>
        <tr><td>f12</td><td>(1011)</td><td>обратная импликация (x ← y)</td></tr>
        <tr><td>f13</td><td>(1100)</td><td>функция-отрицания (первый аргумент)</td></tr>
        <tr><td>f14</td><td>(1101)</td><td>импликация (x → y)</td></tr>
        <tr><td>f15</td><td>(1110)</td><td>штрих (Шеффера) (x | y)</td></tr>
        <tr><td>f16</td><td>(1111)</td><td>константа 1</td></tr>
        </tbody>
      </table>
    </HintedTitle>
  )
}
