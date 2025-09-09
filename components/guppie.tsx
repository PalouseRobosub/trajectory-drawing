import {Box, Cylinder, Edges, Torus} from "@react-three/drei";
import {Waypoint} from "@/app/types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {useRef, useMemo, useState, forwardRef, useImperativeHandle} from "react";
import {cartToArray} from "@/lib/cords";

export interface GuppieHandle {
  play: () => void;
  pause: () => void;
  seek: (index: number) => void;
  getIndex: () => number;
  getPlayingState: () => boolean;
}


// eslint-disable-next-line react/display-name
const Guppie = forwardRef<
  GuppieHandle,
  { waypoints: Waypoint[]; loop?: boolean; onIndexChange?: (i: number) => void }
>(({ waypoints, loop = false, onIndexChange }, ref) => {

  const groupRef = useRef<THREE.Group>(null);

  const timeline = useMemo(() => {
    return waypoints.map((wp, i, arr) => {
      if (i === arr.length - 1) return null;

      const posA = new THREE.Vector3(wp.position.x, wp.position.y, wp.position.z);
      const posB = new THREE.Vector3(arr[i + 1].position.x, arr[i + 1].position.y, arr[i + 1].position.z);

      // const quatA = new THREE.Quaternion(wp.orientation.x, wp.orientation.y, wp.orientation.z, wp.orientation.w);
      // const quatB = new THREE.Quaternion(
      //   arr[i + 1].orientation.x,
      //   arr[i + 1].orientation.y,
      //   arr[i + 1].orientation.z,
      //   arr[i + 1].orientation.w
      // );

      const distance = posA.distanceTo(posB);
      const travelTime = distance / wp.velocity;
      const segmentTime = travelTime + wp.hold_time;

      return { posA, posB, /*quatA, quatB,*/ duration: segmentTime };
    }).filter(Boolean);
  }, [waypoints]);

  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    seek: (index: number) => {
      if (index >= 0 && index < timeline.length) {
        setCurrentIndex(index);
        setElapsed(0);
      }
    },
    getIndex: () => currentIndex,
    getPlayingState: () => isPlaying
  }));

  useFrame((_, delta) => {
    if (!groupRef.current || timeline.length === 0 || !isPlaying) return;

    let time = elapsed + delta;
    let segmentIndex = currentIndex;

    while (segmentIndex < timeline.length && time > timeline[segmentIndex]!.duration) {
      time -= timeline[segmentIndex]!.duration;
      segmentIndex++;

      if (segmentIndex >= timeline.length) {
        if (loop) {
          segmentIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }

      setCurrentIndex(segmentIndex);
      onIndexChange?.(segmentIndex);
    }

    const { posA, posB,/*quatA, quatB,*/ duration } = timeline[segmentIndex]!;
    const t = Math.min(time / duration, 1);

    const pos = new THREE.Vector3().lerpVectors(posA, posB, t);
    // const quat = new THREE.Quaternion().copy(quatA).slerp(quatB, t);

    groupRef.current.position.copy(pos);
    // groupRef.current.quaternion.copy(quat);

    // save elapsed relative to this segment
    setElapsed(time);
  });

  return (
    <group ref={groupRef} position={cartToArray(waypoints[0].position)}>
      <group position={[-0.172, 0, 0.184]}>
        <Cylinder
          args={[0.17, 0.17, 0.03, 64]}
          position={[0, 0.315, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Cylinder>
        <Cylinder
          args={[0.17, 0.17, 0.6, 64]}
        >
          <meshStandardMaterial color="white" transparent={true} opacity={0.4} />
          <Edges color="black" />
        </Cylinder>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, -0.225, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, -0.075, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, 0.075, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, 0.225, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Cylinder
          args={[0.17, 0.17, 0.03, 64]}
          position={[0, -0.315, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Cylinder>
      </group>
      <group position={[0.172, 0, 0.184]}>
        <Cylinder
          args={[0.17, 0.17, 0.03, 64]}
          position={[0, 0.315, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Cylinder>
        <Cylinder
          args={[0.17, 0.17, 0.6, 64]}
        >
          <meshStandardMaterial color="white" transparent={true} opacity={0.4} />
          <Edges color="black" />
        </Cylinder>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, -0.225, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, -0.075, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, 0.075, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[0.16, 0.01, 4]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[0, 0.225, 0]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Cylinder
          args={[0.17, 0.17, 0.03, 64]}
          position={[0, -0.315, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Cylinder>
      </group>
      <Box
        args={[0.7, 0.7, 0.025]}
      >
        <meshBasicMaterial color="white" />
        <Edges color="black" />
      </Box>
      <group
        position={[0, 0, -0.1125]}
      >
        <Box
          args={[0.05, 0.05, 0.2]}
          position={[0.325, 0.325, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Box>
        <Box
          args={[0.05, 0.05, 0.2]}
          position={[-0.325, 0.325, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Box>
        <Box
          args={[0.05, 0.05, 0.2]}
          position={[0.325, -0.325, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Box>
        <Box
          args={[0.05, 0.05, 0.2]}
          position={[-0.325, -0.325, 0]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Box>
        <Box
          args={[0.7, 0.05, 0.05]}
          position={[0, 0.325, -0.075]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Box>
        <Box
          args={[0.7, 0.05, 0.05]}
          position={[0, -0.325, -0.075]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={1}
            roughness={0.08}
            reflectivity={0.9}
            clearcoat={0.5}
            clearcoatRoughness={0.05}
            envMapIntensity={1.3}
            transmission={0}
          />
          <Edges color="black" />
        </Box>
      </group>
    </group>
  )
});

export default Guppie