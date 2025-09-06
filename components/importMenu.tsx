'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useWaypointContext} from "@/components/context";
import YAML from "js-yaml"
import {Waypoint} from "@/app/types";

const ImportMenu = () => {

  const [file, setFile] = useState<File | null>(null);
  const { setWaypoints } = useWaypointContext()

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const obj = YAML.load(text) as {trajectory: { waypoints: Waypoint[]}};
      if (!obj) return;
      if (!obj.trajectory) return;
      const waypoints = obj.trajectory.waypoints;
      if (!waypoints) return;
      setWaypoints(waypoints);
    }
    reader.readAsText(file);
  }, [file, setWaypoints]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-semibold text-nowrap">Import Path from YAML</div>
      <div className="flex flex-row items-center gap-2">
        <Label htmlFor="upload"> File:</Label>
        <Input id="upload" type="file" className="w-96" onChange={(e) => e.target.files ? setFile(e.target.files[0]) : null} />
      </div>
    </div>
  )
}

export default ImportMenu