import {Text, Line, Billboard} from "@react-three/drei";
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
      <Billboard position={[poolDimensions.x + 1.1, 0, 0]}>
        <Text
          color="black"
          scale={[0.5, 0.5, 0.5]}
        >
          X
        </Text>
      </Billboard>
      <Billboard position={[0, poolDimensions.y + 1.1, 0]}>
        <Text
          color="black"
          scale={[0.5, 0.5, 0.5]}
        >
          Y
        </Text>
      </Billboard>
      <Billboard position={[0, 0, 1.6]}>
        <Text
          color="black"
          anchorX="center"
          anchorY="top"
          scale={[0.5, 0.5, 0.5]}
        >
          Z
        </Text>
      </Billboard>
      <ZAxis length={poolDimensions.z} />
      <YAxis length={poolDimensions.y} />
      <XAxis length={poolDimensions.x} />
    </group>
  );
}
