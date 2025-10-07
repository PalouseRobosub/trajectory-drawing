'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {Obstacle, ObstacleShape, State, Trajectory} from "@/app/types";

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
}

const defaultObstacles: Obstacle[] = [
  {
    shape: ObstacleShape.Sphere,
    position: {
      x: 1,
      y: 2,
      z: -1
    },
    args: {
      radius: 0.5
    },
    color: "#15366b"
  }
]

const stateContext = createContext({})
const trajectoryContext = createContext({})
const obstacleContext = createContext({})

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
  const [obstacles, setObstacles] = useState<Obstacle[]>(defaultObstacles)

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
  }, []);

  useEffect(() => {
    if (!state.autosave) setState({...state, unsaved: true})
  }, [trajectories]);

  useEffect(() => {
    if (state.autosave) saveTrajectories()
  }, [trajectories])

  return (
    <stateContext.Provider value={{ state, setState }}>
      <trajectoryContext.Provider value={{ trajectories, setTrajectories }}>
        <obstacleContext.Provider value={{ obstacles, setObstacles }}>
          {children}
        </obstacleContext.Provider>
      </trajectoryContext.Provider>
    </stateContext.Provider>
  )
}

const useStateContext = () => useContext(stateContext) as { state: State , setState: (state: State) => void }
const useTrajectoryContext = () => useContext(trajectoryContext) as { trajectories: Trajectory[], setTrajectories: (trajectories: Trajectory[]) => void }
const useObstacleContext = () => useContext(obstacleContext) as { obstacles: Obstacle[], setObstacles: (obstacles: Obstacle[]) => void }

export { Context, useStateContext, useTrajectoryContext, useObstacleContext }