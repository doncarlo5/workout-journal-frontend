import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

const DoExercisePage = () => {
  const [exerciceType, setExerciceType] = useState(null as any)

  const [formState, setFormState] = useState({
    rep1: "",
    rep2: "",
    rep3: "",
    weight1: "",
    weight2: "",
    weight3: "",
  })

  const [exerciseTypes, setExerciseTypes] = useState([] as any[])

  const fetchExerciseTypes = async () => {
    try {
      const response = await myApi.get("/exercise-type")
      console.log(response)
      setExerciseTypes(response.data)
    } catch (error) {
      console.error("Fetch error: ", error)
    }
  }

  useEffect(() => {
    fetchExerciseTypes()
  }, [])

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log(formState)
      const response = await myApi.post("/exercise-user", {
        date: new Date(),
        type: exerciceType._id,
        rep: [formState.rep1, formState.rep2, formState.rep3],
        weight: [formState.weight1, formState.weight2, formState.weight3],
      })
      console.log(response)
      navigate("/exerciseslist/")
    } catch (error: any) {
      console.log(error)
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

  // function validateInput(value: string) {
  //   console.log(value)
  //   const [firstRange, secondRange] = value.split("-")
  //   if (typeof +firstRange === "number" && typeof +secondRange === "number") {
  //     return value
  //   }
  //   return false
  // }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Exercise</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form to add a new exercise.</p>
        </div>
        <Select onValueChange={setExerciceType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type d'exercice" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {exerciseTypes.map((type) => (
                <SelectItem key={type._id} value={type}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rep1">Rep 1</Label>
              <Input
                id="rep1"
                placeholder="Rep 1"
                value={formState.rep1}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight1">Weight 1</Label>
              <Input
                id="weight1"
                placeholder="Weight 1"
                value={formState.weight1}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rep2">Rep 2</Label>
              <Input
                id="rep2"
                placeholder="Rep 2"
                value={formState.rep2}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight2">Weight 2</Label>
              <Input
                id="weight2"
                placeholder="Weight 2"
                value={formState.weight2}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repRange2">Rep 3</Label>
              <Input
                id="rep3"
                placeholder="Rep 3"
                value={formState.rep3}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight3">Weight 3</Label>
              <Input
                id="weight3"
                placeholder="Weight 3"
                value={formState.weight3}
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            <Button className="col-span-2 w-full" type="submit">
              Add Exercise
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default DoExercisePage
