import { MotionConfig } from "framer-motion"

import DonateHero from "../components/Donate/DonateHero"
import DonateMobileBar from "../components/Donate/DonateMobileBar"
import FaqSection from "../components/Donate/FaqSection"
import ImpactSection from "../components/Donate/ImpactSection"
import TrustSection from "../components/Donate/TrustSection"
import { useDonationState } from "../components/Donate/useDonationState"
import Footer from "../components/Footer"
import Header from "../components/Header"
import BrigadeMarquee from "../components/Home/BrigadeMarquee"

import "../styles/home/home.css"
import "../styles/donate/donate.css"

const donateNavLinks = [
	{ id: 1, urlLink: "#donate-hero", urlName: "donate" },
	{ id: 2, urlLink: "#impact", urlName: "donate-page-nav-impact" },
	{ id: 3, urlLink: "#trust", urlName: "donate-page-nav-trust" },
	{ id: 4, urlLink: "#faq", urlName: "donate-page-nav-faq" },
]

function Payment() {
	const donation = useDonationState()

	return (
		// Same cinematic system as Home (light and dark), so the flow feels continuous.
		<MotionConfig reducedMotion="user">
			<div className="main home-page donate-page">
				<Header fixed="pos-fixed" variant="home" navLinks={donateNavLinks} />
				<main className="home-content">
					<DonateHero state={donation} />
					<BrigadeMarquee />
					<ImpactSection state={donation} />
					<TrustSection />
					<FaqSection />
					<Footer />
					<DonateMobileBar state={donation} />
				</main>
			</div>
		</MotionConfig>
	)
}

export default Payment
