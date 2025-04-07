import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export default function Login() {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-[url(./background.jpg)] bg-cover text-[#D9D9D9]'>
      <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
        <img src="./logo.png" alt="" />
        <h1 className="text-5xl">Save Point</h1>
        <p className="text-[#646464]">Your Backlog finds its Home</p>
      </div>
      <section className="w-90 flex flex-col gap-4">
        <Input title="Email" placeholder="Enter your email"/>
        <Input title="Password" placeholder="Enter your password"/>
        <div className="flex flex-col gap-3 mt-4">
          <Button text='Sign In' variant='default'/>
          <Button text='Sign in with Google' variant='google'/>
        </div>
        <p className="text-sm text-[#656565] text-center">Dont't have an account? <a href="/Register" className="text-white">Sign up</a></p>
      </section>
    </div>
  )
}