import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, Navigate } from "react-router-dom"

import AuthField from "../components/Auth/AuthField"
import AuthLayout, { AuthHeading } from "../components/Auth/AuthLayout"
import {
	AuthAlert,
	AuthDone,
	AuthSubmit,
	PasswordStrengthMeter,
} from "../components/Auth/AuthParts"
import GoogleSignIn from "../components/Auth/GoogleSignIn"
import { ResendActivationButton } from "../components/Auth/ResendActivation"
import { useAuth } from "../components/AuthContext"
import { PASSWORD_MIN_LENGTH, isValidEmail, register } from "../lib/auth"
import {
	LOGIN_PAGE,
	PROFILE_PAGE,
	TERMS_CONDITIONS_PAGE,
} from "../lib/constants"
import { useAuthForm } from "../lib/useAuthForm"

type Field = "email" | "password" | "confirmPassword"

const FIELD_IDS: Record<Field, string> = {
	email: "register-email",
	password: "register-password",
	confirmPassword: "register-confirm-password",
}

function Register() {
	const { t } = useTranslation()
	const { isAuthorized } = useAuth()
	const [registeredEmail, setRegisteredEmail] = useState<string | null>(null)

	const form = useAuthForm<Field>(
		{ email: "", password: "", confirmPassword: "" },
		values => ({
			email: !values.email.trim()
				? "register-email-required"
				: !isValidEmail(values.email)
				? "register-email-invalid"
				: undefined,
			password: !values.password
				? "register-password-required"
				: values.password.length < PASSWORD_MIN_LENGTH
				? "register-password-min-length"
				: undefined,
			confirmPassword: !values.confirmPassword
				? "register-confirm-password-required"
				: values.confirmPassword !== values.password
				? "register-passwords-not-match"
				: undefined,
		})
	)

	const onSubmit = form.handleSubmit(async ({ email, password }) => {
		try {
			const result = await register(email.trim(), password)
			if (result.ok) {
				setRegisteredEmail(email.trim())
			} else if (result.field) {
				form.setServerErrors({ [result.field]: result.messageKey })
				document.getElementById(FIELD_IDS[result.field])?.focus()
			} else {
				form.setFormError(result.messageKey)
			}
		} catch (error) {
			console.error("Registration error:", error)
			form.setFormError("register-error-message")
		}
	}, field => FIELD_IDS[field])

	if (isAuthorized) return <Navigate to={PROFILE_PAGE} replace />

	const error = (field: Field) => {
		const key = form.errorFor(field)
		return key && t(key)
	}

	return (
		<AuthLayout
			image="/img/register-background1"
			eyebrowKey="home-hero-eyebrow"
			quoteKey="home-hero-title"
		>
			{registeredEmail ? (
				<>
					<AuthDone
						title={t("register-success-title")}
						actions={
							<Link to={LOGIN_PAGE} className="btn btn-primary btn-lg btn-block">
								{t("register-success-login")}
							</Link>
						}
					>
						{t("register-success-body", { email: registeredEmail })}
					</AuthDone>
					<ResendActivationButton email={registeredEmail} />
				</>
			) : (
				<>
					<AuthHeading
						title={t("register-create-account")}
						subtitle={t("register-subtitle")}
					/>

					{form.formError && (
						<AuthAlert tone="error">{t(form.formError)}</AuthAlert>
					)}

					<GoogleSignIn
						text="signup_with"
						disabled={form.submitting}
						onError={form.setFormError}
					/>

					<form className="auth-form" onSubmit={onSubmit} noValidate>
						<fieldset className="auth-fieldset" disabled={form.submitting}>
							<AuthField
								id={FIELD_IDS.email}
								label={t("register-email")}
								type="email"
								autoComplete="email"
								placeholder={t("login-email-placeholder")}
								value={form.values.email}
								onChange={value => form.setValue("email", value)}
								onBlur={() => form.blur("email")}
								error={error("email")}
							/>
							<AuthField
								id={FIELD_IDS.password}
								label={t("register-password")}
								type="password"
								autoComplete="new-password"
								value={form.values.password}
								onChange={value => form.setValue("password", value)}
								onBlur={() => form.blur("password")}
								error={error("password")}
								hint={t("password-hint")}
							>
								<PasswordStrengthMeter
									id={`${FIELD_IDS.password}-strength`}
									password={form.values.password}
								/>
							</AuthField>
							<AuthField
								id={FIELD_IDS.confirmPassword}
								label={t("register-confirm-password")}
								type="password"
								autoComplete="new-password"
								value={form.values.confirmPassword}
								onChange={value => form.setValue("confirmPassword", value)}
								onBlur={() => form.blur("confirmPassword")}
								error={error("confirmPassword")}
							/>
						</fieldset>
						<AuthSubmit busy={form.submitting}>{t("register-submit")}</AuthSubmit>
						<p className="auth-legal">
							{t("register-terms-notice")}{" "}
							<Link to={TERMS_CONDITIONS_PAGE}>{t("register-terms")}</Link>
						</p>
					</form>

					<p className="auth-switch">
						{t("register-have-account")}{" "}
						<Link to={LOGIN_PAGE}>{t("register-sign-in")}</Link>
					</p>
				</>
			)}
		</AuthLayout>
	)
}

export default Register
