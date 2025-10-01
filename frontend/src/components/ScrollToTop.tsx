import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * ScrollToTop component that scrolls the window to the top
 * whenever the route changes
 */
function ScrollToTop() {
	const { pathname } = useLocation()

	useEffect(() => {
		// Scroll to top instantly when route changes
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant" as ScrollBehavior,
		})
	}, [pathname])

	return null
}

export default ScrollToTop
