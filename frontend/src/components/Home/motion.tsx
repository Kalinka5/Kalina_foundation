import {
	animate,
	motion,
	useInView,
	useReducedMotion,
	useScroll,
	useTransform,
} from "framer-motion"
import { Fragment, ReactNode, useEffect, useRef, useState } from "react"

export const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
	children: ReactNode
	delay?: number
	y?: number
	className?: string
	as?: "div" | "li" | "section" | "article" | "p"
}

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({
	children,
	delay = 0,
	y = 24,
	className,
	as = "div",
}: RevealProps) {
	const Tag = motion[as]
	return (
		<Tag
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -80px 0px" }}
			transition={{ duration: 0.7, ease: EASE, delay }}
		>
			{children}
		</Tag>
	)
}

type RevealTextProps = {
	text: string
	as?: "h1" | "h2" | "h3"
	className?: string
	delay?: number
	/** Animate on mount instead of on scroll (used above the fold). */
	immediate?: boolean
}

/** Headline whose words slide up from behind a mask, one after another. */
export function RevealText({
	text,
	as = "h2",
	className,
	delay = 0,
	immediate = false,
}: RevealTextProps) {
	const Tag = motion[as]
	const words = text.split(" ")
	const trigger = immediate
		? { animate: "visible" }
		: {
				whileInView: "visible",
				viewport: { once: true, margin: "0px 0px -80px 0px" },
			}

	return (
		<Tag
			// Remount when the text changes (e.g. language switch): the new word
			// spans start hidden and a `once` in-view trigger would never re-fire.
			key={text}
			className={className}
			aria-label={text}
			initial="hidden"
			{...trigger}
			transition={{ staggerChildren: 0.06, delayChildren: delay }}
		>
			{words.map((word, i) => (
				<Fragment key={`${word}-${i}`}>
					<span className="reveal-word" aria-hidden="true">
						<motion.span
							className="reveal-word-inner"
							variants={{
								hidden: { y: "110%" },
								visible: { y: "0%" },
							}}
							transition={{ duration: 0.8, ease: EASE }}
						>
							{word}
						</motion.span>
					</span>
					{/* Space lives outside the clipped inline-block so it isn't collapsed. */}
					{i < words.length - 1 ? " " : null}
				</Fragment>
			))}
		</Tag>
	)
}

type CountUpProps = {
	value: number
	prefix?: string
	suffix?: string
	duration?: number
	className?: string
}

/** Number that counts up from 0 the first time it becomes visible. */
export function CountUp({
	value,
	prefix = "",
	suffix = "",
	duration = 1.6,
	className,
}: CountUpProps) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })
	const reduceMotion = useReducedMotion()
	const [display, setDisplay] = useState(0)

	useEffect(() => {
		if (!inView) return
		if (reduceMotion) {
			setDisplay(value)
			return
		}
		const controls = animate(0, value, {
			duration,
			ease: EASE,
			onUpdate: v => setDisplay(Math.round(v)),
		})
		return () => controls.stop()
	}, [inView, value, duration, reduceMotion])

	return (
		<span ref={ref} className={className}>
			{prefix}
			{display.toLocaleString("en-US")}
			{display > 0 ? suffix : ""}
		</span>
	)
}

type ProgressBarProps = {
	value: number
	label: string
}

/** Funding bar that fills to `value` percent when scrolled into view. */
export function ProgressBar({ value, label }: ProgressBarProps) {
	const clamped = Math.max(0, Math.min(100, value))
	return (
		<div
			className="progress"
			role="progressbar"
			aria-label={label}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={clamped}
		>
			<motion.div
				className="progress-fill"
				style={{ originX: 0 }}
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: clamped / 100 }}
				viewport={{ once: true }}
				transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
			/>
		</div>
	)
}

type ParallaxProps = {
	children: ReactNode
	/** Total travel in px across the element's pass through the viewport. */
	distance?: number
	className?: string
}

/** Moves its children slightly against the scroll direction. */
export function Parallax({ children, distance = 60, className }: ParallaxProps) {
	const ref = useRef<HTMLDivElement>(null)
	const reduceMotion = useReducedMotion()
	const travel = reduceMotion ? 0 : distance
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	})
	const y = useTransform(scrollYProgress, [0, 1], [travel / 2, -travel / 2])

	return (
		<div ref={ref} className={className}>
			<motion.div style={{ y, height: "100%" }}>{children}</motion.div>
		</div>
	)
}
