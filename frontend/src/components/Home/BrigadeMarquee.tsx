import { useTranslation } from "react-i18next"

import { BRIGADES } from "./data"

import "../../styles/home/brigadeMarquee.css"

function BrigadeMarquee() {
	const { t } = useTranslation()
	const names = BRIGADES.map(b => t(`home-brigade-short-${b.key}`))

	return (
		<section className="marquee" aria-label={t("home-marquee-title")}>
			<p className="marquee-label">{t("home-marquee-title")}</p>
			<div className="marquee-viewport">
				{/* Two identical tracks so the loop is seamless; the copy is hidden from screen readers. */}
				{[0, 1].map(copy => (
					<ul
						key={copy}
						className="marquee-track"
						aria-hidden={copy === 1 ? "true" : undefined}
					>
						{names.map(name => (
							<li key={name} className="marquee-item">
								<span className="marquee-name">{name}</span>
								<span className="marquee-sep" aria-hidden="true" />
							</li>
						))}
					</ul>
				))}
			</div>
		</section>
	)
}

export default BrigadeMarquee
