'use server'

import { solveTask12 } from '@/tasks/task12';

export async function solveTask12OnServer(vector: string): Promise<string | {error: string}> {
  try {
    return solveTask12(vector);
  } catch (e: any) {
    return {error: e?.message ?? ''};
  }
}