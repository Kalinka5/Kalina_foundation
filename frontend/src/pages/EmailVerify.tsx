import React from "react"

import { useParams } from "react-router-dom"

import { useTranslation } from "react-i18next"

import Header from "../components/Header"

import { useEmailVerification } from "../lib/hooks"

import "../styles/emailVerify.css"

function EmailVerify() {
	const { uid, token } = useParams() as { uid: string; token: string }

	const { t } = useTranslation()

	const emailStatus = useEmailVerification(uid, token)

	let statusMessage: React.ReactNode = null
	if (emailStatus === "success") {
		statusMessage = (
			<div className="text success">
				<h1 className="title">
					{t("email")} <strong>{t("verification")}</strong>
					<em>{t("done")}</em>
				</h1>
			</div>
		)
	} else if (emailStatus === "failed") {
		statusMessage = (
			<div className="text failed">
				<h1 className="title">
					{t("email")} <strong>{t("verification")}</strong>
					<em>{t("failed")}</em>
				</h1>
				<p>{t("failed-sent")}</p>
			</div>
		)
	} else {
		statusMessage = (
			<div className="loading-container">
				<div className="loading-text">
					<span className="letter1">L</span>
					<span className="letter2">O</span>
					<span className="letter3">A</span>
					<span className="letter4">D</span>
					<span className="letter5">I</span>
					<span className="letter6">N</span>
					<span className="letter7">G</span>
				</div>
			</div>
		)
	}

	return (
		<div className="email-verify header-body">
			<Header />
			<div className="main-body">
				<div className="ternary-system">
					<div className="sun primary"></div>
					<div className="sun secondary"></div>
					<div className="sun ternary"></div>
				</div>
				<div className="sand">
					<div className="pendulums">
						<div className="pendulum">
							<div className="bar"></div>
							<div className="motion">
								<div className="string"></div>
								<div className="weight"></div>
							</div>
						</div>
						<div className="pendulum shadow">
							<div className="bar"></div>
							<div className="motion">
								<div className="string"></div>
								<div className="weight"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="pyramid"></div>
				{statusMessage}
			</div>
		</div>
	)
}

export default EmailVerify
