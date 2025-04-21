'use client'

import { Children, Setter, StateSetter } from '@/utils/types';
import Link from 'next/link';
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

function NavLink({href, children, isSelected, onClick}: {
  href: string,
  isSelected: boolean,
  onClick: () => void,
} & Children) {
  return (
    <Link
      href={href}
      className={cn(
        "py-5 pl-16 w-full border-l-1 transition-all duration-200",
        {
          "border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-400/40 dark:hover:bg-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-black dark:hover:text-white max-lg:!border-transparent": !isSelected,
          "text-black dark:text-white border-emerald-500 dark:border-emerald-600 bg-black/5 dark:bg-white/5 border-l-2 hover:bg-zinc-400/50 dark:hover:bg-zinc-700": isSelected,
        }
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
      <p className="text-black dark:text-white text-sm">{title}</p>
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
        {Array.from({length: 12}, (_, i) => [i, `/boolean-functions/${i + 1}`] as const).map(([i, path]) => (
          <NavLink
            href={path}
            key={path}
            isSelected={path === selected}
            onClick={() => {
              if (path !== selected) {
                setMenuOpen(false);
                setHidden(true);
                setSelected(path);
              }
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
      <div className="absolute inset-x-0 top-0 h-screen bg-gradient-to-b from-emerald-400/[8%] from-10% via-60% via-indigo-400/[3%] dark:via-indigo-950/[8%] to-zinc-200/[8%] dark:to-zinc-900/[8%] to-80% pointer-events-none" />
      <motion.main
        key={selected}
        initial={{ opacity: 1 }}
        animate={{ opacity: hidden ? 0.4 : 1 }}
        transition={{ duration: 0.3, ease: 'circInOut' }}
        className="flex flex-col min-w-700 mx-auto mt-170 prose dark:prose-invert prose-slate max-lg:min-w-0 max-lg:px-30 z-10 max-lg:prose-sm max-lg:[&_*]:text-wrap max-lg:max-w-screen not-dark:[--tw-prose-quote-borders:#0001]"
      >
        {children}
      </motion.main>
    </div>
  )
}

function ThemeSwitch() {
  const { setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme((theme) => theme === 'light' ? 'dark' : 'light')}
      className="flex justify-center items-center size-40 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/5 dark:active:bg-white/5 text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80 active:text-black/80 dark:active:text-white/80 outline-none cursor-pointer"
    >
      {/* Hydration warning appears when switching conditionally */}
      <SunIcon size={22} className="dark:hidden" />
      <MoonIcon size={22} className="not-dark:hidden" />
    </button>
  )
}

function MenuButton({menuOpen, setMenuOpen}: {
  menuOpen: boolean,
  setMenuOpen: StateSetter<boolean>,
}) {
  return (
    <button
      className="lg:hidden flex justify-center items-center size-40 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/5 dark:active:bg-white/5 text-black/70 dark:text-white/90 outline-none cursor-pointer"
      onClick={() => setMenuOpen((v) => !v)}
    >
      {menuOpen ? <XIcon /> : <MenuIcon />}
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
    <div className="w-full min-h-screen text-white flex bg-zinc-200 dark:bg-zinc-900">
      {/* Navigation Panel */}
      <div className={cn("border-r-1 border-black/10 dark:border-white/10 min-w-330 max-lg:min-w-0 max-lg:opacity-0 max-lg:z-20 transition-[opacity]", menuOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none")}>
        <div className="flex flex-col h-screen fixed w-330 max-w-330 px-24 max-lg:pt-60 max-lg:backdrop-blur-2xl max-lg:max-w-none max-lg:w-screen">
          <Link className="h-56 flex items-center transition-opacity opacity-80 hover:opacity-100 gap-6" href="/" onClick={() => setMenuOpen(false)} scroll>
            <Logo className="text-emerald-700 dark:text-emerald-200 size-30" />
            <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">Дискретные структуры</p>
          </Link>
          <Navigation selected={selected} setSelected={setSelected} setHidden={setHidden} setMenuOpen={setMenuOpen} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        {/* Top Bar */}
        <div className="h-56 border-b-1 border-black/5 dark:border-white/5 w-screen lg:max-w-[calc(100vw-330px)] flex justify-between px-16 backdrop-blur-sm fixed z-30 bg-zinc-100/20 dark:bg-zinc-900/20">
          <div className="flex h-full items-center">
            <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
          <div className="flex h-full items-center gap-10">
            <Link className="font-medium tracking-wide text-black/40 dark:text-white/40 transition-colors hover:text-black/80 dark:hover:text-white/80" href="/boolean-functions">Булевы функции</Link>
            <ThemeSwitch />
          </div>
        </div>
        {/* Main Panel */}
        <Main selected={selected} hidden={hidden}>{children}</Main>
      </div>
    </div>
  )
}
