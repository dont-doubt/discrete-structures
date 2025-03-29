import { twMerge } from 'tailwind-merge';
import clsx, { ClassArray } from 'clsx';
import { toast } from 'sonner';

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(inputs));
}

export function safe(fn: () => void): () => void {
  return () => {
    try {
      fn();
    } catch (e: any) {
      toast.error(e?.message || 'Произошла неизвестная ошибка');
    }
  }
}

export function stringifyVector(vector: (boolean | number)[]): string {
  return vector.map((v) => v ? 1 : 0).join('');
}

export function parseVector(vector: string): number[] {
  return vector.split('').map((v) => v === '1' ? 1 : 0);
}
