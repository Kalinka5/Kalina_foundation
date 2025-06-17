import React from "react"
import "../styles/privacyPolicy.css"

const PrivacyPolicy: React.FC = () => {
	return (
		<div className="privacy-policy">
			<div className="container">
				<h1>Privacy Policy</h1>
				<p className="last-updated">
					Last updated: {new Date().toLocaleDateString()}
				</p>

				<section>
					<h2>1. Information We Collect</h2>
					<p>
						At Kalina Foundation, we collect information that you provide
						directly to us, such as when you:
					</p>
					<ul>
						<li>Make a donation</li>
						<li>Create an account</li>
						<li>Subscribe to our newsletter</li>
						<li>Contact us with questions or comments</li>
					</ul>
				</section>

				<section>
					<h2>2. How We Use Your Information</h2>
					<p>We use the information we collect to:</p>
					<ul>
						<li>Process donations and provide receipts</li>
						<li>Communicate with you about our programs and activities</li>
						<li>Send you updates and newsletters (with your consent)</li>
						<li>Improve our website and services</li>
						<li>Comply with legal obligations</li>
					</ul>
				</section>

				<section>
					<h2>3. Information Sharing</h2>
					<p>
						We do not sell, trade, or otherwise transfer your personal
						information to third parties without your consent, except as
						described in this policy or as required by law.
					</p>
				</section>

				<section>
					<h2>4. Data Security</h2>
					<p>
						We implement appropriate security measures to protect your personal
						information against unauthorized access, alteration, disclosure, or
						destruction.
					</p>
				</section>

				<section>
					<h2>5. Your Rights</h2>
					<p>You have the right to:</p>
					<ul>
						<li>Access your personal information</li>
						<li>Correct inaccurate information</li>
						<li>Request deletion of your information</li>
						<li>Opt-out of communications</li>
					</ul>
				</section>

				<section>
					<h2>6. Contact Us</h2>
					<p>
						If you have any questions about this Privacy Policy, please contact
						us at:
					</p>
					<p>
						Email: info@kalinafond.com
						<br />
						Phone: +380992977886
						<br />
						Address: Dnipro, Ukraine, CA: 49051
					</p>
				</section>
			</div>
		</div>
	)
}

export default PrivacyPolicy
