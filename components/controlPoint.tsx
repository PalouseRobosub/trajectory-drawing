import {Cone, DragControls, Edges, Line, Outlines, Plane, Sphere} from "@react-three/drei";
import {useStateContext, useWaypointContext} from "@/components/context";
import * as THREE from "three";
import {useEffect, useRef, useState} from "react";
import {Group, Mesh, Vector3} from "three";
import {CartesianCoords} from "@/app/types";

type AxisLimits = [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined] | undefined

const ControlPoint = ({ startPos, waypointIndex }: { startPos: CartesianCoords, waypointIndex: number }) => {

  const { waypoints, setWaypoints } = useWaypointContext()
  const { state, setState } = useStateContext();
  const [activeDrag, setActiveDrag] = useState<boolean>(false);
  const [dragLimits, setDragLimits] = useState<AxisLimits>(undefined);
  const dragRef = useRef<Group>(null);
  const sphereRef = useRef<Mesh>(null);

  useEffect(() => {
    if (!sphereRef.current) return;
    const position = waypoints[waypointIndex].controlPoint;
    const vector = new Vector3(position.x, position.y, position.z);
    sphereRef.current.position.copy(vector);
    console.log(new Vector3().setFromMatrixPosition(sphereRef.current.matrix));
    console.log(sphereRef.current.position);
  }, [])

  const updatePos = () => {
    if (!dragRef.current) return;
    const newWaypoints = [...waypoints];
    const matrix = dragRef.current.matrixWorld;
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(matrix);
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      controlPoint: vector
    }
    setWaypoints(newWaypoints);
  }

  const lockAxis = (axis: 'x'|'y'|'z'|'xy'|'xz'|'yz') => {
    if (dragLimits !== undefined && activeDrag) return;
    if (!dragRef.current) return;
    const matrix = dragRef.current.matrixWorld
    const position = new THREE.Vector3().setFromMatrixPosition(matrix)
    const limits: AxisLimits = [undefined, undefined, undefined]
    if (axis.includes("x")) {
      limits[0] = [position.x, position.x];
    }
    if (axis.includes("y")) {
      limits[1] = [position.y, position.y];
    }
    if (axis.includes("z")) {
      limits[2] = [position.z, position.z];
    }

    setDragLimits(limits)
  }
  //FIXME NEED TO SUBTRACT FROM MATRIX POSITION INSTEAD OF RESET
  //FIXME USE DELTA OR OROGINAL POSITION
  //FIXME DRAGGABLE PROBABLE ADDING DELTA RATHER THAN CHANGING POSITION ABSOLUTELY
  //FIXME PROBABLY ONDRAGEND
  return (
    <DragControls
      ref={dragRef}
      onDragStart={() => {
        setState({ ...state, orbitEnabled: false })
        setActiveDrag(true)
      }}
      onDragEnd={() => {
        setState({...state, orbitEnabled: true});
        setActiveDrag(false)
        setDragLimits(undefined);
        updatePos();
        if (!sphereRef.current) return;
        console.log(sphereRef.current.matrix);

        //FIXME TEMP
        sphereRef.current.position.set(0, 0, 0);

        //FIXME LOGS THE ORIGINAL OFFSET AFTER A TRANSFORM
        console.log(new Vector3().setFromMatrixPosition(sphereRef.current.matrix));
      }}
      dragLimits={dragLimits}
    >

      <Sphere
        ref={sphereRef}
        raycast={() => null}
        args={[0.06]}
      >
        <meshBasicMaterial color="black" />

        {/* x axis */}
        <Line
          points={[[0, 0, 0], [0.5, 0, 0]]}
          color="red"
          lineWidth={4}
          onPointerOver={() => lockAxis("yz")}
        />
        <Cone
          args={[0.05, 0.1]}
          position={[0.5, 0, 0]}
          rotation={[0, 0, -Math.PI/2]}
          onPointerOver={() => lockAxis("yz")}
        >
          <meshBasicMaterial color="red" />
          <Edges color="black" />
          <Outlines color="black" thickness={1}/>
        </Cone>

        {/* xy plane */}
        <Plane
          args={[0.2, 0.2]}
          position={[0.2, 0.2, 0]}
          onPointerOver={() => lockAxis("z")}
        >
          <Edges color="white" />
          <meshBasicMaterial color="blue" side={THREE.DoubleSide} />
        </Plane>

        {/* y axis */}
        <Line
          points={[[0, 0, 0], [0, 0.5, 0]]}
          color="green"
          lineWidth={4}
          onPointerOver={() => lockAxis("xz")}
        />
        <Cone
          args={[0.05, 0.1]}
          position={[0, 0.5, 0]}
          onPointerOver={() => lockAxis("xz")}
        >
          <meshBasicMaterial color="green" />
          <Edges color="black" />
          <Outlines color="black" thickness={1}/>
        </Cone>

        {/* xz plane */}
        <Plane
          args={[0.2, 0.2]}
          position={[0.2, 0, 0.2]}
          onPointerOver={() => lockAxis("y")}
          rotation={[-Math.PI/2, 0, 0]}
        >
          <Edges color="white" />
          <meshBasicMaterial color="green" side={THREE.DoubleSide} />
        </Plane>

        {/* z axis */}
        <Line
          points={[[0, 0, 0], [0, 0, 0.5]]}
          color="blue"
          lineWidth={4}
          onPointerOver={() => lockAxis("xy")}
        />
        <Cone
          args={[0.05, 0.1]}
          position={[0, 0, 0.5]}
          rotation={[Math.PI/2, 0, 0]}
          onPointerOver={() => lockAxis("xy")}
        >
          <meshBasicMaterial color="blue" />
          <Edges color="black" />
          <Outlines color="black" thickness={1}/>
        </Cone>

        {/* yz plane */}
        <Plane
          args={[0.2, 0.2]}
          position={[0, 0.2, 0.2]}
          onPointerOver={() => lockAxis("x")}
          rotation={[0, Math.PI/2, 0]}
        >
          <Edges color="white" />
          <meshBasicMaterial color="red" side={THREE.DoubleSide} />
        </Plane>

      </Sphere>

    </DragControls>
  )
}

export default ControlPoint;