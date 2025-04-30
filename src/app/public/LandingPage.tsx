import { Facebook, FolderClosed, Gamepad2, Instagram, Menu, ScanQrCode, Twitter } from "lucide-react";
import { useState } from "react";
import useScreenSize from "../../lib/useScreenSize";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../../components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const size = useScreenSize();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    if (open) {
      setOpen(false)
    }
  
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  return (
    <main className="">
      <nav className="flex flex-row items-center justify-between mx-12 my-6">
        <h1 className="text-3xl font-bold">{size.width <= 800 ? "SP" : "Save Point" }</h1>
        {
          size.width >= 800
          ? (
            <>
              <div className="flex flex-row items-center gap-8">
                <Button variant="link" className="w-fit hover:no-underline transition-colors text-white/40 hover:text-white" onClick={() => handleClick("sobre")}>Sobre</Button>
                <span>/</span>
                <Button variant="link" className="w-fit hover:no-underline transition-colors text-white/40 hover:text-white" onClick={() => handleClick("funcionalidades")}>Funcionalidades</Button>
                <span>/</span>
                <Button variant="link" className="w-fit hover:no-underline transition-colors text-white/40 hover:text-white" onClick={() => handleClick("contato")}>Contato</Button>
              </div>
              <div className="flex flex-row items-center gap-6">
                <a href="/login">Sign In</a>
                <a className="bg-purple-800 text-purple-400 px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:text-purple-300" href="/register">Get Started</a>
              </div>
            </>
          ) : (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent forceMount className="dark py-6 px-4" side="top">
                <SheetTitle hidden>Title</SheetTitle>
                <SheetDescription hidden>Description</SheetDescription>
                <section className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">shadcn</span>
                      <span className="truncate text-xs">shadcn@gmail.com</span>
                    </div>
                  </div>
                  <Separator />
                  <Button variant="link" className="w-fit text-xl" onClick={() => handleClick("sobre")}>Sobre</Button>
                  <Button variant="link" className="w-fit text-xl" onClick={() => handleClick("funcionalidades")}>Funcionalidades</Button>
                  <Button variant="link" className="w-fit text-xl" onClick={() => handleClick("contato")}>Contato</Button>
                  <Button variant="outline" onClick={() => navigate("/login")}>Sign In</Button>
                  <Button variant="purple" onClick={() => navigate("/registar")}>Get Started</Button>
                </section>
              </SheetContent>
            </Sheet>
          )
        }
      </nav>
      <section className="py-20 px-20 flex flex-row max-md:flex-col items-center justify-center gap-6 bg-[#101010]">
        <div className="flex flex-col items-start">
          <h6 className="bg-purple-800 text-purple-400 px-4 rounded-2xl">Plataforma 100% gratuita</h6>
          <h1 className="font-bold text-4xl w-100 mt-6 max-md:text-3xl">Guarde o seus Jogos da melhor forma</h1>
          <p className="text-lg w-100 text-white/40">Encontre novos jogos, armazene o seu histórico, crie listas de desejos...</p>
          <div className="grid grid-cols-2 mt-6 gap-4">
            <span className="bg-[#101010] border border-[#343434] w-full text-center h-fit px-4 py-2 rounded-2xl text-sm">Totalmente Seguro</span>
            <span className="bg-[#101010] border border-[#343434] w-full text-center h-fit px-4 py-2 rounded-2xl text-sm">Compartilhe coleções</span>
            <span className="bg-[#101010] border border-[#343434] w-full text-center h-fit px-4 py-2 rounded-2xl text-sm">Conecte plataformas</span>
          </div>
        </div>
        <div className="border border-[#343434] shadow-2xl rounded-2xl">
          <img src="./login.png" alt="galaxy" className="w-[800px] rounded-2xl" />
        </div>
      </section>

      <section className="py-20 flex flex-row items-center justify-center gap-6 uppercase">
        <p>Mais de <b className="text-xl">10.000</b> usuários ativos</p>
        <span className="text-[#343434] text-3xl">/</span>
        <p><b className="text-xl">100.000</b> jogos salvos</p>
        <span className="text-[#343434] text-3xl">/</span>
        <p><b className="text-xl">300.000</b> de avaliações</p>
      </section>

      <section id="funcionalidades" className="py-20 px-10 bg-[#101010] flex flex-col items-center">
        <h6 className="bg-purple-800 text-purple-400 px-4 rounded-2xl text-sm">Funcionalidades</h6>
        <h1 className="font-bold text-2xl mb-8 mt-2">Funcionalidades da plataforma</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#141414] px-6 py-4 rounded-md border-2 border-[#202020] shadow-[#343434] shadow-2xl hover:translate-y-[-20px] transition-all hover:border-purple-600 hover:shadow-purple-500">
            <Gamepad2 size={36}/>
            <h1 className="mt-4 mb-2">Descubra novos jogos</h1>  
            <p className="text-white/40 text-sm">
              Explore recomendações personalizadas e encontre seu próximo jogo favorito em poucos cliques.
            </p>
          </div>
          <div className="bg-[#141414] px-6 py-4 rounded-md border-2 border-[#202020] shadow-[#343434] shadow-2xl hover:translate-y-[-20px] transition-all hover:border-purple-600 hover:shadow-purple-500">
            <FolderClosed size={36}/>
            <h1 className="mt-4 mb-2">Organize suas pastas</h1>  
            <p className="text-white/40 text-sm">
              Crie listas como "Jogando", "Zerado" ou "Quero jogar" e mantenha sua coleção sempre em ordem.
            </p>
          </div>
          <div className="bg-[#141414] px-6 py-4 rounded-md border-2 border-[#202020] shadow-[#343434] shadow-2xl hover:translate-y-[-20px] transition-all hover:border-purple-600 hover:shadow-purple-500">
            <ScanQrCode size={36}/>
            <h1 className="mt-4 mb-2">Adicione jogos através de fotos</h1>  
            <p className="text-white/40 text-sm">
              Tire uma foto da capa ou da tela e a plataforma reconhece o jogo pra você — rápido e prático!
            </p>
          </div>
        </div>
      </section>

      <section id="sobre" className="flex flex-col px-20 py-20 items-start">
        <h6 className="bg-purple-800 text-purple-400 px-4 rounded-2xl text-sm">Save Point</h6>
        <h1 className="font-bold text-2xl mt-2 mb-4">Sobre a plataforma</h1>
        <p className="text-white/40">O SavePoint é uma plataforma web feita para quem ama videogames. 
          Aqui você pode organizar todos os jogos que já jogou, está jogando ou quer jogar. 
          Avalie títulos, peça recomendações personalizadas, compartilhe sua lista com amigos e até adicione jogos tirando uma simples foto. Simples, intuitivo e feito pra quem vive de fase em fase.
        </p>
      </section>

      <section id="contato" className="bg-[#101010] grid grid-cols-3 p-20">
        <p className="font-bold text-xl">Save Point</p>
        <div>
          <h1>Contato</h1>
          <h1 className="text-white/40">savepoint@gmail.com</h1>
        </div>
        <div>
          <h1>Follow us on</h1>
          <div className="flex flex-row items-center gap-2">
            <Instagram />
            <Twitter />
            <Facebook />
          </div>
        </div>

      </section>

      <footer className="py-4">
        <p className="text-center text-white/60">© Save Point, All Rights Reserved.</p>
      </footer>
    </main>
  )
}