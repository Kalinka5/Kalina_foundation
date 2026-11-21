import { useTranslation } from "react-i18next"

import OptimizedImage from "../OptimizedImage"
import { Parallax, Reveal, RevealText } from "./motion"

import "../../styles/home/missionSection.css"
import "../../styles/optimizedImage.css"

const VALUE_KEYS = [
	"transparency",
	"integrity",
	"compassion",
	"impact",
	"solidarity",
] as const

function MissionSection() {
	const { t } = useTranslation()

	return (
		<section className="h-section mission" id="our-mission">
			<div className="h-container">
				<div className="mission-grid">
					<div className="mission-copy">
						<Reveal>
							<p className="h-eyebrow">{t("our-mission")}</p>
						</Reveal>
						<RevealText
							className="h-title mission-statement"
							text={t("home-mission-statement")}
						/>
						<Reveal delay={0.1}>
							<p className="h-lead">{t("home-mission-body")}</p>
						</Reveal>
						<Reveal delay={0.2} className="mission-vision">
							<h3>{t("team-vision-title")}</h3>
							<p>{t("home-vision-body")}</p>
						</Reveal>
					</div>

					<Reveal className="mission-media" y={40}>
						<Parallax distance={70} className="mission-parallax">
							<OptimizedImage
								src="/img/team-photo.png"
								alt={t("home-mission-photo-alt")}
								width={928}
								height={1232}
								sizes="(max-width: 900px) 100vw, 45vw"
							/>
						</Parallax>
					</Reveal>
				</div>

				<div className="values">
					<Reveal>
						<h3 className="values-title">{t("team-values-title")}</h3>
					</Reveal>
					<ol className="values-list">
						{VALUE_KEYS.map((key, index) => (
							<Reveal as="li" key={key} delay={index * 0.06} className="value">
								<span className="value-index">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h4 className="value-name">{t(`team-values-${key}-title`)}</h4>
								<p className="value-text">
									{t(`team-values-${key}-description`)}
								</p>
							</Reveal>
						))}
					</ol>
				</div>
			</div>
		</section>
	)
}

export default MissionSection
