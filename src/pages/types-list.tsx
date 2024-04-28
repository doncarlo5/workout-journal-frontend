import { useEffect, useState } from "react"
import { LucideLoader2 } from "lucide-react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import TypeComponent from "@/components/type-component"

export function TypesList() {
  const [type, setType] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTypes = async () => {
    try {
      const response = await myApi.get("/api/exercise-type?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setIsLoading(false)
      setType(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {isLoading && (
        <div className="container flex flex-col items-center justify-center p-20">
          <div className="">
            <LucideLoader2 className=" animate-spin " size={32} />
          </div>
        </div>
      )}
      {!isLoading && type.length === 0 ? (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <div className="flex flex-col items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                <p>Aucun exercice.</p>
                <Link className="w-[150px]" to="/type/new-type">
                  <Button className=" w-full">Créer un exercice</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <TypeComponent />
      )}
    </div>
  )
}

export default TypesList
