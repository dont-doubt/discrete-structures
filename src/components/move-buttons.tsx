import { cn } from "@/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from 'next/link';

function MoveButton({to, prev = false}: {to: number, prev?: boolean}) {
  const enabled = to >= 1 && to <= 12;
  if (!enabled) return <div />

  const ChevronIcon = prev ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <Link className={cn("flex no-underline gap-10 transition-all duration-300 opacity-60 hover:opacity-100 active:opacity-100 mx-10 max-lg:mx-2 text-wrap",
      prev ? 'flex-row-reverse hover:-translate-x-4 active:-translate-x-4 max-lg:hover:-translate-x-3 max-lg:active:-translate-x-3'
        : 'hover:translate-x-4 text-end active:translate-x-4 max-lg:hover:translate-x-3 max-lg:active:translate-x-3')} href={`/boolean-functions/${to}`}>
      <div className={cn("w-full flex flex-col items-center", prev ? 'items-start' : 'items-end')}>
        <p className="!my-0 text-black dark:text-white text-lg">Задание {to}</p>
        <p className="!my-0 text-zinc-400 dark:text-zinc-500 text-sm leading-[1.2]">{prev ? 'Предыдущее задание' : 'Следующее задание'}</p>
      </div>
      <div className="h-full flex flex-col justify-center text-black dark:text-white">
        <ChevronIcon size={20} />
      </div>
    </Link>
  )
}

export default function MoveButtons({taskID}: {taskID: number}) {
  return (
    <div className="flex w-full mt-100 justify-between">
      <MoveButton to={taskID - 1} prev />
      <MoveButton to={taskID + 1} />
    </div>
  )
}