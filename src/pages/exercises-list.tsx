import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

// const { user } = useAuth()

export function ExercicesList() {
  const [exercise, setExercise] = useState([] as any[])
  const [loading, setLoading] = useState(true)

  const fetchExercises = async () => {
    try {
      const response = await myApi.get("/exercise-user")
      console.log(response)
      setExercise(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchExercises()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center">
        {exercise.map((exercise) => (
          <div key={exercise._id}>
            <h1>{exercise.date}</h1>
            <h2>{exercise.type.name}</h2>
          </div>
        ))}
        {exercise.length === 0 && (
          <main className="flex flex-1 items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
              <div className="text-center">
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Tu n'as pas encore d'exercices
                </p>
              </div>
              <div className="flex gap-4">
                <Link className="w-[150px]" to="/do-exercise">
                  <Button className="w-full">Lancer un exercice</Button>
                </Link>
              </div>
            </div>
          </main>
        )}
      </main>
    </div>
  )
}

export default ExercicesList
