import {Line, Text} from "@react-three/drei"
import {useStateContext} from "@/components/context";


const Path = () => {

  const {state} = useStateContext()

  return (
    <group>
      {state.waypoints.map((waypoint, i) => {
        if (!state.waypoints[i+1]) {
          return (
            <Text
              key={i}
              color="black"
              anchorX="center"
              anchorY="middle"
              position={waypoint.position}
              scale={[0.2, 0.2, 0.2]}
            >
              {i}
            </Text>
          )
        }
        return (
          <group key={i}>
            <Line points={[waypoint.position, state.waypoints[i+1].position]} color="orangered" lineWidth={2} />
            <Text
              color="black"
              anchorX="center"
              anchorY="middle"
              position={waypoint.position}
              scale={[0.2, 0.2, 0.2]}
            >
              {i}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

export default Path