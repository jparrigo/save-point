import { useEffect, useState } from "react";
import DialogAddGame from "./dialog.addgame";
import GameCard from "../../../components/gamecard/gamecard";
import NavBar from "../../../components/navbar/navbar";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { useParams } from "react-router";
import { instance } from "../../../lib/axios";
import { toast } from "sonner";
import Footer from "../../../components/footer/footer";

export interface GameData {
  id: string;
  igdbId: number;
  name: string;
  summary: string;
  genres: string[];
  cover: string;
  platforms: string[];
  companies: string[];
  artworks: string[];
  screenshots: string[];
  achievements: string[];
}

interface ReviewsType {
  id: string
  rating: boolean
  reviewText: string
  createdAt: string
}

export default function Game() {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<GameData | null>(null);
  const [reviews, setReviews] = useState<ReviewsType[]>([]);

  const [myReview, setMyReview] = useState({
    like: false,
    unlike: false,
    description: ""
  });

  function setLike(type: "like" | "unlike") {
    if (type == "like") {
      setMyReview({ ...myReview, like: !myReview.like, unlike: false });
    } else {
      setMyReview({ ...myReview, like: false, unlike: !myReview.unlike });
    }
  }
  
  async function submitMyReview() {
    if (!myReview.like && !myReview.unlike) return toast("You need to like or unlike your review!")
    if (myReview.description.trim() == "") return toast("Write some review to send your review!")

    const userLocalData = localStorage.getItem("@savepoint/login")
    const user = JSON.parse(userLocalData ? userLocalData : "")
    
    await instance.post("/reviews",{
      user: user.id,
      game: game?.id,
      rating: myReview.like ? true : false,
      reviewText: myReview.description
    }).then(() => {
      setMyReview({
        like: false,
        unlike: false,
        description: ""
      })
      getReview()
      toast.success("Your review was successfully send!")
    }).catch((err) => {
      toast.error("Error to create your review!")
      console.error(err);
    })
  }

  async function fetchGame() {
    try {
      const resp = await instance.get(`/games/game/${id}`)
      setGame(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
    }
  }

  async function getReview() {
    try {
      const resp = await instance.get(`/reviews/game/${id}`)
      console.log(resp.data)
      setReviews(resp.data)
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
    }
  }
  
  useEffect(() => {
    fetchGame();
    getReview()
  }, [id]);

  if (!game) {
    return (
      <main className="min-h-screen text-white bg-black flex justify-center items-center">
        <p>Carregando dados do jogo...</p>
      </main>
    );
  }

  const backgroundUrl =
    game.artworks && game.artworks.length > 0
      ? game.artworks[0].replace("{size}", "cover_big_2x")
      : "/default.png";

  return (
    <main className="min-h-screen bg-[#050712] text-slate-100">
      {/* Top hero area with artwork background */}
      <div className="relative">
        <NavBar />
        <div className="relative w-full h-[320px] max-md:h-[220px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
          {/* Gradient to fade into solid background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#050712]" />
        </div>
      </div>

      {/* Content area over solid background */}
      <section className="relative -mt-24 grid grid-cols-4 auto-cols-auto w-full px-10 gap-40 pb-20 max-md:flex max-md:flex-col max-md:gap-10 max-md:pt-10">
        {/* GameCard */}
        <GameCard image={game.cover.replace("{size}", "cover_big_2x")} />
        <div className="w-full col-start-2 col-end-5">
          {/* Info content */}
          <div className="flex flex-col items-start">
            <div className="flex items-start justify-between w-full">
              <h1 className="text-4xl font-semibold mb-6 max-md:text-xl">{game.name}</h1>
              <DialogAddGame data={game} />
            </div>
            <p className="text-lg font-medium mb-2">
              <span className="opacity-70">Score:</span> 0
            </p>

            <p className="opacity-70 mb-1">About:</p>
            <p className="leading-relaxed text-sm sm:text-base">{game.summary}</p>

            <div className="mt-10 space-y-5 text-sm sm:text-base">
              <p>
                <span className="opacity-70">Genre:</span> {game.genres.join(", ")}
              </p>
              <p>
                <span className="opacity-70">Platforms:</span> {game.platforms.join(", ")}
              </p>
              <p>
                <span className="opacity-70">Developer:</span> {game.companies.join(", ") || "Unknown"}
              </p>
              <p>
                <span className="opacity-70">Amount of achievements:</span> {game.achievements.length || "Unknown"}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="mt-20">
              {/* Write a Review */}
              <div className="bg-black/30 p-6 rounded-lg">
                <h2 className="text-2xl mb-4 font-bold max-md:text-sm">Write your analysis of: <span className="font-light">{game.name}</span></h2>
                <p className="mb-6 font-light max-md:text-sm">Do you recommend this game?</p>
                <div className="flex gap-4 mb-4">
                  <button onClick={() => setLike("like")} className={cn(
                    "bg-purple-800/40 hover:bg-purple-700/70 p-3 rounded-md cursor-pointer",
                    myReview.like ? "outline-1 outline-purple-700 bg-purple-800/70" : ""
                  )}>
                    <ThumbsUp size={24} color={myReview.like ? "white" : "#6e11b0"}/>
                  </button>
                  <button onClick={() => setLike("unlike")} className={cn(
                    "bg-purple-800/40 hover:bg-purple-700/70 p-3 rounded-md cursor-pointer",
                    myReview.unlike ? "outline-1 outline-purple-700 bg-purple-800/70" : ""
                  )}>
                    <ThumbsDown size={24} color={myReview.unlike ? "white" : "#6e11b0"}/>
                  </button>
                </div>
                <textarea
                  value={myReview.description}
                  onChange={(e) => setMyReview({...myReview, description: e.target.value})}
                  placeholder="Write your review here"
                  className="w-full p-4 rounded-md bg-black/40 text-slate-100 h-40 mb-5 max-md:text-sm"
                />
                <Button variant="purple" className="dark w-full" onClick={submitMyReview}>
                  Send my review
                </Button>
              </div>

              {/* Divider */}
              <hr className="my-10 border-slate-700" />

              {/* Users' Reviews */}
              <div className="mb-6">
                <h3 className="text-xl mb-6">Análises dos usuários:</h3>
                {
                  reviews.length == 0 ? <span className="text-white/40 font-light">No reviews to this game</span> : null
                }
                {
                  reviews.map((item,i) => {
                    return (
                      <div key={i} className="flex flex-col gap-4 bg-black/30 p-6 rounded-xl mt-8">
                        <div className="flex flex-row justify-between items-center gap-8">
                          <span className="text-sm text-white/40">{item.id}</span>
                          <span className="text-sm text-white/30">{item.createdAt}</span>
                        </div>

                        <div className="flex flex-row items-center gap-4">
                          User recommend this game:
                          {
                            item.rating ? <ThumbsUp /> : <ThumbsDown />
                          }
                        </div>

                        <div className="p-4 bg-black/20 rounded-md">
                          <p className="text-sm leading-relaxed">
                            {item.reviewText}
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
