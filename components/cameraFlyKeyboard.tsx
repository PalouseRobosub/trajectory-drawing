import {CameraControls, useKeyboardControls} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Controls } from '@/app/page';
import {RefObject} from "react";

export function CameraFlyKeyboard({ cameraControlsRef }: { cameraControlsRef: RefObject<CameraControls|null> }) {
  const [_, get] = useKeyboardControls<Controls>();

  useFrame((_, delta) => {
    if (!cameraControlsRef) return
    if (!cameraControlsRef.current) return
    const controls = cameraControlsRef.current;

    const { forward, back, left, right, up, down } = get();
    const speed = 5;

    if (forward) controls.forward(speed * delta);
    if (back) controls.forward(-speed * delta);
    if (left) controls.truck(-speed * delta, 0);
    if (right) controls.truck(speed * delta, 0);
    if (up) controls.elevate(speed * delta);
    if (down) controls.elevate(-speed * delta);
  });

  return <CameraControls ref={cameraControlsRef} />;
}
