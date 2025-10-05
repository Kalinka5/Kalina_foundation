import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react"

export type Theme = "light" | "dark"

export type ThemeContextType = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	setTheme: () => {},
	toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

const THEME_STORAGE_KEY = "kalina-foundation-theme"

type ThemeProviderProps = {
	children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setThemeState] = useState<Theme>(() => {
		// Check localStorage first, then system preference
		const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme
		if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
			return storedTheme
		}

		// Fallback to system preference
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: light)").matches
		) {
			return "light"
		}

		return "dark" // Default fallback
	})

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme)
		localStorage.setItem(THEME_STORAGE_KEY, newTheme)
	}

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	useEffect(() => {
		// Apply theme to document root
		document.documentElement.setAttribute("data-theme", theme)

		// Listen for system theme changes
		const mediaQuery = window.matchMedia("(prefers-color-scheme: light)")
		const handleChange = (e: MediaQueryListEvent) => {
			// Only update if user hasn't manually set a preference
			if (!localStorage.getItem(THEME_STORAGE_KEY)) {
				setThemeState(e.matches ? "light" : "dark")
			}
		}

		mediaQuery.addEventListener("change", handleChange)
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
