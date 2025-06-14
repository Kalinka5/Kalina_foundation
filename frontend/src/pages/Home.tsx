import React, { useState } from "react"

import Footer from "../components/Footer.js"
import Header from "../components/Header.tsx"
import DonateBanner from "../components/Home/DonateBanner.tsx"
import DonationDrives from "../components/Home/DonationDrives.tsx"
import HeroSection from "../components/Home/HeroSection.tsx"
import TopHeroes from "../components/Home/TopHeroes.tsx"
import WatchNow from "../components/Home/WatchNow.tsx"

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
		{ id: 2, urlLink: "#donation-drives", urlName: t("donation-drives") },
		{ id: 3, urlLink: "#watch-now", urlName: t("watch-now") },
		{ id: 4, urlLink: "#donate-banner", urlName: t("donate") },
	]

	return (
		<div className="main">
			<Header fixed="pos-fixed">{!isPhoneDisplay && SectionLinks}</Header>
			{page > 0 && page < MAX_PAGE_NUMBER ? (
				<>
					<HeroSection />
					<DonateBanner />
					<DonationDrives />
					<WatchNow />
					<TopHeroes />
					<Footer />
				</>
			) : (
				<NotFound />
			)}
		</div>
	)
}

export default Home
