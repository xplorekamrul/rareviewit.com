"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={toggleTheme}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
      </Button>
    </motion.div>
  )
}
