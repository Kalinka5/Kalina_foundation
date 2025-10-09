import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { INITIATIVES_PAGE } from "../../lib/constants"
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "../../lib/useAnimations"
import "../../styles/home/initiativesShowcase.css"
import "../../styles/home/ourInitiatives.css"

function InitiativesShowcase() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const scrollPositionRef = useRef(0) // Persist scroll position across pauses
	const [isPaused, setIsPaused] = useState(false)

	// Animation hooks for grid section
	const { elementRef: gridSectionRef, isVisible: isGridVisible } =
		useScrollAnimation<HTMLDivElement>({
			threshold: 0.2,
			triggerOnce: true,
		})
	const { containerRef: gridRef, visibleItems } =
		useStaggeredAnimation<HTMLDivElement>(6, {
			stagger: 150,
			threshold: 0.1,
		})

	// Auto-scroll effect for showcase cards
	useEffect(() => {
		const container = scrollContainerRef.current
		if (!container) return

		let animationFrameId: number
		const scrollSpeed = 0.5 // pixels per frame

		// Calculate the width of one set of cards (including gap)
		const cardWidth = 350 // Card width from CSS
		const gap = 32 // 2rem gap = 32px
		const oneSetWidth = (cardWidth + gap) * showcaseCards.length

		const autoScroll = () => {
			if (!isPaused && container) {
				scrollPositionRef.current += scrollSpeed
				container.scrollLeft = scrollPositionRef.current

				// Reset scroll seamlessly when we've scrolled one complete set
				if (scrollPositionRef.current >= oneSetWidth) {
					scrollPositionRef.current = scrollPositionRef.current - oneSetWidth
					container.scrollLeft = scrollPositionRef.current
				}
			}

			animationFrameId = requestAnimationFrame(autoScroll)
		}

		animationFrameId = requestAnimationFrame(autoScroll)

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [isPaused])

	// Grid initiatives data
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

	// Showcase cards with different types
	const showcaseCards = [
		{
			id: 1,
			type: "image-text",
			icon: "🎯",
			title: t("initiatives-tactical-title"),
			description: t("initiatives-tactical-subtitle"),
			image: "/img/donation-image1.jpg",
			color: "rgba(30, 35, 60, 0.95)",
			textColor: "#ffffff",
		},
		{
			id: 2,
			type: "stats-card",
			icon: "💪",
			title: t("initiatives-stat-delivered"),
			value: "2,450+",
			subtitle: t("initiatives-stat-brigades"),
			valueSmall: "48",
			color: "rgba(251, 191, 36, 0.15)",
			gradient:
				"linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)",
		},
		{
			id: 3,
			type: "image-overlay",
			icon: "🚁",
			title: t("initiatives-drones-title"),
			subtitle: t("initiatives-drones-subtitle"),
			image: "/img/donation-image3.jpg",
			color: "rgba(20, 25, 45, 0.8)",
			badge: t("initiatives-stat-missions"),
			badgeValue: "5,800",
		},
		{
			id: 4,
			type: "text-action",
			icon: "⚡",
			title: t("initiatives-support-title"),
			description: t("initiatives-support-subtitle"),
			color: "rgba(139, 92, 246, 0.2)",
			buttonText: t("initiatives-donate-to-this"),
		},
		{
			id: 5,
			type: "image-text",
			icon: "🎖️",
			title: t("initiatives-impact-title1"),
			description: t("initiatives-impact-desc1"),
			image: "/img/donation-image5.jpg",
			color: "rgba(59, 130, 246, 0.15)",
			textColor: "#ffffff",
		},
		{
			id: 6,
			type: "image-overlay",
			icon: "🛡️",
			title: t("initiatives-tactical-subtitle"),
			subtitle: t("initiatives-highlight-1"),
			image: "/img/donation-image2.jpg",
			color: "rgba(20, 25, 45, 0.8)",
			badge: t("initiatives-hero-stat3"),
			badgeValue: "48",
		},
	]

	return (
		<section className="initiatives-showcase">
			<div className="initiatives-container">
				<div className="showcase-header">
					<h2 className="showcase-section-title">
						{t("initiatives-showcase-title")}
					</h2>
					<p className="initiatives-subtitle">{t("initiatives-subtitle")}</p>
				</div>

				{/* Horizontal Scrolling Cards */}
				<div className="showcase-cards-wrapper">
					<div
						className="showcase-cards-scroll"
						ref={scrollContainerRef}
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
					>
						{/* Duplicate cards multiple times for seamless infinite scroll */}
						{[...showcaseCards, ...showcaseCards, ...showcaseCards].map(
							(card, index) => {
								const cardKey = `${card.id}-${index}`
								// Image + Text Below Card
								if (card.type === "image-text") {
									return (
										<div
											key={cardKey}
											className="showcase-card card-image-text animate-card"
											style={{ backgroundColor: card.color }}
										>
											<div className="card-image-container">
												<img
													src={card.image}
													alt={card.title}
													className="card-image"
												/>
											</div>
											<div
												className="showcase-card-content"
												style={{ color: card.textColor }}
											>
												<div className="showcase-card-icon">{card.icon}</div>
												<h3 className="showcase-card-title">{card.title}</h3>
												<p className="showcase-card-description">
													{card.description}
												</p>
											</div>
										</div>
									)
								}

								// Stats Card
								if (card.type === "stats-card") {
									return (
										<div
											key={cardKey}
											className="showcase-card card-stats animate-card"
											style={{ background: card.gradient }}
										>
											<div className="card-icon-large">{card.icon}</div>
											<div className="stats-content">
												<div className="stat-primary">
													<div className="stat-value-large">{card.value}</div>
													<div className="stat-label-main">{card.title}</div>
												</div>
												<div className="stat-secondary">
													<div className="stat-value-small">
														{card.valueSmall}
													</div>
													<div className="stat-label-small">
														{card.subtitle}
													</div>
												</div>
											</div>
											<div className="card-decoration">✨</div>
										</div>
									)
								}

								// Image with Overlay Text Card
								if (card.type === "image-overlay") {
									return (
										<div
											key={cardKey}
											className="showcase-card card-image-overlay animate-card"
										>
											<img
												src={card.image}
												alt={card.title}
												className="card-background-image"
											/>
											<div className="card-overlay"></div>
											<div className="card-overlay-content">
												{card.badge && (
													<div className="overlay-badge">
														<span className="badge-icon">{card.icon}</span>
														<span className="badge-text">
															{card.badgeValue} {card.badge}
														</span>
													</div>
												)}
												<h3 className="overlay-title">{card.title}</h3>
												<p className="overlay-subtitle">{card.subtitle}</p>
											</div>
										</div>
									)
								}

								// Text + Action Card
								if (card.type === "text-action") {
									return (
										<div
											key={cardKey}
											className="showcase-card card-text-action animate-card"
											style={{ backgroundColor: card.color }}
										>
											<div className="card-icon-animated">{card.icon}</div>
											<h3 className="action-card-title">{card.title}</h3>
											<p className="action-card-description">
												{card.description}
											</p>
											<button
												className="action-card-button"
												onClick={() => navigate("/donate")}
											>
												<span>{card.buttonText}</span>
												<span className="button-icon">→</span>
											</button>
											<div className="card-pulse-effect"></div>
										</div>
									)
								}

								return null
							}
						)}
					</div>
				</div>

				{/* Grid Initiatives Section */}
				<div
					ref={gridSectionRef}
					className={`our-initiatives ${isGridVisible ? "visible" : ""}`}
					id="our-initiatives"
				>
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
								<div className="card-icon floating-gentle">
									{initiative.icon}
								</div>
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
			</div>
		</section>
	)
}

export default InitiativesShowcase
