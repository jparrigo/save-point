import NavBar from "../../../components/navbar/navbar";
import GameCard from "../../../components/gamecard/gamecardSquare";
import AnalyzeCard from "../../../components/gamecard/AnalyzeCard"; // Supondo que você tenha esse componente de análise
import { Button } from "../../../components/ui/button";

const user = {
  name: "Bruno_DUnks",
  gamesCount: 87,
  achievements: 542,
  lastPlayed: "Rayman Legends",
  friends: 100,
};

const gamesList = [
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "Cyberpunk 2077", image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg" },
  { title: "Elden Ring", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg" },
  { title: "God of War", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg" },
  { title: "Hades", image: "https://upload.wikimedia.org/wikipedia/en/e/e0/Hades_cover_art.jpg" },
  { title: "Hollow Knight", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg" },
];

const favoriteGames = [
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "Cyberpunk 2077", image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg" },
  { title: "Elden Ring", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg" },
  { title: "God of War", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg" },
  { title: "Hades", image: "https://upload.wikimedia.org/wikipedia/en/e/e0/Hades_cover_art.jpg" },
  { title: "Hollow Knight", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg" },
];

const userReviews = [
  { game: "The Witcher 3", review: "sei la " },
  { game: "Cyberpunk 2077", review: "sei la" },
  { game: "Elden Ring", review: "sei la" },
  { game: "Hades", review: "sei la" },
  { game: "Hollow Knight", review: "sei la" },
  { game: "The Witcher 3", review: "sei la " },
  { game: "Cyberpunk 2077", review: "sei la" },

  
];

const wishlist = [
  { title: "The Witcher 3", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg" },
  { title: "Cyberpunk 2077", image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg" },
  { title: "Elden Ring", image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg" },
  { title: "God of War", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg" },
  { title: "Hades", image: "https://upload.wikimedia.org/wikipedia/en/e/e0/Hades_cover_art.jpg" },
  { title: "Hollow Knight", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg" },
];

export default function Account() {
  return (
    <main className="bg-[url(./default.png)] bg-cover min-h-screen text-slate-100">
      <NavBar />
      <div className="flex flex-col items-center px-8 pt-40">

        {/* Profile Header */}
        <div className="bg-black/30 rounded-xl p-6 mb-10 w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="src/assets/profile.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-sm opacity-80 mt-2">
              Number of games: {user.gamesCount}<br />
              Number of achievements: {user.achievements}<br />
              Last Game Played: {user.lastPlayed}<br />
              Friends: {user.friends}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="purple">
              Edit Profile
            </Button>
            <Button variant="outline" className="dark">
              Settings
            </Button>
          </div>
        </div>

        {/* Popular Games */}
        <div className="flex justify-center py-10 flex-col items-center px-4 w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-white w-full text-left pl-4 mb-4">My Library</h1>
          <div className="w-full overflow-x-auto scrollbar-transparent">
            <div className="flex gap-1 px-2">
              {gamesList.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-[200px]">
                  <GameCard image={item.image} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Favorites */}
        <div className="flex justify-center py-10 flex-col items-center px-4 w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-white w-full text-left pl-4 mb-4">My Favorites</h1>
          <div className="w-full overflow-x-auto scrollbar-transparent">
            <div className="flex gap-1 px-2">
              {favoriteGames.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-[200px]">
                  <GameCard image={item.image} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="flex justify-center py-10 flex-col items-center px-4 w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-white w-full text-left pl-4 mb-4">Wish List</h1>
        <div className="w-full overflow-x-auto scrollbar-transparent">
            <div className="flex gap-1 px-2">
            {wishlist.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-[200px]">
                <GameCard image={item.image} />
                </div>
            ))}
            </div>
        </div>
        </div>


        {/* My Reviews Section */}
        <div className="flex justify-center py-10 flex-col items-center px-4 w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-white w-full text-left pl-4 mb-4">My Reviews</h1>
          <div className="w-full overflow-x-auto scrollbar-transparent">
            <div className="flex gap-5 px-2 ">
              {userReviews.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-[200px]">
                  <AnalyzeCard game={item.game} review={item.review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        

      </div>
    </main>
  );
}
