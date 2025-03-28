'use client'

import { Children, Setter } from '@/utils/types';
import Link from 'next/link';
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';

function NavLink({href, children, isSelected, onClick}: {
  href: string,
  isSelected: boolean,
  onClick: () => void,
} & Children) {
  return (
    <Link href={href} className={cn("py-5 pl-16 w-full border-l-1 border-zinc-800 text-zinc-400 transition-all duration-200 hover:bg-zinc-800", isSelected ? "text-white border-emerald-600 bg-zinc-800/30 border-l-2 hover:bg-zinc-700" : "hover:border-emerald-400 hover:text-white")} onClick={onClick}>
      {children}
    </Link>
  )
}

function NavContainer({title, children}: {title: string} & Children) {
  return (
    <div className="flex flex-col w-full">
      <p className="text-white text-sm">{title}</p>
      <div className="my-8 ml-8 flex flex-col w-full">
        {children}
      </div>
    </div>
  )
}

function Navigation({selected, setSelected, setHidden}: {
  selected: string,
  setSelected: Setter<string>,
  setHidden: Setter<boolean>,
}) {
  return (
    <nav className="flex flex-col mt-100">
      <NavContainer title="Задания">
        {Array.from({length: 12}, (_, i) => [i, `/tasks/${i + 1}`] as const).map(([i, path]) => (
          <NavLink
            href={path}
            key={path}
            isSelected={path === selected}
            onClick={() => {
              setHidden(true);
              setSelected(path);
            }}
          >
            Задание {i + 1}
          </NavLink>
        ))}
      </NavContainer>
    </nav>
  )
}

function Main({selected, hidden, children}: {selected: string, hidden: boolean} & Children) {
  return (
    <div className="flex flex-col w-full relative pb-300">
      <div className="absolute inset-x-0 top-0 h-screen bg-gradient-to-b from-emerald-400/[2%] via-50% via-indigo-800/[2%] to-black/0" />
      <motion.main
        key={selected}
        initial={{ opacity: 1 }}
        animate={{ opacity: hidden ? 0.4 : 1 }}
        transition={{ duration: 0.3, ease: 'circInOut' }}
        className="flex flex-col min-w-700 mx-auto mt-100 prose prose-invert prose-slate"
      >
        {children}
      </motion.main>
    </div>
  )
}

export default function TaskLayout({children}: Children) {
  const [selected, setSelected] = useState('');
  const [hidden, setHidden] = useState(true);
  const path = usePathname();
  useLayoutEffect(() => {
    setSelected(path);
    setHidden(false);
  }, [path]);

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex">
      <div className="border-r-1 border-white/10 min-w-330">
        <div className="flex flex-col w-full h-screen fixed max-w-330 px-24">
          <Link className="h-56 flex items-center transition-opacity opacity-80 hover:opacity-100 gap-6" href="/">
            <Logo className="text-emerald-200 size-30" />
            <p className="text-zinc-400 font-medium tracking-wide">Дискретные структуры</p>
          </Link>
          <Navigation selected={selected} setSelected={setSelected} setHidden={setHidden} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="h-56 border-b-1 border-white/5 w-full flex justify-between px-32 backdrop-blur-sm fixed z-10 bg-zinc-900/20">
          <div className="flex"></div>
          <div className="flex gap-32"></div>
        </div>
        <Main selected={selected} hidden={hidden}>{children}</Main>
      </div>
    </div>
  )
}
