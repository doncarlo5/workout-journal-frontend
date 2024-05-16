import useAuth from "@/context/use-auth"
import { LucideLineChart, LucideLogOut, LucidePencilRuler, LucideTimer, LucideTrophy, LucideUserRoundCog, Moon, Sun } from "lucide-react"
import { Link } from "react-router-dom"

// import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

function DashboardComponent() {
  const { handleLogout } = useAuth()
  // const { theme, setTheme } = useTheme()

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light")
  // }

  return (
    <div className="">
      <div className="mx-auto grid max-w-sm grid-cols-2 grid-rows-3 gap-2">
      <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/settings">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucidePencilRuler strokeWidth={1.1} size={32} />
              Mes exercices
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/stats">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideLineChart strokeWidth={1.1} size={32} />
              Stats
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/trophy">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideTrophy strokeWidth={1.1} size={32} />
              Trophées
            </div>
          </Link>
        </Button>
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/timer">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideTimer strokeWidth={1.1} size={32} />
              Minuteur
            </div>
          </Link>
        </Button>
      
        <Button variant={"outline"} asChild className="h-24 ">
          <Link to="/profile/settings">
            <div className="flex flex-col items-center justify-center gap-1">
              <LucideUserRoundCog strokeWidth={1.1} size={32} />
              Informations
            </div>
          </Link>
        </Button>
  
  
        {/* <Button variant={"outline"} className="h-24 " onClick={toggleTheme}>
          {theme === "light" ? (
            <div className="flex flex-col gap-1">
              <Moon strokeWidth={1.1} size={32} />
              Dark
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <Sun strokeWidth={1.1} size={32} />
              Light
            </div>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button> */}
        <Button variant={"outline"} onClick={handleLogout} className="flex h-24 flex-col gap-1">
          <LucideLogOut strokeWidth={1.1} size={32} />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}

export default DashboardComponent
