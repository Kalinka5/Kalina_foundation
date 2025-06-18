import React from "react"
import "../../styles/home/donateBanner.css"

function DonateBanner() {
	const donateNowText = "Donate Now"

	const bannerContent = new Array(20).fill(donateNowText).join(" • ")

	return (
		<div className="donate-banner">
			<div className="banner-track">
				<div className="banner-content">{bannerContent}</div>
				<div className="banner-content" aria-hidden="true">
					&nbsp;• {bannerContent}
				</div>
			</div>
		</div>
	)
}

export default DonateBanner
