import React, { PureComponent, useEffect, useState } from "react"
import { format } from "date-fns"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import myApi from "@/lib/api-handler"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BodyWeightChart from "@/components/body-weight-chart"
import TractionsChart from "@/components/exercise-chart"
import ExerciseChart from "@/components/exercise-chart"
import { Navbar } from "@/components/navbar"

function ChartsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Évolution de ton profil</h1>
        </div>
        <Tabs defaultValue="account" className="size-80">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weight_body">Poids du corps</TabsTrigger>
            <TabsTrigger value="tractions">Tractions</TabsTrigger>
          </TabsList>
          <TabsContent asChild className=" h-64" value="weight_body">
            <BodyWeightChart />
          </TabsContent>
          <TabsContent asChild className=" h-64" value="tractions">
            <ExerciseChart />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default ChartsPage
