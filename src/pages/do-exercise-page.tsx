import { useEffect, useState } from "react"
import { LucideCalendarClock } from "lucide-react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const DoExercisePage = () => {
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [lastExercise, setLastExercise] = useState(null as any)
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  const [isTimerPlaying, setIsTimerPlaying] = useState(false)
  const [key, setKey] = useState(0)
  const [session, setSession] = useState<any>({})

  const [formState, setFormState] = useState({
    rep1: lastExercise?.rep[0] || "",
    rep2: lastExercise?.rep[1] || "",
    rep3: lastExercise?.rep[2] || "",
    weight1: lastExercise?.weight[0] || "",
    weight2: lastExercise?.weight[1] || "",
    weight3: lastExercise?.weight[2] || "",
    comment: lastExercise?.comment || "",
  })

  useEffect(() => {
    setFormState({
      rep1: lastExercise?.rep[0] || "",
      weight1: lastExercise?.weight[0] || "",
      rep2: lastExercise?.rep[1] || "",
      weight2: lastExercise?.weight[1] || "",
      rep3: lastExercise?.rep[2] || "",
      weight3: lastExercise?.weight[2] || "",
      comment: lastExercise?.comment || "",
    })
  }, [lastExercise])

  const onExerciseTypeChange = async (value: any) => {
    setOneExerciseType(value)
    const response = await myApi.get(`/exercise-user?limit=1&sort=-createdAt&type=${value._id}`)
    setLastExercise(response.data[0])
    console.log("lastExercise is:", response.data[0])
  }

  const fetchOneSession = async () => {
    try {
      const response = await myApi.get(`/sessions/${sessionId}`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const navigate = useNavigate()

  const fetchAllExerciseTypes = async (sessionData: any) => {
    try {
      const response = await myApi.get(`/exercise-type?type_session=${sessionData.type_session}`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    const init = async () => {
      const sessionData = await fetchOneSession()
      setSession(sessionData)
      console.log("👋 sessionData", sessionData)
      const exerciseTypeData = await fetchAllExerciseTypes(sessionData)
      setAllExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  console.log("👋 allExerciseTypes", allExerciseTypes)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  let { sessionId } = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.post("/exercise-user", {
        type: oneExerciseType._id,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
        comment: formState.comment,
      })

      const updatedSession = {
        ...session,
        exercise_user_list: [...session.exercise_user_list, response.data.id],
      }

      const responseSession = await myApi.put(`/sessions/${sessionId}`, updatedSession)

      navigate(`/sessions/${sessionId}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  // format lastexercise.createdAt

  function formatDateFrench(dateString: string) {
    const date = new Date(dateString)
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleString("fr-FR", options)
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
          <p className="flex	select-none justify-center">Go !</p>
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
          <div className=" flex	select-none justify-center text-xs">Temps restant</div>
          <div className="flex	select-none justify-center text-2xl font-black">{`${minutes}:${formattedSeconds}`}</div>
          {isTimerPlaying ? (
            <div className="flex justify-center">
              <button
                className="mt-2	select-none rounded-xl bg-orange-100 px-6 py-0.5 text-orange-600 hover:bg-orange-200"
                onClick={() => setKey((prevKey) => prevKey + 1)}
              >
                Stop
              </button>
            </div>
          ) : (
            <div className="mt-2	select-none rounded-xl bg-green-100 px-6 py-0.5 text-green-600 hover:bg-green-200">
              Play
            </div>
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
        <div className="flex justify-between">
          <h1 className="w-2/5 text-3xl font-light">{session.type_session}</h1>
          <h1 className=" text-right text-3xl font-bold">{oneExerciseType?.name}</h1>
        </div>
        {lastExercise && (
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <LucideCalendarClock className=" size-4" /> <div>Fait le {formatDateFrench(lastExercise?.createdAt)}</div>
          </div>
        )}
        <Select onValueChange={onExerciseTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Nom de l'exercice" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allExerciseTypes.map((type) => (
                <SelectItem key={type._id} value={type}>
                  {type.name} {"("}
                  {type.type}
                  {")"}
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
              colors={["#D19F55", "#B99C70", "#B99C70"]}
              colorsTime={[30, 10, 7]}
              onComplete={() => ({ shouldRepeat: false, delay: 1, newInitialRemainingTime: oneExerciseType?.timer })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        )}
        <div>
          <p className="text-gray-500 dark:text-gray-400">Conseil: {oneExerciseType?.advice}</p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rep1">Répétition 1</Label>
              <Input
                id="rep1"
                placeholder={lastExercise?.rep[0] || "Exemple: 5"}
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
                placeholder={lastExercise?.weight[0] || "Exemple: 20"}
                value={formState.weight1}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rep2">Répétition 2</Label>
              <Input
                id="rep2"
                placeholder={lastExercise?.rep[1] || "Exemple: 7"}
                value={formState.rep2}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight2">Poids 2</Label>
              <Input
                id="weight2"
                placeholder={lastExercise?.weight[1] || "Exemple: 18"}
                value={formState.weight2}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repRange2">Répétition 3</Label>
              <Input
                id="rep3"
                placeholder={lastExercise?.rep[2] || "Exemple: 10"}
                value={formState.rep3}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight3">Poids 3</Label>
              <Input
                id="weight3"
                placeholder={lastExercise?.weight[2] || "Exemple: 16"}
                value={formState.weight3}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="comment">Notes</Label>
              <Input
                id="comment"
                placeholder={lastExercise?.comment || "Ton ressenti sur l'exercice?"}
                value={formState.comment}
                onChange={handleChange}
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
