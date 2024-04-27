import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BodyWeightChart from "@/components/body-weight-chart"
import ExerciseChart from "@/components/exercise-chart"
import { Navbar } from "@/components/navbar"

function StatsPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <div className="">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="flex items-center space-y-2 text-left">
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="ml-5 py-5 text-3xl font-medium">Statistiques</h1>
            </div>
          </div>

          <Tabs defaultValue="weight_body" className="size-80">
            <TabsList className="my-5 grid w-full grid-cols-2">
              <TabsTrigger value="weight_body">Poids du corps</TabsTrigger>
              <TabsTrigger value="exercise">Exercices</TabsTrigger>
            </TabsList>
            <TabsContent asChild className="h-64" value="weight_body">
              <BodyWeightChart />
            </TabsContent>
            <TabsContent asChild className="h-64" value="exercise">
              <ExerciseChart />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default StatsPage
