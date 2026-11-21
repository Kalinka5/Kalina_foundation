import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [react()],
	optimizeDeps: {
		rolldownOptions: {
			moduleTypes: {
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
