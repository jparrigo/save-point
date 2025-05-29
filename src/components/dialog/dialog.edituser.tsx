import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { instance } from "../../lib/axios";

const FormSchema = z.object({
  username: z.string({
    required_error: "Username is required"
  }).min(3, {
    message: "Must be 3 or more characters long"
  }),
  email: z.string().email({ message: "Invalid email address" }),
})

export default function DialogEditUser({ userData, onSubmitPass }: { userData: { id: string, username: string, email: string }, onSubmitPass: () => void }) {
  const [open, setOpen] = useState(false)
  const [disabledSaveButton, setDisabledSaveButton] = useState(true)

  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: "",
        email: "",
      }
    })

  useEffect(() => {
    form.setValue("email", userData.email)
    form.setValue("username", userData.username)
  },[userData])

  useEffect(() => {
    if (form.getValues("email") != userData.email || form.getValues("username") != userData.username) {
      setDisabledSaveButton(false)
    } else {
      setDisabledSaveButton(true)
    }
  },[form.watch("username")])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await instance.put(`/user/${userData.id}`, {
      username: data.username,
      email: data.email
    }).then(() => {
      localStorage.setItem("@savepoint/login", JSON.stringify({
        id: userData.id,
        username: data.username,
        email: data.email
      }))
      setDisabledSaveButton(true)
      setOpen(false)
      onSubmitPass()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-purple-800 outline outline-purple-600 text-purple-300 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:text-purple-100 cursor-pointer flex items-center rounded-md gap-2 h-9 px-3 py-2 text-sm">
          Edit user
        </div>
      </DialogTrigger>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>Edit user info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="savepoint" {...field}/>
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
                      <Input placeholder="savepoint@gmail.com" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <Button disabled={disabledSaveButton} type="submit" variant="purple" className="w-full mt-6">Save</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}