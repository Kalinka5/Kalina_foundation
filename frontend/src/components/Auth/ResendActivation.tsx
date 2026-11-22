import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import {
	ACTIVATION_RESEND_COOLDOWN_SECONDS,
	ResendActivationResult,
	isValidEmail,
	resendActivation,
} from "../../lib/auth"
import { useAuthForm } from "../../lib/useAuthForm"
import AuthField from "./AuthField"
import { AuthAlert, AuthSubmit } from "./AuthParts"

async function safeResend(email: string): Promise<ResendActivationResult> {
	try {
		return await resendActivation(email)
	} catch (error) {
		console.error("Resend activation error:", error)
		return "error"
	}
}

const RESULT_KEYS: Record<Exclude<ResendActivationResult, "sent">, string> = {
	throttled: "resend-activation-throttled",
	error: "resend-activation-error",
}

function useCountdown(initialSeconds: number) {
	const [seconds, setSeconds] = useState(initialSeconds)
	useEffect(() => {
		if (seconds <= 0) return
		const id = window.setTimeout(() => setSeconds(s => s - 1), 1000)
		return () => window.clearTimeout(id)
	}, [seconds])
	return [seconds, setSeconds] as const
}

/**
 * "Didn't get the email? Resend it" for when we already know the address
 * (the register confirmation screen). The cooldown starts running right away
 * because registering has just sent the first email.
 */
export function ResendActivationButton({ email }: { email: string }) {
	const { t } = useTranslation()
	const [cooldown, setCooldown] = useCountdown(
		ACTIVATION_RESEND_COOLDOWN_SECONDS
	)
	const [sending, setSending] = useState(false)
	const [result, setResult] = useState<ResendActivationResult | null>(null)

	const send = async () => {
		setSending(true)
		const outcome = await safeResend(email)
		setSending(false)
		setResult(outcome)
		if (outcome === "sent") setCooldown(ACTIVATION_RESEND_COOLDOWN_SECONDS)
	}

	return (
		<div className="auth-resend">
			<p>
				{t("resend-activation-prompt")}{" "}
				<button
					type="button"
					className="auth-text-button"
					onClick={send}
					disabled={cooldown > 0 || sending}
					aria-busy={sending}
				>
					{cooldown > 0
						? t("resend-activation-wait", { seconds: cooldown })
						: t("resend-activation-button")}
				</button>
			</p>
			{result === "sent" && (
				<AuthAlert tone="success">{t("resend-activation-sent")}</AuthAlert>
			)}
			{result && result !== "sent" && (
				<AuthAlert tone="error">{t(RESULT_KEYS[result])}</AuthAlert>
			)}
		</div>
	)
}

const EMAIL_ID = "resend-activation-email"

/** Asks for the email first; used when an activation link has failed. */
export function ResendActivationForm() {
	const { t } = useTranslation()
	const [sentTo, setSentTo] = useState<string | null>(null)

	const form = useAuthForm<"email">({ email: "" }, values => ({
		email: !values.email.trim()
			? "register-email-required"
			: !isValidEmail(values.email)
			? "register-email-invalid"
			: undefined,
	}))

	const onSubmit = form.handleSubmit(async ({ email }) => {
		const outcome = await safeResend(email.trim())
		if (outcome === "sent") setSentTo(email.trim())
		else form.setFormError(RESULT_KEYS[outcome])
	}, () => EMAIL_ID)

	const emailError = form.errorFor("email")

	return (
		<section className="auth-resend-section" aria-labelledby="resend-title">
			<h2 id="resend-title" className="auth-subtitle">
				{t("resend-activation-form-title")}
			</h2>

			{sentTo ? (
				<AuthAlert tone="success">
					{t("resend-activation-form-sent", { email: sentTo })}
				</AuthAlert>
			) : (
				<>
					<p className="auth-resend-text">{t("resend-activation-form-body")}</p>
					{form.formError && (
						<AuthAlert tone="error">{t(form.formError)}</AuthAlert>
					)}
					<form className="auth-form" onSubmit={onSubmit} noValidate>
						<fieldset className="auth-fieldset" disabled={form.submitting}>
							<AuthField
								id={EMAIL_ID}
								label={t("email")}
								type="email"
								autoComplete="email"
								placeholder={t("login-email-placeholder")}
								value={form.values.email}
								onChange={value => form.setValue("email", value)}
								onBlur={() => form.blur("email")}
								error={emailError && t(emailError)}
							/>
						</fieldset>
						<AuthSubmit busy={form.submitting}>
							{t("resend-activation-submit")}
						</AuthSubmit>
					</form>
				</>
			)}
		</section>
	)
}
