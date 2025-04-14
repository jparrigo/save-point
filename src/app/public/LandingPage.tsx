import { Facebook, FolderClosed, Gamepad2, Instagram, ScanQrCode, Twitter } from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a[href^="#"]');
      
      if (anchorLink) {
        e.preventDefault();
        const targetId = anchorLink.getAttribute('href');
        
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  return (
    <main className="">
      <nav className="flex flex-row items-center justify-between mx-12 my-6">
        <h1 className="text-3xl font-bold">Save Point</h1>
        <div className="flex flex-row items-center gap-8">
          <a href="#sobre" className="cursor-pointer transition-colors text-white/40 hover:text-white">Sobre</a>
          <span>/</span>
          <a href="#funcionalidades" className="cursor-pointer transition-colors text-white/40 hover:text-white">Funcionalidades</a>
          <span>/</span>
          <a href="#contato" className="cursor-pointer transition-colors text-white/40 hover:text-white">Contato</a>
        </div>
        <div className="flex flex-row items-center gap-6">
          <a href="/login">Sign In</a>
          <a className="bg-purple-800 text-purple-400 px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:text-purple-300" href="/register">Get Started</a>
        </div>
      </nav>
      <section className="py-20 px-20 flex flex-row items-center justify-center gap-6 bg-[#101010]">
        <div className="flex flex-col items-start">
          <h6 className="bg-purple-800 text-purple-400 px-4 rounded-2xl">Plataforma 100% gratuita</h6>
          <h1 className="font-bold text-4xl w-100 mt-6">Guarde o seus Jogos da melhor forma</h1>
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