import React from "react"
import { useTranslation } from "react-i18next"

import Footer from "../components/Footer"
import Header from "../components/Header"

import "../styles/termsConditions.css"

const TermsConditions: React.FC = () => {
	const { t } = useTranslation()

	return (
		<div className="terms-conditions">
			<Header fixed="pos-fixed" />
			<div className="terms-content">
				<div className="terms-header">
					<h1 className="terms-title">{t("terms-title")}</h1>
					<p className="terms-subtitle">{t("terms-subtitle")}</p>
				</div>

				<div className="terms-body">
					<section className="terms-section">
						<h2 className="terms-section-title">{t("terms-welcome-title")}</h2>
						<p className="terms-text">
							{t("terms-welcome-text-1")}{" "}
							<strong>{t("terms-welcome-text-2")}</strong>{" "}
							{t("terms-welcome-text-3")}{" "}
							<strong>{t("terms-welcome-text-4")}</strong>{" "}
							{t("terms-welcome-text-5")}{" "}
							<strong>{t("terms-welcome-text-6")}</strong>{" "}
							{t("terms-welcome-text-7")}{" "}
							<strong>{t("terms-welcome-text-8")}</strong>{" "}
							{t("terms-welcome-text-9")}
						</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("terms-registration-title")}
						</h2>
						<h3 className="terms-subsection-title">
							{t("terms-registration-subtitle")}
						</h3>
						<p className="terms-text">
							{t("terms-registration-text-1")}{" "}
							<strong>{t("terms-registration-text-2")}</strong>{" "}
							{t("terms-registration-text-3")}{" "}
							<strong>{t("terms-registration-text-4")}</strong>{" "}
							{t("terms-registration-text-5")}{" "}
							<strong>{t("terms-registration-text-6")}</strong>{" "}
							{t("terms-registration-text-7")}
						</p>
						<p className="terms-text">
							{t("terms-registration-text-8")}{" "}
							<strong>{t("terms-registration-text-9")}</strong>{" "}
							{t("terms-registration-text-10")}
						</p>
					</section>

					<section className="terms-section">
						<h3 className="terms-subsection-title">
							{t("terms-account-transfer-title")}
						</h3>
						<h4 className="terms-subsection-subtitle">
							{t("terms-account-transfer-subtitle-1")}
						</h4>
						<p className="terms-text">
							{t("terms-account-transfer-text-1")}{" "}
							<strong>{t("terms-account-transfer-text-2")}</strong>{" "}
							{t("terms-account-transfer-text-3")}{" "}
							<strong>{t("terms-account-transfer-text-4")}</strong>{" "}
							{t("terms-account-transfer-text-5")}
						</p>
						<h4 className="terms-subsection-subtitle">
							{t("terms-account-transfer-subtitle-2")}
						</h4>
						<p className="terms-text">
							{t("terms-account-transfer-text-6")}{" "}
							<strong>{t("terms-account-transfer-text-7")}</strong>{" "}
							{t("terms-account-transfer-text-8")}
						</p>
						<h5 className="terms-subsection-subtitle-small">
							{t("terms-account-transfer-subtitle-3")}
						</h5>
						<p className="terms-text">
							{t("terms-account-transfer-text-9")}{" "}
							<strong>{t("terms-account-transfer-text-10")}</strong>{" "}
							{t("terms-account-transfer-text-11")}
						</p>
						<h5 className="terms-subsection-subtitle-small">
							{t("terms-account-transfer-subtitle-4")}
						</h5>
						<p className="terms-text">
							{t("terms-account-transfer-text-12")}{" "}
							<strong>{t("terms-account-transfer-text-13")}</strong>{" "}
							{t("terms-account-transfer-text-14")}
						</p>
						<h5 className="terms-subsection-subtitle-small">
							{t("terms-account-transfer-subtitle-5")}
						</h5>
						<p className="terms-text">
							{t("terms-account-transfer-text-15")}{" "}
							<strong>{t("terms-account-transfer-text-16")}</strong>{" "}
							{t("terms-account-transfer-text-17")}
						</p>
					</section>

					<section className="terms-section">
						<h3 className="terms-subsection-title">
							{t("terms-account-recovery-title")}
						</h3>
						<p className="terms-text">
							{t("terms-account-recovery-text-1")}{" "}
							<strong>{t("terms-account-recovery-text-2")}</strong>{" "}
							{t("terms-account-recovery-text-3")}
						</p>
					</section>

					<section className="terms-section">
						<h3 className="terms-subsection-title">
							{t("terms-account-security-title")}
						</h3>
						<p className="terms-text">
							{t("terms-account-security-text-1")}{" "}
							<strong>{t("terms-account-security-text-2")}</strong>{" "}
							{t("terms-account-security-text-3")}{" "}
							<strong>{t("terms-account-security-text-4")}</strong>{" "}
							{t("terms-account-security-text-5")}
						</p>
					</section>

					<section className="terms-section">
						<h3 className="terms-subsection-title">
							{t("terms-account-cancellation-title")}
						</h3>
						<h4 className="terms-subsection-subtitle">
							{t("terms-account-cancellation-subtitle-1")}
						</h4>
						<h5 className="terms-subsection-subtitle-small">
							{t("terms-account-cancellation-subtitle-2")}
						</h5>
						<p className="terms-text">
							{t("terms-account-cancellation-text-1")}{" "}
							<strong>{t("terms-account-cancellation-text-2")}</strong>{" "}
							{t("terms-account-cancellation-text-3")}
						</p>
						<h5 className="terms-subsection-subtitle-small">
							{t("terms-account-cancellation-subtitle-3")}
						</h5>
						<p className="terms-text">
							{t("terms-account-cancellation-text-4")}{" "}
							<strong>{t("terms-account-cancellation-text-5")}</strong>{" "}
							{t("terms-account-cancellation-text-6")}
						</p>
						<h5 className="terms-subsection-subtitle-small">
							{t("terms-account-cancellation-subtitle-4")}
						</h5>
						<p className="terms-text">
							{t("terms-account-cancellation-text-7")}{" "}
							<strong>{t("terms-account-cancellation-text-8")}</strong>{" "}
							{t("terms-account-cancellation-text-9")}
						</p>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default TermsConditions
