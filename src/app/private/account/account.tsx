import { useEffect, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import GameCard from "../../../components/gamecard/gamecardSquare";
import DialogEditUser from "../../../components/dialog/dialog.edituser";
import { instance } from "../../../lib/axios";
import { Button } from "../../../components/ui/button";
import { useParams } from "react-router";
import { getLocalUserData } from "../../../lib/getLocalUserData";
import ModalListOfFriends from "./modal/modal-list-of-friends";

export default function Account() {
  const { id } = useParams<{ id: string }>()
  const userLocalData = getLocalUserData()
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    gamesCount: 0,
    friends: 100,
  });
  const [reviews, setReviews] = useState<{
    createdAt: string
    id: string
    rating: boolean
    reviewText: string
    updatedAt: string
    user: {
      username: string
    }
  }[]>([])
  const [gameList, setGameList] = useState<{
    id: string
    title: string
    img: string
  }[]>([])

  const [isFollow, setIsFollow] = useState(false)
  const [openModalListOfFriends, setOpenModalListOfFriends] = useState(false)

  async function getUserData() {
    const res = await instance.get(`/user/${id}`)

    setUser({
      id: res.data.id,
      username: res.data.username,
      email: res.data.email,
      friends: 0,
      gamesCount: 0
    });
  }

  async function followUser() {
    if (isFollow) {
      await instance.post('/social/unfollow', {
        userId: userLocalData?.id,
        followerId: id
      }).then(() => {
        setIsFollow(false)
      })
    } else {
      await instance.post('/social/follow', {
        userId: userLocalData?.id,
        followerId: id
      }).then(() => {
        setIsFollow(true)
      })
    }
  }

  async function getIsFollowingUser() {
    await instance.post('/social/following', {
      userId: userLocalData?.id,
      followerId: id
    }).then((res) => {
      setIsFollow(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }

  async function getUserReviews() {
    await instance.get(`/reviews/user/${id}`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data)
      })
  }

  async function getUserLibraryGames() {
    const ret = await instance.get(`/wishlist/${id}`)
    let newWishList: any = ret.data.map((item: any) => {
      return {
        id: item.game.id,
        title: item.game.name,
        img: item.game.cover.replace("{size}", "cover_big_2x")
      }
    })

    setGameList(newWishList)
    setUser(itens => ({ ...itens, gamesCount: newWishList.length, friends: 100 }))
  }

  useEffect(() => {
    getUserData()
    getUserReviews()
    getUserLibraryGames()
    getIsFollowingUser()
  }, [id]);

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-slate-100">
      <NavBar />
      <ModalListOfFriends
        open={openModalListOfFriends}
        onOpenChange={setOpenModalListOfFriends}
      />
      <div className="flex flex-col items-center mx-50 mt-40 bg-[#151515] border-[#252525] border rounded-2xl">

        {/* Profile Header */}
        <div className="bg-black/10 rounded-xl p-6 mb-10 w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="https://republicadg.com.br/wp-content/uploads/2022/01/Os-10-herois-mais-poderosos-dos-jogos.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-md"
          />
          <div className="flex-1">
            <span className="text-white/60 text-sm">{user.id}</span>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <p className="text-sm text-white/70">{user.email}</p>
            <p className="text-sm text-white/60 mt-6">
              Number of games: <span className="text-white">{user.gamesCount}</span><br />
              Friends: <span className="text-white">{user.friends}</span>
            </p>
          </div>
          <Button onClick={() => setOpenModalListOfFriends(true)}>
            List of friends
          </Button>
          {
            id === userLocalData?.id
              ? <DialogEditUser userData={user} onSubmitPass={() => getUserData()} />
              : (
                <Button onClick={followUser} variant={isFollow ? "default" : "purple"}>
                  {isFollow ? "Un Follow" : "Follow"}
                </Button>
              )
          }
        </div>

        {/* Popular Games */}
        <div className="flex justify-center py-10 flex-col items-center px-4 w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-white w-full text-left pl-4 mb-4">My Library</h1>
          <div className="w-full overflow-x-auto scrollbar-transparent">
            <div className="flex gap-1 px-2">
              {
                gameList.length == 0
                  ? "No games yet..."
                  : null
              }
              {gameList.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-[200px]">
                  <GameCard image={item.img} />
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
              {
                reviews.length == 0
                  ? "No reviews yet..."
                  : null
              }
              {reviews.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-[200px]">
                  <div className="bg-black/50 p-4 rounded-md">
                    <h2 className="text-white text-lg font-semibold">{item.user.username}</h2>
                    <p className="text-white text-sm mt-2">{item.reviewText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
