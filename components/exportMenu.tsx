'use client'

import {useWaypointContext} from "@/components/context";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Waypoint} from "@/app/types";
import {Button} from "@/components/ui/button";
import {FileDown} from "lucide-react";
import YAML from "js-yaml";

const defaultData = {
  name: "mission_trajectory",
  frame_id: "map",
  vehicle_type: "AUV",
  max_linear_velocity: 2,
  max_angular_velocity: 1,
  position_tolerance: 0.5,
  orientation_tolerance: 0.1,
  max_depth: 50,
  emergency_surface: true,
  collision_avoidance: true,
  filename: "My_Mission",
}

const ExportMenu = () => {

  const [trajectoryData, setTrajectoryData] = useState(defaultData);

  const { waypoints } = useWaypointContext()

  const prepareData = (waypoints: Waypoint[], trajectoryData: typeof defaultData) => {

    return {
      trajectory: {
        name: trajectoryData.name,
        frame_id: trajectoryData.frame_id,
        vehicle_type: trajectoryData.vehicle_type,
        waypoints: waypoints,
        parameters: {
          max_linear_velocity: trajectoryData.max_linear_velocity,
          max_angular_velocity: trajectoryData.max_angular_velocity,
          position_tolerance: trajectoryData.position_tolerance,
          orientation_tolerance: trajectoryData.orientation_tolerance,
        },
        safety: {
          max_depth: trajectoryData.max_depth,
          emergency_surface: trajectoryData.emergency_surface,
          collision_avoidance: trajectoryData.collision_avoidance,
        }
      }
    }
  }

  const exportYaml = () => {
    const data = prepareData(waypoints, trajectoryData);
    const yamlData = YAML.dump(data);
    const blob = new Blob([yamlData], { type: "application/yaml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${trajectoryData.filename}.yaml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-semibold text-nowrap">Export Path</div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Name:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.name} onChange={(e) => setTrajectoryData({...trajectoryData, name: e.target.value})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Frame ID:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.frame_id} onChange={(e) => setTrajectoryData({...trajectoryData, frame_id: e.target.value})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Vehicle Type:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.vehicle_type} onChange={(e) => setTrajectoryData({...trajectoryData, vehicle_type: e.target.value})} />
      </div>
      <div className="font-semibold">Parameters</div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Max Linear Velocity:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.max_linear_velocity} onChange={(e) => setTrajectoryData({...trajectoryData, max_linear_velocity: parseFloat(e.target.value)})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Max Angular Velocity:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.max_angular_velocity} onChange={(e) => setTrajectoryData({...trajectoryData, max_angular_velocity: parseFloat(e.target.value)})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Position Tolerance:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.position_tolerance} onChange={(e) => setTrajectoryData({...trajectoryData, position_tolerance: parseFloat(e.target.value)})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Orientation Tolerance:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.orientation_tolerance} onChange={(e) => setTrajectoryData({...trajectoryData, orientation_tolerance: parseFloat(e.target.value)})} />
      </div>
      <div className="font-semibold">Safety</div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Max Depth:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.max_depth} onChange={(e) => setTrajectoryData({...trajectoryData, max_depth: parseFloat(e.target.value)})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Emergency Surface:
        <Input type="checkbox" className="min-w-32 w-full accent-neutral-900" defaultChecked={trajectoryData.emergency_surface} onChange={(e) => setTrajectoryData({...trajectoryData, emergency_surface: e.target.checked})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        Collision Avoidance:
        <Input type="checkbox" className="min-w-32 w-full accent-neutral-900" defaultChecked={trajectoryData.collision_avoidance} onChange={(e) => setTrajectoryData({...trajectoryData, collision_avoidance: e.target.checked})} />
      </div>
      <div className="flex flex-row items-center gap-2 text-nowrap">
        File Name:
        <Input className="min-w-32 w-full" defaultValue={trajectoryData.filename} onChange={(e) => setTrajectoryData({...trajectoryData, filename: e.target.value})} />
      </div>
      <Button className="cursor-pointer" onClick={exportYaml}><FileDown /> Export YAML</Button>
    </div>
  )
}

export default ExportMenu