import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/donationImpact.css"

function DonationImpact() {
	const { t } = useTranslation()
	const [donationAmount, setDonationAmount] = useState("")

	const donationCategories = [
		{
			id: 1,
			icon: "🏥",
			title: t("donation-impact-medical-title"),
			description: t("donation-impact-medical-description"),
			percentage: 30,
		},
		{
			id: 2,
			icon: "👨‍👩‍👧‍👦",
			title: t("donation-impact-family-title"),
			description: t("donation-impact-family-description"),
			percentage: 20,
		},
		{
			id: 3,
			icon: "🏠",
			title: t("donation-impact-reintegration-title"),
			description: t("donation-impact-reintegration-description"),
			percentage: 20,
		},
		{
			id: 4,
			icon: "🚨",
			title: t("donation-impact-emergency-title"),
			description: t("donation-impact-emergency-description"),
			percentage: 10,
		},
	]

	const handleDonationSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Navigate to payment page with amount
		window.location.href = `/payment?amount=${donationAmount}`
	}

	return (
		<section className="donation-impact" id="donation-impact">
			{/* Hero Section */}
			<div className="impact-hero">
				<div className="impact-hero-container">
					<h2 className="impact-hero-title">
						{t("donation-impact-hero-title")}
					</h2>
					<p className="impact-hero-description">
						{t("donation-impact-hero-description")}
					</p>
					<button className="impact-hero-button">
						{t("donation-impact-hero-button")}
					</button>
				</div>
			</div>

			{/* Choose Your Impact */}
			<div className="choose-impact">
				<div className="choose-impact-container">
					<h3 className="choose-impact-title">
						{t("donation-impact-choose-title")}
					</h3>
					<p className="choose-impact-subtitle">
						{t("donation-impact-choose-subtitle")}
					</p>

					<form onSubmit={handleDonationSubmit} className="donation-form">
						<div className="amount-input">
							<span className="currency-symbol">$</span>
							<input
								type="number"
								value={donationAmount}
								onChange={e => setDonationAmount(e.target.value)}
								placeholder={t("donation-impact-amount-placeholder")}
								className="amount-field"
								min="1"
							/>
						</div>
						<button type="submit" className="process-donation-btn">
							{t("donation-impact-process-button")}
						</button>
					</form>
				</div>
			</div>

			{/* Where Your Donations Go */}
			<div className="donation-breakdown">
				<div className="breakdown-container">
					<h3 className="breakdown-title">
						{t("donation-impact-breakdown-title")}
					</h3>
					<p className="breakdown-subtitle">
						{t("donation-impact-breakdown-subtitle")}
					</p>

					<div className="categories-grid">
						{donationCategories.map(category => (
							<div key={category.id} className="category-card">
								<div className="category-icon">{category.icon}</div>
								<h4 className="category-title">{category.title}</h4>
								<p className="category-description">{category.description}</p>
								<div className="category-percentage">
									<div className="percentage-bar">
										<div
											className="percentage-fill"
											style={{ width: `${category.percentage}%` }}
										></div>
									</div>
									<span className="percentage-text">
										{category.percentage}%
									</span>
								</div>
							</div>
						))}
					</div>

					{/* Operational Costs */}
					<div className="operational-costs">
						<div className="operational-icon">⚙️</div>
						<h4 className="operational-title">
							{t("donation-impact-operational-title")}
						</h4>
						<p className="operational-description">
							{t("donation-impact-operational-description")}
						</p>
						<div className="operational-percentage">
							<div className="percentage-bar">
								<div
									className="percentage-fill operational-fill"
									style={{ width: "16%" }}
								></div>
							</div>
							<span className="percentage-text">16%</span>
						</div>
					</div>

					<div className="transparency-note">
						<p>{t("donation-impact-transparency-note")}</p>
						<button className="view-reports-btn">
							{t("donation-impact-view-reports")}
						</button>
					</div>
				</div>
			</div>

			{/* Testimonial */}
			<div className="testimonial-section">
				<div className="testimonial-container">
					<blockquote className="testimonial-quote">
						"{t("donation-impact-testimonial-quote")}"
					</blockquote>
					<cite className="testimonial-author">
						{t("donation-impact-testimonial-author")}
					</cite>
				</div>
			</div>
		</section>
	)
}

export default DonationImpact
