'use client'

import { useAsync } from 'react-use';
import createSheet from '@/utils/create-sheet';
import state from '@/app/state.json';
import { DefaultScene } from '@/app/dev/page';
import { useEffect } from 'react';

export default function PreviewPage() {
  const { value: sheet } = useAsync(() => createSheet({ state, preview: true }), []);

  useEffect(() => {
    if (sheet) {
      sheet.project.ready.then(() => {
        sheet.sequence.play({iterationCount: Infinity, range: [0, 1]});
        // sheet.sequence.play();
      });
    }
  }, [sheet]);

  return sheet && <DefaultScene sheet={sheet} preview />
}