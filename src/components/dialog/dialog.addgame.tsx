import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { Button } from "../ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"

export default function DialogAddGame() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("")
  
  function addToList() {
    if (category.trim() == "") return false
    setOpen(false)
    setCategory("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="purple">
          <Plus size={18} />
          Add to list
        </Button>
      </DialogTrigger>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>Mortal Kombat X</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-row items-center justify-between">
            <p>Library Category: </p>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectItem value="completed">✅ Completed</SelectItem>
                <SelectItem value="progress">⏱️ Progress</SelectItem>
                <SelectItem value="Wish List">📜 Wish List</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button disabled={category.trim() == "" ? true : false} onClick={addToList} variant="outline" className="w-full mt-12">Add to my List</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

