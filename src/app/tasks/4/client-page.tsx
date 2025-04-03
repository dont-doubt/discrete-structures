'use client'

import { useState } from 'react';
import { randomInt, safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import { Selectable } from '@/components/selectable';
import { functionNames } from '@/tasks/task4';
import { toast } from 'sonner';

export default function Task4Form() {
  const [vector, setVector] = useState<number>();
  const [selected, setSelected] = useState<number>();

  const handleGenerate = safe(() => {
    setVector(randomInt(0, 15));
    setSelected(undefined);
  });

  const handleClick = safe(() => {
    if (selected === undefined) throw new Error('Выберите название функции');
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
      <h1>Задание 4</h1>
      <h2>Система предлагает вектор булевой функции от 2 аргументов, пользователь выбирает имя функции</h2>
      <CustomButton onClick={handleGenerate}>Начать</CustomButton>

      {vector !== undefined && (
        <>
          <h4 className="!pt-20">Выберите тип вектора булевой функции:</h4>
          <pre>{Object.keys(functionNames)[vector]}</pre>
          <div className="flex flex-col gap-y-4 my-10">
            {Array.from({length: 16}).map((_, i) => (
              <Selectable
                key={i}
                value={selected === i}
                setValue={() => setSelected(i)}
              >
                {Object.values(functionNames)[i][1]}
              </Selectable>
            ))}
          </div>
          <CustomButton onClick={handleClick}>Проверить</CustomButton>
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
