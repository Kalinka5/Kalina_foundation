import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import {
	FaChevronRight,
	FaCreditCard,
	FaEthereum,
	FaMicrochip,
	FaPaypal,
	FaWallet,
} from "react-icons/fa"
import "../../styles/PaymentAccordion.css"

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
		<div className="payment-accordion-item">
			<button onClick={onClick} className="payment-accordion-trigger">
				<div className="payment-accordion-trigger-left">
					<Icon className="payment-accordion-trigger-icon" />
					<span className="payment-accordion-trigger-title">{title}</span>
				</div>
				<motion.span
					animate={{ rotate: isOpen ? 90 : 0 }}
					transition={{ duration: 0.2 }}
					className="payment-accordion-trigger-chevron"
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
						className="payment-accordion-content"
					>
						<div className="payment-accordion-content-inner">{children}</div>
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
	const [selectedBank, setSelectedBank] = useState<"monobank" | "privatbank">(
		"monobank"
	)

	const toggleIndex = (index: number) => {
		setOpenIndex(openIndex === index ? -1 : index)
	}

	const stripeFeatures = []

	const paypalFeatures = []

	const metamaskFeatures = []

	return (
		<div className="payment-accordion">
			<AccordionItem
				title="Cards"
				icon={FaWallet}
				isOpen={openIndex === 0}
				onClick={() => toggleIndex(0)}
			>
				<div className="bank-card-switch">
					<button
						type="button"
						className={`bank-card-option ${
							selectedBank === "monobank" ? "active" : ""
						}`}
						onClick={() => {
							setSelectedBank("monobank")
							onCardSelect?.("monobank")
						}}
					>
						Monobank
					</button>
					<button
						type="button"
						className={`bank-card-option ${
							selectedBank === "privatbank" ? "active" : ""
						}`}
						onClick={() => {
							setSelectedBank("privatbank")
							onCardSelect?.("privatbank")
						}}
					>
						PrivatBank
					</button>
				</div>
				<div className="bank-card-stage">
					{selectedBank === "monobank" ? (
						<div className="bank-card-callout">
							<motion.div
								key="monobank"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="bank-card bank-card--monobank"
							>
								<div className="bank-card-top">
									<div className="bank-card-brand">
										<span className="bank-card-brand-sub">Universal Bank</span>
									</div>
									<span className="bank-card-currency">UAH</span>
								</div>
								<div className="bank-card-body">
									<div className="bank-card-chip">
										<FaMicrochip />
									</div>
								</div>
								<div className="bank-card-number">9876 5432 1098 5414</div>
								<div className="bank-card-footer">
									<div className="bank-card-holder">
										<span className="bank-card-label">Cardholder</span>
									</div>
									<div className="bank-card-expire">
										<span className="bank-card-label">Valid To</span>
									</div>
								</div>
							</motion.div>
							<a
								href="https://send.monobank.ua/jar/QsATQ1NQ4"
								target="_blank"
								rel="noopener noreferrer"
								className="bank-card-cta"
							>
								Open Mono Pay
							</a>
						</div>
					) : (
						<div className="bank-card-callout">
							<motion.div
								key="privatbank"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="bank-card bank-card--privat"
							>
								<div className="bank-card-top">
									<div className="bank-card-brand">
										<span className="bank-card-brand-sub">Universal Bank</span>
									</div>
									<span className="bank-card-currency">UAH</span>
								</div>
								<div className="bank-card-body">
									<div className="bank-card-chip">
										<FaMicrochip />
									</div>
								</div>
								<div className="bank-card-number">9876 5432 1098 5414</div>
								<div className="bank-card-footer">
									<div className="bank-card-holder">
										<span className="bank-card-label">Cardholder</span>
									</div>
									<div className="bank-card-expire">
										<span className="bank-card-label">Valid To</span>
									</div>
								</div>
							</motion.div>
							<a
								href="https://privatbank.ua/donate"
								target="_blank"
								rel="noopener noreferrer"
								className="bank-card-cta"
							>
								Open Privat24
							</a>
						</div>
					)}
				</div>
			</AccordionItem>

			<AccordionItem
				title="Stripe"
				icon={FaCreditCard}
				isOpen={openIndex === 1}
				onClick={() => toggleIndex(1)}
			>
				<div className="payment-method-panel payment-method-panel--stripe">
					<div className="payment-method-header">
						<div className="payment-method-icon">
							<FaCreditCard />
						</div>
						<div>
							<h3 className="payment-method-title">Stripe Payment</h3>
							<p className="payment-method-subtitle">
								Secure payment processing
							</p>
						</div>
					</div>
					<div className="payment-method-body">
						{stripeFeatures.map((feature, index) => (
							<div key={index} className="payment-method-feature">
								<span className="payment-method-bullet" />
								<span>{feature}</span>
							</div>
						))}
					</div>
					<div className="payment-input-group">
						<label className="payment-input-label">Amount (UAH)</label>
						<input
							type="number"
							placeholder="Enter amount"
							className="payment-input"
						/>
					</div>
					<button
						onClick={() => onPaymentMethod?.("stripe")}
						className="payment-primary-button payment-primary-button--stripe"
					>
						Pay with Stripe
					</button>
				</div>
			</AccordionItem>

			<AccordionItem
				title="PayPal"
				icon={FaPaypal}
				isOpen={openIndex === 2}
				onClick={() => toggleIndex(2)}
			>
				<div className="payment-method-panel payment-method-panel--paypal">
					<div className="payment-method-header">
						<div className="payment-method-icon">
							<FaPaypal />
						</div>
						<div>
							<h3 className="payment-method-title">PayPal Payment</h3>
							<p className="payment-method-subtitle">
								Pay securely with PayPal
							</p>
						</div>
					</div>
					<div className="payment-method-body">
						{paypalFeatures.map((feature, index) => (
							<div key={index} className="payment-method-feature">
								<span className="payment-method-bullet" />
								<span>{feature}</span>
							</div>
						))}
					</div>
					<div className="payment-input-group">
						<label className="payment-input-label">Amount (UAH)</label>
						<input
							type="number"
							placeholder="Enter amount"
							className="payment-input"
						/>
					</div>
					<button
						onClick={() => onPaymentMethod?.("paypal")}
						className="payment-primary-button payment-primary-button--paypal"
					>
						Pay with PayPal
					</button>
				</div>
			</AccordionItem>

			<AccordionItem
				title="MetaMask"
				icon={FaEthereum}
				isOpen={openIndex === 3}
				onClick={() => toggleIndex(3)}
			>
				<div className="payment-method-panel payment-method-panel--metamask">
					<div className="payment-method-header">
						<div className="payment-method-icon">
							<FaEthereum />
						</div>
						<div>
							<h3 className="payment-method-title">MetaMask Wallet</h3>
							<p className="payment-method-subtitle">
								Connect your crypto wallet
							</p>
						</div>
					</div>
					<div className="payment-network-group">
						<label className="payment-input-label">Choose Network</label>
						<div className="payment-network-options">
							<button className="payment-network-option">
								<span className="payment-network-badge payment-network-badge--blue">
									<FaEthereum />
								</span>
								<span className="payment-network-label">ETH</span>
							</button>
							<button className="payment-network-option">
								<span className="payment-network-badge payment-network-badge--yellow">
									B
								</span>
								<span className="payment-network-label">BNB</span>
							</button>
						</div>
					</div>
					<div className="payment-input-group">
						<label className="payment-input-label">Amount</label>
						<input
							type="number"
							placeholder="Enter amount"
							className="payment-input"
						/>
					</div>
					<div className="payment-wallet-address">
						<p className="payment-wallet-label">Wallet Address</p>
						<p className="payment-wallet-value">
							0x742d35Cc6634C0532925a3b8D1234567890abcdef
						</p>
					</div>
					<button
						onClick={() => onPaymentMethod?.("metamask")}
						className="payment-primary-button payment-primary-button--metamask"
					>
						Connect MetaMask
					</button>
				</div>
			</AccordionItem>
		</div>
	)
}
