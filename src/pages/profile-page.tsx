import useAuth from "@/context/use-auth"

import DashboardComponent from "@/components/dashboard-component"
import { Navbar } from "@/components/navbar"

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className=" mx-auto">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Profil de {user?.firstName}</h1>
        </div>

        <DashboardComponent />
      </main>
    </div>
  )
}

export default ProfilePage
