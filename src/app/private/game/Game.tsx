import DialogAddGame from "../../../components/dialog/dialog.addgame";
import GameCard from "../../../components/gamecard/gamecard";
import NavBar from "../../../components/navbar/navbar";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function Game() {
  const game = {
    cover: "src/assets/teste.png",
    title: "Mortal Kombat X",
    score: 8.5,
    about:
      "Lorem ipsum dolor sit amet. Vel consequatur corporis non similique fugit et consequatur quod et fuga fugiat eos ullam optio.",
    genre: "Fighting",
    platforms: "PC, PlayStation 4, Xbox One",
    developer: "Netherrealm",
    achievements: 110,
  };

  const handleAdd = () => {
    console.log("Added to list");
  };

  return (
    <main className="bg-[url(./default.png)] bg-cover min-h-screen text-slate-100">
      <NavBar />
      <section className="max-w-8xl mx-auto pt-50 px-20">
        <div className="flex flex-wrap gap-y-8 md:gap-x-6">
          {/* GameCard */}
          <div className="w-full md:max-w-xs p-4 flex-shrink-0">
            <GameCard image={game.cover} onClick={handleAdd} />
          </div>

          {/* Info content */}
          <div className="flex-1 min-w-0 p-4">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <h1 className="text-4xl font-semibold mb-6">{game.title}</h1>
              <DialogAddGame />
            </div>

            <p className="text-lg font-medium mb-2">
              <span className="opacity-70">Score:</span> {game.score}
            </p>

            <p className="opacity-70 mb-1">About:</p>
            <p className="leading-relaxed text-sm sm:text-base">{game.about}</p>

            <div className="mt-10 space-y-5 text-sm sm:text-base">
              <p>
                <span className="opacity-70">Genre:</span> {game.genre}
              </p>
              <p>
                <span className="opacity-70">Platforms:</span> {game.platforms}
              </p>
              <p>
                <span className="opacity-70">Developer:</span> {game.developer}
              </p>
              <p>
                <span className="opacity-70">Amount of achievements:</span> {game.achievements}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="mt-20">
              {/* Write a Review */}
              <div className="bg-black/30 p-6 rounded-lg">
                <h2 className="text-2xl mb-4">Escreva uma análise de: {game.title}</h2>
                <p className="mb-2">Você recomenda esse jogo?</p>
                <div className="flex gap-4 mb-4">
                  <button className="bg-purple-800/60 hover:bg-purple-700/70 p-3 rounded-md cursor-pointer">
                    <ThumbsUp size={24} />
                  </button>
                  <button className="bg-purple-800/60 hover:bg-purple-700/70 p-3 rounded-md cursor-pointer">
                    <ThumbsDown size={24} />
                  </button>
                </div>
                <textarea
                  placeholder="Escreva a sua análise"
                  className="w-full p-4 rounded-md bg-black/40 text-slate-100 h-40"
                />
              </div>

              {/* Divider */}
              <hr className="my-10 border-slate-700" />

              {/* Users' Reviews */}
              <div>
                <h3 className="text-xl mb-6">Análises dos usuários:</h3>

                <div className="flex flex-col md:flex-row bg-black/30 p-6 rounded-xl mt-8">
                  {/* Perfil e Infos */}
                  <div className="flex flex-col md:w-1/4 items-center md:items-start">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="logo.png"
                        alt="User Icon"
                        className="w-12 h-12 rounded-full"
                      />
                      <span className="font-semibold text-lg">Username</span>
                    </div>
                    <p className="text-sm">Game State: Finished</p>
                    <p className="text-sm">Achievements: Platinado (icon)</p>
                  </div>

                  {/* Análise */}
                  <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-row">
                        <ThumbsUp size={24} />
                        <span className="text-lg font-semibold">Recomendado</span>
                      </div>
                      <span className="text-xs opacity-60">Publicado em: 08/04/2025</span>
                    </div>

                    <div className="mt-6 p-4 bg-black/20 rounded-md">
                      <p className="text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet. Vel consequatur corporis non similique fugit et...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
