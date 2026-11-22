import { ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"
import { IoEye, IoEyeOff } from "react-icons/io5"

type AuthFieldProps = {
	id: string
	label: string
	type: "email" | "password"
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	autoComplete: string
	/** Already translated error text */
	error?: string
	hint?: string
	placeholder?: string
	/** Shown at the right of the label row, e.g. "Forgot password?" */
	labelAction?: ReactNode
	/** Rendered under the input, e.g. the password strength meter */
	children?: ReactNode
}

function AuthField({
	id,
	label,
	type,
	value,
	onChange,
	onBlur,
	autoComplete,
	error,
	hint,
	placeholder,
	labelAction,
	children,
}: AuthFieldProps) {
	const { t } = useTranslation()
	const [revealed, setRevealed] = useState(false)

	const isPassword = type === "password"
	const errorId = `${id}-error`
	const hintId = `${id}-hint`
	const describedBy =
		[error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined

	return (
		<div className={`auth-field${error ? " has-error" : ""}`}>
			<div className="auth-label-row">
				<label className="auth-label" htmlFor={id}>
					{label}
				</label>
				{labelAction}
			</div>

			<div className="auth-input-wrap">
				<input
					id={id}
					name={id}
					className="auth-input"
					type={isPassword && revealed ? "text" : type}
					value={value}
					onChange={e => onChange(e.target.value)}
					onBlur={onBlur}
					autoComplete={autoComplete}
					placeholder={placeholder}
					aria-invalid={error ? true : undefined}
					aria-describedby={describedBy}
					{...(type === "email" && {
						inputMode: "email" as const,
						autoCapitalize: "none",
						spellCheck: false,
					})}
				/>
				{isPassword && (
					<button
						type="button"
						className="auth-reveal"
						onClick={() => setRevealed(r => !r)}
						aria-label={revealed ? t("password-hide") : t("password-show")}
						aria-pressed={revealed}
						aria-controls={id}
					>
						{revealed ? <IoEyeOff aria-hidden /> : <IoEye aria-hidden />}
					</button>
				)}
			</div>

			{children}

			{hint && !error && (
				<p className="auth-hint" id={hintId}>
					{hint}
				</p>
			)}
			{error && (
				<p className="auth-error" id={errorId}>
					{error}
				</p>
			)}
		</div>
	)
}

export default AuthField
