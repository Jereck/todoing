"use client";

import { Button } from "@nextui-org/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <Button 
        className="mr-2"
        variant="light" 
        isIconOnly 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className={`h-6 w-6 transition-all ${theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}  />
        <Moon className={`absolute h-6 w-6 transition-all ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
        <span className="sr-only">Toggle Theme</span>
      </Button>

    </div>
  )
}