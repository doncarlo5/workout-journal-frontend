import { useEffect, useState } from "react"
import { LucideLoader2, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"

import ExerciseTypeCard from "./exercise-type-card"

export function TypeComponent() {
  const [exerciseType, setExerciseType] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTypes = async () => {
    try {
      const response = await myApi.get("/api/exercise-type?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setExerciseType(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  return (
    <>
      {!isLoading && exerciseType.length !== 0 && (
        <div>
          <div className="pt-10 ">
            <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">
              Mes exercices.
            </h1>
          </div>
          <div className="flex justify-center">
            <Link to={`/type/new-type`}>
              <Button className="mx-auto">
                {" "}
                <PlusIcon className="mr-2 size-5" />
                Créer un exercice{" "}
              </Button>
            </Link>
          </div>
          <div>
            <div className="pb-10 ">
              <div className="">
                <div className="rounded-lg border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {isLoading ? (
                      <div className="col-span-full flex items-center justify-center">
                        <div className="container flex flex-col items-center justify-center p-20">
                          <div className="">
                            <LucideLoader2 className=" animate-spin" size={32} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      exerciseType.map((exerciseType: any) => (
                        <ExerciseTypeCard exerciseType={exerciseType} key={exerciseType._id} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && exerciseType.length === 0 && (
        <div className="flex flex-1 items-center justify-center pb-5">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                Aucun type d'exercice.
                <Link className="w-[150px]" to="/profile/types/new-type">
                  <Button className="w-full ">Créer un exercice</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TypeComponent
