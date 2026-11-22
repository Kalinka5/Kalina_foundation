import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuHeart } from "react-icons/lu"

import { EASE } from "../Home/motion"
import { formatMoney } from "./currency"
import { DonationState } from "./useDonationState"

/** Sticky shortcut back to the donation card, shown on small screens once it scrolls away. */
function DonateMobileBar({ state }: { state: DonationState }) {
	const { t, i18n } = useTranslation()
	const [cardVisible, setCardVisible] = useState(true)

	useEffect(() => {
		const card = document.getElementById("donate-card")
		if (!card) return
		const observer = new IntersectionObserver(([entry]) => setCardVisible(entry.isIntersecting))
		observer.observe(card)
		return () => observer.disconnect()
	}, [])

	const goToCard = () => {
		document.getElementById("donate-card")?.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	return (
		<AnimatePresence>
			{!cardVisible && (
				<motion.div
					className="mobile-donate-bar mobile-donate-bar--solo"
					initial={{ y: "120%" }}
					animate={{ y: 0 }}
					exit={{ y: "120%" }}
					transition={{ duration: 0.4, ease: EASE }}
				>
					<button type="button" className="btn btn-primary btn-block" onClick={goToCard}>
						<LuHeart aria-hidden="true" />
						{state.isValid
							? t("home-donate-cta", {
									amount: formatMoney(state.amount, state.currency, i18n.language),
								})
							: t("donate")}
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default DonateMobileBar
