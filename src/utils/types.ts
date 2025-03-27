import { ReactNode } from 'react';

// T :: Promise<T> | T
export type Promisable<T> = Promise<T> | T;

// T | undefined :: T
export type NonUndefined<T> = T extends undefined ? never : T;

// T, N :: [T, T, ..., T] length = N
export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

// T :: (T) => void
export type Setter<T> = (value: T) => void;

// T :: (T | ((T) => T)) => void
export type StateSetter<T> = Setter<T | ((prev: T) => T)>;

// T :: T | T[]
export type SingleOrArray<T> = T[] | T;

// {a}, {b} :: only properties of either {a} or {b}
export type Either<T, U> = Only<T, U> | Only<U, T>
type Only<T, U> = { [P in keyof T]: T[P] } & { [P in keyof U]?: never };

// {a}, {b} :: properties of either {a} or {b} or both
export type LeastOne<T, U> = Either<T, U> | T & U;

// 'a' | 'b' :: string with IDE autocompletion of 'a' and 'b'
export type StringAutocomplete<T> = T | string & {};

// T[] :: T
export type UnpackedArray<T> = T extends (infer U)[] ? U : T;

// {a?}, 'a' :: {a}
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

// React types of { children }, { className }
export type Children = { readonly children?: ReactNode }
export type ChildrenString = { readonly children: string }
export type ChildrenOptString = { readonly children?: string }
export type ClassName = { readonly className?: string }
export type ChildrenClassName = Children & ClassName;

// T :: Awaited<ReturnType<T>>
export type AwaitedReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

// {T} :: {T | null | undefined}
export type Nullish<T> = { [K in keyof T]: T[K] | null | undefined };

export type E = 0 | 1;
