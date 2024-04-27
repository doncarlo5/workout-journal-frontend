import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

import LoginComponent from "../components/login-component"
import SignupComponent from "../components/signup-component"

const SignupPage = () => {
  return (
    <div className=" mx-auto">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center pb-5">
        <Tabs
          defaultValue="login"
          className="container flex flex-col items-center justify-center gap-4 px-10  pt-20 md:px-6"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-2 rounded-xl ">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginComponent />
          </TabsContent>
          <TabsContent value="signup">
            <SignupComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default SignupPage
