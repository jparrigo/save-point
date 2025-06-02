
import { ChartColumn, Ellipsis, Link, Pencil, Trash2 } from "lucide-react";
import NavBar from "../../../components/navbar/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { instance } from "../../../lib/axios";

interface ListGamesType {
  category: string,
  list: {
    id: string
    title: string
    img: string
  }[]
}


export default function Library() {
  const navigate = useNavigate()
  const [list, setList] = useState<ListGamesType[]>()

  async function getGamesWishList() {
    const userLocalData = localStorage.getItem("@savepoint/login")
    const user = JSON.parse(userLocalData ? userLocalData : "")
    const ret = await instance.get(`/wishlist/${user.id}`)
    let newWishList = ret.data.map((item: any) => {
      return {
        id: item.game.id,
        title: item.game.name,
        img: item.game.cover.replace("{size}", "cover_big_2x") 
      }
    })

    setList([{
      category: "📜 Wish List",
      list: newWishList
    }])
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
    <main className="bg-[url(/default.png)] bg-cover min-h-screen">
      <NavBar />
      <div className="pt-20">
        <section className="px-20 mt-20">
          <Accordion type="multiple" defaultValue={[list[0].category]}>
          {
            list.map((item, i) => {
              return (
                <AccordionItem key={i} value={item.category}>
                  <AccordionTrigger>
                      <h1 className="text-2xl">{item.category}</h1>
                      <div className="border border-white/10 px-1 rounded-sm text-lg font-light">{item.list.length}</div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-wrap max-md:flex max-md:flex-col gap-8">
                    {
                      item.list.map((item, i) => {
                        return (
                          <div className="flex flex-col w-fit gap-2" key={i}>
                            <div className="w-80 h-60 max-md:w-fit cursor-pointer" onClick={() => navigate(`/game/${item.id}`)}>
                              <img className="w-full h-full object-cover rounded-2xl" src={item.img} alt={item.title} />
                            </div>
                            <div className="flex flex-row max-md:flex-col justify-between items-center">
                              <h1 className="text-lg font-light">{item.title}</h1>
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Ellipsis className="cursor-pointer"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="dark">
                                    <DropdownMenuGroup>
                                      <DropdownMenuItem>
                                        <Pencil />
                                        Edit Game
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                      <Link />
                                      Copy Link
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <ChartColumn />
                                      Stats
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem className="bg-red-500/50">
                                      <Trash2 color="white"/>
                                      Remove
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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
  );
}
