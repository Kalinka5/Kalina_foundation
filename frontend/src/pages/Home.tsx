import { useEffect, useState } from "react"

import Footer from "../components/Footer"
import Header from "../components/Header"
import DonationImpact from "../components/Home/DonationImpact"
import HeroSection from "../components/Home/HeroSection"
import InitiativesShowcase from "../components/Home/InitiativesShowcase"
import StoriesSection from "../components/Home/StoriesSection"
import TeamMission from "../components/Home/TeamMission"
import TopDonators from "../components/Home/TopDonators"

import { MAX_PAGE_NUMBER } from "../lib/constants"

import { useMediaQuery } from "@uidotdev/usehooks"

import { useTranslation } from "react-i18next"

import NotFound from "./NotFound"

// Import animation styles
import "../styles/animations.css"
import "../styles/home/animations-enhancement.css"

function Home() {
	const [page, setPage] = useState(1)
	const isPhoneDisplay = useMediaQuery("only screen and (max-width: 1064px)")

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

	// Home page navigation links
	const homeNavLinks = [
		{ id: 1, urlLink: "#hero-section", urlName: "about-us" },
		{ id: 2, urlLink: "#team-mission", urlName: "our-mission" },
		{ id: 3, urlLink: "#our-initiatives", urlName: "our-initiatives" },
		{ id: 4, urlLink: "#stories-section", urlName: "stories" },
		{ id: 5, urlLink: "#donation-impact", urlName: "donate" },
		{ id: 6, urlLink: "#top-donators", urlName: "top-donators" },
	]

	return (
		<div className="main home-page">
			<Header fixed="pos-fixed" navLinks={homeNavLinks} />
			{page > 0 && page < MAX_PAGE_NUMBER ? (
				<main className="home-content">
					<HeroSection />
					<TeamMission />
					<StoriesSection />
					<InitiativesShowcase />
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
