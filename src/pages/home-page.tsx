// import useAuth from "@/context/use-auth"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

// const { user } = useAuth()

export function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">Your workout journal</h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              Track your progress, set goals, and stay motivated.
            </p>
          </div>
          <div className="flex gap-4">
            <Link className="w-[150px]" to="/signup">
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
