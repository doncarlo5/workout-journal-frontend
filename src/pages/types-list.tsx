import { useEffect, useState } from "react"
import { PlusSquare } from "lucide-react"
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
import TypeComponent from "@/components/type-component"

export function TypesList() {
  const [type, setType] = useState([] as any[])

  const fetchTypes = async () => {
    try {
      const response = await myApi.get("/api/exercise-type?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setType(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/api/exercise-type/${id}`)
      console.log(response)
      fetchTypes()
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {type.length === 0 ? (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
            <div className="text-center">
              <div className="flex flex-col items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
                <div>Aucun type d'exercice.</div>
                <Link className="w-[150px]" to="/type/new-type">
                  <Button className=" w-full">Créer un type</Button>
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
