import { useState } from "react"
import { useTranslation } from "react-i18next"
import { IoArrowBack } from "react-icons/io5"
import { Link, useLocation } from "react-router-dom"

import AuthField from "../components/Auth/AuthField"
import AuthLayout, { AuthHeading } from "../components/Auth/AuthLayout"
import { AuthAlert, AuthDone, AuthSubmit } from "../components/Auth/AuthParts"
import { isValidEmail, requestPasswordReset } from "../lib/auth"
import { LOGIN_PAGE } from "../lib/constants"
import { useAuthForm } from "../lib/useAuthForm"

const EMAIL_ID = "forgot-email"

function ForgotPassword() {
	const { t } = useTranslation()
	const location = useLocation()
	// The login page passes along whatever email was already typed there.
	const initialEmail =
		(location.state as { email?: string } | null)?.email ?? ""
	const [sentTo, setSentTo] = useState<string | null>(null)

	const form = useAuthForm<"email">({ email: initialEmail }, values => ({
		email: !values.email.trim()
			? "forgot-password-email-required"
			: !isValidEmail(values.email)
			? "forgot-password-email-invalid"
			: undefined,
	}))

	const onSubmit = form.handleSubmit(async ({ email }) => {
		try {
			if (await requestPasswordReset(email.trim())) {
				setSentTo(email.trim())
			} else {
				form.setFormError("forgot-password-error-message")
			}
		} catch (error) {
			console.error("Forgot password error:", error)
			form.setFormError("forgot-password-error-message")
		}
	}, () => EMAIL_ID)

	const emailError = form.errorFor("email")

	return (
		<AuthLayout
			image="/img/login-background1"
			eyebrowKey="home-hero-eyebrow"
			quoteKey="home-mission-statement"
		>
			{sentTo ? (
				<AuthDone
					title={t("forgot-password-sent-title")}
					actions={
						<>
							<Link to={LOGIN_PAGE} className="btn btn-primary btn-lg btn-block">
								{t("forgot-password-back-to-login")}
							</Link>
							<button
								type="button"
								className="btn btn-ghost btn-lg btn-block"
								onClick={() => {
									form.reset()
									setSentTo(null)
								}}
							>
								{t("forgot-password-try-again")}
							</button>
						</>
					}
				>
					{t("forgot-password-sent-body", { email: sentTo })}
				</AuthDone>
			) : (
				<>
					<Link to={LOGIN_PAGE} className="auth-back">
						<IoArrowBack aria-hidden />
						{t("forgot-password-back-to-login")}
					</Link>

					<AuthHeading
						title={t("forgot-password-title")}
						subtitle={t("forgot-password-subtitle")}
					/>

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
								placeholder={t("forgot-password-email-placeholder")}
								value={form.values.email}
								onChange={value => form.setValue("email", value)}
								onBlur={() => form.blur("email")}
								error={emailError && t(emailError)}
							/>
						</fieldset>
						<AuthSubmit busy={form.submitting}>
							{t("forgot-password-submit")}
						</AuthSubmit>
					</form>
				</>
			)}
		</AuthLayout>
	)
}

export default ForgotPassword
