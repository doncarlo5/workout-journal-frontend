import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { ChevronLeft } from "lucide-react"
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
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const OneSession = () => {
  const [oneSessionType, setOneSessionType] = useState(null as any)
  const [isEditable, setIsEditable] = useState(false)
  const [session, setSession] = useState<any>({})
  const [formState, setFormState] = useState({
    id: "",
    date_session: "",
    type_session: "",
    body_weight: "",
    exercise_user_list: "",
    isDone: "",
  })

  const { sessionId } = useParams()
  const navigate = useNavigate()

  const toggleIsEditable = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditable((current) => !current)
  }

  const fetchOneSession = async () => {
    try {
      const response = await myApi.get(`/session/${sessionId}`)
      console.log("👋 response data", response.data)

      setFormState({
        id: response.data._id,
        date_session: response.data.date_session,
        type_session: response.data.type_session,
        body_weight: response.data.body_weight,
        exercise_user_list: response.data.exercise_user_list,
        isDone: response.data.isDone,
      })

      const newSession = response.data
      setSession(newSession)
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
      const key = target.id
      const value = target.value
      setFormState({ ...formState, [key]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await myApi.put(`/session/${sessionId}`, {
        date_session: new Date(),
        body_weight: formState.body_weight,
        exercise_user_list: formState.exercise_user_list,
        isDone: formState.isDone,
      })
      console.log(response)
      fetchOneSession()
      setIsEditable(false)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await myApi.delete(`/session/${id}`)
      console.log(response)
      fetchOneSession()
      navigate("/session/")
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/exercises-list">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-medium">Ta séance </h1>
            <h1 className="ml-5 text-3xl font-bold">{session?.type_session}</h1>
          </div>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Créé le: {formatDate(formState.date_session)}</p>
        </div>
        <Select disabled={!isEditable} onValueChange={setOneSessionType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={formState.type_session} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Upper A">{"Upper A"}</SelectItem>
              <SelectItem value="Lower">{"Lower"}</SelectItem>
              <SelectItem value="Upper B">{"Upper B"}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
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
            </div> */}
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
