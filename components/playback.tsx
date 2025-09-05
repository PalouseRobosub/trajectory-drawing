'use client'

import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import {useStateContext} from "@/components/context";

const Playback = () => {

  const { state, setState } = useStateContext()

  return (
    <div className="fixed bottom-0 w-screen flex flex-row justify-center z-20 pb-2 gap-4">
      <div className="bg-white p-2 flex flex-row gap-2 text-lg rounded-xl">
        <Button>
          <Play />
        </Button>
        <Slider className="w-[50vw]" min={0} max={state.waypoints.length - 1} onValueChange={(number) => setState({...state, playbackPosition: number[0]})} />
      </div>
    </div>
  )
}

export default Playback