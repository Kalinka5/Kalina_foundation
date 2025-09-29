import { motion } from "framer-motion"
import React from "react"
import { FaEthereum } from "react-icons/fa"
import "../../../styles/PaymentMethodCards.css"

interface MetaMaskCardProps {
	onDonate: () => void
}

export const MetaMaskCard: React.FC<MetaMaskCardProps> = ({ onDonate }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}
			className="payment-method-card payment-method-card--metamask"
			onClick={onDonate}
		>
			<div className="payment-method-card__icon">
				<FaEthereum />
			</div>
			<h3 className="payment-method-card__title">MetaMask</h3>
			<p className="payment-method-card__description">
				Connect your MetaMask crypto wallet
			</p>
			<button className="payment-method-card__button">DONATE</button>
		</motion.div>
	)
}
