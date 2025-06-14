import React from "react"

import "../styles/footer.css"

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<div className="footer-content">
					<div className="footer-section">
						<h3>Kalina Foundation</h3>
					</div>
					<div className="footer-section">
						<p>123-456-7890</p>
						<p>info@kalinafdn.com</p>
					</div>
					<div className="footer-section">
						<p>500 Terry Francine Street,</p>
						<p>6th Floor, San Francisco,</p>
						<p>CA 94158</p>
					</div>
					<div className="footer-section">
						<p>
							<a href="/privacy">Privacy Policy</a>
						</p>
						<p>
							<a href="/accessibility">Accessibility Statement</a>
						</p>
						<p>
							<a href="/terms">Terms & Conditions</a>
						</p>
						<p>
							<a href="/refund">Refund Policy</a>
						</p>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="social-icons">
						<span className="social-dot"></span>
						<span className="social-dot"></span>
						<span className="social-dot"></span>
						<span className="social-dot"></span>
					</div>
					<p className="footer-copyright">
						© 2023 by Kalina Foundation. Powered and secured by Wix
					</p>
				</div>
			</footer>
		)
	}
}

export default Footer
