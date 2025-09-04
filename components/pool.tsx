import {Box} from "@react-three/drei";


const Pool = ({ size }: { size: {x: number, y: number, z: number}}) => {

  return (
    <Box
      args={[size.x, size.y, size.z, size.x, size.y, size.z]}
      position={[size.x/2, size.y/2, -size.z/2]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial wireframe color="dodgerblue" />
      {/*<meshStandardMaterial color="#222" transparent opacity={0.08} />*/}
      {/*<Edges color="lightseagreen" threshold={15} lineWidth={2} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />*/}
    </Box>
  )
}

export default Pool