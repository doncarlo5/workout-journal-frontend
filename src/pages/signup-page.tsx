import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

import LoginComponent from "../components/login-component"
import SignupComponent from "../components/signup-component"

const SignupPage = () => {
  return (
    <div className=" m-auto ">
      <div className="mb-10 flex flex-col">
        <Navbar />
      </div>
      <Tabs defaultValue="signup" className="relative w-[400px]  ">
        <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-xl ">
          <TabsTrigger value="signup">S'inscrire</TabsTrigger>
          <TabsTrigger value="signin">Se connecter</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignupComponent />
        </TabsContent>
        <TabsContent value="signin">
          <LoginComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SignupPage
