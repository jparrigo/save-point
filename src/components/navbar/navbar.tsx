import { BadgeCheck, LogOut, Menu, ShieldBan } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router";
import useScreenSize from "../../lib/useScreenSize";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { instance } from "../../lib/axios";
import SearchBar from "../search-bar/search-bar";
import { getLocalUserData } from "../../lib/getLocalUserData";

export interface UserList {
  createdAt: string
  email: string
  id: string
  username: string
}

export default function NavBar() {
  const navigate = useNavigate()
  const size = useScreenSize()
  const location = useLocation().pathname
  const user = getLocalUserData()
  const [search, setSearch] = useState(false)
  const [games, setGames] = useState<{
    id: string
    name: string
    summary: string
    cover: string
  }[]>([])
  const [users, setUsers] = useState<UserList[]>([])

  function logOut() {
    localStorage.clear()
    navigate("/")
  }

  async function getGameList() {
    const res = await instance.get("/games")

    setGames(res.data)
  }

  async function getUsersList() {
    const res = await instance.get("/user")
    console.log(res.data);

    setUsers(res.data)

  }

  useEffect(() => {
    if (search) {
      getGameList()
      getUsersList()
    }
  },[search])

  return (
    <nav className="fixed right-4 left-4 top-4 flex flex-row items-center justify-between px-6 py-4 bg-[#151515] border-[#252525] border rounded-xl text-[#D9D9D9] z-50">
      <h1 onClick={() => navigate("/home")} className="font-bold text-xl cursor-pointer">{size.width <= 800 ? "SP" : "Save Point"}</h1>
      <SearchBar user={users} games={games} setOpenSearch={(value) => setSearch(value)} />
      {
        size.width >= 800
        ? (
          <div className="flex flex-row items-center gap-6">
            <a className={location == "/home" ? "text-white" : "text-white/40"} href="/home">Home</a>
            <a className={location == "/library" ? "text-white" : "text-white/40"} href="/library">Library</a>
              <a className={location == "/chat" ? "text-white" : "text-white/40"} href="/chat">Chat</a>
            <a className={location == "/forum" ? "text-white" : "text-white/40"} href="">Forum</a>
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://republicadg.com.br/wp-content/uploads/2022/01/Os-10-herois-mais-poderosos-dos-jogos.jpg" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="https://republicadg.com.br/wp-content/uploads/2022/01/Os-10-herois-mais-poderosos-dos-jogos.jpg" alt="shadcn" />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.username}</span>
                        <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate(`/account/${user?.id}`)}> {/* Redireciona para Account */}
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ShieldBan />
                      Remove ads
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="dark py-6 px-4" side="top">
              <SheetTitle hidden>Title</SheetTitle>
              <SheetDescription hidden>Description</SheetDescription>
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="https://republicadg.com.br/wp-content/uploads/2022/01/Os-10-herois-mais-poderosos-dos-jogos.jpg" alt="shadcn" />
                    <AvatarFallback className="rounded-lg">SP</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.username}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
                  <a className={location == "/account" ? "text-white" : "text-white/40"} href={`/account/${user?.id}`}>Account</a>
                <Separator />
                <a className={location == "/home" ? "text-white" : "text-white/40"} href="/home">Home</a>
                <a className={location == "/library" ? "text-white" : "text-white/40"} href="/library">Library</a>
                <a className={location == "/forum" ? "text-white" : "text-white/40"} href="">Forum</a>
              </section>
            </SheetContent>
          </Sheet>
        )
      }
    </nav>
  )
}
