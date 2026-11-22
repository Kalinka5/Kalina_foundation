import { useState } from "react"
import { useTranslation } from "react-i18next"
import { LuMedal } from "react-icons/lu"

import { useDonators } from "../../lib/hooks"
import { PublicDonor } from "../../lib/types"
import { Reveal, RevealText } from "./motion"

import "../../styles/home/topDonators.css"

// The API leaves display_name empty when a donor hasn't set a name; their
// email is never sent, so they appear as an anonymous supporter.
const getInitials = (donator: PublicDonor) => {
	const parts = [donator.first_name?.trim(), donator.last_name?.trim()].filter(
		Boolean
	) as string[]
	return parts
		.map(p => p.charAt(0))
		.join("")
		.toUpperCase()
}

const formatDonationAmount = (donated: string) => {
	const amount = parseFloat(donated)
	if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`
	return `$${amount.toFixed(0)}`
}

/** Avatar photo, falling back to initials when there is none or it fails to load. */
function DonorAvatar({ donator }: { donator: PublicDonor }) {
	const [failed, setFailed] = useState(!donator.image)
	return (
		<span className="donor-avatar">
			{failed ? (
				<span aria-hidden="true">{getInitials(donator) || "♥"}</span>
			) : (
				<img
					src={donator.image}
					alt=""
					loading="lazy"
					onError={() => setFailed(true)}
				/>
			)}
		</span>
	)
}

function TopDonators() {
	const { data: donators, isLoading, isError } = useDonators()
	const { t } = useTranslation()

	const topFive = (donators ?? []).slice(0, 5)

	return (
		<section className="h-section donors" id="top-donators">
			<div className="h-container">
				<div className="h-section-head h-section-head--center">
					<Reveal>
						<p className="h-eyebrow">{t("top-donators")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("our-top-donators")} />
					<Reveal delay={0.15}>
						<p className="h-lead">
							{isLoading
								? t("loading-supporters")
								: isError
									? t("unable-load-donators")
									: t("celebrating-supporters")}
						</p>
					</Reveal>
				</div>

				{topFive.length > 0 && (
					<ol className="donors-list">
						{topFive.map((donator, index) => {
							const rank = index + 1
							const name = donator.display_name || t("anonymous-supporter")
							return (
								<Reveal
									as="li"
									key={donator.id}
									delay={index * 0.08}
									className={`donor donor--${rank}`}
								>
									<span className="donor-rank">
										{rank <= 3 ? (
											<LuMedal aria-label={`#${rank}`} />
										) : (
											`#${rank}`
										)}
									</span>
									<DonorAvatar donator={donator} />
									<span className="donor-name">{name}</span>
									<span className="donor-amount">
										{formatDonationAmount(donator.donated)}
									</span>
								</Reveal>
							)
						})}
					</ol>
				)}

				<Reveal>
					<p className="donors-cta">{t("join-community")}</p>
				</Reveal>
			</div>
		</section>
	)
}

export default TopDonators
