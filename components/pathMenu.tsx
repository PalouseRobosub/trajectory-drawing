'use client'

import {useWaypointContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";

const Path = () => {

  const { waypoints, setWaypoints } = useWaypointContext()

  const setName = (name: string, waypointIndex: number) => {
    const newWaypoints = [...waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      name: name,
    }

    setWaypoints(newWaypoints)
  }

  const setPosition = (newPosition: number, waypointIndex: number, axis: 'x'|'y'|'z') => {
    if (Number.isNaN(newPosition)) return
    const newWaypoints = [...waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      position: {
        x: axis === 'x' ? newPosition : newWaypoints[waypointIndex].position.x,
        y: axis === 'y' ? newPosition : newWaypoints[waypointIndex].position.y,
        z: axis === 'z' ? newPosition : newWaypoints[waypointIndex].position.z,
      }
    }

    setWaypoints(newWaypoints)
  }

  const setOrientation = (newOrientation: number, waypointIndex: number, axis: 'x'|'y'|'z'|'w') => {
    if (Number.isNaN(newOrientation)) return
    const newWaypoints = [...waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      orientation: {
        x: axis === 'x' ? newOrientation : newWaypoints[waypointIndex].orientation.x,
        y: axis === 'y' ? newOrientation : newWaypoints[waypointIndex].orientation.y,
        z: axis === 'z' ? newOrientation : newWaypoints[waypointIndex].orientation.z,
        w: axis === 'w' ? newOrientation : newWaypoints[waypointIndex].orientation.w,
      }
    }

    setWaypoints(newWaypoints)
  }

  const setVelocity = (velocity: number, waypointIndex: number) => {
    if (Number.isNaN(velocity)) return
    const newWaypoints = [...waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      velocity: velocity,
    }

    setWaypoints(newWaypoints)
  }

  const setHoldTime = (time: number, waypointIndex: number) => {
    if (Number.isNaN(time)) return
    const newWaypoints = [...waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      hold_time: time,
    }

    setWaypoints(newWaypoints)
  }

  const setBezier = (bezier: boolean, waypointIndex: number) => {
    const newWaypoints = [...waypoints]
    newWaypoints[waypointIndex] = {
      ...newWaypoints[waypointIndex],
      bezier: bezier,
    }

    setWaypoints(newWaypoints)
  }

  const deleteWaypoint = (waypointIndex: number) => {
    const newWaypoints = [...waypoints]
    newWaypoints.splice(waypointIndex, 1)

    setWaypoints(newWaypoints)
  }

  const addWaypoint = () => {
    const newWaypoints = [...waypoints]
    newWaypoints.push({
      seq: waypoints.length + 1,
      name: `Waypoint ${waypoints.length + 1}`,
      position: {
        x: 1,
        y: 1,
        z: 0,
      },
      orientation: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      velocity: 1,
      hold_time: 0,
      bezier: false,
      controlPoint: {
        x: 0,
        y: 0,
        z: 0,
      }
    },)

    setWaypoints(newWaypoints)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-semibold">Waypoints</div>
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
          {waypoints.map((waypoint, i) => {

            return (
              <TableRow key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>
                  <Input className="w-32" defaultValue={waypoint.name} onChange={(e) => setName(e.target.value, i)} />
                </TableCell>
                <TableCell className="flex flex-row items-center">
                  (<Input defaultValue={waypoint.position.x} onChange={(e) => setPosition(parseFloat(e.target.value), i, 'x')} className="min-w-14 w-full" />,
                  <Input defaultValue={waypoint.position.y} onChange={(e) => setPosition(parseFloat(e.target.value), i, 'y')} className="min-w-14 w-full" />)
                </TableCell>
                <TableCell>
                  <Input defaultValue={waypoint.position.z} onChange={(e) => setPosition(parseFloat(e.target.value), i, 'z')} className="min-w-14 w-full" />
                </TableCell>
                <TableCell className="flex flex-row items-center">
                  (<Input className="min-w-14 w-full" defaultValue={waypoint.orientation.x} onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'x')} />,
                  <Input className="min-w-14 w-full" defaultValue={waypoint.orientation.y} onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'y')} />,
                  <Input className="min-w-14 w-full" defaultValue={waypoint.orientation.z} onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'z')} />,
                  <Input className="min-w-14 w-full" defaultValue={waypoint.orientation.w} onChange={(e) => setOrientation(parseFloat(e.target.value), i, 'w')} />)
                </TableCell>
                <TableCell>
                  <Input className="min-w-14 w-full" defaultValue={waypoint.velocity} onChange={(e) => setVelocity(parseFloat(e.target.value), i)} />
                </TableCell>
                <TableCell>
                  <Input className="min-w-14 w-full" defaultValue={waypoint.hold_time} onChange={(e) => setHoldTime(parseFloat(e.target.value), i)} />
                </TableCell>
                <TableCell>
                  <Input type="checkbox" defaultChecked={waypoint.bezier} onChange={(e) => setBezier(e.target.checked as unknown as boolean, i)}/>
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