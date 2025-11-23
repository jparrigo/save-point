import { useEffect, useState } from "react";
import {useNavigate } from "react-router";
import NavBar from "../../../components/navbar/navbar";
import { Input } from "../../../components/ui/input";
import { GameData } from "../game/Game";
import { instance } from "../../../lib/axios";
import { Button } from "../../../components/ui/button";

export default function Forum() {
  const navigate = useNavigate();
  const [games, setGames] = useState<GameData[]>([])
  const [searchInput, setSearchInput] = useState("")

  async function getGames() {
    await instance.get("/games")
      .then((res) => {
        console.log(res.data);
        setGames(res.data)
      })
  }

  async function getFuzzySearch() {
    if (searchInput.trim() === "") {
      getGames()
    } else {
      await instance.get("/games/search", {
        params: {
          q: searchInput
        }
      })
        .then((res) => {
          console.log(res.data);
          setGames(res.data)
        })
    }
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-white pt-20">
      <NavBar />
      <div className="px-4 pb-10 pt-6 gap-6">
        <div className="mb-6 flex flex-row gap-2 items-center">
          <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search for a game forum" className="w-1/4" />
          <Button onClick={getFuzzySearch} size="lg">Search</Button>
        </div>

        <section className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-[#141414] border border-[#343434] p-6 rounded-2xl hover:bg-black/70 transition cursor-pointer"
              onClick={() => navigate(`/topic/${game.id}`)}
            >
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={game.cover.replace("{size}", "cover_big_2x")}
                  alt={game.name}
                  className="w-15 h-15 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-semibold">{game.name}</h2>
                </div>
              </div>
              <p className="text-gray-300 text-base md:text-lg line-clamp-3">
                {game.summary}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
