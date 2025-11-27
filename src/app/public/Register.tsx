import { Button } from "../../components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { instance } from "../../lib/axios";
import { useNavigate } from "react-router";

const FormSchema = z.object({
  username: z.string({
    required_error: "Username is required"
  }).min(3, {
    message: "Must be 3 or more characters long"
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Must be 6 or more characters long"
  }),
  repeat_password: z.string().min(6, {
    message: "Must be 6 or more characters long"
  }),
}).refine((data) => data.password === data.repeat_password, {
  message: "Passwords must match",
  path: ["repeat_password"]
})


export default function Register() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: ""
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    instance.post("/user/register", {
      username: data.username,
      email: data.email,
      password: data.password
    }).then(() => {
      navigate("/login")
    })
  } 

  function handleGoogleLogin() {
    window.location.href = "http://localhost:3000/user/google";
  }

  return (
    <div className='h-screen bg-[url(/background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
      <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
        <h1 className="text-5xl">Sign Up</h1>
      </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-90 flex flex-col gap-5">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />
            <FormField
              control={form.control}
              name="repeat_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />
            <Button size="lg" variant="purple" type="submit">Get Started</Button>
            <Button size="lg" variant='default' onClick={handleGoogleLogin}>
              <img className="w-8" src="./google-logo.png" alt="Google Logo"/>
              Sign in with Google
            </Button>
            <p className="text-sm text-[#656565] text-center">Already have an account? <a href="/login" className="text-white">Login</a></p>
          </form>
        </Form>
    </div>
  )
}