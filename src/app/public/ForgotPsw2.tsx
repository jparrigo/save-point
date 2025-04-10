import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

export default function ForgotPsw2() {
    return (
      <div className='h-screen flex flex-col items-center justify-center text-[#D9D9D9]'>
        <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
          <h1 className="text-5xl">Reset your password</h1>
        </div>
        <section className="w-90 flex flex-col gap-4">
          <Input title="Password*" placeholder="Enter your new password"/>
          <Input title="Repeat Password*" placeholder="Repeat your password"/>
          <div className="flex flex-col gap-3 mt-4">
            <Button text='Save Changes' variant='default'/>
          </div>
          <p className="text-sm text-[#656565] text-center"><a href="/" className="text-white">Back to Login</a></p>
        </section>
      </div>
    )
  }