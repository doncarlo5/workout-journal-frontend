import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const DoExercisePage = () => {
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  const [isTimerPlaying, setIsTimerPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const [formState, setFormState] = useState({
    rep1: "",
    rep2: "",
    rep3: "",
    weight1: "",
    weight2: "",
    weight3: "",
  })

  const navigate = useNavigate()

  const fetchAllExerciseTypes = async () => {
    try {
      const response = await myApi.get("/exercise-type")
      setAllExerciseTypes(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchAllExerciseTypes()
  }, [])

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.post("/exercise-user", {
        date: new Date(),
        type: oneExerciseType._id,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
      })
      console.log("response is:", response)
      navigate("/exercises-list/")
    } catch (error: any) {
      console.log(error)
    }
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes === 0 && remainingSeconds === 0) {
      return ""
    } else if (minutes === 0) {
      return `${remainingSeconds} sec`
    } else {
      const minutesString = minutes > 0 ? `${minutes} min` : ""
      const secondsString = remainingSeconds > 0 ? ` ${remainingSeconds} sec` : ""
      return `${minutesString}${secondsString}`
    }
  }

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return (
        <div className=" flex flex-col justify-center">
          <p className="flex justify-center">Go !</p>
          <button
            className="mt-2 rounded-xl bg-slate-100 px-6 py-0.5 text-slate-600 hover:bg-slate-200"
            onClick={() => setKey((prevKey) => prevKey + 1)}
          >
            Restart
          </button>
        </div>
      )
    }

    console.log("remainingTime is:", remainingTime)
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return (
      <div className="flex flex-col">
        <div className=" cursor-pointer" onClick={() => setIsTimerPlaying(!isTimerPlaying)}>
          <div className="flex justify-center text-xs">Temps restant</div>
          <div className="flex justify-center text-2xl font-black">{`${minutes}:${formattedSeconds}`}</div>
          {isTimerPlaying ? (
            <div className="flex justify-center">
              <button
                className="mt-2 rounded-xl bg-orange-100 px-6 py-0.5 text-orange-600 hover:bg-orange-200"
                onClick={() => setKey((prevKey) => prevKey + 1)}
              >
                Stop
              </button>
            </div>
          ) : (
            <div className="mt-2 rounded-xl bg-green-100 px-6 py-0.5 text-green-600 hover:bg-green-200">Play</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Lance un exercice 🏁</h1>
        </div>
        <Select onValueChange={setOneExerciseType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type d'exercice" />
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
        {oneExerciseType && (
          <div className=" flex justify-center">
            <CountdownCircleTimer
              key={key}
              isPlaying={isTimerPlaying}
              duration={oneExerciseType?.timer}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: oneExerciseType?.timer })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        )}
        <div>
          <p className="text-gray-500 dark:text-gray-400">Conseil: {oneExerciseType?.advice}</p>
          <p className="text-gray-500 dark:text-gray-400">Temps de repos: {formatTime(oneExerciseType?.timer)}</p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rep1">Répétition 1</Label>
              <Input
                id="rep1"
                placeholder="Exemple: 12"
                value={formState.rep1}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight1">Poids 1</Label>
              <Input
                id="weight1"
                placeholder="Exemple: 20"
                value={formState.weight1}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rep2">Répétition 2</Label>
              <Input id="rep2" placeholder="" value={formState.rep2} onChange={handleChange} required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight2">Poids 2</Label>
              <Input
                id="weight2"
                placeholder=""
                value={formState.weight2}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repRange2">Répétition 3</Label>
              <Input id="rep3" placeholder="" value={formState.rep3} onChange={handleChange} required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight3">Poids 3</Label>
              <Input
                id="weight3"
                placeholder=""
                value={formState.weight3}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <Button className="col-span-2 w-full" type="submit">
              Enregistrer l'exercise
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default DoExercisePage
