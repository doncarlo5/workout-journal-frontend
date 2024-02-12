import useAuth from "@/context/use-auth"

import { Navbar } from "@/components/navbar"

const ProfilePage = () => {
  const { user } = useAuth()
  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div>
        <p>Hello {user?.firstName}!</p>
      </div>
    </>
  )
}

export default ProfilePage
