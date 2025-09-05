import {Download, MapPinPen, Waves, Waypoints} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import PoolMenu from "@/components/poolMenu";
import PathMenu from "@/components/pathMenu";
import ExportMenu from "@/components/exportMenu";
import WaypointOptionsMenu from "@/components/waypointOptionsMenu";

const Controls = () => {

  return (
    <div className="fixed right-0 h-screen flex flex-col justify-center z-20 pr-2 gap-4">
      <div className="bg-white p-2 flex flex-col gap-2 text-lg rounded-xl">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="cursor-pointer aspect-square">
              <Waves className="scale-150" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-min" side="left">
            <PoolMenu />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="cursor-pointer aspect-square">
              <Waypoints className="scale-150" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-min" side="left">
            <PathMenu />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="cursor-pointer aspect-square">
              <MapPinPen className="scale-150" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-min" side="left">
            <WaypointOptionsMenu />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="cursor-pointer aspect-square">
              <Download className="scale-150" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-min" side="left">
            <ExportMenu />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Controls