import {Switch} from "@/components/ui/switch";
import {useStateContext} from "@/components/context";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";


const TrajectoryManager = () => {

  const { state } = useStateContext()

  return (
    <div className="w-1/3 h-full bg-white flex flex-row">
      <div className="bg-red-500 h-full w-20">

      </div>
      <div className="flex-1">
        <div className="flex flex-row justify-center items-center gap-4 p-2">
          Viewport
          <Switch />
          Trajectory Editor
        </div>
        <div>
          <p className="border-b-2 text-center">Loaded Trajectories</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Display</TableHead>
                <TableHead>Filename</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.pathFiles.map((file, i) => (
                <TableRow key={i}>
                  <TableCell><Input type="checkbox" /></TableCell>
                  <TableCell>{file}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  )
}

export default TrajectoryManager;