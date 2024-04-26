import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

import { Button } from "./ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button variant={"outline"} onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <Moon className=" inline-block transition-all dark:rotate-0 dark:scale-100" size={16} />
          {/* <span className="tab tab-home block select-none text-xs">Dark</span> */}
        </>
      ) : (
        <>
          <Sun className=" inline-block " size={16} />
          {/* <span className="tab tab-home block select-none text-xs  ">Light</span> */}
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
