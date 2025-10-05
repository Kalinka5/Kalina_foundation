import React from "react"
import { useTranslation } from "react-i18next"

import Footer from "../components/Footer"
import Header from "../components/Header"

import "../styles/termsConditions.css"

const RefundPolicy: React.FC = () => {
	const { t } = useTranslation()

	return (
		<div className="terms-conditions">
			<Header fixed="pos-fixed" />
			<div className="terms-content">
				<div className="terms-header">
					<h1 className="terms-title">{t("refund-title")}</h1>
					<p className="terms-subtitle">
						{t("refund-subtitle", { date: new Date().toLocaleDateString() })}
					</p>
				</div>

				<div className="terms-body">
					<section className="terms-section">
						<h2 className="terms-section-title">{t("refund-general-title")}</h2>
						<p className="terms-text">{t("refund-general-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("refund-timeframe-title")}
						</h2>
						<p className="terms-text">{t("refund-timeframe-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("refund-eligible-title")}
						</h2>
						<p className="terms-text">{t("refund-eligible-intro")}</p>
						<ul className="terms-text">
							<li>{t("refund-eligible-1")}</li>
							<li>{t("refund-eligible-2")}</li>
							<li>{t("refund-eligible-3")}</li>
							<li>{t("refund-eligible-4")}</li>
							<li>{t("refund-eligible-5")}</li>
						</ul>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("refund-non-eligible-title")}
						</h2>
						<p className="terms-text">{t("refund-non-eligible-intro")}</p>
						<ul className="terms-text">
							<li>{t("refund-non-eligible-1")}</li>
							<li>{t("refund-non-eligible-2")}</li>
							<li>{t("refund-non-eligible-3")}</li>
							<li>{t("refund-non-eligible-4")}</li>
						</ul>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("refund-process-title")}</h2>
						<p className="terms-text">{t("refund-process-intro")}</p>
						<ol className="terms-text">
							<li>{t("refund-process-1")}</li>
							<li>{t("refund-process-2")}</li>
							<li>{t("refund-process-3")}</li>
							<li>{t("refund-process-4")}</li>
						</ol>
						<p className="terms-text">{t("refund-process-followup")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("refund-fees-title")}</h2>
						<p className="terms-text">{t("refund-fees-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("refund-tax-title")}</h2>
						<p className="terms-text">{t("refund-tax-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">
							{t("refund-recurring-title")}
						</h2>
						<p className="terms-text">{t("refund-recurring-text")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("refund-contact-title")}</h2>
						<p className="terms-text">{t("refund-contact-intro")}</p>
						<p className="terms-text">
							{t("refund-contact-email")}
							<br />
							{t("refund-contact-phone")}
							<br />
							{t("refund-contact-address")}
						</p>
						<p className="terms-text">{t("refund-contact-note")}</p>
					</section>

					<section className="terms-section">
						<h2 className="terms-section-title">{t("refund-changes-title")}</h2>
						<p className="terms-text">{t("refund-changes-text")}</p>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default RefundPolicy
