import { FormEvent, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { IoClose, IoWarning } from "react-icons/io5"

import { HOME_PAGE } from "../../lib/constants"
import { deleteAccount } from "../../lib/profile"
import { AuthAlert } from "../Auth/AuthParts"

type DeleteAccountModalProps = {
	open: boolean
	email: string
	onClose: () => void
}

/**
 * Confirmation for deleting the account. Built on the native <dialog>:
 * showModal() keeps focus inside, makes the page behind it inert and
 * closes on Esc. The person has to type their email to enable the button.
 */
function DeleteAccountModal({ open, email, onClose }: DeleteAccountModalProps) {
	const { t } = useTranslation()
	const dialogRef = useRef<HTMLDialogElement>(null)
	const returnFocusRef = useRef<HTMLElement | null>(null)
	const [typed, setTyped] = useState("")
	const [deleting, setDeleting] = useState(false)
	const [failed, setFailed] = useState(false)

	const matches = typed.trim().toLowerCase() === email.toLowerCase()

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (open && !dialog.open) {
			returnFocusRef.current = document.activeElement as HTMLElement | null
			setTyped("")
			setFailed(false)
			dialog.showModal()
		} else if (!open && dialog.open) {
			dialog.close()
		}
	}, [open])

	const close = () => {
		if (deleting) return
		onClose()
		returnFocusRef.current?.focus()
	}

	const submit = async (event: FormEvent) => {
		event.preventDefault()
		if (!matches || deleting) return
		setDeleting(true)
		setFailed(false)
		if (await deleteAccount()) {
			window.location.href = HOME_PAGE // full reload drops all cached account data
			return
		}
		setDeleting(false)
		setFailed(true)
	}

	return (
		<dialog
			ref={dialogRef}
			className="profile-dialog"
			aria-labelledby="delete-account-title"
			aria-describedby="delete-account-text"
			// Esc fires "cancel"; route it through close() so focus returns
			onCancel={event => {
				event.preventDefault()
				close()
			}}
			// A click on the backdrop lands on the <dialog> element itself
			onClick={event => {
				if (event.target === event.currentTarget) close()
			}}
		>
			<form className="profile-dialog-body" onSubmit={submit}>
				<button
					type="button"
					className="profile-dialog-close"
					onClick={close}
					aria-label={t("cancel")}
					disabled={deleting}
				>
					<IoClose aria-hidden />
				</button>

				<span className="profile-dialog-icon" aria-hidden>
					<IoWarning />
				</span>
				<h2 className="profile-dialog-title" id="delete-account-title">
					{t("profile-delete-modal-title")}
				</h2>
				<p className="profile-dialog-text" id="delete-account-text">
					{t("profile-delete-modal-text")}
				</p>

				{failed && <AuthAlert tone="error">{t("profile-delete-error")}</AuthAlert>}

				<div className="auth-field">
					<label className="auth-label" htmlFor="delete-account-confirm">
						{t("profile-delete-confirm-label")}{" "}
						<strong className="profile-dialog-email">{email}</strong>
					</label>
					<input
						id="delete-account-confirm"
						className="auth-input"
						type="email"
						value={typed}
						onChange={event => setTyped(event.target.value)}
						autoComplete="off"
						autoCapitalize="none"
						spellCheck={false}
						disabled={deleting}
						// showModal() focuses the [autofocus] element
						autoFocus
					/>
				</div>

				<div className="profile-dialog-actions">
					<button
						type="button"
						className="btn btn-ghost"
						onClick={close}
						disabled={deleting}
					>
						{t("cancel")}
					</button>
					<button
						type="submit"
						className="btn btn-danger"
						disabled={!matches || deleting}
						aria-busy={deleting}
					>
						{deleting && <span className="auth-spinner" aria-hidden />}
						{t("profile-delete-confirm")}
					</button>
				</div>
			</form>
		</dialog>
	)
}

export default DeleteAccountModal
