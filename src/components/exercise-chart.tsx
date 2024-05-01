import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import myApi from "@/lib/api-handler"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

function ExerciseChart() {
  const [exercise, setExercise] = useState([] as any[])
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  // const [isSelected, setIsSelected] = useState(false)

  const fetchAllExerciseTypes = async () => {
    try {
      const response = await myApi.get(`/api/exercise-type?limit=1000`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
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
    // setIsSelected(true)
    const response = await myApi.get(`/api/exercise-user?limit=1000&sort=createdAt&type=${value._id}`)
    setExercise(response.data)
    console.log("OneExercise 😀", exercise)

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

      {/* <LineChart width={500} height={300} data={exercise} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        {exercise.map((sym) => (
          <Line
            type="monotone"
            dataKey={(sym) => sym.value.find((e: any) => e.session === sym).date_session}
            name={sym}
            stroke="#8884d8"
            dot={false}
          />
        ))}
        <XAxis dataKey="date_session" />
        <Legend />
        <YAxis />
      </LineChart> */}

      <ResponsiveContainer width="100%" height="75%">
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
          {exercise.map((sym) => {
            console.log("sym", sym)
            return (
              <>
                <defs>
                  <linearGradient id={sym.session} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B99C70" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B99C70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey={sym.session} tickFormatter={(tick) => formatXAxis(tick)} />
              </>
            )
          })}

          <YAxis name="Kg" domain={["auto", "auto"]}>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "100%",
                fill: "#666666",
              }}
              position="left"
              value={"KG"}
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
            name="Poids"
            dot={false}
            type="monotone"
            dataKey="weight[0]"
            stroke="#B99C70"
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
