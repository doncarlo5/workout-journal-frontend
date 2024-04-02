import { Link } from "react-router-dom"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function ExerciseCard({ exercise }: { exercise: any }) {
  return (
    <div>
      <Link to={`/exercises/${exercise._id}`}>
        <Card className="p-2 transition ease-in-out hover:-translate-y-1 hover:bg-[#F4F4F5]">
          <CardHeader className=" ml-2 p-2">
            <CardTitle>
              {exercise.type.name} {"("}
              {exercise.type.type}
              {")"}
            </CardTitle>
          </CardHeader>
          <CardContent className=" p-2">
            <div className=" container ml-6 grid w-3/5 grid-cols-3 rounded-sm bg-gray-50 px-4 py-2 text-sm ">
              <div className="text-center text-[#81838B]">Reps</div>
              <br />
              <div className="mb-1 text-center text-[#81838B]">Kg</div>
              <div className=" text-center font-bold">{exercise.rep[0]}</div>
              <div className=" text-center text-[#81838B]">x</div>

              <div className=" text-center font-bold">{exercise.weight[0]}</div>
              <div className="text-center font-bold">{exercise.rep[1]}</div>
              <div className="text-center text-[#81838B]">x</div>

              <div className=" text-center font-bold">{exercise.weight[1]}</div>
              <div className=" text-center font-bold">{exercise.rep[2]}</div>
              <div className="text-center text-[#81838B]">x</div>
              <div className="text-center font-bold">{exercise.weight[2]}</div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default ExerciseCard
