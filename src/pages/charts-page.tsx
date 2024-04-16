import React, { PureComponent, useEffect, useState } from "react"
import { format } from "date-fns"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import myApi from "@/lib/api-handler"
import { Navbar } from "@/components/navbar"

function ChartsPage() {
  const [session, setSession] = useState([] as any[])

  const fetchUserSessions = async () => {
    try {
      const response = await myApi.get("/sessions?limit=1000&sort=-updatedAt")
      console.log("👋 response data", response.data)
      setSession(response.data)
      console.log("👋 session", session)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const dateFormatter = (dateString) => {
    const formattedDate = format(new Date(dateString), "dd MMM yyyy")
    return formattedDate
  }

  useEffect(() => {
    fetchUserSessions()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {session.length !== 0 && (
        <main className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Évolution</h1>
          <ResponsiveContainer width="60%" height="60%">
            <LineChart
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" tickFormatter={dateFormatter} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="body_weight" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </main>
      )}
      {session.length === 0 && (
        <main className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mb-5 mt-5 text-3xl font-bold">Évolution</h1>
          <p>En attente de nouveaux exercices...</p>
        </main>
      )}
    </div>
  )
}

export default ChartsPage
