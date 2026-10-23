import { useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage.js'
import { ThemeContext } from './ThemeContext.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    readStorage('portfolio-theme', 'dark') === 'light' ? 'light' : 'dark',
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    writeStorage('portfolio-theme', theme)
  }, [theme])
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
