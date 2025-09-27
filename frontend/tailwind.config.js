/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			colors: {
				"monobank-purple": "#7B2CBF",
				"monobank-black": "#1A1A1A",
				"privat-green": "#00A651",
				"stripe-blue": "#635BFF",
				"metamask-orange": "#F79220",
			},
			animation: {
				progress: "progress 2s ease-in-out infinite",
				"fade-in": "fadeIn 0.5s ease-in-out",
				"scale-up": "scaleUp 0.3s ease-in-out",
				"bounce-subtle": "bounceSubtle 2s infinite",
				"pulse-glow": "pulseGlow 2s ease-in-out infinite",
			},
			keyframes: {
				progress: {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				scaleUp: {
					"0%": { transform: "scale(1)" },
					"100%": { transform: "scale(1.05)" },
				},
				bounceSubtle: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-5px)" },
				},
				pulseGlow: {
					"0%, 100%": { boxShadow: "0 0 0 0 rgba(99, 91, 255, 0.7)" },
					"70%": { boxShadow: "0 0 0 10px rgba(99, 91, 255, 0)" },
				},
			},
		},
	},
	plugins: [],
}



