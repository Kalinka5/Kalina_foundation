import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useSearchParams } from "react-router-dom"

import AuthField from "../components/Auth/AuthField"
import AuthLayout, { AuthHeading } from "../components/Auth/AuthLayout"
import {
	AuthAlert,
	AuthDone,
	AuthSubmit,
	PasswordStrengthMeter,
} from "../components/Auth/AuthParts"
import { PASSWORD_MIN_LENGTH, resetPassword } from "../lib/auth"
import { FORGOT_PASSWORD_PAGE, LOGIN_PAGE } from "../lib/constants"
import { useAuthForm } from "../lib/useAuthForm"

type Field = "newPassword" | "confirmPassword"

const FIELD_IDS: Record<Field, string> = {
	newPassword: "reset-new-password",
	confirmPassword: "reset-confirm-password",
}

// Reached from the link in the password reset email:
// /reset-password?token=...&email=...
function ResetPassword() {
	const { t } = useTranslation()
	const [searchParams] = useSearchParams()
	const token = searchParams.get("token")
	const email = searchParams.get("email")
	const [done, setDone] = useState(false)

	const form = useAuthForm<Field>(
		{ newPassword: "", confirmPassword: "" },
		values => ({
			newPassword: !values.newPassword
				? "reset-password-new-password-required"
				: values.newPassword.length < PASSWORD_MIN_LENGTH
				? "reset-password-min-length"
				: undefined,
			confirmPassword: !values.confirmPassword
				? "reset-password-confirm-password-required"
				: values.confirmPassword !== values.newPassword
				? "reset-password-passwords-not-match"
				: undefined,
		})
	)

	const onSubmit = form.handleSubmit(async ({ newPassword }) => {
		if (!token || !email) return
		try {
			if (await resetPassword(token, email, newPassword)) {
				setDone(true)
			} else {
				form.setFormError("reset-password-error-message")
			}
		} catch (error) {
			console.error("Reset password error:", error)
			form.setFormError("reset-password-error-message")
		}
	}, field => FIELD_IDS[field])

	const error = (field: Field) => {
		const key = form.errorFor(field)
		return key && t(key)
	}

	let content
	if (!token || !email) {
		content = (
			<AuthDone
				tone="error"
				title={t("reset-password-invalid-title")}
				actions={
					<Link
						to={FORGOT_PASSWORD_PAGE}
						className="btn btn-primary btn-lg btn-block"
					>
						{t("reset-password-request-new")}
					</Link>
				}
			>
				{t("reset-password-invalid-token")}
			</AuthDone>
		)
	} else if (done) {
		content = (
			<AuthDone
				title={t("reset-password-success-title")}
				actions={
					<Link to={LOGIN_PAGE} className="btn btn-primary btn-lg btn-block">
						{t("login-button")}
					</Link>
				}
			>
				{t("reset-password-success-message")}
			</AuthDone>
		)
	} else {
		content = (
			<>
				<AuthHeading
					title={t("reset-password-title")}
					subtitle={t("reset-password-subtitle")}
				/>

				{form.formError && (
					<AuthAlert tone="error">{t(form.formError)}</AuthAlert>
				)}

				<form className="auth-form" onSubmit={onSubmit} noValidate>
					{/* Lets password managers attach the new password to the account */}
					<input
						type="email"
						name="username"
						autoComplete="username"
						value={email}
						readOnly
						hidden
					/>
					<fieldset className="auth-fieldset" disabled={form.submitting}>
						<AuthField
							id={FIELD_IDS.newPassword}
							label={t("reset-password-new-password")}
							type="password"
							autoComplete="new-password"
							value={form.values.newPassword}
							onChange={value => form.setValue("newPassword", value)}
							onBlur={() => form.blur("newPassword")}
							error={error("newPassword")}
							hint={t("password-hint")}
						>
							<PasswordStrengthMeter
								id={`${FIELD_IDS.newPassword}-strength`}
								password={form.values.newPassword}
							/>
						</AuthField>
						<AuthField
							id={FIELD_IDS.confirmPassword}
							label={t("reset-password-confirm-password")}
							type="password"
							autoComplete="new-password"
							value={form.values.confirmPassword}
							onChange={value => form.setValue("confirmPassword", value)}
							onBlur={() => form.blur("confirmPassword")}
							error={error("confirmPassword")}
						/>
					</fieldset>
					<AuthSubmit busy={form.submitting}>
						{t("reset-password-submit")}
					</AuthSubmit>
				</form>
			</>
		)
	}

	return (
		<AuthLayout
			image="/img/login-background1"
			eyebrowKey="home-hero-eyebrow"
			quoteKey="home-mission-statement"
		>
			{content}
		</AuthLayout>
	)
}

export default ResetPassword
