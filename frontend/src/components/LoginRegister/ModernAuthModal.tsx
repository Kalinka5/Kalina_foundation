// Google Identity Services will be loaded from the HTML script tag
import { useMediaQuery } from "@uidotdev/usehooks"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGoogle } from "react-icons/fa"
import { IoChevronBack, IoClose, IoEye, IoEyeOff } from "react-icons/io5"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

import api from "../../lib/api"
import {
	ACCESS_TOKEN,
	GOOGLE_CLIENT_ID,
	LOGIN_PAGE,
	PROFILE_PAGE,
	REFRESH_TOKEN,
	REGISTER_PAGE,
	TERMS_CONDITIONS_PAGE,
} from "../../lib/constants"
import { RegistrationStatus, TokenResponse } from "../../lib/types"
import { useAuth } from "../AuthContext"

import "../../styles/loginRegister/modernLogin.css"
import "../../styles/loginRegister/modernRegister.css"

type GoogleCredentialResponse = { credential?: string }

type GooglePromptNotification = {
	isNotDisplayed?: () => boolean
}

declare global {
	interface Window {
		google?: {
			accounts?: {
				id?: {
					initialize: (config: {
						client_id: string
						callback: (response: GoogleCredentialResponse) => void
						auto_select?: boolean
						cancel_on_tap_outside?: boolean
					}) => void
					prompt: (
						listener?: (notification: GooglePromptNotification) => void
					) => void
					cancel: () => void
				}
			}
		}
	}
}

type SuccessMessageKey =
	| "login-registration-success"
	| "forgot-password-success-message"

type GoogleAuthResponse = {
	status?: string
	tokens?: TokenResponse
}

// How long to wait for the Google Identity Services script before giving up
const GOOGLE_SCRIPT_POLL_MS = 100
const GOOGLE_SCRIPT_MAX_ATTEMPTS = 100 // ~10 seconds

// The image side is hidden below this width (see modernLogin/modernRegister.css),
// so the background images are not rendered or downloaded there.
const IMAGE_SIDE_QUERY = "(min-width: 769px)"

const saveTokens = (access: string, refresh: string) => {
	localStorage.setItem(ACCESS_TOKEN, access)
	localStorage.setItem(REFRESH_TOKEN, refresh)
}

// Background images are passed as base paths ("/img/login-background1");
// optimize-images.cjs generates the -small/-medium/full-size WebP variants.
const imageSrcSet = (base: string) =>
	`${base}-small.webp 400w, ${base}-medium.webp 600w, ${base}.webp 800w`

function AlertMessage({
	message,
	type,
	onClose,
	closeLabel,
}: {
	message: string
	type: "success" | "error"
	onClose: () => void
	closeLabel: string
}) {
	return (
		<div className="modern-alert-container">
			<div
				className={`modern-alert ${type}`}
				role={type === "error" ? "alert" : "status"}
			>
				<span>{message}</span>
				<button
					type="button"
					className="modern-alert-close"
					onClick={onClose}
					aria-label={closeLabel}
				>
					×
				</button>
			</div>
		</div>
	)
}

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
	const [successMessageKey, setSuccessMessageKey] =
		useState<SuccessMessageKey | null>(null)
	const [registrationStatus, setRegistrationStatus] =
		useState<RegistrationStatus>(null)
	const [showForgotPassword, setShowForgotPassword] = useState(false)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [googleApiReady, setGoogleApiReady] = useState(false)

	// Image sliding state
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const showImageSide = useMediaQuery(IMAGE_SIDE_QUERY)

	const { t, i18n } = useTranslation()
	const { setIsAuthorized } = useAuth()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()

	// Timeouts scheduled from event handlers; cleared on unmount so a delayed
	// redirect or state update never fires after the user has left the page.
	const timeoutsRef = useRef<number[]>([])
	const schedule = useCallback((fn: () => void, ms: number) => {
		const id = window.setTimeout(() => {
			timeoutsRef.current = timeoutsRef.current.filter(t => t !== id)
			fn()
		}, ms)
		timeoutsRef.current.push(id)
	}, [])
	useEffect(() => {
		const timeouts = timeoutsRef
		return () => timeouts.current.forEach(clearTimeout)
	}, [])

	// Auto-slide images every 10 seconds
	useEffect(() => {
		if (!showImageSide) return
		const interval = setInterval(() => {
			setCurrentImageIndex(
				prevIndex => (prevIndex + 1) % backgroundImages.length
			)
		}, 10000) // 10 seconds

		return () => clearInterval(interval)
	}, [backgroundImages.length, showImageSide])

	// Handle Google sign-in callback
	const handleGoogleSignInCallback = async (
		response: GoogleCredentialResponse
	) => {
		try {
			setLoading(true)
			setErrors({})

			if (!response.credential) {
				throw new Error("No credential received from Google")
			}

			// Send the credential to your backend
			const apiResponse = (await api("google-auth/", {
				method: "POST",
				body: JSON.stringify({ id_token: response.credential }),
			})) as GoogleAuthResponse

			const tokens = apiResponse?.tokens
			if (
				apiResponse?.status === "success" &&
				tokens?.access &&
				tokens?.refresh
			) {
				saveTokens(tokens.access, tokens.refresh)

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

	// Google keeps the callback passed to initialize() for the lifetime of the
	// page, so route it through a ref to always use the latest render's
	// translations and navigation.
	const googleCallbackRef = useRef(handleGoogleSignInCallback)
	googleCallbackRef.current = handleGoogleSignInCallback

	// Initialize Google OAuth with Google Identity Services
	useEffect(() => {
		if (!GOOGLE_CLIENT_ID) {
			console.warn("Google Client ID not configured")
			return
		}

		let cancelled = false
		let attempts = 0
		let timer: number | undefined

		// Wait for the async Google Identity Services script to load
		const init = () => {
			if (cancelled) return

			const googleId = window.google?.accounts?.id
			if (!googleId) {
				attempts += 1
				if (attempts < GOOGLE_SCRIPT_MAX_ATTEMPTS) {
					timer = window.setTimeout(init, GOOGLE_SCRIPT_POLL_MS)
				} else {
					console.warn("Google Identity Services script did not load")
				}
				return
			}

			try {
				googleId.initialize({
					client_id: GOOGLE_CLIENT_ID,
					callback: response => googleCallbackRef.current(response),
					auto_select: false,
					cancel_on_tap_outside: false,
				})
				setGoogleApiReady(true)
			} catch (error) {
				console.error("Google Identity Services initialization error:", error)
				setGoogleApiReady(false)
			}
		}

		init()

		return () => {
			cancelled = true
			window.clearTimeout(timer)
			window.google?.accounts?.id?.cancel()
		}
	}, [])

	// Check for registration success parameter (only for login mode)
	useEffect(() => {
		if (mode !== "login" || searchParams.get("registered") !== "true") return

		setSuccessMessageKey("login-registration-success")
		// Remove the parameter from the URL without a page reload
		setSearchParams({}, { replace: true })
	}, [mode, searchParams, setSearchParams])

	// Hide the success message after 5 seconds
	useEffect(() => {
		if (!successMessageKey) return
		const timer = setTimeout(() => setSuccessMessageKey(null), 5000)
		return () => clearTimeout(timer)
	}, [successMessageKey])

	// Clear errors when language changes. Skips the initial render, which
	// would otherwise wipe the "registered" success message set above.
	const languageRef = useRef(i18n.language)
	useEffect(() => {
		if (languageRef.current === i18n.language) return
		languageRef.current = i18n.language
		setErrors({})
		setRegistrationStatus(null)
		setSuccessMessageKey(null)
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
		schedule(() => {
			setShowForgotPassword(true)
			setIsTransitioning(false)
		}, 300) // Half of the animation duration
	}

	// Handle back to login transition
	const handleBackToLogin = () => {
		setIsTransitioning(true)
		schedule(() => {
			setShowForgotPassword(false)
			setIsTransitioning(false)
			// Clear forgot password form
			setEmail("")
			setErrors({})
		}, 300)
	}

	// Handle Google sign-in button click
	const handleGoogleSignIn = () => {
		setErrors({})

		const googleId = window.google?.accounts?.id
		if (!googleId) {
			console.error("Google Identity Services not available")
			setErrors({ general: t("login-error-message") })
			return
		}

		// Loading starts in the callback, once Google returns a credential.
		// The prompt may be dismissed or never shown, and in that case no
		// callback arrives, so setting loading here could leave the form
		// disabled.
		googleId.prompt(notification => {
			if (notification.isNotDisplayed?.()) {
				setErrors({ general: t("login-error-message") })
			}
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true)
		e.preventDefault()

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
					const response = await api("forgot-password/", {
						method: "POST",
						body: JSON.stringify({ email: email }),
					})

					if ((response as any)?.status === "success") {
						setSuccessMessageKey("forgot-password-success-message")
						// Clear form on success
						setEmail("")
						setErrors({})

						// Go back to login after 3 seconds
						schedule(handleBackToLogin, 3000)
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
						saveTokens(response.access, response.refresh)

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

					// The backend returns { ok: true } on success and
					// field errors ({ email: [...] }) on validation failure
					if (response?.ok) {
						setRegistrationStatus("success")
						// Clear form on success
						setEmail("")
						setPassword("")
						setConfirmPassword("")
						setErrors({})

						// Redirect to login page after 2 seconds
						schedule(() => navigate(`${LOGIN_PAGE}?registered=true`), 2000)
					} else {
						setRegistrationStatus("error")

						if (response?.["username"]) {
							setErrors({ email: t("register-username-exists") })
						} else if (response?.["email"]) {
							setErrors({ email: t("register-email-exists") })
						}
					}
				}
			}
		} catch (error) {
			console.error("Auth request error:", error)
			if (mode === "login") {
				setErrors({ general: t("login-error-message") })
			} else {
				setRegistrationStatus("error")
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

	const closeLabel = t("close")

	return (
		<>
			{/* Success/Error Messages */}
			{mode === "login" && successMessageKey && (
				<AlertMessage
					message={t(successMessageKey)}
					type="success"
					onClose={() => setSuccessMessageKey(null)}
					closeLabel={closeLabel}
				/>
			)}
			{mode === "login" && errors.general && (
				<AlertMessage
					message={errors.general}
					type="error"
					onClose={() => setErrors({ ...errors, general: null })}
					closeLabel={closeLabel}
				/>
			)}
			{mode === "register" && registrationStatus === "success" && (
				<AlertMessage
					message={t("register-success-message")}
					type="success"
					onClose={() => setRegistrationStatus(null)}
					closeLabel={closeLabel}
				/>
			)}
			{mode === "register" && registrationStatus === "error" && (
				<AlertMessage
					message={t("register-error-message")}
					type="error"
					onClose={() => setRegistrationStatus(null)}
					closeLabel={closeLabel}
				/>
			)}

			<div className={containerClass}>
				<div className={modalClass}>
					{/* Close Button */}
					<button
						type="button"
						className={closeClass}
						onClick={onClose}
						aria-label={closeLabel}
					>
						<IoClose />
					</button>

					{/* Left side - Form */}
					<div className={formSideClass}>
						<div className={topBarClass}>
							<button
								type="button"
								className="modern-back-button"
								onClick={onClose}
							>
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
										<Link to={REGISTER_PAGE}>{t("login-register-now")}</Link>
									</>
								) : (
									<>
										{t("register-have-account")}{" "}
										<Link to={LOGIN_PAGE}>{t("register-sign-in")}</Link>
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

					{/* Right side - Image (hidden on small screens) */}
					{showImageSide && (
						<div className={imageSideClass}>
							<div className="modern-image-frame">
								<img
									src={`${backgroundImages[currentImageIndex]}.webp`}
									srcSet={imageSrcSet(backgroundImages[currentImageIndex])}
									sizes="(max-width: 1200px) 60vw, 720px"
									alt=""
									className={backgroundImgClass}
								/>

								{/* Navigation Dots */}
								<div className="modern-image-dots">
									{backgroundImages.map((_, index) => (
										<button
											key={index}
											type="button"
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
					)}
				</div>
			</div>
		</>
	)
}

export default ModernAuthModal
