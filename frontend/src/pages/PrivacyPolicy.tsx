import React from "react"
import { useTranslation } from "react-i18next"

import Footer from "../components/Footer"
import Header from "../components/Header"

import "../styles/termsConditions.css"

const PrivacyPolicy: React.FC = () => {
	const { t } = useTranslation()

	return (
		<div className="terms-conditions">
			<Header fixed="pos-fixed" />
			<div className="terms-content">
				<div className="terms-header">
					<h1 className="terms-title">{t("privacy-title")}</h1>
					<p className="terms-subtitle">
						{t("privacy-subtitle", { date: new Date().toLocaleDateString() })}
					</p>
				</div>

				<div className="terms-body">
					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("privacy-collect-title")}
						</h2>
						<p className="terms-text">{t("privacy-collect-intro")}</p>
						<ul className="terms-text">
							<li>{t("privacy-collect-1")}</li>
							<li>{t("privacy-collect-2")}</li>
							<li>{t("privacy-collect-3")}</li>
							<li>{t("privacy-collect-4")}</li>
						</ul>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("privacy-use-title")}</h2>
						<p className="terms-text">{t("privacy-use-intro")}</p>
						<ul className="terms-text">
							<li>{t("privacy-use-1")}</li>
							<li>{t("privacy-use-2")}</li>
							<li>{t("privacy-use-3")}</li>
							<li>{t("privacy-use-4")}</li>
							<li>{t("privacy-use-5")}</li>
						</ul>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("privacy-sharing-title")}
						</h2>
						<p className="terms-text">{t("privacy-sharing-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("privacy-security-title")}
						</h2>
						<p className="terms-text">{t("privacy-security-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("privacy-rights-title")}</h2>
						<p className="terms-text">{t("privacy-rights-intro")}</p>
						<ul className="terms-text">
							<li>{t("privacy-rights-1")}</li>
							<li>{t("privacy-rights-2")}</li>
							<li>{t("privacy-rights-3")}</li>
							<li>{t("privacy-rights-4")}</li>
						</ul>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("privacy-contact-title")}
						</h2>
						<p className="terms-text">{t("privacy-contact-intro")}</p>
						<p className="terms-text">
							{t("privacy-contact-email")}
							<br />
							{t("privacy-contact-phone")}
							<br />
							{t("privacy-contact-address")}
						</p>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default PrivacyPolicy
