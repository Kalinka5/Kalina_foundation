import { motion } from "framer-motion"
import React from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import "../../../styles/PaymentMethodCards.css"

interface MonobankCardProps {
	onDonate: () => void
}

export const MonobankCard: React.FC<MonobankCardProps> = ({ onDonate }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}
			className="payment-method-card payment-method-card--monobank"
			onClick={onDonate}
		>
			<div className="payment-method-card__icon">
				<FaExternalLinkAlt />
			</div>
			<h3 className="payment-method-card__title">Monobank</h3>
			<p className="payment-method-card__description">
				Instant transfer through Monobank app
			</p>
			<button className="payment-method-card__button">DONATE</button>
		</motion.div>
	)
}
