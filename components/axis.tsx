import { Text, Line } from "@react-three/drei";
import {PoolDimensions} from "@/app/types";

const ZAxis = ({ length }: { length: number }) => (
  <Line
    points={[[0, 0, 1], [0, 0, -length-1]]}
    color="blue"
    lineWidth={2}
  />
);

const XAxis = ({ length }: { length: number }) => (
  <Line
    points={[[-1, 0, 0], [length+1, 0, 0]]}
    color="red"
    lineWidth={2}
  />
);

const YAxis = ({ length }: { length: number }) => (
  <Line
    points={[[0, -1, 0], [0, length+1, 0]]}
    color="green"
    lineWidth={2}
  />
);

export default function Axis({ poolDimensions }: { poolDimensions: PoolDimensions }) {
  return (
    <group>
      <Text
        color="black"
        anchorX="left"
        anchorY="middle"
        position={[poolDimensions.x + 1.1, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        rotation={[Math.PI/2, 0, 0]}
      >
        X
      </Text>
      <Text
        color="black"
        anchorX="right"
        anchorY="middle"
        position={[0, poolDimensions.y + 1.1, 0]}
        scale={[0.5, 0.5, 0.5]}
        rotation={[Math.PI/2, -Math.PI/2, 0]}
      >
        Y
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="top"
        position={[0, 0, 1.6]}
        scale={[0.5, 0.5, 0.5]}
        rotation={[Math.PI/2, -Math.PI/4, 0]}
      >
        Z
      </Text>
      <ZAxis length={poolDimensions.z} />
      <YAxis length={poolDimensions.y} />
      <XAxis length={poolDimensions.x} />
    </group>
  );
}
