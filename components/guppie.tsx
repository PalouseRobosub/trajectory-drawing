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

const T200 = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {

  return (
    <group
      position={position}
      rotation={rotation}
    >

      {/* front cone */}
      <Cone
        args={[
          inToM(1.25),
          inToM(guppieParams.thrusterLength) * 0.2,
        ]}
        position={[
          0,
          inToM(guppieParams.thrusterLength) * 0.5,
          0
        ]}
      >
        <meshBasicMaterial color="black" />
        <Edges color="white" />
      </Cone>

      {/* front center */}
      <Cylinder
        args={[
          inToM(1.25),
          inToM(1.25),
          inToM(guppieParams.thrusterLength) * 0.2,
        ]}
        position={[
          0,
          inToM(guppieParams.thrusterLength) * 0.3,
          0
        ]}
      >
        <meshBasicMaterial color="black" />
        <Edges color="white" />
      </Cylinder>

      {/* shroud */}
      <Cylinder
        args={[
          inToM(guppieParams.thrusterDiameter) / 2,
          inToM(guppieParams.thrusterDiameter) / 2,
          inToM(guppieParams.thrusterLength) * 0.4,
          undefined,
          undefined,
          true
        ]}
      >
        <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        <Edges color="white" />
      </Cylinder>

      {/* center */}
      <Cylinder
        args={[
          inToM(1.25),
          inToM(1.25),
          inToM(guppieParams.thrusterLength) * 0.4,
        ]}
      >
        <meshBasicMaterial color="steelblue" />
        <Edges color="white" />

        {/* blade */}
        <Box
          args={[
            inToM(1),
            inToM(0.25),
            inToM(guppieParams.thrusterDiameter) * 0.45,
          ]}
          rotation={[
            0,
            0,
            Math.PI/4,
          ]}
          position={[
            0,
            0,
            inToM(guppieParams.thrusterDiameter) / 4,
          ]}
        >
          <meshBasicMaterial color="steelblue" />
          <Edges color="white" />
        </Box>

        {/* blade */}
        <Box
          args={[
            inToM(1),
            inToM(0.25),
            inToM(guppieParams.thrusterDiameter) * 0.45,
          ]}
          rotation={[
            0,
            2*Math.PI/3,
            Math.PI/4,
          ]}
          position={[
            inToM(guppieParams.thrusterDiameter) * 0.125 * Math.sqrt(3),
            0,
            -inToM(guppieParams.thrusterDiameter) * 0.125,
          ]}
        >
          <meshBasicMaterial color="steelblue" />
          <Edges color="white" />
        </Box>

        {/* blade */}
        <Box
          args={[
            inToM(1),
            inToM(0.25),
            inToM(guppieParams.thrusterDiameter) * 0.45,
          ]}
          rotation={[
            0,
            4*Math.PI/3,
            Math.PI/4,
          ]}
          position={[
            -inToM(guppieParams.thrusterDiameter) * 0.125 * Math.sqrt(3),
            0,
            -inToM(guppieParams.thrusterDiameter) * 0.125,
          ]}
        >
          <meshBasicMaterial color="steelblue" />
          <Edges color="white" />
        </Box>
      </Cylinder>

      {/* rear cone */}
      <Cone
        args={[
          inToM(1.25),
          inToM(guppieParams.thrusterLength) * 0.2,
        ]}
        rotation={[
          Math.PI,
          0,
          0
        ]}
        position={[
          0,
          -inToM(guppieParams.thrusterLength) * 0.3,
          0
        ]}
      >
        <meshBasicMaterial color="black" />
        <Edges color="white" />
      </Cone>
    </group>
  )
}

const Hull = ({ position }: { position: [number, number, number]}) => {
  return (
    <group
      position={position}
    >

      {/* f hull cap */}
      <Cylinder
        args={[
          inToM(guppieParams.tubeDiameter) / 2,
          inToM(guppieParams.tubeDiameter) / 2,
          inToM(guppieParams.capThickness),
          64
        ]}
        position={[
          0,
          (inToM(guppieParams.tubeLength) / 2 + inToM(guppieParams.capThickness) / 2),
          0
        ]}
      >
        <meshBasicMaterial color="gray" />
        <Edges color="black" />
      </Cylinder>

      {/* main hull body */}
      <Cylinder
        args={[
          inToM(guppieParams.tubeDiameter)/2,
          inToM(guppieParams.tubeDiameter)/2,
          inToM(guppieParams.tubeLength),
          64
        ]}
      >
        <meshStandardMaterial color="white" transparent={true} opacity={0.4} />
        <Edges color="black" />
        <Torus
          args={[
            inToM(guppieParams.tubeDiameter) / 2 - 0.01,
            0.01,
            4
          ]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[
            0,
            -inToM(guppieParams.tubeLength) * 0.375,
            0
          ]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[
            inToM(guppieParams.tubeDiameter) / 2 - 0.01,
            0.01,
            4
          ]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[
            0,
            -inToM(guppieParams.tubeLength) * 0.125,
            0
          ]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[
            inToM(guppieParams.tubeDiameter) / 2 - 0.01,
            0.01,
            4
          ]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[
            0,
            inToM(guppieParams.tubeLength) * 0.125,
            0
          ]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
        <Torus
          args={[
            inToM(guppieParams.tubeDiameter) / 2 - 0.01,
            0.01,
            4
          ]}
          rotation={[Math.PI/2, 0, 0]}
          scale={[1, 1, 1]}
          position={[
            0,
            inToM(guppieParams.tubeLength) * 0.375,
            0
          ]}
        >
          <meshBasicMaterial color="red" />
        </Torus>
      </Cylinder>

      {/* r hull cap */}
      <Cylinder
        args={[
          inToM(guppieParams.tubeDiameter) / 2,
          inToM(guppieParams.tubeDiameter) / 2,
          inToM(guppieParams.capThickness),
          64
        ]}
        position={[
          0,
          -(inToM(guppieParams.tubeLength) / 2 + inToM(guppieParams.capThickness) / 2),
          0
        ]}
      >
        <meshBasicMaterial color="gray" />
        <Edges color="black" />
      </Cylinder>

    </group>
  )
}

const Guppie = ({ ref, startPos }: { ref: RefObject<THREE.Group|null>, startPos: Waypoint["position"]}) => {

  return (
    //  guppie parent group
    <group position={cartToArray(startPos)} ref={ref}>

      {/* hulls */}
      <group
        position={[
          0,
          0,
          (inToM(guppieParams.tubeDiameter/2) + inToM(guppieParams.platformThickness) / 2)
        ]}
      >

        {/* left hull */}
        <Hull
          position={[
            -inToM(guppieParams.tubeDiameter/2),
            0,
            0
          ]}
        />

        {/* right hull */}
        <Hull
          position={[
            inToM(guppieParams.tubeDiameter/2),
            0,
            0
          ]}
        />

      </group>

      {/* main platform */}
      <Box
        args={[
          inToM(guppieParams.platformWidth),
          inToM(guppieParams.platformLength),
          inToM(guppieParams.platformThickness),
        ]}
      >
        <meshBasicMaterial color="white" />
        <Edges color="black" />
      </Box>

      {/* skid assembly group */}
      <group
        position={[
          0,
          0,
          -((inToM(guppieParams.skidHeight) / 2) + (inToM(guppieParams.platformThickness) / 2))
        ]}
      >

        {/* front skid assembly group */}
        <group
          position={[
            0,
            ((inToM(guppieParams.platformLength) / 2) - (inToM(guppieParams.squareScaffoldThickness) / 2)),
            0,
          ]}
        >

          {/* fr vertical scaffold */}
          <Box
            args={[
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.skidHeight)
            ]}
            position={[
              ((inToM(guppieParams.platformWidth) / 2) - (inToM(guppieParams.squareScaffoldThickness) / 2)),
              0,
              0
            ]}
          >
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>

          {/* fl vertical scaffold */}
          <Box
            args={[
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.skidHeight)
            ]}
            position={[
              -((inToM(guppieParams.platformWidth) / 2) - (inToM(guppieParams.squareScaffoldThickness) / 2)),
              0,
              0
            ]}
          >
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>

          {/* front horizontal scaffold */}
          <Box
            args={[
              inToM(guppieParams.platformWidth),
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.squareScaffoldThickness),
            ]}
            position={[
              0,
              0,
              -(inToM(guppieParams.skidHeight) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2),
            ]}
          >
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
        </group>

        {/* rear skid assembly group */}
        <group
          position={[
            0,
            -((inToM(guppieParams.platformLength) / 2) - (inToM(guppieParams.squareScaffoldThickness) / 2)),
            0
          ]}
        >

          {/* rr vertical scaffold */}
          <Box
            args={[
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.skidHeight)
            ]}
            position={[
              ((inToM(guppieParams.platformWidth) / 2) - (inToM(guppieParams.squareScaffoldThickness) / 2)),
              0,
              0
            ]}
          >
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>

          {/* rl vertical scaffold */}
          <Box
            args={[
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.skidHeight)
            ]}
            position={[
              -((inToM(guppieParams.platformWidth) / 2) - (inToM(guppieParams.squareScaffoldThickness) / 2)),
              0,
              0
            ]}
          >
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>

          {/* rear horizontal scaffold */}
          <Box
            args={[
              inToM(guppieParams.platformWidth),
              inToM(guppieParams.squareScaffoldThickness),
              inToM(guppieParams.squareScaffoldThickness),
            ]}
            position={[
              0,
              0,
              -(inToM(guppieParams.skidHeight) / 2 - inToM(guppieParams.squareScaffoldThickness) / 2),
            ]}
          >
            <meshBasicMaterial color="gray" />
            <Edges color="black" />
          </Box>
        </group>

      </group>

      {/* thrusters */}
      <>

        {/* front-right */}
        <T200
          position={[
            inToM(guppieParams.platformWidth) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            inToM(guppieParams.platformLength) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            0
          ]}
          rotation={[
            0,
            0,
            Math.PI/4,
          ]}
        />

        {/* front-left */}
        <T200
          position={[
            -inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            inToM(guppieParams.platformLength) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            0
          ]}
          rotation={[
            0,
            0,
            -Math.PI/4,
          ]}
        />

        {/* rear-right */}
        <T200
          position={[
            inToM(guppieParams.platformWidth) / 2 + inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            -inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            0
          ]}
          rotation={[
            0,
            0,
            3*Math.PI/4,
          ]}
        />

        {/* rear-left */}
        <T200
          position={[
            -inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            -inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.thrusterDiameter) / (2 * Math.sqrt(2)),
            0
          ]}
          rotation={[
            0,
            0,
            -3*Math.PI/4,
          ]}
        />

        {/* front-center */}
        <T200
          position={[
            0,
            inToM(guppieParams.platformLength) / 2 + inToM(guppieParams.thrusterDiameter) / 2,
            0
          ]}
          rotation={[
            Math.PI/2,
            0,
            0,
          ]}
        />

        {/* rear-center */}
        <T200
          position={[
            0,
            -inToM(guppieParams.platformLength) / 2 - inToM(guppieParams.thrusterDiameter) / 2,
            0
          ]}
          rotation={[
            Math.PI/2,
            0,
            0,
          ]}
        />

        {/* right-center */}
        <T200
          position={[
            inToM(guppieParams.platformWidth) / 2 + inToM(guppieParams.thrusterDiameter) / 2,
            0,
            0
          ]}
          rotation={[
            Math.PI/2,
            0,
            0,
          ]}
        />

        {/* left-center */}
        <T200
          position={[
            -inToM(guppieParams.platformWidth) / 2 - inToM(guppieParams.thrusterDiameter) / 2,
            0,
            0
          ]}
          rotation={[
            Math.PI/2,
            0,
            0,
          ]}
        />

      </>

    </group>
  )
};

export default Guppie