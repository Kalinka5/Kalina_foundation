import React, { useState } from "react"
import { useItems } from "../../lib/hooks.tsx"
import "../../styles/home/donationDrives.css"

function DonationDrives() {
	const [currentPage, setCurrentPage] = useState(1)
	const items = useItems(currentPage)

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
					<h2>DONATION DRIVES</h2>
					<div className="drives-grid">
						<div className="drive-card">
							<div className="drive-content">
								<div className="drive-info">
									<p>Loading...</p>
								</div>
							</div>
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
					<h2>DONATION DRIVES</h2>
					<div className="drives-grid">
						<div className="drive-card">
							<div className="drive-content">
								<div className="drive-info">
									<p>Error loading donation drives</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="donation-drives" id="donation-drives">
			<div className="container">
				<h2>DONATION DRIVES</h2>
				<div className="drives-slider">
					<button className="slider-btn prev-btn" onClick={handlePrevious}>
						&#8249;
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
													{progress}% Complete
												</span>
											</div>
											<div className="drive-amounts">
												<span className="collected">
													${item.collected.toLocaleString()}
												</span>
												<span className="goal">
													of ${item.full_price.toLocaleString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
					<button className="slider-btn next-btn" onClick={handleNext}>
						&#8250;
					</button>
				</div>
			</div>
		</section>
	)
}

export default DonationDrives
