import { useState } from "react";
import NavBar from "../../../components/navbar/navbar";

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
}

export default function Chat() {
  const [chats] = useState<ChatPreview[]>([
    { id: "1", name: "Bruno_Embaixadinhas", avatar: "src/assets/profile.jpg", lastMessage: "Lets play!" },
    { id: "2", name: "Jorge de Guilherme", avatar: "src/assets/profile.jpg", lastMessage: "Bora depois" },
    { id: "3", name: "Enrico_Dunks01", avatar: "src/assets/profile.jpg", lastMessage: "kkk bom demais" },
    { id: "4", name: "Jp From Brazil", avatar: "src/assets/profile.jpg", lastMessage: "chego em 5min" },
    { id: "5", name: "GUZ FRENCH", avatar: "src/assets/profile.jpg", lastMessage: "salve mano" },
  ]);

  const [selectedChat, setSelectedChat] = useState<string>("1");

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Bruno_Embaixadinhas", text: "YOO WHAT'S UP!!" },
    { id: 2, sender: "User", text: "Hi Dude, how are you?" },
    { id: 3, sender: "Bruno_Embaixadinhas", text: "I'm good and you?" },
    { id: 4, sender: "Bruno_Embaixadinhas", text: "Lets play!" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  function handleSendMessage() {
    if (newMessage.trim() === "") return;
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "User",
      text: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  }

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-white pt-20">
      <NavBar />

      <div className="flex h-[90vh] px-10 py-10">
        /* Lista de chats */
        <aside className="w-1/5 bg-black/50 rounded-2xl p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-10">My Chats</h2>
          <div className="flex flex-col gap-5 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
                  selectedChat === chat.id ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <img src={chat.avatar} alt={chat.name} className="w-15 h-15 rounded-full" />
                <div>
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        /* Chat atual */
        <section className="flex-1 flex flex-col bg-black/50 rounded-2xl ml-6 px-6 py-8">
          <div className="flex-1 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2.5 rounded-xl max-w-xs text-lg ${
                  msg.sender === "User"
                    ? "bg-purple-700/70 self-end"
                    : "bg-gray-700 self-start"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          /* Input */
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 p-3 rounded-lg bg-gray-800 text-white focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-700/70 rounded-xl hover:bg-purple-800/70 cursor-pointer transition"
            >
              Send
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}