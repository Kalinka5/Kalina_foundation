import { useTranslation } from "react-i18next"
import { useScrollAnimation } from "../../lib/useAnimations"
import "../../styles/home/teamMission.css"

function TeamMission() {
	const { t } = useTranslation()

	// Animation hooks for different sections
	const { elementRef: sectionRef, isVisible } = useScrollAnimation<HTMLElement>(
		{
			threshold: 0.2,
			triggerOnce: true,
		}
	)
	const { elementRef: valuesRef, isVisible: valuesVisible } =
		useScrollAnimation<HTMLDivElement>({
			threshold: 0.3,
			triggerOnce: true,
		})

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
		<section
			ref={sectionRef}
			className={`team-mission ${isVisible ? "visible" : ""}`}
			id="team-mission"
		>
			<div className="team-mission-container">
				{/* First section: Mission & Vision with vertical image */}
				<div className="mission-vision-content">
					<div className="mission-vision-text">
						<div className="mission-section">
							<h2
								className={`section-title ${
									isVisible ? "animate-fade-left visible" : "animate-fade-left"
								}`}
							>
								{t("team-mission-title")}
							</h2>
							<p
								className={`section-description ${
									isVisible
										? "animate-fade-left visible stagger-1"
										: "animate-fade-left stagger-1"
								}`}
							>
								{t("team-mission-description-1")}
							</p>
							<p
								className={`section-description ${
									isVisible
										? "animate-fade-left visible stagger-2"
										: "animate-fade-left stagger-2"
								}`}
							>
								{t("team-mission-description-2")}
							</p>
						</div>

						<div className="vision-section">
							<h2
								className={`section-title ${
									isVisible
										? "animate-fade-left visible stagger-3"
										: "animate-fade-left stagger-3"
								}`}
							>
								{t("team-vision-title")}
							</h2>
							<p
								className={`section-description ${
									isVisible
										? "animate-fade-left visible stagger-4"
										: "animate-fade-left stagger-4"
								}`}
							>
								{t("team-vision-description")}
							</p>
						</div>
					</div>

					<div
						className={`team-image-vertical ${
							isVisible
								? "animate-fade-right visible stagger-2"
								: "animate-fade-right stagger-2"
						}`}
					>
						<div className="image-container hover-lift tilt-3d">
							<img
								src="/img/team-photo.png"
								alt="Our dedicated team"
								onError={e => {
									// Fallback to existing image if new one doesn't exist
									e.currentTarget.src = "/img/team-photo.png"
								}}
							/>
							<div className="glass-effect image-overlay"></div>
						</div>
					</div>
				</div>

				{/* Second section: Values with horizontal image */}
				<div ref={valuesRef} className="values-content">
					<div className="values-text">
						<div className="values-section">
							<h2
								className={`section-title ${
									valuesVisible
										? "animate-fade-right visible"
										: "animate-fade-right"
								}`}
							>
								{t("team-values-title")}
							</h2>
							<ul className="values-list">
								{coreValues.map((value, index) => (
									<li
										key={index}
										className={`value-item glass-effect hover-lift ${
											valuesVisible
												? `animate-fade-right visible stagger-${index + 1}`
												: `animate-fade-right stagger-${index + 1}`
										}`}
									>
										<strong className="value-title">{value.title}:</strong>{" "}
										<span className="value-description">
											{value.description}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div
						className={`team-image-horizontal ${
							valuesVisible
								? "animate-fade-left visible stagger-2"
								: "animate-fade-left stagger-2"
						}`}
					>
						<div className="image-container hover-lift tilt-3d">
							<img
								src="/img/team-photo-4x3.png"
								alt="Team collaboration"
								onError={e => {
									// Fallback to existing image if new one doesn't exist
									e.currentTarget.src = "/img/team-photo.png"
								}}
							/>
							<div className="glass-effect image-overlay"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TeamMission
