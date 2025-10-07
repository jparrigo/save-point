import { useEffect, useState } from "react";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { instance } from "../../../../lib/axios";
import { useNavigate, useParams } from "react-router";

export default function ModalListOfFriends({ open, onOpenChange }: ModalWrapperProps) {
  const nagivate = useNavigate()
  const [listOfFriends, setListOfFriends] = useState<{
    id: string
    email: string
    username: string
  }[]>([])
  const { id } = useParams<{ id: string }>()

  async function getFriends() {
    await instance.post(`social/friends/${id}`)
      .then((res) => {
        console.log(res.data);
        setListOfFriends(res.data)
      })
  }

  useEffect(() => {
    if (open) {
      getFriends()
    }
  }, [open])

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="List of Friends"
    >
      <section className="flex flex-col gap-6">
        {
          listOfFriends.length == 0
            ? "No friends yet..."
            : null
        }
        {
          listOfFriends.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  onOpenChange(false)
                  nagivate(`/account/${item.id}`)
                }}
                className="cursor-pointer hover:bg-white/5 hover:border-white transition-all border border-white/30 py-2 px-4 rounded-md flex flex-row items-center justify-between"
              >
                <span>{item.username}</span>
                <span className="text-white/30 text-sm">{item.id}</span>
              </div>
            )
          })
        }
      </section>
    </ModalWrapper>
  )
}