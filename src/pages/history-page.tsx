import { useEffect, useState } from "react"
import {
  LucideArrowRight,
  LucideCross,
  LucideMessageSquareDashed,
  LucideMessageSquareDot,
  LucideMessageSquareHeart,
  LucideMessageSquareOff,
  LucideMessageSquarePlus,
  LucideMessageSquareText,
  LucideMessageSquareWarning,
  LucideTrash2,
  MessageCircle,
  X,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BodyWeightChart from "@/components/body-weight-chart"
import ExerciseComponent from "@/components/exercise-component"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"
import SessionComponent from "@/components/session-component"

import ErrorBoundary from "./error-boundary"

export function HistoryPage() {
  const [session, setSession] = useState([] as any[])

  const navigate = useNavigate()

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/sessions?limit=1000&sort=-date_session")
      setSession(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await myApi.delete(`/sessions/${id}`)
      console.log(response)
      fetchUserSessions()
      navigate("/sessions")
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleLink = (id: string) => {
    // console log target
    navigate(`/sessions/${id}`)
  }

  return (
    <div className=" mx-auto">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Historique</h1>
        </div>
        <Tabs defaultValue="session" className=" w-80 pb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="session">Séances</TabsTrigger>
            <TabsTrigger value="exercise">Exercices</TabsTrigger>
          </TabsList>
          <TabsContent asChild className=" " value="session">
            <SessionComponent />
          </TabsContent>
          <TabsContent asChild className="" value="exercise">
            <ExerciseComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default HistoryPage
