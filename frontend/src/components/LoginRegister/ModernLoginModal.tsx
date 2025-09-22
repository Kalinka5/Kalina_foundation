import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGoogle } from "react-icons/fa"
import { IoChevronBack, IoClose, IoEye, IoEyeOff } from "react-icons/io5"

import api from "../../lib/api.js"
import { PROFILE_PAGE, REGISTER_PAGE } from "../../lib/constants.js"
import { TokenResponse } from "../../lib/types.tsx"

import "../../styles/loginRegister/modernLogin.css"

interface ModernLoginModalProps {
	onClose: () => void
}

function ModernLoginModal({ onClose }: ModernLoginModalProps) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<any>({})
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	// Image sliding state
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const backgroundImages = [
		"/img/login-background1.png",
		"/img/login-background2.png",
		"/img/login-background3.png",
	]

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

	// Check for registration success parameter
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		if (urlParams.get("registered") === "true") {
			setShowSuccessMessage(true)
			// Remove the parameter from URL without page reload
			const newUrl = window.location.pathname
			window.history.replaceState({}, document.title, newUrl)

			// Hide success message after 5 seconds
			setTimeout(() => {
				setShowSuccessMessage(false)
			}, 5000)
		}
	}, [])

	// Handle manual navigation
	const goToSlide = (index: number) => {
		setCurrentImageIndex(index)
	}

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// Custom Language Selector Component
	const CustomLanguageSelector = () => {
		const currentLang = i18n.language

		const handleLanguageChange = (lang: string) => {
			i18n.changeLanguage(lang)
			localStorage.setItem("i18nextLng", lang)
		}

		return (
			<div className="custom-language-selector">
				<button
					className={`lang-button ${currentLang === "en" ? "active" : ""}`}
					onClick={() => handleLanguageChange("en")}
				>
					EN
				</button>
				<button
					className={`lang-button ${currentLang === "ua" ? "active" : ""}`}
					onClick={() => handleLanguageChange("ua")}
				>
					UA
				</button>
			</div>
		)
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

		// Simple validation
		const newErrors: any = {}

		if (!email.trim()) {
			newErrors.email = t("login-email-required")
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = t("login-email-invalid")
		}

		if (!password) {
			newErrors.password = t("login-password-required")
		}

		setErrors(newErrors)

		try {
			if (Object.keys(newErrors).length === 0) {
				const response = (await api("token/", {
					method: "POST",
					body: JSON.stringify({ email: email, password: password }),
				})) as TokenResponse

				if (response?.access && response?.refresh) {
					localStorage.setItem("access_token", response.access)
					localStorage.setItem("refresh_token", response.refresh)

					// Redirect to profile page
					window.location.href = PROFILE_PAGE
				} else {
					setErrors({ general: t("login-invalid-credentials") })
				}
			}
		} catch (error) {
			setErrors({ general: t("login-error-message") })
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{/* Success/Error Messages */}
			{showSuccessMessage && (
				<AlertMessage
					message={t("login-registration-success")}
					type="success"
					onClose={() => setShowSuccessMessage(false)}
				/>
			)}
			{errors.general && (
				<AlertMessage
					message={errors.general}
					type="error"
					onClose={() => setErrors({ ...errors, general: null })}
				/>
			)}

			<div className="modern-login-container">
				<div className="modern-login-modal">
					{/* Close Button */}
					<button className="modern-login-close" onClick={onClose}>
						<IoClose />
					</button>

					{/* Left side - Form */}
					<div className="modern-login-form-side">
						<div className="modern-login-top-bar">
							<button className="modern-back-button" onClick={onClose}>
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
							<h1 className="modern-login-title">{t("login-welcome-back")}</h1>
							<p className="modern-login-subtitle">{t("login-subtitle")}</p>
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
									placeholder={t("login-email-placeholder")}
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								{errors.email && (
									<div className="modern-error-message">{errors.email}</div>
								)}
							</div>

							<div className="modern-form-group">
								<label className="modern-form-label" htmlFor="password">
									{t("password")}
								</label>
								<div className="modern-password-container">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										className={`modern-form-input ${
											errors.password ? "error" : ""
										}`}
										placeholder={t("login-password-placeholder")}
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									<button
										type="button"
										className="modern-password-toggle"
										onClick={togglePasswordVisibility}
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}
									>
										{showPassword ? <IoEyeOff /> : <IoEye />}
									</button>
								</div>
								<div className="modern-forgot-password-container">
									<a href="#" className="modern-forgot-password-link">
										{t("login-forgot-password")}
									</a>
								</div>
								{errors.password && (
									<div className="modern-error-message">{errors.password}</div>
								)}
							</div>

							<button
								type="submit"
								className="modern-submit-button"
								disabled={loading}
							>
								{t("login-button")}
								{loading && <div className="loader"></div>}
							</button>
						</form>

						<div className="modern-social-login">
							<button className="modern-social-button" type="button">
								<FaGoogle className="modern-social-icon" />
								{t("login-google")}
							</button>
						</div>

						<div className="modern-login-footer">
							<div className="modern-login-link">
								{t("login-no-account")}{" "}
								<a href={REGISTER_PAGE}>{t("login-register-now")}</a>
							</div>
						</div>
					</div>

					{/* Right side - Image */}
					<div className="modern-login-image-side">
						{/* Language selector positioned on image side */}
						<div className="modern-language-wrapper">
							<CustomLanguageSelector />
						</div>

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
		</>
	)
}

export default ModernLoginModal
