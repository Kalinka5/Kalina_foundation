import { useTranslation } from "react-i18next"
import { LuPlus } from "react-icons/lu"

import { Reveal, RevealText } from "../Home/motion"

const QUESTIONS = ["safe", "abroad", "report", "arrived", "equipment", "monthly"]

const CONTACT_EMAIL = "info@kalinafond.com"

function FaqSection() {
	const { t } = useTranslation()

	return (
		<section className="h-section faq" id="faq">
			<div className="h-container faq-grid">
				<div className="faq-head">
					<Reveal>
						<p className="h-eyebrow">{t("donate-page-faq-eyebrow")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("donate-page-faq-title")} />
					<Reveal delay={0.15}>
						<p className="h-lead">
							{t("donate-page-faq-contact")}{" "}
							<a className="h-link" href={`mailto:${CONTACT_EMAIL}`}>
								{CONTACT_EMAIL}
							</a>
						</p>
					</Reveal>
				</div>

				<Reveal delay={0.1} className="faq-list">
					{QUESTIONS.map(key => (
						<details key={key} className="faq-item">
							<summary>
								<span>{t(`donate-page-faq-${key}-q`)}</span>
								<LuPlus className="faq-icon" aria-hidden="true" />
							</summary>
							<p>{t(`donate-page-faq-${key}-a`)}</p>
						</details>
					))}
				</Reveal>
			</div>
		</section>
	)
}

export default FaqSection
