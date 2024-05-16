import React, { useState } from "react"
import { LucideWeight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import myApi from "../lib/api-handler"
import IconChest from "./chest-icon"
import IconLegs from "./legs-icon"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Input } from "./ui/input"

function NewSessionButton({ Children }: { Children: any }) {
  const [weight, setWeight] = React.useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [typeSession, setTypeSession] = useState("")

  const navigate = useNavigate()

  // Fetch the last exercise user to get the last weight

  React.useEffect(() => {
    fetchLastSessionUser()
  }, [])

  const fetchLastSessionUser = async () => {
    try {
      const response = await myApi.get(`/api/sessions?limit=1&sort=-createdAt`)
      if (response.data && response.data.length > 0) {
        setWeight(response.data[0].body_weight)
      } else {
        setShowDialog(true)
      }
    } catch (error) {
      console.error("Error fetching last session:", error)
    }
  }

  const handleCreateSession = async (e: React.FormEvent, userChoice: string) => {
    e.preventDefault()
    try {
      setTypeSession(userChoice)
      const response = await myApi.post("/api/sessions", {
        date_session: new Date(),
        type_session: userChoice,
        body_weight: weight,
        exercise_user_list: [],
        is_done: false,
        comment: "",
      })
      console.log("typeSession", typeSession)
      console.log("response is:", response)
      const newSessionId = response.data._id
      navigate(`/history/session/${newSessionId}`)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className="select-none " asChild>
        {Children}
      </DrawerTrigger>
      <DrawerContent className="select-none ">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left ">
            <DrawerTitle>Nouvelle séance</DrawerTitle>
            {/* <DrawerDescription className="flex items-center gap-1 ">
              <LucidePencilRuler className="ml-1 " size={16} />{" "}
              <Link className="flex items-center " to="/type/new-type">
                Ou crée un <span className="ml-1 underline">exercice</span>.{" "}
              </Link>
            </DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between space-x-2">
              <Button
                onClick={(e) => handleCreateSession(e, "Upper A")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
              >
                <p className="mb-1 mt-4 text-lg">Upper A</p>
                <IconChest className="mt-3" />
                <span className="sr-only">Upper A</span>
              </Button>
              <Button
                onClick={(e) => handleCreateSession(e, "Lower")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
              >
                <p className="mb-1 mt-4 text-lg">Lower</p>
                <IconLegs className="mt-3" />
                <span className="sr-only">Lower</span>
              </Button>
              <Button
                onClick={(e) => handleCreateSession(e, "Upper B")}
                variant="outline"
                size="icon"
                className="flex h-24 w-24 flex-col rounded-md drop-shadow active:translate-y-0.5 active:drop-shadow-none"
              >
                <p className="mb-1 mt-4 text-lg">Upper B</p>
                <IconChest className="mt-3" />
                <span className="sr-only">Upper B</span>
              </Button>
            </div>
            <div className="mt-3 h-2"></div>
          </div>
        </div>
      </DrawerContent>
      {showDialog && (
        <div>
          <DialogContent className="w-11/12 rounded-md">
            <DialogHeader>
              <DialogTitle className="flex items-end text-left ">
                <LucideWeight className="mr-2 " size={20} />
                Combien pèses-tu ?
              </DialogTitle>
              <DialogDescription>
                <p className="text-left text-gray-500 dark:text-gray-400">Renseigne ton poids pour continuer.</p>
              </DialogDescription>
              <DialogDescription className="flex justify-center py-2 ">
                <div className="flex w-3/5 items-end justify-center gap-2 text-xl font-light ">
                  <Input
                    className="w-1/4 "
                    type="number"
                    id="body_weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  KG
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Valider</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      )}
    </Drawer>
  )
}

export default NewSessionButton
