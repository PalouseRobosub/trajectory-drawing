import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useObstacleContext} from "@/components/context";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {BoxArgs, CylinderArgs, ObstacleShape, SphereArgs} from "@/app/types";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Plus, Trash} from "lucide-react";

const ObstaclesMenu = () => {

  const { obstacles, setObstacles } = useObstacleContext();

  const newObstacle = () => {
    const newObstacles = [...obstacles];
    newObstacles.push(
      {
        shape: ObstacleShape.Sphere,
        position: {
          x: 1,
          y: 1,
          z: 0
        },
        rotation: undefined,
        args: {
          radius: 0.5
        },
        color: "#ff0000"
      }
    )

    setObstacles(newObstacles);
  }

  const deleteObstacle = (index: number) => {
    const newObstacles = [...obstacles];
    newObstacles.splice(index, 1);
    console.log(index);
    setObstacles(newObstacles);
  }

  const setShape = (shape: ObstacleShape, index: number) => {
    const newObstacles = [...obstacles];
    let args;
    switch (shape) {
      case ObstacleShape.Sphere: args = {
        radius: 0.5
      }
      break;
      case ObstacleShape.Cylinder: args = {
        radiusTop: 0.5,
        radiusBottom: 0.5,
        height: 1
      }
      break;
      case ObstacleShape.Box: args = {
        width: 1,
        height: 1,
        depth: 1
      }
      break;
    }
    newObstacles[index] = {
      ...newObstacles[index],
      shape: shape,
      args: args
    }

    setObstacles(newObstacles);
  }

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

  const setArgs = (r: number, index: number, key: string) => {
    if (Number.isNaN(r)) r = 0;
    const newObstacles = [...obstacles];
    newObstacles[index] = {
      ...newObstacles[index],
      args: {
        ...newObstacles[index].args,
        [key]: r
      }
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
            return (
              <TableRow key={index}>
                <TableCell>
                  <Select value={obstacle.shape.toString()} onValueChange={(value) => setShape(Number.parseInt(value), index)}>
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
                      <Input id="radius" className="w-14" value={(obstacle.args as SphereArgs).radius} onChange={(e) => setArgs(parseFloat(e.target.value), index, "radius")} />
                    </div>
                  }
                  {obstacle.shape === ObstacleShape.Cylinder &&
                    <div className="flex flex-row items-center">
                      <Label htmlFor="radiusTop">Radius Top:&nbsp;</Label>
                      <Input id="radiusTop" className="w-14" value={(obstacle.args as CylinderArgs).radiusTop} onChange={(e) => setArgs(parseFloat(e.target.value), index, "radiusTop")} />
                      <Label htmlFor="radiusBottom">Radius Bottom:&nbsp;</Label>
                      <Input id="radiusBottom" className="w-14" value={(obstacle.args as CylinderArgs).radiusBottom} onChange={(e) => setArgs(parseFloat(e.target.value), index, "radiusBottom")} />
                      <Label htmlFor="height">Height:&nbsp;</Label>
                      <Input id="height" className="w-14" value={(obstacle.args as CylinderArgs).height} onChange={(e) => setArgs(parseFloat(e.target.value), index, "height")} />
                    </div>
                  }
                  {obstacle.shape === ObstacleShape.Box &&
                    <div className="flex flex-row items-center">
                      <Label htmlFor="width">Width:&nbsp;</Label>
                      <Input id="width" className="w-14" value={(obstacle.args as BoxArgs).width} onChange={(e) => setArgs(parseFloat(e.target.value), index, "width")} />
                      <Label htmlFor="height">Height:&nbsp;</Label>
                      <Input id="height" className="w-14" value={(obstacle.args as BoxArgs).height} onChange={(e) => setArgs(parseFloat(e.target.value), index, "height")} />
                      <Label htmlFor="depth">Depth:&nbsp;</Label>
                      <Input id="depth" className="w-14" value={(obstacle.args as BoxArgs).depth} onChange={(e) => setArgs(parseFloat(e.target.value), index, "depth")} />
                    </div>
                  }
                </TableCell>
                <TableCell>
                  <Input type="color" className="aspect-square p-[4px]" value={obstacle.color} onChange={(e) => setColor(e.target.value, index)} />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" className="cursor-pointer" onClick={() => deleteObstacle(index)}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Button onClick={newObstacle} className="cursor-pointer">
        <Plus /> Add Obstacle
      </Button>
    </div>
  )
}

export default ObstaclesMenu;