import {Box} from "@react-three/drei";
import {PoolDimensions} from "@/app/types";


const Pool = ({ poolDimensions }: { poolDimensions: PoolDimensions }) => {

  return (
    <Box
      args={[poolDimensions.x, poolDimensions.y, poolDimensions.z, poolDimensions.x, poolDimensions.y, poolDimensions.z]}
      position={[poolDimensions.x/2, poolDimensions.y/2, -poolDimensions.z/2]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial wireframe color="dodgerblue" />
      {/*<meshStandardMaterial color="#222" transparent opacity={0.08} />*/}
      {/*<Edges color="lightseagreen" threshold={15} lineWidth={2} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />*/}
    </Box>
  )
}

export default Pool