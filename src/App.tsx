import { Route, Routes } from "react-router-dom"

import DoExercisePage from "./pages/do-exercise-page"
import ExercicesList from "./pages/exercises-list"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
// import SessionPage from "./pages/session-page"
import SettingsPage from "./pages/settings-page"
import SignupPage from "./pages/signup-page"
import IsAuthenticated from "./routing/is-authenticated"
import IsNotAuthenticated from "./routing/is-not-authenticated"

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<IsNotAuthenticated />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<IsAuthenticated />}>
          <Route path="/exerciseslist" element={<ExercicesList />} />
          <Route path="/doexercise" element={<DoExercisePage />} />
          {/* <Route path="/session" element={<SessionPage />} /> */}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
