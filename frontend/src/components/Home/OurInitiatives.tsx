import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { INITIATIVES_PAGE } from "../../lib/constants"
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "../../lib/useAnimations"
import "../../styles/home/ourInitiatives.css"

function OurInitiatives() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	// Animation hooks
	const { elementRef: sectionRef, isVisible } = useScrollAnimation<HTMLElement>(
		{
			threshold: 0.2,
			triggerOnce: true,
		}
	)
	const { containerRef: gridRef, visibleItems } =
		useStaggeredAnimation<HTMLDivElement>(6, {
			stagger: 150,
			threshold: 0.1,
		})

	const initiatives = [
		{
			id: 1,
			icon: "🪖",
			title: t("initiatives-equipment-title"),
			description: t("initiatives-equipment-description"),
			buttonText: t("initiatives-equipment-button"),
			slug: "equipment",
		},
		{
			id: 2,
			icon: "🩹",
			title: t("initiatives-medical-title"),
			description: t("initiatives-medical-description"),
			buttonText: t("initiatives-medical-button"),
			slug: "medical",
		},
		{
			id: 3,
			icon: "🚛",
			title: t("initiatives-transport-title"),
			description: t("initiatives-transport-description"),
			buttonText: t("initiatives-transport-button"),
			slug: "transport",
		},
		{
			id: 4,
			icon: "🕹️",
			title: t("initiatives-technology-title"),
			description: t("initiatives-technology-description"),
			buttonText: t("initiatives-technology-button"),
			slug: "technology",
		},
		{
			id: 5,
			icon: "💧",
			title: t("initiatives-food-title"),
			description: t("initiatives-food-description"),
			buttonText: t("initiatives-food-button"),
			slug: "food",
		},
		{
			id: 6,
			icon: "🤝",
			title: t("initiatives-special-title"),
			description: t("initiatives-special-description"),
			buttonText: t("initiatives-special-button"),
			slug: "special",
		},
	]

	return (
		<section
			ref={sectionRef}
			className={`our-initiatives ${isVisible ? "visible" : ""}`}
			id="our-initiatives"
		>
			<div className="initiatives-container">
				<div className="initiatives-header">
					<h2
						className={`initiatives-title ${
							isVisible ? "animate-fade-up visible" : "animate-fade-up"
						}`}
					>
						{t("initiatives-title")}
					</h2>
					<p
						className={`initiatives-subtitle ${
							isVisible
								? "animate-fade-up visible stagger-1"
								: "animate-fade-up stagger-1"
						}`}
					>
						{t("initiatives-subtitle")}
					</p>
				</div>

				<div ref={gridRef} className="initiatives-grid">
					{initiatives.map((initiative, index) => (
						<div
							key={initiative.id}
							className={`initiative-card hover-lift tilt-3d glass-effect ${
								visibleItems[index]
									? "animate-scale-in visible"
									: "animate-scale-in"
							}`}
						>
							<div className="card-icon floating-gentle">{initiative.icon}</div>
							<h3 className="card-title">{initiative.title}</h3>
							<p className="card-description">{initiative.description}</p>
							<button
								className="card-button btn-animated btn-ripple"
								onClick={() => navigate(`${INITIATIVES_PAGE}`)}
							>
								{initiative.buttonText}
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default OurInitiatives
