import React from "react"
import "../styles/accessibilityStatement.css"

const AccessibilityStatement: React.FC = () => {
	return (
		<div className="accessibility-statement">
			<div className="container">
				<h1>Accessibility Statement</h1>
				<p className="last-updated">
					Last updated: {new Date().toLocaleDateString()}
				</p>

				<section>
					<h2>Our Commitment</h2>
					<p>
						Kalina Foundation is committed to ensuring digital accessibility for
						people with disabilities. We are continually improving the user
						experience for everyone and applying the relevant accessibility
						standards to achieve these goals.
					</p>
				</section>

				<section>
					<h2>Accessibility Standards</h2>
					<p>
						We aim to conform to the Web Content Accessibility Guidelines (WCAG)
						2.1 level AA standards. These guidelines explain how to make web
						content more accessible for people with disabilities and
						user-friendly for everyone.
					</p>
				</section>

				<section>
					<h2>Accessibility Features</h2>
					<p>Our website includes the following accessibility features:</p>
					<ul>
						<li>Alternative text for images</li>
						<li>Keyboard navigation support</li>
						<li>Clear heading structure</li>
						<li>High contrast color schemes</li>
						<li>Readable fonts and appropriate font sizes</li>
						<li>Form labels and instructions</li>
					</ul>
				</section>

				<section>
					<h2>Known Issues</h2>
					<p>
						We are aware that some parts of our website may not be fully
						accessible. We are working to address these issues and improve our
						overall accessibility.
					</p>
				</section>

				<section>
					<h2>Feedback</h2>
					<p>
						We welcome your feedback on the accessibility of our website. If you
						encounter accessibility barriers, please let us know:
					</p>
					<p>
						Email: info@kalinafond.com
						<br />
						Phone: +380992977886
						<br />
						Address: Dnipro, Ukraine, CA: 49051
					</p>
				</section>

				<section>
					<h2>Third-Party Content</h2>
					<p>
						Some content on our website may be provided by third parties. We
						cannot guarantee the accessibility of such content, but we work with
						our partners to encourage accessible practices.
					</p>
				</section>
			</div>
		</div>
	)
}

export default AccessibilityStatement
