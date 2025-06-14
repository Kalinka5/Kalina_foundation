import React from "react"
import { useTranslation } from "react-i18next"
import {
	FaArrowRight,
	FaGlobe,
	FaHandsHelping,
	FaHeart,
	FaStar,
	FaUsers,
} from "react-icons/fa"
import "../../../styles/home/missionHighlights/missionHighlights.css"

function MissionHighlights() {
	const { t } = useTranslation()

	const missionCards = [
		{
			id: 1,
			icon: <FaHeart />,
			title: t("mission-card-1-title"),
			description: t("mission-card-1-desc"),
			bgColor: "mission-red",
			stat: "5000+",
			statLabel: t("heroes-supported"),
		},
		{
			id: 2,
			icon: <FaUsers />,
			title: t("mission-card-2-title"),
			description: t("mission-card-2-desc"),
			bgColor: "mission-blue",
			stat: "50+",
			statLabel: t("countries-reach"),
		},
		{
			id: 3,
			icon: <FaHandsHelping />,
			title: t("mission-card-3-title"),
			description: t("mission-card-3-desc"),
			bgColor: "mission-yellow",
			stat: "24/7",
			statLabel: t("support-available"),
		},
	]

	return (
		<section className="mission-highlights">
			<div className="container">
				<div className="mission-intro">
					<div className="mission-badge">
						<FaStar className="badge-star" />
						<span>{t("our-mission")}</span>
					</div>
					<h2 className="mission-main-title">{t("mission-main-title")}</h2>
					<p className="mission-main-desc">{t("mission-main-desc")}</p>
				</div>

				<div className="mission-grid">
					{missionCards.map((card, index) => (
						<div key={card.id} className={`mission-card ${card.bgColor}`}>
							<div className="mission-card-header">
								<div className="mission-icon">{card.icon}</div>
								<div className="mission-stat">
									<span className="stat-number">{card.stat}</span>
									<span className="stat-label">{card.statLabel}</span>
								</div>
							</div>

							<div className="mission-card-content">
								<h3 className="mission-card-title">{card.title}</h3>
								<p className="mission-card-desc">{card.description}</p>
							</div>

							<div className="mission-card-footer">
								<button className="learn-more-btn">
									{t("learn-more")}
									<FaArrowRight className="arrow-icon" />
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="mission-call-to-action">
					<div className="cta-content">
						<FaGlobe className="cta-icon" />
						<div className="cta-text">
							<h3>{t("cta-title")}</h3>
							<p>{t("cta-description")}</p>
						</div>
						<button className="cta-button">
							{t("join-mission")}
							<FaArrowRight />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MissionHighlights
