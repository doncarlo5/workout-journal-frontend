import { useEffect, useState } from "react"
import { format } from "date-fns"
import { LucideLoader2 } from "lucide-react"
import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import myApi from "@/lib/api-handler"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

function ExerciseChart() {
  const [exercise, setExercise] = useState([] as any[])
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)
  // const [isSelected, setIsSelected] = useState(false)

  const fetchAllExerciseTypes = async () => {
    try {
      const response = await myApi.get(`/api/exercise-type?limit=1000`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const init = async () => {
      const exerciseTypeData = await fetchAllExerciseTypes()
      setAllExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  const AllExercisesTypeChange = async (value: any) => {
    const response = await myApi.get(`/api/exercise-user?limit=1000&sort=createdAt&type=${value._id}`)
    setExercise(response.data)

    return response.data
  }

  const formatXAxis = (tickFormat: string) => {
    const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy")
    return formattedDate
  }

  return (
    <>
      <Select onValueChange={AllExercisesTypeChange}>
        <SelectTrigger className="w-full data-[placeholder]:italic data-[placeholder]:text-gray-700">
          <SelectValue className="" placeholder="Sélectionne un exercice..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {allExerciseTypes.map((type) => (
              <SelectItem key={type._id} value={type}>
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {isLoading && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center p-20">
            <div className="">
              <LucideLoader2 className=" animate-spin" size={32} />
            </div>
          </div>
        </main>
      )}

      {exercise.length === 0 && !isLoading && (
        <div className="mt-5 text-center">
          <p>Aucun historique pour cet exercice.</p>
        </div>
      )}

      <ResponsiveContainer className="mt-4" width="100%" height="75%">
        <AreaChart
          width={500}
          height={300}
          data={exercise}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="date_session" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="session.date_session" tickFormatter={(tick) => formatXAxis(tick)} />

          <YAxis name="Weight" domain={["auto", "auto"]}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "100%",
                fill: "#666666",
              }}
              position="left"
              value={"Charge (kg)"}
              angle={-90}
              offset={-2}
              dx={-10}
              dy={-10}
              fontWeight={"bold"}
              fontStretch={"ultra-condensed"}
            />
          </YAxis>

          <Tooltip
            labelFormatter={(value) => {
              return `Date: ${format(new Date(value), "dd/MM/yyyy")}`
            }}
            animationEasing={"ease-out"}
          />

          <Area
            name="Charge (kg)"
            dot={false}
            type="monotone"
            dataKey="weight[0]"
            fill="url(#date_session)" // Use the gradient fill
            stroke="#38b2ac" // You can set stroke color separately if needed
            strokeWidth={2}
            fillOpacity={1}
            activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default ExerciseChart
