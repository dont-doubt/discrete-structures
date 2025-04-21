import { cn } from '@/utils';
import { ClassName } from '@/utils/types';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

function DSMarquee({className, speed}: {speed: number} & ClassName) {
  return (
    <Marquee
      className={cn("w-full overflow-hidden", className)}
      speed={Math.abs(speed)}
      direction={speed < 0 ? "left" : "right"}
      gradient={false}
    >
      {Array.from({length: 10}, (_, index) => (
        <p key={index} className="pl-[0.2em]" style={{transform: `translate(${speed * 13}px, 0`}}>
          <span className="transition-colors hover:text-zinc-500/40">DISCRETE&nbsp;</span>
          <span className="transition-colors hover:text-emerald-500/40">STRUCTURES&nbsp;</span>
        </p>
      ))}
    </Marquee>
  )
}

export default function PreviewPage() {
  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-300">
      <div className="flex flex-col absolute mt-500 rotate-italic min-w-[120vw] w-full -translate-x-[10vw] text-[120px] leading-[0.8] tracking-tight font-black [--outline-width:1px] text-zinc-900 select-none max-lg:text-[80px] max-lg:mt-400">
        <DSMarquee speed={20} className="text-outline [--outline-color:var(--color-emerald-400)]" />
        <DSMarquee speed={25} className="text-outline [--outline-color:white] opacity-80" />
        <DSMarquee speed={28} className="text-outline [--outline-color:white] opacity-60" />
        <DSMarquee speed={30} className="text-outline [--outline-color:white] opacity-40" />
        <DSMarquee speed={31} className="text-outline [--outline-color:white] opacity-20" />
      </div>
      <div className="w-full flex justify-center">
        <div className="flex pt-200 gap-40 max-lg:flex-col max-lg:pt-100">
          <div className="flex flex-col w-max items-end text-end italic">
            <p className="text-8xl max-lg:text-5xl leading-[0.8] font-black rotate-italic text-emerald-500">Дискретные</p>
            <p className="text-8xl max-lg:text-5xl leading-[0.8] font-black rotate-italic text-white">Структуры</p>
            <p className="text-4xl max-lg:text-xl mt-17 font-medium leading-none rotate-italic text-zinc-300">Проект с реальной<br />перспективой</p>
          </div>
          <div className="flex flex-col -translate-y-30 gap-10 rotate-[-4.5deg] italic max-lg:rotate-italic max-lg:mt-20">
            <Link className="flex justify-center items-center rounded-xl transition-colors text-white font-bold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 shadow-xl shadow-emerald-500/20 px-30 py-10" href="/boolean-functions">
              Открыть булевы функции
            </Link>
            <Link className="flex justify-center items-center rounded-xl transition-colors text-white font-bold bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 shadow-xl shadow-indigo-500/20 px-30 py-10" href="/graphs">
              Открыть графы
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}