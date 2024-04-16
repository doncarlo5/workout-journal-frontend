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
import NewSessionButton from "@/components/new-session-button"

import ErrorBoundary from "./error-boundary"

export function SessionsList() {
  const [session, setSession] = useState([] as any[])

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/sessions?limit=1000&sort=-updatedAt")
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
      const response = await myApi.delete(`/sessions/${id}`)
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
            <h1 className="mb-5 mt-5 text-3xl font-bold">Mes séances</h1>
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
                    <TableCell>
                      <div
                        className={`me-2 h-2.5 w-2.5 rounded-full ${oneSession.is_done ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                    </TableCell>
                    <TableCell>{oneSession.type_session}</TableCell>
                    <TableCell>{formatDate(oneSession.date_session)}</TableCell>
                    <TableCell>{oneSession.exercise_user_list.length}</TableCell>
                    <TableCell>
                      <Link to={`/sessions/${oneSession._id}`} key={oneSession._id}>
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
            <div className="flex flex-col gap-4 ">
              <NewSessionButton />
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default SessionsList
