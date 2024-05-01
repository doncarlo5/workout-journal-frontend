import useAuth from "@/context/use-auth"

import DashboardComponent from "@/components/dashboard-component"
import { Navbar } from "@/components/navbar"

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">
            Profil de {user?.firstName}.
          </h1>
        </div>
        <DashboardComponent />
      </main>
    </div>
  )
}

export default ProfilePage
