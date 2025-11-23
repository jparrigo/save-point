import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"
import { GameData } from "./Game"
import { instance } from "../../../lib/axios"
import { getLocalUserData } from "../../../lib/getLocalUserData"
import { toast } from "sonner"

export default function DialogAddGame({ data }: { data: GameData }) {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [customLits, setCustomList] = useState<{ id: string, name: string }[]>([])
  const [isInWish, setIsInWish] = useState(false)
  const user = getLocalUserData()

  async function addToList() {
    if (category.trim() == "") return false
    await instance.post("/custom-list/items", {
      gameId: data.id,
      listId: category,
      userId: user?.id
    }).then(() => {
      setOpen(false)
      setCategory("")
      setIsInWish(true)
    }).catch((error) => {
      toast.info(error.response.data.message)
    })
  }

  async function getLists() {
    await instance.get(`/custom-list/user/${user?.id}`).then((res) => {
      setCustomList(res.data)
    })
  }

  useEffect(() => {
    if (open) {
      getLists()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={isInWish}>
        <div className="bg-purple-800 outline outline-purple-600 text-purple-300 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:text-purple-100 cursor-pointer flex items-center rounded-md gap-2 h-9 px-3 py-2 text-sm">
          <Plus size={18} />
          Add to list
        </div>
      </DialogTrigger>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
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
                {
                  customLits.map((item) => {
                    return <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  })
                }
              </SelectContent>
            </Select>
          </div>
          <Button disabled={category.trim() == "" ? true : false} onClick={addToList} variant="outline" className="w-full mt-12">Add to my List</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

