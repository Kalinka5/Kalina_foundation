import { useTranslation } from "react-i18next"
import { LuArrowRight } from "react-icons/lu"
import { Link } from "react-router-dom"

import { DONATE_PAGE } from "../../lib/constants"
import OptimizedImage from "../OptimizedImage"
import { Parallax, Reveal, RevealText } from "./motion"

import "../../styles/home/finalCta.css"
import "../../styles/optimizedImage.css"

function FinalCTA() {
	const { t } = useTranslation()
	const quote = t("donation-impact-testimonial-quote")
	const author = t("donation-impact-testimonial-author").replace(/^—\s*/, "")

	return (
		<section className="final-cta" id="final-cta">
			<Parallax distance={120} className="final-cta-bg">
				<OptimizedImage
					src="/img/home-background10.png"
					alt=""
					width={1024}
					height={1024}
					sizes="100vw"
				/>
			</Parallax>
			<div className="final-cta-shade" aria-hidden="true" />

			<div className="h-container final-cta-inner">
				<Reveal>
					<figure className="final-quote">
						<blockquote>“{quote}”</blockquote>
						<figcaption>{author}</figcaption>
					</figure>
				</Reveal>
				<RevealText className="final-title" text={t("home-final-title")} />
				<Reveal delay={0.15}>
					<p className="h-lead final-lead">{t("home-final-subtitle")}</p>
				</Reveal>
				<Reveal delay={0.25}>
					<Link to={DONATE_PAGE} className="btn btn-primary btn-lg">
						{t("hero-section-donate-button")}
						<LuArrowRight aria-hidden="true" />
					</Link>
				</Reveal>
			</div>
		</section>
	)
}

export default FinalCTA
