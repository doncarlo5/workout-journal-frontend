import React, { useEffect, useState } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { CalendarIcon } from "@radix-ui/react-icons"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { ChevronLeft, LucidePlusCircle } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { Link, useNavigate, useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
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
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ExerciseCard from "@/components/exercise-card"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

interface FormState {
  id: string
  date_session: string
  type_session: string
  body_weight: string
  exercise_user_list: any[]
  is_done: boolean
}

const OneSession = () => {
  const [oneSessionType, setOneSessionType] = useState(null as any)
  const [isLoading, setIsLoading] = useState(true)
  const [field, setField] = useState({ value: null } as any)
  const [weight, setWeight] = useState(null as any)
  const [date, setDate] = useState<Date>()
  const [isChecked, setIsChecked] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [session, setSession] = useState<any>({})
  const [formState, setFormState] = useState<FormState>({
    id: "",
    date_session: "",
    type_session: "",
    body_weight: "",
    exercise_user_list: [],
    is_done: false,
  })

  const { sessionId } = useParams()
  const navigate = useNavigate()

  const toggleIsEditable = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditable((current) => !current)
  }

  const fetchOneSession = async () => {
    try {
      const response = await myApi.get(`/sessions/${sessionId}`)

      setFormState({
        id: response.data._id,
        date_session: response.data.date_session,
        type_session: response.data.type_session,
        body_weight: response.data.body_weight,
        exercise_user_list: response.data.exercise_user_list,
        is_done: response.data.is_done,
      })

      const newSession = response.data
      setSession(newSession)
      setIsLoading(false)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  useEffect(() => {
    fetchOneSession()
  }, [])

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const { name, value, type, checked } = target
      if (type === "checkbox") {
        setFormState({ ...formState, [name]: checked })
      } else {
        setFormState({ ...formState, [name]: value })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("👋 handleSubmit")
    try {
      const response = await myApi.put(`/sessions/${sessionId}`, {
        date_session: formState.date_session,
        type_session: formState.type_session,
        body_weight: formState.body_weight,
        exercise_user_list: formState.exercise_user_list,
        is_done: formState.is_done,
      })
      console.log("👋 response", response.data)
      fetchOneSession()
      setIsEditable(false)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/sessions/${id}`)
      console.log(response)
      fetchOneSession()
      navigate("/session/")
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const handleSelectDate: SelectSingleEventHandler = (date: Date | undefined) => {
    setDate(date)
    setFormState({ ...formState, date_session: date?.toString() || "" })
  }

  const handleCheckboxChange: (isChecked: CheckedState) => void = (isChecked) => {
    setIsChecked(!isChecked)
    setFormState({ ...formState, is_done: Boolean(isChecked) })
  }

  const handleSelectWeight = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const { value } = target
      setWeight(value)
      setFormState({ ...formState, body_weight: value })
    }
  }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/sessions">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Ta séance </h1>
            <h1 className="ml-5 text-3xl font-bold">{session?.type_session}</h1>
          </div>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session_date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!isEditable}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !formState.date_session && "text-muted-foreground"
                    )}
                  >
                    {formState.date_session ? format(formState.date_session, "PPP") : <span>Choisir une date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    id="session_date"
                    mode="single"
                    selected={formState.date_session ? new Date(formState.date_session) : undefined}
                    onSelect={handleSelectDate}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2"></div>

            <div className="space-y-2">
              <Label htmlFor="body_weight">Poids</Label>
              <Input
                id="body_weight"
                placeholder="`${formState.body_weight}`"
                value={formState.body_weight}
                onChange={handleSelectWeight}
                required
                type="number"
                disabled={!isEditable}
              />
            </div>

            <div className="grid grid-flow-col grid-rows-3"></div>

            <div className=" col-span-2 ">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:shadow-sm">
                  <div className="grid gap-4 ">
                    {isLoading ? (
                      <div className="col-span-full flex items-center justify-center">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      formState.exercise_user_list.map((exercise: any) => (
                        <ExerciseCard exercise={exercise} key={exercise._id} />
                      ))
                    )}
                  </div>
                  <div className="mt-auto p-4">
                    <Link to={`/sessions/${sessionId}/do-exercise`}>
                      <Button className="w-full">
                        {" "}
                        <LucidePlusCircle className=" mr-2 size-5" />
                        Ajouter un exercise{" "}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <Checkbox
                defaultChecked={formState.is_done}
                disabled={!isEditable}
                checked={formState.is_done}
                onCheckedChange={handleCheckboxChange}
                id="is_done"
              />
              <Label
                htmlFor="is_done"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Séance terminée
              </Label>
            </div>
            <Button variant="outline" onClick={toggleIsEditable} className="col-span-2 w-full">
              Éditer
            </Button>
            <Button disabled={!isEditable} className="col-span-2 w-full" type="submit">
              Mettre à jour
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="col-span-2 mb-5 w-full">
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Es-tu sûr de vouloir supprimer ta séance ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu ne pourras pas récupérer cette séance une fois supprimée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(formState.id)}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </>
  )
}

export default OneSession
