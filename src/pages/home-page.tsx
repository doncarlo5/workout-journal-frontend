import { LucideArrowRight, LucideBadgePlus, LucideCircleUser, LucideHistory, LucidePencilRuler } from "lucide-react"
import { Link } from "react-router-dom"

import { Navbar } from "@/components/navbar"
import NewSessionButton from "@/components/new-session-button"

import useAuth from "../context/use-auth"

export function HomePage() {
  const { user } = useAuth()

  console.log(user)
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
              Bienvenue {user?.firstName}.
            </h1>
          </div>
          <div className="text-center">
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              Jette un oeil à tes exercices réalisés ou lance une nouvelle séance.
            </p>
          </div>
          <div className=" flex max-w-sm flex-col justify-around gap-2  ">
            <Link
              className="group flex w-full items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg  hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner"
              to="/history"
            >
              <div className=" flex items-center gap-4 pl-4">
                <LucidePencilRuler
                  color="rgb(107 114 128)"
                  className=" group-hover:stroke-teal-500"
                  height={40}
                  width={80}
                  strokeWidth={1.5}
                />
                <p className="tab tab-whishlist block text-sm dark:text-gray-900  ">
                  Créé un <span className=" font-bold"> exercice type </span> et personnalise-le avec un temps de repos,
                  des répétitions et un conseil.
                </p>
              </div>
              <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
              <LucideArrowRight className=" inline-block" color="rgb(107 114 128)" height={40} width={80} />
            </Link>

            <NewSessionButton
              Children={
                <div className="group flex h-[84px] w-full cursor-pointer items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner">
                  <div className=" flex items-center gap-4 pl-4">
                    <LucideBadgePlus
                      color="rgb(107 114 128)"
                      className=" inline-block group-hover:stroke-teal-500"
                      height={40}
                      width={80}
                      strokeWidth={1.5}
                    />
                    <p className="tab tab-whishlist block text-sm dark:text-gray-900">
                      Réalise une <span className=" font-bold"> séance </span>{" "}
                      <span className=" italic">Upper A/B</span> ou <span className=" italic">Lower</span> avec tes
                      exercices types personnalisés.
                    </p>
                  </div>
                  <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
                  <LucideArrowRight
                    className="inline-block group-hover:stroke-teal-500"
                    color="rgb(107 114 128)"
                    height={40}
                    width={80}
                  />
                </div>
              }
            />

            <Link
              className="group flex w-full items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner"
              to="/profile"
            >
              <div className=" flex items-center gap-4 pl-4">
                <LucideCircleUser
                  color="rgb(107 114 128)"
                  className=" group-hover:stroke-teal-500"
                  height={40}
                  width={80}
                  strokeWidth={1.5}
                />
                <p className="tab tab-whishlist block text-sm dark:text-gray-900">
                  Consulte ton <span className=" font-bold"> profile </span> pour voir tes statistiques et tes derniers
                  trophées obtenus.
                </p>
              </div>
              <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
              <LucideArrowRight className=" inline-block" color="rgb(107 114 128)" height={40} width={80} />
            </Link>
            <Link
              className="group flex w-full items-center justify-center rounded-lg bg-slate-100 px-2 py-3 shadow-lg hover:text-teal-500 focus:text-teal-500 active:translate-y-0.5 active:shadow-inner"
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
                <p className="tab tab-whishlist block text-sm dark:text-gray-900">
                  Retrouve une séance à l'aide de ton <span className=" font-bold"> historique</span>.
                </p>
              </div>
              <div className="mx-4 h-8 w-[0.1rem] rounded-full bg-gray-200"></div>
              <LucideArrowRight className=" inline-block" color="rgb(107 114 128)" height={40} width={80} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
