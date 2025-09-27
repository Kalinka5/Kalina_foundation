import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import {
	FaChevronRight,
	FaCreditCard,
	FaEthereum,
	FaPaypal,
	FaWallet,
} from "react-icons/fa"

interface AccordionItemProps {
	title: string
	icon: React.ComponentType<{ className?: string }>
	children: React.ReactNode
	isOpen: boolean
	onClick: () => void
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	icon: Icon,
	children,
	isOpen,
	onClick,
}) => {
	return (
		<div className="border-b border-gray-600">
			<button
				onClick={onClick}
				className="w-full flex items-center justify-between p-4 text-lg font-medium text-white hover:bg-gray-700 transition-colors duration-200"
			>
				<div className="flex items-center space-x-3">
					<Icon className="text-gray-400 text-xl" />
					<span>{title}</span>
				</div>
				<motion.span
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.2 }}
					className="text-gray-400"
				>
					<FaChevronRight />
				</motion.span>
			</button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="px-4 pb-4">{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

interface PaymentAccordionProps {
	onCardSelect?: (cardId: string) => void
	onPaymentMethod?: (method: string) => void
}

export const PaymentAccordion: React.FC<PaymentAccordionProps> = ({
	onCardSelect,
	onPaymentMethod,
}) => {
	const [openIndex, setOpenIndex] = useState(0)

	const toggleIndex = (index: number) => {
		setOpenIndex(openIndex === index ? -1 : index)
	}

	const savedCards = [
		{
			id: "monobank",
			type: "Monobank",
			number: "5375 XXXX XXXX 4141",
			name: "Raviteja Govindaraju",
			gradient: "from-purple-500 to-purple-700",
			logo: "M",
		},
		{
			id: "privatbank",
			type: "PrivatBank",
			number: "5168 XXXX XXXX 5678",
			name: "Raviteja Govindaraju",
			gradient: "from-green-500 to-green-700",
			logo: "P",
		},
	]

	const stripeFeatures = []

	const paypalFeatures = []

	const metamaskFeatures = []

	return (
		<div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
			<AccordionItem
				title="Cards"
				icon={FaWallet}
				isOpen={openIndex === 0}
				onClick={() => toggleIndex(0)}
			>
				<div className="space-y-3">
					{savedCards.map(card => (
						<motion.div
							key={card.id}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => onCardSelect?.(card.id)}
							className={`bg-gradient-to-r ${card.gradient} text-white p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl`}
						>
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm opacity-90">
										{card.type} •••• {card.number.split(" ")[3]}
									</p>
									<p className="font-semibold text-lg">{card.name}</p>
								</div>
								<div className="text-right">
									<p className="text-xs opacity-75">Expires</p>
									<p className="text-sm font-medium">12/26</p>
								</div>
							</div>
							<div className="mt-3 flex justify-between items-center">
								<div className="flex space-x-2">
									<div className="w-8 h-5 bg-white/20 rounded text-xs flex items-center justify-center font-bold">
										{card.logo}
									</div>
								</div>
								<div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
									<div className="w-6 h-4 bg-white/30 rounded-sm"></div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</AccordionItem>

			<AccordionItem
				title="Stripe"
				icon={FaCreditCard}
				isOpen={openIndex === 1}
				onClick={() => toggleIndex(1)}
			>
				<div className="space-y-4">
					<div className="bg-gray-700 rounded-lg p-6">
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<FaCreditCard className="text-white text-lg" />
							</div>
							<div>
								<h3 className="text-white font-semibold">Stripe Payment</h3>
								<p className="text-gray-400 text-sm">
									Secure payment processing
								</p>
							</div>
						</div>

						<div className="space-y-3 mb-6">
							{stripeFeatures.map((feature, index) => (
								<div key={index} className="flex items-center space-x-2">
									<div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
									<span className="text-gray-300 text-sm">{feature}</span>
								</div>
							))}
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Amount (UAH)
							</label>
							<input
								type="number"
								placeholder="Enter amount"
								className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<button
							onClick={() => onPaymentMethod?.("stripe")}
							className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							Pay with Stripe
						</button>
					</div>
				</div>
			</AccordionItem>

			<AccordionItem
				title="PayPal"
				icon={FaPaypal}
				isOpen={openIndex === 2}
				onClick={() => toggleIndex(2)}
			>
				<div className="space-y-4">
					<div className="bg-gray-700 rounded-lg p-6">
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
								<FaPaypal className="text-white text-lg" />
							</div>
							<div>
								<h3 className="text-white font-semibold">PayPal Payment</h3>
								<p className="text-gray-400 text-sm">
									Pay securely with PayPal
								</p>
							</div>
						</div>

						<div className="space-y-3 mb-6">
							{paypalFeatures.map((feature, index) => (
								<div key={index} className="flex items-center space-x-2">
									<div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
									<span className="text-gray-300 text-sm">{feature}</span>
								</div>
							))}
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Amount (UAH)
							</label>
							<input
								type="number"
								placeholder="Enter amount"
								className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<button
							onClick={() => onPaymentMethod?.("paypal")}
							className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							Pay with PayPal
						</button>
					</div>
				</div>
			</AccordionItem>

			<AccordionItem
				title="MetaMask"
				icon={FaEthereum}
				isOpen={openIndex === 3}
				onClick={() => toggleIndex(3)}
			>
				<div className="space-y-4">
					<div className="bg-gray-700 rounded-lg p-6">
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
								<FaEthereum className="text-white text-lg" />
							</div>
							<div>
								<h3 className="text-white font-semibold">MetaMask Wallet</h3>
								<p className="text-gray-400 text-sm">
									Connect your crypto wallet
								</p>
							</div>
						</div>

						<div className="space-y-3 mb-6">
							{metamaskFeatures.map((feature, index) => (
								<div key={index} className="flex items-center space-x-2">
									<div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
									<span className="text-gray-300 text-sm">{feature}</span>
								</div>
							))}
						</div>

						{/* Network Selection */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Choose Network
							</label>
							<div className="grid grid-cols-2 gap-3">
								<button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-lg border-2 border-transparent hover:border-orange-500 transition-all duration-200">
									<div className="flex items-center space-x-2">
										<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
											<FaEthereum className="text-white text-xs" />
										</div>
										<span className="text-white text-sm font-medium">ETH</span>
									</div>
								</button>
								<button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-lg border-2 border-transparent hover:border-orange-500 transition-all duration-200">
									<div className="flex items-center space-x-2">
										<div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
											<span className="text-white text-xs font-bold">B</span>
										</div>
										<span className="text-white text-sm font-medium">BNB</span>
									</div>
								</button>
							</div>
						</div>

						{/* Amount Field */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Amount
							</label>
							<input
								type="number"
								placeholder="Enter amount"
								className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							/>
						</div>

						<div className="bg-gray-600 rounded-lg p-4 mb-4">
							<p className="text-gray-400 text-sm mb-2">Wallet Address</p>
							<p className="text-white font-mono text-sm break-all">
								0x742d35Cc6634C0532925a3b8D1234567890abcdef
							</p>
						</div>

						<button
							onClick={() => onPaymentMethod?.("metamask")}
							className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							Connect MetaMask
						</button>
					</div>
				</div>
			</AccordionItem>
		</div>
	)
}
