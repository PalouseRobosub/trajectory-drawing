import {Billboard, Line, QuadraticBezierLine, Sphere, Text} from "@react-three/drei"
import {useStateContext, useWaypointContext} from "@/components/context";
import {cartToArray} from "@/lib/cords";
import ControlPoint from "@/components/controlPoint";

const Path = () => {

  const { state } = useStateContext()
  const { waypoints } = useWaypointContext()

  return (
    <group>
      {waypoints.map((waypoint, i) => {
        if (!waypoints[i+1]) {
          return (
            <group key={i}>

              {/* optional dot at waypoint */}
              {state.waypointOptions.dotWaypoints && <Sphere
                args={[0.06]}
                position={cartToArray(waypoint.position)}
              >
                <meshBasicMaterial color="red"/>
              </Sphere>}

              {/* optional label at waypoint */}
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
        }

        return (
          <group key={i}>

            {/* line segment */}
            {!waypoint.bezier &&
              <Line
                points={[cartToArray(waypoint.position), cartToArray(waypoints[i + 1].position)]}
                color="rebeccapurple"
                lineWidth={4}
              />
            }

            {waypoint.bezier &&
              <>
                <QuadraticBezierLine
                  start={cartToArray(waypoint.position)}
                  mid={cartToArray(waypoint.controlPoint)}
                  end={cartToArray(waypoints[i+1].position)}
                  color="rebeccapurple"
                  lineWidth={4}
                />
                <ControlPoint startPos={waypoint.controlPoint} waypointIndex={i} />
                <Line
                  points={[
                    cartToArray(waypoint.position),
                    cartToArray(waypoint.controlPoint),
                    cartToArray(waypoints[i + 1].position)
                  ]}
                  color="yellow"
                  lineWidth={4}
                />
              </>
            }

            {/* optional dot at waypoint */}
            {state.waypointOptions.dotWaypoints &&
              <Sphere
                args={[0.06]}
                position={cartToArray(waypoint.position)}
              >
                <meshBasicMaterial color={`${i === 0 ? "green" : "black"}`}/>
              </Sphere>
            }

            {/* optional label at waypoint*/}
            {state.waypointOptions.waypointLabels !== 'none' &&
              <Billboard position={[waypoint.position.x, waypoint.position.y, waypoint.position.z + .2]}>
                <Text
                  color="black"
                  scale={[0.2, 0.2, 0.2]}
                >
                  {state.waypointOptions.waypointLabels === "name" ? waypoint.name : i + 1}
                </Text>
              </Billboard>
            }

          </group>
        )
      })}
    </group>
  )
}

export default Path