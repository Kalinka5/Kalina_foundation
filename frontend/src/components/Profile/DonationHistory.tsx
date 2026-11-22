import { useTranslation } from "react-i18next"
import { IconType } from "react-icons"
import { FaEthereum, FaPaypal } from "react-icons/fa6"
import { IoArrowForward, IoReceiptOutline } from "react-icons/io5"
import { SiBinance } from "react-icons/si"
import { Link } from "react-router-dom"

import { DONATE_PAGE } from "../../lib/constants"
import { Donation, localeFor, Profile, useDonations } from "../../lib/profile"
import ProfileSection from "./ProfileSection"

const METHODS: Record<Donation["currency"], { label: string; icon: IconType }> = {
	USD: { label: "PayPal", icon: FaPaypal },
	ETH: { label: "Ethereum", icon: FaEthereum },
	BNB: { label: "BNB", icon: SiBinance },
}

function formatOriginal(donation: Donation, locale: string) {
	const amount = parseFloat(donation.original_amount)
	if (donation.currency === "USD") {
		return new Intl.NumberFormat(locale, {
			style: "currency",
			currency: "USD",
			currencyDisplay: "narrowSymbol",
		}).format(amount)
	}
	const crypto = new Intl.NumberFormat(locale, { maximumFractionDigits: 6 }).format(amount)
	return `${crypto} ${donation.currency}`
}

function DonationHistory({ id, profile }: { id: string; profile: Profile }) {
	const { t, i18n } = useTranslation()
	const locale = localeFor(i18n.language)
	const donations = useDonations()

	const uah = new Intl.NumberFormat(locale, {
		style: "currency",
		currency: "UAH",
		currencyDisplay: "narrowSymbol",
		maximumFractionDigits: 0,
	})
	const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" })

	const listed = (donations.data ?? []).reduce(
		(sum, donation) => sum + parseFloat(donation.amount_uah),
		0
	)
	// Donations from before history was recorded only exist in the total
	const hasUnlisted = parseFloat(profile.donated) - listed >= 1

	let body
	if (donations.isPending) {
		body = (
			<ul className="profile-donations" aria-busy="true" aria-label={t("profile-loading")}>
				{[0, 1, 2].map(i => (
					<li key={i} className="profile-donation profile-donation--skeleton">
						<span className="profile-skeleton profile-skeleton--icon" />
						<span className="profile-skeleton profile-skeleton--line" />
						<span className="profile-skeleton profile-skeleton--short" />
					</li>
				))}
			</ul>
		)
	} else if (donations.isError) {
		body = (
			<div className="profile-empty" role="alert">
				<p className="profile-empty-text">{t("profile-donations-error")}</p>
				<button
					type="button"
					className="btn btn-ghost btn-sm"
					onClick={() => donations.refetch()}
				>
					{t("profile-retry")}
				</button>
			</div>
		)
	} else if (donations.data.length === 0) {
		body = (
			<div className="profile-empty">
				<span className="profile-empty-icon" aria-hidden>
					<IoReceiptOutline />
				</span>
				<p className="profile-empty-title">{t("profile-donations-empty-title")}</p>
				<p className="profile-empty-text">{t("profile-donations-empty-text")}</p>
				<Link to={DONATE_PAGE} className="h-link">
					{t("profile-donate-first")}
					<IoArrowForward aria-hidden />
				</Link>
			</div>
		)
	} else {
		body = (
			<ul className="profile-donations" aria-label={t("profile-donations-list-label")}>
				{donations.data.map(donation => {
					const method = METHODS[donation.currency]
					const Icon = method.icon
					return (
						<li key={donation.id} className="profile-donation">
							<span
								className={`profile-donation-icon profile-donation-icon--${donation.currency.toLowerCase()}`}
								aria-hidden
							>
								<Icon />
							</span>
							<span className="profile-donation-main">
								<span className="profile-donation-method">{method.label}</span>
								<time className="profile-donation-date" dateTime={donation.created_at}>
									{date.format(new Date(donation.created_at))}
								</time>
							</span>
							<span className="profile-donation-amount">
								<strong>{uah.format(parseFloat(donation.amount_uah))}</strong>
								<span>{formatOriginal(donation, locale)}</span>
							</span>
						</li>
					)
				})}
			</ul>
		)
	}

	return (
		<ProfileSection
			id={id}
			title={t("profile-section-donations")}
			lead={t("profile-donations-lead")}
			aside={
				profile.donations_count > 0 ? (
					<span className="profile-count">{profile.donations_count}</span>
				) : undefined
			}
		>
			{body}
			{hasUnlisted && !donations.isPending && (
				<p className="profile-footnote">{t("profile-donations-earlier")}</p>
			)}
		</ProfileSection>
	)
}

export default DonationHistory
