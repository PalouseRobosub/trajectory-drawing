import {Box} from "@react-three/drei";
import {PoolDimensions} from "@/app/types";


const Pool = ({ poolDimensions }: { poolDimensions: PoolDimensions }) => {

  return (
    <Box
      args={[poolDimensions.x, poolDimensions.y, poolDimensions.z, poolDimensions.x, poolDimensions.y, poolDimensions.z]}
      position={[poolDimensions.x/2, poolDimensions.y/2, -poolDimensions.z/2]}
    >
      <meshBasicMaterial wireframe color="dodgerblue" />
    </Box>
  )
}

export default Pool