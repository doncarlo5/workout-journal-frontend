import { LucideClock4, LucideInfo, LucideTag, LucideTimer } from "lucide-react"
import { Link } from "react-router-dom"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function ExerciseTypeCard({ exerciseType }: { exerciseType: any }) {
  return (
    <Link to={`/type/${exerciseType._id}`}>
      <Card className="flex h-24 w-44 transform-gpu flex-col border-2 border-double">
        <div className=" flex justify-between">
          <div className="ml-1 mt-1 flex items-center gap-1 rounded-sm rounded-tl-lg border px-2">
            <LucideTag fill="#cbd5e1" size={10} className="text-gray-500 dark:text-gray-400" />
            <span className=" text-xs font-medium ">{exerciseType.type_session}</span>
          </div>
          <div className="mr-1 mt-1 flex items-center gap-1 rounded-sm rounded-tr-lg border px-2">
            <LucideClock4 fill="#cbd5e1" size={10} className="text-gray-500 dark:text-gray-400" />
            <span className=" text-xs font-medium ">{exerciseType.timer}</span>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between px-3 py-2 ">
          <div className=" text-sm font-black tracking-tighter	">{exerciseType.name}</div>
          <div className=" border border-dashed border-gray-200 dark:border-gray-800"></div>
          <div className=" flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <LucideInfo className="" size={12} /> <div className="truncate text-xs">{exerciseType.advice}</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ExerciseTypeCard
