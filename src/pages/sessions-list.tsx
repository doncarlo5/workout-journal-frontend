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

import ErrorBoundary from "./error-boundary"

export function SessionsList() {
  const [session, setSession] = useState([] as any[])

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/session")
      console.log("👋 response data", response.data)
      setSession(response.data)
      console.log("👋 session", session)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/session/${id}`)
      console.log(response)
      fetchUserSessions()
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
      {session.length !== 0 && (
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="space-y-2 text-center">
            <h1 className="mb-10 text-3xl font-bold">Mes séances</h1>
          </div>
          <div>
            <Table>
              <TableCaption>Liste de tes séances passées</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Nombre d'exercises</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.map((oneSession) => (
                  <TableRow key={oneSession._id}>
                    <TableCell></TableCell>
                    <TableCell>{oneSession.type_session}</TableCell>
                    <TableCell>{formatDate(oneSession.date_session)}</TableCell>
                    <TableCell>{oneSession.exercise_user_list.length}</TableCell>
                    <TableCell>
                      <Link to={`/session/${oneSession._id}`} key={oneSession._id}>
                        <Button variant="ghost">✍️</Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">✕</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Es-tu sûr de vouloir supprimer cette séance ?</AlertDialogTitle>
                            <AlertDialogDescription>Les données seront totalement supprimées.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={() => handleDelete(oneSession._id)}>
                              Confirmer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      )}
      {session.length === 0 && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">Tu n'as pas encore de séances</p>
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

export default SessionsList
