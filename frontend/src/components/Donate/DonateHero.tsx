import { motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { LuCheck, LuPackage } from "react-icons/lu"

import { useLimitedItems } from "../../lib/hooks"
import { EASE, ProgressBar, RevealText } from "../Home/motion"
import { convert, formatMoney, useUahPerUsd } from "./currency"
import DonationCard from "./DonationCard"
import { DonationState } from "./useDonationState"

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.7, ease: EASE, delay },
})

const TRUST_TICKS = ["donate-page-tick-1", "donate-page-tick-2", "donate-page-tick-3"]

function GoalImage({ src, alt }: { src: string; alt: string }) {
	const [failed, setFailed] = useState(!src)
	if (failed) {
		return (
			<div className="goal-image goal-image--fallback" aria-hidden="true">
				<LuPackage />
			</div>
		)
	}
	return (
		<img
			className="goal-image"
			src={src}
			alt={alt}
			width={96}
			height={96}
			loading="lazy"
			onError={() => setFailed(true)}
		/>
	)
}

/** The open fundraiser closest to its goal: the same one the Home hero features. */
function GoalCard({ state }: { state: DonationState }) {
	const { t, i18n } = useTranslation()
	const { data: items } = useLimitedItems(16)
	const { rate } = useUahPerUsd()

	const featured = (items ?? [])
		.filter(i => i.full_price > 0 && i.collected < i.full_price)
		.sort((a, b) => b.collected / b.full_price - a.collected / a.full_price)[0]

	if (!featured) return null

	const pct = Math.round((featured.collected / featured.full_price) * 100)
	const title = t(`${featured.title}-title`)
	// Backend amounts are stored in UAH.
	const money = (uah: number) =>
		formatMoney(convert(uah, "uah", state.currency, rate), state.currency, i18n.language)
	const approx = state.currency === "usd" ? "≈ " : ""

	return (
		<motion.article className="goal" {...fadeUp(0.45)}>
			<p className="goal-eyebrow">
				<span className="live-dot" aria-hidden="true" />
				{t("donate-page-goal-eyebrow")}
			</p>
			<div className="goal-body">
				<GoalImage src={featured.image} alt={title} />
				<div className="goal-text">
					<h2 className="goal-title">{title}</h2>
					<p className="goal-amounts">
						<strong>
							{approx}
							{money(featured.collected)}
						</strong>{" "}
						{t("home-needs-raised-of")} {approx}
						{money(featured.full_price)}
					</p>
				</div>
				<span className="goal-pct">{pct}%</span>
			</div>
			<ProgressBar value={pct} label={`${title}: ${pct}% ${t("home-funded")}`} />
		</motion.article>
	)
}

function DonateHero({ state }: { state: DonationState }) {
	const { t } = useTranslation()

	return (
		<section className="dh" id="donate-hero">
			<div className="h-container dh-grid">
				<div className="dh-intro">
					<motion.p className="h-eyebrow" {...fadeUp(0)}>
						{t("donate")}
					</motion.p>
					<RevealText
						as="h1"
						className="dh-title"
						text={t("donate-page-title")}
						delay={0.1}
						immediate
					/>
					<motion.p className="h-lead dh-lead" {...fadeUp(0.3)}>
						{t("donate-page-lead")}
					</motion.p>
				</div>

				<div className="dh-trust">
					<motion.ul className="dh-ticks" {...fadeUp(0.4)}>
						{TRUST_TICKS.map(key => (
							<li key={key}>
								<span className="dh-tick-icon" aria-hidden="true">
									<LuCheck />
								</span>
								{t(key)}
							</li>
						))}
					</motion.ul>
				</div>

				<motion.div className="dh-card" {...fadeUp(0.2)}>
					<DonationCard state={state} />
				</motion.div>

				<div className="dh-goal">
					<GoalCard state={state} />
				</div>
			</div>
		</section>
	)
}

export default DonateHero
