import { BadgeCheck, Bell, CreditCard, LogOut, Menu, Search, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router";
import useScreenSize from "../../lib/useScreenSize";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";
import { useEffect, useRef, useState } from "react";
import { instance } from "../../lib/axios";
import { useClickOutside } from "../../lib/useClickOutside";

export default function NavBar() {
  const navigate = useNavigate()
  const size = useScreenSize()
  const location = useLocation().pathname
  const userLocalData = localStorage.getItem("@savepoint/login")
  const user = JSON.parse(userLocalData ? userLocalData : "")
  const [search, setSearch] = useState(false)
  const [games, setGames] = useState<{
    id: string
    name: string
    summary: string
  }[]>([])

  const wrapperRef = useRef<any>("searchmenu")
  useClickOutside(wrapperRef, () => {
    setSearch(false)
  })

  function logOut() {
    localStorage.clear()
    navigate("/")
  }

  async function getGameList() {
    const res = await instance.get("/games")
    console.log(res.data)
    setGames(res.data)
  }

  useEffect(() => {
    getGameList()
  },[])

  return (
    <nav className="fixed right-4 left-4 top-4 flex flex-row items-center justify-between px-6 py-4 bg-[#151515] border-[#252525] border rounded-xl text-[#D9D9D9] z-50">
      <h1 onClick={() => navigate("/home")} className="font-bold text-xl cursor-pointer">{size.width <= 800 ? "SP" : "Save Point"}</h1>
      <div ref={wrapperRef} className="w-2/4 flex items-center bg-gradient-to-r from-[#1A1919] to-[#0F0F0F] border border-[#515151] rounded-[6px] px-4 py-2 gap-4 relative">
        <Search size={20}/>
        <input
          onFocus={() => setSearch(true)}
          className="w-full focus:outline-none text-white text-sm placeholder:text-[#515151]" 
          id="input" 
          type="text" 
          placeholder={size.width <= 800 ? "Search here" : "Search for a game"}
        />
        <div className={cn((search ? "visible" : "invisible"),"absolute left-0 top-12 bg-black w-full max-h-80 overflow-y-auto bg-gradient-to-r from-[#1A1919] to-[#0F0F0F] border border-[#515151] rounded-[6px] p-4")}>
          {
            games.map((item, i) => {
              return (
                <div key={i} className="border-b border-white/20 py-2 last:border-none cursor-pointer hover:outline hover:outline-white/20 hover:bg-white/5 px-2 rounded-md" onClick={() => navigate(`/game/${item.id}`)}>
                  <h1 className="">{item.name}</h1>
                  <p className="text-sm font-light text-white/30 truncate">{item.summary}</p>
                </div>
              )
            })
          }
        </div>
        
      </div>
      {
        size.width >= 800
        ? (
          <div className="flex flex-row items-center gap-6">
            <a className={location == "/home" ? "text-white" : "text-white/40"} href="/home">Home</a>
            <a className={location == "/library" ? "text-white" : "text-white/40"} href="/library">Library</a>
            <a className={location == "/forum" ? "text-white" : "text-white/40"} href="">Forum</a>
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="src/assets/profile.jpg" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="src/assets/profile.jpg" alt="shadcn" />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.username}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/account")}> {/* Redireciona para Account */}
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
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
                    <AvatarImage src="src/assets/profile.jpg" alt="shadcn" />
                    <AvatarFallback className="rounded-lg">SP</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
                <a className={location == "/account" ? "text-white" : "text-white/40"} href="/account">Account</a>
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
