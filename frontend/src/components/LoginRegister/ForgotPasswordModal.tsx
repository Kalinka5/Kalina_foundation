import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IoChevronBack, IoClose } from "react-icons/io5"

import api from "../../lib/api"

import "../../styles/loginRegister/modernLogin.css"
import "../../styles/loginRegister/modernRegister.css"

interface ForgotPasswordModalProps {
	onClose: () => void
	backgroundImages: string[]
	onBackToLogin: () => void
}

function ForgotPasswordModal({
	onClose,
	backgroundImages,
	onBackToLogin,
}: ForgotPasswordModalProps) {
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<any>({})
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	// Image sliding state
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const { t, i18n } = useTranslation()

	// Auto-slide images every 10 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				prevIndex => (prevIndex + 1) % backgroundImages.length
			)
		}, 10000) // 10 seconds

		return () => clearInterval(interval)
	}, [backgroundImages.length])

	// Clear errors when language changes
	useEffect(() => {
		setErrors({})
		setShowSuccessMessage(false)
	}, [i18n.language])

	// Auto-dismiss success message after 5 seconds
	useEffect(() => {
		if (showSuccessMessage) {
			const timer = setTimeout(() => {
				setShowSuccessMessage(false)
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [showSuccessMessage])

	// Handle manual navigation
	const goToSlide = (index: number) => {
		setCurrentImageIndex(index)
	}

	// Success/Error message component
	const AlertMessage = ({
		message,
		type,
		onClose,
	}: {
		message: string
		type: "success" | "error"
		onClose: () => void
	}) => (
		<div className="modern-alert-container">
			<div className={`modern-alert ${type}`}>
				<span>{message}</span>
				<button className="modern-alert-close" onClick={onClose}>
					×
				</button>
			</div>
		</div>
	)

	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true)
		e.preventDefault()

		// Validation
		const newErrors: any = {}

		if (!email.trim()) {
			newErrors.email = t("forgot-password-email-required")
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = t("forgot-password-email-invalid")
		}

		setErrors(newErrors)

		try {
			if (Object.keys(newErrors).length === 0) {
				// Call forgot password API
				const response = await api("forgot-password/", {
					method: "POST",
					body: JSON.stringify({ email: email }),
				})

				if ((response as any)?.status === "success") {
					setShowSuccessMessage(true)
					// Clear form on success
					setEmail("")
					setErrors({})

					// Redirect to login page after 3 seconds
					setTimeout(() => {
						onBackToLogin()
					}, 3000)
				} else {
					setErrors({ general: t("forgot-password-error-message") })
				}
			}
		} catch (error) {
			setErrors({ general: t("forgot-password-error-message") })
			console.error("Forgot password error:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				zIndex: 9999,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{/* Success Message */}
			{showSuccessMessage && (
				<AlertMessage
					message={t("forgot-password-success-message")}
					type="success"
					onClose={() => setShowSuccessMessage(false)}
				/>
			)}

			{/* Error Message */}
			{errors.general && (
				<AlertMessage
					message={errors.general}
					type="error"
					onClose={() => setErrors({ ...errors, general: null })}
				/>
			)}

			<div
				className="modern-login-container"
				style={{ position: "relative", zIndex: 10000 }}
			>
				<div className="modern-login-modal">
					{/* Close Button */}
					<button className="modern-login-close" onClick={onClose}>
						<IoClose />
					</button>

					{/* Left side - Form */}
					<div className="modern-login-form-side">
						<div className="modern-login-top-bar">
							<button className="modern-back-button" onClick={onBackToLogin}>
								<IoChevronBack />
								<span>{t("back")}</span>
							</button>
							<div className="modern-login-logo">
								<img
									src="/logo.png"
									alt="Kalina Foundation"
									className="modern-login-logo-img"
								/>
							</div>
						</div>

						<div className="modern-login-header">
							<h1 className="modern-login-title">
								{t("forgot-password-title")}
							</h1>
							<p className="modern-login-subtitle">
								{t("forgot-password-subtitle")}
							</p>
						</div>

						<form className="modern-login-form" onSubmit={handleSubmit}>
							<div className="modern-form-group">
								<label className="modern-form-label" htmlFor="email">
									{t("email")}
								</label>
								<input
									id="email"
									type="email"
									className={`modern-form-input ${errors.email ? "error" : ""}`}
									placeholder={t("forgot-password-email-placeholder")}
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								{errors.email && (
									<div className="modern-error-message">{errors.email}</div>
								)}
							</div>

							<button
								type="submit"
								className="modern-submit-button"
								disabled={loading}
							>
								{t("forgot-password-submit")}
								{loading && <div className="loader"></div>}
							</button>
						</form>

						<div className="modern-login-footer">
							<div className="modern-login-link">
								{t("forgot-password-back-to-login")}{" "}
								<button
									type="button"
									className="modern-link-button"
									onClick={onBackToLogin}
								>
									{t("login")}
								</button>
							</div>
						</div>
					</div>

					{/* Right side - Image */}
					<div className="modern-login-image-side">
						<div className="modern-image-frame">
							{/* Background Image */}
							<img
								src={backgroundImages[currentImageIndex]}
								alt="Professional team working together"
								className="modern-login-background-image"
							/>

							{/* Navigation Dots */}
							<div className="modern-image-dots">
								{backgroundImages.map((_, index) => (
									<button
										key={index}
										className={`modern-dot ${
											index === currentImageIndex ? "active" : ""
										}`}
										onClick={() => goToSlide(index)}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPasswordModal
