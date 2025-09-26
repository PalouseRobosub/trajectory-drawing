import { Label } from "./ui/label";
import {Input} from "@/components/ui/input";

const FolderMenu = () => {


  return (
    <div>
      <Label htmlFor="projectFolder">Project Folder</Label>
      <Input type="file" id="projectFolder" />
    </div>
  )
}

export default FolderMenu;