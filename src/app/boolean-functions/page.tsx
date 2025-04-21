import Link from "next/link"

const tasks = {
  1: 'Булева функция от n аргументов',
  2: 'Получение остаточной функции',
  3: 'Получение функции от остаточных',
  4: 'Имя функции от 2-х аргументов',
  5: 'Фиктивные и существенные аргументы',
  6: 'ДНФ функции',
  7: 'КНФ функции',
  8: 'Получение СДНФ',
  9: 'Получение СКНФ',
  10: 'Выбор предполных классов',
  11: 'Полнота системы булевых функций',
  12: 'Получение минимальной ДНФ',
}

function TaskLink({id, name}: {id: number, name: string}) {
  return (
    <h3 className="!mt-0">
      Задание {id} -&nbsp;
      <Link href={`/boolean-functions/${id}`} className="no-underline hover:underline text-emerald-500">
        {name}
      </Link>
    </h3>
  )
}

export default function Page() {
  return (
    <>
      <h1>Булевы функции</h1>
      <h2>В данном разделе вы сможете изучить и закрепить:</h2>
      <blockquote>
        <ul>
          <li>Что такое булева функция и как её построить;</li>
          <li>Остаточные булевой функции;</li>
          <li>Имена булевых функций от 2-х аргументов;</li>
          <li>ДНФ, КНФ, СДНФ, СКНФ, минимальная ДНФ;</li>
          <li>Фиктивные и существенные переменные;</li>
          <li>Предполные классы;</li>
          <li>Полнота множества булевых функций.</li>
        </ul>
      </blockquote>
      {Object.entries(tasks).map(([id, name], index) => (
        <TaskLink key={index} id={parseInt(id)} name={name} />
      ))}
    </>
  )
}
