import { ReactNode } from "react"

type ProfileSectionProps = {
	id: string
	title: string
	lead?: string
	tone?: "danger"
	/** Rendered at the right of the heading, e.g. a count */
	aside?: ReactNode
	children: ReactNode
}

/** One card on the Profile page; also a scroll and focus target for the nav. */
function ProfileSection({ id, title, lead, tone, aside, children }: ProfileSectionProps) {
	const headingId = `${id}-title`
	return (
		<section
			id={id}
			className={`profile-section${tone ? ` profile-section--${tone}` : ""}`}
			aria-labelledby={headingId}
			tabIndex={-1}
		>
			{/* A div, not <header>: styles/header.css styles every header element */}
			<div className="profile-section-head">
				<div>
					<h2 className="profile-section-title" id={headingId}>
						{title}
					</h2>
					{lead && <p className="profile-section-lead">{lead}</p>}
				</div>
				{aside}
			</div>
			{children}
		</section>
	)
}

export default ProfileSection
