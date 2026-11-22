import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"

import { EASE } from "../Home/motion"

type SaveBarProps = {
	visible: boolean
	saving: boolean
	formId: string
	onDiscard: () => void
}

/**
 * Floating bar shown while the personal info form has unsaved changes.
 * Portalled to the page root: a transformed ancestor (entrance animations)
 * would otherwise turn `position: fixed` into "fixed to that ancestor".
 */
function SaveBar({ visible, saving, formId, onDiscard }: SaveBarProps) {
	const { t } = useTranslation()
	const root = document.querySelector(".profile-page")
	if (!root) return null

	return createPortal(
		<AnimatePresence>
			{visible && (
				<motion.div
					className="profile-savebar"
					role="region"
					aria-label={t("profile-unsaved")}
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 24 }}
					transition={{ duration: 0.35, ease: EASE }}
				>
					<p className="profile-savebar-text">
						<span className="profile-savebar-dot" aria-hidden />
						{t("profile-unsaved")}
					</p>
					<div className="profile-savebar-actions">
						<button
							type="button"
							className="btn btn-text"
							onClick={onDiscard}
							disabled={saving}
						>
							{t("profile-discard")}
						</button>
						<button
							type="submit"
							form={formId}
							className="btn btn-primary"
							disabled={saving}
							aria-busy={saving}
						>
							{saving && <span className="auth-spinner" aria-hidden />}
							{t("profile-save")}
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>,
		root
	)
}

export default SaveBar
