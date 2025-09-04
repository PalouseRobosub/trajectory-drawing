'use client'

import {useStateContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";

const Path = () => {

  const { state, setState } = useStateContext()

  const setX = (x: number, waypointIndex: number) => {

    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = [x, newWaypoints[waypointIndex][1], newWaypoints[waypointIndex][2]]

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const setY = (y: number, waypointIndex: number) => {
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = [
      newWaypoints[waypointIndex][0],
      y,
      newWaypoints[waypointIndex][2],
    ]

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  const setZ = (z: number, waypointIndex: number) => {
    const newWaypoints = [...state.waypoints]
    newWaypoints[waypointIndex] = [
      newWaypoints[waypointIndex][0],
      newWaypoints[waypointIndex][1],
      z,
    ]

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
    newWaypoints.push([0, 0, 0])

    setState({
      ...state,
      waypoints: newWaypoints,
    })
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead>Depth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.waypoints.map((waypoint, i) => {

            return (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell className="flex flex-row items-center">
                  (<Input defaultValue={waypoint[0]} onChange={(e) => setX(parseInt(e.target.value), i)} className="w-14" />, <Input defaultValue={waypoint[1]} onChange={(e) => setY(parseInt(e.target.value), i)} className="w-14" />)
                </TableCell>
                <TableCell>
                  <Input defaultValue={waypoint[2]} onChange={(e) => setZ(parseInt(e.target.value), i)} className="w-14" />
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