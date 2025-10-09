import { useTranslation } from "react-i18next"
import { DONATE_PAGE } from "../../lib/constants"
import { usePageLoadAnimation, useParallax } from "../../lib/useAnimations"
import "../../styles/home/heroSection.css"
import "../../styles/optimizedImage.css"
import OptimizedImage from "../OptimizedImage"

function HeroSection() {
	const { t } = useTranslation()

	// Animation hooks
	const { elementRef: parallaxRef, offset } = useParallax(0.3)
	const isPageLoaded = usePageLoadAnimation(100)

	const handleDonateClick = () => {
		// Navigate to donation page or scroll to donation section
		window.location.href = DONATE_PAGE
	}

	return (
		<section className="hero-section parallax-container" id="hero-section">
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

			{/* Background scattered images - Sequential alternating left-right animation */}
			<div className="background-images">
				{/* Image 1 - Top Left - Medium Rounded Square */}
				<div
					className={`background-image-container image-medium image-rounded ${
						isPageLoaded
							? "animate-fade-left visible stagger-1"
							: "animate-fade-left stagger-1"
					}`}
					style={{ top: "10%", left: "20%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background1.png"
							alt="Ukrainian hero 1"
							priority={true}
							width={220}
							height={220}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 5 - Top Right - Small Rounded Square */}
				<div
					className={`background-image-container image-small image-rounded ${
						isPageLoaded
							? "animate-fade-right visible stagger-2"
							: "animate-fade-right stagger-2"
					}`}
					style={{ top: "15%", right: "20%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background5.png"
							alt="Ukrainian hero 5"
							priority={true}
							width={140}
							height={140}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 2 - Mid Left - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isPageLoaded
							? "animate-fade-left visible stagger-3"
							: "animate-fade-left stagger-3"
					}`}
					style={{ top: "25%", left: "2%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background2.png"
							alt="Ukrainian hero 2"
							width={180}
							height={180}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 6 - Mid Right - Large Rounded Square */}
				<div
					className={`background-image-container image-large image-rounded ${
						isPageLoaded
							? "animate-fade-right visible stagger-4"
							: "animate-fade-right stagger-4"
					}`}
					style={{ top: "30%", right: "2%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background6.png"
							alt="Ukrainian hero 6"
							width={220}
							height={220}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 4 - Bottom Mid Left - Large Rounded Square */}
				<div
					className={`background-image-container image-large image-rounded ${
						isPageLoaded
							? "animate-fade-left visible stagger-5"
							: "animate-fade-left stagger-5"
					}`}
					style={{ top: "45%", left: "15%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background4.png"
							alt="Ukrainian hero 4"
							width={220}
							height={220}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 7 - Mid Right - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isPageLoaded
							? "animate-fade-right visible stagger-6"
							: "animate-fade-right stagger-6"
					}`}
					style={{ top: "50%", right: "16%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background7.png"
							alt="Ukrainian hero 7"
							width={180}
							height={180}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 3 - Bottom Left - Small Circle */}
				<div
					className={`background-image-container image-small image-circle ${
						isPageLoaded
							? "animate-fade-left visible hero-stagger-7"
							: "animate-fade-left hero-stagger-7"
					}`}
					style={{ top: "60%", left: "8%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background3.png"
							alt="Ukrainian hero 3"
							width={140}
							height={140}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 8 - Bottom Right - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isPageLoaded
							? "animate-fade-right visible hero-stagger-8"
							: "animate-fade-right hero-stagger-8"
					}`}
					style={{ top: "68%", right: "8%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background8.png"
							alt="Ukrainian hero 8"
							width={180}
							height={180}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 9 - Top Center - Large Circle */}
				<div
					className={`background-image-container image-large image-circle ${
						isPageLoaded
							? "animate-fade-left visible hero-stagger-9"
							: "animate-fade-left hero-stagger-9"
					}`}
					style={{ top: "10%", right: "45%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background9.png"
							alt="Ukrainian hero 9"
							width={220}
							height={220}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 10 - Bottom Center - Medium Circle */}
				<div
					className={`background-image-container image-medium image-circle ${
						isPageLoaded
							? "animate-fade-right visible hero-stagger-10"
							: "animate-fade-right hero-stagger-10"
					}`}
					style={{ bottom: "10%", right: "55%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background10.png"
							alt="Ukrainian hero 10"
							width={180}
							height={180}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>

				{/* Image 11 - Bottom Right - Small Circle */}
				<div
					className={`background-image-container image-small image-circle ${
						isPageLoaded
							? "animate-fade-right visible hero-stagger-11"
							: "animate-fade-right hero-stagger-11"
					}`}
					style={{ bottom: "10%", right: "30%" }}
				>
					<div className="white-background"></div>
					<div className="background-image hover-lift tilt-3d">
						<OptimizedImage
							src="/img/home-background11.png"
							alt="Ukrainian hero 11"
							width={140}
							height={140}
						/>
						<div className="glass-effect image-overlay"></div>
					</div>
				</div>
			</div>

			<div className="hero-container">
				<div className="hero-content">
					{/* Central content */}
					<div className="hero-text">
						<h1
							className={`hero-title gradient-text ${
								isPageLoaded ? "animate-fade-up visible" : "animate-fade-up"
							}`}
						>
							{t("hero-section-title")}
						</h1>
						<p
							className={`hero-description ${
								isPageLoaded
									? "animate-fade-up visible stagger-1"
									: "animate-fade-up stagger-1"
							}`}
						>
							{t("hero-section-description")}
						</p>
						<button
							className={`donate-button btn-animated btn-pulse ${
								isPageLoaded
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
