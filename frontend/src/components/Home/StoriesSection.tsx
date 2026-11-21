import { useTranslation } from "react-i18next"

import { BRIGADES } from "./data"
import { Reveal, RevealText } from "./motion"

import "../../styles/home/storiesSection.css"

function StoriesSection() {
	const { t } = useTranslation()

	return (
		<section className="h-section stories" id="stories">
			<div className="h-container">
				<div className="h-section-head">
					<Reveal>
						<p className="h-eyebrow">{t("stories-brigades-title")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("home-stories-title")} />
					<Reveal delay={0.15}>
						<p className="h-lead">{t("home-stories-subtitle")}</p>
					</Reveal>
				</div>
			</div>

			{/* Full-bleed so cards can be swiped edge to edge on mobile. */}
			<ul className="stories-rail">
				{BRIGADES.map((brigade, index) => {
					const name = t(`stories-brigade-${brigade.key}-name`)
					return (
						<Reveal
							as="li"
							key={brigade.key}
							delay={(index % 3) * 0.08}
							className="story-card"
						>
							<img
								src={brigade.image}
								alt=""
								loading="lazy"
								width={1232}
								height={928}
							/>
							<div className="story-shade" aria-hidden="true" />
							<div className="story-body">
								<span className="story-tag">
									{t(`home-brigade-short-${brigade.key}`)}
								</span>
								<h3 className="story-name">{name}</h3>
								<p className="story-text">
									{t(`stories-brigade-${brigade.key}-description`)}
								</p>
							</div>
						</Reveal>
					)
				})}
			</ul>
		</section>
	)
}

export default StoriesSection
