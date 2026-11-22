import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
	IoCheckmarkCircle,
	IoColorPaletteOutline,
	IoLockClosedOutline,
	IoPersonOutline,
	IoReceiptOutline,
	IoTrashOutline,
} from "react-icons/io5"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { EASE } from "../components/Home/motion"
import DangerZone from "../components/Profile/DangerZone"
import DonationHistory from "../components/Profile/DonationHistory"
import PersonalInfoSection from "../components/Profile/PersonalInfoSection"
import PreferencesSection from "../components/Profile/PreferencesSection"
import ProfileHero from "../components/Profile/ProfileHero"
import ProfileNav, { ProfileSectionLink } from "../components/Profile/ProfileNav"
import SecuritySection from "../components/Profile/SecuritySection"

import { Profile as ProfileData, useProfile } from "../lib/profile"

import "../styles/home/home.css"
import "../styles/auth/auth.css"
import "../styles/profile/profile.css"

const SECTIONS: ProfileSectionLink[] = [
	{ id: "personal", labelKey: "profile-section-personal", icon: IoPersonOutline },
	{ id: "donations", labelKey: "profile-section-donations", icon: IoReceiptOutline },
	{ id: "security", labelKey: "profile-section-security", icon: IoLockClosedOutline },
	{ id: "preferences", labelKey: "profile-section-preferences", icon: IoColorPaletteOutline },
	{ id: "danger", labelKey: "profile-section-danger", icon: IoTrashOutline, tone: "danger" },
]

const TOAST_MS = 4000

/** Short confirmation in the corner, announced politely to screen readers. */
function useToast() {
	const [message, setMessage] = useState<string | null>(null)
	const timer = useRef<number>()

	const show = useCallback((text: string) => {
		window.clearTimeout(timer.current)
		setMessage(text)
		timer.current = window.setTimeout(() => setMessage(null), TOAST_MS)
	}, [])
	useEffect(() => () => window.clearTimeout(timer.current), [])

	const toast = (
		<div className="profile-toast-region" role="status" aria-live="polite">
			<AnimatePresence>
				{message && (
					<motion.p
						className="profile-toast"
						initial={{ opacity: 0, y: -12, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.3, ease: EASE }}
					>
						<IoCheckmarkCircle aria-hidden />
						{message}
					</motion.p>
				)}
			</AnimatePresence>
		</div>
	)

	return { show, toast }
}

function ProfileContent({ profile }: { profile: ProfileData }) {
	const { t } = useTranslation()
	const { show, toast } = useToast()

	return (
		<>
			<ProfileHero profile={profile} />
			<div className="h-container profile-layout">
				<ProfileNav sections={SECTIONS} />
				<div className="profile-sections">
					<PersonalInfoSection
						id="personal"
						profile={profile}
						onSaved={() => show(t("profile-saved"))}
					/>
					<DonationHistory id="donations" profile={profile} />
					<SecuritySection id="security" profile={profile} />
					<PreferencesSection id="preferences" />
					<DangerZone id="danger" email={profile.email} />
				</div>
			</div>
			{toast}
		</>
	)
}

function ProfileSkeleton() {
	const { t } = useTranslation()
	return (
		<div className="profile-skeleton-page" aria-busy="true">
			<p className="sr-only" role="status">
				{t("profile-loading")}
			</p>
			<div className="profile-hero" aria-hidden="true">
				<div className="h-container profile-hero-inner">
					<div className="profile-identity">
						<span className="profile-skeleton profile-skeleton--avatar" />
						<div className="profile-identity-text">
							<span className="profile-skeleton profile-skeleton--eyebrow" />
							<span className="profile-skeleton profile-skeleton--title" />
							<span className="profile-skeleton profile-skeleton--line" />
						</div>
					</div>
					<div className="profile-impact">
						<div className="profile-stats">
							{[0, 1, 2].map(i => (
								<span key={i} className="profile-skeleton profile-skeleton--stat" />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="h-container profile-layout" aria-hidden="true">
				<div className="profile-nav">
					<span className="profile-skeleton profile-skeleton--nav" />
				</div>
				<div className="profile-sections">
					<span className="profile-skeleton profile-skeleton--card" />
					<span className="profile-skeleton profile-skeleton--card" />
				</div>
			</div>
		</div>
	)
}

function ProfileLoadError({ onRetry, retrying }: { onRetry: () => void; retrying: boolean }) {
	const { t } = useTranslation()
	return (
		<div className="h-container profile-load-error">
			<div className="auth-done auth-done--error">
				<h1 className="auth-title">{t("profile-load-error-title")}</h1>
				<p className="auth-lead">{t("profile-load-error-text")}</p>
				<button
					type="button"
					className="btn btn-primary"
					onClick={onRetry}
					disabled={retrying}
					aria-busy={retrying}
				>
					{retrying && <span className="auth-spinner" aria-hidden />}
					{t("profile-retry")}
				</button>
			</div>
		</div>
	)
}

function Profile() {
	const { t } = useTranslation()
	const profile = useProfile()

	useEffect(() => {
		const previous = document.title
		document.title = `${t("profile")} · Kalina Foundation`
		return () => {
			document.title = previous
		}
	}, [t])

	return (
		<MotionConfig reducedMotion="user">
			<div className="main home-page profile-page">
				<Header fixed="pos-fixed" variant="home" navLinks={[]} />
				<main className="profile-main" id="main-content">
					{profile.data ? (
						<ProfileContent profile={profile.data} />
					) : profile.isError ? (
						<ProfileLoadError
							onRetry={() => profile.refetch()}
							retrying={profile.isFetching}
						/>
					) : (
						<ProfileSkeleton />
					)}
				</main>
				<Footer />
			</div>
		</MotionConfig>
	)
}

export default Profile
