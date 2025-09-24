import React from "react"
import { useTranslation } from "react-i18next"
import { DONATE_PAGE } from "../../lib/constants"
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
		window.location.href = DONATE_PAGE
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

			{/* Background scattered images */}
			<div className="background-images">
				{/* Image 1 - Top Left - Medium Rounded Square */}
				<div
					className={`background-image-container image-medium image-rounded ${
						isVisible
							? "animate-fade-left visible stagger-1"
							: "animate-fade-left stagger-1"
					}`}
					style={{ top: "10%", left: "20%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background1.png"
							alt="Ukrainian hero 1"
							onError={e => {
								e.currentTarget.src = "/img/ukrainian-hero.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 2 - Mid Left - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isVisible
							? "animate-fade-left visible stagger-2"
							: "animate-fade-left stagger-2"
					}`}
					style={{ top: "25%", left: "2%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background2.png"
							alt="Ukrainian hero 2"
							onError={e => {
								e.currentTarget.src = "/img/home-background2.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 3 - Bottom Left - Small Circle */}
				<div
					className={`background-image-container image-small image-circle ${
						isVisible
							? "animate-fade-left visible stagger-3"
							: "animate-fade-left stagger-3"
					}`}
					style={{ top: "60%", left: "8%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background3.png"
							alt="Ukrainian hero 3"
							onError={e => {
								e.currentTarget.src = "/img/home-background3.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 4 - Bottom Mid Left - Large Rounded Square */}
				<div
					className={`background-image-container image-large image-rounded ${
						isVisible
							? "animate-fade-left visible stagger-4"
							: "animate-fade-left stagger-4"
					}`}
					style={{ top: "45%", left: "15%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background4.png"
							alt="Ukrainian hero 4"
							onError={e => {
								e.currentTarget.src = "/img/home-background4.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 5 - Top Right - Small Rounded Square */}
				<div
					className={`background-image-container image-small image-rounded ${
						isVisible
							? "animate-fade-right visible stagger-1"
							: "animate-fade-right stagger-1"
					}`}
					style={{ top: "15%", right: "20%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background5.png"
							alt="Ukrainian hero 5"
							onError={e => {
								e.currentTarget.src = "/img/home-background5.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 6 - Mid Right - Large Rounded Square */}
				<div
					className={`background-image-container image-large image-rounded ${
						isVisible
							? "animate-fade-right visible stagger-2"
							: "animate-fade-right stagger-2"
					}`}
					style={{ top: "30%", right: "2%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background6.png"
							alt="Ukrainian hero 6"
							onError={e => {
								e.currentTarget.src = "/img/home-background6.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 7 - Mid Right - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isVisible
							? "animate-fade-right visible stagger-3"
							: "animate-fade-right stagger-3"
					}`}
					style={{ top: "50%", right: "16%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background7.png"
							alt="Ukrainian hero 7"
							onError={e => {
								e.currentTarget.src = "/img/home-background7.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 8 - Bottom Right - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isVisible
							? "animate-fade-right visible stagger-4"
							: "animate-fade-right stagger-4"
					}`}
					style={{ top: "68%", right: "8%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background8.png"
							alt="Ukrainian hero 8"
							onError={e => {
								e.currentTarget.src = "/img/home-background8.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 9 - Bottom Right - Medium Rounded Square */}
				<div
					className={`background-image-container image-large image-circle ${
						isVisible
							? "animate-fade-right visible stagger-3"
							: "animate-fade-right stagger-3"
					}`}
					style={{ top: "10%", right: "45%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background9.png"
							alt="Ukrainian hero 9"
							onError={e => {
								e.currentTarget.src = "/img/home-background9.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 10 - Bottom Right - Medium Rounded Square */}
				<div
					className={`background-image-container image-medium image-circle ${
						isVisible
							? "animate-fade-right visible stagger-3"
							: "animate-fade-right stagger-3"
					}`}
					style={{ bottom: "10%", right: "55%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background10.png"
							alt="Ukrainian hero 10"
							onError={e => {
								e.currentTarget.src = "/img/home-background10.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 11 - Bottom Right - Small Circle */}
				<div
					className={`background-image-container image-small image-circle ${
						isVisible
							? "animate-fade-right visible stagger-3"
							: "animate-fade-right stagger-3"
					}`}
					style={{ bottom: "10%", right: "30%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<img
							src="/img/home-background11.png"
							alt="Ukrainian hero 11"
							onError={e => {
								e.currentTarget.src = "/img/home-background11.png"
							}}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>
			</div>

			<div className="hero-container">
				<div className="hero-content">
					{/* Central content */}
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
				</div>
			</div>
		</section>
	)
}

export default HeroSection
