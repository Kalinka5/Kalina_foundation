import { DragEvent, useEffect, useId, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { IoCamera } from "react-icons/io5"

import { AVATAR_TYPES, avatarError } from "../../lib/profile"
import ProfileAvatar from "./ProfileAvatar"

type AvatarUploadProps = {
	/** The saved photo, or null when the account has none */
	currentSrc: string | null
	name: string
	file: File | null
	onChange: (file: File | null) => void
	/** Already translated error from the server */
	serverError?: string
	disabled?: boolean
}

/** Photo picker: click the photo or the button, or drop a file onto the photo. */
function AvatarUpload({
	currentSrc,
	name,
	file,
	onChange,
	serverError,
	disabled,
}: AvatarUploadProps) {
	const { t } = useTranslation()
	const inputId = useId()
	const hintId = `${inputId}-hint`
	const errorId = `${inputId}-error`
	const inputRef = useRef<HTMLInputElement>(null)
	const [dragging, setDragging] = useState(false)
	const [errorKey, setErrorKey] = useState<string | null>(null)

	// Preview URL for a picked file, released when it is replaced or dropped
	const [preview, setPreview] = useState<string | null>(null)
	useEffect(() => {
		if (!file) {
			setPreview(null)
			return
		}
		const url = URL.createObjectURL(file)
		setPreview(url)
		return () => URL.revokeObjectURL(url)
	}, [file])

	const pick = (picked: File | undefined) => {
		if (!picked) return
		const problem = avatarError(picked)
		setErrorKey(problem)
		if (!problem) onChange(picked)
	}

	const onDrop = (event: DragEvent) => {
		event.preventDefault()
		setDragging(false)
		if (!disabled) pick(event.dataTransfer.files[0])
	}

	const error = errorKey ? t(errorKey) : serverError

	return (
		<div className={`profile-avatar-field${error ? " has-error" : ""}`}>
			<label
				htmlFor={inputId}
				className={`profile-avatar-drop${dragging ? " is-dragging" : ""}`}
				onDragOver={event => {
					event.preventDefault()
					if (!disabled) setDragging(true)
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={onDrop}
			>
				<ProfileAvatar src={preview ?? currentSrc} name={name} />
				<span className="profile-avatar-overlay" aria-hidden="true">
					<IoCamera />
					<span>{dragging ? t("profile-avatar-drop") : t("profile-avatar-change")}</span>
				</span>
			</label>

			<div className="profile-avatar-body">
				<p className="auth-label">{t("profile-avatar-label")}</p>
				<div className="profile-avatar-actions">
					<button
						type="button"
						className="btn btn-ghost btn-sm"
						onClick={() => inputRef.current?.click()}
						disabled={disabled}
						aria-describedby={error ? errorId : hintId}
					>
						{currentSrc || file ? t("profile-avatar-change") : t("profile-avatar-upload")}
					</button>
					{file && (
						<button
							type="button"
							className="btn btn-text btn-sm"
							onClick={() => {
								setErrorKey(null)
								onChange(null)
							}}
						>
							{t("profile-avatar-undo")}
						</button>
					)}
				</div>
				{error ? (
					<p className="auth-error" id={errorId} role="alert">
						{error}
					</p>
				) : (
					<p className="auth-hint" id={hintId}>
						{t("profile-avatar-hint")}
					</p>
				)}
			</div>

			{/* Opened by the button above or a click on the photo */}
			<input
				ref={inputRef}
				id={inputId}
				className="sr-only"
				type="file"
				accept={AVATAR_TYPES.join(",")}
				disabled={disabled}
				tabIndex={-1}
				aria-hidden="true"
				onChange={event => {
					pick(event.target.files?.[0])
					// Allow choosing the same file again after an undo
					event.target.value = ""
				}}
			/>
		</div>
	)
}

export default AvatarUpload
