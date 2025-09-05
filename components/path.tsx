import {Billboard, Line, Sphere, Text} from "@react-three/drei"
import {useStateContext} from "@/components/context";
import {cartToArray} from "@/lib/cords";

const Path = () => {

  const {state} = useStateContext()

  return (
    <group>
      {state.waypoints.map((waypoint, i) => {
        if (!state.waypoints[i+1]) {
          return (
            <group key={i}>
              {state.waypointOptions.waypointLabels !== 'none' && <Billboard position={[waypoint.position.x, waypoint.position.y, waypoint.position.z + .2]}>
                <Text
                  color="black"
                  scale={[0.2, 0.2, 0.2]}
                >
                  {state.waypointOptions.waypointLabels === "name" ? waypoint.name : i + 1}
                </Text>
              </Billboard>}
              {state.waypointOptions.dotWaypoints && <Sphere
                args={[0.1]}
                position={cartToArray(waypoint.position)}
              >
                <meshBasicMaterial color="red"/>
              </Sphere>}
            </group>
          )
        }
        return (
          <group key={i}>
            <Line points={[cartToArray(waypoint.position), cartToArray(state.waypoints[i+1].position)]} color="rebeccapurple" lineWidth={4} />
            {state.waypointOptions.dotWaypoints && <Sphere
              args={[0.1]}
              position={cartToArray(waypoint.position)}
            >
              <meshBasicMaterial color={`${i === 0 ? "green" : "black"}`}/>
            </Sphere>}
            {state.waypointOptions.waypointLabels !== 'none' && <Billboard position={[waypoint.position.x, waypoint.position.y, waypoint.position.z + .2]}>
              <Text
                color="black"
                scale={[0.2, 0.2, 0.2]}
              >
                {state.waypointOptions.waypointLabels === "name" ? waypoint.name : i + 1}
              </Text>
            </Billboard>}
          </group>
        )
      })}
    </group>
  )
}

export default Path