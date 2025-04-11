export default function LandingPage() {
  return (
    <main className="">
      <nav className="flex flex-row items-center justify-between mx-12 my-6">
        <h1 className="text-3xl font-bold">Save Point</h1>
        <div className="flex flex-row items-center gap-8">
          <h4>Sobre</h4>
          <span>/</span>
          <h4>Funcionalidades</h4>
          <span>/</span>
          <h4>Contato</h4>
        </div>
        <div className="flex flex-row items-center gap-6">
          <a href="/login">Sign In</a>
          <a className="bg-purple-800 text-purple-400 px-4 py-2 rounded-md" href="/register">Get Started</a>
        </div>
      </nav>
      <section className="py-20 flex flex-row items-center justify-center gap-6 bg-[#101010]">
        <div className="flex flex-col items-start">
          <h6 className="bg-green-800 text-green-500 px-4 rounded-2xl">Plataforma 100% free</h6>
          <h1 className="font-bold text-4xl w-100 mt-6">Guarde o seus Jogos da Melhor forma</h1>
          <p className="text-lg w-100 text-gray-400">Aqui suas listas de jogos fica segura. Crie, customize e deixe a sua cara.</p>
          <div className="grid grid-cols-2 mt-6 gap-4">
            <span className="bg-[#101010] border border-[#343434] w-fit px-4 py-2 rounded-2xl">Totalmente Seguro</span>
            <span className="bg-[#101010] border border-[#343434] w-fit px-4 py-2 rounded-2xl">100% Grátis</span>
            <span className="bg-[#101010] border border-[#343434] w-fit px-4 py-2 rounded-2xl">Conexão com todas as plataformas</span>
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
      <section className="py-20 flex flex-row items-center justify-center gap-6 bg-[#101010] blur-2xl">
        <div className="flex flex-col items-start">
          <h6 className="bg-green-800 text-green-500 px-4 rounded-2xl">Plataforma 100% free</h6>
          <h1 className="font-bold text-4xl w-100 mt-6">Guarde o seus Jogos da Melhor forma</h1>
          <p className="text-lg w-100 text-gray-400">Aqui suas listas de jogos fica segura. Crie, customize e deixe a sua cara.</p>
          <div className="grid grid-cols-2 mt-6 gap-4">
            <span className="bg-[#101010] border border-[#343434] w-fit px-4 py-2 rounded-2xl">Totalmente Seguro</span>
            <span className="bg-[#101010] border border-[#343434] w-fit px-4 py-2 rounded-2xl">100% Grátis</span>
            <span className="bg-[#101010] border border-[#343434] w-fit px-4 py-2 rounded-2xl">Conexão com todas as plataformas</span>
          </div>
        </div>
        <div className="border border-[#343434] shadow-2xl rounded-2xl">
          <img src="./login.png" alt="galaxy" className="w-[800px] rounded-2xl" />
        </div>
      </section>
    </main>
  )
}