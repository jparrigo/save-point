import { useState } from "react";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { Button } from "../../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { ArrowLeftRight } from "lucide-react";

export default function ModalMoveGame({ open, onOpenChange }: ModalWrapperProps) {
  const [newLibrary, setNewLibrary] = useState("")
  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Move game to another library"
    >
      <section className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
          <Select defaultValue="Wish List" disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectItem value="Wish List">📜 Wish List</SelectItem>
            </SelectContent>
          </Select>
          <ArrowLeftRight />
          <Select onValueChange={(value) => setNewLibrary(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select the new library" />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectItem value="completed">✅ Completed</SelectItem>
              <SelectItem value="progress">⏱️ Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button disabled={newLibrary.trim() == ""} variant="purple" className="w-full">Move</Button>
      </section>
    </ModalWrapper>
  )
}