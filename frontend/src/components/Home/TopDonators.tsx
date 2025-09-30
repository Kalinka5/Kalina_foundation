import { useTranslation } from "react-i18next"
import { useDonators } from "../../lib/hooks"
import { useScrollAnimation } from "../../lib/useAnimations"
import useMediaQuery from "../../lib/useMediaQuery"
import "../../styles/home/topDonators.css"

function TopDonators() {
	const { data: donators, isLoading, isError } = useDonators()
	const { t } = useTranslation()
	const isMobile = useMediaQuery("(max-width: 1034px)")

	// Animation hooks
	const { elementRef: sectionRef, isVisible } = useScrollAnimation({
		threshold: 0.3,
		triggerOnce: true,
	})

	if (isLoading) {
		return (
			<section
				ref={sectionRef}
				className="top-heroes-section visible"
				id="top-donators"
			>
				<div className="top-heroes-container">
					<div className="top-heroes-header">
						<h2 className="top-heroes-title animate-fade-up visible">
							{t("our-top-donators")}
						</h2>
						<p className="top-heroes-subtitle animate-fade-up visible stagger-1">
							{t("loading-supporters")}
						</p>
					</div>
				</div>
			</section>
		)
	}

	if (isError || !donators) {
		return (
			<section
				ref={sectionRef}
				className="top-heroes-section visible"
				id="top-donators"
			>
				<div className="top-heroes-container">
					<div className="top-heroes-header">
						<h2 className="top-heroes-title animate-fade-up visible">
							{t("our-top-donators")}
						</h2>
						<p className="top-heroes-subtitle animate-fade-up visible stagger-1">
							{t("unable-load-donators")}
						</p>
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
		<section
			ref={sectionRef}
			className={`top-heroes-section ${isVisible ? "visible" : ""}`}
			id="top-donators"
		>
			<div className="top-heroes-container">
				<div className="top-heroes-header">
					<h2
						className={`top-heroes-title ${
							isVisible ? "animate-fade-up visible" : "animate-fade-up"
						}`}
					>
						{t("our-top-donators")}
					</h2>
					<p
						className={`top-heroes-subtitle ${
							isVisible
								? "animate-fade-up visible stagger-1"
								: "animate-fade-up stagger-1"
						}`}
					>
						{t("celebrating-supporters")}
					</p>
				</div>

				<div className="heroes-grid">
					{displayedDonators.map((donator, index) => (
						<div
							key={donator.id}
							className={`hero-card hover-lift glass-effect ${
								index < 3 ? "podium-position" : ""
							} position-${index + 1} ${
								isVisible
									? `animate-scale-in visible stagger-${index + 2}`
									: `animate-scale-in stagger-${index + 2}`
							}`}
						>
							<div className="top-hero-content">
								<div className="hero-avatar-container">
									<div
										className={`hero-avatar tilt-3d ${
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
											<span className="avatar-initials gradient-text">
												{getInitials(donator)}
											</span>
										)}
									</div>
									{index < 3 && <div className="medal-icon floating">🏆</div>}
								</div>
								<div className="hero-info">
									<h3 className="hero-name">{getDisplayName(donator)}</h3>
									<p className="hero-amount gradient-text">
										{formatDonationAmount(donator.donated)}
									</p>
								</div>
							</div>
							<div className="pedestal-bar"></div>
						</div>
					))}
				</div>

				<div className="heroes-cta">
					<p
						className={`cta-text ${
							isVisible
								? "animate-fade-up visible stagger-6"
								: "animate-fade-up stagger-6"
						}`}
					>
						{t("join-community")}
					</p>
				</div>
			</div>
		</section>
	)
}

export default TopDonators
