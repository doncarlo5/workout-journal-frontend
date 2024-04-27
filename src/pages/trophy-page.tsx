import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BodyWeightChart from "@/components/body-weight-chart"
import ExerciseChart from "@/components/exercise-chart"
import { Navbar } from "@/components/navbar"
import TrophyComponent from "@/components/trophy-component"

function TrophyPage() {
  return (
    <div className="mx-auto  space-y-6 p-4">
      <div className="">
        <Navbar />
        <main className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="flex items-center space-y-2 text-left">
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="ml-5 py-5 text-3xl font-medium">Trophées</h1>
            </div>
          </div>

          <TrophyComponent />
        </main>
      </div>
    </div>
  )
}

export default TrophyPage
