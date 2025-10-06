'use client'

import {Canvas} from "@react-three/fiber";
import {Suspense, useRef} from "react";
import {OrbitControls, Text} from "@react-three/drei";
import Axis from "@/components/axis"
import * as THREE from "three";
import {useStateContext, useTrajectoryContext} from "@/components/context";
import Pool from "@/components/pool";
import Path from "@/components/path";
import Sidebar from "@/components/sidebar";
import Obstacles from "@/components/obstacles";
// import SubController, {SubHandle} from "@/components/subController";

export default function Home() {

  // set vertical axis to z because i'm not insane
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  // const animRef = useRef<SubHandle>(null);
  const { state } = useStateContext();
  const { trajectories } = useTrajectoryContext()

  return (
    <div className="h-screen w-full bg-neutral-300 fixed inset-0 z-0 flex flex-row">
      <Sidebar />
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
            <Obstacles />
            {trajectories &&
              trajectories.map((trajectory, index) => {
                if (!trajectory.waypoints) return;

                return (
                  <Path waypoints={trajectory.waypoints} key={index} index={index} />
                )
              })
            }
            {/*<SubController*/}
            {/*  ref={animRef}*/}
            {/*  loop={true}*/}
            {/*/>*/}
          </Suspense>
        </Canvas>
    </div>
  );
}
