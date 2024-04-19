import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { format, parseISO, toDate } from "date-fns"
import { ChevronLeft, LucideCalendarCheck2, LucideCalendarClock } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const OneExercise = () => {
  const [isEditable, setIsEditable] = useState(false)
  const [session, setSession] = useState([] as any)
  const [exercise, setExercise] = useState<any>({})
  const [oneExerciseType, setOneExerciseType] = useState(null as any)
  const [exerciseTypes, setExerciseTypes] = useState([] as any[])
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    rep1: "",
    rep2: "",
    rep3: "",
    weight1: "",
    weight2: "",
    weight3: "",
    comment: "",
  })

  const { exerciseId } = useParams()
  const navigate = useNavigate()

  const toggleIsEditable = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditable((current) => !current)
  }

  const fetchOneExercise = async () => {
    try {
      const response = await myApi.get(`/exercise-user/${exerciseId}`)

      setFormState({
        id: response.data._id,
        name: response.data.type.name,
        rep1: response.data.rep[0],
        rep2: response.data.rep[1],
        rep3: response.data.rep[2],
        weight1: response.data.weight[0],
        weight2: response.data.weight[1],
        weight3: response.data.weight[2],
        comment: response.data.comment,
      })

      console.log("👋 response formstate", response.data)

      const newExercise = response.data.type
      setExercise(newExercise)
      setOneExerciseType(newExercise)
      return response.data
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  const fetchOneSession = async (sessionId: string) => {
    try {
      const response = await myApi.get(`/sessions/${sessionId}`)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const fetchAllExerciseTypes = async (sessionData: any) => {
    try {
      // const response = await myApi.get(`/exercise-type?type_session=${sessionData.type_session}&limit=1000`)
      const response = await myApi.get(`/exercise-type?limit=1000`)
      console.log("👁️‍🗨️ sessionData Type Session", sessionData.type_session)
      return response.data
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  // useEffect(() => {
  //   fetchOneExercise()
  //   fetchOneSession()
  //   fetchExerciseTypes()
  // }, [])

  useEffect(() => {
    const init = async () => {
      const oneExercise = await fetchOneExercise()
      console.log("👋 oneExercise", oneExercise)
      const sessionData = await fetchOneSession(oneExercise.session)
      setSession(sessionData)
      console.log("👋 sessionData", sessionData)
      const exerciseTypeData = await fetchAllExerciseTypes(sessionData)
      setExerciseTypes(exerciseTypeData)
    }
    init()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.put(`/exercise-user/${exerciseId}`, {
        type: oneExerciseType,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
        comment: formState.comment,
      })
      console.log(response)
      // fetchOneSession()
      fetchOneExercise()
      setIsEditable(false)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/exercise-user/${id}`)
      console.log(response)
      fetchOneExercise()
      navigate(`/sessions/${session._id}`)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/exercises">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Ton exercice de </h1>
            <h1 className="ml-5 text-3xl font-bold">{exercise?.name}</h1>
          </div>
        </div>
        {session._id && (
          <div>
            <Link
              className="flex items-center gap-1 text-sm text-gray-500 hover:underline dark:text-gray-400"
              to={`/sessions/${session._id}`}
            >
              <LucideCalendarClock className="size-4" />{" "}
              <div>Séance du {format(session?.date_session, "dd/MM/yyyy")}</div>
            </Link>
          </div>
        )}
        <Select disabled={!isEditable} onValueChange={setOneExerciseType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={formState.name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {exerciseTypes.map((type) => (
                <SelectItem key={type._id} value={type._id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rep1">Répétition 1</Label>
              <Input
                id="rep1"
                placeholder="`${formState.rep1}`"
                value={formState.rep1}
                onChange={handleChange}
                required
                type="number"
                disabled={!isEditable}
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
                type="number"
                disabled={!isEditable}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rep2">Répétition 2</Label>
              <Input
                id="rep2"
                placeholder=""
                value={formState.rep2}
                onChange={handleChange}
                required
                type="number"
                disabled={!isEditable}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight2">Poids 2</Label>
              <Input
                id="weight2"
                placeholder=""
                value={formState.weight2}
                onChange={handleChange}
                required
                type="number"
                disabled={!isEditable}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repRange2">Répétition 3</Label>
              <Input
                id="rep3"
                placeholder=""
                value={formState.rep3}
                onChange={handleChange}
                required
                type="number"
                disabled={!isEditable}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight3">Poids 3</Label>
              <Input
                id="weight3"
                placeholder=""
                value={formState.weight3}
                onChange={handleChange}
                required
                type="number"
                disabled={!isEditable}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="comment">Notes</Label>
              <Textarea
                id="comment"
                placeholder="Aucune note."
                value={formState.comment}
                onChange={handleChange}
                maxLength={200}
                disabled={!isEditable}
              />
            </div>
            <Button variant="outline" onClick={toggleIsEditable} className="col-span-2 w-full">
              {isEditable ? "Annuler" : "Modifier"}
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
                  <AlertDialogTitle>Es-tu sûr de vouloir supprimer ton exercice ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu ne pourras pas récupérer cet exercice une fois supprimé.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => handleDelete(formState.id)}>
                    Confirmer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </>
  )
}

export default OneExercise
