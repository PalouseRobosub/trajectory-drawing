import {Billboard, Line, QuadraticBezierLine, Sphere, Text} from "@react-three/drei"
import {useStateContext} from "@/components/context";
import {cartToArray} from "@/lib/cords";
import Gizmo from "@/components/gizmo";
import {Waypoint} from "@/app/types";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#9B59B6",
  "#E67E22",
  "#1ABC9C",
  "#E74C3C",
  "#2ECC71",
  "#3498DB"
];


const Path = ({ waypoints, index }: { waypoints: Waypoint[], index: number }) => {

  const { state } = useStateContext()

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
                color={colors[index%colors.length]}
                lineWidth={4}
              />
            }

            {waypoint.bezier &&
              <>
                <QuadraticBezierLine
                  start={cartToArray(waypoint.position)}
                  mid={cartToArray(waypoint.controlPoint)}
                  end={cartToArray(waypoints[i+1].position)}
                  color={colors[index%colors.length]}
                  lineWidth={4}
                />
                <Gizmo waypointIndex={i} trajectoryIndex={index} />
                <Line
                  points={[
                    cartToArray(waypoint.position),
                    cartToArray(waypoint.controlPoint),
                    cartToArray(waypoints[i + 1].position)
                  ]}
                  color="black"
                  lineWidth={4}
                  dashed
                  dashSize={0.5}
                  gapSize={0.2}
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