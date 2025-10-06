import {useObstacleContext} from "@/components/context";
import {ObstacleShape, SphereArgs} from "@/app/types";
import {Sphere} from "@react-three/drei";
import {cartToArray} from "@/lib/cords";


const Obstacles = () => {

  const { obstacles } = useObstacleContext()

  return (
    <group>
      {obstacles.map((obstacle, index) => {
        switch (obstacle.shape) {
          case ObstacleShape.Sphere:
            const args = obstacle.args as SphereArgs
            return (
              <Sphere
                key={index}
                args={[args.radius]}
                position={cartToArray(obstacle.position)}
              >
                <meshBasicMaterial color={obstacle.color} />
              </Sphere>
            )
        }
      })}
    </group>
  )
}

export default Obstacles;