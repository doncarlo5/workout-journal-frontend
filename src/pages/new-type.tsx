import React, { useEffect, useState } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { CalendarIcon, DragHandleHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { ChevronLeft, LucidePlusCircle, MessageSquareMore } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import ExerciseCard from "@/components/exercise-card"
import { Navbar } from "@/components/navbar"

import myApi from "../lib/api-handler"

interface FormState {
  id: string
  name: string
  advice: string
  timer: string
  repRange1: string
  repRange2: string
  repRange3: string
  type_session: string
}

const NewType = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [type, setType] = useState<any>({})
  const [formState, setFormState] = useState<FormState>({
    id: "",
    name: "",
    advice: "",
    timer: 0,
    repRange1: "",
    repRange2: "",
    repRange3: "",
    type_session: "",
  })

  const { typeId } = useParams()
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const key = target.id
    const value = target.value
    setFormState({ ...formState, [key]: value })
  }

  const handleRadioChange = (value: string) => {
    setFormState({ ...formState, type_session: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("send response when submit", formState)
      const timerValue = parseInt(formState.timer)
      const response = await myApi.post(`/exercise-type`, {
        name: formState.name,
        type_session: formState.type_session,
        timer: timerValue,
        repRange1: formState.repRange1,
        repRange2: formState.repRange2,
        repRange3: formState.repRange3,
        advice: formState.advice,
      })
      navigate(`/types/${response.data.id}`)
    } catch (error) {
      const err = error as AxiosError
      console.error(err.response?.data)
    }
  }

  return (
    <>
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <div className="mx-auto max-w-sm space-y-6">
        <div className="flex items-center space-y-2 text-left">
          <Link to="/types">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="ml-5 text-3xl font-bold">Nouveau type</h1>
          </div>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                placeholder="Ex: Développé couché - Haltères"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="">Type de séance :</Label>
              <RadioGroup
                required
                onValueChange={handleRadioChange}
                defaultValue={formState.type_session}
                value={formState.type_session}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Upper A" id="Upper A" />
                  <Label htmlFor="Upper A">Upper A</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Lower" id="Lower" />
                  <Label htmlFor="Lower">Lower</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Upper B" id="Upper B" />
                  <Label htmlFor="Upper B">Upper B</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2"></div>

            <div className="space-y-2">
              <Label htmlFor="timer">{`Timer (en s)`}</Label>
              <Input
                required
                id="timer"
                placeholder="Ex: 120"
                value={formState.timer}
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="space-y-2"></div>

            <div className="space-y-2">
              <Label htmlFor="repRange1">Rep Range 1</Label>
              <Input
                required
                id="repRange1"
                placeholder="4-6"
                value={formState.repRange1}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="space-y-2"></div>
            <div className="space-y-2">
              <Label htmlFor="repRange2">Rep Range 2</Label>
              <Input
                required
                id="repRange2"
                placeholder="6-8"
                value={formState.repRange2}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="space-y-2"></div>

            <div className="space-y-2">
              <Label htmlFor="repRange3">Rep Range 3</Label>
              <Input
                required
                id="repRange3"
                placeholder="8-10"
                value={formState.repRange3}
                onChange={handleChange}
                type="text"
              />
            </div>

            <div className="grid grid-flow-col grid-rows-3"></div>

            <div className="col-span-2 resize space-y-2">
              <Label htmlFor="advice">Conseil</Label>
              <Textarea
                id="advice"
                placeholder="Rétraction scapulaire, lever les fesses pour prendre la barre, etc."
                value={formState.advice}
                onChange={handleChange}
                maxLength={200}
              />
            </div>
            <Button className="col-span-2 mb-5 w-full" type="submit">
              Valider
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewType
