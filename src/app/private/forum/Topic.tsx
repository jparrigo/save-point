import { useEffect, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import { GameData } from "../game/Game";
import { instance } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../../components/ui/button";
import ModalCreateNewTopic from "./modal/modal.create.new.topic";

export interface ForumTopic {
  createdAt: string
  id: string
  messageCount: number
  owner: {
    id: string
    username: string
  },
  title: string
  updatedAt: string
}

export default function Topic() {

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>()

  const [gameInfo, setGameInfo] = useState<GameData | null>(null)

  const [openModalCreateNewTopic, setOpenModalCreateNewTopic] = useState(false)

  const [topics, setTopics] = useState<ForumTopic[]>([])

  async function getGame() {
    await instance.get(`/games/game/${id}`)
      .then((res) => {
        console.log(res.data);
        setGameInfo(res.data)
      })

    await instance.get(`/forums/game/${id}/topics`)
      .then((res) => {
        console.log(res.data);
        setTopics(res.data)
      })
  }


  useEffect(() => {
    getGame()
  }, [])
  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-white pt-20">
      <NavBar />

      <ModalCreateNewTopic
        open={openModalCreateNewTopic}
        onOpenChange={setOpenModalCreateNewTopic}
        callback={getGame}
        gameId={id ? id : ""}
      />

      <header className="mx-10 mt-6">
        <div
          className="bg-[#141414] border border-[#343434] p-6 rounded-2xl hover:bg-black/70 transition cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-5">
            <img
              src={gameInfo?.cover.replace("{size}", "cover_big_2x")}
              alt={gameInfo?.name}
              className="w-15 h-15 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold">{gameInfo?.name}</h2>
            </div>
            <Button variant="purple" onClick={() => setOpenModalCreateNewTopic(true)}>Create New Topic</Button>
          </div>
          <p className="text-gray-300 text-base md:text-lg line-clamp-3">
            {gameInfo?.summary}
          </p>
        </div>
      </header>

      <div className="mx-10 mt-6">
        {
          topics.map((topic) => {
            return (
              <div onClick={() => navigate(`/topic/${topic.id}/messages`)} className="bg-[#141414] border border-[#343434] p-6 rounded-2xl hover:bg-black/70 transition cursor-pointer flex flex-row items-center justify-between" key={topic.id}>
                <div>
                  <h1 className="text-2xl">{topic.title}</h1>
                  <p className="text-white/60">Created by <b className="text-white">{topic.owner.username}</b></p>
                  <p className="text-white/60">Messages Count <b className="text-white">{topic.messageCount}</b></p>
                </div>

                <p className="text-white/80">{topic.createdAt}</p>
              </div>
            )
          })
        }
      </div>
    </main>
  );
}