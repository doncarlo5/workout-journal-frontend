import { useEffect, useState } from "react"

import myApi from "@/lib/api-handler"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExerciseComponent from "@/components/exercise-component"
import { Navbar } from "@/components/navbar"
import SessionComponent from "@/components/session-component"

export function HistoryPage() {
  const [session, setSession] = useState([] as any[])

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/api/sessions?limit=1000&sort=-date_session")
      setSession(response.data)
      console.log("session", session)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-md flex-col">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">Mon historique.</h1>
        </div>
        <Tabs defaultValue="session" className="">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="session">Séances</TabsTrigger>
            <TabsTrigger value="exercise">Exercices</TabsTrigger>
          </TabsList>
          <TabsContent asChild className="" value="session">
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
