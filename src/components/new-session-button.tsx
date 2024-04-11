import React from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import { useNavigate, useParams } from "react-router-dom"

import myApi from "../lib/api-handler"
import IconChest from "./chest-icon"
import IconLegs from "./legs-icon"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

function NewSessionButton() {
  const navigate = useNavigate()

  const handleCreateSession = async (e: React.FormEvent, userChoice: string) => {
    e.preventDefault()
    try {
      const response = await myApi.post("/sessions", {
        date_session: new Date(),
        type_session: userChoice,
        body_weight: 30,
        exercise_user_list: [],
        is_done: false,
        comment: "",
      })
      console.log("response is:", response)
      const newSessionId = response.data._id
      navigate(`/sessions/${newSessionId}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className=" rounded-2xl" variant="outline">
          <PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className=" text-left">
            <DrawerTitle>Nouvelle séance</DrawerTitle>
            <DrawerDescription>Créer une séance pour choisir tes exercises.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between space-x-2">
              <Button
                onClick={(e) => handleCreateSession(e, "Upper A")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md"
              >
                <p className="mb-1 mt-4 text-lg">Upper A</p>
                <IconChest className="mt-3" />
                <span className="sr-only">Upper A</span>
              </Button>
              <Button
                onClick={(e) => handleCreateSession(e, "Lower")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md"
              >
                <p className="mb-1 mt-4 text-lg">Lower</p>
                <IconLegs className="mt-3" />
                <span className="sr-only">Lower</span>
              </Button>
              <Button
                onClick={(e) => handleCreateSession(e, "Upper B")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md"
              >
                <p className="mb-1 mt-4 text-lg">Upper B</p>
                <IconChest className="mt-3" />
                <span className="sr-only">Upper B</span>
              </Button>
            </div>
            <div className="mt-3 h-2"></div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NewSessionButton
