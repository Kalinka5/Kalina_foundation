import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import "../styles/initiatives.css"

// Custom hook for counting animation
function useCountAnimation(
	target: number,
	duration: number,
	shouldStart: boolean
) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!shouldStart) return

		const startTime = Date.now()
		const endTime = startTime + duration

		const updateCount = () => {
			const now = Date.now()
			const progress = Math.min((now - startTime) / duration, 1)

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4)
			const currentCount = Math.floor(easeOutQuart * target)

			setCount(currentCount)

			if (progress < 1) {
				requestAnimationFrame(updateCount)
			} else {
				setCount(target)
			}
		}

		requestAnimationFrame(updateCount)
	}, [target, duration, shouldStart])

	return count
}

// Component for animated counting number
function CountingNumber({
	value,
	duration,
	shouldStart,
}: {
	value: number
	duration: number
	shouldStart: boolean
}) {
	const count = useCountAnimation(value, duration, shouldStart)
	return <>{count.toLocaleString()}</>
}

interface Initiative {
	id: number
	icon: string
	title: string
	subtitle: string
	description: string
	images: string[]
	stats: {
		label: string
		value: string
	}[]
	color: string
}

function Initiatives() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [activeInitiative, setActiveInitiative] = useState(0)
	const videoRef = useRef<HTMLIFrameElement>(null)
	const statsRef = useRef<HTMLDivElement>(null)
	const [startCounting, setStartCounting] = useState(false)

	// IntersectionObserver to trigger counting animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !startCounting) {
						setStartCounting(true)
					}
				})
			},
			{ threshold: 0.3 }
		)

		if (statsRef.current) {
			observer.observe(statsRef.current)
		}

		return () => {
			if (statsRef.current) {
				observer.unobserve(statsRef.current)
			}
		}
	}, [startCounting])

	const initiatives: Initiative[] = [
		{
			id: 1,
			icon: "🎯",
			title: t("initiatives-tactical-title"),
			subtitle: t("initiatives-tactical-subtitle"),
			description: t("initiatives-tactical-description"),
			images: ["/img/donation-image1.jpg", "/img/donation-image2.jpg"],
			stats: [
				{ label: t("initiatives-stat-delivered"), value: "2,450+" },
				{ label: t("initiatives-stat-brigades"), value: "48" },
			],
			color: "#6366f1",
		},
		{
			id: 2,
			icon: "🚁",
			title: t("initiatives-drones-title"),
			subtitle: t("initiatives-drones-subtitle"),
			description: t("initiatives-drones-description"),
			images: ["/img/donation-image3.jpg", "/img/donation-image4.jpg"],
			stats: [
				{ label: t("initiatives-stat-drones"), value: "1,200+" },
				{ label: t("initiatives-stat-missions"), value: "5,800" },
			],
			color: "#8b5cf6",
		},
		{
			id: 3,
			icon: "⚡",
			title: t("initiatives-support-title"),
			subtitle: t("initiatives-support-subtitle"),
			description: t("initiatives-support-description"),
			images: ["/img/donation-image5.jpg", "/img/donation-image6.jpg"],
			stats: [
				{ label: t("initiatives-stat-vehicles"), value: "340+" },
				{ label: t("initiatives-stat-generators"), value: "890" },
			],
			color: "#ec4899",
		},
	]

	return (
		<div className="initiatives-page">
			<Header />

			{/* Video Hero Section */}
			<section className="video-hero">
				<div className="video-container">
					<iframe
						ref={videoRef}
						src="https://www.youtube.com/embed/o8ETgjcIxuE?autoplay=1&loop=1&playlist=o8ETgjcIxuE&t=20&mute=1&playsinline=1&controls=0&showinfo=0&autohide=1&allowfullscreen=true&mode=transparent"
						allow="autoplay; encrypted-media"
						allowFullScreen
						className="video-background"
					></iframe>
					<div className="video-overlay"></div>
				</div>
				<div className="hero-content-wrapper">
					<div className="hero-badge">{t("initiatives-hero-badge")}</div>
					<h1 className="video-hero-title animate-fade-in">
						{t("initiatives-hero-title")}
					</h1>
					<p className="video-hero-subtitle animate-fade-in-delay">
						{t("initiatives-hero-subtitle")}
					</p>
					<div className="hero-stats-grid animate-slide-up" ref={statsRef}>
						<div className="hero-stat-card">
							<div className="stat-number">
								<CountingNumber
									value={3}
									duration={2000}
									shouldStart={startCounting}
								/>
							</div>
							<div className="stat-label">{t("initiatives-hero-stat1")}</div>
						</div>
						<div className="hero-stat-card">
							<div className="stat-number">
								<CountingNumber
									value={26040}
									duration={1500}
									shouldStart={startCounting}
								/>
							</div>
							<div className="stat-label">{t("initiatives-hero-stat2")}</div>
						</div>
						<div className="hero-stat-card">
							<div className="stat-number">
								<CountingNumber
									value={48}
									duration={1800}
									shouldStart={startCounting}
								/>
							</div>
							<div className="stat-label">{t("initiatives-hero-stat3")}</div>
						</div>
					</div>
					<button
						className="hero-cta-button"
						onClick={() => navigate("/donate")}
					>
						<span className="button-text">{t("initiatives-hero-cta")}</span>
						<span className="button-arrow">→</span>
					</button>
				</div>
			</section>

			{/* Mission Statement */}
			<section className="initiatives-mission-section">
				<div className="initiatives-container">
					<div className="initiatives-mission-content">
						<div className="mission-text">
							<span className="initiatives-mission-label">
								{t("initiatives-mission-label")}
							</span>
							<h2 className="initiatives-mission-title">
								{t("initiatives-mission-title")}
							</h2>
							<p className="initiatives-mission-description">
								{t("initiatives-mission-description")}
							</p>
							<div className="initiatives-mission-highlights">
								<div className="highlight-item">
									<div className="highlight-icon">✓</div>
									<span>{t("initiatives-highlight-1")}</span>
								</div>
								<div className="highlight-item">
									<div className="highlight-icon">✓</div>
									<span>{t("initiatives-highlight-2")}</span>
								</div>
								<div className="highlight-item">
									<div className="highlight-icon">✓</div>
									<span>{t("initiatives-highlight-3")}</span>
								</div>
							</div>
						</div>
						<div className="initiatives-mission-visual">
							<div className="initiatives-floating-card">
								<div className="initiatives-card-glow"></div>
								<img
									src="/img/donation-image1.jpg"
									alt="Mission"
									className="initiatives-mission-image"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Initiatives Showcase */}
			<section className="initiatives-showcase">
				<div className="initiatives-container">
					<div className="showcase-header">
						<h2 className="initiatives-section-title">
							{t("initiatives-showcase-title")}
						</h2>
						<p className="initiatives-section-subtitle">
							{t("initiatives-showcase-subtitle")}
						</p>
					</div>

					{/* Initiative Tabs */}
					<div className="initiative-tabs">
						{initiatives.map((initiative, index) => (
							<button
								key={initiative.id}
								className={`tab-button ${
									activeInitiative === index ? "active" : ""
								}`}
								onClick={() => setActiveInitiative(index)}
								style={{
									borderColor:
										activeInitiative === index
											? initiative.color
											: "transparent",
								}}
							>
								<span className="tab-icon">{initiative.icon}</span>
								<span className="tab-title">{initiative.title}</span>
							</button>
						))}
					</div>

					{/* Active Initiative Display */}
					{initiatives.map((initiative, index) => (
						<div
							key={initiative.id}
							className={`initiative-content ${
								activeInitiative === index ? "active" : ""
							}`}
						>
							<div className="initiative-grid">
								<div className="initiative-info">
									<div className="initiative-icon-large">{initiative.icon}</div>
									<h3 className="initiative-title">{initiative.title}</h3>
									<p className="initiative-subtitle">{initiative.subtitle}</p>
									<p className="initiative-description">
										{initiative.description}
									</p>

									<div className="initiative-stats">
										{initiative.stats.map((stat, idx) => (
											<div key={idx} className="stat-box">
												<div
													className="stat-value"
													style={{ color: initiative.color }}
												>
													{stat.value}
												</div>
												<div className="stat-label">{stat.label}</div>
											</div>
										))}
									</div>

									<button
										className="initiative-donate-btn"
										style={{
											background: `linear-gradient(135deg, ${initiative.color}, ${initiative.color}dd)`,
										}}
										onClick={() => navigate("/donate")}
									>
										{t("initiatives-donate-to-this")}
									</button>
								</div>

								<div className="initiative-images">
									<div className="image-grid">
										{initiative.images.map((image, idx) => (
											<div key={idx} className="image-wrapper">
												<img
													src={image}
													alt={`${initiative.title} ${idx + 1}`}
													className="initiative-image"
												/>
												<div className="image-overlay-gradient"></div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Impact Timeline */}
			<section className="impact-timeline">
				<div className="initiatives-container">
					<h2 className="initiatives-section-title">
						{t("initiatives-impact-title")}
					</h2>
					<div className="timeline">
						<div className="timeline-item">
							<div className="timeline-marker"></div>
							<div className="timeline-content">
								<div className="timeline-date">
									{t("initiatives-impact-date1")}
								</div>
								<h4>{t("initiatives-impact-title1")}</h4>
								<p>{t("initiatives-impact-desc1")}</p>
							</div>
						</div>
						<div className="timeline-item">
							<div className="timeline-marker"></div>
							<div className="timeline-content">
								<div className="timeline-date">
									{t("initiatives-impact-date2")}
								</div>
								<h4>{t("initiatives-impact-title2")}</h4>
								<p>{t("initiatives-impact-desc2")}</p>
							</div>
						</div>
						<div className="timeline-item">
							<div className="timeline-marker"></div>
							<div className="timeline-content">
								<div className="timeline-date">
									{t("initiatives-impact-date3")}
								</div>
								<h4>{t("initiatives-impact-title3")}</h4>
								<p>{t("initiatives-impact-desc3")}</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="final-cta">
				<div className="initiatives-container">
					<div className="cta-box">
						<h2 className="cta-title">{t("initiatives-final-cta-title")}</h2>
						<p className="cta-subtitle">
							{t("initiatives-final-cta-subtitle")}
						</p>
						<div className="cta-buttons">
							<button
								className="btn-primary-large"
								onClick={() => navigate("/donate")}
							>
								{t("initiatives-donate-now")}
							</button>
							<button
								className="btn-secondary-large"
								onClick={() => navigate("/home")}
							>
								{t("initiatives-learn-more")}
							</button>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Initiatives
