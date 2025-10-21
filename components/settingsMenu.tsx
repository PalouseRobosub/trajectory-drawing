import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useStateContext} from "@/components/context";


const SettingsMenu = () => {

  const { state, setState } = useStateContext()

  return (
    <div className="flex flex-col items-center gap-2 w-[20vw]">
      <p className="border-b-2 text-center bg-gray-200 p-2 text-lg w-full h-12">Settings</p>
      <div className="flex flex-row gap-2 items-center">
        Autosave
        <Switch className="data-[state=checked]:bg-green-400" checked={state.autosave} onCheckedChange={(checked) => setState({...state, autosave: checked})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        <Label htmlFor="dots">Dot Waypoints:</Label>
        <Switch id="dots" className="data-[state=checked]:bg-green-400" checked={state.waypointOptions.dotWaypoints} onCheckedChange={(checked) => setState({...state, waypointOptions: {...state.waypointOptions, dotWaypoints: checked}})} />
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
      <div className="flex flex-row items-center gap-2 text-nowrap">
        <Label htmlFor="gizmos">Show Gizmos:</Label>
        <Switch id="gizmos" className="data-[state=checked]:bg-green-400" checked={state.showGizmos} onCheckedChange={(checked) => setState({...state, showGizmos: checked})} />
      </div>
    </div>
  )
}

export default SettingsMenu;