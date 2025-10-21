'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {Obstacle, State, Trajectory} from "@/app/types";
import {Quaternion, Vector3} from "three";
import * as THREE from "three";

const defaultState: State = {
  poolDimensions: {
    x: 10,
    y: 15,
    z: 5,
  },
  waypointOptions: {
    dotWaypoints: true,
    waypointLabels: "seq"
  },
  orbitEnabled: true,
  pathFiles: [],
  displayPaths: [],
  autosave: true,
  unsaved: false,
  showSubModel: false,
  subPath: -1,
  subPoint: 0,
  showGizmos: true,
}

const stateContext = createContext({})
const trajectoryContext = createContext({})
const obstacleContext = createContext({})
const subPointsContext = createContext({})

const Context = ({ children }: { children: React.ReactNode } ) => {

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem("state");
      return raw ? JSON.parse(raw) : defaultState;
    } catch {
      return defaultState;
    }
  });
  const [trajectories, setTrajectories] = useState<Trajectory[]>([])
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [subPoints, setSubPoints] = useState<{ position: Vector3, orientation: Quaternion }[]>([])

  const loadTrajectories = async () => {
    let files: string[] = []
    await fetch("/api/list").then((res) => res.json()).then(data => files = data)

    const newTrajectories: Trajectory[] = []

    for (const file of files) {
      await fetch(`/api/${file}`).then((res) => res.json()).then(data => newTrajectories.push(data.trajectory))
    }

    setState({...state, pathFiles: files, displayPaths: new Array(newTrajectories.length).fill(true)})
    setTrajectories(newTrajectories)
  }

  const saveTrajectories = async () => {
    for (const trajectory of trajectories) {
      const index = trajectories.indexOf(trajectory);
      const data = {
        trajectory: trajectory,
      }

      await fetch(`/api/${state.pathFiles[index]}`, {method: "PUT", body: JSON.stringify(data, null, 2)}).then((res) => res.text()).then(text => console.log(text))
    }
    setState({...state, unsaved: false})
  }

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    loadTrajectories()
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!state.autosave) setState({...state, unsaved: true})
  }, [trajectories]); // eslint-disable-line

  useEffect(() => {
    if (state.autosave) saveTrajectories()
  }, [trajectories]) // eslint-disable-line

  useEffect(() => {
    if (!state.showSubModel) return;
    if (state.subPath === -1) return;
    if (!trajectories[state.subPath]) return;

    const traj = trajectories[state.subPath];

    const points: { position: Vector3, orientation: Quaternion }[] = []

    traj.waypoints.forEach((waypoint, i) => {
      if (i === traj.waypoints.length - 1) return;

      const next = traj.waypoints[i + 1];
      let segPoints: Vector3[];

      if (waypoint.bezier) {
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(waypoint.position.x, waypoint.position.y, waypoint.position.z),
          new THREE.Vector3(waypoint.controlPoint.x, waypoint.controlPoint.y, waypoint.controlPoint.z),
          new THREE.Vector3(next.position.x, next.position.y, next.position.z)
        );

        const len = Math.floor(curve.getLength());
        segPoints = curve.getSpacedPoints(len * 5);
      } else {
        const start = new Vector3(
          waypoint.position.x,
          waypoint.position.y,
          waypoint.position.z
        );
        const end = new Vector3(
          next.position.x,
          next.position.y,
          next.position.z
        );

        const lineCurve = new THREE.LineCurve3(start, end);
        const len = Math.floor(lineCurve.getLength());
        segPoints = lineCurve.getSpacedPoints(len * 5);
      }

      const full = segPoints.map((point, j) => {
        const t = j / (segPoints.length - 1);
        const qStart = new Quaternion().copy(waypoint.orientation).normalize();
        const qEnd = new Quaternion(
          next.orientation.x,
          next.orientation.y,
          next.orientation.z,
          next.orientation.w
        ).normalize();

        const qInterp = new Quaternion().copy(qStart).slerp(qEnd, t);

        return {
          position: point,
          orientation: qInterp.normalize(),
        };
      });

      points.push(...full);

    });

    setSubPoints(points);

  }, [state.showSubModel, state.subPath, trajectories]);


  return (
    <stateContext.Provider value={{ state, setState }}>
      <trajectoryContext.Provider value={{ trajectories, setTrajectories }}>
        <obstacleContext.Provider value={{ obstacles, setObstacles }}>
          <subPointsContext.Provider value={{ subPoints, setSubPoints }}>
            {children}
          </subPointsContext.Provider>
        </obstacleContext.Provider>
      </trajectoryContext.Provider>
    </stateContext.Provider>
  )
}

const useStateContext = () => useContext(stateContext) as { state: State , setState: (state: State) => void }
const useTrajectoryContext = () => useContext(trajectoryContext) as { trajectories: Trajectory[], setTrajectories: (trajectories: Trajectory[]) => void }
const useObstacleContext = () => useContext(obstacleContext) as { obstacles: Obstacle[], setObstacles: (obstacles: Obstacle[]) => void }
const useSubPointsContext = () => useContext(subPointsContext) as { subPoints: { position: Vector3, orientation: Quaternion }[], setSubPoints: (subPoints: { position: Vector3, orientation: Quaternion }[]) => void }

export { Context, useStateContext, useTrajectoryContext, useObstacleContext, useSubPointsContext }