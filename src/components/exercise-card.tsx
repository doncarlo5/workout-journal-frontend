import { Edit } from "lucide-react"
import { Link } from "react-router-dom"

function ExerciseCard({ exercise }: { exercise: any }) {
  return (
    <Link
      className="mb-4 flex w-56 rounded-2xl  bg-slate-100 px-3 py-2 shadow-md active:translate-y-0.5 active:shadow-none md:text-lg dark:bg-slate-900 dark:bg-opacity-40"
      to={`/history/exercise/${exercise._id}`}
    >
      <div className="">
        <p className="mb-2 ml-2 font-bold ">{exercise.type.name}</p>
        <div className="flex justify-center">
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 text-center">
              <p className="pb-1 text-sm text-gray-500 ">Série</p>
              <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                1
              </p>
              <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                2
              </p>
              <p className="flex items-center justify-center rounded-md bg-slate-200 bg-transparent px-3 py-1 font-mono text-sm text-gray-900 dark:text-white ">
                3
              </p>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="pb-1 text-sm text-gray-500 ">Reps</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.rep[0]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold">{exercise.rep[1]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.rep[2]}</p>
            </div>

            <div className="flex flex-col gap-1 text-center">
              <p className="pb-1 text-sm text-gray-500 ">KG</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[0]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[1]}</p>
              <p className="text-md flex h-7 w-12 items-center justify-center font-bold ">{exercise.weight[2]}</p>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="pb-1 text-sm text-gray-500 ">{`[Range]`}</p>
              <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                {exercise?.type.repRange1}
              </p>

              <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                {exercise?.type.repRange2}
              </p>
              <p className="flex h-7 w-12 items-center justify-center text-sm italic text-gray-700 ">
                {exercise?.type.repRange3}
              </p>
            </div>
          </div>
        </div>

        {exercise.comment && (
          <div className="flex pl-2 pt-2 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Edit className="size-4" /> <p className="text-sm ">{exercise.comment}</p>
            </div>
          </div>
        )}
      </div>

      {/* <div className="flex justify-center py-4 rounded-2xl bg-slate-100 md:text-lg">
        <div className="px-4 pt-4 pb-0">
          <div className="text-lg">{exercise.type.name}</div>
        </div>
        <div className="px-1 pb-4 mt-2 ml-3">
          <div className="flex items-center gap-4 mb-1 ml-1">
            <div className="flex w-28 items-baseline gap-0.5 font-bold sm:text-xl md:text-2xl">
              {exercise.rep[0]}
              <span className="text-xs font-normal text-gray-700"> REPS </span>{" "}
              <span className="ml-2 font-normal "> x</span>
            </div>
            <div className="flex w-40 items-baseline gap-0.5 font-bold sm:text-xl md:text-2xl">
              {exercise.weight[0]}
              <span className="text-xs font-normal text-gray-700"> KG</span>
            </div>
            <div className="flex items-center w-40 text-sm font-medium sm:text-xl md:text-base">
              <Badge
                className="justify-center text-xs font-light select-none min-h-10 min-w-8 sm:text-xl"
                variant="secondary"
              >
                {exercise.type.repRange1}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-1 ml-1">
            <div className="flex w-28 items-baseline gap-0.5 font-bold sm:text-xl md:text-2xl">
              {exercise.rep[1]}
              <span className="text-xs font-normal text-gray-700"> REPS </span>{" "}
              <span className="ml-2 font-normal "> x</span>
            </div>
            <div className="flex w-40 items-baseline gap-0.5 font-bold sm:text-xl md:text-2xl">
              {exercise.weight[1]}
              <span className="text-xs font-normal text-gray-700"> KG</span>
            </div>
            <div className="flex items-center w-40 text-sm font-medium sm:text-xl md:text-base">
              <Badge
                className="justify-center text-xs font-light select-none min-h-10 min-w-8 sm:text-xl"
                variant="secondary"
              >
                {exercise.type.repRange2}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-1 ml-1">
            <div className="flex w-28 items-baseline gap-0.5 font-bold sm:text-xl md:text-2xl">
              {exercise.rep[2]}
              <span className="text-xs font-normal text-gray-700"> REPS </span>{" "}
              <span className="ml-2 font-normal "> x</span>
            </div>
            <div className="flex w-40 items-baseline gap-0.5 font-bold sm:text-xl md:text-2xl">
              {exercise.weight[2]}
              <span className="text-xs font-normal text-gray-700"> KG</span>
            </div>
            <div className="flex items-center w-40 text-sm font-medium sm:text-xl md:text-base">
              <Badge
                className="justify-center text-xs font-light select-none min-h-10 min-w-8 sm:text-xl"
                variant="secondary"
              >
                {exercise.type.repRange3}
              </Badge>
            </div>
          </div>
        </div>
        {exercise.comment && (
          <div className="px-4 pt-3 pb-4 border-t border-dotted">
            <div className="flex items-center gap-2">
              <LucideMessageSquareText size={18} color="#64748B" />
              <CardDescription>{exercise.comment}</CardDescription>
            </div>
          </div>
        )}
      </div> */}
    </Link>
  )
}

export default ExerciseCard
