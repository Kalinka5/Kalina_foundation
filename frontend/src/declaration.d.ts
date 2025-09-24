declare module "*.jpg" {
	const value: string
	export default value
}

declare module "*.jpeg" {
	const value: string
	export default value
}

declare module "*.png" {
	const value: string
	export default value
}

// Google Identity Services declarations
declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (config: any) => void
					prompt: (callback?: (notification: any) => void) => void
					renderButton: (element: HTMLElement, config: any) => void
				}
			}
		}
	}
}

export {}
