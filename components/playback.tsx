'use client'

import {Slider} from "@/components/ui/slider";
import {useStateContext, useSubPointsContext, useTrajectoryContext} from "@/components/context";

const Playback = () => {

  const { state, setState } = useStateContext()
  const { trajectories } = useTrajectoryContext()
  const { subPoints } = useSubPointsContext()

  return (
    <div className="fixed bottom-0 w-screen flex flex-row justify-center z-20 pb-2 gap-4">
      <div className="bg-white p-2 flex flex-row gap-2 text-lg rounded-xl">
        <Slider className="w-[50vw] p-2" min={0} max={subPoints.length-1} onValueChange={(value) => setState({...state, subPoint: value[0]})} />
      </div>
    </div>
  )
}

export default Playback