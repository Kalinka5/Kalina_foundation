import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { usePaymentItem } from "../../lib/hooks.tsx"
import { PaymentAccordion } from "./PaymentAccordion.tsx"

const ModernDonationPage = () => {
	const { item_id } = useParams<{ item_id: string }>()
	const [showThankYou, setShowThankYou] = useState(false)

	// Use the payment item hook
	const { data: item, isLoading: loading, error } = usePaymentItem(item_id)

	// Calculate progress percentage
	const progress = item
		? Math.round((item.collected / item.full_price) * 100)
		: 0

	const handleAccordionCardSelect = (cardId: string) => {
		handleDonation(cardId)
	}

	const handleAccordionPaymentMethod = (method: string) => {
		handleDonation(method)
	}

	const handleDonation = (method: string) => {
		// Simulate donation process
		setShowThankYou(true)
		setTimeout(() => setShowThankYou(false), 3000)
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("uk-UA", {
			style: "currency",
			currency: "UAH",
			minimumFractionDigits: 0,
		}).format(amount)
	}

	// Loading state
	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading item details...</p>
				</div>
			</div>
		)
	}

	// Error state
	if (error || !item) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
					<p className="text-gray-600">{error?.message || "Item not found"}</p>
				</div>
			</div>
		)
	}

	return (
		<div className="h-[calc(100vh-65px)] bg-gray-900 flex items-center justify-center p-4">
			{/* Main Modal */}
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl flex overflow-hidden"
			>
				{/* Left Side - Item Details */}
				<div className="w-1/2 bg-gradient-to-br from-gray-700 to-gray-800 p-8 flex flex-col justify-between">
					{/* Item Image */}
					<div className="flex-1 flex items-center justify-center">
						<div className="relative w-full max-w-sm">
							<img
								src={item.image}
								alt={item.title}
								className="w-full h-64 object-cover rounded-xl shadow-lg"
							/>
							<div className="absolute inset-0 bg-black/20 rounded-xl" />
						</div>
					</div>

					{/* Item Info */}
					<div className="text-white">
						<h1 className="text-3xl font-bold mb-4">{item.title}</h1>
						<p className="text-gray-300 mb-6">
							Help us provide {item.amount} units of {item.title} for Ukrainian
							heroes
						</p>

						{/* Progress Bar */}
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium text-gray-400">
									Progress
								</span>
								<motion.span
									key={progress}
									initial={{ scale: 1.2, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className="text-2xl font-bold text-green-400"
								>
									{progress}%
								</motion.span>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: `${progress}%` }}
									transition={{ duration: 2, ease: "easeInOut" }}
									className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full relative"
								>
									<div className="absolute inset-0 bg-white/20 animate-pulse" />
								</motion.div>
							</div>
							<div className="flex justify-between items-center text-sm text-gray-400">
								<span>{formatCurrency(item.collected)} raised</span>
								<span>{formatCurrency(item.full_price)} goal</span>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side - Payment Methods */}
				<div className="w-1/2 bg-gray-800 p-8 flex flex-col">
					{/* Payment Title */}
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-white mb-2">
							Choose Payment Method
						</h2>
						<p className="text-gray-400">
							Select your preferred payment option
						</p>
					</div>

					{/* Payment Accordion */}
					<div className="flex-1">
						<PaymentAccordion
							onCardSelect={handleAccordionCardSelect}
							onPaymentMethod={handleAccordionPaymentMethod}
						/>
					</div>
				</div>
			</motion.div>

			{/* Thank You Animation */}
			<AnimatePresence>
				{showThankYou && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
					>
						<motion.div
							initial={{ y: 50 }}
							animate={{ y: 0 }}
							className="bg-gray-800 rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl border border-gray-700"
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
								className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
							>
								<FaCheck className="text-2xl text-white" />
							</motion.div>
							<h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
							<p className="text-gray-300">Your donation is being processed</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ModernDonationPage
