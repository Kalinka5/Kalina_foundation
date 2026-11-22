import { FormEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import {
	displayName,
	hasCustomAvatar,
	NAME_MAX_LENGTH,
	Profile,
	updateProfile,
	useApplyProfile,
} from "../../lib/profile"
import AuthField from "../Auth/AuthField"
import { AuthAlert } from "../Auth/AuthParts"
import AvatarUpload from "./AvatarUpload"
import ProfileSection from "./ProfileSection"
import SaveBar from "./SaveBar"

const FORM_ID = "profile-personal-form"

type PersonalInfoSectionProps = {
	id: string
	profile: Profile
	onSaved: () => void
}

function PersonalInfoSection({ id, profile, onSaved }: PersonalInfoSectionProps) {
	const { t } = useTranslation()
	const applyProfile = useApplyProfile()

	const [firstName, setFirstName] = useState(profile.first_name)
	const [lastName, setLastName] = useState(profile.last_name)
	const [avatar, setAvatar] = useState<File | null>(null)
	const [saving, setSaving] = useState(false)
	const [fieldErrors, setFieldErrors] = useState<string[]>([])
	const [formError, setFormError] = useState(false)

	const nameChanged = {
		first_name: firstName.trim() !== profile.first_name,
		last_name: lastName.trim() !== profile.last_name,
	}
	const dirty = nameChanged.first_name || nameChanged.last_name || avatar !== null

	// Browsers show their own generic text; returning a value is what matters
	useEffect(() => {
		if (!dirty) return
		const warn = (event: BeforeUnloadEvent) => {
			event.preventDefault()
			event.returnValue = ""
		}
		window.addEventListener("beforeunload", warn)
		return () => window.removeEventListener("beforeunload", warn)
	}, [dirty])

	const clearErrors = (field?: string) => {
		setFormError(false)
		setFieldErrors(prev => (field ? prev.filter(f => f !== field) : []))
	}

	const discard = () => {
		setFirstName(profile.first_name)
		setLastName(profile.last_name)
		setAvatar(null)
		clearErrors()
	}

	const submit = async (event: FormEvent) => {
		event.preventDefault()
		if (!dirty || saving) return

		setSaving(true)
		clearErrors()
		const result = await updateProfile({
			...(nameChanged.first_name && { first_name: firstName.trim() }),
			...(nameChanged.last_name && { last_name: lastName.trim() }),
			...(avatar && { image: avatar }),
		})
		setSaving(false)

		if (result.ok) {
			applyProfile(result.profile)
			setFirstName(result.profile.first_name)
			setLastName(result.profile.last_name)
			setAvatar(null)
			onSaved()
			return
		}
		if (result.fields.length) setFieldErrors(result.fields)
		else setFormError(true)
	}

	const savedAvatar = hasCustomAvatar(profile.image) ? profile.image : null
	const previewName = displayName({
		first_name: firstName,
		last_name: lastName,
		email: profile.email,
	})

	return (
		<ProfileSection
			id={id}
			title={t("profile-section-personal")}
			lead={t("profile-personal-lead")}
		>
			<form id={FORM_ID} className="profile-form" onSubmit={submit} noValidate>
				{formError && <AuthAlert tone="error">{t("profile-save-error")}</AuthAlert>}

				<AvatarUpload
					currentSrc={savedAvatar}
					name={previewName}
					file={avatar}
					onChange={file => {
						setAvatar(file)
						clearErrors("image")
					}}
					serverError={
						fieldErrors.includes("image") ? t("profile-avatar-invalid") : undefined
					}
					disabled={saving}
				/>

				<fieldset className="profile-fieldset" disabled={saving}>
					<legend className="sr-only">{t("profile-section-personal")}</legend>
					<div className="profile-grid">
						<AuthField
							id="profile-first-name"
							label={t("profile-first-name")}
							type="text"
							value={firstName}
							onChange={value => {
								setFirstName(value)
								clearErrors("first_name")
							}}
							autoComplete="given-name"
							maxLength={NAME_MAX_LENGTH}
							placeholder={t("profile-first-name-placeholder")}
							error={
								fieldErrors.includes("first_name")
									? t("profile-name-invalid")
									: undefined
							}
						/>
						<AuthField
							id="profile-last-name"
							label={t("profile-last-name")}
							type="text"
							value={lastName}
							onChange={value => {
								setLastName(value)
								clearErrors("last_name")
							}}
							autoComplete="family-name"
							maxLength={NAME_MAX_LENGTH}
							placeholder={t("profile-last-name-placeholder")}
							error={
								fieldErrors.includes("last_name")
									? t("profile-name-invalid")
									: undefined
							}
						/>
					</div>

					<AuthField
						id="profile-email"
						label={t("profile-email")}
						type="email"
						value={profile.email}
						autoComplete="email"
						readOnly
						hint={t("profile-email-hint")}
					/>
				</fieldset>
			</form>

			<SaveBar
				visible={dirty || saving}
				saving={saving}
				formId={FORM_ID}
				onDiscard={discard}
			/>
		</ProfileSection>
	)
}

export default PersonalInfoSection
