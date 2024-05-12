import { useEffect, useState } from "react"
import { format } from "date-fns"
import { LucideArrowRight, LucideBadgePlus, LucideCircleUser, LucideHistory, LucidePencilRuler } from "lucide-react"
import { Link } from "react-router-dom"

import myApi from "@/lib/api-handler"
import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"

import useAuth from "../context/use-auth"

export function HomePage() {
  const { user } = useAuth()
  console.log("user", user)

  const [session, setSession] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)

  const fetchLastSession = async () => {
    try {
    setIsLoading(true)
    const response = await myApi.get("/api/sessions?limit=1&sort=-date_session")
    setSession(response.data)
    console.log("fetchLastSession", response.data)
  }  catch (error: any) {
    console.log(error)
  } finally {
    setIsLoading(false)
  }}

  useEffect(() => {
    fetchLastSession()
    console.log("user", user)
  }, [])

  return (
    <div className="">
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col ">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
            Bienvenue {user?.firstName}.
          </h1>
          <div className="flex flex-col gap-4 pb-4">
            <div className="flex flex-col rounded-lg bg-slate-100 px-4 py-2 shadow-lg dark:bg-slate-900 dark:bg-opacity-80">
              <div className="">
{ session[0] ?(               <h2 className="text-lg font-bold ">Dernière séance </h2>) : (
                <h2 className="text-lg font-bold ">Aucune séance</h2>
              )
              
}                <div>
                 {!isLoading ? ( <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{session[0]?.date_session && format(new Date(session[0]?.date_session), "dd/MM/yyyy")}</span>
                    <span>{session[0]?.type_session && session[0]?.type_session}</span>
                  </div>) : (
                    <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    </div>
                  )
                  
                }
                </div>
              </div>
              <Link to="/history">
                <span className="flex justify-end text-sm text-teal-500 hover:underline">Voir tout</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-20">
            <Link
              className="group flex items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500  active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
              to="/type"
            >
              <div className="flex items-center gap-4 pl-4 ">
                <LucidePencilRuler
                  color="rgb(107 114 128)"
                  className=" group-hover:stroke-teal-500"
                  height={40}
                  width={80}
                  strokeWidth={1.5}
                />
                <div className="flex flex-col">
                  <p className="tab tab-whishlist block text-sm  ">
                    Crée un <span className="font-bold "> exercice</span>{" "}
                  </p>
                  <p className="text-xs tracking-tighter  ">Ajoute temps de repos, répétitions et conseils.</p>
                </div>
              </div>
              <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
              <LucideArrowRight className="inline-block " color="rgb(107 114 128)" height={40} width={80} />
            </Link>

            <NewSessionButton
              Children={
                <div className="group flex h-[84px] w-full cursor-pointer items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80">
                  <div className="flex items-center gap-4 pl-4 ">
                    <LucideBadgePlus
                      color="rgb(107 114 128)"
                      className="inline-block group-hover:stroke-teal-500"
                      height={40}
                      width={80}
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="tab tab-whishlist block text-sm ">
                        Réalise une <span className="font-bold "> séance </span>
                      </p>
                      <p className="text-xs tracking-tighter ">
                        <span className="font-medium  ">Upper</span> ou <span className="font-medium ">Lower</span> avec
                        tes exercices personnalisés.
                      </p>
                    </div>
                  </div>
                  <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200 "></div>
                  <LucideArrowRight className="inline-block" color="rgb(107 114 128)" height={40} width={80} />
                </div>
              }
            />

            <Link
              className="group flex w-full items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
              to="/profile"
            >
              <div className="flex items-center gap-4 pl-4 ">
                <LucideCircleUser
                  color="rgb(107 114 128)"
                  className=" group-hover:stroke-teal-500"
                  height={40}
                  width={80}
                  strokeWidth={1.5}
                />
                <div>
                  <p className="tab tab-whishlist block text-sm ">
                    Consulte ton <span className="font-bold "> profil </span>
                  </p>
                  <p className="text-xs tracking-tighter ">Voir tes statistiques et tes derniers trophées obtenus.</p>
                </div>
              </div>
              <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
              <LucideArrowRight className="inline-block " color="rgb(107 114 128)" height={40} width={80} />
            </Link>
            <Link
              className="group flex w-full items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner dark:bg-slate-900 dark:bg-opacity-80"
              to="/history"
            >
              <div className="flex h-14 items-center gap-4 pl-4">
                <LucideHistory
                  color="rgb(107 114 128)"
                  className=" group-hover:stroke-teal-500"
                  height={40}
                  width={80}
                  strokeWidth={1.5}
                />
                <div>
                  <p className="tab tab-whishlist block text-sm ">
                    Explore ton<span className="font-bold "> historique</span>
                  </p>
                  <p className="text-xs tracking-tighter  ">Retrouve tes séances et exercices passés.</p>
                </div>
              </div>
              <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
              <LucideArrowRight className="inline-block " color="rgb(107 114 128)" height={40} width={80} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
