import { useState } from "react"
import { useTranslation } from "react-i18next"

import DeleteAccountModal from "./DeleteAccountModal"
import ProfileSection from "./ProfileSection"

function DangerZone({ id, email }: { id: string; email: string }) {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)

	return (
		<ProfileSection id={id} title={t("profile-section-danger")} tone="danger">
			<div className="profile-danger">
				<p className="profile-danger-text">{t("profile-delete-text")}</p>
				<button
					type="button"
					className="btn btn-danger-outline"
					onClick={() => setOpen(true)}
					aria-haspopup="dialog"
				>
					{t("profile-delete-button")}
				</button>
			</div>
			<DeleteAccountModal open={open} email={email} onClose={() => setOpen(false)} />
		</ProfileSection>
	)
}

export default DangerZone
