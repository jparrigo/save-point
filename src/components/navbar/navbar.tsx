import { BadgeCheck, Bell, CreditCard, LogOut, Search, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useMatch, useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate()
  
  return (
    <nav className="fixed right-4 left-4 top-4 flex flex-row items-center justify-between px-6 py-4 bg-[#151515] border-[#252525] border rounded-xl text-[#D9D9D9] z-50">
      <h1 className="font-bold text-xl">Save Point</h1>
      <div className="w-2/4 flex items-center bg-gradient-to-r from-[#1A1919] to-[#0F0F0F] border border-[#515151] rounded-[6px] px-4 py-2 gap-4">
        <Search size={20}/>
        <input
          onFocus={() => console.log("Esta focado!")}
          className="w-full focus:outline-none  text-white text-sm placeholder:text-[#515151]" 
          id="input" 
          type="text" 
          placeholder="Search for a game"
        />
      </div>
      <div className="flex flex-row items-center gap-6">
        <a className={useMatch("/home") ? "text-white" : "text-white/40"} href="/home">Home</a>
        <a className={useMatch("/library") ? "text-white" : "text-white/40"} href="/library">Library</a>
        <a className={useMatch("/forum") ? "text-white" : "text-white/40"} href="">Forum</a>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">shadcn</span>
                  <span className="truncate text-xs">shadcn@gmail.com</span>
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
              <DropdownMenuItem>
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
            <DropdownMenuItem onClick={() => navigate("/")}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>    
    </nav>
  )
}