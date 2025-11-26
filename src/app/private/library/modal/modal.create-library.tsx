import { useState } from "react";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { toast } from "sonner";
import { instance } from "../../../../lib/axios";
import { getLocalUserData } from "../../../../lib/getLocalUserData";

interface ModalCreateLibraryProps extends ModalWrapperProps {
  callback: () => void
}

export default function ModalCreateLibrary({ open, onOpenChange, callback }: ModalCreateLibraryProps) {
  const [libraryName, setLibraryName] = useState("")

  async function onSubmit() {
    const user = getLocalUserData()
    await instance.post("/custom-list", {
      userId: user?.id,
      name: libraryName
    }).then(() => {
      toast.success("New Library created!")
      onOpenChange(false)
    }).catch(() => {
      toast.error("Some gone wrong!")
    })
    setLibraryName("")

    callback()
  }
  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create new library"
    >
      <section className="flex flex-col gap-6">
        <Input value={libraryName} onChange={({ target }) => setLibraryName(target.value)} placeholder="Name of your new library" />
        <Button disabled={libraryName.trim() == ""} onClick={onSubmit} variant="purple" className="w-full">Create</Button>
      </section>
    </ModalWrapper>
  )
}