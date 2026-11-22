import { ReactNode, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import {
	IoAlertCircle,
	IoCheckmarkCircle,
	IoMailOpenOutline,
} from "react-icons/io5"

import { PasswordStrength, passwordStrength } from "../../lib/auth"

/* Small presentational pieces shared by the account pages. */

export function AuthAlert({
	tone,
	children,
}: {
	tone: "error" | "success"
	children: ReactNode
}) {
	const Icon = tone === "error" ? IoAlertCircle : IoCheckmarkCircle
	return (
		<div
			className={`auth-alert auth-alert--${tone}`}
			role={tone === "error" ? "alert" : "status"}
		>
			<Icon className="auth-alert-icon" aria-hidden />
			<p>{children}</p>
		</div>
	)
}

export function AuthSubmit({
	busy,
	children,
}: {
	busy: boolean
	children: ReactNode
}) {
	return (
		<button
			type="submit"
			className="btn btn-primary btn-lg btn-block auth-submit"
			disabled={busy}
			aria-busy={busy}
		>
			{busy && <span className="auth-spinner" aria-hidden />}
			{children}
		</button>
	)
}

/** Confirmation screen that replaces a form after it succeeds (or can't be used). */
export function AuthDone({
	tone = "success",
	icon,
	title,
	children,
	actions,
}: {
	tone?: "success" | "error" | "pending"
	/** Overrides the default icon for the tone */
	icon?: ReactNode
	title: string
	children: ReactNode
	actions?: ReactNode
}) {
	const defaultIcon =
		tone === "error" ? (
			<IoAlertCircle />
		) : tone === "pending" ? (
			<span className="auth-spinner" />
		) : (
			<IoMailOpenOutline />
		)
	// Move focus to the new heading so screen readers announce the change
	const headingRef = useRef<HTMLHeadingElement>(null)
	useEffect(() => headingRef.current?.focus(), [])

	return (
		<div
			className={`auth-done auth-done--${tone}`}
			aria-busy={tone === "pending" || undefined}
		>
			<span className="auth-done-icon" aria-hidden>
				{icon ?? defaultIcon}
			</span>
			<h1 className="auth-title" tabIndex={-1} ref={headingRef}>
				{title}
			</h1>
			<p className="auth-lead">{children}</p>
			{actions && <div className="auth-done-actions">{actions}</div>}
		</div>
	)
}

const STRENGTH_KEYS: Record<PasswordStrength, string> = {
	0: "password-strength-too-short",
	1: "password-strength-weak",
	2: "password-strength-fair",
	3: "password-strength-good",
	4: "password-strength-strong",
}

export function PasswordStrengthMeter({
	password,
	id,
}: {
	password: string
	id: string
}) {
	const { t } = useTranslation()
	if (!password) return null

	const score = passwordStrength(password)
	return (
		<div className={`auth-strength auth-strength--${score}`} id={id}>
			<div className="auth-strength-bars" aria-hidden>
				{[1, 2, 3, 4].map(level => (
					<span key={level} className={level <= score ? "is-on" : ""} />
				))}
			</div>
			<p className="auth-strength-label" aria-live="polite">
				{t("password-strength-label")}: {t(STRENGTH_KEYS[score])}
			</p>
		</div>
	)
}
