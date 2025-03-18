'use client'

import { Canvas } from '@react-three/fiber';
import { editable as e, PerspectiveCamera, SheetProvider } from '@theatre/r3f';
import state from '@/app/state.json';
import createSheet from '@/utils/create-sheet';
import { Environment, Sky } from '@react-three/drei';
import { useAsync } from 'react-use';
import { ISheet } from '@theatre/core';

function Scene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />
      {/*<ambientLight />*/}
      {/*<e.pointLight theatreKey="Light" position={[10, 10, 10]} />*/}
      {/*<MtModel />*/}
      <e.mesh theatreKey="Mesh">
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
    </>
  )
}

export function DefaultScene({sheet, preview}: {sheet: ISheet, preview: boolean}) {
  return (
    <Canvas>
      <SheetProvider sheet={sheet}>
        <Scene />
      </SheetProvider>
    </Canvas>
  )
}

export default function HomePage() {
  const { value: sheet } = useAsync(() => createSheet({ state, preview: false }), []);
  return sheet && <DefaultScene sheet={sheet} preview={false} />
}

