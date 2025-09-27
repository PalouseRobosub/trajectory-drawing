'use client'

import {useStateContext} from "@/components/context";
import {Input} from "@/components/ui/input";


const PoolMenu = () => {

  const {state, setState} = useStateContext()

  return (
    <div className="flex flex-col items-center gap-2 w-[20vw]">
      <p className="border-b-2 text-center bg-gray-200 p-2 text-lg w-full">Pool Setup</p>
      <div className="flex flex-row items-center gap-2">
        X:
        <Input type="number" defaultValue={state.poolDimensions.x} onChange={(e) => setState({...state, poolDimensions: {...state.poolDimensions, x: parseFloat(e.target.value)}})} />
      </div>
      <div className="flex flex-row items-center gap-2">
        Y:
        <Input type="number" defaultValue={state.poolDimensions.y} onChange={(e) => setState({...state, poolDimensions: {...state.poolDimensions, y: parseFloat(e.target.value)}})} />
      </div>
      <div className="flex flex-row items-center gap-2">
        Depth:
        <Input type="number" defaultValue={state.poolDimensions.z} onChange={(e) => setState({...state, poolDimensions: {...state.poolDimensions, z: parseFloat(e.target.value)}})} />
      </div>
    </div>
  )
}

export default PoolMenu