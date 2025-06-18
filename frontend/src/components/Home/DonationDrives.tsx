import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useItems } from "../../lib/hooks.tsx"
import "../../styles/home/donationDrives.css"

function DonationDrives() {
	const [currentPage, setCurrentPage] = useState(1)
	const items = useItems(currentPage)
	const { t } = useTranslation()

	const handlePrevious = () => {
		setCurrentPage(prev => (prev > 1 ? prev - 1 : 6))
	}

	const handleNext = () => {
		setCurrentPage(prev => (prev < 6 ? prev + 1 : 1))
	}

	const calculateProgress = (collected: number, fullPrice: number) => {
		return fullPrice > 0 ? Math.round((collected / fullPrice) * 100) : 0
	}

	if (items.isLoading) {
		return (
			<section className="donation-drives" id="donation-drives">
				<div className="container">
					<div className="drives-section">
						<h2>{t("donation-drives").toUpperCase()}</h2>
						<div className="drives-slider">
							<button className="slider-btn prev-btn">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="currentColor"
								>
									<path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
								</svg>
							</button>
							<div className="drives-grid">
								<div className="drive-card">
									<div className="drive-content">
										<div className="drive-info">
											<p>{t("loading")}</p>
										</div>
									</div>
								</div>
							</div>
							<button className="slider-btn next-btn">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="currentColor"
								>
									<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>
		)
	}

	if (items.error) {
		return (
			<section className="donation-drives" id="donation-drives">
				<div className="container">
					<div className="drives-section">
						<h2>{t("donation-drives").toUpperCase()}</h2>
						<div className="drives-slider">
							<button className="slider-btn prev-btn">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="currentColor"
								>
									<path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
								</svg>
							</button>
							<div className="drives-grid">
								<div className="drive-card">
									<div className="drive-content">
										<div className="drive-info">
											<p>{t("error-loading-drives")}</p>
										</div>
									</div>
								</div>
							</div>
							<button className="slider-btn next-btn">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="currentColor"
								>
									<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="donation-drives" id="donation-drives">
			<div className="container">
				<div className="drives-section">
					<h2>{t("donation-drives").toUpperCase()}</h2>
					<div className="drives-slider">
						<button className="slider-btn prev-btn" onClick={handlePrevious}>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="currentColor"
							>
								<path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
							</svg>
						</button>
						<div className="drives-grid">
							{items.data?.map(item => {
								const progress = calculateProgress(
									item.collected,
									item.full_price
								)
								return (
									<div key={item.id} className="drive-card">
										<div className="drive-image">
											<img src={item.image} alt={item.title} />
										</div>
										<div className="drive-content">
											<div className="drive-info">
												<h3>{item.title}</h3>
												<p className="drive-description">{item.description}</p>
												<div className="progress-container">
													<div className="progress-bar">
														<div
															className="progress-fill"
															style={{ width: `${progress}%` }}
														></div>
													</div>
													<span className="progress-text">
														{progress}
														{t("percent-complete")}
													</span>
												</div>
												<div className="drive-amounts">
													<span className="collected">
														${item.collected.toLocaleString()}
													</span>
													<span className="goal">
														{t("of")} ${item.full_price.toLocaleString()}
													</span>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
						<button className="slider-btn next-btn" onClick={handleNext}>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="currentColor"
							>
								<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DonationDrives
