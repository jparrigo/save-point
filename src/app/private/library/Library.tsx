
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
import { Skeleton } from "../../../components/ui/skeleton";
import { toast } from "sonner";

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
  const [list, setList] = useState<ListGamesType[] | null>(null)
  const [openModalCreateLibrary, setOpenModalCreateLibrary] = useState(false)
  const [openModalMoveGame, setOpenModalMoveGame] = useState(false)
  const [openAlertRemoveGame, setOpenAlertRemoveGame] = useState(false)
  const removeGameData = useRef({
    listId: "",
    gameId: ""
  })
  const listDataGame = useRef({
    listId: "",
    listName: "",
    gameId: ""
  })

  function handleCopyLink(gameId: string) {
    const url = `${window.location.origin}/game/${gameId}`

    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success("Game link copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy link to clipboard.")
      })
  }

  async function getGamesWishList() {
    // força mostrar o skeleton enquanto recarrega
    setList(null)

    try {
      const user = getLocalUserData()
      const customList = await instance.get(`/custom-list/user/${user?.id}`)
      const customListWithItems: ListGamesType[] = customList.data

      setList(customListWithItems)
    } catch (error) {
      console.error("Error to load custom lists:", error)
      // em caso de erro, evita skeleton infinito
      setList([])
      toast.error("Error to load your libraries.")
    }
  }

  async function deleteFromWishlist(gameId: string, listId: string) {
    const userLocalData = localStorage.getItem("@savepoint/login")
    const user = JSON.parse(userLocalData ? userLocalData : "")

    await instance.delete("/custom-list/items", {
      data: {
        gameId: gameId,
        userId: user.id,
        listId: listId
      }
    }).then(() => {
      toast.success("Game removed!")
      getGamesWishList()
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    getGamesWishList()
  },[])

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
          callback={() => deleteFromWishlist(removeGameData.current.gameId, removeGameData.current.listId)}
      />
        <ModalMoveGame
          open={openModalMoveGame}
          onOpenChange={setOpenModalMoveGame}
          data={listDataGame.current}
          callback={getGamesWishList}
        />
        <Button onClick={() => setOpenModalCreateLibrary(true)} variant="purple" className="fixed z-50 bottom-10 right-10">
        <CirclePlus /> Create library
      </Button>
      <div className="pt-20">
        <section className="px-20 mt-20">
            <Accordion type="multiple">
              {
                !list
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <AccordionItem key={i} value={`skeleton-${i}`}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-6 w-40" />
                          <Skeleton className="h-6 w-10" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-wrap max-md:flex max-md:flex-col gap-4">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <div
                            className="relative flex flex-col w-fit gap-4 bg-[#151515] border-[#252525] border rounded-2xl group"
                            key={j}
                          >
                            <Skeleton className="w-40 h-50 max-md:w-fit rounded-2xl" />
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                  : list.map((item, i) => {
                    return (
                      <AccordionItem key={i} value={item.name}>
                        <AccordionTrigger>
                          <h1 className="text-2xl">{item.name}</h1>
                          <div className="border border-white/10 px-1 rounded-sm text-lg font-light">{item.games.length}</div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-wrap max-md:flex max-md:flex-col gap-4">
                          {
                            item.games.map((gameItem, i) => {
                              return (
                                <div
                                  className="relative flex flex-col w-fit gap-4 bg-[#151515] border-[#252525] border rounded-2xl group"
                                  key={i}
                                >
                                  <div
                                    className="w-40 h-50 max-md:w-fit cursor-pointer relative overflow-hidden"
                                    onClick={() => navigate(`/game/${gameItem.id}`)}
                                  >
                                    <img
                                      className="w-full h-full object-cover rounded-2xl"
                                      src={gameItem.cover.replace("{size}", "cover_big_2x")}
                                      alt={gameItem.name}
                                    />

                                    {/* Nome do jogo que aparece no hover */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                      <h1 className="text-white text-center text-lg font-semibold">{gameItem.name}</h1>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger className="absolute right-4 top-4 bg-black/80 rounded-md p-1">
                                      <Ellipsis className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="dark">
                                      <DropdownMenuGroup onClick={() => {
                                        listDataGame.current = {
                                          listId: item.id,
                                          listName: item.name,
                                          gameId: gameItem.id
                                        }
                                        setOpenModalMoveGame(true)
                                      }}>
                                        <DropdownMenuItem>
                                          <Move />
                                          Move Game
                                        </DropdownMenuItem>
                                      </DropdownMenuGroup>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuGroup>
                                        <DropdownMenuItem
                                          className="cursor-pointer"
                                          onClick={() => handleCopyLink(gameItem.id)}
                                        >
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
                                          removeGameData.current = {
                                            listId: item.id,
                                            gameId: gameItem.id
                                          }
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
