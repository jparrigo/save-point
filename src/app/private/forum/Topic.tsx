import { useState} from "react";
import NavBar from "../../../components/navbar/navbar";

interface ForumTopic {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  createdAt: string;
  comments: ForumComment[];
}

interface ForumComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export default function Forum() {
  const mockTopics: ForumTopic[] = [
    {
      id: "1",
      title: "Primeiro Tópico",
      description: "Esse é o primeiro tópico do fórum.",
      author: "Bruno_Embaixadinhas",
      avatar: "src/assets/profile.jpg",
      createdAt: "2025-09-20",
      comments: [
        {
          id: "c1",
          author: "User1",
          avatar: "src/assets/profile.jpg",
          text: "Comentário muito bom!",
          createdAt: "2025-09-21",
        },
        {
          id: "c2",
          author: "User2",
          avatar: "src/assets/profile.jpg",
          text: "Concordo com você",
          createdAt: "2025-09-21",
        },
      ],
    },
    {
      id: "2",
      title: "Dicas de Jogos",
      description: "Compartilhe suas melhores dicas.",
      author: "GamerPro",
      avatar: "src/assets/profile.jpg",
      createdAt: "2025-09-19",
      comments: [
        {
          id: "c1",
          author: "PlayerX",
          avatar: "src/assets/profile.jpg",
          text: "Jogue no modo hard, é mais divertido.",
          createdAt: "2025-09-20",
        },
      ],
    },
    {
      id: "3",
      title: "Qual seu jogo favorito?",
      description: "Vamos discutir sobre os melhores games!",
      author: "Enrico_Dunks01",
      avatar: "src/assets/profile.jpg",
      createdAt: "2025-09-18",
      comments: [
        {
          id: "c1",
          author: "Jp From Brazil",
          avatar: "src/assets/profile.jpg",
          text: "FIFA é top!",
          createdAt: "2025-09-19",
        },
        {
          id: "c2",
          author: "GUZ FRENCH",
          avatar: "/avatars/guz.png",
          text: "Prefiro Call of Duty",
          createdAt: "2025-09-19",
        },
      ],
    },
  ];

  const [topics, setTopics] = useState<ForumTopic[]>(mockTopics);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(
    topics[0]
  );

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedTopic) return;

    const updatedTopics = topics.map((topic) =>
      topic.id === selectedTopic.id
        ? {
            ...topic,
            comments: [
              ...topic.comments,
              {
                id: Date.now().toString(),
                author: "Você",
                avatar: "src/assets/profile.jpg",
                text: newComment,
                createdAt: new Date().toISOString().split("T")[0],
              },
            ],
          }
        : topic
    );

    setTopics(updatedTopics);
    setSelectedTopic(
      updatedTopics.find((t) => t.id === selectedTopic.id) || null
    );
    setNewComment("");
  };




  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-white pt-20">
      <NavBar />

      <div className="flex h-[90vh] px-10 py-10">
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
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex-1 flex flex-col bg-black/50 rounded-2xl ml-6 px-6 py-8 overflow-y-auto">
          {selectedTopic ? (
            <>
              <header className="mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={selectedTopic.avatar}
                    alt={selectedTopic.author}
                    className="w-15 h-15 rounded-full"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">{selectedTopic.title}</h1>
                    <p className="text-sm md:text-base text-gray-400">
                      Criado por {selectedTopic.author} em{" "}
                      {selectedTopic.createdAt}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-lg">{selectedTopic.description}</p>
              </header>

              <hr className="border-gray-700 my-6" />

              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-xl font-semibold mb-4">Comentários</h2>
                {selectedTopic.comments.length === 0 ? (
                  <p className="text-gray-400">Ainda não há comentários...</p>
                ) : (
                  selectedTopic.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 bg-gray-800/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex justify-between w-full">
                          <span className="font-semibold">
                            {comment.author}
                          </span>
                          <span className="text-sm text-gray-400">
                            {comment.createdAt}
                          </span>
                        </div>
                      </div>
                      <p className="text-lg">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escreva seu comentário..."
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 resize-none"
                  rows={2}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddComment}
                    className="mt-2 px-4 py-2 bg-purple-700/70 hover:bg-purple-800/70 rounded-lg font-semibold cursor-pointer"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>Selecione um tópico para visualizar.</p>
          )}
        </section>
      </div>
    </main>
  );
}
