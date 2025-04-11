import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export default function Register() {
    return (
      <div className='h-screen bg-[url(./background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
        <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
          <h1 className="text-5xl">Sign Up</h1>
        </div>
        <section className="w-90 flex flex-col gap-4">
          <Input title="Username*" placeholder="Enter your username"/>
          <Input title="Email*" placeholder="Enter your email"/>
          <Input title="Password*" placeholder="Enter your password"/>
          <Input title="Repeat Password*" placeholder="Repeat your password"/>
          <div className="flex flex-col gap-3 mt-4">
            <Button text='Get Started' variant='default'/>
            <Button text='Sign in with Google' variant='google'/>
          </div>
          <p className="text-sm text-[#656565] text-center">Already have an account? <a href="/login" className="text-white">Login</a></p>
        </section>
      </div>
    )
  }