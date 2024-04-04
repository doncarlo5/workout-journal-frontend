import { Link } from "react-router-dom"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function ExerciseCard({ exercise }: { exercise: any }) {
  return (
    <div>
      <Link to={`/exercises/${exercise._id}`}>
        <Card className="transition ease-in-out hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className=" mb-2 p-4 pb-2">
            <CardTitle className="flex items-center ">
              {" "}
              {exercise.type.name} {"("}
              {exercise.type.type}
              {")"}
            </CardTitle>
          </CardHeader>
          <CardContent className=" pb-4 pl-4 pr-4">
            <div className="relative overflow-x-auto">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-3 py-1">
                        SERIES
                      </th>
                      <th scope="col" className="px-3 py-1">
                        REPS
                      </th>
                      <th scope="col" className="px-3 py-1">
                        KG
                      </th>
                      <th scope="col" className="px-3 py-1">
                        RANGE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-3 text-xl font-thin text-gray-900 dark:text-white"
                      >
                        ①
                      </th>
                      <td className="bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text px-3 py-2 text-xl font-black text-transparent ">
                        {exercise.rep[0]}
                      </td>
                      <td className="bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text px-3 py-2 text-xl font-black text-transparent ">
                        {exercise.weight[0]}
                      </td>
                      <td className="px-3 py-2">{exercise.type.repRange1}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-3 text-xl font-thin text-gray-900 dark:text-white"
                      >
                        ②
                      </th>
                      <td className="bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text px-3 py-2 text-xl font-black text-transparent ">
                        {exercise.rep[1]}
                      </td>
                      <td className="bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text px-3 py-2 text-xl font-black text-transparent ">
                        {exercise.weight[1]}
                      </td>
                      <td className="px-3 py-2">{exercise.type.repRange2}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-3 text-xl font-thin text-gray-900 dark:text-white"
                      >
                        ③
                      </th>
                      <td className="bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text px-3 py-2 text-xl font-black text-transparent ">
                        {exercise.rep[2]}
                      </td>
                      <td className="bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text px-3 py-2 text-xl font-black text-transparent ">
                        {exercise.weight[2]}
                      </td>
                      <td className="px-3 py-2">{exercise.type.repRange3}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default ExerciseCard
