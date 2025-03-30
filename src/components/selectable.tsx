import { ChildrenClassName, Setter } from '@/utils/types';
import { cn } from '@/utils';

export function Selectable({value, setValue, children, className}: {
  value: boolean,
  setValue: Setter<boolean>,
} & ChildrenClassName) {
  return (
    <button
      className={cn("rounded-xl border border-emerald-500 transition-colors px-20 py-2 cursor-pointer outline-none hover:bg-emerald-800", value && "bg-emerald-500 hover:bg-emerald-600", className)}
      onClick={() => setValue(!value)}
    >
      {children}
    </button>
  )
}