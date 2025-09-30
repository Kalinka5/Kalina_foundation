import { motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { usePaymentItem } from "../../lib/hooks"
import { PaymentAccordion } from "./PaymentAccordion"

import "../../styles/ModernDonationPage.css"

const ModernDonationPage = () => {
	const { item_id } = useParams<{ item_id: string }>()
	const [showThankYou, setShowThankYou] = useState(false)
	const { t } = useTranslation()

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
			<div className="loading-container">
				<div className="loading-content">
					<div className="loading-spinner"></div>
					<p className="loading-text">Loading item details...</p>
				</div>
			</div>
		)
	}

	// Error state
	if (error || !item) {
		return (
			<div className="error-container">
				<div className="error-content">
					<h1 className="error-title">Error</h1>
					<p className="error-text">{error?.message || "Item not found"}</p>
				</div>
			</div>
		)
	}

	return (
		<div className="modern-donation-page">
			<div className="donation-layout">
				<div className="donation-left-column">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="donation-panel donation-panel--image"
					>
						<div className="image-wrapper">
							<img src={item.image} alt={item.title} className="item-image" />
							<div className="image-overlay" />
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.25 }}
						className="donation-panel donation-panel--details"
					>
						<div className="item-info">
							<h1 className="item-title">{t(`${item.title}-title`)}</h1>
							<p className="item-description">
								{t(`${item.title}-description`)}
							</p>
							<div className="progress-section">
								<div className="progress-header">
									<span className="progress-label">Progress</span>
									<motion.span
										key={progress}
										initial={{ scale: 1.15, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.5 }}
										className="progress-percentage"
									>
										{progress}%
									</motion.span>
								</div>
								<div className="progress-bar-container">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${progress}%` }}
										transition={{ duration: 1.8, ease: "easeInOut" }}
										className="progress-bar"
									>
										<div className="progress-bar-shine" />
									</motion.div>
								</div>
								<div className="progress-footer">
									<span>{formatCurrency(item.collected)} raised</span>
									<span>{formatCurrency(item.full_price)} goal</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="donation-panel donation-panel--payments"
				>
					<div className="payment-title-section">
						<h2 className="payment-title">Choose Payment Method</h2>
					</div>
					<div className="payment-accordion-container">
						<PaymentAccordion
							onCardSelect={handleAccordionCardSelect}
							onPaymentMethod={handleAccordionPaymentMethod}
						/>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default ModernDonationPage
