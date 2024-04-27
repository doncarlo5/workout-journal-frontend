import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountDownTimer from "@/components/countdown-timer"
import { Navbar } from "@/components/navbar"

function TimerPage() {
  const [customTimer, setCustomTimer] = useState(120)

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
              <h1 className="ml-5 py-5 text-3xl font-medium">Timer</h1>
            </div>
          </div>
          <CountDownTimer exerciseTypeTimer={customTimer} />
          <div className=" mt-5">
            <div className=" flex flex-col justify-center gap-3">
              <h1 className="flex justify-center text-xl font-medium">Select Timer</h1>
              <Input type="number" value={customTimer} onChange={(e) => setCustomTimer(parseInt(e.target.value))} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TimerPage
