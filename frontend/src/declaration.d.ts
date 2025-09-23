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

// Google API declarations
declare global {
	interface Window {
		gapi: any // eslint-disable-line spellcheck/spell-checker
	}
}

declare const gapi: any // eslint-disable-line spellcheck/spell-checker
