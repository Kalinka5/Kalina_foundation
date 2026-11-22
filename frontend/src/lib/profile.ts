import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

import api from "./api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"

/* ==========================================================================
   Profile page data: the signed-in user's account, their donations and
   the account actions (update, change password, delete).
   ========================================================================== */

export type Profile = {
	id: number
	email: string
	first_name: string
	last_name: string
	image: string | null
	/** Decimal string, in UAH */
	donated: string
	is_superuser: boolean
	is_active: boolean
	/** False for accounts created through Google sign-in */
	has_password: boolean
	/** Place among all donors, or null before the first donation */
	rank: number | null
	donations_count: number
}

export type Donation = {
	id: number
	currency: "USD" | "ETH" | "BNB"
	original_amount: string
	amount_uah: string
	created_at: string
}

/** Same key as useUser in lib/hooks, so they share one cache entry. */
export const PROFILE_QUERY_KEY = ["user"] as const
const DONATIONS_QUERY_KEY = ["profile-donations"] as const

const isProfile = (value: unknown): value is Profile =>
	typeof (value as Profile)?.email === "string" &&
	typeof (value as Profile)?.id === "number"

async function fetchProfile(): Promise<Profile> {
	const response = await api("profile")
	if (!isProfile(response)) throw new Error("Failed to load the profile")
	return response
}

export function useProfile() {
	return useQuery<Profile>({
		queryKey: PROFILE_QUERY_KEY,
		queryFn: fetchProfile,
	})
}

async function fetchDonations(): Promise<Donation[]> {
	const response = await api("profile/donations")
	if (!Array.isArray(response)) throw new Error("Failed to load donations")
	return response as Donation[]
}

export function useDonations() {
	return useQuery<Donation[]>({
		queryKey: DONATIONS_QUERY_KEY,
		queryFn: fetchDonations,
		staleTime: 5 * 60 * 1000,
	})
}

/* ---------- Display helpers ---------- */

/** "Olena Koval", or the part of the email before the @ when no name is set. */
export function displayName(profile: Pick<Profile, "first_name" | "last_name" | "email">) {
	const fullName = [profile.first_name.trim(), profile.last_name.trim()]
		.filter(Boolean)
		.join(" ")
	return fullName || profile.email.split("@")[0]
}

export function initials(name: string) {
	return name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part.charAt(0))
		.join("")
		.toUpperCase()
}

/** The backend's placeholder avatar counts as "no photo", so initials show instead. */
export const hasCustomAvatar = (image: string | null) =>
	Boolean(image) && !image!.includes("default_profile")

export const localeFor = (language: string) =>
	language === "ua" ? "uk-UA" : "en-GB"

/* ---------- Avatar validation (mirrors the backend limits) ---------- */

export const AVATAR_MAX_BYTES = 5 * 1024 * 1024
export const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"]

/** Translation key of the problem with a chosen file, or null when it's fine. */
export function avatarError(file: File) {
	if (!AVATAR_TYPES.includes(file.type)) return "profile-avatar-type-error"
	if (file.size > AVATAR_MAX_BYTES) return "profile-avatar-size-error"
	return null
}

/* ---------- Actions ---------- */

export const NAME_MAX_LENGTH = 150

type ProfileFields = "first_name" | "last_name" | "image"

export type UpdateProfileResult =
	| { ok: true; profile: Profile }
	| { ok: false; fields: ProfileFields[] }

export async function updateProfile(
	changes: Partial<{ first_name: string; last_name: string; image: File }>
): Promise<UpdateProfileResult> {
	const formData = new FormData()
	if (changes.first_name !== undefined) formData.append("first_name", changes.first_name)
	if (changes.last_name !== undefined) formData.append("last_name", changes.last_name)
	if (changes.image) formData.append("image", changes.image, changes.image.name)

	try {
		const response = await api("profile", { method: "PATCH", body: formData })
		if (isProfile(response)) return { ok: true, profile: response }
		// DRF field errors: { first_name: [...], image: [...] }
		const fields = (["first_name", "last_name", "image"] as const).filter(
			field => response && field in response
		)
		return { ok: false, fields }
	} catch {
		return { ok: false, fields: [] }
	}
}

export type ChangePasswordResult =
	| "changed"
	| "wrong-current"
	| "weak"
	| "same"
	| "error"

export async function changePassword(
	currentPassword: string,
	newPassword: string
): Promise<ChangePasswordResult> {
	try {
		const response = await api("profile/password", {
			method: "POST",
			body: JSON.stringify({
				current_password: currentPassword,
				new_password: newPassword,
			}),
		})
		if (response?.status === "success") return "changed"
		if (response?.current_password) return "wrong-current"
		if (Array.isArray(response?.new_password)) {
			const same = response.new_password.some((message: string) =>
				message.includes("differ")
			)
			return same ? "same" : "weak"
		}
		return "error"
	} catch {
		return "error"
	}
}

export async function deleteAccount() {
	try {
		// 204 No Content comes back as null from the api() wrapper
		const response = await api("profile", { method: "DELETE" })
		if (response !== null) return false
	} catch {
		return false
	}
	// Remove only the session; theme and language preferences stay
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	return true
}

/** Puts a freshly saved profile into the cache and refreshes what depends on it. */
export function useApplyProfile() {
	const queryClient = useQueryClient()
	return useCallback(
		(profile: Profile) => {
			queryClient.setQueryData(PROFILE_QUERY_KEY, profile)
			// Name and photo also appear on the public supporters' board
			queryClient.invalidateQueries({ queryKey: ["donators"] })
		},
		[queryClient]
	)
}
