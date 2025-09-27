import {Switch} from "@/components/ui/switch";
import {useStateContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Folder, MapPinPen, Settings, Waves, Waypoints} from "lucide-react";


const TrajectoryManager = () => {

  const { state } = useStateContext()
  const [openMenu, setOpenMenu] = useState(0)

  return (
    <div className="w-1/3 h-full bg-white flex flex-col border-1 border-gray-800">
      <div className="flex flex-row justify-center items-center gap-4 p-2 bg-gray-200">
        Viewport
        <Switch className="data-[state=unchecked]:bg-green-400 bg-gray-300" />
        Trajectory Editor
      </div>
      <div className="flex flex-row items-center justify-center h-full">
        <div className="bg-gray-200 h-full">
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer">
            <Folder className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer">
            <Waves className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer">
            <Waypoints className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer">
            <MapPinPen className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer">
            <Settings className="w-8 h-8" />
          </div>
        </div>
        <div className="flex-1 h-full">
          <p className="border-b-2 text-center">Loaded Trajectories</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Display</TableHead>
                <TableHead>Filename</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.pathFiles.map((file, i) => (
                <TableRow key={i}>
                  <TableCell><Input type="checkbox" /></TableCell>
                  <TableCell>{file}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TrajectoryManager;