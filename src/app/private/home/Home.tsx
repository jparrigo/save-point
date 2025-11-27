import { useEffect, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import { instance } from "../../../lib/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel";
import Footer from "../../../components/footer/footer";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "../../../components/ui/skeleton";

interface GameType {
  id: string;
  title: string;
  img: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [carouselGames, setCarouselGames] = useState<GameType[]>([]);

  const [comingSoonGames, setComingSoonGames] = useState<GameType[]>([]);

  const [topRatedGames, setTopRatedGames] = useState<GameType[]>([]);

  const [tredingGames, setTredingGames] = useState<GameType[]>([]);

  useEffect(() => {
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const username = searchParams.get("username");

    if (userId && email) {
      const userData = {
        id: userId,
        username: username || email.split('@')[0],
        email: email
      };
      localStorage.setItem("@savepoint/login", JSON.stringify(userData));
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  async function getAllGames() {
    try {
      const respCarousel = await instance.get("recommendations/default")

      const listCarousel = respCarousel.data.items.map((item: any) => ({
        id: item.game.id,
        title: item.game.name,
        img: item.game.cover.replace("{size}", "cover_big_2x")
      }));

      setCarouselGames(listCarousel)

      //Coming
      const respComing = await instance.get("recommendations/personalized/upcoming")

      console.log(respComing.data);


      const listComing = respComing.data.map((item: any) => ({
        id: item.game.id,
        title: item.game.name,
        img: item.game.cover.replace("{size}", "cover_big_2x")
      }));

      setComingSoonGames(listComing)

      //Top Rated
      const respTopRated = await instance.get("recommendations/top-rated")

      console.log(respTopRated.data);

      const listTopRated = respTopRated.data.map((item: any) => ({
        id: item.game.id,
        title: item.game.name,
        img: item.game.cover.replace("{size}", "cover_big_2x")
      }));

      setTopRatedGames(listTopRated)

      //Trending
      const respTreding = await instance.get("recommendations/trending")

      console.log(respTreding.data);

      const listTreding = respTreding.data.map((item: any) => ({
        id: item.game.id,
        title: item.game.name,
        img: item.game.cover.replace("{size}", "cover_big_2x")
      }));

      setTredingGames(listTreding)

    } catch (error) {
      console.error("Erro ao carregar os jogos:", error);
    }
  }

  useEffect(() => {
    if (carouselGames.length === 0 || topRatedGames.length === 0) {
      getAllGames();
    }
  }, []);

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen">
      <NavBar />
      <section className="flex flex-col pt-30 px-30">
        <h1 className="mb-4 mt-8 text-xl">You might also like</h1>
        {carouselGames.length === 0 ? (
          <div className="w-full mb-12 flex gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : (
            <Carousel
              className="w-full dark mb-12"
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: true,
                  stopOnLastSnap: false,
                }),
              ]}
            >
              <CarouselContent>
                {carouselGames.map((item, index) => (
                  <CarouselItem key={index} className="basis-1/6 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                    <img className="rounded-xl border border-[#343434]" src={item.img} alt="" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        )}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <h1>Coming soon</h1>
            {
              comingSoonGames.length === 0
                ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-row items-start gap-4">
                    <Skeleton className="w-16 h-20" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))
                : comingSoonGames.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-row items-start gap-4 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                      <img className="w-16 h-20" src={item.img} alt="" />
                      <div className="flex flex-col">
                        <h1>{item.title}</h1>
                      </div>
                    </div>
                  )
                })
            }
          </div>
          <div className="flex flex-col gap-4">
            <h1>Top Rated</h1>
            {
              topRatedGames.length === 0
                ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-row items-start gap-4">
                    <Skeleton key={index} className="w-16 h-20" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))
                : topRatedGames.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-row items-start gap-4 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                      <img className="w-16 h-20" src={item.img} alt="" />
                      <div className="flex flex-col">
                        <h1>{item.title}</h1>
                      </div>
                    </div>
                  )
                })
            }
          </div>
          <div className="flex flex-col gap-4">
            <h1>Trending</h1>
            {
              tredingGames.length === 0
                ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-row items-start gap-4">
                    <Skeleton key={index} className="w-16 h-20" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))
                : tredingGames.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-row items-start gap-4 cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                      <img className="w-16 h-20" src={item.img} alt="" />
                      <div className="flex flex-col">
                        <h1>{item.title}</h1>
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