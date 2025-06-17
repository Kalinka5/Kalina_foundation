import React from "react"
import "../styles/refundPolicy.css"

const RefundPolicy: React.FC = () => {
	return (
		<div className="refund-policy">
			<div className="container">
				<h1>Refund Policy</h1>
				<p className="last-updated">
					Last updated: {new Date().toLocaleDateString()}
				</p>

				<section>
					<h2>1. General Policy</h2>
					<p>
						At Kalina Foundation, we understand that sometimes circumstances may
						require a refund of your donation. While donations are generally
						considered final, we will consider refund requests on a case-by-case
						basis within the timeframes specified below.
					</p>
				</section>

				<section>
					<h2>2. Refund Timeframe</h2>
					<p>
						Refund requests must be submitted within 30 days of the original
						donation date. Requests submitted after this period will not be
						considered unless exceptional circumstances apply.
					</p>
				</section>

				<section>
					<h2>3. Eligible Refund Scenarios</h2>
					<p>We may approve refunds in the following situations:</p>
					<ul>
						<li>Technical errors resulting in duplicate donations</li>
						<li>Unauthorized use of payment method</li>
						<li>
							Accidental donation amounts significantly different from intended
						</li>
						<li>Processing errors on our part</li>
						<li>Fraudulent transactions</li>
					</ul>
				</section>

				<section>
					<h2>4. Non-Refundable Situations</h2>
					<p>Refunds will generally not be approved for:</p>
					<ul>
						<li>Change of mind after making a donation</li>
						<li>
							Disagreement with how funds are used (within our stated mission)
						</li>
						<li>Financial hardship that occurs after the donation</li>
						<li>Donations made more than 30 days ago</li>
					</ul>
				</section>

				<section>
					<h2>5. Refund Process</h2>
					<p>To request a refund:</p>
					<ol>
						<li>Contact us using the information provided below</li>
						<li>Provide your donation confirmation number or receipt</li>
						<li>Explain the reason for your refund request</li>
						<li>Include any supporting documentation if applicable</li>
					</ol>
					<p>
						We will review your request within 5-10 business days and notify you
						of our decision. If approved, refunds will be processed to the
						original payment method within 7-14 business days.
					</p>
				</section>

				<section>
					<h2>6. Processing Fees</h2>
					<p>
						Please note that payment processing fees charged by third-party
						payment processors (such as credit card fees) are non-refundable and
						may be deducted from any approved refund amount.
					</p>
				</section>

				<section>
					<h2>7. Tax Implications</h2>
					<p>
						If you have claimed a tax deduction for your donation and
						subsequently receive a refund, you are responsible for ensuring
						compliance with applicable tax laws and regulations. You may need to
						amend your tax return accordingly.
					</p>
				</section>

				<section>
					<h2>8. Recurring Donations</h2>
					<p>
						For recurring donations, you may cancel future payments at any time
						through your account or by contacting us. However, previous
						donations that have already been processed are subject to our
						standard refund policy.
					</p>
				</section>

				<section>
					<h2>9. Contact Us</h2>
					<p>
						For refund requests or questions about this policy, please contact
						us at:
					</p>
					<p>
						Email: info@kalinafond.com
						<br />
						Phone: +380992977886
						<br />
						Address: Dnipro, Ukraine, CA: 49051
					</p>
					<p>
						Please include "Refund Request" in the subject line of your email
						for faster processing.
					</p>
				</section>

				<section>
					<h2>10. Changes to This Policy</h2>
					<p>
						We reserve the right to modify this refund policy at any time. Any
						changes will be posted on this page with an updated revision date.
						Your continued use of our website after any changes constitutes
						acceptance of the new policy.
					</p>
				</section>
			</div>
		</div>
	)
}

export default RefundPolicy
