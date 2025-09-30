import Header from "../components/Header"
import ModernDonationPage from "../components/Payment/ModernDonationPage"

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
