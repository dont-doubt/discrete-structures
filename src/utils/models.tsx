import { useFBX, useGLTF } from "@react-three/drei";

export function CliffModel() {
  const fbx = useFBX("/models/fantasy_cliff.fbx");

  return <primitive object={fbx} scale={0.01} />
}

export function MtModel() {
  const fbx = useGLTF("/models/mt.gltf");

  return <primitive object={fbx} scale={0.01} />
}
