// import useAuth from "@/context/use-auth"
// import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

// const { user } = useAuth()

export function SessionPage() {
  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Séances</h1>
          <p className="text-gray-500 dark:text-gray-400">Liste de toutes tes séances realisées.</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 font-bold">
            <div>Date</div>
            <div>Hour</div>
            <div>Session Name</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>12/02/2024</div>
            <div>11h</div>
            <div>Séance 2 : Lower</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>10/02/2024</div>
            <div>17h</div>
            <div>Séance 1 : Lower</div>
          </div>
          <Button className="w-full">Create New Session</Button>
        </div>
      </div>
    </>
  )
}

export default SessionPage
