'use client'

import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {OrbitControls, Text} from "@react-three/drei";
import Axis from "@/components/axis"
import * as THREE from "three";
import {useStateContext} from "@/components/context";
import Pool from "@/components/pool";

export default function Home() {

  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const {state} = useStateContext();

  return (
    <div className="h-screen w-screen bg-neutral-400 fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Suspense
          fallback={
            <Text
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Loading
            </Text>
          }
        >
          <OrbitControls />
          <directionalLight intensity={0.5} position={[6, 2, 1]} />
          <ambientLight intensity={0.1} />
          <Axis poolDimensions={state.poolDimensions} />
          <Pool size={state.poolDimensions} />
        </Suspense>
      </Canvas>
    </div>
  );
}
