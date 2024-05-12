import { useEffect, useState } from "react"
import { format } from "date-fns"
import { LucideLoader2 } from "lucide-react"
import { Area, AreaChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import myApi from "@/lib/api-handler"

function BodyWeightChart() {
  const [session, setSession] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/api/sessions?limit=1000&sort=date_session")
      setSession(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatXAxis = (tickFormat: string) => {
    const formattedDate = format(new Date(tickFormat), "dd/MM/yyyy")
    return formattedDate
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])
  return (
    <>
      {isLoading && (
        <main className="flex flex-1 items-center justify-center">
          <div className="container flex flex-col items-center justify-center p-20">
            <div className="">
              <LucideLoader2 className=" animate-spin" size={32} />
            </div>
          </div>
        </main>
      )}
      {session.length === 0 && !isLoading && (
        <div className="mt-5 text-center">
          <p>En attente de nouvelles séances...</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          width={500}
          height={300}
          data={session}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="date_session" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B99C70" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B99C70" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date_session" tickFormatter={(tick) => formatXAxis(tick)} />
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
            dataKey="body_weight"
            stroke="#B99C70"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#date_session)"
            activeDot={{ stroke: "white", strokeWidth: 2, r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default BodyWeightChart
