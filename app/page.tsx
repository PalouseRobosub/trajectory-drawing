'use client'

import {Canvas} from "@react-three/fiber";
import {Suspense, useRef} from "react";
import {OrbitControls, Text} from "@react-three/drei";
import Axis from "@/components/axis"
import * as THREE from "three";
import {useStateContext} from "@/components/context";
import Pool from "@/components/pool";
import Path from "@/components/path";
import SubController, {SubHandle} from "@/components/subController";

export default function Home() {

  // set vertical axis to z because i'm not insane
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const animRef = useRef<SubHandle>(null);
  const { state } = useStateContext();

  return (
    <div className="h-screen w-screen bg-neutral-300 fixed inset-0 z-0">
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
            <OrbitControls enabled={state.orbitEnabled} />
            <directionalLight intensity={0.5} position={[6, 2, 1]} />
            <ambientLight intensity={0.1} />
            <Axis poolDimensions={state.poolDimensions} />
            <Pool poolDimensions={state.poolDimensions} />
            <Path />
            <SubController
              ref={animRef}
              loop={true}
            />
          </Suspense>
        </Canvas>
    </div>
  );
}
