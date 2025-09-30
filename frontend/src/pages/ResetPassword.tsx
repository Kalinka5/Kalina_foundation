import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IoCheckmark, IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate, useSearchParams } from "react-router-dom"

import api from "../lib/api"
import { LOGIN_PAGE } from "../lib/constants"

import "../styles/loginRegister/modernLogin.css"
import "../styles/loginRegister/modernRegister.css"

function ResetPassword() {
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<any>({})
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [token, setToken] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)

	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	// Extract token and email from URL parameters
	useEffect(() => {
		const tokenParam = searchParams.get("token")
		const emailParam = searchParams.get("email")

		if (!tokenParam || !emailParam) {
			setErrors({ general: t("reset-password-invalid-token") })
		} else {
			setToken(tokenParam)
			setEmail(emailParam)
		}
	}, [searchParams, t])

	// Clear errors when language changes
	useEffect(() => {
		setErrors({})
		setShowSuccessMessage(false)
	}, [i18n.language])

	// Auto-dismiss success message after 3 seconds
	useEffect(() => {
		if (showSuccessMessage) {
			const timer = setTimeout(() => {
				navigate(LOGIN_PAGE)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [showSuccessMessage, navigate])

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

		// Validation
		const newErrors: any = {}

		if (!newPassword) {
			newErrors.newPassword = t("reset-password-new-password-required")
		} else if (newPassword.length < 8) {
			newErrors.newPassword = t("reset-password-min-length")
		}

		if (!confirmPassword) {
			newErrors.confirmPassword = t("reset-password-confirm-password-required")
		} else if (newPassword !== confirmPassword) {
			newErrors.confirmPassword = t("reset-password-passwords-not-match")
		}

		setErrors(newErrors)

		try {
			if (Object.keys(newErrors).length === 0 && token && email) {
				// Call reset password API
				const response = await api("reset-password/", {
					method: "POST",
					body: JSON.stringify({
						token: token,
						email: email,
						new_password: newPassword,
					}),
				})

				if ((response as any)?.status === "success") {
					setShowSuccessMessage(true)
					// Clear form on success
					setNewPassword("")
					setConfirmPassword("")
					setErrors({})
				} else {
					setErrors({ general: t("reset-password-error-message") })
				}
			}
		} catch (error) {
			setErrors({ general: t("reset-password-error-message") })
			console.error("Reset password error:", error)
		} finally {
			setLoading(false)
		}
	}

	// If no token or email, show error
	if (!token || !email) {
		return (
			<div className="reset-password-container">
				<div className="reset-password-modal">
					<div className="reset-password-logo">
						<img
							src="/logo.png"
							alt="Kalina Foundation"
							className="reset-password-logo-img"
						/>
					</div>
					<div className="reset-password-header">
						<h1 className="reset-password-title">
							{t("reset-password-title")}
						</h1>
						<p className="reset-password-subtitle">
							{t("reset-password-invalid-token")}
						</p>
					</div>
					<div className="reset-password-footer">
						<button
							type="button"
							className="reset-password-back-button"
							onClick={() => navigate(LOGIN_PAGE)}
						>
							{t("back")} {t("login")}
						</button>
					</div>
					<div className="reset-password-language">
						<CustomLanguageSelector />
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Success Message */}
			{showSuccessMessage && (
				<AlertMessage
					message={t("reset-password-success-message")}
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

			<div className="reset-password-container">
				<div className="reset-password-modal">
					<div className="reset-password-logo">
						<img
							src="/logo.png"
							alt="Kalina Foundation"
							className="reset-password-logo-img"
						/>
					</div>

					<div className="reset-password-header">
						<h1 className="reset-password-title">
							{t("reset-password-title")}
						</h1>
						<p className="reset-password-subtitle">
							{t("reset-password-subtitle")}
						</p>
					</div>

					<form className="reset-password-form" onSubmit={handleSubmit}>
						<div className="reset-password-form-group">
							<label className="reset-password-label" htmlFor="newPassword">
								{t("reset-password-new-password")}
							</label>
							<div className="reset-password-input-container">
								<input
									id="newPassword"
									type={showPassword ? "text" : "password"}
									className={`reset-password-input ${
										errors.newPassword ? "error" : ""
									}`}
									placeholder={t("reset-password-new-password-placeholder")}
									value={newPassword}
									onChange={e => setNewPassword(e.target.value)}
								/>
								<button
									type="button"
									className="reset-password-toggle"
									onClick={togglePasswordVisibility}
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? <IoEyeOff /> : <IoEye />}
								</button>
							</div>
							{errors.newPassword && (
								<div className="reset-password-error">{errors.newPassword}</div>
							)}
						</div>

						<div className="reset-password-form-group">
							<label className="reset-password-label" htmlFor="confirmPassword">
								{t("reset-password-confirm-password")}
							</label>
							<div className="reset-password-input-container">
								<input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									className={`reset-password-input ${
										errors.confirmPassword ? "error" : ""
									}`}
									placeholder={t("reset-password-confirm-password-placeholder")}
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
								<button
									type="button"
									className="reset-password-toggle"
									onClick={toggleConfirmPasswordVisibility}
									aria-label={
										showConfirmPassword ? "Hide password" : "Show password"
									}
								>
									{showConfirmPassword ? <IoEyeOff /> : <IoEye />}
								</button>
							</div>
							{errors.confirmPassword && (
								<div className="reset-password-error">
									{errors.confirmPassword}
								</div>
							)}
						</div>

						{/* Password Requirements */}
						<div className="reset-password-requirements">
							<h4 className="reset-password-requirements-title">
								{t("reset-password-requirements-title")}
							</h4>
							<div className="reset-password-requirement">
								<IoCheckmark className="reset-password-checkmark" />
								<span className="reset-password-requirement-text">
									{t("reset-password-min-length-requirement")}
								</span>
							</div>
						</div>

						<button
							type="submit"
							className="reset-password-submit"
							disabled={loading}
						>
							{t("reset-password-submit")}
							{loading && <div className="reset-password-loader"></div>}
						</button>
					</form>

					<div className="reset-password-footer">
						<button
							type="button"
							className="reset-password-back-button"
							onClick={() => navigate(LOGIN_PAGE)}
						>
							{t("back")} {t("login")}
						</button>
					</div>

					<div className="reset-password-language">
						<CustomLanguageSelector />
					</div>
				</div>
			</div>
		</>
	)
}

export default ResetPassword
