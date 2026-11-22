import { useTranslation } from "react-i18next"
import { IoArrowForward, IoCheckmarkCircle, IoShieldCheckmark } from "react-icons/io5"
import { LuMedal } from "react-icons/lu"
import { Link } from "react-router-dom"

import { DONATE_PAGE } from "../../lib/constants"
import { displayName, hasCustomAvatar, Profile } from "../../lib/profile"
import { CountUp, Reveal, RevealText } from "../Home/motion"
import ProfileAvatar from "./ProfileAvatar"

/** Places that count as the public "top donators" board on Home. */
const LEADERBOARD_SIZE = 5

function ProfileHero({ profile }: { profile: Profile }) {
	const { t } = useTranslation()
	const name = displayName(profile)
	const donated = Math.round(parseFloat(profile.donated) || 0)
	const isDonor = donated > 0
	const onLeaderboard = profile.rank !== null && profile.rank <= LEADERBOARD_SIZE

	return (
		<section className="profile-hero" aria-labelledby="profile-name">
			<div className="h-container profile-hero-inner">
				<div className="profile-identity">
					<Reveal y={12}>
						<ProfileAvatar
							src={hasCustomAvatar(profile.image) ? profile.image : null}
							name={name}
							className="profile-avatar--hero"
						/>
					</Reveal>

					<div className="profile-identity-text">
						<Reveal y={12} delay={0.05}>
							<p className="h-eyebrow">{t("profile-eyebrow")}</p>
						</Reveal>
						<RevealText
							as="h1"
							text={name}
							className="profile-name"
							immediate
							delay={0.1}
						/>
						<Reveal y={8} delay={0.2} className="profile-meta">
							<span className="profile-email">{profile.email}</span>
							{profile.is_active && (
								<span className="profile-chip profile-chip--success">
									<IoCheckmarkCircle aria-hidden />
									{t("profile-verified")}
								</span>
							)}
							{profile.is_superuser && (
								<span className="profile-chip">
									<IoShieldCheckmark aria-hidden />
									{t("profile-admin")}
								</span>
							)}
						</Reveal>
					</div>
				</div>

				<Reveal y={16} delay={0.25} className="profile-impact">
					<dl className="profile-stats">
						<div className="profile-stat profile-stat--primary">
							<dt>{t("profile-stat-donated")}</dt>
							<dd>
								<CountUp value={donated} prefix="₴" />
							</dd>
						</div>
						<div className="profile-stat">
							<dt>{t("profile-stat-rank")}</dt>
							<dd>
								{profile.rank !== null ? (
									<span className={onLeaderboard ? "is-top" : undefined}>
										{onLeaderboard && <LuMedal aria-hidden />}#{profile.rank}
									</span>
								) : (
									<span className="profile-stat-empty">—</span>
								)}
							</dd>
							<dd className="profile-stat-note">
								{profile.rank === null
									? t("profile-stat-rank-none")
									: onLeaderboard
										? t("profile-stat-rank-top")
										: t("profile-stat-rank-note")}
							</dd>
						</div>
						<div className="profile-stat">
							<dt>{t("profile-stat-donations")}</dt>
							<dd>{profile.donations_count}</dd>
						</div>
					</dl>

					<div className="profile-impact-cta">
						<p className="profile-impact-lead">
							{isDonor ? t("profile-hero-lead-donor") : t("profile-hero-lead-new")}
						</p>
						<Link to={DONATE_PAGE} className="btn btn-primary">
							{isDonor ? t("profile-donate-again") : t("profile-donate-first")}
							<IoArrowForward aria-hidden />
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	)
}

export default ProfileHero
