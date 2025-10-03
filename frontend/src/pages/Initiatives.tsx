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

	// Initiatives page navigation links
	const initiativesNavLinks = [
		{ id: 1, urlLink: "#video-hero", urlName: "about-us" },
		{ id: 2, urlLink: "#initiatives-mission-section", urlName: "our-mission" },
		{ id: 3, urlLink: "#our-story-section", urlName: "our-story" },
		{ id: 4, urlLink: "#impact-timeline", urlName: "impact" },
	]

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

	// Story content with different layouts
	const storyContent = [
		{
			id: 1,
			layout: "image-left",
			image: "/img/donation-image1.jpg",
			title: t("initiatives-story-1-title"),
			description: t("initiatives-story-1-desc"),
			stats: [
				{ value: "2,450+", label: t("initiatives-stat-delivered") },
				{ value: "48", label: t("initiatives-stat-brigades") },
			],
		},
		{
			id: 2,
			layout: "image-right-large",
			image: "/img/donation-image3.jpg",
			title: t("initiatives-story-2-title"),
			description: t("initiatives-story-2-desc"),
			highlight: t("initiatives-story-2-highlight"),
		},
		{
			id: 3,
			layout: "two-images",
			images: ["/img/donation-image5.jpg", "/img/donation-image2.jpg"],
			title: t("initiatives-story-3-title"),
			description: t("initiatives-story-3-desc"),
		},
		{
			id: 4,
			layout: "image-left",
			image: "/img/donation-image4.jpg",
			title: t("initiatives-story-4-title"),
			description: t("initiatives-story-4-desc"),
			quote: t("initiatives-story-4-quote"),
		},
	]

	return (
		<div className="initiatives-page">
			<Header navLinks={initiativesNavLinks} />

			{/* Video Hero Section */}
			<section className="video-hero" id="video-hero">
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
			<section
				className="initiatives-mission-section"
				id="initiatives-mission-section"
			>
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

			{/* Our Story - Alternating Layouts */}
			<section className="our-story-section" id="our-story-section">
				<div className="initiatives-container">
					<div className="story-header">
						<h2 className="initiatives-section-title">
							{t("initiatives-story-title")}
						</h2>
						<p className="initiatives-section-subtitle">
							{t("initiatives-story-subtitle")}
						</p>
					</div>

					{storyContent.map((story, index) => {
						// Layout 1: Image Left, Text Right
						if (story.layout === "image-left") {
							return (
								<div key={story.id} className="story-block image-left">
									<div className="initiatives-story-image-wrapper">
										<div className="initiatives-story-image-container">
											<img
												src={story.image}
												alt={story.title}
												className="initiatives-story-image"
											/>
											<div className="image-glow"></div>
										</div>
									</div>
									<div className="initiatives-story-content">
										<div className="story-badge">
											{t("initiatives-story-badge")} {story.id}
										</div>
										<h3 className="story-title">{story.title}</h3>
										<p className="initiatives-story-description">
											{story.description}
										</p>
										{story.stats && (
											<div className="story-stats">
												{story.stats.map((stat, i) => (
													<div key={i} className="story-stat">
														<div className="stat-value">{stat.value}</div>
														<div className="stat-label">{stat.label}</div>
													</div>
												))}
											</div>
										)}
										{story.quote && (
											<div className="story-quote">
												<span className="quote-icon">"</span>
												{story.quote}
											</div>
										)}
									</div>
								</div>
							)
						}

						// Layout 2: Image Right (Larger), Text Left
						if (story.layout === "image-right-large") {
							return (
								<div key={story.id} className="story-block image-right-large">
									<div className="initiatives-story-content">
										<div className="story-badge">
											{t("initiatives-story-badge")} {story.id}
										</div>
										<h3 className="story-title">{story.title}</h3>
										<p className="initiatives-story-description">
											{story.description}
										</p>
										{story.highlight && (
											<div className="story-highlight">
												<div className="highlight-dot"></div>
												{story.highlight}
											</div>
										)}
									</div>
									<div className="initiatives-story-image-wrapper large">
										<div className="initiatives-story-image-container">
											<img
												src={story.image}
												alt={story.title}
												className="initiatives-story-image"
											/>
											<div className="image-glow"></div>
										</div>
									</div>
								</div>
							)
						}

						// Layout 3: Two Images, Text in Center
						if (story.layout === "two-images") {
							return (
								<div key={story.id} className="story-block two-images">
									<div className="story-images-grid">
										<div className="initiatives-story-image-container">
											<img
												src={story.images[0]}
												alt={`${story.title} 1`}
												className="initiatives-story-image"
											/>
											<div className="image-glow"></div>
										</div>
										<div className="initiatives-story-image-container">
											<img
												src={story.images[1]}
												alt={`${story.title} 2`}
												className="initiatives-story-image"
											/>
											<div className="image-glow"></div>
										</div>
									</div>
									<div className="initiatives-story-content centered">
										<div className="story-badge">
											{t("initiatives-story-badge")} {story.id}
										</div>
										<h3 className="story-title">{story.title}</h3>
										<p className="initiatives-story-description">
											{story.description}
										</p>
									</div>
								</div>
							)
						}

						return null
					})}
				</div>
			</section>

			{/* Impact Timeline */}
			<section className="impact-timeline" id="impact-timeline">
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
						<h2 className="initiatives-cta-title">
							{t("initiatives-final-initiatives-cta-title")}
						</h2>
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
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Initiatives
