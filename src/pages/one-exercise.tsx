import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { useNavigate, useParams } from "react-router-dom"

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
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const OneExercise = () => {
  const { exerciseId } = useParams()

  const navigate = useNavigate()

  const [isEditable, setIsEditable] = useState(false)

  const toggleIsEditable = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditable((current) => !current)
  }

  // const [error, setError] = useState("")

  const [formState, setFormState] = useState({
    id: "",
    name: "",
    date: "",
    rep1: "",
    rep2: "",
    rep3: "",
    weight1: "",
    weight2: "",
    weight3: "",
    updatedAt: "",
  })

  const [exercise, setExercise] = useState<any>({})
  const fetchOneExercise = async () => {
    try {
      const response = await myApi.get(`/exercise-user/${exerciseId}`)

      setFormState({
        id: response.data._id,
        name: response.data.type.name,
        date: response.data.date,
        rep1: response.data.rep[0],
        rep2: response.data.rep[1],
        rep3: response.data.rep[2],
        weight1: response.data.weight[0],
        weight2: response.data.weight[1],
        weight3: response.data.weight[2],
        updatedAt: response.data.updatedAt,
      })

      const newExercise = response.data.type
      setExercise(newExercise)
      setOneExerciseType(newExercise)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  useEffect(() => {
    fetchOneExercise()
    fetchExerciseTypes()
  }, [])

  const [oneExerciseType, setOneExerciseType] = useState(null as any)

  const [exerciseTypes, setExerciseTypes] = useState([] as any[])

  const fetchExerciseTypes = async () => {
    try {
      const response = await myApi.get("/exercise-type")
      setExerciseTypes(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("🔔", oneExerciseType)
      const response = await myApi.put(`/exercise-user/${exerciseId}`, {
        date: new Date(),
        type: oneExerciseType,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
      })
      console.log(response)
      fetchOneExercise()
      fetchExerciseTypes()
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { target } = event
    if (target instanceof HTMLInputElement) {
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/exercise-user/${id}`)
      console.log(response)
      fetchOneExercise()
      navigate("/exercises-list/")
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
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Ton exercice de {exercise?.name}</h1>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Créé le: {formatDate(formState.date)}</p>
          <p className="text-gray-500 dark:text-gray-400">Mis à jour le: {formatDate(formState.updatedAt)}</p>
        </div>
        <Select disabled={!isEditable} onValueChange={setOneExerciseType}>
          <SelectTrigger className="w-[180px]">
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
                disabled={!isEditable}
              />
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
                  <AlertDialogTitle>Es-tu sûr de vouloir supprimer ton exercice ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu ne pourras pas récupérer cet exercice une fois supprimé.
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

export default OneExercise
