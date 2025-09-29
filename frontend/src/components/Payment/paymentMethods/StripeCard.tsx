import { motion } from "framer-motion"
import React from "react"
import { FaCreditCard } from "react-icons/fa"
import "../../../styles/PaymentMethodCards.css"

interface StripeCardProps {
	onDonate: () => void
}

export const StripeCard: React.FC<StripeCardProps> = ({ onDonate }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}
			className="payment-method-card payment-method-card--stripe"
			onClick={onDonate}
		>
			<div className="payment-method-card__icon">
				<FaCreditCard />
			</div>
			<h3 className="payment-method-card__title">Stripe</h3>
			<p className="payment-method-card__description">
				Pay easily with your Stripe account
			</p>
			<button className="payment-method-card__button">DONATE</button>
		</motion.div>
	)
}
