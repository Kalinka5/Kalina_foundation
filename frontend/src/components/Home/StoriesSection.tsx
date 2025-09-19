import React from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/storiesSection.css"

function StoriesSection() {
	const { t } = useTranslation()

	const stories = [
		{
			id: 1,
			image: "/img/3oshbr.png",
			name: t("stories-brigade-3oshbr-name"),
			description: t("stories-brigade-3oshbr-description"),
			fallbackImage: "/img/carousel-img1.jpg",
		},
		{
			id: 2,
			image: "/img/110ombr.png",
			name: t("stories-brigade-110ombr-name"),
			description: t("stories-brigade-110ombr-description"),
			fallbackImage: "/img/carousel-img5.jpg",
		},
		{
			id: 3,
			image: "/img/47ombr.png",
			name: t("stories-brigade-47ombr-name"),
			description: t("stories-brigade-47ombr-description"),
			fallbackImage: "/img/carousel-img2.jpg",
		},
		{
			id: 4,
			image: "/img/92oshbr.png",
			name: t("stories-brigade-92oshbr-name"),
			description: t("stories-brigade-92oshbr-description"),
			fallbackImage: "/img/carousel-img3.jpg",
		},
		{
			id: 5,
			image: "/img/azov.png",
			name: t("stories-brigade-azov-name"),
			description: t("stories-brigade-azov-description"),
			fallbackImage: "/img/carousel-img4.jpg",
		},
		{
			id: 6,
			image: "/img/59ombr.png",
			name: t("stories-brigade-59ombr-name"),
			description: t("stories-brigade-59ombr-description"),
			fallbackImage: "/img/carousel-img6.jpg",
		},
	]

	return (
		<section className="stories-section" id="stories-section">
			<div className="stories-container">
				<div className="stories-header">
					<h2 className="stories-title">{t("stories-title")}</h2>
					<p className="stories-subtitle">{t("stories-subtitle")}</p>
				</div>

				<div className="journeys-section">
					<h3 className="journeys-title">{t("stories-brigades-title")}</h3>

					<div className="stories-grid">
						{stories.map(story => (
							<div key={story.id} className="story-card">
								<div className="story-image">
									<img
										src={story.image}
										alt={`${story.name}'s story`}
										onError={e => {
											e.currentTarget.src = story.fallbackImage
										}}
									/>
								</div>
								<div className="story-content">
									<p className="story-description">
										<span className="brigade-name">{story.name}:</span>{" "}
										{story.description}
									</p>
									<button className="story-button">
										{t("stories-read-story-button")}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="call-to-action">
					<h3 className="cta-title">{t("stories-cta-title")}</h3>
					<p className="cta-description">{t("stories-cta-description")}</p>
					<button className="cta-button">{t("stories-cta-button")}</button>
				</div>
			</div>
		</section>
	)
}

export default StoriesSection
