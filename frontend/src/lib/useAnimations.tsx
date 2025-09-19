import { useEffect, useRef, useState } from "react"

interface AnimationOptions {
	threshold?: number
	rootMargin?: string
	triggerOnce?: boolean
	delay?: number
	stagger?: number
}

/**
 * Custom hook for performant scroll-triggered animations using Intersection Observer
 * Optimized for 60fps and mobile performance
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
	options: AnimationOptions = {}
) => {
	const {
		threshold = 0.1,
		rootMargin = "0px 0px -50px 0px",
		triggerOnce = true,
		delay = 0,
		stagger = 0,
	} = options

	const [isVisible, setIsVisible] = useState(false)
	const [hasAnimated, setHasAnimated] = useState(false)
	const elementRef = useRef<T>(null)

	useEffect(() => {
		const element = elementRef.current
		if (!element) return

		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		if (prefersReducedMotion) {
			setIsVisible(true)
			setHasAnimated(true)
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// Apply delay if specified
					setTimeout(() => {
						setIsVisible(true)
						if (triggerOnce) {
							setHasAnimated(true)
							observer.unobserve(element)
						}
					}, delay)
				} else if (!triggerOnce && !hasAnimated) {
					setIsVisible(false)
				}
			},
			{
				threshold,
				rootMargin,
			}
		)

		observer.observe(element)

		return () => {
			observer.unobserve(element)
		}
	}, [threshold, rootMargin, triggerOnce, delay, hasAnimated])

	return { elementRef, isVisible, hasAnimated }
}

/**
 * Hook for staggered animations of multiple elements
 */
export const useStaggeredAnimation = <T extends HTMLElement = HTMLDivElement>(
	itemsCount: number,
	options: AnimationOptions = {}
) => {
	const { stagger = 100, ...restOptions } = options
	const [visibleItems, setVisibleItems] = useState<boolean[]>(
		new Array(itemsCount).fill(false)
	)
	const containerRef = useRef<T>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		if (prefersReducedMotion) {
			setVisibleItems(new Array(itemsCount).fill(true))
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// Stagger the animation of child elements
					for (let i = 0; i < itemsCount; i++) {
						setTimeout(() => {
							setVisibleItems(prev => {
								const newState = [...prev]
								newState[i] = true
								return newState
							})
						}, i * stagger)
					}
					observer.unobserve(container)
				}
			},
			{
				threshold: restOptions.threshold || 0.1,
				rootMargin: restOptions.rootMargin || "0px 0px -50px 0px",
			}
		)

		observer.observe(container)

		return () => {
			observer.unobserve(container)
		}
	}, [itemsCount, stagger, restOptions.threshold, restOptions.rootMargin])

	return { containerRef, visibleItems }
}

/**
 * Hook for page load animations
 */
export const usePageLoadAnimation = (delay = 0) => {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		if (prefersReducedMotion) {
			setIsLoaded(true)
			return
		}

		const timer = setTimeout(() => {
			setIsLoaded(true)
		}, delay)

		return () => clearTimeout(timer)
	}, [delay])

	return isLoaded
}

/**
 * Hook for parallax effects with performance optimization
 */
export const useParallax = <T extends HTMLElement = HTMLDivElement>(
	speed = 0.5
) => {
	const [offset, setOffset] = useState(0)
	const elementRef = useRef<T>(null)

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		if (prefersReducedMotion) return

		let ticking = false

		const updateOffset = () => {
			const element = elementRef.current
			if (!element) return

			const rect = element.getBoundingClientRect()
			const elementTop = rect.top + window.pageYOffset
			const elementHeight = rect.height
			const windowHeight = window.innerHeight

			// Only calculate parallax when element is in viewport
			if (rect.bottom >= 0 && rect.top <= windowHeight) {
				const scrolled = window.pageYOffset
				const rate = scrolled * speed
				setOffset(rate)
			}
		}

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					updateOffset()
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		updateOffset() // Initial calculation

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [speed])

	return { elementRef, offset }
}
