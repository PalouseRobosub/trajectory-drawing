import {Cone, DragControls, Edges, Line, Outlines, Plane, Sphere} from "@react-three/drei";
import {useStateContext, useWaypointContext} from "@/components/context";
import * as THREE from "three";
import {useEffect, useRef, useState} from "react";
import {Group, Matrix4, Vector3} from "three";

type AxisLimits = [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined] | undefined

const ControlPoint = ({ waypointIndex }: { waypointIndex: number }) => {

  const { waypoints, setWaypoints } = useWaypointContext()
  const { state, setState } = useStateContext();
  const [activeDrag, setActiveDrag] = useState<boolean>(false);
  const [dragLimits, setDragLimits] = useState<AxisLimits>(undefined);
  const dragRef = useRef<Group>(null);

  useEffect(() => {
    if (!dragRef.current) return;
    const position = waypoints[waypointIndex].controlPoint;
    const vector = new Vector3(position.x, position.y, position.z);
    const matrix = new Matrix4().setPosition(vector);
    dragRef.current.matrix.copy(matrix);
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
      }}
      dragLimits={dragLimits}
    >

      <Sphere
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