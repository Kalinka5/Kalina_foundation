import React from "react"
import "../../styles/home/heroSection.css"

function HeroSection() {
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
							<p className="tagline">
								🇺🇦 Together, We Stand for Ukraine's Freedom! 🇺🇦
							</p>
						</div>

						<div className="content-grid">
							<div className="content-row">
								<div className="text-section">
									<div className="section-icon">🏛️</div>
									<h2>What is Kalina Foundation</h2>
									<p>
										<strong>More than just a website</strong> — we're a{" "}
										<em>mission-driven platform</em> dedicated to supporting
										Ukraine's brave defenders in their fight for freedom.
									</p>
									<p>
										Our global community enables people worldwide to join hands
										and provide the{" "}
										<span className="highlight">critical resources</span> our
										heroes need to{" "}
										<strong>win this war as soon as possible.</strong>
									</p>
								</div>

								<div className="text-section">
									<div className="section-icon">⚡</div>
									<h2>Every Donation Counts. Every Second Matters</h2>
									<p>
										<strong>Time is of the essence.</strong> Together, we can
										bring victory closer. Your contributions don't just fund
										equipment — they deliver:
									</p>
									<div className="impact-items">
										<span className="impact-item">💙 Hope</span>
										<span className="impact-item">🛡️ Security</span>
										<span className="impact-item">🕊️ Peace</span>
									</div>
									<p>
										to <span className="highlight">millions of Ukrainians</span>{" "}
										who depend on our support.
									</p>
								</div>
							</div>

							<div className="content-row">
								<div className="text-section">
									<div className="section-icon">🎯</div>
									<h2>Critical Equipment Needed</h2>
									<p>
										<strong>Our brave defenders</strong> rely on your generosity
										to secure{" "}
										<span className="highlight">
											vital battlefield equipment:
										</span>
									</p>
									<ul className="equipment-list">
										<li>
											<strong>🚛 Transport</strong> — Mobilize troops and
											essential supplies
										</li>
										<li>
											<strong>🛸 Drones & UAVs</strong> — Unmatched
											reconnaissance and defense
										</li>
										<li>
											<strong>📡 Communication</strong> — Coordinate missions
											effectively
										</li>
										<li>
											<strong>🔍 Optical Tools</strong> — Precision and safety
											on the battlefield
										</li>
									</ul>
								</div>

								<div className="text-section">
									<div className="section-icon">💳</div>
									<h2>How You Can Help Today</h2>
									<p>
										<strong>Multiple secure ways</strong> to make your
										contribution count. Choose the method that works best for
										you:
									</p>
									<ul className="payment-list">
										<li>
											<strong>💰 PayPal</strong> — Global contributions made
											simple
										</li>
										<li>
											<strong>🏦 PrivatBank</strong> — Trusted, quick & reliable
											transfers
										</li>
										<li>
											<strong>📱 MonoBank</strong> — Ukraine's popular digital
											banking
										</li>
										<li>
											<strong>🪙 Crypto Wallets</strong> — Fast & secure via
											Metamask
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="cta-section">
							<h2>🇺🇦 Stand with Ukraine Today! 🇺🇦</h2>
							<p>
								Join our <strong>global network of supporters</strong> and make
								a real difference. Together, we'll ensure a brighter, free
								future for Ukraine.
							</p>
							<p className="cta-subtitle">
								<strong>Donate Now. Support the Heroes. Win the War.</strong>
							</p>
							<button className="cta-button">🚀 Make a Difference</button>
						</div>

						<div className="scroll-indicator">
							<div className="arrow-down">
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
