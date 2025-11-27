import { useEffect, useState } from "react";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { Button } from "../../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import { instance } from "../../../../lib/axios";
import { getLocalUserData } from "../../../../lib/getLocalUserData";
import { toast } from "sonner";

interface ModalMoveGameProps extends ModalWrapperProps {
  callback?: () => void
  data: {
    listId: string
    listName: string
    gameId: string
  }
}

export default function ModalMoveGame({ open, onOpenChange, callback, data }: ModalMoveGameProps) {
  const [newLibrary, setNewLibrary] = useState("")
  const [customLits, setCustomList] = useState<{ id: string, name: string }[]>([])
  const user = getLocalUserData()


  async function addGame() {
    const user = getLocalUserData()
    return instance.post('/custom-list/items', {
      userId: user?.id,
      listId: newLibrary,
      gameId: data.gameId
    })
  }

  async function removeGame() {
    return instance.delete('/custom-list/items', {
      data: {
        userId: user?.id,
        listId: data.listId,
        gameId: data.gameId
      }
    })
  }

  async function getLists() {
    await instance.get(`/custom-list/user/${user?.id}`).then((res) => {
      setCustomList(res.data)
    })
  }

  async function handleMove() {
    if (newLibrary.trim() === "" || newLibrary === data.listId) return

    try {
      await removeGame()
      await addGame()
      toast.success("Game moved successfully!")
      setNewLibrary("")
      onOpenChange?.(false)
      callback?.()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error to move game.")
      console.error(error)
    }
  }

  useEffect(() => {
    if (open) {
      getLists()
    }
  }, [open])

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Move game to another library"
    >
      <section className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
          <Select defaultValue={data.listId} disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectItem value={data.listId}>{data.listName}</SelectItem>
            </SelectContent>
          </Select>
          <ArrowLeftRight />
          <Select
            disabled={customLits.length <= 0}
            onValueChange={(value) => setNewLibrary(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select the new library" />
            </SelectTrigger>
            <SelectContent className="dark">
              {
                customLits
                  .filter((item) => item.id !== data.listId)
                  .map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
              }
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={newLibrary.trim() === "" || newLibrary === data.listId}
          variant="purple"
          className="w-full"
          onClick={handleMove}
        >
          Move
        </Button>
      </section>
    </ModalWrapper>
  )
}