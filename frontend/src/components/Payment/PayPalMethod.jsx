import { useState } from "react"

import {
	FUNDING,
	PayPalButtons,
	PayPalScriptProvider,
} from "@paypal/react-paypal-js"

import { useTranslation } from "react-i18next"

import api from "../../lib/api"

import paypalLogo from "../../img/PayPal.png"

import "../../styles/payment/paypal.css"

const PaypalMethod = () => {
	const [donationAmount, setDonationAmount] = useState(5)
	const { t } = useTranslation()

	const handlePaymentSuccess = async (details, data) => {
		if (!data || !details) {
			console.error("Invalid transaction data")
			return
		}

		// Get email from payment details
		let email = details.payer ? details.payer.email_address : ""

		// Send the transaction data to the backend
		const response = await api("donate/", {
			method: "POST",
			body: JSON.stringify({
				donate_type: "dollars",
				amount: donationAmount,
				email: email,
			}),
		})

		if (response.status === "success") {
			window.location.reload()
		} else {
			console.error("Error updating donation", response.message)
		}
	}

	return (
		<PayPalScriptProvider
			options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
		>
			<div className="paypal-side">
				<img src={paypalLogo} alt="PayPal-logo" className="paypal-logo"></img>
				<h1>{t("paypal-title")}</h1>
				<div className="radio-list">
					<div className="radio-col-1">
						<div className="radio-item">
							<input
								name="radio"
								id="radio1"
								type="radio"
								value={5}
								onChange={e => setDonationAmount(e.target.value)}
								defaultChecked
							/>
							<label htmlFor="radio1">5$ 💵</label>
						</div>
						<div className="radio-item">
							<input
								name="radio"
								id="radio2"
								type="radio"
								value={10}
								onChange={e => setDonationAmount(e.target.value)}
							/>
							<label htmlFor="radio2">10$ 💵</label>
						</div>
						<div className="radio-item">
							<input
								name="radio"
								id="radio3"
								type="radio"
								value={20}
								onChange={e => setDonationAmount(e.target.value)}
							/>
							<label htmlFor="radio3">20$ 💵</label>
						</div>
					</div>
					<div className="radio-col-2">
						<div className="radio-item">
							<input
								name="radio"
								id="radio4"
								type="radio"
								value={50}
								onChange={e => setDonationAmount(e.target.value)}
							/>
							<label htmlFor="radio4">50$ 💵</label>
						</div>
						<div className="radio-item">
							<input
								name="radio"
								id="radio5"
								type="radio"
								value={100}
								onChange={e => setDonationAmount(e.target.value)}
							/>
							<label htmlFor="radio5">100$ 💵</label>
						</div>
						<div className="radio-item">
							<input
								name="radio"
								id="radio6"
								type="radio"
								value={200}
								onChange={e => setDonationAmount(e.target.value)}
							/>
							<label htmlFor="radio6">200$ 💵</label>
						</div>
					</div>
				</div>
				<div className="paypal-button">
					<PayPalButtons
						key={donationAmount}
						createOrder={(data, actions) => {
							return actions.order.create({
								purchase_units: [
									{
										amount: {
											value: donationAmount.toString(),
										},
									},
								],
							})
						}}
						onApprove={async (data, actions) => {
							try {
								const details = await actions.order.capture()
								await handlePaymentSuccess(details, data)
							} catch (error) {
								console.error("Error capturing order", error)
							}
						}}
						fundingSource={FUNDING.PAYPAL}
					/>
				</div>
			</div>
		</PayPalScriptProvider>
	)
}

export default PaypalMethod
