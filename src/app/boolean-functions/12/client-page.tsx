'use client'

import { useState } from 'react';
import { safe } from '@/utils';
import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import Results from '@/components/results';
import { solveTask12 } from '@/tasks/task12';
import HintedTitle from '@/components/hintedTitle';

export default function Task12Form() {
  const [vector, setVector] = useState('');
  const [result, setResult] = useState<string>();

  const handleClick = safe(async () => {
    setResult(solveTask12(vector));
  });

  return (
    <>
      <Title />
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

function Title() {
  return (
    <HintedTitle title="Задание 12">
      <p>
        <b>Минимальная ДНФ</b> — ДНФ, в которой содержится минимальное количество вхождений переменных.
      </p>

      <p>
        Чтобы найти минимальную ДНФ, можно воспользоваться методом Квайна — Мак-Класки.
      </p>

      <p>
        Для наглядности возьмем в пример функцию (10110011).
      </p>

      <p><b>Алгоритм:</b></p>
      <p>1. Берём все двоичные наборы, на которых функция принимает значение 1:</p>

      <table className="**:text-center">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th>x1</th>
          <th>x2</th>
          <th>x3</th>
          <th>f(x1, x2, x3)</th>
        </tr>
        </thead>
        <tbody>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>0</td><td>0</td><td>0</td><td>1</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>0</td><td>0</td><td>1</td><td>0</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>0</td><td>1</td><td>0</td><td>1</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>0</td><td>1</td><td>1</td><td>1</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>1</td><td>0</td><td>0</td><td>0</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>1</td><td>0</td><td>1</td><td>0</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>1</td><td>1</td><td>0</td><td>1</td></tr>
        <tr className="bg-pink-100 dark:bg-pink-900"><td>1</td><td>1</td><td>1</td><td>1</td></tr>
        </tbody>
      </table>

      <p><b>2.</b> Разбиваем двоичные наборы на группы по весу (вес — количество единиц):</p>
      <ul>
        <li>1: (000);</li>
        <li>2: (010);</li>
        <li>3: (011), (110);</li>
        <li>4: (111).</li>
      </ul>

      <p><b>3.</b> Склеиваем соседние наборы (которые отличаются только одним символом);</p>
      <p>
        Склеивание будет происходить между элементами соседних групп. В месте, где наборы отличаются, ставится «-».
      </p>
      <p>
        000 и 010 = 0-0<br/>
        010 и 011 = 01-<br/>
        010 и 110 = -10<br/>
        011 и 111 = -11<br/>
        110 и 111 = 11-
      </p>

      <p><b>4.</b> Разбиваем склейки на группы в зависимости от положения «-»:</p>
      <ul>
        <li>1: -10, -11;</li>
        <li>2: 0-0;</li>
        <li>3: 01-, 11-.</li>
      </ul>

      <p><b>5.</b> Склеиваем склейки:</p>
      <p>
        В этом случае склеивание происходит между элементами одной группы. Если получили две и более одинаковые склейки, то берется только одна из них. Процесс склеивания должен повторяться пока это возможно.
      </p>
      <p>
        -10 и -11 = -1-<br/>
        0-0 — не склеивается ни с каким набором (просто закидываем в результат)<br/>
        01- и 11- = -1-
      </p>
      <p>Получаем: 0-0, -1-</p>

      <p><b>6.</b> Строим таблицу из всех наборов из пункта 1 и полученных склеек. Отмечаем, каким склейкам соответствуют двоичные наборы:</p>
      <table className="**:text-center">
        <thead className="bg-zinc-100 dark:bg-zinc-900">
        <tr>
          <th></th>
          <th>000</th>
          <th className="bg-red-300 dark:bg-red-800">010</th>
          <th className="bg-red-200 dark:bg-red-700">011</th>
          <th className="bg-red-300 dark:bg-red-800">110</th>
          <th className="bg-red-200 dark:bg-red-700">111</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="text-red-600 font-bold">-1-</td>
          <td></td>
          <td className="bg-red-300 dark:bg-red-800">+</td>
          <td className="bg-red-200 dark:bg-red-700">+</td>
          <td className="bg-red-300 dark:bg-red-800">+</td>
          <td className="bg-red-200 dark:bg-red-700">+</td>
        </tr>
        <tr>
          <td className="text-blue-600 font-bold">0-0</td>
          <td>+</td>
          <td className="bg-red-300 dark:bg-red-800"></td>
          <td className="bg-red-200 dark:bg-red-700"></td>
          <td className="bg-red-300 dark:bg-red-800"></td>
          <td className="bg-red-200 dark:bg-red-700"></td>
        </tr>
        </tbody>
      </table>

      <p><b>7.</b> Находим минимальное покрытие (минимальное количество склеек, покрывающих все наборы);</p>
      <p>
        <b>-1-</b> покрывает 010, 011, 110, 111<br/>
        <b>0-0</b> покрывает 000, 110
      </p>

      <p><b>8.</b> Записываем минимальное покрытие в виде ДНФ:</p>
      <p>
        (x<sub>2</sub>) ∨ (¬x<sub>1</sub> * ¬x<sub>3</sub>) — минимальная ДНФ для (10110011).
      </p>
    </HintedTitle>
  )
}
