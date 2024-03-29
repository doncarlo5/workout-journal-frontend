// import SessionPage from "./pages/session-page"
import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import DoExercisePage from "./pages/do-exercise-page"
import ErrorBoundary from "./pages/error-boundary"
import ExercicesList from "./pages/exercises-list"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import NotFoundPage from "./pages/no-found-page"
import OneExercise from "./pages/one-exercise"
import SessionsList from "./pages/sessions-list"
import SettingsPage from "./pages/settings-page"
import SignupPage from "./pages/signup-page"
import WelcomePage from "./pages/welcome-page"
import IsAuthenticated from "./routing/is-authenticated"
import IsNotAuthenticated from "./routing/is-not-authenticated"

function App() {
  return (
    <div className="">
      <ErrorBoundary>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<IsNotAuthenticated />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<IsAuthenticated redirect={"/welcome"} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route element={<IsAuthenticated redirect={"/"} />}>
              <Route path="/sessions-list" element={<SessionsList />} />
              <Route path="/exercises-list" element={<ExercicesList />} />
              <Route path="/exercises-list/:exerciseId" element={<OneExercise />} />
              <Route path="/do-exercise" element={<DoExercisePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
