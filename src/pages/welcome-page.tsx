import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { useTheme } from "@/components/theme-provider"

export function HomePage() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">Workout Journal</h1>
          </div>

          {/* <div className="mt-3 flex gap-4">
            <Link className="w-[150px]" to="/signup">
              <Button className="w-full">Créer un compte</Button>
            </Link>
          </div> */}
          <div className="flex w-full justify-center pb-10">
            <div className="h-[0.05rem] w-1/4 rounded-lg bg-gray-900 dark:bg-gray-800"></div>
          </div>
          <div className=" flex ">
            <Button variant={"outline"} className="px-8 py-5" onClick={toggleTheme}>
              {theme === "light" ? (
                <>
                  <Moon strokeWidth={1.1} size={30} />
                </>
              ) : (
                <>
                  <Sun strokeWidth={1.1} size={30} />
                </>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
