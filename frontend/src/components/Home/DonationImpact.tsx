import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { DONATE_PAGE } from "../../lib/constants"
import { useLimitedItems, useTotalDonated } from "../../lib/hooks"
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "../../lib/useAnimations"
import "../../styles/home/donationImpact.css"

function DonationImpact() {
	const { t } = useTranslation()
	const [donationAmount, setDonationAmount] = useState("")
	const [currentPage, setCurrentPage] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const timerRef = useRef<number | null>(null)
	const itemsPerPage = 4
	const autoAdvanceDelay = 10000 // 10 seconds

	// Animation hooks
	const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({
		threshold: 0.3,
		triggerOnce: true,
	})
	const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation({
		threshold: 0.4,
		triggerOnce: true,
	})
	const { containerRef: gridRef, visibleItems } = useStaggeredAnimation(4, {
		stagger: 200,
		threshold: 0.2,
	})

	// Get 16 items from backend for donation impact display
	const { data: items, isLoading: itemsLoading } = useLimitedItems(16)
	const { data: totalDonatedData, isLoading: totalLoading } = useTotalDonated()

	// Transform items into donation categories format
	const allDonationCategories =
		items?.map(item => ({
			id: item.id,
			title: item.title,
			percentage:
				item.full_price > 0
					? Math.round((item.collected / item.full_price) * 100)
					: 0,
			image: item.image,
			collected: item.collected,
			full_price: item.full_price,
		})) || []

	// Calculate pagination
	const totalPages = Math.ceil(allDonationCategories.length / itemsPerPage)
	const startIndex = currentPage * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const donationCategories = allDonationCategories.slice(startIndex, endIndex)

	// Navigation functions
	const nextPage = () => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentPage(prev => (prev + 1) % totalPages)
		resetTimer()
		setTimeout(() => setIsTransitioning(false), 250) // Faster transition
	}

	const prevPage = () => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
		resetTimer()
		setTimeout(() => setIsTransitioning(false), 250) // Faster transition
	}

	// Timer functions
	const startTimer = () => {
		if (timerRef.current) window.clearInterval(timerRef.current)
		timerRef.current = window.setInterval(() => {
			if (!isTransitioning && totalPages > 1) {
				setIsTransitioning(true)
				setCurrentPage(prev => (prev + 1) % totalPages)
				setTimeout(() => setIsTransitioning(false), 250) // Faster transition
			}
		}, autoAdvanceDelay)
	}

	const resetTimer = () => {
		if (timerRef.current) window.clearInterval(timerRef.current)
		startTimer()
	}

	// Effect for auto-advance timer
	useEffect(() => {
		if (totalPages > 1) {
			startTimer()
		}
		return () => {
			if (timerRef.current) window.clearInterval(timerRef.current)
		}
	}, [totalPages])

	const handleDonationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// Navigate to donation page with amount
		window.location.href = `${DONATE_PAGE}?amount=${donationAmount}`
	}

	const handleDonateClick = () => {
		// Navigate to donation page or scroll to donation section
		window.location.href = DONATE_PAGE
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
						onClick={handleDonateClick}
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

					{/* Navigation and Grid Container */}
					<div className="categories-container">
						{/* Navigation Buttons */}
						{totalPages > 1 && (
							<>
								<button
									className={`nav-button nav-button-prev ${
										isTransitioning ? "disabled" : ""
									}`}
									onClick={prevPage}
									disabled={isTransitioning}
									aria-label="Previous items"
								>
									<svg
										width="24"
										height="24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path d="M15 18l-6-6 6-6" />
									</svg>
								</button>
								<button
									className={`nav-button nav-button-next ${
										isTransitioning ? "disabled" : ""
									}`}
									onClick={nextPage}
									disabled={isTransitioning}
									aria-label="Next items"
								>
									<svg
										width="24"
										height="24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path d="M9 18l6-6-6-6" />
									</svg>
								</button>
							</>
						)}

						{/* Categories Grid */}
						<div
							ref={gridRef}
							className={`categories-grid ${
								isTransitioning ? "transitioning" : ""
							}`}
						>
							{itemsLoading ? (
								<div className="loading shimmer">Loading items...</div>
							) : (
								donationCategories.map((category, index) => (
									<div
										key={`${category.id}-${currentPage}`}
										className={`category-card hover-lift tilt-3d ${
											visibleItems[index] && !isTransitioning
												? "animate-scale-in visible"
												: "animate-scale-in"
										}`}
										style={{ backgroundImage: `url(${category.image})` }}
									>
										<div className="category-overlay glass-effect">
											<h4 className="category-title">
												{t(`${category.title}-title`)}
											</h4>
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

						{/* Page Indicators */}
						{totalPages > 1 && (
							<div className="page-indicators">
								{Array.from({ length: totalPages }, (_, index) => (
									<button
										key={index}
										className={`page-indicator ${
											index === currentPage ? "active" : ""
										}`}
										onClick={() => {
											if (!isTransitioning && index !== currentPage) {
												setIsTransitioning(true)
												setCurrentPage(index)
												resetTimer()
												setTimeout(() => setIsTransitioning(false), 250) // Faster transition
											}
										}}
										disabled={isTransitioning}
										aria-label={`Go to page ${index + 1}`}
									/>
								))}
							</div>
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
