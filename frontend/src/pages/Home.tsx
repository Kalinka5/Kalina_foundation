import React, { useEffect, useState } from "react"

import Footer from "../components/Footer.js"
import Header from "../components/Header.tsx"
import DonationImpact from "../components/Home/DonationImpact.tsx"
import HeroSection from "../components/Home/HeroSection.tsx"
import OurInitiatives from "../components/Home/OurInitiatives.tsx"
import StoriesSection from "../components/Home/StoriesSection.tsx"
import TeamMission from "../components/Home/TeamMission.tsx"
import TopDonators from "../components/Home/TopDonators.tsx"

import { MAX_PAGE_NUMBER } from "../lib/constants.js"
import { usePageLoadAnimation } from "../lib/useAnimations.tsx"

import { useMediaQuery } from "@uidotdev/usehooks"

import { useTranslation } from "react-i18next"

import NotFound from "./NotFound.js"

// Import animation styles
import "../styles/animations.css"
import "../styles/home/animations-enhancement.css"

function Home() {
	const [page, setPage] = useState(1)
	const isPhoneDisplay = useMediaQuery("only screen and (max-width: 1064px)")
	const isPageLoaded = usePageLoadAnimation(100) // Small delay for page load animation

	const { t } = useTranslation()

	// Performance optimization: Preload critical images
	useEffect(() => {
		const criticalImages = [
			"/img/ukrainian-hero.png",
			"/img/team-photo.png",
			"/img/team-photo-4x3.png",
		]

		criticalImages.forEach(src => {
			const img = new Image()
			img.src = src
		})
	}, [])

	// Smooth scroll enhancement
	useEffect(() => {
		// Enhance smooth scrolling behavior
		const handleScrollToSection = (e: Event) => {
			const target = e.target as HTMLAnchorElement
			if (target.hash) {
				e.preventDefault()
				const element = document.querySelector(target.hash)
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
					})
				}
			}
		}

		document.addEventListener("click", handleScrollToSection)
		return () => document.removeEventListener("click", handleScrollToSection)
	}, [])

	const SectionLinks = [
		{ id: 1, urlLink: "#hero-section", urlName: t("about-us") },
		{ id: 2, urlLink: "#team-mission", urlName: t("our-mission") },
		{ id: 3, urlLink: "#our-initiatives", urlName: t("our-initiatives") },
		{ id: 4, urlLink: "#stories-section", urlName: t("stories") },
		{ id: 5, urlLink: "#donation-impact", urlName: t("donate") },
		{ id: 6, urlLink: "#top-donators", urlName: t("top-donators") },
	]

	return (
		<div className={`main ${isPageLoaded ? "page-enter" : ""}`}>
			<Header fixed="pos-fixed">{!isPhoneDisplay && SectionLinks}</Header>
			{page > 0 && page < MAX_PAGE_NUMBER ? (
				<main className="home-content">
					<HeroSection />
					<TeamMission />
					<OurInitiatives />
					<StoriesSection />
					<DonationImpact />
					<TopDonators />
					<Footer />
				</main>
			) : (
				<NotFound />
			)}
		</div>
	)
}

export default Home
