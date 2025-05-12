
import { ChartColumn, Ellipsis, Link, Pencil, Trash2 } from "lucide-react";
import NavBar from "../../../components/navbar/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router";

let usersGameList = [
  {
    category: "✅ Completed",
    list: [
      {
        id: "a",
        title: "Far Cry 3",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220240/capsule_616x353.jpg?t=1738250672"
      },
      {
        id: "b",
        title: "Far Cry 2",
        img: "https://m.media-amazon.com/images/I/71hiKRrWkaL.jpg"
      },
    ]
  },
  {
    category: "⏱️ Progress",
    list: [
      {
        id: "c",
        title: "Fortnite Save The World",
        img: "https://i0.wp.com/xpgamer.com.br/wp-content/uploads/fortnite-recebe-atualizacao-com-itens-exclusivos-no-modo-salve-o-mundo-capa-1.jpg?resize=800%2C500&ssl=1"
      },
      {
        id: "d",
        title: "Lego Worlds",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/332310/header.jpg?t=1744306721"
      },
      {
        id: "e",
        title: "Grand Theft Auto V",
        img: "https://assets.xboxservices.com/assets/0b/17/0b179504-412d-4af7-9e00-3e3d92633577.jpg?n=GTA-V_GLP-Page-Hero-1084_1920x1080.jpg"
      }
    ]
  },
  {
    category: "📜 Wish List",
    list: [
      {
        id: "f",
        title: "Fortnite Save The World",
        img: "https://i0.wp.com/xpgamer.com.br/wp-content/uploads/fortnite-recebe-atualizacao-com-itens-exclusivos-no-modo-salve-o-mundo-capa-1.jpg?resize=800%2C500&ssl=1"
      },
      {
        id: "g",
        title: "Lego Worlds",
        img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/332310/header.jpg?t=1744306721"
      },
      {
        id: "h",
        title: "Grand Theft Auto V",
        img: "https://assets.xboxservices.com/assets/0b/17/0b179504-412d-4af7-9e00-3e3d92633577.jpg?n=GTA-V_GLP-Page-Hero-1084_1920x1080.jpg"
      }
    ]
  }
]


export default function Library() {
  const navigate = useNavigate()
  return (
    <main className="bg-[url(./default.png)] bg-cover min-h-screen">
      <NavBar />
      <div className="pt-20">
        <section className="px-20 mt-20">
          <Accordion type="multiple" defaultValue={[usersGameList[0].category]}>
          {
            usersGameList.map((item, i) => {
              return (
                <AccordionItem key={i} value={item.category}>
                  <AccordionTrigger>
                      <h1 className="text-2xl">{item.category}</h1>
                      <div className="border border-white/10 px-1 rounded-sm text-lg font-light">{item.list.length}</div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-row max-md:flex-col gap-8">
                    {
                      item.list.map((item, i) => {
                        return (
                          <div className="flex flex-col gap-2" key={i}>
                            <div className="w-80 h-60 max-md:w-fit cursor-pointer" onClick={() => navigate("../game")}>
                              <img className="w-full h-full object-cover rounded-2xl" src={item.img} alt={item.title} />
                            </div>
                            <div className="flex flex-row justify-between items-center">
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
