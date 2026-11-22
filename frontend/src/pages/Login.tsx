import { useTranslation } from "react-i18next"
import { Link, Navigate } from "react-router-dom"

import AuthField from "../components/Auth/AuthField"
import AuthLayout, { AuthHeading } from "../components/Auth/AuthLayout"
import { AuthAlert, AuthSubmit } from "../components/Auth/AuthParts"
import GoogleSignIn, { useFinishLogin } from "../components/Auth/GoogleSignIn"
import { useAuth } from "../components/AuthContext"
import { isValidEmail, loginWithPassword } from "../lib/auth"
import {
	FORGOT_PASSWORD_PAGE,
	PROFILE_PAGE,
	REGISTER_PAGE,
} from "../lib/constants"
import { useAuthForm } from "../lib/useAuthForm"

type Field = "email" | "password"

const FIELD_IDS: Record<Field, string> = {
	email: "login-email",
	password: "login-password",
}

function Login() {
	const { t } = useTranslation()
	const { isAuthorized } = useAuth()
	const finishLogin = useFinishLogin()

	const form = useAuthForm<Field>({ email: "", password: "" }, values => ({
		email: !values.email.trim()
			? "login-email-required"
			: !isValidEmail(values.email)
			? "login-email-invalid"
			: undefined,
		password: !values.password ? "login-password-required" : undefined,
	}))

	const onSubmit = form.handleSubmit(async ({ email, password }) => {
		try {
			if (await loginWithPassword(email.trim(), password)) {
				finishLogin()
			} else {
				form.setFormError("login-invalid-credentials")
			}
		} catch (error) {
			console.error("Login error:", error)
			form.setFormError("login-error-message")
		}
	}, field => FIELD_IDS[field])

	if (isAuthorized) return <Navigate to={PROFILE_PAGE} replace />

	const error = (field: Field) => {
		const key = form.errorFor(field)
		return key && t(key)
	}

	return (
		<AuthLayout
			image="/img/login-background1"
			eyebrowKey="home-hero-eyebrow"
			quoteKey="home-mission-statement"
		>
			<AuthHeading title={t("login-welcome-back")} subtitle={t("login-subtitle")} />

			{form.formError && <AuthAlert tone="error">{t(form.formError)}</AuthAlert>}

			<GoogleSignIn
				text="continue_with"
				disabled={form.submitting}
				onError={form.setFormError}
			/>

			<form className="auth-form" onSubmit={onSubmit} noValidate>
				<fieldset className="auth-fieldset" disabled={form.submitting}>
					<AuthField
						id={FIELD_IDS.email}
						label={t("email")}
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
						label={t("password")}
						type="password"
						autoComplete="current-password"
						placeholder={t("login-password-placeholder")}
						value={form.values.password}
						onChange={value => form.setValue("password", value)}
						onBlur={() => form.blur("password")}
						error={error("password")}
						labelAction={
							<Link
								to={FORGOT_PASSWORD_PAGE}
								state={{ email: form.values.email.trim() }}
								className="auth-inline-link"
							>
								{t("login-forgot-password")}
							</Link>
						}
					/>
				</fieldset>
				<AuthSubmit busy={form.submitting}>{t("login-button")}</AuthSubmit>
			</form>

			<p className="auth-switch">
				{t("login-no-account")}{" "}
				<Link to={REGISTER_PAGE}>{t("login-register-now")}</Link>
			</p>
		</AuthLayout>
	)
}

export default Login
