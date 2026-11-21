import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { LuArrowRight } from "react-icons/lu"
import { Link } from "react-router-dom"

import { DONATE_PAGE } from "../../lib/constants"
import { useLimitedItems, useTotalDonated } from "../../lib/hooks"
import OptimizedImage from "../OptimizedImage"
import { BRIGADES } from "./data"
import { CountUp, EASE, Parallax, ProgressBar, RevealText } from "./motion"

import "../../styles/home/heroSection.css"
import "../../styles/optimizedImage.css"

const ITEMS_LIMIT = 16

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.7, ease: EASE, delay },
})

function HeroSection() {
	const { t } = useTranslation()
	const { data: totalData } = useTotalDonated()
	const { data: items } = useLimitedItems(ITEMS_LIMIT)

	const openItems = (items ?? []).filter(i => i.collected < i.full_price)
	const openCount = openItems.length
	const featured = [...openItems].sort(
		(a, b) => b.collected / b.full_price - a.collected / a.full_price
	)[0]
	const featuredPct = featured
		? Math.round((featured.collected / featured.full_price) * 100)
		: 0

	return (
		<section className="hero" id="hero-section">
			<div className="hero-bg-mobile" aria-hidden="true">
				<OptimizedImage
					src="/img/home-background2.png"
					alt=""
					width={992}
					height={992}
					sizes="100vw"
				/>
			</div>

			<div className="h-container hero-grid">
				<div className="hero-copy">
					<motion.p className="h-eyebrow" {...fadeUp(0)}>
						<span className="live-dot" aria-hidden="true" />
						{t("home-hero-eyebrow")}
					</motion.p>

					<RevealText
						as="h1"
						className="hero-title"
						text={t("home-hero-title")}
						delay={0.1}
						immediate
					/>

					<motion.p className="hero-subtitle" {...fadeUp(0.45)}>
						{t("home-hero-subtitle")}
					</motion.p>

					<motion.div className="hero-actions" {...fadeUp(0.6)}>
						<Link to={DONATE_PAGE} className="btn btn-primary btn-lg">
							{t("hero-section-donate-button")}
							<LuArrowRight aria-hidden="true" />
						</Link>
						<a href="#urgent-needs" className="btn btn-ghost btn-lg">
							{t("home-hero-secondary")}
						</a>
					</motion.div>

					<motion.dl className="hero-stats" {...fadeUp(0.75)}>
						<div className="hero-stat">
							<dt>{t("home-stat-raised")}</dt>
							<dd>
								<CountUp value={totalData?.total_donated ?? 0} prefix="$" />
							</dd>
						</div>
						<div className="hero-stat">
							<dt>{t("home-stat-brigades")}</dt>
							<dd>
								<CountUp value={BRIGADES.length} />
							</dd>
						</div>
						<div className="hero-stat">
							<dt>{t("home-stat-fundraisers")}</dt>
							<dd>
								<CountUp
									value={openCount}
									suffix={items?.length === ITEMS_LIMIT ? "+" : ""}
								/>
							</dd>
						</div>
					</motion.dl>
				</div>

				<div className="hero-mosaic" aria-hidden="true">
					<motion.div
						className="mosaic-tile mosaic-main"
						initial={{ opacity: 0, scale: 1.06 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
					>
						<Parallax distance={50} className="mosaic-parallax">
							<OptimizedImage
								src="/img/home-background2.png"
								alt=""
								priority
								width={992}
								height={992}
								sizes="(max-width: 1024px) 100vw, 40vw"
							/>
						</Parallax>
					</motion.div>
					<motion.div
						className="mosaic-tile mosaic-top"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: EASE, delay: 0.4 }}
					>
						<OptimizedImage
							src="/img/home-background6.png"
							alt=""
							priority
							width={1024}
							height={1024}
							sizes="20vw"
						/>
					</motion.div>
					<motion.div
						className="mosaic-tile mosaic-bottom"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: EASE, delay: 0.55 }}
					>
						<OptimizedImage
							src="/img/home-background9.png"
							alt=""
							width={1024}
							height={1024}
							sizes="20vw"
						/>
					</motion.div>

					{featured && (
						<motion.div
							className="mosaic-card"
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: EASE, delay: 1 }}
						>
							<span className="mosaic-card-label">
								{t("home-hero-featured-label")}
							</span>
							<span className="mosaic-card-title">
								{t(`${featured.title}-title`)}
							</span>
							<ProgressBar value={featuredPct} label={`${featuredPct}%`} />
							<span className="mosaic-card-meta">
								<strong>{featuredPct}%</strong> {t("home-funded")}
							</span>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	)
}

export default HeroSection
