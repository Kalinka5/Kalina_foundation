import { useTranslation } from "react-i18next"
import { IoCheckmarkCircle, IoCloudOfflineOutline } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"

import AuthLayout from "../components/Auth/AuthLayout"
import { AuthDone } from "../components/Auth/AuthParts"
import { LOGIN_PAGE, REGISTER_PAGE } from "../lib/constants"
import { useEmailVerification } from "../lib/hooks"

// Reached from the link in the activation email: /email-verify/:uid/:token
function EmailVerify() {
	const { uid, token } = useParams() as { uid: string; token: string }
	const { t } = useTranslation()
	const { status, retry, retrying } = useEmailVerification(uid, token)

	const loginButton = (
		<Link to={LOGIN_PAGE} className="btn btn-primary btn-lg btn-block">
			{t("login-button")}
		</Link>
	)

	// Each state is keyed so its heading takes focus when it appears.
	let content
	if (status === "success") {
		content = (
			<AuthDone
				key="success"
				icon={<IoCheckmarkCircle />}
				title={t("verify-email-success-title")}
				actions={loginButton}
			>
				{t("verify-email-success-body")}
			</AuthDone>
		)
	} else if (status === "failed") {
		content = (
			<AuthDone
				key="failed"
				tone="error"
				title={t("verify-email-failed-title")}
				actions={
					<>
						{loginButton}
						<Link to={REGISTER_PAGE} className="btn btn-ghost btn-lg btn-block">
							{t("register-create-account")}
						</Link>
					</>
				}
			>
				{t("verify-email-failed-body")}
			</AuthDone>
		)
	} else if (status === "error") {
		content = (
			<AuthDone
				key="error"
				tone="error"
				icon={<IoCloudOfflineOutline />}
				title={t("verify-email-error-title")}
				actions={
					<button
						type="button"
						className="btn btn-primary btn-lg btn-block auth-submit"
						onClick={retry}
						disabled={retrying}
						aria-busy={retrying}
					>
						{retrying && <span className="auth-spinner" aria-hidden />}
						{t("verify-email-retry")}
					</button>
				}
			>
				{t("verify-email-error-body")}
			</AuthDone>
		)
	} else {
		content = (
			<AuthDone key="pending" tone="pending" title={t("verify-email-pending-title")}>
				{t("verify-email-pending-body")}
			</AuthDone>
		)
	}

	return (
		<AuthLayout
			image="/img/register-background1"
			eyebrowKey="home-hero-eyebrow"
			quoteKey="home-hero-title"
		>
			{content}
		</AuthLayout>
	)
}

export default EmailVerify
