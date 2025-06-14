import React, { useState } from "react"

import Footer from "../components/Footer.js"
import Header from "../components/Header.tsx"
import Donators from "../components/Home/Donators/Donators.tsx"
import ImpactStatistics from "../components/Home/ImpactStatistics/ImpactStatistics.tsx"
import Items from "../components/Home/Items/Items.tsx"
import MissionHighlights from "../components/Home/MissionHighlights/MissionHighlights.tsx"
import Slider from "../components/Home/Slider/Slider.tsx"
import UrgentNeeds from "../components/Home/UrgentNeeds/UrgentNeeds.tsx"

import { MAX_PAGE_NUMBER } from "../lib/constants.js"

import { useMediaQuery } from "@uidotdev/usehooks"

import { useTranslation } from "react-i18next"

import NotFound from "./NotFound.js"

function Home() {
	const [page, setPage] = useState(1)
	const isPhoneDisplay = useMediaQuery("only screen and (max-width: 1064px)")

	const { t } = useTranslation()

	const SectionLinks = [
		{ id: 1, urlLink: "#slider-section", urlName: t("about-us") },
		{ id: 2, urlLink: "#urgent-needs-section", urlName: t("urgent-needs") },
		{ id: 3, urlLink: "#items-section", urlName: t("donate") },
		{ id: 4, urlLink: "#impact-section", urlName: t("our-impact") },
		{ id: 5, urlLink: "#donators-section", urlName: t("top-donators") },
	]

	return (
		<div className="main">
			<Header fixed="pos-fixed">{!isPhoneDisplay && SectionLinks}</Header>
			{page > 0 && page < MAX_PAGE_NUMBER ? (
				<>
					<Slider page={page} setPage={setPage} />
					<UrgentNeeds />
					<MissionHighlights />
					<Items page={page} />
					<ImpactStatistics />
					<Donators />
					<Footer />
				</>
			) : (
				<NotFound />
			)}
		</div>
	)
}

export default Home
