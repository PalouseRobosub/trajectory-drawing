import {Waypoint} from "@/app/types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {useRef, useMemo, useState, forwardRef, useImperativeHandle, useEffect} from "react";
import {useStateContext} from "@/components/context";
import Guppie from "@/components/guppie";

export interface SubHandle {
  play: () => void;
  pause: () => void;
  seek: (index: number) => void;
  getIndex: () => number;
  getPlayingState: () => boolean;
}


// eslint-disable-next-line react/display-name
const SubController = forwardRef<
  SubHandle,
  { waypoints: Waypoint[]; loop?: boolean; onIndexChange?: (i: number) => void }
>(({ waypoints, loop = false, onIndexChange }, ref) => {

  const groupRef = useRef<THREE.Group>(null);

  const { state, setState } = useStateContext();

  const timeline = useMemo(() => {
    return waypoints.map((wp, i, arr) => {
      if (i === arr.length - 1) return null;

      const posA = new THREE.Vector3(wp.position.x, wp.position.y, wp.position.z);
      const posB = new THREE.Vector3(arr[i + 1].position.x, arr[i + 1].position.y, arr[i + 1].position.z);

      const quatA = new THREE.Quaternion(wp.orientation.x, wp.orientation.y, wp.orientation.z, wp.orientation.w)
        .normalize();
      const quatB = new THREE.Quaternion(
        arr[i + 1].orientation.x,
        arr[i + 1].orientation.y,
        arr[i + 1].orientation.z,
        arr[i + 1].orientation.w
      ).normalize();

      const distance = posA.distanceTo(posB);
      const travelTime = distance / wp.velocity;
      const segmentTime = travelTime + wp.hold_time;

      return { posA, posB, quatA, quatB, duration: segmentTime };
    }).filter(Boolean);
  }, [waypoints]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const calcTotalTime = () => {
      let totalTime = 0;
      timeline.forEach((i) => {
        if (!i?.duration) return;
        totalTime += i?.duration
      })
      return totalTime;
    }
    setState({...state, totalTime: calcTotalTime()})
    console.log('fuck')
  }, [setState, timeline]);

  useImperativeHandle(ref, () => ({
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    seek: (index: number) => {
      if (index >= 0 && index < timeline.length) {
        setCurrentIndex(index);
        setState({...state, elapsed: 0});
      }
    },
    getIndex: () => currentIndex,
    getPlayingState: () => isPlaying
  }));

  useFrame((_, delta) => {
    if (!groupRef.current || timeline.length === 0 || !isPlaying) return;

    let time = state.elapsed + delta;
    let totalElapsed = state.totalElapsed + delta;
    let segmentIndex = currentIndex;

    while (segmentIndex < timeline.length && time > timeline[segmentIndex]!.duration) {
      time -= timeline[segmentIndex]!.duration;
      segmentIndex++;

      if (segmentIndex >= timeline.length) {
        if (loop) {
          segmentIndex = 0;
          totalElapsed = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }

      setCurrentIndex(segmentIndex);
      onIndexChange?.(segmentIndex);
    }

    const { posA, posB, quatA, quatB, duration } = timeline[segmentIndex]!;
    const t = Math.min(time / duration, 1);

    const pos = new THREE.Vector3().lerpVectors(posA, posB, t);
    const quat = new THREE.Quaternion().copy(quatA).slerp(quatB, t).normalize();

    groupRef.current.position.copy(pos);
    groupRef.current.quaternion.copy(quat);

    // save elapsed relative to this segment
    setState({...state, elapsed: time, totalElapsed: totalElapsed});
  });

  return (
    <Guppie ref={groupRef} startPos={waypoints[0].position} />
  )
});

export default SubController