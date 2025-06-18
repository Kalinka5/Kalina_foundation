import React from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/heroSection.css"

function HeroSection() {
	const { t } = useTranslation()

	const scrollToDonationDrives = () => {
		const donationDrivesSection = document.getElementById("donation-drives")
		if (donationDrivesSection) {
			donationDrivesSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}
	}

	return (
		<section className="hero-section" id="hero-section">
			<div className="hero-background">
				<div className="hero-content">
					<div className="hero-text">
						<div className="logo-section">
							<h1 className="foundation-title">
								<span className="blue-text">Kalina</span>{" "}
								<span className="yellow-text">Foundation</span>
							</h1>
							<p className="tagline">{t("hero-tagline")}</p>
						</div>

						<div className="content-grid">
							<div className="content-row">
								<div className="text-section">
									<div className="section-icon">🏛️</div>
									<h2>{t("hero-title1")}</h2>
									<p>
										<strong>{t("hero-text1-1")}</strong>
										{t("hero-text1-2")}
										<em>{t("hero-text1-3")}</em>
										{t("hero-text1-4")}
									</p>
									<p>
										{t("hero-text1-5")}
										<span className="highlight">{t("hero-text1-6")}</span>
										{t("hero-text1-7")}
										<strong>{t("hero-text1-8")}</strong>
									</p>
								</div>

								<div className="text-section">
									<div className="section-icon">⚡</div>
									<h2>{t("hero-title2")}</h2>
									<p>
										<strong>{t("hero-text2-1")}</strong>
										{t("hero-text2-2")}
									</p>
									<div className="impact-items">
										<span className="impact-item">
											{t("hero-impact-item1")}
										</span>
										<span className="impact-item">
											{t("hero-impact-item2")}
										</span>
										<span className="impact-item">
											{t("hero-impact-item3")}
										</span>
									</div>
									<p>
										{t("hero-text2-3")}
										<span className="highlight">{t("hero-text2-4")}</span>
										{t("hero-text2-5")}
									</p>
								</div>
							</div>

							<div className="content-row">
								<div className="text-section">
									<div className="section-icon">🎯</div>
									<h2>{t("hero-title3")}</h2>
									<p>
										<strong>{t("hero-text3-1")}</strong>
										{t("hero-text3-2")}
										<span className="highlight">{t("hero-text3-3")}</span>
									</p>
									<ul className="equipment-list">
										<li>
											<strong>{t("hero-equipment-item1")}</strong>
											{t("hero-equipment-item1-text")}
										</li>
										<li>
											<strong>{t("hero-equipment-item2")}</strong>
											{t("hero-equipment-item2-text")}
										</li>
										<li>
											<strong>{t("hero-equipment-item3")}</strong>
											{t("hero-equipment-item3-text")}
										</li>
										<li>
											<strong>{t("hero-equipment-item4")}</strong>
											{t("hero-equipment-item4-text")}
										</li>
									</ul>
								</div>

								<div className="text-section">
									<div className="section-icon">💳</div>
									<h2>{t("hero-title4")}</h2>
									<p>
										<strong>{t("hero-text4-1")}</strong>
										{t("hero-text4-2")}
									</p>
									<ul className="payment-list">
										<li>
											<strong>{t("hero-payment-item1")}</strong>
											{t("hero-payment-item1-text")}
										</li>
										<li>
											<strong>{t("hero-payment-item2")}</strong>
											{t("hero-payment-item2-text")}
										</li>
										<li>
											<strong>{t("hero-payment-item3")}</strong>
											{t("hero-payment-item3-text")}
										</li>
										<li>
											<strong>{t("hero-payment-item4")}</strong>
											{t("hero-payment-item4-text")}
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="cta-section">
							<h2>{t("hero-cta-title")}</h2>
							<p>
								{t("hero-cta-text1")}
								<strong>{t("hero-cta-text2")}</strong>
								{t("hero-cta-text3")}
							</p>
							<p className="cta-subtitle">
								<strong>{t("hero-cta-subtitle1")}</strong>
							</p>
							<button className="cta-button">{t("hero-cta-button")}</button>
						</div>

						<div className="scroll-indicator">
							<div
								className="arrow-down"
								onClick={scrollToDonationDrives}
								style={{ cursor: "pointer" }}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
