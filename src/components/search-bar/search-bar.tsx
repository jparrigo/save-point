"use client"

import * as React from "react"
import {
  SearchIcon,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command"
import { useNavigate } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UserList } from "../navbar/navbar"

interface SearchBarProps {
  setOpenSearch: (value: boolean) => void
  games: {
    id: string
    name: string
    summary: string
    cover: string
  }[]
  user: UserList[]
}

export default function SearchBar({ games, user, setOpenSearch }: SearchBarProps) {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (open) {
      setOpenSearch(true)
    }
  }, [open])

  return (
    <>
      <button
        className="w-1/3 dark border-input text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
          />
          <span className="text-muted-foreground/70 font-normal">Search for game or user...</span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a game or user..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Games">
            {
              games.map((item) => {
                return (
                  <CommandItem onSelect={() => {
                    navigate(`/game/${item.id}`)
                    setOpen(false)
                  }}
                    key={item.id}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage src={item.cover.replace("{size}", "cover_big_2x")} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h1>{item.name}</h1>
                        <p className="text-sm font-light w-100 text-white/30 truncate">{item.summary}</p>
                      </div>
                    </div>
                  </CommandItem>
                )
              })
            }
          </CommandGroup>
          <CommandGroup heading="Users">
            {
              user.map((item) => {
                return (
                  <CommandItem onSelect={() => {
                    navigate(`/account/${item.id}`)
                    setOpen(false)
                  }} key={item.id}>
                    <span>{item.username}</span>
                  </CommandItem>
                )
              })
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
