import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useObstacleContext} from "@/components/context";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {BoxArgs, CylinderArgs, ObstacleShape, SphereArgs} from "@/app/types";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";

const ObstaclesMenu = () => {

  const { obstacles, setObstacles } = useObstacleContext()

  const setPos = (
    value: number,
    index: number,
    axis: "x"|"y"|"z"
  ) => {
    if (Number.isNaN(value)) value = 0;
    const newObstacles = [...obstacles];
    newObstacles[index] = {
      ...newObstacles[index],
      position: {
        ...newObstacles[index].position,
        [axis]: value,
      }
    }

    setObstacles(newObstacles);
  }

  const setColor = (color: string, index: number) => {
    const newObstacles = [...obstacles];
    newObstacles[index] = {
      ...newObstacles[index],
      color: color,
    }

    setObstacles(newObstacles);
  }

  return (
    <div className="flex flex-col items-center gap-2 min-w-[20vw]">
      <p className="border-b-2 text-center bg-gray-200 p-2 text-lg w-full h-12">Obstacles</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shape</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Args</TableHead>
            <TableHead>Color</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {obstacles.map((obstacle, index) => {
            let args;
            switch (obstacle.shape) {
              case ObstacleShape.Sphere: args = obstacle.args as SphereArgs; break;
              case ObstacleShape.Box: args = obstacle.args as BoxArgs; break;
              case ObstacleShape.Cylinder: args = obstacle.args as CylinderArgs; break;
            }

            return (
              <TableRow key={index}>
                <TableCell>
                  <Select value={obstacle.shape.toString()}>
                    <SelectTrigger className="w-max">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ObstacleShape.Sphere.toString()}>Sphere</SelectItem>
                      <SelectItem value={ObstacleShape.Cylinder.toString()}>Cylinder</SelectItem>
                      <SelectItem value={ObstacleShape.Box.toString()}>Box</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="flex flex-row items-center">
                  (<Input value={obstacle.position.x} onChange={(e) => setPos(parseFloat(e.target.value), index, "x")} className="w-14" />,
                  <Input value={obstacle.position.y} onChange={(e) => setPos(parseFloat(e.target.value), index, "y")} className="w-14" />,
                  <Input value={obstacle.position.z} onChange={(e) => setPos(parseFloat(e.target.value), index, "z")} className="w-14" />)
                </TableCell>
                <TableCell>
                  {obstacle.shape === ObstacleShape.Sphere &&
                    <div className="flex flex-row items-center">
                      <Label htmlFor="radius">Radius:&nbsp;</Label>
                      <Input id="radius" className="w-14" value={args.radius} />
                    </div>
                  }
                </TableCell>
                <TableCell>
                  <Input type="color" className="w-8 p-0.5" value={obstacle.color} onChange={(e) => setColor(e.target.value, index)} />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" className="cursor-pointer">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ObstaclesMenu;