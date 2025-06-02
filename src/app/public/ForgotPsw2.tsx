import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate, useSearchParams } from "react-router";
import { instance } from "../../lib/axios";

export default function ForgotPsw2() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!token) return alert("Token inválido.");
    if (password !== repeat) return alert("As senhas não coincidem.");

    try {
      const resp = await instance.post(`/user/recoverpass/${token}`,{
        newPassword: password
      })

      if(resp.data) {
        alert("Senha alterada com sucesso!");
        navigate("/login");
      }

    } catch (error: any) {
      alert("Erro ao redefinir senha: " + error.message);
    }
  };

  return (
    <div className='h-screen bg-[url(/background.jpg)] bg-cover flex flex-col items-center justify-center text-[#D9D9D9]'>
      <div className="mb-8 flex flex-col items-center drop-shadow-2xl drop-shadow-[#444444]">
        <h1 className="text-5xl">Reset your password</h1>
      </div>
      <section className="w-90 flex flex-col gap-4">
        <Label htmlFor="password">Password*</Label>
        <Input
          id="password"
          placeholder="Enter your new password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label htmlFor="repeat">Repeat Password*</Label>
        <Input
          id="repeat"
          placeholder="Repeat your password"
          type="password"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />
        <div className="flex flex-col gap-3 mt-4">
          <Button variant='purple' size="lg" onClick={handleResetPassword}>
            Save Changes
          </Button>
        </div>
        <p className="text-sm text-[#656565] text-center">
          <a href="/login" className="text-white">Back to Login</a>
        </p>
      </section>
    </div>
  );
}
