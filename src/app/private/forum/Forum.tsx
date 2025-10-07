import { useState } from "react";
import {useNavigate } from "react-router";
import NavBar from "../../../components/navbar/navbar";

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  createdAt: string;
}

export default function Forum() {
  const navigate = useNavigate();
  const mockTopics: ForumTopic[] = [
    {
      id: "1",
      title: "Primeiro Tópico",
      description:
        "Esse é o primeiro tópico do fórum. Vamos discutir ideias e compartilhar experiências com todos os gamers por aqui.",
      author: "Bruno_Embaixadinhas",
      avatar: "src/assets/profile.jpg",
      createdAt: "2025-09-20",
    },
    {
      id: "2",
      title: "Dicas de Jogos",
      description:
        "Compartilhe suas melhores dicas de jogos para iniciantes e veteranos. Desde estratégias até atalhos secretos!",
      author: "GamerPro",
      avatar: "src/assets/profile.jpg",
      createdAt: "2025-09-19",
    },
    {
      id: "3",
      title: "Qual seu jogo favorito?",
      description:
        "Vamos discutir sobre os melhores games! Comenta aí qual jogo você não larga por nada.",
      author: "Enrico_Dunks01",
      avatar: "src/assets/profile.jpg",
      createdAt: "2025-09-18",
    },
  ];

  const [topics] = useState<ForumTopic[]>(mockTopics);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(
    topics[0]
  );

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-white pt-20">
      <NavBar />
      <div className="flex h-[90vh] px-10 py-10 gap-6">
        <aside className="w-1/5 bg-black/50 rounded-2xl p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-10">Saved topics</h2>
          <div className="flex flex-col gap-5 overflow-y-auto">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-4 rounded-xl cursor-pointer transition ${
                  selectedTopic?.id === topic.id
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={topic.avatar}
                    alt={topic.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="text-sm text-gray-300 truncate">
                      {topic.description.length > 50
                        ? topic.description.slice(0, 50) + "..."
                        : topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-black/50 p-6 rounded-2xl hover:bg-black/70 transition cursor-pointer"
              onClick={() => navigate(`/topic/${topic.id}`)}
            >
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={topic.avatar}
                  alt={topic.author}
                  className="w-15 h-15 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-semibold">{topic.title}</h2>
                  <span className="text-gray-400 text-xs md:text-base">
                    Publicado por {topic.author} em {topic.createdAt}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-base md:text-lg line-clamp-3">
                {topic.description}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
