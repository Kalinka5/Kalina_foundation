import React from "react"
import "../../styles/home/donationDrives.css"

function DonationDrives() {
	return (
		<section className="donation-drives">
			<div className="container">
				<h2>DONATION DRIVES</h2>
				<div className="drives-grid">
					<div className="drive-card">
						<div className="drive-content">
							<div className="drive-info">
								<h3>Register Now</h3>
								<div className="progress-container">
									<div className="progress-bar">
										<div
											className="progress-fill"
											style={{ width: "65%" }}
										></div>
									</div>
									<span className="progress-text">65% Complete</span>
								</div>
							</div>
						</div>
					</div>
					<div className="drive-card">
						<div className="drive-image">
							<img src="/img/carousel-img4.jpg" alt="Donation drive" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DonationDrives
