import React, { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import "../../styles/home/watchNow.css"

function WatchNow() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)
	const { t } = useTranslation()

	const handlePlayClick = () => {
		setIsPlaying(true)
		setIsLoading(true)
		setHasError(false)
	}

	const handleVideoLoaded = () => {
		setIsLoading(false)
		if (videoRef.current) {
			videoRef.current.play().catch(error => {
				console.error("Error playing video:", error)
				setHasError(true)
				setIsLoading(false)
			})
		}
	}

	const handleVideoEnd = () => {
		setIsPlaying(false)
		setIsLoading(false)
	}

	const handleVideoError = (event: any) => {
		console.error("Video error:", event)
		setHasError(true)
		setIsLoading(false)
		setIsPlaying(false)
	}

	const handleLoadStart = () => {
		setIsLoading(true)
	}

	const handleCanPlay = () => {
		setIsLoading(false)
	}

	const handleRetry = () => {
		setHasError(false)
		setIsLoading(false)
		setIsPlaying(false)
	}

	const handleStopVideo = () => {
		if (videoRef.current) {
			videoRef.current.pause()
		}
		setIsPlaying(false)
		setIsLoading(false)
	}

	return (
		<section className="watch-now" id="watch-now">
			<div className="watch-now-header">
				<div className="container">
					<h2>{t("watch-now").toUpperCase()}</h2>
				</div>
			</div>
			<div className="video-section">
				<div className="container">
					<div className="video-container">
						<div className="video-player">
							{isPlaying && (
								<>
									{isLoading && (
										<div className="video-loading">
											<div className="loading-spinner"></div>
											<p>{t("loading-video")}</p>
										</div>
									)}
									{hasError && (
										<div className="video-error">
											<p>{t("unable-load-video")}</p>
											<button className="retry-button" onClick={handleRetry}>
												{t("try-again")}
											</button>
										</div>
									)}
									<button
										className="close-video-btn"
										onClick={handleStopVideo}
										title={t("close-video")}
									>
										×
									</button>
									<video
										ref={videoRef}
										className="video-element"
										controls
										controlsList="nodownload"
										crossOrigin="anonymous"
										preload="metadata"
										onLoadStart={handleLoadStart}
										onCanPlay={handleCanPlay}
										onLoadedData={handleVideoLoaded}
										onEnded={handleVideoEnd}
										onError={handleVideoError}
										style={{
											width: "100%",
											height: "100%",
											maxWidth: "100%",
											maxHeight: "100%",
											minHeight: "80vh",
											objectFit: "cover",
											backgroundColor: "#000",
											display: hasError ? "none" : "block",
											position: "relative",
											zIndex: 10,
										}}
									>
										<source
											src="https://kalina-fond-bucket.s3.eu-north-1.amazonaws.com/KalinaFondAdsVideo.mp4"
											type="video/mp4"
										/>
										{/* Temporary fallback for testing while CORS is being configured */}
										<source
											src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
											type="video/mp4"
										/>
										{/* Fallback for different formats */}
										<source
											src="https://kalina-fond-bucket.s3.eu-north-1.amazonaws.com/KalinaFondAdsVideo.webm"
											type="video/webm"
										/>
										Your browser does not support the video tag.
									</video>
								</>
							)}
							{!isPlaying && (
								<div className="video-overlay">
									<h3>{t("watch-now-overlay-title")}</h3>
									<button className="play-button" onClick={handlePlayClick}>
										<span className="play-icon">▶</span>
										<span className="play-text">{t("play-video")}</span>
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default WatchNow
