import { twMerge } from 'tailwind-merge';
import clsx, { ClassArray } from 'clsx';
import { toast } from 'sonner';
import { Promisable } from '@/utils/types';

export function cn(...inputs: ClassArray) {
  return twMerge(clsx(inputs));
}

export function safe(fn: () => Promisable<void>): () => Promise<void> {
  return async () => {
    try {
      await fn();
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

export function randomInt(min: number, max: number) {
  if (min == max) return min;
  if (min > max) [min, max] = [max, min];
  return ~~(min + (max - min + 1) * Math.random());
}
