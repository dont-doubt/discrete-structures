import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Setter } from '@/utils/types';

export default function CustomInput({label, className, type = "text", setValue, value, regex, ...props}: {
  label?: string,
  setValue?: Setter<string>,
  regex?: RegExp
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn("px-14 py-8 text-black dark:text-white border border-emerald-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm shadow-md shadow-emerald-500/20", className)}
      onChange={setValue ? (e) => {
        const v = e.target.value;
        if (!regex || regex.test(v)) setValue(e.target.value)
      } : undefined}
      value={value ?? ''}
      {...props}
    />
  )
}
