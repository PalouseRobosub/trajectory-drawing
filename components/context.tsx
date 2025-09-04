'use client'

import {createContext, useContext, useState} from "react";

interface State {
  poolDimensions: {
    x: number;
    y: number;
    z: number;
  }
}

const defaultState = {
  poolDimensions: {
    x: 5,
    y: 5,
    z: 5,
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