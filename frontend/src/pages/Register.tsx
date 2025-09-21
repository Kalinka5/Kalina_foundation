import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGoogle } from "react-icons/fa"
import { IoChevronBack, IoClose, IoEye, IoEyeOff } from "react-icons/io5"

import api from "../lib/api.js"
import { HOME_PAGE, LOGIN_PAGE } from "../lib/constants.js"
import { RegistrationStatus } from "../lib/types.tsx"

import "../styles/loginRegister/modernRegister.css"

function Register() {
	const [registrationStatus, setRegistrationStatus] =
		useState<RegistrationStatus>(null)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<any>({})
	const [validFields, setValidFields] = useState<any>({})

	// Password visibility states
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	// Image sliding state
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const backgroundImages = [
		"/img/register-background.png",
		"/img/register-background2.png",
		"/img/register-background3.png",
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

	// Handle manual navigation
	const goToSlide = (index: number) => {
		setCurrentImageIndex(index)
	}

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword)
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

		// Simple validation for the modern form
		const newErrors: any = {}

		if (!email.trim()) {
			newErrors.email = t("register-email-required")
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = t("register-email-invalid")
		}

		if (!password) {
			newErrors.password = t("register-password-required")
		} else if (password.length < 8) {
			newErrors.password = t("register-password-min-length")
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = t("register-confirm-password-required")
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = t("register-passwords-not-match")
		}

		setErrors(newErrors)

		try {
			if (Object.keys(newErrors).length === 0) {
				const requestData = {
					username: email, // Using email as username for backend compatibility
					email: email,
					password: password,
				}

				const response = await api("register", {
					method: "POST",
					body: JSON.stringify(requestData),
				})

				// Handle HTTP errors
				if (response.ok) {
					setRegistrationStatus("success")
					// Clear form on success
					setEmail("")
					setPassword("")
					setConfirmPassword("")
					setErrors({})

					// Redirect to login page after 2 seconds
					setTimeout(() => {
						window.location.href = `${LOGIN_PAGE}?registered=true`
					}, 2000)
				} else {
					setRegistrationStatus("error")
					console.log(response)

					// Parse error message if response contains JSON
					try {
						if (response["username"]) {
							setErrors({ email: t("register-username-exists") })
						} else if (response["email"]) {
							setErrors({ email: t("register-email-exists") })
						}
					} catch {
						// Handle non-JSON errors
						console.error("Unexpected error:", response)
					}
				}
			}
		} catch (error) {
			setRegistrationStatus("error")
			console.error("Unexpected error:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{/* Success/Error Messages */}
			{registrationStatus === "success" && (
				<AlertMessage
					message={t("register-success-message")}
					type="success"
					onClose={() => setRegistrationStatus(null)}
				/>
			)}
			{registrationStatus === "error" && (
				<AlertMessage
					message={t("register-error-message")}
					type="error"
					onClose={() => setRegistrationStatus(null)}
				/>
			)}

			<div className="modern-register-container">
				<div className="modern-register-modal">
					{/* Close Button */}
					<button
						className="modern-register-close"
						onClick={() => (window.location.href = HOME_PAGE)}
					>
						<IoClose />
					</button>

					{/* Left side - Form */}
					<div className="modern-register-form-side">
						<div className="modern-register-top-bar">
							<button
								className="modern-back-button"
								onClick={() => (window.location.href = HOME_PAGE)}
							>
								<IoChevronBack />
								<span>{t("back")}</span>
							</button>
							<div className="modern-register-logo">
								<img
									src="/logo.png"
									alt="Kalina Foundation"
									className="modern-register-logo-img"
								/>
							</div>
						</div>

						<div className="modern-register-header">
							<h1 className="modern-register-title">
								{t("register-create-account")}
							</h1>
							<p className="modern-register-subtitle">
								{t("register-subtitle")}
							</p>
						</div>

						<form className="modern-register-form" onSubmit={handleSubmit}>
							<div className="modern-form-group">
								<label className="modern-form-label" htmlFor="email">
									{t("register-email")}
								</label>
								<input
									id="email"
									type="email"
									className={`modern-form-input ${errors.email ? "error" : ""}`}
									placeholder={t("register-email-placeholder")}
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								{errors.email && (
									<div className="modern-error-message">{errors.email}</div>
								)}
							</div>

							<div className="modern-form-group">
								<label className="modern-form-label" htmlFor="password">
									{t("register-password")}
								</label>
								<div className="modern-password-container">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										className={`modern-form-input ${
											errors.password ? "error" : ""
										}`}
										placeholder={t("register-password-placeholder")}
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
								{errors.password && (
									<div className="modern-error-message">{errors.password}</div>
								)}
							</div>

							<div className="modern-form-group">
								<label className="modern-form-label" htmlFor="confirmPassword">
									{t("register-confirm-password")}
								</label>
								<div className="modern-password-container">
									<input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										className={`modern-form-input ${
											errors.confirmPassword ? "error" : ""
										}`}
										placeholder={t("register-confirm-password-placeholder")}
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
									/>
									<button
										type="button"
										className="modern-password-toggle"
										onClick={toggleConfirmPasswordVisibility}
										aria-label={
											showConfirmPassword ? "Hide password" : "Show password"
										}
									>
										{showConfirmPassword ? <IoEyeOff /> : <IoEye />}
									</button>
								</div>
								{errors.confirmPassword && (
									<div className="modern-error-message">
										{errors.confirmPassword}
									</div>
								)}
							</div>

							<button
								type="submit"
								className="modern-submit-button"
								disabled={loading}
							>
								{t("register-submit")}
								{loading && <div className="loader"></div>}
							</button>
						</form>

						<div className="modern-social-login">
							<button className="modern-social-button" type="button">
								<FaGoogle className="modern-social-icon" />
								{t("register-google")}
							</button>
						</div>

						<div className="modern-register-footer">
							<div className="modern-register-link">
								{t("register-have-account")}{" "}
								<a href={LOGIN_PAGE}>{t("register-sign-in")}</a>
							</div>
							<a href="#" className="modern-terms-link">
								{t("register-terms")}
							</a>
						</div>
					</div>

					{/* Right side - Image */}
					<div className="modern-register-image-side">
						{/* Language selector positioned on image side */}
						<div className="modern-language-wrapper">
							<CustomLanguageSelector />
						</div>

						<div className="modern-image-frame">
							{/* Background Image */}
							<img
								src={backgroundImages[currentImageIndex]}
								alt="Professional team working together"
								className="modern-register-background-image"
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

export default Register
