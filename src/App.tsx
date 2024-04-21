// import SessionPage from "./pages/session-page"
import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import ChartsPage from "./pages/charts-page"
import DoExercisePage from "./pages/do-exercise-page"
import ErrorBoundary from "./pages/error-boundary"
import ExercicesList from "./pages/exercises-list"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import NewType from "./pages/new-type"
import NotFoundPage from "./pages/no-found-page"
import OneExercise from "./pages/one-exercise"
import OneSession from "./pages/one-session"
import OneType from "./pages/one-type"
import ProfilePage from "./pages/profile-page"
import SessionsList from "./pages/sessions-list"
import SignupPage from "./pages/signup-page"
import TypesList from "./pages/types-list"
import WelcomePage from "./pages/welcome-page"
import IsAuthenticated from "./routing/is-authenticated"
import IsNotAuthenticated from "./routing/is-not-authenticated"

function App() {
  return (
    <div className="flex h-dvh w-screen">
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
              <Route path="/sessions" element={<SessionsList />} />
              <Route path="/sessions/:sessionId" element={<OneSession />} />
              <Route path="/sessions/:sessionId/do-exercise" element={<DoExercisePage />} />
              <Route path="/exercises" element={<ExercicesList />} />
              <Route path="/exercises/:exerciseId" element={<OneExercise />} />
              <Route path="/types" element={<TypesList />} />
              <Route path="/types/:typeId" element={<OneType />} />
              <Route path="/types/new-type" element={<NewType />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
