import {useObstacleContext} from "@/components/context";
import {BoxArgs, CylinderArgs, ObstacleShape, SphereArgs} from "@/app/types";
import {Box, Cylinder, Sphere} from "@react-three/drei";
import {cartToArray} from "@/lib/cords";


const Obstacles = () => {

  const { obstacles } = useObstacleContext()

  return (
    <group>
      {obstacles.map((obstacle, index) => {
        let args
        switch (obstacle.shape) {
          case ObstacleShape.Sphere:
            args = obstacle.args as SphereArgs;
            return (
              <Sphere
                key={index}
                args={[args.radius]}
                position={cartToArray(obstacle.position)}
              >
                <meshBasicMaterial color={obstacle.color} />
              </Sphere>
            )
          case ObstacleShape.Cylinder:
            args = obstacle.args as CylinderArgs;
            return (
              <Cylinder
                key={index}
                args={[args.radiusTop, args.radiusBottom, args.height]}
                position={cartToArray(obstacle.position)}
              >
                <meshBasicMaterial color={obstacle.color} />
              </Cylinder>
            )
          case ObstacleShape.Box:
            args = obstacle.args as BoxArgs;
            return (
              <Box
                key={index}
                args={[args.width, args.height, args.depth]}
                position={cartToArray(obstacle.position)}
              >
                <meshBasicMaterial color={obstacle.color} />
              </Box>
            )
        }
      })}
    </group>
  )
}

export default Obstacles;