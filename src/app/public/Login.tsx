import { useNavigate } from "react-router";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className='h-screen bg-[url(./background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
      <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
        <img src="./logo.png" alt="" />
        <h1 className="text-5xl">Save Point</h1>
        <p className="text-[#646464]">Your Backlog finds its Home</p>
      </div>
      <section className="w-90 flex flex-col gap-4">
        <Input title="Email" placeholder="Enter your email"/>
        <Input title="Password" placeholder="Enter your password"/>
        <p className="text-sm text-[#656565] text-left">Forgot your password? <a href="/forgotpsw" className="text-white">Click here</a></p>
        <div className="flex flex-col gap-3 mt-4">
          <Button text='Sign In' variant='default' onPress={() => navigate("/home")}/>
          <Button text='Sign in with Google' variant='google'/>
        </div>
        <p className="text-sm text-[#656565] text-center">Dont't have an account? <a href="/register" className="text-white">Sign up</a></p>
      </section>
    </div>
  )
}