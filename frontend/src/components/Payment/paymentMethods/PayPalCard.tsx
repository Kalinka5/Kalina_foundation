import { motion } from "framer-motion"
import React from "react"
import { FaPaypal } from "react-icons/fa"
import "../../../styles/PaymentMethodCards.css"

interface PayPalCardProps {
	onDonate: () => void
}

export const PayPalCard: React.FC<PayPalCardProps> = ({ onDonate }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}
			className="payment-method-card payment-method-card--paypal"
			onClick={onDonate}
		>
			<div className="payment-method-card__icon">
				<FaPaypal />
			</div>
			<h3 className="payment-method-card__title">PayPal</h3>
			<p className="payment-method-card__description">
				Pay securely with your PayPal account
			</p>
			<button className="payment-method-card__button">DONATE</button>
		</motion.div>
	)
}
