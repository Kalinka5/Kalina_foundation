import { MotionConfig } from "framer-motion"
import { useState } from "react"

import Footer from "../components/Footer"
import Header from "../components/Header"
import BrigadeMarquee from "../components/Home/BrigadeMarquee"
import DonateSection from "../components/Home/DonateSection"
import FinalCTA from "../components/Home/FinalCTA"
import HeroSection from "../components/Home/HeroSection"
import HowItWorks from "../components/Home/HowItWorks"
import MissionSection from "../components/Home/MissionSection"
import MobileDonateBar from "../components/Home/MobileDonateBar"
import StoriesSection from "../components/Home/StoriesSection"
import TopDonators from "../components/Home/TopDonators"
import UrgentNeeds from "../components/Home/UrgentNeeds"

import { MAX_PAGE_NUMBER } from "../lib/constants"

import NotFound from "./NotFound"

import "../styles/home/home.css"

// Home page navigation links
const homeNavLinks = [
	{ id: 1, urlLink: "#hero-section", urlName: "about-us" },
	{ id: 2, urlLink: "#urgent-needs", urlName: "home-nav-needs" },
	{ id: 3, urlLink: "#our-mission", urlName: "our-mission" },
	{ id: 4, urlLink: "#stories", urlName: "stories" },
	{ id: 5, urlLink: "#donate", urlName: "donate" },
	{ id: 6, urlLink: "#top-donators", urlName: "top-donators" },
]

function Home() {
	const [page] = useState(1)

	return (
		<MotionConfig reducedMotion="user">
			<div className="main home-page">
				<Header fixed="pos-fixed" variant="home" navLinks={homeNavLinks} />
				{page > 0 && page < MAX_PAGE_NUMBER ? (
					<main className="home-content">
						<HeroSection />
						<BrigadeMarquee />
						<UrgentNeeds />
						<MissionSection />
						<StoriesSection />
						<HowItWorks />
						<DonateSection />
						<TopDonators />
						<FinalCTA />
						<Footer />
						<MobileDonateBar />
					</main>
				) : (
					<NotFound />
				)}
			</div>
		</MotionConfig>
	)
}

export default Home
