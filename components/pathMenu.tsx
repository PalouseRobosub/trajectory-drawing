'use client'

import {useStateContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";

const Path = () => {

  const { state, setState } = useStateContext()

  const setName = (name: string, waypointIndex: number) => {
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      name: name,
    }

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const setPosition = (newPosition: number, waypointIndex: number, axis: 'x'|'y'|'z') => {
    if (Number.isNaN(newPosition)) return
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      position: [
        axis === 'x' ? newPosition : newWaypoints[waypointIndex].position[0],
        axis === 'y' ? newPosition : newWaypoints[waypointIndex].position[1],
        axis === 'z' ? newPosition : newWaypoints[waypointIndex].position[2],
      ]
    }

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const setOrientation = (newOrientation: number, waypointIndex: number, axis: 'x'|'y'|'z'|'w') => {
    if (Number.isNaN(newOrientation)) return
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      orientation: [
        axis === 'x' ? newOrientation : newWaypoints[waypointIndex].orientation[0],
        axis === 'y' ? newOrientation : newWaypoints[waypointIndex].orientation[1],
        axis === 'z' ? newOrientation : newWaypoints[waypointIndex].orientation[2],
        axis === 'w' ? newOrientation : newWaypoints[waypointIndex].orientation[3]
      ]
    }

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const setVelocity = (velocity: number, waypointIndex: number) => {
    if (Number.isNaN(velocity)) return
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      velocity: velocity,
    }

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const setHoldTime = (time: number, waypointIndex: number) => {
    if (Number.isNaN(time)) return
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      holdTime: time,
    }

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const deleteWaypoint = (waypointIndex: number) => {
    const newWaypoints = [...state.waypoints]
    newWaypoints.splice(waypointIndex, 1)

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const addWaypoint = () => {
    const newWaypoints = [...state.waypoints]
    newWaypoints.push({
      name: `Waypoint ${state.waypoints.length}`,
      position: [1, 1, 0],
      orientation: [0, 0, 0, 1],
      velocity: 1,
      holdTime: 0,
    },)

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-semibold">Waypoints</div>
      <Table>{

    }
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead>Depth</TableHead>
            <TableHead>Orientation</TableHead>
            <TableHead>Velocity</TableHead>
            <TableHead>Hold Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.waypoints.map((waypoint, i) => {

            return (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>
                  <Input className="w-32" defaultValue={waypoint.name} onChange={(e) => setName(e.target.value, i)} />
                </TableCell>
                <TableCell className="flex flex-row items-center">
                  (<Input defaultValue={waypoint.position[0]} onChange={(e) => setPosition(parseInt(e.target.value), i, 'x')} className="min-w-14 w-full" />,
                  <Input defaultValue={waypoint.position[1]} onChange={(e) => setPosition(parseInt(e.target.value), i, 'y')} className="min-w-14 w-full" />)
                </TableCell>
                <TableCell>
                  <Input defaultValue={waypoint.position[2]} onChange={(e) => setPosition(parseInt(e.target.value), i, 'z')} className="min-w-14 w-full" />
                </TableCell>
                <TableCell className="flex flex-row items-center">
                  (<Input className="min-w-14 w-full" defaultValue={waypoint.orientation[0]} onChange={(e) => setOrientation(parseInt(e.target.value), i, 'x')} />,
                  <Input className="min-w-14 w-full" defaultValue={waypoint.orientation[1]} onChange={(e) => setOrientation(parseInt(e.target.value), i, 'y')} />,
                  <Input className="min-w-14 w-full" defaultValue={waypoint.orientation[2]} onChange={(e) => setOrientation(parseInt(e.target.value), i, 'z')} />,
                  <Input className="min-w-14 w-full" defaultValue={waypoint.orientation[3]} onChange={(e) => setOrientation(parseInt(e.target.value), i, 'w')} />)
                </TableCell>
                <TableCell>
                  <Input className="min-w-14 w-full" defaultValue={waypoint.velocity} onChange={(e) => setVelocity(parseInt(e.target.value), i)} />
                </TableCell>
                <TableCell>
                  <Input className="min-w-14 w-full" defaultValue={waypoint.holdTime} onChange={(e) => setHoldTime(parseInt(e.target.value), i)} />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" className="cursor-pointer" onClick={() => deleteWaypoint(i)}>
                    <Trash />
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
    </div>
  )
}

export default Path