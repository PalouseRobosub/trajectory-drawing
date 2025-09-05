'use client'

import {createContext, useContext, useState} from "react";
import {State, Waypoint} from "@/app/types";

const defaultWaypoints: Waypoint[] = [
  {
    name: "Waypoint 1",
    position: [1, 1, 0],
    orientation: [0, 0, 0, 1],
    velocity: 1,
    holdTime: 0,
  },
  {
    name: "Waypoint 2",
    position: [3, 7, -4],
    orientation: [0, 0, 0, 1],
    velocity: 1,
    holdTime: 0,
  },
  {
    name: "Waypoint 3",
    position: [8, 6, -2],
    orientation: [0, 0, 0, 1],
    velocity: 1,
    holdTime: 0,
  },
  {
    name: "Waypoint 4",
    position: [9, 4, -3],
    orientation: [0, 0, 0, 1],
    velocity: 1,
    holdTime: 0,
  },
  {
    name: "Waypoint 5",
    position: [9, 9, -5],
    orientation: [0, 0, 0, 1],
    velocity: 1,
    holdTime: 0,
  },
  {
    name: "Waypoint 6",
    position: [4, 11, 0],
    orientation: [0, 0, 0, 1],
    velocity: 1,
    holdTime: 0,
  },
];

const defaultState: State = {
  poolDimensions: {
    x: 10,
    y: 15,
    z: 5,
  },
  waypoints: defaultWaypoints,
  waypointOptions: {
    dotWaypoints: true,
    waypointLabels: "seq"
  }
}

const stateContext = createContext({})


const Context = ({ children }: { children: React.ReactNode } ) => {

  const [state, setState] = useState<State>(defaultState)

  return (
    <stateContext.Provider value={{ state, setState }}>
      {children}
    </stateContext.Provider>
  )
}

const useStateContext = () => useContext(stateContext) as { state: State , setState: (state: State) => void }

export { Context, useStateContext }