import GameCard from "../../../components/gamecard/gamecard";
import NavBar from "../../../components/navbar/navbar";

let gamesList = [
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
]

export default function Home() {
  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen">
      <NavBar />
      <div className="flex justify-center py-24 flex-col items-center px-40">
        
        <h1 className="text-3xl font-bold text-white w-full text-left pl-8">Popular Games</h1>

        {/* Contêiner rolável para os cards */}
        <div className="w-full flex gap-20 overflow-x-auto scrollbar-transparent">
          {/* Cada GameCard com tamanho fixo e sem encolher */}
          {
            gamesList.map((item, i) => {
              return (
                <GameCard
                  key={i}
                  image={item.image}
                />
              )
            })
          }
        </div>

        <h1 className="text-3xl font-bold text-white w-full text-left pl-8 mt-8">Games Suggestions</h1>

        {/* Contêiner rolável para os cards */}
        <div className="w-full flex gap-20 overflow-x-auto scrollbar-transparent">
          {/* Cada GameCard com tamanho fixo e sem encolher */}
          {
            gamesList.map((item, i) => {
              return (
                <GameCard
                  key={i}
                  image={item.image}
                />
              )
            })
          }
        </div>
      </div>
      
    </main>
  );
}
