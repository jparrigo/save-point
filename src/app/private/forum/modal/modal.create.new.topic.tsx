import { useState } from "react";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { toast } from "sonner";
import { instance } from "../../../../lib/axios";
import { getLocalUserData } from "../../../../lib/getLocalUserData";
import { AxiosError } from "axios";

interface ModalCreateNewTopicProps extends ModalWrapperProps {
  callback: () => void
  gameId: string
}

export default function ModalCreateNewTopic({ open, onOpenChange, callback, gameId }: ModalCreateNewTopicProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  async function onSubmit() {
    const user = getLocalUserData()
    await instance.post(`/forums/game/${gameId}/user/${user?.id}/topics`, {
      title: title,
      message: message
    }).then(() => {
      toast.success("New topic created!")
      setMessage("")
      setTitle("")

      callback()
      onOpenChange(false)
    }).catch((error: any) => {
      console.log(error);

      toast.error(error.response?.data.message[0])
    })
  }
  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create new Topic"
    >
      <section className="flex flex-col gap-6">
        <Input value={title} onChange={({ target }) => setTitle(target.value)} placeholder="Title" />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here"
          className="w-full p-4 rounded-md bg-[#141414] border border-[#303030] text-slate-100 h-40 mb-5 max-md:text-sm"
        />
        <Button disabled={title.trim() === "" || message.trim() === ""} onClick={onSubmit} variant="purple" className="w-full">Create</Button>
      </section>
    </ModalWrapper>
  )
}