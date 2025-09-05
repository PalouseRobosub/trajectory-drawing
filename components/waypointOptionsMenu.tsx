'use client'

import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {useStateContext} from "@/components/context";
import {Input} from "@/components/ui/input";

const WaypointOptionsMenu = () => {

  const { state, setState } = useStateContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-semibold text-nowrap">Waypoint Options</div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        <Label htmlFor="dots">Dot Waypoints:</Label>
        <Input type="checkbox" id="dots" className="min-w-32 w-full accent-neutral-900" defaultChecked={state.waypointOptions.dotWaypoints} onChange={(e) => setState({...state, waypointOptions: {...state.waypointOptions, dotWaypoints: e.target.checked}})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Waypoint Labels:
        <RadioGroup defaultValue={state.waypointOptions.waypointLabels} onValueChange={(value:"none"|"seq"|"name") => setState({...state, waypointOptions: {...state.waypointOptions, waypointLabels: value}}) }>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="seq" id="seq" />
            <Label htmlFor="seq">Sequence</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name" id="name" />
            <Label htmlFor="name">Name</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default WaypointOptionsMenu