import React from "react"
import { useTranslation } from "react-i18next"

import Footer from "../components/Footer"
import Header from "../components/Header"

import "../styles/termsConditions.css"

const AccessibilityStatement: React.FC = () => {
	const { t } = useTranslation()

	return (
		<div className="terms-conditions">
			<Header fixed="pos-fixed" />
			<div className="terms-content">
				<div className="terms-header">
					<h1 className="terms-title">{t("accessibility-title")}</h1>
					<p className="terms-subtitle">
						{t("accessibility-subtitle", {
							date: new Date().toLocaleDateString(),
						})}
					</p>
				</div>

				<div className="terms-body">
					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("accessibility-commitment-title")}
						</h2>
						<p className="terms-text">{t("accessibility-commitment-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("accessibility-standards-title")}
						</h2>
						<p className="terms-text">{t("accessibility-standards-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("accessibility-features-title")}
						</h2>
						<p className="terms-text">{t("accessibility-features-intro")}</p>
						<ul className="terms-text">
							<li>{t("accessibility-feature-1")}</li>
							<li>{t("accessibility-feature-2")}</li>
							<li>{t("accessibility-feature-3")}</li>
							<li>{t("accessibility-feature-4")}</li>
							<li>{t("accessibility-feature-5")}</li>
							<li>{t("accessibility-feature-6")}</li>
						</ul>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("accessibility-issues-title")}
						</h2>
						<p className="terms-text">{t("accessibility-issues-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("accessibility-feedback-title")}
						</h2>
						<p className="terms-text">{t("accessibility-feedback-intro")}</p>
						<p className="terms-text">
							{t("accessibility-feedback-email")}
							<br />
							{t("accessibility-feedback-phone")}
							<br />
							{t("accessibility-feedback-address")}
						</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("accessibility-third-party-title")}
						</h2>
						<p className="terms-text">{t("accessibility-third-party-text")}</p>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default AccessibilityStatement
