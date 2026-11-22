import { useTranslation } from "react-i18next"
import { LuBadgeCheck, LuFileText, LuHandshake, LuPackageCheck } from "react-icons/lu"

import { Reveal, RevealText } from "../Home/motion"

const POINTS = [
	{ key: "verified", icon: LuBadgeCheck },
	{ key: "all-to-needs", icon: LuPackageCheck },
	{ key: "reports", icon: LuFileText },
	{ key: "direct", icon: LuHandshake },
]

function TrustSection() {
	const { t } = useTranslation()

	return (
		<section className="h-section trust" id="trust">
			<div className="h-container">
				<div className="h-section-head">
					<Reveal>
						<p className="h-eyebrow">{t("donate-page-trust-eyebrow")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("donate-page-trust-title")} />
				</div>

				<ul className="trust-grid">
					{POINTS.map(({ key, icon: Icon }, i) => (
						<Reveal as="li" key={key} delay={i * 0.08} className="trust-item">
							<span className="trust-icon" aria-hidden="true">
								<Icon />
							</span>
							<h3 className="trust-title">{t(`donate-page-trust-${key}-title`)}</h3>
							<p className="trust-desc">{t(`donate-page-trust-${key}-desc`)}</p>
						</Reveal>
					))}
				</ul>
			</div>
		</section>
	)
}

export default TrustSection
