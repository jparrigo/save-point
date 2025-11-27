export function getLocalUserData() {
  const localData = localStorage.getItem("@savepoint/login");
  if (localData) {
    const userData: {
      id: string
      username: string
      email: string
      profilePictureUrl: string
    } = JSON.parse(localData)

    return userData
  }
}