import React from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/heroSection.css"

function HeroSection() {
	const { t } = useTranslation()

	const handleDonateClick = () => {
		// Navigate to donation page or scroll to donation section
		window.location.href = "/payment"
	}

	return (
		<section className="hero-section" id="hero-section">
			<div className="hero-container">
				<div className="hero-content">
					<div className="hero-text">
						<h1 className="hero-title">{t("hero-section-title")}</h1>
						<p className="hero-description">{t("hero-section-description")}</p>
						<button className="donate-button" onClick={handleDonateClick}>
							{t("hero-section-donate-button")}
						</button>
					</div>
					<div className="hero-image">
						<img
							src="/img/ukrainian-hero.png"
							alt="Ukrainian veteran with flag"
							onError={e => {
								// Fallback to existing image if new one doesn't exist
								e.currentTarget.src = "/img/ukrainian-hero.png"
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
