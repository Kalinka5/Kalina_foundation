import { GOOGLE_CLIENT_ID } from "./constants"

/* ==========================================================================
   Google Identity Services, loaded only on the pages that show the
   Google button instead of on every page from index.html.
   ========================================================================== */

const SCRIPT_SRC = "https://accounts.google.com/gsi/client"
const LOAD_TIMEOUT_MS = 10000

let loading: Promise<GoogleAccountsId> | null = null

// initialize() should run once per page load. It keeps the callback for
// the lifetime of the page, so it forwards to whichever button is mounted.
let credentialHandler: ((response: GoogleCredentialResponse) => void) | null =
	null

export const isGoogleSignInConfigured = () => Boolean(GOOGLE_CLIENT_ID)

export function setGoogleCredentialHandler(
	handler: ((response: GoogleCredentialResponse) => void) | null
) {
	credentialHandler = handler
}

function loadScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script")
		script.src = SCRIPT_SRC
		script.async = true
		const timer = window.setTimeout(
			() => reject(new Error("Google Identity Services timed out")),
			LOAD_TIMEOUT_MS
		)
		script.onload = () => {
			window.clearTimeout(timer)
			resolve()
		}
		script.onerror = () => {
			window.clearTimeout(timer)
			script.remove()
			reject(new Error("Google Identity Services failed to load"))
		}
		document.head.appendChild(script)
	})
}

/** Loads and initializes Google Identity Services once; later calls reuse it. */
export function loadGoogleIdentity(): Promise<GoogleAccountsId> {
	if (!GOOGLE_CLIENT_ID) {
		return Promise.reject(new Error("Google Client ID is not configured"))
	}

	if (!loading) {
		loading = (window.google?.accounts?.id ? Promise.resolve() : loadScript())
			.then(() => {
				const googleId = window.google?.accounts?.id
				if (!googleId) throw new Error("Google Identity Services unavailable")

				googleId.initialize({
					client_id: GOOGLE_CLIENT_ID,
					callback: response => credentialHandler?.(response),
					auto_select: false,
					cancel_on_tap_outside: true,
				})
				return googleId
			})
			.catch(error => {
				// Allow a retry on the next mount (e.g. after a network blip).
				loading = null
				throw error
			})
	}

	return loading
}
