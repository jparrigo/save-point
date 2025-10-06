import { useEffect, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import { instance } from "../../../lib/axios";
import { useNavigate } from "react-router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel";
import Footer from "../../../components/footer/footer";
import Autoplay from "embla-carousel-autoplay";

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
      const response = await instance.get("/games");
      console.log(response.data)
      const allGames = response.data.map((game: any) => ({
        id: game.id,
        title: game.name,
        img: game.cover.replace("{size}", "cover_big_2x")
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
      <section className="flex flex-col pt-30 px-30">
        <h1 className="mb-4 mt-8 text-xl">You might also like</h1>
        <Carousel
          className="w-full dark mb-12"
          plugins={[
            Autoplay({
              delay: 2000, // Adjust the delay in milliseconds
              stopOnInteraction: true, // Stop autoplay on user interaction
              stopOnLastSnap: false, // Continue looping after reaching the last slide
            }),
          ]}
        >
          <CarouselContent>
            {gamesList.map((item, index) => (
              <CarouselItem key={index} className="basis-1/6 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                <img className="rounded-xl border border-[#343434]" src={item.img} alt="" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <h1>Coming soon</h1>
            {
              gamesList.map((item) => {
                return (
                  <div className="flex flex-row items-start gap-4 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                    <img className="w-16 h-20" src={item.img} alt="" />
                    <div className="flex flex-col">
                      <h1>{item.title}</h1>
                      <p>Oct 6</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="flex flex-col gap-4">
            <h1>Recently anticipated</h1>
            {
              gamesList.map((item) => {
                return (
                  <div className="flex flex-row items-start gap-4 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                    <img className="w-16 h-20" src={item.img} alt="" />
                    <div className="flex flex-col">
                      <h1>{item.title}</h1>
                      <p>Oct 6</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="flex flex-col gap-4">
            <h1>Sleeper hits</h1>
            {
              gamesList.map((item) => {
                return (
                  <div className="flex flex-row items-start gap-4 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                    <img className="w-16 h-20" src={item.img} alt="" />
                    <div className="flex flex-col">
                      <h1>{item.title}</h1>
                      <p>Avg 5.0</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
