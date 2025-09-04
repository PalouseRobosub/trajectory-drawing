'use client'

import {useStateContext} from "@/components/context";
import {Input} from "@/components/ui/input";


const PoolMenu = () => {

  const {state, setState} = useStateContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-nowrap font-semibold">Pool Dimensions</div>
      <div className="flex flex-row items-center gap-2 ">
        X:
        <Input type="number" defaultValue={state.poolDimensions.x} onChange={(e) => setState({...state, poolDimensions: {...state.poolDimensions, x: parseInt(e.target.value)}})} />
      </div>
      <div className="flex flex-row items-center gap-2 ">
        Y:
        <Input type="number" defaultValue={state.poolDimensions.y} onChange={(e) => setState({...state, poolDimensions: {...state.poolDimensions, y: parseInt(e.target.value)}})} />
      </div>
      <div className="flex flex-row items-center gap-2 ">
        Depth:
        <Input type="number" defaultValue={state.poolDimensions.z} onChange={(e) => setState({...state, poolDimensions: {...state.poolDimensions, z: parseInt(e.target.value)}})} />
      </div>
    </div>
  )
}

export default PoolMenu