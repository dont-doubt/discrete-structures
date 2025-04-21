import { ChildrenClassName, Setter } from '@/utils/types';
import { cn } from '@/utils';

export function Selectable({value, setValue, disabled, children, className, correct}: {
  value: boolean,
  setValue: Setter<boolean>,
  disabled?: boolean,
  correct?: boolean
} & ChildrenClassName) {
  return (
    <button
      // className={cn("rounded-xl border border-emerald-500 transition-colors px-20 py-2 cursor-pointer outline-none hover:bg-emerald-800", value && "bg-emerald-500 hover:bg-emerald-600 font-medium text-white", className)}
      // className={cn("rounded-xl transition-all duration-300 px-20 py-2 cursor-pointer outline-none bg-emerald-500/[8%] font-medium text-black dark:text-white opacity-50 border-1 border-emerald-400", value ? "bg-emerald-500 opacity-100 border-transparent" : "hover:opacity-100", className)}
      className={cn("rounded-xl transition-all duration-300 px-20 py-2 cursor-pointer outline-none bg-zinc-500/[8%] text-zinc-700 dark:text-white opacity-50 border-2", {
        "border-zinc-400": correct === undefined,
        "bg-black/15 dark:bg-white/30 opacity-90 border-black/30 dark:border-white/30": value,
        "hover:opacity-100": !value && !disabled,
        "!bg-red-500 !border-red-500 text-white": correct === false,
        "!bg-emerald-500 !border-emerald-500 text-white": correct === true,
      }, className)}
      disabled={disabled}
      onClick={() => setValue(!value)}
    >
      {children}
    </button>
  )
}