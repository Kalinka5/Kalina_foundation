// Google Identity Services will be loaded from the HTML script tag
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGoogle } from "react-icons/fa"
import { IoChevronBack, IoClose, IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import api from "../../lib/api"
import {
	GOOGLE_CLIENT_ID,
	LOGIN_PAGE,
	PROFILE_PAGE,
	REGISTER_PAGE,
	TERMS_CONDITIONS_PAGE,
} from "../../lib/constants"
import { RegistrationStatus, TokenResponse } from "../../lib/types"
import { useAuth } from "../AuthContext"

import "../../styles/loginRegister/modernLogin.css"
import "../../styles/loginRegister/modernRegister.css"

interface ModernAuthModalProps {
	onClose: () => void
	backgroundImages: string[]
	mode: "login" | "register"
}

function ModernAuthModal({
	onClose,
	backgroundImages,
	mode,
}: ModernAuthModalProps) {
	// Common state
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<any>({})
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [registrationStatus, setRegistrationStatus] =
		useState<RegistrationStatus>(null)
	const [showForgotPassword, setShowForgotPassword] = useState(false)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [googleApiReady, setGoogleApiReady] = useState(false)

	// Image sliding state
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const { t, i18n } = useTranslation()
	const { setIsAuthorized } = useAuth()
	const navigate = useNavigate()

	// Auto-slide images every 10 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				prevIndex => (prevIndex + 1) % backgroundImages.length
			)
		}, 10000) // 10 seconds

		return () => clearInterval(interval)
	}, [backgroundImages.length])

	// Initialize Google OAuth with Google Identity Services
	useEffect(() => {
		const initGoogleAuth = () => {
			console.log("🔍 DEBUG: GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID)
			console.log("🔍 DEBUG: Current origin:", window.location.origin)
			console.log(
				"🔍 DEBUG: Google object available:",
				!!(window as any).google
			)

			if (
				GOOGLE_CLIENT_ID &&
				typeof window !== "undefined" &&
				(window as any).google
			) {
				try {
					// Initialize Google Identity Services
					;(window as any).google.accounts.id.initialize({
						client_id: GOOGLE_CLIENT_ID,
						callback: handleGoogleSignInCallback,
						auto_select: false,
						cancel_on_tap_outside: false,
					})
					console.log("✅ Google Identity Services initialized successfully")
					setGoogleApiReady(true)
				} catch (error) {
					console.error(
						"❌ Google Identity Services initialization error:",
						error
					)
					setGoogleApiReady(false)
				}
			} else if (!GOOGLE_CLIENT_ID) {
				console.warn("⚠️ Google Client ID not configured")
			}
		}

		// Wait for Google Identity Services to load
		const checkGoogle = () => {
			if (
				typeof window !== "undefined" &&
				(window as any).google?.accounts?.id
			) {
				initGoogleAuth()
			} else {
				setTimeout(checkGoogle, 100)
			}
		}

		checkGoogle()
	}, [])

	// Check for registration success parameter (only for login mode)
	useEffect(() => {
		if (mode === "login") {
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
		}
	}, [mode])

	// Clear errors when language changes
	useEffect(() => {
		setErrors({})
		setRegistrationStatus(null)
		setShowSuccessMessage(false)
	}, [i18n.language])

	// Auto-dismiss error messages after 10 seconds
	useEffect(() => {
		if (errors.general || registrationStatus === "error") {
			const timer = setTimeout(() => {
				if (errors.general) {
					setErrors(prevErrors => ({ ...prevErrors, general: null }))
				}
				if (registrationStatus === "error") {
					setRegistrationStatus(null)
				}
			}, 10000) // 10 seconds

			return () => clearTimeout(timer)
		}
	}, [errors.general, registrationStatus])

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

	// Handle forgot password transition
	const handleForgotPasswordClick = () => {
		setIsTransitioning(true)
		setTimeout(() => {
			setShowForgotPassword(true)
			setIsTransitioning(false)
		}, 300) // Half of the animation duration
	}

	// Handle back to login transition
	const handleBackToLogin = () => {
		setIsTransitioning(true)
		setTimeout(() => {
			setShowForgotPassword(false)
			setIsTransitioning(false)
			// Clear forgot password form
			setEmail("")
			setErrors({})
		}, 300)
	}

	// Handle Google sign-in callback
	const handleGoogleSignInCallback = async (response: any) => {
		try {
			setLoading(true)
			setErrors({})

			if (!response.credential) {
				throw new Error("No credential received from Google")
			}

			// Send the credential to your backend
			const apiResponse = await api("google-auth/", {
				method: "POST",
				body: JSON.stringify({ id_token: response.credential }),
			})

			if ((apiResponse as any)?.status === "success") {
				// Update authentication state
				setIsAuthorized(true)

				// Redirect to profile page
				navigate(PROFILE_PAGE)
			} else {
				setErrors({ general: t("login-error-message") })
			}
		} catch (error) {
			console.error("Google sign-in error:", error)
			setErrors({ general: t("login-error-message") })
		} finally {
			setLoading(false)
		}
	}

	// Handle Google sign-in button click
	const handleGoogleSignIn = () => {
		try {
			setLoading(true)
			setErrors({})

			// Check if Google Identity Services is available
			if (
				typeof window === "undefined" ||
				!(window as any).google?.accounts?.id
			) {
				throw new Error("Google Identity Services not available")
			}

			// Trigger the Google sign-in popup
			;(window as any).google.accounts.id.prompt((notification: any) => {
				if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
					// The prompt was not displayed or was skipped
					setLoading(false)
					console.log("Google sign-in prompt was not displayed or was skipped")
				}
			})
		} catch (error) {
			console.error("Google sign-in error:", error)
			setErrors({ general: t("login-error-message") })
			setLoading(false)
		}
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
		console.log("Form submitted, showForgotPassword:", showForgotPassword)

		// Validation based on mode
		const newErrors: any = {}

		if (!email.trim()) {
			newErrors.email = showForgotPassword
				? t("forgot-password-email-required")
				: mode === "login"
				? t("login-email-required")
				: t("register-email-required")
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = showForgotPassword
				? t("forgot-password-email-invalid")
				: mode === "login"
				? t("login-email-invalid")
				: t("register-email-invalid")
		}

		// Only validate password if not in forgot password mode
		if (!showForgotPassword) {
			if (!password) {
				newErrors.password =
					mode === "login"
						? t("login-password-required")
						: t("register-password-required")
			} else if (mode === "register" && password.length < 8) {
				newErrors.password = t("register-password-min-length")
			}
		}

		// Additional validation for register mode
		if (mode === "register") {
			if (!confirmPassword) {
				newErrors.confirmPassword = t("register-confirm-password-required")
			} else if (password !== confirmPassword) {
				newErrors.confirmPassword = t("register-passwords-not-match")
			}
		}

		setErrors(newErrors)

		try {
			if (Object.keys(newErrors).length === 0) {
				if (showForgotPassword) {
					// Forgot password logic
					console.log("Submitting forgot password for email:", email)
					const response = await api("forgot-password/", {
						method: "POST",
						body: JSON.stringify({ email: email }),
					})
					console.log("Forgot password response:", response)

					if ((response as any)?.status === "success") {
						setShowSuccessMessage(true)
						// Clear form on success
						setEmail("")
						setErrors({})

						// Go back to login after 3 seconds
						setTimeout(() => {
							handleBackToLogin()
						}, 3000)
					} else {
						setErrors({ general: t("forgot-password-error-message") })
					}
				} else if (mode === "login") {
					// Login logic
					const response = (await api("token/", {
						method: "POST",
						body: JSON.stringify({ email: email, password: password }),
					})) as TokenResponse

					if (response?.access && response?.refresh) {
						localStorage.setItem("access_token", response.access)
						localStorage.setItem("refresh_token", response.refresh)

						// Update authentication state
						setIsAuthorized(true)

						// Redirect to profile page using React Router
						navigate(PROFILE_PAGE)
					} else {
						setErrors({ general: t("login-invalid-credentials") })
					}
				} else {
					// Register logic
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
							navigate(`${LOGIN_PAGE}?registered=true`)
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
			}
		} catch (error) {
			if (mode === "login") {
				setErrors({ general: t("login-error-message") })
			} else {
				setRegistrationStatus("error")
				console.error("Unexpected error:", error)
			}
		} finally {
			setLoading(false)
		}
	}

	// Dynamic CSS classes based on mode
	const containerClass =
		mode === "login" ? "modern-login-container" : "modern-register-container"
	const modalClass =
		mode === "login" ? "modern-login-modal" : "modern-register-modal"
	const formSideClass =
		mode === "login" ? "modern-login-form-side" : "modern-register-form-side"
	const topBarClass =
		mode === "login" ? "modern-login-top-bar" : "modern-register-top-bar"
	const logoClass =
		mode === "login" ? "modern-login-logo" : "modern-register-logo"
	const logoImgClass =
		mode === "login" ? "modern-login-logo-img" : "modern-register-logo-img"
	const headerClass =
		mode === "login" ? "modern-login-header" : "modern-register-header"
	const titleClass =
		mode === "login" ? "modern-login-title" : "modern-register-title"
	const subtitleClass =
		mode === "login" ? "modern-login-subtitle" : "modern-register-subtitle"
	const formClass =
		mode === "login" ? "modern-login-form" : "modern-register-form"
	const footerClass =
		mode === "login" ? "modern-login-footer" : "modern-register-footer"
	const linkClass =
		mode === "login" ? "modern-login-link" : "modern-register-link"
	const imageSideClass =
		mode === "login" ? "modern-login-image-side" : "modern-register-image-side"
	const backgroundImgClass =
		mode === "login"
			? "modern-login-background-image"
			: "modern-register-background-image"
	const closeClass =
		mode === "login" ? "modern-login-close" : "modern-register-close"

	return (
		<>
			{/* Success/Error Messages */}
			{mode === "login" && showSuccessMessage && (
				<AlertMessage
					message={t("login-registration-success")}
					type="success"
					onClose={() => setShowSuccessMessage(false)}
				/>
			)}
			{mode === "login" && errors.general && (
				<AlertMessage
					message={errors.general}
					type="error"
					onClose={() => setErrors({ ...errors, general: null })}
				/>
			)}
			{mode === "register" && registrationStatus === "success" && (
				<AlertMessage
					message={t("register-success-message")}
					type="success"
					onClose={() => setRegistrationStatus(null)}
				/>
			)}
			{mode === "register" && registrationStatus === "error" && (
				<AlertMessage
					message={t("register-error-message")}
					type="error"
					onClose={() => setRegistrationStatus(null)}
				/>
			)}

			<div className={containerClass}>
				<div className={modalClass}>
					{/* Close Button */}
					<button className={closeClass} onClick={onClose}>
						<IoClose />
					</button>

					{/* Left side - Form */}
					<div className={formSideClass}>
						<div className={topBarClass}>
							<button className="modern-back-button" onClick={onClose}>
								<IoChevronBack />
								<span>{t("back")}</span>
							</button>
							<div className={logoClass}>
								<img
									src="/logo.png"
									alt="Kalina Foundation"
									className={logoImgClass}
								/>
							</div>
						</div>

						<div className={headerClass}>
							<h1 className={titleClass}>
								{showForgotPassword
									? t("forgot-password-title")
									: mode === "login"
									? t("login-welcome-back")
									: t("register-create-account")}
							</h1>
							<p className={subtitleClass}>
								{showForgotPassword
									? t("forgot-password-subtitle")
									: mode === "login"
									? t("login-subtitle")
									: t("register-subtitle")}
							</p>
						</div>

						<form className={formClass} onSubmit={handleSubmit}>
							<div className="modern-form-group">
								<label className="modern-form-label" htmlFor="email">
									{showForgotPassword
										? t("email")
										: mode === "login"
										? t("email")
										: t("register-email")}
								</label>
								<input
									id="email"
									type="email"
									className={`modern-form-input ${errors.email ? "error" : ""}`}
									placeholder={
										showForgotPassword
											? t("forgot-password-email-placeholder")
											: mode === "login"
											? t("login-email-placeholder")
											: t("register-email-placeholder")
									}
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								{errors.email && (
									<div className="modern-error-message">{errors.email}</div>
								)}
							</div>

							<div
								className={`modern-form-group ${
									showForgotPassword ? "hidden" : "visible"
								}`}
							>
								<label className="modern-form-label" htmlFor="password">
									{mode === "login" ? t("password") : t("register-password")}
								</label>
								<div className="modern-password-container">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										className={`modern-form-input ${
											errors.password ? "error" : ""
										}`}
										placeholder={
											mode === "login"
												? t("login-password-placeholder")
												: t("register-password-placeholder")
										}
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
								{mode === "login" && (
									<div className="modern-forgot-password-container">
										<button
											type="button"
											className="modern-forgot-password-link"
											onClick={handleForgotPasswordClick}
										>
											{t("login-forgot-password")}
										</button>
									</div>
								)}
								{errors.password && (
									<div className="modern-error-message">{errors.password}</div>
								)}
							</div>

							{/* Confirm Password field - only for register mode */}
							{mode === "register" && (
								<div className="modern-form-group">
									<label
										className="modern-form-label"
										htmlFor="confirmPassword"
									>
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
							)}

							<button
								type="submit"
								className="modern-submit-button"
								disabled={loading}
							>
								{showForgotPassword
									? t("forgot-password-submit")
									: mode === "login"
									? t("login-button")
									: t("register-submit")}
								{loading && <div className="loader"></div>}
							</button>
						</form>

						<div className="modern-social-login">
							<button
								className="modern-social-button"
								type="button"
								onClick={handleGoogleSignIn}
								disabled={loading || !googleApiReady || !GOOGLE_CLIENT_ID}
							>
								<FaGoogle className="modern-social-icon" />
								{mode === "login" ? t("login-google") : t("register-google")}
								{loading && <div className="loader"></div>}
							</button>
						</div>

						<div className={footerClass}>
							<div className={linkClass}>
								{showForgotPassword ? (
									<>
										{t("forgot-password-back-to-login")}{" "}
										<button
											type="button"
											className="modern-link-button"
											onClick={handleBackToLogin}
										>
											{t("login")}
										</button>
									</>
								) : mode === "login" ? (
									<>
										{t("login-no-account")}{" "}
										<a href={REGISTER_PAGE}>{t("login-register-now")}</a>
									</>
								) : (
									<>
										{t("register-have-account")}{" "}
										<a href={LOGIN_PAGE}>{t("register-sign-in")}</a>
									</>
								)}
							</div>
							{mode === "register" && (
								<button
									type="button"
									className="modern-terms-link"
									onClick={() => navigate(TERMS_CONDITIONS_PAGE)}
								>
									{t("register-terms")}
								</button>
							)}
						</div>
					</div>

					{/* Right side - Image */}
					<div className={imageSideClass}>
						<div className="modern-image-frame">
							{/* Background Image */}
							<img
								src={backgroundImages[currentImageIndex]}
								alt="Professional team working together"
								className={backgroundImgClass}
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

export default ModernAuthModal
