import { useEffect, useState } from "react"

import myApi from "@/lib/api-handler"
import { Navbar } from "@/components/navbar"

// const { user } = useAuth()

export function ExercicesList() {
  const [exercise, setExercise] = useState([] as any[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      </main>
    </div>
  )
}

export default ExercicesList
