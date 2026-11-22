import api from "./api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"

/* ==========================================================================
   Auth API calls and validation shared by the Login, Register,
   Forgot password and Reset password pages.
   ========================================================================== */

type Tokens = { access: string; refresh: string }

const hasTokens = (value: unknown): value is Tokens =>
	typeof (value as Tokens)?.access === "string" &&
	typeof (value as Tokens)?.refresh === "string"

export const saveTokens = ({ access, refresh }: Tokens) => {
	localStorage.setItem(ACCESS_TOKEN, access)
	localStorage.setItem(REFRESH_TOKEN, refresh)
}

/** Returns true when the credentials were accepted and the tokens saved. */
export async function loginWithPassword(email: string, password: string) {
	const response = await api("token/", {
		method: "POST",
		body: JSON.stringify({ email, password }),
	})
	if (!hasTokens(response)) return false
	saveTokens(response)
	return true
}

/** Exchanges a Google ID token for our JWTs. Returns true on success. */
export async function loginWithGoogle(credential: string) {
	const response = await api("google-auth/", {
		method: "POST",
		body: JSON.stringify({ id_token: credential }),
	})
	if (response?.status !== "success" || !hasTokens(response.tokens)) {
		return false
	}
	saveTokens(response.tokens)
	return true
}

export type RegisterResult =
	| { ok: true }
	| { ok: false; field?: "email"; messageKey: string }

export async function register(
	email: string,
	password: string
): Promise<RegisterResult> {
	const response = await api("register", {
		method: "POST",
		// The backend still requires a username; the email is used for it.
		body: JSON.stringify({ username: email, email, password }),
	})

	if (response?.ok) return { ok: true }
	// DRF returns field errors as { email: [...] } / { username: [...] }
	if (response?.email) {
		return { ok: false, field: "email", messageKey: "register-email-exists" }
	}
	if (response?.username) {
		return { ok: false, field: "email", messageKey: "register-username-exists" }
	}
	return { ok: false, messageKey: "register-error-message" }
}

/** The backend answers "success" whether or not the account exists. */
export async function requestPasswordReset(email: string) {
	const response = await api("forgot-password/", {
		method: "POST",
		body: JSON.stringify({ email }),
	})
	return response?.status === "success"
}

export async function resetPassword(
	token: string,
	email: string,
	newPassword: string
) {
	const response = await api("reset-password/", {
		method: "POST",
		body: JSON.stringify({ token, email, new_password: newPassword }),
	})
	return response?.status === "success"
}

/* ---------- Validation ---------- */

export const PASSWORD_MIN_LENGTH = 8

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim())

export type PasswordStrength = 0 | 1 | 2 | 3 | 4

/**
 * Rough strength score for the meter on Register and Reset password:
 * 0 empty or too short, 1 weak, 2 fair, 3 good, 4 strong.
 */
export function passwordStrength(password: string): PasswordStrength {
	if (password.length < PASSWORD_MIN_LENGTH) return 0

	let score = 1
	if (password.length >= 12) score += 1
	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
	if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1
	return Math.min(score, 4) as PasswordStrength
}
