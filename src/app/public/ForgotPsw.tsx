import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function ForgotPsw() {
    const navigate = useNavigate()
    return (
      <div className='h-screen bg-[url(./background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
        <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
          <h1 className="text-5xl">Forgot your password</h1>
        </div>
        <section className="w-90 flex flex-col gap-4">
          <Label htmlFor="recovery">Enter your Email to recovery your account*</Label>
          <Input id="recovery" placeholder="Enter your email"/>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="purple" size="lg" onClick={() => navigate("/forgotpsw2")}>Request password reset</Button>
          </div>
          <p className="text-sm text-[#656565] text-center"><a href="/login" className="text-white">Back to Login</a></p>
        </section>
      </div>
    )
  }