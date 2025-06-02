import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { instance } from "../../lib/axios";

export default function ForgotPsw() {
  const [email, setEmail] = useState("");

  const handleSendEmail = async () => {
    try {
      await instance.post("user/forgotpass",{
        email: email
      })

      alert("Email enviado com sucesso! Verifique sua caixa de entrada.");
    } catch (error: any) {
      alert("Erro ao enviar email: " + error.message);
    }
  };

  return (
    <div className='h-screen bg-[url(/background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
      <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
        <h1 className="text-5xl">Forgot your password</h1>
      </div>
      <section className="w-90 flex flex-col gap-4">
        <Label htmlFor="recovery">Enter your Email to recover your account*</Label>
        <Input
          id="recovery"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col gap-3 mt-4">
          <Button variant="purple" size="lg" onClick={handleSendEmail}>
            Request password reset
          </Button>
        </div>
        <p className="text-sm text-[#656565] text-center">
          <a href="/login" className="text-white">Back to Login</a>
        </p>
      </section>
    </div>
  );
}
