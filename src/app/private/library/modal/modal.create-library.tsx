import { useState } from "react";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export default function ModalCreateLibrary({ open, onOpenChange }: ModalWrapperProps) {
  const [libraryName, setLibraryName] = useState("")
  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create new library"
    >
      <section className="flex flex-col gap-6">
        <Input value={libraryName} onChange={({ target }) => setLibraryName(target.value)} placeholder="Name of your new library" />
        <Button disabled={libraryName.trim() == ""} variant="purple" className="w-full">Create</Button>
      </section>
    </ModalWrapper>
  )
}