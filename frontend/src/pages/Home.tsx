import React, { useState } from "react"

import Footer from "../components/Footer.js"
import Header from "../components/Header.tsx"
import DonationImpact from "../components/Home/DonationImpact.tsx"
import HeroSection from "../components/Home/HeroSection.tsx"
import OurInitiatives from "../components/Home/OurInitiatives.tsx"
import StoriesSection from "../components/Home/StoriesSection.tsx"
import TeamMission from "../components/Home/TeamMission.tsx"
import TopDonators from "../components/Home/TopDonators.tsx"

import { MAX_PAGE_NUMBER } from "../lib/constants.js"

import { useMediaQuery } from "@uidotdev/usehooks"

import { useTranslation } from "react-i18next"

import NotFound from "./NotFound.js"

function Home() {
	const [page, setPage] = useState(1)
	const isPhoneDisplay = useMediaQuery("only screen and (max-width: 1064px)")

	const { t } = useTranslation()

	const SectionLinks = [
		{ id: 1, urlLink: "#hero-section", urlName: t("about-us") },
		{ id: 2, urlLink: "#team-mission", urlName: t("our-mission") },
		{ id: 3, urlLink: "#our-initiatives", urlName: t("our-initiatives") },
		{ id: 4, urlLink: "#stories-section", urlName: t("stories") },
		{ id: 5, urlLink: "#donation-impact", urlName: t("donate") },
		{ id: 6, urlLink: "#top-donators", urlName: t("top-donators") },
	]

	return (
		<div className="main">
			<Header fixed="pos-fixed">{!isPhoneDisplay && SectionLinks}</Header>
			{page > 0 && page < MAX_PAGE_NUMBER ? (
				<>
					<HeroSection />
					<TeamMission />
					<OurInitiatives />
					<StoriesSection />
					<DonationImpact />
					<TopDonators />
					<Footer />
				</>
			) : (
				<NotFound />
			)}
		</div>
	)
}

export default Home
