import {useStateContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Folder, MapPinPen, Settings, Waves, Waypoints} from "lucide-react";
import PoolMenu from "@/components/poolMenu";
import PathMenu from "@/components/pathMenu";
import WaypointOptionsMenu from "@/components/waypointOptionsMenu";

const TrajectoryList = () => {

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

  const {state, setState} = useStateContext()

  const changeDisplayed = (index: number) => {
    const newDisplayPaths = state.displayPaths
    newDisplayPaths[index] = !newDisplayPaths[index]

    setState({...state, displayPaths: newDisplayPaths})
  }

  return (
      <div className="w-[20vw]">
        <p className="border-b-2 text-center bg-gray-200 p-2 text-lg h-12">Loaded Trajectories</p>
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
                <TableCell><Input type="checkbox" style={{accentColor: colors[i]}} checked={state.displayPaths[i]} onChange={() => changeDisplayed(i)} /></TableCell>
                <TableCell>{file}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

const TrajectoryManager = () => {

  const { state } = useStateContext()
  const [openMenu, setOpenMenu] = useState(0)

  let content = <></>

  switch (openMenu) {
    case 0:
      content = <></>
      break;
    case 1:
      content = <TrajectoryList />
      break;
    case 2:
      content = <PoolMenu />
      break;
    case 3:
      content = <PathMenu />
      break;
    case 4:
      content = <WaypointOptionsMenu />
      break;
  }

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex flex-row items-center justify-center h-full">
        <div className="bg-gray-200 h-full">
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer" onClick={() => setOpenMenu((prev) => prev === 1 ? 0 : 1)}>
            <Folder className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer" onClick={() => setOpenMenu((prev) => prev === 2 ? 0 : 2)}>
            <Waves className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer" onClick={() => setOpenMenu((prev) => prev === 3 ? 0 : 3)}>
            <Waypoints className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer" onClick={() => setOpenMenu((prev) => prev === 4 ? 0 : 4)}>
            <MapPinPen className="w-8 h-8" />
          </div>
          <div className="p-2 hover:bg-gray-300 hover:cursor-pointer">
            <Settings className="w-8 h-8" />
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          {content}
        </div>
      </div>
    </div>
  )
}

export default TrajectoryManager;