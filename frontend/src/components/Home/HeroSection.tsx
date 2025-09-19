import React from "react"
import { useTranslation } from "react-i18next"
import {
	usePageLoadAnimation,
	useParallax,
	useScrollAnimation,
} from "../../lib/useAnimations.tsx"
import "../../styles/home/heroSection.css"

function HeroSection() {
	const { t } = useTranslation()

	// Animation hooks
	const { elementRef: sectionRef, isVisible } = useScrollAnimation({
		threshold: 0.3,
		triggerOnce: true,
	})
	const { elementRef: parallaxRef, offset } = useParallax(0.3)
	const isPageLoaded = usePageLoadAnimation(300)

	const handleDonateClick = () => {
		// Navigate to donation page or scroll to donation section
		window.location.href = "/payment"
	}

	return (
		<section
			ref={sectionRef}
			className={`hero-section parallax-container ${
				isVisible ? "visible" : ""
			}`}
			id="hero-section"
		>
			{/* Parallax background elements */}
			<div
				ref={parallaxRef}
				className="parallax-element hero-background"
				style={{
					transform: `translateY(${offset * 0.5}px)`,
					background:
						"linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(65, 105, 225, 0.15) 100%)",
				}}
			/>

			{/* Floating decorative elements */}
			<div className="floating-elements">
				<div className="floating-element floating floating-delay-1">💙</div>
				<div className="floating-element floating-gentle floating-delay-2">
					💛
				</div>
				<div className="floating-element floating floating-delay-3">🇺🇦</div>
			</div>

			<div className="hero-container">
				<div className="hero-content">
					<div className={`hero-text ${isPageLoaded ? "hero-enter" : ""}`}>
						<h1
							className={`hero-title gradient-text ${
								isVisible ? "animate-fade-up visible" : "animate-fade-up"
							}`}
						>
							{t("hero-section-title")}
						</h1>
						<p
							className={`hero-description ${
								isVisible
									? "animate-fade-up visible stagger-1"
									: "animate-fade-up stagger-1"
							}`}
						>
							{t("hero-section-description")}
						</p>
						<button
							className={`donate-button btn-animated btn-pulse ${
								isVisible
									? "animate-scale-in visible stagger-2"
									: "animate-scale-in stagger-2"
							}`}
							onClick={handleDonateClick}
						>
							{t("hero-section-donate-button")}
						</button>
					</div>
					<div className={`hero-image ${isPageLoaded ? "content-enter" : ""}`}>
						<div
							className={`image-container hover-lift tilt-3d ${
								isVisible
									? "animate-fade-right visible stagger-1"
									: "animate-fade-right stagger-1"
							}`}
						>
							<img
								src="/img/ukrainian-hero.png"
								alt="Ukrainian veteran with flag"
								onError={e => {
									// Fallback to existing image if new one doesn't exist
									e.currentTarget.src = "/img/ukrainian-hero.png"
								}}
							/>
							{/* Glass morphism overlay */}
							<div className="glass-effect image-overlay"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
