import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import ProfilePage from "./pages/profile-page"
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
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
