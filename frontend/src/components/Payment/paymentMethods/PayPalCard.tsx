import { motion } from "framer-motion"
import React from "react"
import { FaPaypal } from "react-icons/fa"

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
			transition={{ duration: 0.2, delay: 0.3 }}
			className="bg-white rounded-xl p-6 text-gray-800 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center h-56"
			onClick={onDonate}
		>
			<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
				<FaPaypal className="text-white text-2xl" />
			</div>
			<h3 className="text-lg font-bold mb-2">PayPal</h3>
			<p className="text-gray-600 text-sm mb-4 flex-1">
				Secure payment with PayPal account
			</p>
			<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
				DONATE
			</button>
		</motion.div>
	)
}
