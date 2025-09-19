import React from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/ourInitiatives.css"

function OurInitiatives() {
	const { t } = useTranslation()

	const initiatives = [
		{
			id: 1,
			icon: "🪖",
			title: t("initiatives-equipment-title"),
			description: t("initiatives-equipment-description"),
			buttonText: t("initiatives-equipment-button"),
		},
		{
			id: 2,
			icon: "🩹",
			title: t("initiatives-medical-title"),
			description: t("initiatives-medical-description"),
			buttonText: t("initiatives-medical-button"),
		},
		{
			id: 3,
			icon: "🚛",
			title: t("initiatives-transport-title"),
			description: t("initiatives-transport-description"),
			buttonText: t("initiatives-transport-button"),
		},
		{
			id: 4,
			icon: "🕹️",
			title: t("initiatives-technology-title"),
			description: t("initiatives-technology-description"),
			buttonText: t("initiatives-technology-button"),
		},
		{
			id: 5,
			icon: "💧",
			title: t("initiatives-food-title"),
			description: t("initiatives-food-description"),
			buttonText: t("initiatives-food-button"),
		},
		{
			id: 6,
			icon: "🤝",
			title: t("initiatives-special-title"),
			description: t("initiatives-special-description"),
			buttonText: t("initiatives-special-button"),
		},
	]

	return (
		<section className="our-initiatives" id="our-initiatives">
			<div className="initiatives-container">
				<div className="initiatives-header">
					<h2 className="initiatives-title">{t("initiatives-title")}</h2>
					<p className="initiatives-subtitle">{t("initiatives-subtitle")}</p>
				</div>

				<div className="initiatives-grid">
					{initiatives.map(initiative => (
						<div key={initiative.id} className="initiative-card">
							<div className="card-icon">{initiative.icon}</div>
							<h3 className="card-title">{initiative.title}</h3>
							<p className="card-description">{initiative.description}</p>
							<button className="card-button">{initiative.buttonText}</button>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default OurInitiatives
