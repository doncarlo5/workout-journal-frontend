import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navbar } from "@/components/navbar"

export function ExercicesList() {
  const [exercise, setExercise] = useState([] as any[])

  const fetchUserExercises = async () => {
    try {
      const response = await myApi.get("/exercise-user?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setExercise(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserExercises()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/exercise-user/${id}`)
      console.log(response)
      fetchUserExercises()
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {exercise.length !== 0 && (
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="space-y-2 text-center">
            <h1 className="mb-10 text-3xl font-bold">Mes exercices terminés 📃</h1>
          </div>
          <div>
            <Table>
              <TableCaption>Liste de tes exercices passés</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Poids 1</TableHead>
                  <TableHead>Poids 2</TableHead>
                  <TableHead>Poids 3</TableHead>
                  <TableHead>Rep 1</TableHead>
                  <TableHead>Rep 2</TableHead>
                  <TableHead>Rep 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercise.map((exercise) => (
                  <TableRow key={exercise._id}>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">✕</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Es-tu sûr de vouloir supprimer ton exercice ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tu ne pourras pas récupérer cet exercice une fois supprimé.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Conserver</AlertDialogCancel>
                            <AlertDialogAction asChild onClick={() => handleDelete(exercise._id)}>
                              <Button variant="destructive">Confirmer</Button>
                            </AlertDialogAction>{" "}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell>
                      <Link to={`/exercises/${exercise._id}`} key={exercise._id}>
                        <Button variant="ghost">✍️</Button>
                      </Link>
                    </TableCell>
                    <TableCell>{formatDate(exercise.createdAt)}</TableCell>
                    <TableCell>{exercise.type.name}</TableCell>
                    <TableCell>{exercise.weight[0]}</TableCell>
                    <TableCell>{exercise.weight[1]}</TableCell>
                    <TableCell>{exercise.weight[2]}</TableCell>
                    <TableCell>{exercise.rep[0]}</TableCell>
                    <TableCell>{exercise.rep[1]}</TableCell>
                    <TableCell>{exercise.rep[2]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      )}
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
    </div>
  )
}

export default ExercicesList
