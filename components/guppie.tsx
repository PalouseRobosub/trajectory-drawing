import {Box, Cone, Cylinder, Edges, Torus} from "@react-three/drei";
import {Waypoint} from "@/app/types";
import {RefObject} from "react";
import {cartToArray} from "@/lib/cords";
import * as THREE from "three";
import {inToM} from "@/lib/conversions";

// in INCHES
const guppieParams = {
  tubeDiameter: 8,
  tubeLength: 16.5,
  platformWidth: 17,
  platformLength: 19,
  platformThickness: 0.125,
  squareScaffoldThickness: 1,
  skidHeight: 5,
  thrusterDiameter: 3.9,
  thrusterLength: 4.45,
  capThickness: 0.75,
}

// t200 transforms
const thrusterFrontConeArgs: [number, number] = [inToM(1.25), inToM(guppieParams.thrusterLength) * 0.2];
const thrusterFrontConePos: [number, number, number] = [0, inToM(guppieParams.thrusterLength) * 0.5, 0];

const thrusterFrontCenterArgs: [number, number, number] = [
  inToM(1.25),
  inToM(1.25),
  inToM(guppieParams.thrusterLength) * 0.2,
];
const thrusterFrontCenterPos: [number, number, number] = [0, inToM(guppieParams.thrusterLength) * 0.3, 0];

const thrusterShroudArgs: [number, number, number, undefined, undefined, boolean] = [
  inToM(guppieParams.thrusterDiameter) / 2,
  inToM(guppieParams.thrusterDiameter) / 2,
  inToM(guppieParams.thrusterLength) * 0.4,
  undefined,
  undefined,
  true,
];

const thrusterCenterArgs: [number, number, number] = [
  inToM(1.25),
  inToM(1.25),
  inToM(guppieParams.thrusterLength) * 0.4,
];

const thrusterBladeArgs: [number, number, number] = [
  inToM(1),
  inToM(0.25),
  inToM(guppieParams.thrusterDiameter) * 0.45,
];

const blade1Pos: [number, number, number] = [0, 0, inToM(guppieParams.thrusterDiameter) / 4];
const blade2Pos: [number, number, number] = [inToM(guppieParams.thrusterDiameter) * 0.125 * Math.sqrt(3), 0, -inToM(guppieParams.thrusterDiameter) * 0.125];
const blade3Pos: [number, number, number] = [-inToM(guppieParams.thrusterDiameter) * 0.125 * Math.sqrt(3), 0, -inToM(guppieParams.thrusterDiameter) * 0.125];

const blade1Rot: [number, number, number] = [0, 0, Math.PI / 4];
const blade2Rot: [number, number, number] = [0, 2 * Math.PI / 3, Math.PI / 4];
const blade3Rot: [number, number, number] = [0, 4 * Math.PI / 3, Math.PI / 4];

const thrusterRearConeArgs: [number, number] = [inToM(1.25), inToM(guppieParams.thrusterLength) * 0.2];
const thrusterRearConePos: [number, number, number] = [0, -inToM(guppieParams.thrusterLength) * 0.3, 0];
const thrusterRearConeRot: [number, number, number] = [Math.PI, 0, 0];

// hull component transforms
const hullCapArgs: [number, number, number, number] = [
  inToM(guppieParams.tubeDiameter) / 2,
  inToM(guppieParams.tubeDiameter) / 2,
  inToM(guppieParams.capThickness),
  64,
];

const hullBodyArgs: [number, number, number, number] = [
  inToM(guppieParams.tubeDiameter) / 2,
  inToM(guppieParams.tubeDiameter) / 2,
  inToM(guppieParams.tubeLength),
  64,
];

const torusArgs: [number, number, number] = [
  inToM(guppieParams.tubeDiameter) / 2 - 0.01,
  0.01,
  4,
];

const hullCapFPos: [number, number, number] = [
  0,
  inToM(guppieParams.tubeLength) / 2 + inToM(guppieParams.capThickness) / 2,
  0,
];

const hullCapRPos: [number, number, number] = [
  0,
  -(inToM(guppieParams.tubeLength) / 2 + inToM(guppieParams.capThickness) / 2),
  0,
];

const hullTorusRot: [number, number, number] = [Math.PI / 2, 0, 0];
const hullTorusScale: [number, number, number] = [1, 1, 1];
const hullTorusPositions: [number, number, number][] = [
  [0, -inToM(guppieParams.tubeLength) * 0.375, 0],
  [0, -inToM(guppieParams.tubeLength) * 0.125, 0],
  [0, inToM(guppieParams.tubeLength) * 0.125, 0],
  [0, inToM(guppieParams.tubeLength) * 0.375, 0],
];

const platformArgs: [number, number, number] = [
  inToM(guppieParams.platformWidth),
  inToM(guppieParams.platformLength),
  inToM(guppieParams.platformThickness),
]

// hull group transforms
const hullGroupPos: [number, number, number] = [
  0,
  0,
  (inToM(guppieParams.tubeDiameter/2) + inToM(guppieParams.platformThickness) / 2)
]
const leftHullPos: [number, number, number] = [
  -inToM(guppieParams.tubeDiameter/2),
  0,
  0
]
const rightHullPos: [number, number, number] = [
  inToM(guppieParams.tubeDiameter/2),
  0,
  0
]

// skid transforms
const skidGroupPos: [number, number, number] = [
  0,
  0,
  -(inToM(guppieParams.skidHeight) / 2 + inToM(guppieParams.platformThickness) / 2),
];

const frontSkidGroupPos: [number, number, number] = [
  0,
  inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2,
  0,
];

const rearSkidGroupPos: [number, number, number] = [
  0,
  -(inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2),
  0,
];

const verticalScaffoldArgs: [number, number, number] = [
  inToM(guppieParams.squareScaffoldThickness),
  inToM(guppieParams.squareScaffoldThickness),
  inToM(guppieParams.skidHeight),
];

const frVerticalScaffoldPos: [number, number, number] = [
  inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2,
  0,
  0,
];
const flVerticalScaffoldPos: [number, number, number] = [
  -(inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2),
  0,
  0,
];
const rrVerticalScaffoldPos = frVerticalScaffoldPos;
const rlVerticalScaffoldPos = flVerticalScaffoldPos;

const horizontalScaffoldArgs: [number, number, number] = [
  inToM(guppieParams.platformWidth),
  inToM(guppieParams.squareScaffoldThickness),
  inToM(guppieParams.squareScaffoldThickness),
];

const frontHorizontalScaffoldPos: [number, number, number] = [
  0,
  0,
  -(inToM(guppieParams.skidHeight) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2),
];
const rearHorizontalScaffoldPos = frontHorizontalScaffoldPos;

// thruster transforms
const frThrustPos: [number, number, number] = [
  inToM(guppieParams.platformWidth) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  inToM(guppieParams.platformLength) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  0,
];
const frThrustRotation: [number, number, number] = [0, 0, Math.PI / 4];

const flThrustPos: [number, number, number] = [
  -inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  inToM(guppieParams.platformLength) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  0,
];
const flThrustRotation: [number, number, number] = [0, 0, -Math.PI / 4];

const rrThrustPos: [number, number, number] = [
  inToM(guppieParams.platformWidth) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  -inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  0,
];
const rrThrustRotation: [number, number, number] = [0, 0, 3 * Math.PI / 4];

const rlThrustPos: [number, number, number] = [
  -inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  -inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
  0,
];
const rlThrustRotation: [number, number, number] = [0, 0, -3 * Math.PI / 4];

const fcThrustPos: [number, number, number] = [
  0,
  inToM(guppieParams.platformLength) / 2 + inToM(guppieParams.thrusterDiameter) / 2,
  0,
];
const fcThrustRotation: [number, number, number] = [Math.PI / 2, 0, 0];

const rcThrustPos: [number, number, number] = [
  0,
  -inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.thrusterDiameter) / 2,
  0,
];
const rcThrustRotation: [number, number, number] = [Math.PI / 2, 0, 0];

const crThrustPos: [number, number, number] = [
  inToM(guppieParams.platformWidth) / 2 + inToM(guppieParams.thrusterDiameter) / 2,
  0,
  0,
];
const crThrustRotation: [number, number, number] = [Math.PI / 2, 0, 0];

const clThrustPos: [number, number, number] = [
  -inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.thrusterDiameter) / 2,
  0,
  0,
];
const clThrustRotation: [number, number, number] = [Math.PI / 2, 0, 0];

const T200 = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* front cone */}
      <Cone args={thrusterFrontConeArgs} position={thrusterFrontConePos}>
        <meshBasicMaterial color="black" />
        <Edges color="white" />
      </Cone>

      {/* front center */}
      <Cylinder args={thrusterFrontCenterArgs} position={thrusterFrontCenterPos}>
        <meshBasicMaterial color="black" />
        <Edges color="white" />
      </Cylinder>

      {/* shroud */}
      <Cylinder args={thrusterShroudArgs}>
        <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        <Edges color="white" />
      </Cylinder>

      {/* center */}
      <Cylinder args={thrusterCenterArgs}>
        <meshBasicMaterial color="steelblue" />
        <Edges color="white" />

        {/* blades */}
        <Box args={thrusterBladeArgs} rotation={blade1Rot} position={blade1Pos}>
          <meshBasicMaterial color="steelblue" />
          <Edges color="white" />
        </Box>
        <Box args={thrusterBladeArgs} rotation={blade2Rot} position={blade2Pos}>
          <meshBasicMaterial color="steelblue" />
          <Edges color="white" />
        </Box>
        <Box args={thrusterBladeArgs} rotation={blade3Rot} position={blade3Pos}>
          <meshBasicMaterial color="steelblue" />
          <Edges color="white" />
        </Box>
      </Cylinder>

      {/* rear cone */}
      <Cone args={thrusterRearConeArgs} position={thrusterRearConePos} rotation={thrusterRearConeRot}>
        <meshBasicMaterial color="black" />
        <Edges color="white" />
      </Cone>
    </group>
  );
};

const Hull = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* front hull cap */}
      <Cylinder args={hullCapArgs} position={hullCapFPos}>
        <meshBasicMaterial color="gray" />
        <Edges color="black" />
      </Cylinder>

      {/* main hull body */}
      <Cylinder args={hullBodyArgs}>
        <meshStandardMaterial color="white" transparent opacity={0.4} />
        <Edges color="black" />

        {hullTorusPositions.map((pos, i) => (
          <Torus key={i} args={torusArgs} rotation={hullTorusRot} scale={hullTorusScale} position={pos}>
            <meshBasicMaterial color="red" />
          </Torus>
        ))}
      </Cylinder>

      {/* rear hull cap */}
      <Cylinder args={hullCapArgs} position={hullCapRPos}>
        <meshBasicMaterial color="gray" />
        <Edges color="black" />
      </Cylinder>
    </group>
  );
};

const Guppie = ({ ref, startPos }: { ref: RefObject<THREE.Group|null>, startPos: Waypoint["position"]}) => {
  return (
    //  guppie parent group
    <group position={cartToArray(startPos)} ref={ref}>

      {/* hulls */}
      <group position={hullGroupPos}>

        {/* left hull */}
        <Hull position={leftHullPos} />

        {/* right hull */}
        <Hull position={rightHullPos} />

      </group>

      {/* main platform */}
      <Box args={platformArgs}>
        <meshBasicMaterial color="white" />
        <Edges color="black" />
      </Box>

      {/* skid assembly group */}
      <group position={skidGroupPos}>

        {/* Front skid */}
        <group position={frontSkidGroupPos}>
          <Box args={verticalScaffoldArgs} position={frVerticalScaffoldPos}>
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
          <Box args={verticalScaffoldArgs} position={flVerticalScaffoldPos}>
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
          <Box args={horizontalScaffoldArgs} position={frontHorizontalScaffoldPos}>
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
        </group>

        {/* Rear skid */}
        <group position={rearSkidGroupPos}>
          <Box args={verticalScaffoldArgs} position={rrVerticalScaffoldPos}>
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
          <Box args={verticalScaffoldArgs} position={rlVerticalScaffoldPos}>
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
          <Box args={horizontalScaffoldArgs} position={rearHorizontalScaffoldPos}>
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
        </group>

      </group>

      {/* thrusters */}
      <>

        {/* front-right */}
        <T200 position={frThrustPos} rotation={frThrustRotation} />

        {/* front-left */}
        <T200 position={flThrustPos} rotation={flThrustRotation} />

        {/* rear-right */}
        <T200 position={rrThrustPos} rotation={rrThrustRotation} />

        {/* rear-left */}
        <T200 position={rlThrustPos} rotation={rlThrustRotation} />

        {/* front-center */}
        <T200 position={fcThrustPos} rotation={fcThrustRotation} />

        {/* rear-center */}
        <T200 position={rcThrustPos} rotation={rcThrustRotation} />

        {/* right-center */}
        <T200 position={crThrustPos} rotation={crThrustRotation} />

        {/* left-center */}
        <T200 position={clThrustPos} rotation={clThrustRotation} />

      </>

    </group>
  )
};

export default Guppie