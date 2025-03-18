import { getProject } from '@theatre/core';
import '@theatre/core';

export default async function createSheet({state, preview}: {state: any, preview?: boolean}) {
  if (process.env.NODE_ENV === 'development' && !preview) {
    const { default: studio } = await import('@theatre/studio');
    const { default: extension } = await import('@theatre/r3f/dist/extension');

    studio.initialize();
    studio.extend(extension);
  }
  return getProject('Project', preview ? { state } : undefined).sheet('Sheet');
}
