import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { DialogDescription } from "@radix-ui/react-dialog"
import { GameData } from "../../app/private/game/Game"
import { instance } from "../../lib/axios"

export default function DialogAddGame({ data }: { data: GameData }) {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("Wish List")
  const [isInWish, setIsInWish] = useState(false)
  
  async function addToList() {
    if (category.trim() == "") return false
    const userLocalData = localStorage.getItem("@savepoint/login")
    const user = JSON.parse(userLocalData ? userLocalData : "")
    await instance.post("/wishlist", {
      gameId: data.id,
      userId: user.id
    }).then(() => {
      setOpen(false)
      setCategory("")
    })
  }

  async function getWishGame() {
    // Mandar o pessoal do back-end criar uma rota para verificar se o game esta na wishlist (passando id do game e id do usuario)
    const userLocalData = localStorage.getItem("@savepoint/login")
    const user = JSON.parse(userLocalData ? userLocalData : "")
    const ret = await instance.get(`/wishlist/${user.id}`)
    const retData: [] = ret.data
    const find = retData.find((item: any) => item.game.id == data.id)
    if (find) {
      setIsInWish(true)
    }
  }

  useEffect(() => {
    getWishGame()
  },[])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={isInWish}>
        {
          isInWish ?
          (
            <div className="bg-gray-800 outline outline-gray-600 text-gray-500 transition-all flex items-center rounded-md gap-2 h-9 px-3 py-2 text-sm">
              In Wish List
            </div>
          ) : (
            <div className="bg-purple-800 outline outline-purple-600 text-purple-300 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:text-purple-100 cursor-pointer flex items-center rounded-md gap-2 h-9 px-3 py-2 text-sm">
              <Plus size={18}/>
              Add to list
            </div>
          )
        }
        
      </DialogTrigger>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex flex-row items-center justify-between">
            <p>Library Category: </p>
            <Select onValueChange={(value) => setCategory(value)} defaultValue="Wish List" disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="dark">
                {/* <SelectItem value="completed">✅ Completed</SelectItem>
                <SelectItem value="progress">⏱️ Progress</SelectItem> */}
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

