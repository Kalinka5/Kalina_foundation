import React from "react"
import { useTranslation } from "react-i18next"
import { useDonators } from "../../lib/hooks.tsx"
import useMediaQuery from "../../lib/useMediaQuery.tsx"
import "../../styles/home/topDonators.css"

function TopDonators() {
	const { data: donators, isLoading, isError } = useDonators()
	const { t } = useTranslation()
	const isMobile = useMediaQuery("(max-width: 1034px)")

	if (isLoading) {
		return (
			<section className="top-heroes-section" id="top-donators">
				<div className="top-heroes-container">
					<div className="top-heroes-header">
						<h2 className="top-heroes-title">{t("our-top-donators")}</h2>
						<p className="top-heroes-subtitle">{t("loading-supporters")}</p>
					</div>
				</div>
			</section>
		)
	}

	if (isError || !donators) {
		return (
			<section className="top-heroes-section" id="top-donators">
				<div className="top-heroes-container">
					<div className="top-heroes-header">
						<h2 className="top-heroes-title">{t("our-top-donators")}</h2>
						<p className="top-heroes-subtitle">{t("unable-load-donators")}</p>
					</div>
				</div>
			</section>
		)
	}

	const displayedDonators = donators
		? isMobile
			? donators.slice(0, 3)
			: donators.slice(0, 5)
		: []

	const getDisplayName = (donator: any) => {
		const firstName = donator.first_name?.trim()
		const lastName = donator.last_name?.trim()

		if (firstName && lastName) {
			return `${firstName} ${lastName}`
		} else if (firstName) {
			return firstName
		} else if (lastName) {
			return lastName
		} else {
			return donator.username
		}
	}

	const getInitials = (donator: any) => {
		const firstName = donator.first_name?.trim()
		const lastName = donator.last_name?.trim()

		if (firstName && lastName) {
			return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
		} else if (firstName) {
			return firstName.charAt(0).toUpperCase()
		} else if (lastName) {
			return lastName.charAt(0).toUpperCase()
		} else {
			return donator.username.charAt(0).toUpperCase()
		}
	}

	const formatDonationAmount = (donated: string) => {
		const amount = parseFloat(donated)
		if (amount >= 1000) {
			return `$${(amount / 1000).toFixed(1)}k`
		}
		return `$${amount.toFixed(0)}`
	}

	return (
		<section className="top-heroes-section" id="top-donators">
			<div className="top-heroes-container">
				<div className="top-heroes-header">
					<h2 className="top-heroes-title">{t("our-top-donators")}</h2>
					<p className="top-heroes-subtitle">{t("celebrating-supporters")}</p>
				</div>

				<div className="heroes-grid">
					{displayedDonators.map((donator, index) => (
						<div
							key={donator.id}
							className={`hero-card ${
								index < 3 ? "podium-position" : ""
							} position-${index + 1}`}
						>
							<div className="top-hero-content">
								<div className="hero-avatar-container">
									<div
										className={`hero-avatar ${
											donator.image ? "has-photo" : "initials-avatar"
										}`}
									>
										{donator.image ? (
											<img
												src={donator.image}
												alt={getDisplayName(donator)}
												className="avatar-image"
											/>
										) : (
											<span className="avatar-initials">
												{getInitials(donator)}
											</span>
										)}
									</div>
									{index < 3 && <div className="medal-icon">🏆</div>}
								</div>
								<div className="hero-info">
									<h3 className="hero-name">{getDisplayName(donator)}</h3>
									<p className="hero-amount">
										{formatDonationAmount(donator.donated)}
									</p>
								</div>
							</div>
							<div className="pedestal-bar"></div>
						</div>
					))}
				</div>

				<div className="heroes-cta">
					<p className="cta-text">{t("join-community")}</p>
				</div>
			</div>
		</section>
	)
}

export default TopDonators
