'use client'

import {Button} from "@/components/ui/button";
import {Pause, Play} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import {useStateContext, useWaypointContext} from "@/components/context";
import {GuppieHandle} from "@/components/guppie";
import {RefObject, useState} from "react";

const Playback = ({ animRef }: { animRef: RefObject<GuppieHandle|null>}) => {

  const [playing, setPlaying] = useState(false);

  const { state, setState } = useStateContext()
  const { waypoints } = useWaypointContext()

  const changeAnimState = () => {
    if (!animRef.current) return;
    const playing = animRef.current.getPlayingState()
    setPlaying(!playing)
    if (playing) animRef.current.pause(); else animRef.current.play()
  }

  return (
    <div className="fixed bottom-0 w-screen flex flex-row justify-center z-20 pb-2 gap-4">
      <div className="bg-white p-2 flex flex-row gap-2 text-lg rounded-xl">
        <Button onClick={changeAnimState} className="cursor-pointer">
          {playing ? <Pause/> : <Play/>}
        </Button>
        <Slider className="w-[50vw]" min={0} max={waypoints.length - 1} onValueChange={(number) => setState({...state, playbackPosition: number[0]})} />
      </div>
    </div>
  )
}

export default Playback