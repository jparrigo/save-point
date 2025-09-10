import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export interface ModalWrapperProps {
  open: boolean,
  onOpenChange: (value: boolean) => void,
  callback?: () => void,
  title?: string
  children?: ReactNode
}

export default function ModalWrapper({ open, onOpenChange, children, title }: ModalWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {
          children
        }
      </DialogContent>
    </Dialog>
  )
}