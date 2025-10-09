/**
 * Professional Image Optimization Script
 *
 * This script:
 * 1. Converts images to WebP format
 * 2. Creates responsive sizes (small, medium, large)
 * 3. Compresses images for optimal web performance
 *
 * Usage:
 *   npm run optimize-images
 *
 * Requirements:
 *   npm install sharp --save-dev
 */

const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// Configuration
const CONFIG = {
	inputDir: path.join(__dirname, "public", "img"),
	outputDir: path.join(__dirname, "public", "img"),

	// Image patterns to optimize
	patterns: [
		"home-background*.png",
		"login-background*.png",
		"register-background*.png",
		"team-photo*.png",
	],

	// Size configurations for responsive images
	sizes: {
		small: { width: 400, suffix: "-small" },
		medium: { width: 600, suffix: "-medium" },
		large: { width: 800, suffix: "" }, // High resolution for large displays
	},

	// Quality settings
	quality: {
		webp: 95, // High quality for better image fidelity
		png: 95, // High quality PNG
		jpeg: 92, // High quality JPEG
	},
}

/**
 * Get all files matching patterns
 */
function getMatchingFiles(dir, patterns) {
	const files = fs.readdirSync(dir)
	const matchingFiles = []

	patterns.forEach(pattern => {
		const regex = new RegExp(pattern.replace("*", ".*"))
		files.forEach(file => {
			if (
				regex.test(file) &&
				!file.includes("-small") &&
				!file.includes("-medium")
			) {
				matchingFiles.push(path.join(dir, file))
			}
		})
	})

	return [...new Set(matchingFiles)] // Remove duplicates
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
	const ext = path.extname(inputPath)
	const basename = path.basename(inputPath, ext)
	const dirname = path.dirname(inputPath)

	console.log(`\nOptimizing: ${basename}${ext}`)

	try {
		const image = sharp(inputPath)
		const metadata = await image.metadata()

		// Process each size
		for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
			const outputBase = path.join(dirname, `${basename}${sizeConfig.suffix}`)

			// Calculate height maintaining aspect ratio
			const width = sizeConfig.width
			const height = Math.round((width / metadata.width) * metadata.height)

			// Resize image
			const resizedImage = sharp(inputPath).resize(width, height, {
				fit: "cover",
				position: "center",
			})

			// Generate WebP version
			const webpOutput = `${outputBase}.webp`
			await resizedImage
				.clone()
				.webp({ quality: CONFIG.quality.webp, effort: 6 })
				.toFile(webpOutput)

			console.log(
				`  ✓ Created ${sizeName} WebP: ${path.basename(
					webpOutput
				)} (${width}x${height})`
			)

			// Optimize original format (PNG or JPEG)
			const originalOutput = `${outputBase}${ext}`
			if (ext.toLowerCase() === ".png") {
				await resizedImage
					.clone()
					.png({ quality: CONFIG.quality.png, compressionLevel: 9, effort: 10 })
					.toFile(originalOutput)
			} else if (
				ext.toLowerCase() === ".jpg" ||
				ext.toLowerCase() === ".jpeg"
			) {
				await resizedImage
					.clone()
					.jpeg({ quality: CONFIG.quality.jpeg, progressive: true })
					.toFile(originalOutput)
			}

			console.log(
				`  ✓ Created ${sizeName} ${ext.toUpperCase()}: ${path.basename(
					originalOutput
				)} (${width}x${height})`
			)
		}

		console.log(`✓ Completed: ${basename}${ext}`)
	} catch (error) {
		console.error(`✗ Error optimizing ${basename}${ext}:`, error.message)
	}
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
	console.log("🖼️  Professional Image Optimization Script")
	console.log("==========================================\n")
	console.log(`Input directory: ${CONFIG.inputDir}`)
	console.log(`Output directory: ${CONFIG.outputDir}`)
	console.log(`Patterns: ${CONFIG.patterns.join(", ")}\n`)

	// Get all matching files
	const files = getMatchingFiles(CONFIG.inputDir, CONFIG.patterns)

	if (files.length === 0) {
		console.log("No matching files found!")
		return
	}

	console.log(`Found ${files.length} image(s) to optimize:\n`)
	files.forEach(file => console.log(`  - ${path.basename(file)}`))

	// Optimize each file
	for (const file of files) {
		await optimizeImage(file)
	}

	console.log("\n==========================================")
	console.log("✓ Image optimization complete!")
	console.log("\nGenerated files:")
	console.log("  - WebP versions for modern browsers")
	console.log("  - Small, medium, large sizes for responsive loading")
	console.log("  - Optimized PNG/JPEG fallbacks")
}

// Run optimization
optimizeAllImages().catch(error => {
	console.error("Fatal error:", error)
	process.exit(1)
})
