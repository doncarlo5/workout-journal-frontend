import { useEffect } from "react"

import myApi from "@/lib/api-handler"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExerciseComponent from "@/components/exercise-component"
import { Navbar } from "@/components/navbar"
import SessionComponent from "@/components/session-component"
import NewSessionButton from "@/components/new-session-button"
import { Plus } from "lucide-react"

export function HistoryPage() {

  const fetchUserSessions = async () => {
    try {
      await myApi.get("/api/sessions?limit=1000&sort=-date_session")
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
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">
            Mes séances.
          </h1>
        </div>
        <Tabs defaultValue="session" className="">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="session">Séances</TabsTrigger>
            <TabsTrigger value="exercise">Exercices</TabsTrigger>
          </TabsList>
          <TabsContent value="session">
            <SessionComponent />
          </TabsContent>
          <TabsContent value="exercise">
            <ExerciseComponent />
          </TabsContent>
        </Tabs>
        <NewSessionButton
              Children={
                <div className="fixed bottom-20 right-10 cursor-pointer ">
                  <div className="flex h-16 w-16 items-center justify-center backdrop-blur-sm bg-white/5 rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 active:scale-95 active:shadow-inner">
                    <Plus color="rgb(107 114 128)" className="inline-block " height={40} width={40} strokeWidth={1.5} />
                  </div>
                </div>
              }
            />
      </main>
    </div>
  )
}

export default HistoryPage
