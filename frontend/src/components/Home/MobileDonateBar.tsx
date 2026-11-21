import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuHeart } from "react-icons/lu"

import { EASE } from "./motion"

/** Hero and the sections that already contain a donate action. */
const HIDE_WHEN_VISIBLE = ["hero-section", "donate", "final-cta"]

/** Sticky donate shortcut for small screens, shown only between donate actions. */
function MobileDonateBar() {
	const { t } = useTranslation()
	const [visibleIds, setVisibleIds] = useState<Set<string>>(
		() => new Set(["hero-section"])
	)

	useEffect(() => {
		const targets = HIDE_WHEN_VISIBLE.map(id => document.getElementById(id)).filter(
			(el): el is HTMLElement => el !== null
		)
		const observer = new IntersectionObserver(entries => {
			setVisibleIds(prev => {
				const next = new Set(prev)
				entries.forEach(entry => {
					if (entry.isIntersecting) next.add(entry.target.id)
					else next.delete(entry.target.id)
				})
				return next
			})
		})
		targets.forEach(el => observer.observe(el))
		return () => observer.disconnect()
	}, [])

	const show = visibleIds.size === 0

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className="mobile-donate-bar"
					initial={{ y: "120%" }}
					animate={{ y: 0 }}
					exit={{ y: "120%" }}
					transition={{ duration: 0.4, ease: EASE }}
				>
					<span className="mobile-donate-text">{t("home-mobile-bar-text")}</span>
					<a href="#donate" className="btn btn-primary">
						<LuHeart aria-hidden="true" />
						{t("donate")}
					</a>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default MobileDonateBar
