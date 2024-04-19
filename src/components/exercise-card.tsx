import { ChatBubbleIcon, TextAlignRightIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

function ExerciseCard({ exercise }: { exercise: any }) {
  return (
    <Link to={`/exercises/${exercise._id}`}>
      <Card className="transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="  flex flex-row justify-between px-4 py-2 ">
          <CardTitle className="flex items-center  ">{exercise.type.name}</CardTitle>
          {exercise.comment && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex transition hover:scale-110">
                    <ChatBubbleIcon className="" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{exercise.comment}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardHeader>
        <CardContent className="">
          <div className="relative overflow-x-auto">
            <table className="w-full rounded-md text-left">
              <tbody className=" ">
                <tr className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-3 text-2xl font-thin text-gray-900 dark:text-white">
                    ①
                  </th>
                  <td className="border-r border-black border-r-slate-400 bg-clip-text px-3 py-2 ">
                    <span className="text-2xl font-bold">{exercise.rep[0]}</span>{" "}
                    <span className="text-sm text-gray-700">REPS</span>{" "}
                  </td>
                  <td className=" px-3 py-2">
                    <span className=" text-2xl font-bold">{exercise.weight[0]}</span>{" "}
                    <span className="text-sm text-gray-700">KG</span>
                  </td>
                  <td className="px-3 py-2 font-light tracking-tighter text-gray-700">
                    {"("}
                    {exercise.type.repRange1}
                    {")"}
                  </td>
                </tr>

                <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-3 text-2xl font-thin text-gray-900 dark:text-white">
                    ②
                  </th>
                  <td className="border-r border-black border-r-slate-400 bg-clip-text px-3 py-2 ">
                    <span className="text-2xl font-bold">{exercise.rep[1]}</span>{" "}
                    <span className="text-sm text-gray-700">REPS</span>{" "}
                  </td>
                  <td className=" px-3 py-2">
                    <span className=" text-2xl font-bold">{exercise.weight[1]}</span>{" "}
                    <span className="text-sm text-gray-700">KG</span>
                  </td>
                  <td className="px-3 py-2 font-light tracking-tighter text-gray-700">
                    {"("}
                    {exercise.type.repRange2}
                    {")"}
                  </td>
                </tr>

                <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th scope="row" className="whitespace-nowrap px-3 text-2xl font-thin text-gray-900 dark:text-white">
                    ③
                  </th>
                  <td className="border-r border-black border-r-slate-400 bg-clip-text px-3 py-2 ">
                    <span className="text-2xl font-bold">{exercise.rep[2]}</span>{" "}
                    <span className="text-sm text-gray-700">REPS</span>{" "}
                  </td>
                  <td className=" px-3 py-2">
                    <span className=" text-2xl font-bold">{exercise.weight[2]}</span>{" "}
                    <span className="text-sm text-gray-700">KG</span>
                  </td>
                  <td className="px-3 py-2 font-light tracking-tighter text-gray-700">
                    {"("}
                    {exercise.type.repRange3}
                    {")"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ExerciseCard
