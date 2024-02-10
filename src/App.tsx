import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";

import HomePage from "./pages/home-page";

function App() {
  return (
    <div className=" h-dvh bg-slate-500">
      <Routes>
				<Route path="/" element={<HomePage />} />
				<Route element={<IsNotAuthenticated />}>
					<Route path="/sign-up" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>

				<Route element={<IsAuthenticated />}>
					<Route path="/profile" element={<ProfilePage />} />

	
			</Routes>
    </div>
  );
}

export default App;
