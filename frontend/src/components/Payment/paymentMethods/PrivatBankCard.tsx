import { motion } from "framer-motion"
import React from "react"

interface PrivatBankCardProps {
	onCopy: (text: string, field: string) => void
	copiedField: string | null
}

export const PrivatBankCard: React.FC<PrivatBankCardProps> = ({
	onCopy,
	copiedField,
}) => {
	const bankDetails = {
		iban: "UA123456789012345678901234567",
		cardNumber: "5168 7555 1234 5678",
		recipient: 'БО БФ "Калина"',
	}

	const handleCopy = (text: string, field: string) => {
		onCopy(text, field)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2, delay: 0.1 }}
			className="bg-white rounded-xl p-6 text-gray-800 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col items-center text-center h-56"
			onClick={() => handleCopy(bankDetails.iban, "iban")}
		>
			<div className="w-16 h-16 bg-privat-green rounded-full flex items-center justify-center mb-4">
				<span className="text-white font-bold text-2xl">P</span>
			</div>
			<h3 className="text-lg font-bold mb-2">PrivatBank</h3>
			<p className="text-gray-600 text-sm mb-4 flex-1">
				Bank transfer details available
			</p>
			<button className="w-full bg-privat-green text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors">
				DONATE
			</button>
		</motion.div>
	)
}
