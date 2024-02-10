import useAuth from "@/context/use-auth"

const ProfilePage = () => {
  const { user } = useAuth()
  return (
    <div>
      <p>Hello {user?.firstName}!</p>
    </div>
  )
}

export default ProfilePage
