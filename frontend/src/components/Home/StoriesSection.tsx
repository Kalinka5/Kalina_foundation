import React from "react"
import { useTranslation } from "react-i18next"
import {
	useScrollAnimation,
	useStaggeredAnimation,
} from "../../lib/useAnimations.tsx"
import "../../styles/home/storiesSection.css"

function StoriesSection() {
	const { t } = useTranslation()

	// Animation hooks
	const { elementRef: sectionRef, isVisible } = useScrollAnimation<HTMLElement>(
		{
			threshold: 0.2,
			triggerOnce: true,
		}
	)
	const { containerRef: gridRef, visibleItems } =
		useStaggeredAnimation<HTMLDivElement>(6, {
			stagger: 120,
			threshold: 0.1,
		})
	const { elementRef: ctaRef, isVisible: ctaVisible } =
		useScrollAnimation<HTMLDivElement>({
			threshold: 0.5,
			triggerOnce: true,
		})

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
		<section
			ref={sectionRef}
			className={`stories-section ${isVisible ? "visible" : ""}`}
			id="stories-section"
		>
			<div className="stories-container">
				<div className="stories-header">
					<h2
						className={`stories-title ${
							isVisible ? "animate-fade-up visible" : "animate-fade-up"
						}`}
					>
						{t("stories-title")}
					</h2>
					<p
						className={`stories-subtitle ${
							isVisible
								? "animate-fade-up visible stagger-1"
								: "animate-fade-up stagger-1"
						}`}
					>
						{t("stories-subtitle")}
					</p>
				</div>

				<div className="journeys-section">
					<h3
						className={`journeys-title ${
							isVisible
								? "animate-fade-up visible stagger-2"
								: "animate-fade-up stagger-2"
						}`}
					>
						{t("stories-brigades-title")}
					</h3>

					<div ref={gridRef} className="stories-grid">
						{stories.map((story, index) => (
							<div
								key={story.id}
								className={`story-card hover-lift glass-effect ${
									visibleItems[index]
										? "animate-fade-up visible"
										: "animate-fade-up"
								}`}
							>
								<div className="story-image">
									<img
										src={story.image}
										alt={`${story.name}'s story`}
										onError={e => {
											e.currentTarget.src = story.fallbackImage
										}}
										className="tilt-3d"
									/>
								</div>
								<div className="story-content">
									<p className="story-description">
										<span className="brigade-name yellow-text">
											{story.name}:
										</span>{" "}
										{story.description}
									</p>
									<button className="story-button btn-animated btn-ripple">
										{t("stories-read-story-button")}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div
					ref={ctaRef}
					className={`call-to-action glass-effect ${
						ctaVisible ? "visible" : ""
					}`}
				>
					<h3
						className={`cta-title ${
							ctaVisible ? "animate-scale-in visible" : "animate-scale-in"
						}`}
					>
						{t("stories-cta-title")}
					</h3>
					<p
						className={`cta-description ${
							ctaVisible
								? "animate-fade-up visible stagger-1"
								: "animate-fade-up stagger-1"
						}`}
					>
						{t("stories-cta-description")}
					</p>
					<button
						className={`donate-button btn-animated btn-pulse ${
							ctaVisible
								? "animate-scale-in visible stagger-2"
								: "animate-scale-in stagger-2"
						}`}
					>
						{t("stories-cta-button")}
					</button>
				</div>
			</div>
		</section>
	)
}

export default StoriesSection
