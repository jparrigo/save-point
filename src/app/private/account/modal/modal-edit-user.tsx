
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper, { ModalWrapperProps } from "../../../../components/modal-wrapper/ModalWrapper";
import { instance } from "../../../../lib/axios";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const FormSchema = z.object({
  username: z.string({
    required_error: "Username is required"
  }).min(3, {
    message: "Must be 3 or more characters long"
  }),
  email: z.string().email({ message: "Invalid email address" }),
})

interface ModalEditUserProps extends ModalWrapperProps {
  user: {
    id: string
    username: string
    email: string
  }
}

export default function ModalEditUser({ onOpenChange, open, callback, user }: ModalEditUserProps) {
  const [disabledSaveButton, setDisabledSaveButton] = useState(true)
  const [openAlert, setOpenAlert] = useState(false)
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
    }
  })

  useEffect(() => {
    form.setValue("email", user.email)
    form.setValue("username", user.username)
  }, [user])

  useEffect(() => {
    if (form.getValues("email") != user.email || form.getValues("username") != user.username) {
      setDisabledSaveButton(false)
    } else {
      setDisabledSaveButton(true)
    }
  }, [form.watch("username")])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await instance.put(`/user/${user.id}`, {
      username: data.username,
      email: data.email
    }).then(() => {
      localStorage.setItem("@savepoint/login", JSON.stringify({
        id: user.id,
        username: data.username,
        email: data.email
      }))
      setDisabledSaveButton(true)
      onOpenChange(false)
      callback
    })
  }

  async function deleteAccount() {
    if (password.trim() === "") return toast.info("Password is empty!")

    await instance.delete(`/user/${user.id}`, {
      data: {
        password: password
      }
    }).then(() => {
      localStorage.clear()
      navigate("/")
    }).catch((err) => {
      console.log(err);
      toast.error("Can't delete user!")
    })
  }

  return (
    <ModalWrapper
      title="Edit user"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div>
        <ModalWrapper
          open={openAlert}
          onOpenChange={setOpenAlert}
        >
          <div>
            <h1 className="font-bold">Are you sure you want delete this account?</h1>
            <p className="text-white/60">This action will delete all user data.</p>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} className="my-4" placeholder="Confirm your password" />
            <div className="flex flex-row items-center justify-end gap-2">
              <Button onClick={() => setOpenAlert(false)}>Cancel</Button>
              <Button variant="destructive" onClick={deleteAccount}>Delete</Button>
            </div>
          </div>
        </ModalWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="savepoint" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="savepoint@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={disabledSaveButton} type="submit" variant="purple" className="w-full mt-6">Save</Button>
            <Button onClick={() => setOpenAlert(true)} type="button" variant="destructive" className="w-full mt-8">Delete account</Button>
          </form>
        </Form>
      </div>
    </ModalWrapper>
  )
}