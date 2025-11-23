
import { ChartColumn, CirclePlus, Ellipsis, Link, Move, Trash2 } from "lucide-react";
import NavBar from "../../../components/navbar/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { instance } from "../../../lib/axios";
import { Button } from "../../../components/ui/button";
import ModalCreateLibrary from "./modal/modal.create-library";
import ModalMoveGame from "./modal/modal.move-game";
import AlertComponent from "../../../components/alert/alert";
import { getLocalUserData } from "../../../lib/getLocalUserData";
import Footer from "../../../components/footer/footer";

export interface ListGamesType {
  id: string
  name: string,
  games: {
    id: string
    name: string
    cover: string
  }[]
}


export default function Library() {
  const navigate = useNavigate()
  const [list, setList] = useState<ListGamesType[]>()
  const [openModalCreateLibrary, setOpenModalCreateLibrary] = useState(false)
  const [openModalMoveGame, setOpenModalMoveGame] = useState(false)
  const [openAlertRemoveGame, setOpenAlertRemoveGame] = useState(false)
  const removeGameId = useRef("")

  async function getGamesWishList() {
    const user = getLocalUserData()
    const customList = await instance.get(`/custom-list/user/${user?.id}`)
    let customListWithItems: ListGamesType[] = customList.data

    setList(customListWithItems)
  }

  async function deleteFromWishlist(gameId: string) {
    const userLocalData = localStorage.getItem("@savepoint/login")
    const user = JSON.parse(userLocalData ? userLocalData : "")

    await instance.delete("/wishlist", {
      data: {
        gameId: gameId,
        userId: user.id
      }
    }).then(() => {
      getGamesWishList()
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    getGamesWishList()
  },[])

  if (!list) {
    return (
      <main className="min-h-screen text-white bg-black flex justify-center items-center">
        <p>Loading your game list...</p>
      </main>
    );
  }

  return (
    <>
      <main className="bg-[url(/default.png)] bg-cover min-h-screen">
      <NavBar />
        <ModalCreateLibrary callback={getGamesWishList} open={openModalCreateLibrary} onOpenChange={setOpenModalCreateLibrary} />
      <AlertComponent
        open={openAlertRemoveGame}
        onOpenChange={setOpenAlertRemoveGame}
        title="Are you sure you want do remove this game?"
        description="This action will remove this game to your library."
        actionLabel="Remove"
        callback={() => deleteFromWishlist(removeGameId.current)}
      />
      <ModalMoveGame open={openModalMoveGame} onOpenChange={setOpenModalMoveGame} />
        <Button onClick={() => setOpenModalCreateLibrary(true)} variant="purple" className="fixed z-50 bottom-10 right-10">
        <CirclePlus /> Create library
      </Button>
      <div className="pt-20">
        <section className="px-20 mt-20">
            <Accordion type="multiple">
          {
            list.map((item, i) => {
              return (
                <AccordionItem key={i} value={item.name}>
                  <AccordionTrigger>
                    <h1 className="text-2xl">{item.name}</h1>
                    <div className="border border-white/10 px-1 rounded-sm text-lg font-light">{item.games.length}</div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-wrap max-md:flex max-md:flex-col gap-4">
                    {
                      item.games.map((item, i) => {
                        return (
                          <div
                            className="relative flex flex-col w-fit gap-4 bg-[#151515] border-[#252525] border rounded-2xl group"
                            key={i}
                          >
                            <div
                              className="w-40 h-50 max-md:w-fit cursor-pointer relative overflow-hidden"
                              onClick={() => navigate(`/game/${item.id}`)}
                            >
                              <img
                                className="w-full h-full object-cover rounded-2xl"
                                src={item.cover.replace("{size}", "cover_big_2x")}
                                alt={item.name}
                              />

                              {/* Nome do jogo que aparece no hover */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                <h1 className="text-white text-center text-lg font-semibold">{item.name}</h1>
                              </div>
                            </div>
                              <DropdownMenu>
                              <DropdownMenuTrigger className="absolute right-4 top-4 bg-black/80 rounded-md p-1">
                                <Ellipsis className="cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="dark">
                                  <DropdownMenuGroup onClick={() => setOpenModalMoveGame(true)}>
                                    <DropdownMenuItem>
                                      <Move />
                                      Move Game
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem disabled>
                                      <Link />
                                      Copy Link
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                      <ChartColumn />
                                      Stats
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                <DropdownMenuGroup
                                  onClick={() => {
                                    removeGameId.current = item.id;
                                    setOpenAlertRemoveGame(true);
                                  }}
                                >
                                    <DropdownMenuItem className="bg-red-500/50 cursor-pointer">
                                    <Trash2 color="white" />
                                      Remove
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )
                      })
                    }
                  </AccordionContent>
                </AccordionItem>
              )
            })
          } 
          </Accordion>
        </section>
      </div>
    </main>
      <Footer />
    </>
  );
}
