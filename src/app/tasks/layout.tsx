'use client'

import { Children, Setter, StateSetter } from '@/utils/types';
import Link from 'next/link';
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';

function NavLink({href, children, isSelected, onClick}: {
  href: string,
  isSelected: boolean,
  onClick: () => void,
} & Children) {
  return (
    <Link
      href={href}
      className={cn(
        "py-5 pl-16 w-full border-l-1 border-zinc-800 text-zinc-400 transition-all duration-200 hover:bg-zinc-800",
        isSelected ? "text-white border-emerald-600 bg-zinc-800/30 border-l-2 hover:bg-zinc-700 max-lg:bg-white/5" : "hover:border-emerald-400 hover:text-white max-lg:!border-transparent"
      )}
      onClick={onClick}
      scroll
    >
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

function Navigation({selected, setSelected, setHidden, setMenuOpen}: {
  selected: string,
  setSelected: Setter<string>,
  setHidden: Setter<boolean>,
  setMenuOpen: Setter<boolean>,
}) {
  return (
    <nav className="flex flex-col mt-100 max-lg:mt-20">
      <NavContainer title="Задания">
        {Array.from({length: 12}, (_, i) => [i, `/tasks/${i + 1}`] as const).map(([i, path]) => (
          <NavLink
            href={path}
            key={path}
            isSelected={path === selected}
            onClick={() => {
              setMenuOpen(false);
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
    <div className="flex flex-col w-full relative pb-300 max-lg:pb-100">
      <div className="absolute inset-x-0 top-0 h-screen bg-gradient-to-b from-emerald-400/[8%] from-10% via-60% via-indigo-950/[8%] to-zinc-900/[8%] to-80% pointer-events-none" />
      <motion.main
        key={selected}
        initial={{ opacity: 1 }}
        animate={{ opacity: hidden ? 0.4 : 1 }}
        transition={{ duration: 0.3, ease: 'circInOut' }}
        className="flex flex-col min-w-700 mx-auto mt-170 prose prose-invert prose-slate max-lg:min-w-0 max-lg:px-30 z-10 max-lg:prose-lg max-lg:text-wrap"
      >
        {children}
      </motion.main>
    </div>
  )
}

function MenuButton({menuOpen, setMenuOpen}: {
  menuOpen: boolean,
  setMenuOpen: StateSetter<boolean>,
}) {
  return (
    <button
      className="lg:hidden flex justify-center items-center size-40 rounded-lg transition-colors hover:bg-white/5 active:bg-white/5 text-white/90 outline-none cursor-pointer"
      onClick={() => setMenuOpen((v) => !v)}
    >
      {menuOpen ? (
        <XIcon className="text-white" />
      ) : (
        <MenuIcon className="text-white" />
      )}
    </button>
  )
}

export default function TaskLayout({children}: Children) {
  const [selected, setSelected] = useState('');
  const [hidden, setHidden] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  useLayoutEffect(() => {
    setSelected(path);
    setHidden(false);
  }, [path]);

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex">
      <div className={cn("border-r-1 border-white/10 min-w-330 max-lg:min-w-0 max-lg:opacity-0 max-lg:z-20 transition-[opacity]", menuOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none")}>
        <div className="flex flex-col h-screen fixed w-330 max-w-330 px-24 max-lg:pt-60 max-lg:backdrop-blur-2xl bg-black-900/40 max-lg:max-w-none max-lg:w-screen">
          <Link className="h-56 flex items-center transition-opacity opacity-80 hover:opacity-100 gap-6" href="/" onClick={() => setMenuOpen(false)} scroll>
            <Logo className="text-emerald-200 size-30" />
            <p className="text-zinc-400 font-medium tracking-wide">Дискретные структуры</p>
          </Link>
          <Navigation selected={selected} setSelected={setSelected} setHidden={setHidden} setMenuOpen={setMenuOpen} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="h-56 border-b-1 border-white/5 w-full flex justify-between px-16 backdrop-blur-sm fixed z-30 bg-zinc-900/20">
          <div className="flex h-full items-center">
            <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
          <div></div>
        </div>
        <Main selected={selected} hidden={hidden}>{children}</Main>
      </div>
    </div>
  )
}
