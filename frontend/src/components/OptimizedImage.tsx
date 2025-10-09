import { useEffect, useState } from "react"

export interface OptimizedImageProps {
	src: string
	alt: string
	className?: string
	sizes?: string
	width?: number
	height?: number
	priority?: boolean
	onLoad?: () => void
	onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
	fallbackSrc?: string
}

/**
 * Professional OptimizedImage Component
 * Features:
 * - WebP format with PNG/JPG fallback
 * - Responsive images with srcSet
 * - Lazy loading for non-critical images
 * - Progressive blur placeholder
 * - Error handling with fallback
 * - Preloading for critical images
 */
export const OptimizedImage = ({
	src,
	alt,
	className = "",
	sizes,
	width,
	height,
	priority = false,
	onLoad,
	onError,
	fallbackSrc = "/img/ukrainian-hero.png",
}: OptimizedImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	// Generate WebP source
	const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, ".webp")

	// Generate responsive image sources based on image size class
	const getResponsiveSources = (baseSrc: string) => {
		const extension = baseSrc.match(/\.(png|jpg|jpeg|webp)$/)?.[0] || ".png"
		const baseWithoutExt = baseSrc.replace(/\.(png|jpg|jpeg|webp)$/, "")

		return {
			small: `${baseWithoutExt}-small${extension}`,
			medium: `${baseWithoutExt}-medium${extension}`,
			large: baseSrc,
		}
	}

	const pngSources = getResponsiveSources(src)
	const webpSources = getResponsiveSources(webpSrc)

	const handleLoad = () => {
		setIsLoaded(true)
		onLoad?.()
	}

	const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		setHasError(true)
		if (onError) {
			onError(e)
		} else {
			// Default error handling
			e.currentTarget.src = fallbackSrc
		}
	}

	// Preload critical images
	useEffect(() => {
		if (priority && typeof window !== "undefined") {
			const link = document.createElement("link")
			link.rel = "preload"
			link.as = "image"
			link.href = src
			link.type = "image/webp"
			document.head.appendChild(link)

			return () => {
				document.head.removeChild(link)
			}
		}
	}, [priority, src])

	return (
		<picture>
			{/* WebP sources with responsive sizes */}
			<source
				type="image/webp"
				srcSet={`
					${webpSources.small} 140w,
					${webpSources.medium} 180w,
					${webpSources.large} 220w
				`}
				sizes={
					sizes || "(max-width: 768px) 120px, (max-width: 1024px) 150px, 220px"
				}
			/>

			{/* PNG/JPG fallback sources with responsive sizes */}
			<source
				type={src.endsWith(".png") ? "image/png" : "image/jpeg"}
				srcSet={`
					${pngSources.small} 140w,
					${pngSources.medium} 180w,
					${pngSources.large} 220w
				`}
				sizes={
					sizes || "(max-width: 768px) 120px, (max-width: 1024px) 150px, 220px"
				}
			/>

			{/* Fallback img element */}
			<img
				src={src}
				alt={alt}
				className={`optimized-image ${className} ${isLoaded ? "loaded" : ""} ${
					hasError ? "error" : ""
				}`}
				width={width}
				height={height}
				loading={priority ? "eager" : "lazy"}
				decoding="async"
				onLoad={handleLoad}
				onError={handleError}
			/>
		</picture>
	)
}

export default OptimizedImage
