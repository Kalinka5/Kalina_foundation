import React from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/teamMission.css"

function TeamMission() {
	const { t } = useTranslation()

	const coreValues = [
		{
			title: t("team-values-transparency-title"),
			description: t("team-values-transparency-description"),
		},
		{
			title: t("team-values-integrity-title"),
			description: t("team-values-integrity-description"),
		},
		{
			title: t("team-values-compassion-title"),
			description: t("team-values-compassion-description"),
		},
		{
			title: t("team-values-impact-title"),
			description: t("team-values-impact-description"),
		},
		{
			title: t("team-values-solidarity-title"),
			description: t("team-values-solidarity-description"),
		},
	]

	return (
		<section className="team-mission" id="team-mission">
			<div className="team-mission-container">
				{/* First section: Mission & Vision with vertical image */}
				<div className="mission-vision-content">
					<div className="mission-vision-text">
						<div className="mission-section">
							<h2 className="section-title">{t("team-mission-title")}</h2>
							<p className="section-description">
								{t("team-mission-description-1")}
							</p>
							<p className="section-description">
								{t("team-mission-description-2")}
							</p>
						</div>

						<div className="vision-section">
							<h2 className="section-title">{t("team-vision-title")}</h2>
							<p className="section-description">
								{t("team-vision-description")}
							</p>
						</div>
					</div>

					<div className="team-image-vertical">
						<img
							src="/img/team-photo.png"
							alt="Our dedicated team"
							onError={e => {
								// Fallback to existing image if new one doesn't exist
								e.currentTarget.src = "/img/team-photo.png"
							}}
						/>
					</div>
				</div>

				{/* Second section: Values with horizontal image */}
				<div className="values-content">
					<div className="values-text">
						<div className="values-section">
							<h2 className="section-title">{t("team-values-title")}</h2>
							<ul className="values-list">
								{coreValues.map((value, index) => (
									<li key={index} className="value-item">
										<strong className="value-title">{value.title}:</strong>{" "}
										<span className="value-description">
											{value.description}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="team-image-horizontal">
						<img
							src="/img/team-photo-4x3.png"
							alt="Team collaboration"
							onError={e => {
								// Fallback to existing image if new one doesn't exist
								e.currentTarget.src = "/img/team-photo.png"
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TeamMission
