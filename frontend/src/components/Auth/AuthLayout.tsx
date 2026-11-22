import { useMediaQuery } from "@uidotdev/usehooks"
import { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import Header from "../Header"

import "../../styles/home/home.css"
import "../../styles/auth/auth.css"

// The artwork panel only exists on wide screens; below this it is not
// rendered at all, so phones never download the image.
const VISUAL_QUERY = "(min-width: 1024px)"

type AuthLayoutProps = {
	/** Base path of a WebP set from optimize-images.cjs, e.g. "/img/login-background1" */
	image: string
	eyebrowKey: string
	quoteKey: string
	children: ReactNode
}

/**
 * Full-page split layout for the account pages, built on the Home/Donate
 * tokens (.home-page) so it follows the same light and dark themes.
 */
function AuthLayout({ image, eyebrowKey, quoteKey, children }: AuthLayoutProps) {
	const { t } = useTranslation()
	const showVisual = useMediaQuery(VISUAL_QUERY)

	return (
		<div className="main home-page auth-page">
			<Header fixed="pos-fixed" variant="home" navLinks={[]} />
			<main className="auth">
				<div className="auth-panel">
					<div className="auth-card">{children}</div>
				</div>

				{showVisual && (
					<aside className="auth-visual" aria-hidden="true">
						<img
							className="auth-visual-image"
							src={`${image}.webp`}
							srcSet={`${image}-small.webp 400w, ${image}-medium.webp 600w, ${image}.webp 800w`}
							sizes="50vw"
							alt=""
							decoding="async"
						/>
						<div className="auth-visual-caption">
							<p className="h-eyebrow">{t(eyebrowKey)}</p>
							<p className="auth-visual-quote">{t(quoteKey)}</p>
						</div>
					</aside>
				)}
			</main>
		</div>
	)
}

export function AuthHeading({
	title,
	subtitle,
}: {
	title: string
	subtitle?: string
}) {
	return (
		<div className="auth-head">
			<h1 className="auth-title">{title}</h1>
			{subtitle && <p className="auth-lead">{subtitle}</p>}
		</div>
	)
}

export default AuthLayout
