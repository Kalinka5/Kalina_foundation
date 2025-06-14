import React, { useState } from "react"
import "../../styles/home/watchNow.css"

function WatchNow() {
	const [isPlaying, setIsPlaying] = useState(false)

	const handlePlayClick = () => {
		setIsPlaying(true)
		// Add video play logic here
	}

	return (
		<section className="watch-now">
			<div className="container">
				<div className="watch-now-header">
					<h2>WATCH NOW</h2>
				</div>
				<div className="video-container">
					<div className="video-player">
						<div className="video-overlay">
							<h3>internal</h3>
							{!isPlaying && (
								<button className="play-button" onClick={handlePlayClick}>
									<span className="play-icon">▶</span>
									<span className="play-text">Play Video</span>
								</button>
							)}
						</div>
						<div className="video-background"></div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default WatchNow
