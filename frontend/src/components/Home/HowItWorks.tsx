import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { LuArrowUpRight, LuHandCoins, LuPackageCheck, LuSearchCheck } from "react-icons/lu"
import { Link } from "react-router-dom"

import { INITIATIVES_PAGE } from "../../lib/constants"
import { INITIATIVE_CATEGORIES } from "./data"
import { EASE, Reveal, RevealText } from "./motion"

import "../../styles/home/howItWorks.css"

const STEPS = [
	{ key: "donate", icon: LuHandCoins },
	{ key: "verify", icon: LuSearchCheck },
	{ key: "deliver", icon: LuPackageCheck },
]

function HowItWorks() {
	const { t } = useTranslation()

	return (
		<section className="h-section how" id="how-it-works">
			<div className="h-container">
				<div className="h-section-head">
					<Reveal>
						<p className="h-eyebrow">{t("home-how-eyebrow")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("home-how-title")} />
				</div>

				<div className="steps">
					<motion.span
						className="steps-line"
						aria-hidden="true"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true, margin: "0px 0px -120px 0px" }}
						transition={{ duration: 1.4, ease: EASE }}
					/>
					<ol className="steps-list">
						{STEPS.map(({ key, icon: Icon }, index) => (
							<Reveal as="li" key={key} delay={0.2 + index * 0.2} className="step">
								<span className="step-icon">
									<Icon aria-hidden="true" />
								</span>
								<span className="step-index">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h3 className="step-title">{t(`home-how-${key}-title`)}</h3>
								<p className="step-text">{t(`home-how-${key}-text`)}</p>
							</Reveal>
						))}
					</ol>
				</div>

				<div className="categories">
					<Reveal>
						<h3 className="categories-title">{t("home-how-categories-title")}</h3>
					</Reveal>
					<ul className="categories-grid">
						{INITIATIVE_CATEGORIES.map(({ key, icon: Icon }, index) => (
							<Reveal as="li" key={key} delay={(index % 3) * 0.06}>
								<Link to={INITIATIVES_PAGE} className="category">
									<span className="category-icon">
										<Icon aria-hidden="true" />
									</span>
									<span className="category-text">
										<span className="category-name">
											{t(`initiatives-${key}-title`)}
										</span>
										<span className="category-desc">
											{t(`initiatives-${key}-description`)}
										</span>
									</span>
									<LuArrowUpRight className="category-arrow" aria-hidden="true" />
								</Link>
							</Reveal>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
