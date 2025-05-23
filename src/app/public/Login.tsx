import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { instance } from "../../lib/axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address"
  }),
  password: z.string()
})

export default function Login() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)

    instance.post("/user/signin", {
      email: data.email,
      password: data.password
    }).then((res) => {
      console.log(res.data)
      localStorage.setItem("@savepoint/login", JSON.stringify({
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email
      }))
      navigate("/home")
    }).catch((e) => {
      console.log(e.response.data.message)
      form.setError("email", { message: e.response.data.message })
    })
  }

  return (
    <div className='h-screen bg-[url(./background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
      <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
        <img src="./logo.png" alt="" />
        <h1 className="text-5xl">Save Point</h1>
        <p className="text-[#646464]">Your Backlog finds its Home</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-90 flex flex-col gap-5">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormDescription>
                  Forgot your password? <a href="/forgotpsw" className="text-white">Click here</a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} 
          />
          <Button size="lg" variant="purple" type="submit">Sign In</Button>
          <Button size="lg" variant='default'>
            <img className="w-8" src="./google-logo.png" alt="Google Logo"/>
            Sign in with Google
          </Button>
          <p className="text-sm text-[#656565] text-center">Dont't have an account? <a href="/register" className="text-white">Sign up</a></p>
        </form>
      </Form>
    </div>
  )
}