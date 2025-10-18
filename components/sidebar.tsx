'use client'

import {useStateContext, useTrajectoryContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Folder, Save, Settings, Ship, TrafficCone, Waves, Waypoints} from "lucide-react";
import PoolMenu from "@/components/poolMenu";
import PathMenu from "@/components/pathMenu";
import SettingsMenu from "@/components/settingsMenu";
import {Button} from "@/components/ui/button";
import ObstaclesMenu from "@/components/obstaclesMenu";
import SubMenu from "@/components/subMenu";

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

const Sidebar = () => {

  const { state, setState } = useStateContext()
  const { trajectories } = useTrajectoryContext()
  const [openMenu, setOpenMenu] = useState(0)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const saveTrajectories = async () => {
    for (const trajectory of trajectories) {
      const index = trajectories.indexOf(trajectory);
      const data = {
        trajectory: trajectory,
      }

      await fetch(`/api/${state.pathFiles[index]}`, {method: "PUT", body: JSON.stringify(data)}).then((res) => res.text()).then(text => console.log(text))
    }
    setState({...state, unsaved: false})
  }

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
      content = <ObstaclesMenu />
      break;
    case 5:
      content = <SubMenu />
      break;
    case 6:
      content = <SettingsMenu />
      break;
  }

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex flex-row items-center justify-center h-full">
        <div className="bg-gray-200 h-full">
          <div className={`p-2 hover:bg-gray-300 hover:cursor-pointer ${openMenu === 1 ? "bg-gray-300" : ""}`} onClick={() => setOpenMenu((prev) => prev === 1 ? 0 : 1)}>
            <Folder className="w-8 h-8" />
          </div>
          <div className={`p-2 hover:bg-gray-300 hover:cursor-pointer ${openMenu === 2 ? "bg-gray-300" : ""}`} onClick={() => setOpenMenu((prev) => prev === 2 ? 0 : 2)}>
            <Waves className="w-8 h-8" />
          </div>
          <div className={`p-2 hover:bg-gray-300 hover:cursor-pointer ${openMenu === 3 ? "bg-gray-300" : ""}`} onClick={() => setOpenMenu((prev) => prev === 3 ? 0 : 3)}>
            <Waypoints className="w-8 h-8" />
          </div>
          <div className={`p-2 hover:bg-gray-300 hover:cursor-pointer ${openMenu === 4 ? "bg-gray-300" : ""}`} onClick={() => setOpenMenu((prev) => prev === 4 ? 0 : 4)}>
            <TrafficCone className="w-8 h-8" />
          </div>
          <div className={`p-2 hover:bg-gray-300 hover:cursor-pointer ${openMenu === 5 ? "bg-gray-300" : ""}`} onClick={() => setOpenMenu((prev) => prev === 5 ? 0 : 5)}>
            <Ship className="w-8 h-8" />
          </div>
          <div className={`p-2 hover:bg-gray-300 hover:cursor-pointer ${openMenu === 6 ? "bg-gray-300" : ""}`} onClick={() => setOpenMenu((prev) => prev === 6 ? 0 : 6)}>
            <Settings className="w-8 h-8" />
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          {content}
        </div>
      </div>
      <div className="py-4 gap-2 flex flex-col items-center justify-center w-12 bg-gray-200">
        {mounted && <div className={`h-4 w-4 ${state.unsaved ? "bg-red-500" : "bg-green-500"} rounded-full`}></div>}
        <Button className="p-3" onClick={saveTrajectories}>
          <Save />
        </Button>
      </div>
    </div>
  )
}

export default Sidebar;