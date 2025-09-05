import {Box, Cylinder, Edges, Torus} from "@react-three/drei";


const Guppie = ({ position }: { position: [number, number, number] }) => {

  return (
    <group position={position}>
      <group position={[-0.172, 0, 0.195]}>
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
      <group position={[0.172, 0, 0.195]}>
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
        args={[0.7, 0.7, 0.05]}
      >
        <meshBasicMaterial color="white" />
        <Edges color="black" />
      </Box>
    </group>
  )
}

export default Guppie