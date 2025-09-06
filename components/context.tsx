'use client'

import {createContext, useContext, useState} from "react";
import {State, Waypoint} from "@/app/types";

const defaultWaypoints: Waypoint[] = [
  {
    seq: 1,
    name: "Waypoint 1",
    position: { x: 1, y: 1, z: 0 },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    velocity: 1,
    hold_time: 0,
  },
  {
    seq: 2,
    name: "Waypoint 2",
    position: { x: 3, y: 7, z: -4 },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    velocity: 1,
    hold_time: 0,
  },
  {
    seq: 3,
    name: "Waypoint 3",
    position: { x: 8, y: 6, z: -2 },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    velocity: 1,
    hold_time: 0,
  },
  {
    seq: 4,
    name: "Waypoint 4",
    position: { x: 9, y: 4, z: -3 },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    velocity: 1,
    hold_time: 0,
  },
  {
    seq: 5,
    name: "Waypoint 5",
    position: { x: 9, y: 9, z: -5 },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    velocity: 1,
    hold_time: 0,
  },
  {
    seq: 6,
    name: "Waypoint 6",
    position: { x: 4, y: 11, z: 0 },
    orientation: { x: 0, y: 0, z: 0, w: 1 },
    velocity: 1,
    hold_time: 0,
  },
];

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
  playbackPosition: 0
}

const stateContext = createContext({})
const waypointContext = createContext({})


const Context = ({ children }: { children: React.ReactNode } ) => {

  const [state, setState] = useState<State>(defaultState)
  const [waypoints, setWaypoints] = useState<Waypoint[]>(defaultWaypoints)

  return (
    <stateContext.Provider value={{ state, setState }}>
      <waypointContext.Provider value={{ waypoints, setWaypoints }}>
        {children}
      </waypointContext.Provider>
    </stateContext.Provider>
  )
}

const useStateContext = () => useContext(stateContext) as { state: State , setState: (state: State) => void }
const useWaypointContext = () => useContext(waypointContext) as { waypoints: Waypoint[], setWaypoints: (waypoints: Waypoint[]) => void }

export { Context, useStateContext, useWaypointContext }