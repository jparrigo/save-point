import { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { instance } from "../../../lib/axios";
import { getLocalUserData } from "../../../lib/getLocalUserData";
import { socket } from "../../socket";

interface ChatPreview {
  id: string
  destinationId: string
  username: string
  avatar: string
  lastMessage: string
  firstTime: boolean
}

interface Message {
  content: string
  createdAt: string
  userSender: {
    id: string
  }
}

export default function Chat() {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const user = getLocalUserData()

  const [selectedChat, setSelectedChat] = useState<{ chatId: string, destinationId: string }>(
    {
      chatId: "",
      destinationId: ""
    });

  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function handleSendMessage() {
    if (newMessage.trim() === "") return;
    const newMsg: Message = {
      content: newMessage,
      createdAt: "",
      userSender: {
        id: user?.id ? user.id : ""
      }
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    socket.emit("chat", {
      chatId: selectedChat.chatId,
      destinationId: selectedChat.destinationId,
      message: newMessage
    })
  }

  async function getChats() {
    const friendsList: { data: { id: string, username: string, email: string }[] } = await instance.post(`social/friends/${user?.id}`)

    const chatsCreate: { data: [] } = await instance.get(`chat/${user?.id}`)

    let chatList: ChatPreview[] = []

    friendsList.data.map((item) => {
      const haveChatCreated: any = chatsCreate.data.find((value: any) => value.user1.id === item.id || value.user2.id === item.id)

      if (haveChatCreated) {
        chatList.push({
          id: haveChatCreated.id,
          destinationId: item.id,
          avatar: "",
          firstTime: false,
          lastMessage: haveChatCreated.lastMessage,
          username: haveChatCreated.user2.username
        })
      } else {
        chatList.push({
          id: item.id,
          destinationId: item.id,
          username: item.username,
          avatar: "",
          lastMessage: "Start new conversation",
          firstTime: true
        })
      }
    })

    setChats(chatList)
  }

  async function startChat(chat: ChatPreview) {
    setSelectedChat({ chatId: chat.id, destinationId: chat.destinationId })

    if (chat.firstTime) {
      await instance.post('/chat', {
        userRequestedId: user?.id,
        userDestinationId: chat.id
      }).then((res) => console.log(res.data))
    }
  }

  async function getMessages() {

    console.log(selectedChat.chatId);
    console.log(user?.id);



    await instance.post(`/chat/messages/${selectedChat.chatId}`, {
      userId: user?.id
    }).then((res) => {
      console.log(res.data)
      setMessages(res.data)
    })
  }

  function handleChat(data: { message: string, timestamp: string, senderId: string }) {
    const newMsg = {
      content: data.message,
      createdAt: data.timestamp,
      userSender: {
        id: data.senderId
      }
    }
    setMessages((prev) => [...prev, newMsg]);
  }

  useEffect(() => {
    if (selectedChat.chatId.trim() != "") {
      getMessages()
    }
  }, [selectedChat])

  useEffect(() => {
    getChats()
    socket.connect()

    socket.on("chat", handleChat)

    return () => {
      socket.off("chat", handleChat);
      socket.disconnect()
    }
  }, [])

  return (
    <main className="bg-[url(/default.png)] bg-cover h-screen text-white flex flex-col overflow-hidden">
      <NavBar />

      <div className="grid grid-cols-4 px-4 h-full pt-26 pb-6 min-h-0">
        <aside className="bg-[#141414] border border-[#343434] rounded-l-2xl flex flex-col h-full min-h-0 col-span-1">
          <h2 className="text-xl font-bold p-6">Messages</h2>
          <div className="flex-1 overflow-y-auto min-h-0 px-2 pb-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 py-4 px-6 rounded-md cursor-pointer transition ${selectedChat.chatId === chat.id ? "bg-white/5" : "hover:bg-white/10"
                  }`}
                onClick={() => startChat(chat)}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={chat.avatar} alt={chat.username} />
                  <AvatarFallback className="rounded-lg">{chat.username}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate">{chat.username}</p>
                  <p className="text-sm text-white/40 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="col-span-3 flex flex-col h-full min-h-0 bg-[#141414] border border-[#343434] rounded-r-2xl">
          {
            selectedChat.chatId.trim() != ""
              ? (
              <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto min-h-0 px-6 py-6 flex flex-col gap-3"
                >
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`px-6 py-2 rounded-xl max-w-[70%] text-lg break-words ${msg.userSender.id === user?.id ? "bg-purple-700/70 self-end" : "bg-gray-700 self-start"
                        }`}
                    >
                      <p>{msg.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-white/20">Chat not selected.</p>
                </div>
              )
          }
          {
            selectedChat.chatId.trim() != ""
              ? (
                <div className="p-4 flex flex-row items-center gap-2 border-t border-[#343434] flex-shrink-0 bg-[#141414] rounded-b-2xl">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-6 py-2 rounded-lg bg-black/40 border border-[#343434] text-white focus:outline-none"
                  />
                  <Button variant="purple" onClick={handleSendMessage}>
                    Send
                  </Button>
                </div>
              ) : null
          }
        </section>
      </div>
    </main>
  );
}