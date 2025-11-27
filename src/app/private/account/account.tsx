import { useEffect, useState } from "react";
import NavBar from "../../../components/navbar/navbar";
import GameCard from "../../../components/gamecard/gamecardSquare";
import { instance } from "../../../lib/axios";
import { Button } from "../../../components/ui/button";
import { useNavigate, useParams } from "react-router";
import { getLocalUserData } from "../../../lib/getLocalUserData";
import ModalListOfFriends from "./modal/modal-list-of-friends";
import Footer from "../../../components/footer/footer";
import ModalEditUser from "./modal/modal-edit-user";
import { ListGamesType } from "../library/Library";
import { Skeleton } from "../../../components/ui/skeleton";

type ReviewType = {
  createdAt: string
  id: string
  rating: boolean
  reviewText: string
  updatedAt: string
  user: {
    username: string
  },
  game: {
    name: string
  }
}

export default function Account() {
  const { id } = useParams<{ id: string }>()
  const userLocalData = getLocalUserData()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    profilePictureUrl: "",
    gamesCount: 0,
    friends: 100,
  });
  const [reviews, setReviews] = useState<ReviewType[] | null>(null)
  const [gameList, setGameList] = useState<ListGamesType[] | null>(null)

  const [isFollow, setIsFollow] = useState(false)
  const [openModalListOfFriends, setOpenModalListOfFriends] = useState(false)
  const [openModalEditUser, setOpenModalEditUser] = useState(false)

  async function getUserData() {
    const res = await instance.get(`/user/${id}`)

    setUser({
      id: res.data.id,
      username: res.data.username,
      email: res.data.email,
      profilePictureUrl: res.data.profilePictureUrl,
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
    setReviews(null)

    await instance.get(`/reviews/user/${id}`).then((res) => {
      console.log(res.data);
      setReviews(res.data)
    })
  }

  async function getUserLibraryGames() {
    setGameList(null)

    const customList = await instance.get(`/custom-list/user/${id}`)
    const customListWithItems: ListGamesType[] = customList.data

    setGameList(customListWithItems)
    setUser(itens => ({ ...itens, gamesCount: customListWithItems.length, friends: 100 }))
  }

  useEffect(() => {
    if (id) {
      getUserData()
      getUserReviews()
      getUserLibraryGames()
      getIsFollowingUser()
    }
  }, [id]);

  return (
    <main className="bg-[url(/default.png)] bg-cover min-h-screen text-slate-100 pt-30 items-center">
      <NavBar />
      <ModalListOfFriends
        open={openModalListOfFriends}
        onOpenChange={setOpenModalListOfFriends}
      />
      <ModalEditUser
        open={openModalEditUser}
        onOpenChange={setOpenModalEditUser}
        callback={getUserData}
        user={user}
      />
      <div className="flex flex-col items-center mx-100 bg-[#151515] border-[#252525] border rounded-2xl">

        {/* Profile Header */}
        <div className="bg-black/10 rounded-xl p-6 mb-10 w-full flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={user.profilePictureUrl ? user.profilePictureUrl : "https://images-ext-1.discordapp.net/external/lhxKviHu_H5r21_yhxDSGa-kJLRXaS_feKoVwsldMwg/%3Fq%3Dtbn%3AANd9GcTVeEXL9jaUwcT_4xdunUiHz3_xA-80z8eYgw%26s/https/encrypted-tbn0.gstatic.com/images?format=webp"}
            alt="Profile"
            className="w-28 h-28 rounded-md object-cover object-center"
          />
          <div className="flex-1">
            <span className="text-white/60 text-sm">{user.id}</span>
            <h1 className="text-3xl font-semibold">{user.username}</h1>
            <p className="text-sm text-white/70">{user.email}</p>
            <p className="text-sm text-white/60 mt-6">
              Number of libraries: <span className="text-white">{user.gamesCount}</span><br />
              {/* Friends: <span className="text-white">{user.friends}</span> */}
            </p>
          </div>
          <Button onClick={() => setOpenModalListOfFriends(true)}>
            List of friends
          </Button>
          {
            id === userLocalData?.id
              ? <Button onClick={() => setOpenModalEditUser(true)} variant="purple">Edit user</Button>
              : (
                <Button onClick={followUser} variant={isFollow ? "default" : "purple"}>
                  {isFollow ? "Un Follow" : "Follow"}
                </Button>
              )
          }
        </div>

        {/* Popular Games */}
        <h1 className="bg-purple-800 px-4 py-2 rounded-md">My Library</h1>
        {
          !gameList ? (
            <div className="flex justify-center py-10 flex-col gap-4 px-4 w-full">
              {Array.from({ length: 2 }).map((_, i) => (
                <div className="pl-8" key={i}>
                  <Skeleton className="h-7 w-40 mb-4" />
                  <div className="w-full overflow-x-auto scrollbar-transparent">
                    <div className="flex gap-1 px-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex-shrink-0 w-40">
                          <Skeleton className="w-40 h-40 rounded-md" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-10 flex-col gap-4 px-4 w-full">
              {
                  gameList.length === 0
                    ? <p className="text-start text-white/60 mt-2">No libraries yet...</p>
                    : gameList.map((item, i) => {
                      return (
                        <div className="pl-8" key={i}>
                          <h1 className="text-2xl font-bold text-white w-full text-left mb-4">{item.name}</h1>
                          <div className="w-full overflow-x-auto scrollbar-transparent">
                            <div className="flex gap-1 px-2">
                              {item.games.map((game) => {
                                return (
                                  <div onClick={() => navigate(`/game/${game.id}`)} key={game.id} className="flex-shrink-0 w-[200px]">
                                    <GameCard image={game.cover.replace("{size}", "cover_big_2x")} />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    })
              }
            </div>
          )
        }

        {/* My Reviews Section */}
        <div className="flex justify-center py-10 flex-col items-center px-4 gap-8 w-full">
          <h1 className="bg-purple-800 px-4 py-2 rounded-md">My Reviews</h1>
          <div className="w-full overflow-x-auto scrollbar-transparent">
            <div className="flex gap-5">
              {
                !reviews
                  ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-[200px]">
                      <div className="bg-black/20 p-4 rounded-md">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))
                  : (
                    <>
                      {
                        reviews.length == 0
                          ? <p className="text-center text-white/60 mt-2">No reviews yet...</p>
                          : null
                      }
                      {reviews.map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-[200px]">
                          <div className="bg-black/20 p-4 rounded-md">
                            <h2 className="text-white text-lg font-semibold">{item.game.name}</h2>
                            <p className="text-white text-sm mt-2">{item.reviewText}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )
              }
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
