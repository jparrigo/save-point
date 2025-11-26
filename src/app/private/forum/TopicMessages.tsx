import { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import { instance } from "../../../lib/axios";
import { useParams } from "react-router";
import { Button } from "../../../components/ui/button";
import { ForumTopic } from "./Topic";
import { getLocalUserData } from "../../../lib/getLocalUserData";
import { toast } from "sonner";

interface TopicMessages {
  author: {
    id: string
    username: string
  }
  createdAt: string
  id: string
  message: string
}

export default function TopicMessage() {

  const { id } = useParams<{ id: string }>()

  const [topic, setTopic] = useState<ForumTopic | null>(null)
  const [messages, setMessages] = useState<TopicMessages[]>([])
  const [newMessage, setNewMessage] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function handleSendMessage() {
    const user = getLocalUserData()
    if (newMessage.trim() === "") {
      return toast.info("Empty message.")
    }

    await instance.post(`/forums/topics/messages`, {
      topicId: id,
      userId: user?.id,
      message: newMessage
    }).then(() => {
      setNewMessage("")
      toast.success("Message created!")
      getTopic()
    }).catch((err) => {
      console.log(err);
      toast.error("Can't send message!")
    })
  }

  async function getTopic() {
    await instance.get(`/forums/topic/${id}`)
      .then((res) => {
        console.log(res.data);
        setTopic(res.data)
      })

    await instance.get(`/forums/topics/messages/${id}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data)
      })
  }


  useEffect(() => {
    getTopic()
  }, [])
  return (
    <main className="bg-[url(/default.png)] bg-cover h-screen text-white pt-20 flex flex-col overflow-hidden">
      <NavBar />

      <div className="flex-1 flex flex-col mx-10 mt-6 mb-6 min-h-0">
        <header className="flex-shrink-0">
          <div
            className="bg-[#141414] border border-white/50 p-6 rounded-2xl transition flex flex-row items-center justify-between"
          >
            <div>
              <h1 className="text-2xl">{topic?.title}</h1>
              <p className="text-white/60">Created by <b className="text-white">{topic?.owner.username}</b></p>
              <p className="text-white/60">Messages Count <b className="text-white">{topic?.messageCount}</b></p>
            </div>

            <p className="text-white/80">{topic?.createdAt}</p>
          </div>
        </header>

        <h2 className="mt-8 text-2xl flex-shrink-0">Messages</h2>
        <section className="flex-1 flex flex-col min-h-0 mt-4 bg-[#141414] border border-[#343434] rounded-2xl">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto min-h-0 px-6 py-6 flex flex-col gap-4"
          >
            {
              messages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className="flex flex-row items-center justify-between border border-[#343434] px-6 py-4 rounded-2xl bg-black/40"
                  >
                    <div className="mr-4">
                      <h1 className="font-bold text-white/60">{message.author.username}</h1>
                      <p className="break-words">{message.message}</p>
                    </div>
                    <p className="text-white/60 text-sm whitespace-nowrap">{message.createdAt}</p>
                  </div>
                )
              })
            }
          </div>
          <div className="p-4 flex flex-row items-center gap-2 flex-shrink-0 border-t border-[#343434] bg-[#141414] rounded-b-2xl">
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
        </section>
      </div>
    </main>
  );
}