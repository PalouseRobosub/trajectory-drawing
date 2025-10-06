import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useObstacleContext} from "@/components/context";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ObstacleShape} from "@/app/types";

const ObstaclesMenu = () => {

  const { obstacles, setObstacles } = useObstacleContext()

  return (
    <div className="flex flex-col items-center gap-2 w-[20vw]">
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ObstacleShape.Sphere.toString()}>Sphere</SelectItem>
                      <SelectItem value={ObstacleShape.Cylinder.toString()}>Cylinder</SelectItem>
                      <SelectItem value={ObstacleShape.Box.toString()}>Box</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ObstaclesMenu;