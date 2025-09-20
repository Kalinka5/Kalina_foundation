import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useLimitedItems, useTotalDonated } from "../../lib/hooks.tsx"
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "../../lib/useAnimations.tsx"
import "../../styles/home/donationImpact.css"

function DonationImpact() {
	const { t } = useTranslation()
	const [donationAmount, setDonationAmount] = useState("")

	// Animation hooks
	const { elementRef: heroRef, isVisible: heroVisible } =
		useScrollAnimation<HTMLDivElement>({
			threshold: 0.3,
			triggerOnce: true,
		})
	const { elementRef: formRef, isVisible: formVisible } =
		useScrollAnimation<HTMLDivElement>({
			threshold: 0.4,
			triggerOnce: true,
		})
	const { containerRef: gridRef, visibleItems } =
		useStaggeredAnimation<HTMLDivElement>(4, {
			stagger: 200,
			threshold: 0.2,
		})

	// Get 4 items from backend for donation impact display
	const { data: items, isLoading: itemsLoading } = useLimitedItems(4)
	const { data: totalDonatedData, isLoading: totalLoading } = useTotalDonated()

	// Transform items into donation categories format
	const donationCategories =
		items?.map(item => ({
			id: item.id,
			title: item.title,
			description: item.description,
			percentage:
				item.full_price > 0
					? Math.round((item.collected / item.full_price) * 100)
					: 0,
			image: item.image,
			collected: item.collected,
			full_price: item.full_price,
		})) || []

	const handleDonationSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Navigate to payment page with amount
		window.location.href = `/payment?amount=${donationAmount}`
	}

	return (
		<section className="donation-impact" id="donation-impact">
			{/* Hero Section */}
			<div
				ref={heroRef}
				className={`impact-hero ${heroVisible ? "visible" : ""}`}
			>
				<div className="impact-hero-container">
					<h2
						className={`impact-hero-title yellow-text ${
							heroVisible ? "animate-fade-up visible" : "animate-fade-up"
						}`}
					>
						{t("donation-impact-hero-title")}
					</h2>
					<p
						className={`impact-hero-description ${
							heroVisible
								? "animate-fade-up visible stagger-1"
								: "animate-fade-up stagger-1"
						}`}
					>
						{t("donation-impact-hero-description")}
					</p>
					<button
						className={`impact-hero-button btn-animated btn-pulse ${
							heroVisible
								? "animate-scale-in visible stagger-2"
								: "animate-scale-in stagger-2"
						}`}
					>
						{t("donation-impact-hero-button")}
					</button>
				</div>
			</div>

			{/* Choose Your Impact */}
			<div
				ref={formRef}
				className={`choose-impact ${formVisible ? "visible" : ""}`}
			>
				<div className="choose-impact-container">
					<h3
						className={`choose-impact-title ${
							formVisible ? "animate-fade-up visible" : "animate-fade-up"
						}`}
					>
						{t("donation-impact-choose-title")}
					</h3>
					<p
						className={`choose-impact-subtitle ${
							formVisible
								? "animate-fade-up visible stagger-1"
								: "animate-fade-up stagger-1"
						}`}
					>
						{t("donation-impact-choose-subtitle")}
					</p>

					<form
						onSubmit={handleDonationSubmit}
						className={`donation-form glass-effect ${
							formVisible
								? "animate-scale-in visible stagger-2"
								: "animate-scale-in stagger-2"
						}`}
					>
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
						<button
							type="submit"
							className="process-donation-btn btn-animated btn-ripple"
						>
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

					<div ref={gridRef} className="categories-grid">
						{itemsLoading ? (
							<div className="loading shimmer">Loading items...</div>
						) : (
							donationCategories.map((category, index) => (
								<div
									key={category.id}
									className={`category-card hover-lift tilt-3d ${
										visibleItems[index]
											? "animate-scale-in visible"
											: "animate-scale-in"
									}`}
									style={{ backgroundImage: `url(${category.image})` }}
								>
									<div className="category-overlay glass-effect">
										<h4 className="category-title">
											{t(`${category.title}-title`)}
										</h4>
										<p className="category-description">
											{t(`${category.title}-description`)}
										</p>
										<div className="category-stats">
											<div className="stats-text">
												<span className="collected white-text">
													${category.collected.toLocaleString()}
												</span>
												<span className="goal">
													{t("donation-impact-of")} $
													{category.full_price.toLocaleString()}{" "}
													{t("donation-impact-goal")}
												</span>
											</div>
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
									</div>
								</div>
							))
						)}
					</div>

					{/* Total Donated */}
					<div className="total-donated-section">
						<div className="total-donated-icon">💵</div>
						<h4 className="total-donated-title">
							{t("donation-impact-total-donated-title")}
						</h4>
						<p className="total-donated-description">
							{t("donation-impact-total-donated-description")}
						</p>
						{totalLoading ? (
							<div className="loading">Loading...</div>
						) : (
							<div className="total-donated-amount">
								<span className="total-amount">
									${totalDonatedData?.total_donated?.toLocaleString() || 0}
								</span>
							</div>
						)}
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
