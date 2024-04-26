import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div
      className=" flex cursor-pointer items-center justify-center rounded-md bg-slate-100 px-6 py-2 text-center hover:text-teal-500 focus:text-teal-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:text-teal-500 dark:focus:text-teal-500"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <>
          <Moon className=" inline-block transition-all dark:rotate-0 dark:scale-100" size={24} />
          {/* <span className="tab tab-home block select-none text-xs">Dark</span> */}
        </>
      ) : (
        <>
          <Sun className=" inline-block " size={24} />
          {/* <span className="tab tab-home block select-none text-xs  ">Light</span> */}
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
