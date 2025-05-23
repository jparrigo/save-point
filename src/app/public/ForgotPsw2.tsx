import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function ForgotPsw2() {
    return (
      <div className='h-screen bg-[url(/background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
        <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
          <h1 className="text-5xl">Reset your password</h1>
        </div>
        <section className="w-90 flex flex-col gap-4">
          <Label htmlFor="password">Password*</Label>
          <Input id="password" placeholder="Enter your new password"/>
          <Label htmlFor="repeat">Repeat Password*</Label>
          <Input id="repeat" title="Repeat Password*" placeholder="Repeat your password"/>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant='purple' size="lg">Save Changes</Button>
          </div>
          <p className="text-sm text-[#656565] text-center"><a href="/login" className="text-white">Back to Login</a></p>
        </section>
      </div>
    )
  }