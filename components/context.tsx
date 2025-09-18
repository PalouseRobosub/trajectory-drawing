'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {State, Waypoint} from "@/app/types";

const defaultWaypoints: Waypoint[] = [
  {
    "seq": 1,
    "name": "Waypoint 1",
    "position": {
      "x": 1,
      "y": 1,
      "z": 0
    },
    "orientation": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "velocity": 1,
    "hold_time": 0,
    "bezier": true,
    "controlPoint": {
      "x": 0.8067615372734089,
      "y": 1.4488103424446677,
      "z": 0.5549410250044118
    }
  },
  {
    "seq": 2,
    "name": "Waypoint 2",
    "position": {
      "x": 3,
      "y": 7,
      "z": -4
    },
    "orientation": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "velocity": 1,
    "hold_time": 0,
    "bezier": false,
    "controlPoint": {
      "x": 0,
      "y": 0,
      "z": 0
    }
  },
  {
    "seq": 3,
    "name": "Waypoint 3",
    "position": {
      "x": 8,
      "y": 6,
      "z": -2
    },
    "orientation": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "velocity": 1,
    "hold_time": 0,
    "bezier": true,
    "controlPoint": {
      "x": 7.405914855883763,
      "y": 4.3563315347572455,
      "z": -3.515943202088419
    }
  },
  {
    "seq": 4,
    "name": "Waypoint 4",
    "position": {
      "x": 9,
      "y": 4,
      "z": -3
    },
    "orientation": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "velocity": 1,
    "hold_time": 0,
    "bezier": false,
    "controlPoint": {
      "x": 0,
      "y": 0,
      "z": 0
    }
  },
  {
    "seq": 5,
    "name": "Waypoint 5",
    "position": {
      "x": 9,
      "y": 9,
      "z": -5
    },
    "orientation": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "velocity": 1,
    "hold_time": 0,
    "bezier": true,
    "controlPoint": {
      "x": 5.724428012303717,
      "y": 11.071823742762085,
      "z": -3.7325069438442355
    }
  },
  {
    "seq": 6,
    "name": "Waypoint 6",
    "position": {
      "x": 4,
      "y": 11,
      "z": 0
    },
    "orientation": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "velocity": 1,
    "hold_time": 0,
    "bezier": false,
    "controlPoint": {
      "x": 0,
      "y": 0,
      "z": 0
    }
  }
]

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
  elapsed: 0,
  totalElapsed: 0,
  totalTime: 0,
  orbitEnabled: true,
}

const stateContext = createContext({})
const waypointContext = createContext({})


const Context = ({ children }: { children: React.ReactNode } ) => {

  const [state, setState] = useState<State>(defaultState)
  const [waypoints, setWaypoints] = useState<Waypoint[]>(defaultWaypoints)
  const [loadedWaypoints, setLoadedWaypoints] = useState(false)

  useEffect(() => {
    const storedWaypoints = JSON.parse(localStorage.getItem("waypoints") as string);
    if (storedWaypoints) {
      setWaypoints(storedWaypoints);
    } else {
      setWaypoints(defaultWaypoints);
    }
    setLoadedWaypoints(true)
  }, []);

  useEffect(() => {
    if (loadedWaypoints) localStorage.setItem('waypoints', JSON.stringify(waypoints));
  }, [loadedWaypoints, waypoints]);

  useEffect(() => {
    console.log("state changed")
  }, [state]);

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