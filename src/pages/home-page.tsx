// import useAuth from "@/context/use-auth"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

// const { user } = useAuth()

export function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b p-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link className="flex items-center space-x-2" to="/">
            <FlagIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Workout Journal</span>
          </Link>
          <nav className="space-x-4">
            <Link
              className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
              to="/signup"
            >
              Sign up
            </Link>
            <Link
              className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
              to="login"
            >
              Log in
            </Link>
          </nav>
        </div>
      </header>
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

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}

export default HomePage
