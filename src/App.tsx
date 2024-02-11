import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import ProfilePage from "./pages/profile-page"
import SignupPage from "./pages/signup-page"

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
