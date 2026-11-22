import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { loginWithGoogle } from "../../lib/auth"
import { PROFILE_PAGE } from "../../lib/constants"
import {
	isGoogleSignInConfigured,
	loadGoogleIdentity,
	setGoogleCredentialHandler,
} from "../../lib/googleIdentity"
import { useAuth } from "../AuthContext"
import { useTheme } from "../ThemeContext"

/** Marks the user as signed in and opens the profile. */
export function useFinishLogin() {
	const { setIsAuthorized } = useAuth()
	const navigate = useNavigate()
	return useCallback(() => {
		setIsAuthorized(true)
		navigate(PROFILE_PAGE, { replace: true })
	}, [navigate, setIsAuthorized])
}

type GoogleSignInProps = {
	text: "continue_with" | "signup_with"
	disabled?: boolean
	/** Receives a translation key when Google sign-in fails */
	onError: (messageKey: string | null) => void
}

/**
 * Google's own rendered button (reliable across browsers, unlike the One Tap
 * prompt) followed by an "or" divider. Renders nothing when Google sign-in
 * isn't configured or the script can't load.
 */
function GoogleSignIn({ text, disabled = false, onError }: GoogleSignInProps) {
	const { t, i18n } = useTranslation()
	const { theme } = useTheme()
	const finishLogin = useFinishLogin()
	const slotRef = useRef<HTMLDivElement>(null)
	const [status, setStatus] = useState<"loading" | "ready" | "failed">(
		isGoogleSignInConfigured() ? "loading" : "failed"
	)
	const [busy, setBusy] = useState(false)

	// Google keeps one callback per page; point it at this button's handler.
	const handleCredential = async ({ credential }: GoogleCredentialResponse) => {
		onError(null)
		setBusy(true)
		try {
			if (credential && (await loginWithGoogle(credential))) {
				finishLogin()
				return
			}
			onError("login-error-message")
		} catch (error) {
			console.error("Google sign-in error:", error)
			onError("login-error-message")
		} finally {
			setBusy(false)
		}
	}
	const handlerRef = useRef(handleCredential)
	handlerRef.current = handleCredential

	useEffect(() => {
		setGoogleCredentialHandler(response => handlerRef.current(response))
		return () => setGoogleCredentialHandler(null)
	}, [])

	// Render (and re-render on theme, language or width change) the button.
	useEffect(() => {
		if (!isGoogleSignInConfigured()) return

		let cancelled = false
		let observer: ResizeObserver | undefined

		loadGoogleIdentity()
			.then(googleId => {
				const slot = slotRef.current
				if (cancelled || !slot) return

				let renderedWidth = 0
				const render = () => {
					// Google accepts 200-400px
					const width = Math.max(200, Math.min(400, Math.floor(slot.clientWidth)))
					if (width === renderedWidth) return
					renderedWidth = width
					slot.replaceChildren()
					googleId.renderButton(slot, {
						type: "standard",
						theme: theme === "dark" ? "filled_black" : "outline",
						size: "large",
						shape: "pill",
						text,
						logo_alignment: "center",
						width,
						locale: i18n.language === "ua" ? "uk" : "en",
					})
				}

				render()
				setStatus("ready")
				observer = new ResizeObserver(render)
				observer.observe(slot)
			})
			.catch(error => {
				if (cancelled) return
				console.warn("Google sign-in unavailable:", error)
				setStatus("failed")
			})

		return () => {
			cancelled = true
			observer?.disconnect()
		}
	}, [theme, i18n.language, text])

	if (status === "failed") return null

	return (
		<>
			<div
				className={`auth-google${status === "loading" ? " is-loading" : ""}${
					disabled || busy ? " is-disabled" : ""
				}`}
				aria-busy={status === "loading" || busy}
			>
				<div ref={slotRef} className="auth-google-slot" />
				{busy && <span className="auth-spinner auth-google-spinner" aria-hidden />}
			</div>
			<div className="auth-divider">
				<span>{t("auth-or")}</span>
			</div>
		</>
	)
}

export default GoogleSignIn
