import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FcGoogle } from "react-icons/fc"
import { IoArrowForward } from "react-icons/io5"
import { Link } from "react-router-dom"

import { PASSWORD_MIN_LENGTH } from "../../lib/auth"
import { FORGOT_PASSWORD_PAGE } from "../../lib/constants"
import { changePassword, ChangePasswordResult, Profile } from "../../lib/profile"
import { FieldErrors, useAuthForm } from "../../lib/useAuthForm"
import AuthField from "../Auth/AuthField"
import { AuthAlert, AuthSubmit, PasswordStrengthMeter } from "../Auth/AuthParts"
import ProfileSection from "./ProfileSection"

type Field = "current" | "next" | "confirm"

const FIELD_IDS: Record<Field, string> = {
	current: "profile-current-password",
	next: "profile-new-password",
	confirm: "profile-confirm-password",
}

const RESULT_ERRORS: Partial<Record<ChangePasswordResult, [Field, string]>> = {
	"wrong-current": ["current", "profile-password-wrong"],
	weak: ["next", "profile-password-weak"],
	same: ["next", "profile-password-same"],
}

function validate(values: Record<Field, string>): FieldErrors<Field> {
	const errors: FieldErrors<Field> = {}
	if (!values.current) errors.current = "profile-password-required"
	if (values.next.length < PASSWORD_MIN_LENGTH) {
		errors.next = "reset-password-min-length"
	} else if (values.next === values.current) {
		errors.next = "profile-password-same"
	}
	if (!values.confirm) errors.confirm = "reset-password-confirm-password-required"
	else if (values.confirm !== values.next) errors.confirm = "reset-password-passwords-not-match"
	return errors
}

function PasswordForm({ email }: { email: string }) {
	const { t } = useTranslation()
	const [changed, setChanged] = useState(false)
	const form = useAuthForm<Field>({ current: "", next: "", confirm: "" }, validate)

	const onSubmit = form.handleSubmit(async values => {
		setChanged(false)
		const result = await changePassword(values.current, values.next)
		if (result === "changed") {
			form.reset()
			setChanged(true)
			return
		}
		const fieldError = RESULT_ERRORS[result]
		if (fieldError) {
			const [field, key] = fieldError
			form.setServerErrors({ [field]: key })
			document.getElementById(FIELD_IDS[field])?.focus()
		} else {
			form.setFormError("profile-password-error")
		}
	}, field => FIELD_IDS[field])

	const errorFor = (field: Field) => {
		const key = form.errorFor(field)
		return key ? t(key) : undefined
	}

	const field = (name: Field) => ({
		id: FIELD_IDS[name],
		value: form.values[name],
		onChange: (value: string) => {
			form.setValue(name, value)
			setChanged(false)
		},
		onBlur: () => form.blur(name),
		error: errorFor(name),
	})

	return (
		<form className="profile-form profile-form--narrow" onSubmit={onSubmit} noValidate>
			{changed && <AuthAlert tone="success">{t("profile-password-updated")}</AuthAlert>}
			{form.formError && <AuthAlert tone="error">{t(form.formError)}</AuthAlert>}

			{/* Lets password managers attach the new password to the right account */}
			<input
				type="email"
				name="username"
				autoComplete="username"
				value={email}
				readOnly
				hidden
			/>

			<fieldset className="profile-fieldset" disabled={form.submitting}>
				<legend className="sr-only">{t("profile-section-security")}</legend>
				<AuthField
					{...field("current")}
					label={t("profile-current-password")}
					type="password"
					autoComplete="current-password"
					labelAction={
						<Link to={FORGOT_PASSWORD_PAGE} state={{ email }} className="auth-inline-link">
							{t("login-forgot-password")}
						</Link>
					}
				/>
				<AuthField
					{...field("next")}
					label={t("profile-new-password")}
					type="password"
					autoComplete="new-password"
					hint={t("password-hint")}
				>
					<PasswordStrengthMeter password={form.values.next} id="profile-password-strength" />
				</AuthField>
				<AuthField
					{...field("confirm")}
					label={t("profile-confirm-password")}
					type="password"
					autoComplete="new-password"
				/>
			</fieldset>

			<div className="profile-form-actions">
				<AuthSubmit busy={form.submitting}>{t("profile-password-update")}</AuthSubmit>
			</div>
		</form>
	)
}

function SecuritySection({ id, profile }: { id: string; profile: Profile }) {
	const { t } = useTranslation()

	return (
		<ProfileSection
			id={id}
			title={t("profile-section-security")}
			lead={profile.has_password ? t("profile-security-lead") : undefined}
		>
			{profile.has_password ? (
				<PasswordForm email={profile.email} />
			) : (
				<div className="profile-callout">
					<span className="profile-callout-icon" aria-hidden>
						<FcGoogle />
					</span>
					<div>
						<p className="profile-callout-title">{t("profile-google-title")}</p>
						<p className="profile-callout-text">{t("profile-google-text")}</p>
						<Link
							to={FORGOT_PASSWORD_PAGE}
							state={{ email: profile.email }}
							className="h-link"
						>
							{t("profile-google-action")}
							<IoArrowForward aria-hidden />
						</Link>
					</div>
				</div>
			)}
		</ProfileSection>
	)
}

export default SecuritySection
