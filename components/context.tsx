'use client'

import {createContext, useContext, useState} from "react";
import {State} from "@/app/types";

const defaultWaypoints: [number, number, number][] = [
  [ 1, 1, 0],
  [ 8, 7, -2],
  [ 9, 7, -2],
  [ 9, 4, -3],
  [ 9, 9, -5],
  [ 4, 11, 0],
]

const defaultState = {
  poolDimensions: {
    x: 10,
    y: 15,
    z: 5,
  },
  waypoints: defaultWaypoints,
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