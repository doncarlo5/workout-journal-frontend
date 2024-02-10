import useAuth from "@/context/use-auth"
import { Link } from "react-router-dom"

function HomePage() {
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <div>Hello {user.firstName}</div>
      ) : (
        <div>
          <Link to="/sign-up">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  )
}

export default HomePage
