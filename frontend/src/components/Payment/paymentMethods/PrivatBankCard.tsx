import { motion } from "framer-motion"
import React from "react"
import "../../../styles/PaymentMethodCards.css"

interface PrivatBankCardProps {
	onDonate: () => void
}

export const PrivatBankCard: React.FC<PrivatBankCardProps> = ({ onDonate }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}
			className="payment-method-card payment-method-card--privat"
			onClick={onDonate}
		>
			<div className="payment-method-card__icon">
				<span>P</span>
			</div>
			<h3 className="payment-method-card__title">PrivatBank</h3>
			<p className="payment-method-card__description">
				Support us via PrivatBank card transfer
			</p>
			<button className="payment-method-card__button">DONATE</button>
		</motion.div>
	)
}
