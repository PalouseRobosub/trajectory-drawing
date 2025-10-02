'use client'

import {useStateContext, useTrajectoryContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";

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

const PathMenu = () => {

  const { state, setState } = useStateContext()
  const { trajectories, setTrajectories } = useTrajectoryContext()
  const [selectedTrajectory, setSelectedTrajectory] = useState(-1)

  const setName = (name: string, waypointIndex: number) => {
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      name: name
    }

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints
    }

    setTrajectories(newTrajectories)
  }

  const setPosition = (
    newPosition: number,
    waypointIndex: number,
    axis: 'x' | 'y' | 'z'
  ) => {
    if (Number.isNaN(newPosition)) newPosition = 0
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      position: {
        ...newWaypoints[waypointIndex].position,
        [axis]: newPosition,
      },
    }

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  const setOrientation = (
    newOrientation: number,
    waypointIndex: number,
    axis: 'x' | 'y' | 'z' | 'w'
  ) => {
    if (Number.isNaN(newOrientation)) newOrientation = 0
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      orientation: {
        ...newWaypoints[waypointIndex].orientation,
        [axis]: newOrientation,
      },
    }

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  const setVelocity = (velocity: number, waypointIndex: number) => {
    if (Number.isNaN(velocity)) velocity = 0
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      velocity,
    }

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  const setHoldTime = (time: number, waypointIndex: number) => {
    if (Number.isNaN(time)) time = 0
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      hold_time: time,
    }

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  const setBezier = (bezier: boolean, waypointIndex: number) => {
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      bezier,
    }

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  const deleteWaypoint = (waypointIndex: number) => {
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints.splice(waypointIndex, 1)

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  const addWaypoint = () => {
    const newTrajectories = [...trajectories]
    const newWaypoints = [...newTrajectories[selectedTrajectory].waypoints]

    newWaypoints.push({
      seq: newWaypoints.length + 1,
      name: `Waypoint ${newWaypoints.length + 1}`,
      position: { x: 1, y: 1, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 0 },
      velocity: 1,
      hold_time: 0,
      bezier: false,
      controlPoint: { x: 0, y: 0, z: 0 },
    })

    newTrajectories[selectedTrajectory] = {
      ...newTrajectories[selectedTrajectory],
      waypoints: newWaypoints,
    }

    setTrajectories(newTrajectories)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="border-b-2 text-center bg-gray-200 p-2 text-lg w-full h-12">Trajectory Editor</p>
      <div className="flex flex-row items-center justify-center gap-2 p-2 w-full">
        <Label htmlFor="trajSelect" className="text-nowrap">Select Trajectory:</Label>
        <Select onValueChange={(value) => setSelectedTrajectory(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select Trajectory"/>
          </SelectTrigger>
          <SelectContent>
            {state.pathFiles.map((item, index) => (
              <SelectItem key={index} value={index.toString()}>
                {item}
                {colors[index]}
                <div className="h-4 w-4 rounded-full" style={{backgroundColor: colors[index]}}></div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedTrajectory !== -1 &&
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sequence</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead>Depth</TableHead>
                <TableHead>Orientation</TableHead>
                <TableHead>Velocity</TableHead>
                <TableHead>Hold Time</TableHead>
                <TableHead>Bezier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trajectories[selectedTrajectory].waypoints.map((waypoint, i) => {

                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <Input className="w-32" value={waypoint.name} onChange={(e) => setName(e.target.value, i)}/>
                    </TableCell>
                    <TableCell className="flex flex-row items-center">
                      (<Input value={waypoint.position.x} onChange={(e) => setPosition(parseFloat(e.target.value), i, 'x')}
                              className="min-w-14 w-full"/>,
                      <Input value={waypoint.position.y} onChange={(e) => setPosition(parseFloat(e.target.value), i, 'y')}
                             className="min-w-14 w-full"/>)
                    </TableCell>
                    <TableCell>
                      <Input value={waypoint.position.z} onChange={(e) => setPosition(parseFloat(e.target.value), i, 'z')}
                             className="min-w-14 w-full"/>
                    </TableCell>
                    <TableCell className="flex flex-row items-center">
                      (<Input className="min-w-14 w-full" value={waypoint.orientation.x}
                              onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'x')}/>,
                      <Input className="min-w-14 w-full" value={waypoint.orientation.y}
                             onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'y')}/>,
                      <Input className="min-w-14 w-full" value={waypoint.orientation.z}
                             onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'z')}/>,
                      <Input className="min-w-14 w-full" value={waypoint.orientation.w}
                             onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'w')}/>)
                    </TableCell>
                    <TableCell>
                      <Input className="min-w-14 w-full" value={waypoint.velocity}
                             onChange={(e) => setVelocity(parseFloat(e.target.value), i)}/>
                    </TableCell>
                    <TableCell>
                      <Input className="min-w-14 w-full" value={waypoint.hold_time}
                             onChange={(e) => setHoldTime(parseFloat(e.target.value), i)}/>
                    </TableCell>
                    <TableCell>
                      <Input type="checkbox" defaultChecked={waypoint.bezier}
                             onChange={(e) => setBezier(e.target.checked as unknown as boolean, i)}/>
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" className="cursor-pointer" onClick={() => deleteWaypoint(i)}>
                        <Trash/>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Button className="flex flex-row items-center gap-2 cursor-pointer" onClick={addWaypoint}>
            <Plus /> New Waypoint
          </Button>
        </>
      }
    </div>
  )
}

export default PathMenu