import { useTranslation } from "react-i18next"
import { useState } from "react"
import { LuArrowRight, LuPackage } from "react-icons/lu"
import { Link } from "react-router-dom"

import { DONATE_PAGE, INITIATIVES_PAGE } from "../../lib/constants"
import { useLimitedItems } from "../../lib/hooks"
import { formatUsd } from "./data"
import { ProgressBar, Reveal, RevealText } from "./motion"

import "../../styles/home/urgentNeeds.css"

const VISIBLE_COUNT = 6

/** Item photo with a branded placeholder when the image is missing. */
function NeedImage({ src, alt }: { src: string; alt: string }) {
	const [failed, setFailed] = useState(!src)
	if (failed) {
		return (
			<div className="need-fallback" role="img" aria-label={alt}>
				<LuPackage aria-hidden="true" />
			</div>
		)
	}
	return (
		<img
			src={src}
			alt={alt}
			loading="lazy"
			width={400}
			height={300}
			onError={() => setFailed(true)}
		/>
	)
}

function UrgentNeeds() {
	const { t } = useTranslation()
	const { data: items, isLoading } = useLimitedItems(16)

	// Closest to the goal first: "almost there" fundraisers convert best and show momentum.
	const needs = (items ?? [])
		.filter(i => i.full_price > 0 && i.collected < i.full_price)
		.map(i => ({
			...i,
			percentage: Math.round((i.collected / i.full_price) * 100),
		}))
		.sort((a, b) => b.percentage - a.percentage)
		.slice(0, VISIBLE_COUNT)

	return (
		<section className="h-section needs" id="urgent-needs">
			<div className="h-container">
				<div className="h-section-head">
					<Reveal>
						<p className="h-eyebrow">{t("home-needs-eyebrow")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("home-needs-title")} />
					<Reveal delay={0.15}>
						<p className="h-lead">{t("home-needs-subtitle")}</p>
					</Reveal>
				</div>

				{isLoading ? (
					<ul className="needs-grid" aria-busy="true">
						{Array.from({ length: VISIBLE_COUNT }, (_, i) => (
							<li key={i} className="need-card need-skeleton" />
						))}
					</ul>
				) : needs.length === 0 ? (
					<p className="needs-empty">{t("home-needs-empty")}</p>
				) : (
					<ul className="needs-grid">
						{needs.map((item, index) => {
							const title = t(`${item.title}-title`)
							return (
								<Reveal
									as="li"
									key={item.id}
									delay={(index % 3) * 0.08}
									className="need-card"
								>
									<div className="need-media">
										<NeedImage src={item.image} alt={title} />
									</div>
									<div className="need-body">
										<h3 className="need-title">{title}</h3>
										<ProgressBar
											value={item.percentage}
											label={`${title}: ${item.percentage}% ${t("home-funded")}`}
										/>
										<div className="need-stats">
											<span>
												<strong>{formatUsd(item.collected)}</strong>{" "}
												{t("home-needs-raised-of")} {formatUsd(item.full_price)}
											</span>
											<span className="need-pct">{item.percentage}%</span>
										</div>
										<Link to={DONATE_PAGE} className="btn btn-outline need-cta">
											{t("home-needs-donate")}
											<LuArrowRight aria-hidden="true" />
										</Link>
									</div>
								</Reveal>
							)
						})}
					</ul>
				)}

				<Reveal className="needs-footer">
					<Link to={INITIATIVES_PAGE} className="h-link">
						{t("home-needs-view-all")}
						<LuArrowRight aria-hidden="true" />
					</Link>
				</Reveal>
			</div>
		</section>
	)
}

export default UrgentNeeds
