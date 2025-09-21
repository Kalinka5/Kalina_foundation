import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGoogle } from "react-icons/fa"
import { IoChevronBack, IoClose, IoSend } from "react-icons/io5"

import api from "../lib/api.js"
import { HOME_PAGE, LOGIN_PAGE } from "../lib/constants.js"
import { RegistrationStatus } from "../lib/types.tsx"

import "../styles/loginRegister/modernRegister.css"

function Register() {
	const [registrationStatus, setRegistrationStatus] =
		useState<RegistrationStatus>(null)

	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<any>({})
	const [validFields, setValidFields] = useState<any>({})

	const { t, i18n } = useTranslation()

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

		if (!fullName.trim()) {
			newErrors.fullName = t("register-full-name-required")
		}

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

		setErrors(newErrors)

		try {
			if (Object.keys(newErrors).length === 0) {
				const requestData = {
					username: fullName, // Using fullName as username for backend compatibility
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
					setFullName("")
					setEmail("")
					setPassword("")
					setErrors({})
				} else {
					setRegistrationStatus("error")
					console.log(response)

					// Parse error message if response contains JSON
					try {
						if (response["username"]) {
							setErrors({ fullName: t("register-username-exists") })
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
								<label className="modern-form-label" htmlFor="fullName">
									{t("register-full-name")}
								</label>
								<input
									id="fullName"
									type="text"
									className={`modern-form-input ${
										errors.fullName ? "error" : ""
									}`}
									placeholder={t("register-full-name-placeholder")}
									value={fullName}
									onChange={e => setFullName(e.target.value)}
								/>
								{errors.fullName && (
									<div className="modern-error-message">{errors.fullName}</div>
								)}
							</div>

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
										type="password"
										className={`modern-form-input ${
											errors.password ? "error" : ""
										}`}
										placeholder={t("register-password-placeholder")}
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									<IoSend className="modern-password-icon" />
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
								src="/img/register-background.png"
								alt="Professional team working together"
								className="modern-register-background-image"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register
