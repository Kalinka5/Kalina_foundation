import React from "react"
import Header from "../components/Header.tsx"
import ModernDonationPage from "../components/Payment/ModernDonationPage.tsx"

function Payment() {
	return (
		<div className="header-body">
			<Header />
			<div className="main-body">
				<ModernDonationPage />
			</div>
		</div>
	)
}

export default Payment
