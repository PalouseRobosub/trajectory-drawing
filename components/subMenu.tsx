import {Switch} from "@/components/ui/switch";
import {useStateContext} from "@/components/context";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F1C40F",
  "#9B59B6",
  "#E67E22",
  "#1ABC9C",
  "#E74C3C",
  "#2ECC71",
  "#3498DB"
];

const SubMenu = () => {

  const { state, setState } = useStateContext()

  return (
    <div className="flex flex-col items-center gap-2 w-[20vw]">
      <p className="border-b-2 text-center bg-gray-200 p-2 text-lg w-full h-12">Sub Model Menu</p>
      <div className="flex flex-row gap-2 items-center">
        Show Sub Model
        <Switch className="data-[state=checked]:bg-green-400" checked={state.showSubModel} onCheckedChange={(checked) => setState({...state, showSubModel: checked})} />
      </div>
      {state.showSubModel &&
        <Select
          onValueChange={(value) => {
            setState({...state, subPath: parseInt(value)})
          }}
          defaultValue={state.subPath.toString()}
        >
          <SelectTrigger className="min-w-3/4">
            <SelectValue placeholder="Select Trajectory"/>
          </SelectTrigger>
          <SelectContent>
            {state.pathFiles.map((item, index) => (
              <SelectItem key={index} value={index.toString()}>
                {item}
                <div className="h-4 w-4 rounded-full" style={{backgroundColor: colors[index]}}></div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    </div>
  )
}

export default SubMenu;