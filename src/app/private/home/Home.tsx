import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/navbar/navbar";
import GameCard from "../../../components/gamecard/gamecard";
import { instance } from "../../../lib/axios";

interface GameType {
  id: string;
  title: string;
  img: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [gamesList, setGamesList] = useState<GameType[]>([]);

  // Nova função: busca todos os jogos do banco de dados
  async function getAllGames() {
    try {
      const response = await instance.get("/games"); // <-- ajuste essa rota conforme sua API
      const allGames = response.data.map((game: any) => ({
        id: game.id,
        title: game.name,
        img: game.artworks[0]?.replace("/t_thumb/", "/t_cover_big_2x/") ?? "/fallback.jpg"
      }));
      setGamesList(allGames);
    } catch (error) {
      console.error("Erro ao carregar os jogos:", error);
    }
  }

  useEffect(() => {
    getAllGames();
  }, []);

  if (gamesList.length === 0) {
    return (
      <main className="min-h-screen text-white bg-black flex justify-center items-center">
        <p>Loading games...</p>
      </main>
    );
  }

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen">
      <NavBar />
      <div className="flex justify-center py-24 flex-col items-center px-40">
        
        <h1 className="text-3xl font-bold text-white w-full text-left pl-8">Popular Games</h1>
        <div className="w-full flex gap-20 overflow-x-auto scrollbar-transparent mt-4 pb-2">
          {gamesList.map((game, i) => (
            <div key={i} onClick={() => navigate(`/game/${game.id}`)} className="cursor-pointer">
              <GameCard image={game.img} />
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-white w-full text-left pl-8 mt-12">Games Suggestions</h1>
        <div className="w-full flex gap-20 overflow-x-auto scrollbar-transparent mt-4 pb-2">
          {gamesList.map((game, i) => (
            <div key={i} onClick={() => navigate(`/game/${game.id}`)} className="cursor-pointer">
              <GameCard image={game.img} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
