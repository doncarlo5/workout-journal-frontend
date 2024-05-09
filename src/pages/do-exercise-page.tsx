import { useEffect, useState } from "react"
import { Accordion, AccordionItem } from "@radix-ui/react-accordion"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ChevronLeft, Edit, LucideCheckCircle, LucideInfo, LucideLoader2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import CountDownTimer from "@/components/countdown-timer"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const DoExercisePage = () => {
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [lastExercise, setLastExercise] = useState(null as any)
  const [allExerciseTypes, setAllExerciseTypes] = useState([] as any[])
  const [session, setSession] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTypes, setIsLoadingTypes] = useState(false)

  const [formState, setFormState] = useState({
    rep1: lastExercise?.rep[0] || "",
    rep2: lastExercise?.rep[1] || "",
    rep3: lastExercise?.rep[2] || "",
    weight1: lastExercise?.weight[0] || "",
    weight2: lastExercise?.weight[1] || "",
    weight3: lastExercise?.weight[2] || "",
    comment: lastExercise?.comment || "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    setFormState({
      rep1: lastExercise?.rep[0] || "",
      weight1: lastExercise?.weight[0] || "",
      rep2: lastExercise?.rep[1] || "",
      weight2: lastExercise?.weight[1] || "",
      rep3: lastExercise?.rep[2] || "",
      weight3: lastExercise?.weight[2] || "",
      comment: "",
    })
  }, [lastExercise])

  const onExerciseTypeChange = async (value: any) => {
    setOneExerciseType(value)
    const response = await myApi.get(`/api/exercise-user?limit=1&sort=-createdAt&type=${value._id}`)

    setLastExercise(response.data[0])

    console.log("lastExercise is:", response.data[0])
  }

  const fetchOneSession = async () => {
    try {
      const response = await myApi.get(`/api/sessions/${sessionId}`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const fetchAllExerciseTypes = async (sessionData: any) => {
    try {
      setIsLoadingTypes(true)
      const response = await myApi.get(`/api/exercise-type?type_session=${sessionData.type_session}&limit=1000`)
      console.log("👋 fetchAllExerciseTypes", response.data)
      setIsLoadingTypes(false)
      return response.data
    } catch (error) {
      setIsLoadingTypes(false)
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("event.target", event.target.value)
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  let { sessionId } = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await myApi.post("/api/exercise-user", {
        type: oneExerciseType._id,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
        comment: formState.comment,
        session: sessionId,
      })

      const updatedSession = {
        exercise_user_list: [...session.exercise_user_list, response.data.id],
      }

      const responseSession = await myApi.put(`/api/sessions/${sessionId}`, updatedSession)
      console.log(responseSession)

      navigate(`/history/session/${sessionId}`)
    } catch (error: any) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />

      <main className="container mx-auto my-0 flex h-dvh max-w-md flex-col">
        <div className="flex items-center space-y-2 py-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-10/12 rounded-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Annuler l'exercice?</AlertDialogTitle>
                <AlertDialogDescription>Les seront données seront perdues.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  <Link to={`/history/session/${sessionId}`}>Confirmer</Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div>
            {oneExerciseType ? (
              <h1 className="ml-5 text-xl font-bold md:text-3xl">{oneExerciseType?.name}</h1>
            ) : (
              <h1 className="ml-5 text-xl font-medium md:text-3xl">Nouvel exercice</h1>
            )}
          </div>
        </div>

        <Select onValueChange={onExerciseTypeChange}>
          <SelectTrigger className="w-full data-[placeholder]:italic data-[placeholder]:text-gray-700">
            <SelectValue className="" placeholder="Sélectionne un exercice..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allExerciseTypes.map((type) => (
                <SelectItem key={type._id} value={type}>
                  {isLoadingTypes ? (
                    <div role="status" className="max-w-sm animate-pulse items-center flex">
                      <div className="mb-2 h-4 w-64 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  ) : (
                    type.name
                  )}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="pt-3">{oneExerciseType && <CountDownTimer exerciseTypeTimer={oneExerciseType.timer} />}</div>
        {oneExerciseType?.advice && (
          <Accordion type="single" collapsible className="mb-5 rounded-2xl bg-slate-100">
            <AccordionItem value="advice">
              <AccordionTrigger className="flex h-10 gap-2 px-5 text-left text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <LucideInfo className="size-4" /> <p className="text-left ">Conseil</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-3 pt-1 ">{oneExerciseType?.advice}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {oneExerciseType && (
          <form onSubmit={handleSubmit} className="">
            <div className="flex justify-center rounded-2xl bg-slate-50 py-4 md:text-lg">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">Série</p>
                  <p className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 ">
                    <label className="relative flex cursor-pointer items-center rounded-full " htmlFor="teal">
                      <input
                      placeholder={lastExercise?.rep[0]}
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-7 w-7 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-500 checked:bg-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
                        id="teal"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </p>
                  <p className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 ">
                    <label className="relative flex cursor-pointer items-center rounded-full " htmlFor="teal">
                      <input
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-7 w-7 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-500 checked:bg-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
                        id="teal"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </p>
                  <p className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 ">
                    <label className="relative flex cursor-pointer items-center rounded-full " htmlFor="teal">
                      <input
                        type="checkbox"
                        className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-7 w-7 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-8 before:w-8 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-teal-500 checked:bg-teal-500 checked:before:bg-teal-500 hover:before:opacity-10"
                        id="teal"
                      />
                      <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">Reps</p>
                  <Input
                    id="rep1"
                    placeholder={lastExercise?.rep[0]}
                    value={formState.rep1}
                    onChange={handleChange}
                    required
                    type="number"
                    className=" text-md w-12 rounded-xl text-center [appearance:textfield]  focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="rep2"
                    placeholder={lastExercise?.rep[1]}
                    value={formState.rep2}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md  w-12 rounded-xl text-center [appearance:textfield]  focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="rep3"
                    placeholder={lastExercise?.rep[2]}
                    value={formState.rep3}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md  w-12 rounded-xl text-center [appearance:textfield]  focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">KG</p>
                  <Input
                    id="weight1"
                    placeholder={lastExercise?.weight[0]}
                    value={formState.weight1}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md w-20 rounded-xl text-center  [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="weight2"
                    placeholder={lastExercise?.weight[1]}
                    value={formState.weight2}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md  w-20 rounded-xl text-center  [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Input
                    id="weight3"
                    placeholder={lastExercise?.weight[2]}
                    value={formState.weight3}
                    onChange={handleChange}
                    required
                    type="number"
                    className="text-md  w-20 rounded-xl text-center  [appearance:textfield] focus:bg-slate-50 focus:shadow-inner [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <p className="pb-1 text-sm text-gray-500 ">{`[Range]`}</p>
                  <p className="text-md flex h-9 w-full items-center justify-center rounded-md bg-transparent px-1 py-1 font-light italic text-gray-700 ">
                    {oneExerciseType?.repRange1}
                  </p>

                  <p className="text-md flex h-9 w-full items-center justify-center rounded-md bg-transparent px-1 py-1 font-light italic text-gray-700 ">
                    {oneExerciseType?.repRange2}
                  </p>
                  <p className="text-md flex h-9 w-full items-center justify-center rounded-md bg-transparent px-1 py-1 font-light italic text-gray-700 ">
                    {oneExerciseType?.repRange3}
                  </p>
                </div>
              </div>
              {/* 
              <Input
                id="rep1"
                placeholder={lastExercise?.rep[0] || "Exemple: 5"}
                value={formState.rep1}
                onChange={handleChange}
                required
                type="number"
                className="text-md rounded-xl text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight1">Poids 1 {`(kg)`}</Label>
              <Input
                id="weight1"
                placeholder={lastExercise?.weight[0] || "Exemple: 20"}
                value={formState.weight1}
                onChange={handleChange}
                required
                type="number"
              />
            </div>
            <div className="space-y-2 text-center select-none">
              <Label htmlFor="repRange1">Série 1</Label>
              <Badge
                className="justify-center text-lg font-light text-gray-500 select-none min-h-9 min-w-28"
                variant="secondary"
              >
                {oneExerciseType?.repRange1}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rep2">Rep 2</Label>
              <Input
                id="rep2"
                placeholder={lastExercise?.rep[1] || "Exemple: 7"}
                value={formState.rep2}
                onChange={handleChange}
                required
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight2">Poids 2 {`(kg)`}</Label>
              <Input
                id="weight2"
                placeholder={lastExercise?.weight[1] || "Exemple: 18"}
                value={formState.weight2}
                onChange={handleChange}
                required
                type="number"
              />
            </div>
            <div className="space-y-2 text-center select-none">
              <Label htmlFor="repRange1">Série 2</Label>
              <Badge
                className="justify-center text-lg font-light text-gray-500 select-none min-h-9 min-w-28"
                variant="secondary"
              >
                {oneExerciseType?.repRange2}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label htmlFor="repRange2">Rep 3</Label>
              <Input
                id="rep3"
                placeholder={lastExercise?.rep[2] || "Exemple: 10"}
                value={formState.rep3}
                onChange={handleChange}
                required
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight3">Poids 3 {`(kg)`}</Label>
              <Input
                id="weight3"
                placeholder={lastExercise?.weight[2] || "Exemple: 16"}
                value={formState.weight3}
                onChange={handleChange}
                required
                type="number"
              />
            </div>
            <div className="space-y-2 text-center select-none">
              <Label htmlFor="repRange1">Série 3</Label>
              <Badge
                className="justify-center text-lg font-light text-gray-500 select-none min-h-9 min-w-28 "
                variant="secondary"
              >
                {oneExerciseType?.repRange3}
              </Badge>
            </div>
            <div className="col-span-3 space-y-2">
              <Label htmlFor="comment">Notes</Label>
              <Textarea
                id="comment"
                placeholder={lastExercise?.comment ? `Note précédente: ${lastExercise?.comment}` : "Pas de notes."}
                value={formState.comment}
                onChange={handleChange}
                maxLength={200}
              />
            </div>
            <div className="col-span-3 pt-3 pb-5 ">
              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Chargement
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Valider
                </Button> */}
            </div>
            <div className="pt-5 ">
              <Accordion type="single" collapsible className="mb-5 rounded-2xl bg-slate-50">
                <AccordionItem value="comment">
                  <AccordionTrigger className="flex h-10 gap-2 px-5 text-left text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Edit className="size-4" /> <p>Notes</p>
                      {lastExercise?.comment && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 pt-1 ">
                    <Textarea
                      id="comment"
                      placeholder={
                        lastExercise?.comment
                          ? `Note précédente: ${lastExercise?.comment}`
                          : "Note précédente : Aucune."
                      }
                      value={formState.comment}
                      onChange={handleChange}
                      maxLength={200}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="mb-20 ">
              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Chargement
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  <LucideCheckCircle className="mr-2 size-5" />
                  Valider l'exercice
                </Button>
              )}
            </div>
          </form>
        )}
      </main>
    </>
  )
}

export default DoExercisePage
