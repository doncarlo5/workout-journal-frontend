import { Route, Routes } from "react-router-dom"

import DoExercisePage from "./pages/do-exercise-page"
import ExercicesList from "./pages/exercises-list"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import OneExercise from "./pages/one-exercise"
// import SessionPage from "./pages/session-page"
import SettingsPage from "./pages/settings-page"
import SignupPage from "./pages/signup-page"
import WelcomePage from "./pages/welcome-page"
import IsAuthenticated from "./routing/is-authenticated"
import IsNotAuthenticated from "./routing/is-not-authenticated"

function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<IsAuthenticated redirect={"/welcome"} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />

        <Route element={<IsNotAuthenticated />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<IsAuthenticated redirect={"/"} />}>
          <Route path="/exercises-list" element={<ExercicesList />} />
          <Route path="/exercises-list/:exerciseId" element={<OneExercise />} />
          <Route path="/do-exercise" element={<DoExercisePage />} />

          {/* <Route path="/session" element={<SessionPage />} /> */}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
