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

// Google Identity Services (loaded on demand, see lib/googleIdentity.ts)
declare global {
	interface Window {
		google?: {
			accounts?: {
				id?: GoogleAccountsId
			}
		}
	}

	type GoogleCredentialResponse = { credential?: string }

	type GoogleButtonConfig = {
		type?: "standard" | "icon"
		theme?: "outline" | "filled_blue" | "filled_black"
		size?: "large" | "medium" | "small"
		text?: "signin_with" | "signup_with" | "continue_with" | "signin"
		shape?: "rectangular" | "pill" | "circle" | "square"
		logo_alignment?: "left" | "center"
		width?: number
		locale?: string
	}

	type GoogleAccountsId = {
		initialize: (config: {
			client_id: string
			callback: (response: GoogleCredentialResponse) => void
			auto_select?: boolean
			cancel_on_tap_outside?: boolean
		}) => void
		renderButton: (parent: HTMLElement, options: GoogleButtonConfig) => void
		prompt: () => void
		cancel: () => void
	}
}

export {}
