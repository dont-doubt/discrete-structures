import { ChildrenClassName } from "@/utils/types";
import { cn } from '@/utils';

export default function CustomButton({children, className, disabled, onClick}: {
  disabled?: boolean,
  onClick?: () => void,
} & ChildrenClassName) {
  return (
    <button
      className={cn(
        "bg-emerald-600 px-20 py-6 flex items-center justify-center text-center text-nowrap rounded-xl transition-colors hover:bg-emerald-500 active:bg-emerald-600 shadow-lg shadow-emerald-500/20 cursor-pointer outline-none [.prose_&]:mt-20",
        disabled && "opacity-50",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
