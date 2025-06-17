import React from "react"
import "../styles/termsConditions.css"

const TermsConditions: React.FC = () => {
	return (
		<div className="terms-conditions">
			<div className="container">
				<h1>Terms & Conditions</h1>
				<p className="last-updated">
					Last updated: {new Date().toLocaleDateString()}
				</p>

				<section>
					<h2>1. Agreement to Terms</h2>
					<p>
						By accessing and using the Kalina Foundation website, you accept and
						agree to be bound by the terms and provision of this agreement. If
						you do not agree to abide by the above, please do not use this
						service.
					</p>
				</section>

				<section>
					<h2>2. Use License</h2>
					<p>
						Permission is granted to temporarily access the materials on Kalina
						Foundation's website for personal, non-commercial transitory viewing
						only. This is the grant of a license, not a transfer of title, and
						under this license you may not:
					</p>
					<ul>
						<li>Modify or copy the materials</li>
						<li>
							Use the materials for any commercial purpose or for any public
							display
						</li>
						<li>
							Attempt to reverse engineer any software contained on the website
						</li>
						<li>
							Remove any copyright or other proprietary notations from the
							materials
						</li>
					</ul>
				</section>

				<section>
					<h2>3. Donations</h2>
					<p>
						All donations made through our website are final and non-refundable
						unless otherwise stated in our Refund Policy. Donations are used to
						support our charitable activities and programs in Ukraine.
					</p>
				</section>

				<section>
					<h2>4. User Accounts</h2>
					<p>
						When you create an account with us, you must provide information
						that is accurate, complete, and current at all times. You are
						responsible for safeguarding the password and for all activities
						that occur under your account.
					</p>
				</section>

				<section>
					<h2>5. Privacy Policy</h2>
					<p>
						Your privacy is important to us. Please review our Privacy Policy,
						which also governs your use of the website, to understand our
						practices.
					</p>
				</section>

				<section>
					<h2>6. Prohibited Uses</h2>
					<p>You may not use our website:</p>
					<ul>
						<li>For any unlawful purpose</li>
						<li>To harass, abuse, or harm other users</li>
						<li>To submit false or misleading information</li>
						<li>
							To interfere with the security or functionality of the website
						</li>
					</ul>
				</section>

				<section>
					<h2>7. Disclaimer</h2>
					<p>
						The materials on Kalina Foundation's website are provided on an 'as
						is' basis. Kalina Foundation makes no warranties, expressed or
						implied, and hereby disclaims and negates all other warranties
						including without limitation, implied warranties or conditions of
						merchantability, fitness for a particular purpose, or
						non-infringement of intellectual property or other violation of
						rights.
					</p>
				</section>

				<section>
					<h2>8. Limitations</h2>
					<p>
						In no event shall Kalina Foundation or its suppliers be liable for
						any damages (including, without limitation, damages for loss of data
						or profit, or due to business interruption) arising out of the use
						or inability to use the materials on Kalina Foundation's website.
					</p>
				</section>

				<section>
					<h2>9. Revisions</h2>
					<p>
						The materials appearing on Kalina Foundation's website could include
						technical, typographical, or photographic errors. Kalina Foundation
						does not warrant that any of the materials on its website are
						accurate, complete, or current.
					</p>
				</section>

				<section>
					<h2>10. Contact Information</h2>
					<p>
						If you have any questions about these Terms & Conditions, please
						contact us at:
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

export default TermsConditions
