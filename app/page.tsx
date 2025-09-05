'use client'

import {Canvas} from "@react-three/fiber";
import {Suspense, useMemo, useRef} from "react";
import {CameraControls, KeyboardControls, KeyboardControlsEntry, OrbitControls, Text} from "@react-three/drei";
import Axis from "@/components/axis"
import * as THREE from "three";
import {useStateContext} from "@/components/context";
import Pool from "@/components/pool";
import Path from "@/components/path";
import {CameraFlyKeyboard} from "@/components/cameraFlyKeyboard";
import {Controls} from "@/app/types";

export default function Home() {

  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const cameraControlsRef = useRef<CameraControls>(null);

  const {state} = useStateContext();

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.up, keys: ['PageUp', 'KeyQ'] },
    { name: Controls.down, keys: ['PageDown', 'KeyE'] },
  ], [])

  return (
    <div className="h-screen w-screen bg-neutral-300 fixed inset-0 z-0">
      <KeyboardControls map={map}>
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
            <CameraControls ref={cameraControlsRef} />
            <CameraFlyKeyboard cameraControlsRef={cameraControlsRef}/>
            <directionalLight intensity={0.5} position={[6, 2, 1]} />
            <ambientLight intensity={0.1} />
            <Axis poolDimensions={state.poolDimensions} />
            <Pool poolDimensions={state.poolDimensions} />
            <Path />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
