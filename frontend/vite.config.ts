import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [react()],
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
}))
