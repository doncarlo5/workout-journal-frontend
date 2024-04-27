import useAuth from "@/context/use-auth"
import { LucideLineChart, LucideLogOut, LucideTimer, LucideTrophy, LucideUserRoundCog, Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

function DashboardComponent() {
  const { handleLogout } = useAuth()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="mt-10 h-4/5">
      <div className="grid h-4/5 grid-cols-2 grid-rows-3 gap-10 ">
        <Button variant={"outline"} asChild className=" h-24 w-40">
          <Link to="/profile/stats">
            <div className="flex  flex-col items-center justify-center gap-1">
              <LucideLineChart strokeWidth={1.1} size={40} />
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className=" h-24">
          <Link to="/profile/trophy">
            <div className="flex  flex-col items-center justify-center gap-1">
              <LucideTrophy strokeWidth={1.1} size={40} />
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className=" h-24">
          <Link to="/profile/timer">
            <div className="flex  flex-col items-center justify-center gap-1">
              <LucideTimer strokeWidth={1.1} size={40} />
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className=" h-24">
          <Link to="/profile/settings">
            <div className="flex  flex-col items-center justify-center gap-1">
              <LucideUserRoundCog strokeWidth={1.1} size={40} />
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} className=" h-24" onClick={toggleTheme}>
          {theme === "light" ? (
            <>
              <Moon strokeWidth={1.1} size={40} />
            </>
          ) : (
            <>
              <Sun strokeWidth={1.1} size={40} />
            </>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant={"outline"} onClick={handleLogout} className="group h-24">
          <LucideLogOut strokeWidth={1.1} size={40} />
        </Button>
      </div>
    </div>
  )
}

export default DashboardComponent
