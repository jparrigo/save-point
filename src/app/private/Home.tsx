import NavBar from "../../components/navbar/navbar";
import GameCard from "/home/gustavo/Documents/SavePoint./save-point/src/components/ui/gamecard.tsx"; // ajuste o caminho se necessário

export default function Home() {
  return (
    <main className="min-h-screen bg-[url(./background.jpg)] bg-cover">
      <NavBar />
      <div className="flex justify-center pt-24 flex-col items-center">
        
        <h1 className="text-3xl font-bold text-white mb-8">Popular Games</h1>

        {/* Contêiner rolável para os cards */}
        <div className="w-full max-w-[1400px] flex gap-20 overflow-x-auto pb-4">
          {/* Cada GameCard com tamanho fixo e sem encolher */}
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hollow Knight"
              image="https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hollow Knight"
              image="https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hollow Knight"
              image="https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Celeste"
              image="https://upload.wikimedia.org/wikipedia/en/6/69/Celeste_boxart.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="The Witcher 3"
              image="https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="God of War"
              image="https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hades"
              image="https://upload.wikimedia.org/wikipedia/en/e/e0/Hades_cover_art.jpg"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mt-16 mb-8">Games Suggestions</h1>

        <div className="w-full max-w-[1400px] flex gap-20 overflow-x-auto pb-4">
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Sekiro"
              image="https://upload.wikimedia.org/wikipedia/en/2/27/Sekiro_Logo.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hollow Knight"
              image="https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hollow Knight"
              image="https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Dark Souls III"
              image="https://upload.wikimedia.org/wikipedia/en/2/22/Dark_Souls_III_cover.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Nier: Automata"
              image="https://upload.wikimedia.org/wikipedia/en/1/18/Nier_Automata_box_art.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Bloodborne"
              image="https://upload.wikimedia.org/wikipedia/en/c/c7/Bloodborne_Box_Art.jpg"
            />
          </div>
          <div className="flex-shrink-0 w-[200px]">
            <GameCard
              title="Hollow Knight: Silksong"
              image="https://upload.wikimedia.org/wikipedia/commons/e/ec/Hollow_Knight_Silksong_Logo.png"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
