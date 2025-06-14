import React from "react"
import { useTranslation } from "react-i18next"
import {
	FaArrowRight,
	FaClock,
	FaExclamationTriangle,
	FaFire,
	FaShieldAlt,
} from "react-icons/fa"
import { useItems } from "../../../lib/hooks.tsx"
import "../../../styles/home/urgentNeeds/urgentNeeds.css"

function UrgentNeeds() {
	const { t } = useTranslation()
	const items = useItems(1) // Get first page items

	// Get most urgent items (those with lowest completion percentage)
	const urgentItems = items.data
		? items.data
				.map(item => ({
					...item,
					completionPercent: (item.collected / item.full_price) * 100,
				}))
				.filter(item => item.completionPercent < 85) // Items less than 85% funded
				.sort((a, b) => a.completionPercent - b.completionPercent)
				.slice(0, 3)
		: []

	const getPriorityLevel = (index: number) => {
		switch (index) {
			case 0:
				return { level: "CRITICAL", icon: <FaFire />, class: "critical" }
			case 1:
				return { level: "HIGH", icon: <FaExclamationTriangle />, class: "high" }
			case 2:
				return { level: "URGENT", icon: <FaClock />, class: "urgent" }
			default:
				return { level: "URGENT", icon: <FaClock />, class: "urgent" }
		}
	}

	if (items.isLoading) {
		return (
			<section
				className="urgent-needs section-header-mg"
				id="urgent-needs-section"
			>
				<div className="container">
					<div className="urgent-header">
						<FaExclamationTriangle className="urgent-icon pulse" />
						<h2 className="urgent-title">Critical Equipment Needs</h2>
						<p className="urgent-subtitle">
							Loading urgent military equipment requirements...
						</p>
					</div>
					<div className="urgent-loading">
						<div className="loading-spinner"></div>
						<p>Fetching critical needs...</p>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section
			className="urgent-needs section-header-mg"
			id="urgent-needs-section"
		>
			<div className="container">
				<div className="urgent-header">
					<div className="urgent-icon-wrapper">
						<FaExclamationTriangle className="urgent-icon pulse" />
						<div className="urgent-pulse-ring"></div>
					</div>
					<h2 className="urgent-title">
						Critical Equipment Needs
						<span className="live-indicator">
							<span className="live-dot"></span>
							LIVE
						</span>
					</h2>
					<p className="urgent-subtitle">
						These military assets need immediate funding to reach our heroes on
						the front lines
					</p>
				</div>

				<div className="urgent-grid">
					{urgentItems.map((item, index) => {
						const priority = getPriorityLevel(index)
						return (
							<div
								key={item.id}
								className={`urgent-card priority-${index + 1}`}
							>
								<div className={`urgent-badge ${priority.class}`}>
									{priority.icon}
									<span>{priority.level}</span>
								</div>

								<div className="urgent-content">
									<div className="urgent-image-container">
										<img
											src={item.image}
											alt={item.title}
											className="urgent-image"
										/>
										<div className="image-overlay">
											<div className="priority-indicator">{priority.icon}</div>
										</div>
									</div>

									<div className="urgent-info">
										<div className="urgent-header-info">
											<h3 className="urgent-item-title">{item.title}</h3>
											<div className="completion-badge">
												{Math.round(item.completionPercent)}% funded
											</div>
										</div>

										<p className="urgent-description">{item.description}</p>

										<div className="urgent-progress">
											<div className="progress-header">
												<span className="progress-label">Funding Progress</span>
												<span className="progress-percentage">
													{Math.round(item.completionPercent)}%
												</span>
											</div>
											<div className="progress-bar">
												<div
													className="progress-fill"
													style={{ width: `${item.completionPercent}%` }}
												></div>
												<div className="progress-glow"></div>
											</div>
											<div className="progress-text">
												<span className="collected">
													${item.collected.toLocaleString()} raised
												</span>
												<span className="goal">
													of ${item.full_price.toLocaleString()} goal
												</span>
											</div>
										</div>

										<div className="urgent-actions">
											<button className="donate-urgent-btn primary">
												<FaShieldAlt />
												Donate Now
												<FaArrowRight className="btn-arrow" />
											</button>
											<div className="needed-info">
												<span className="needed-amount">
													${(item.full_price - item.collected).toLocaleString()}
												</span>
												<span className="needed-label">still needed</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>

				{urgentItems.length === 0 && !items.isLoading && (
					<div className="no-urgent-items">
						<div className="success-icon-wrapper">
							<FaShieldAlt className="success-icon" />
							<div className="success-ring"></div>
						</div>
						<h3>All Critical Needs Currently Met</h3>
						<p>
							Thanks to generous donors, all urgent equipment needs are being
							fulfilled!
						</p>
						<button className="view-all-btn">
							View All Projects
							<FaArrowRight />
						</button>
					</div>
				)}
			</div>
		</section>
	)
}

export default UrgentNeeds
