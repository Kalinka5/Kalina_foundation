import { QueryFunctionContext, useQuery } from "@tanstack/react-query"

import { EmailVerify, Item, User } from "./types"

import api from "./api"

// Get Items data
const getItems = async (n?: number, limit?: number): Promise<Item[]> => {
	try {
		console.log("Start getting data of items...")
		let url = "items/?format=json"

		if (limit) {
			url += `&limit=${limit}`
		} else if (n) {
			url += `&page=${n}`
		}

		const response = await api(url)

		return response as unknown as Item[]
	} catch (error) {
		console.error("Error fetching items:", (error as Error).message)
		return []
	}
}

export function useItems(n: number) {
	const items = useQuery<Item[]>({
		queryKey: ["items", n],
		queryFn: () => getItems(n),
		staleTime: 60 * 60 * 1000, // 1 hour
		gcTime: 24 * 60 * 60 * 1000, // Cache data for 24 hours
		refetchOnMount: false, // Do not refetch on mount if data is fresh
		refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
		placeholderData: (previousData, previousQuery) => previousData,
	})

	return items
}

// Get Limited Items for Donation Impact
export function useLimitedItems(limit: number) {
	const items = useQuery<Item[]>({
		queryKey: ["items", "limited", limit],
		queryFn: () => getItems(undefined, limit),
		staleTime: 60 * 60 * 1000, // 1 hour
		gcTime: 24 * 60 * 60 * 1000, // Cache data for 24 hours
		refetchOnMount: false, // Do not refetch on mount if data is fresh
		refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
		placeholderData: (previousData, previousQuery) => previousData,
	})

	return items
}

// Get Top 5 Donators data
const getDonators = async (): Promise<User[]> => {
	try {
		console.log("Start getting data of donators...")
		const response = await api("donators?format=json")
		return response as unknown as User[]
	} catch (error) {
		console.error("Error fetching donators:", (error as Error).message)
		return []
	}
}

export function useDonators() {
	const donators = useQuery<User[]>({
		queryKey: ["donators"],
		queryFn: getDonators,
		staleTime: 60 * 60 * 1000, // 1 hour
		gcTime: 24 * 60 * 60 * 1000, // Cache data for 24 hours
		refetchOnMount: false, // Do not refetch on mount if data is fresh
		refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
	})

	return donators
}

// Get Total Donated Sum
const getTotalDonated = async (): Promise<{ total_donated: number }> => {
	try {
		console.log("Start getting total donated data...")
		const response = await api("total-donated?format=json")
		return response as unknown as { total_donated: number }
	} catch (error) {
		console.error("Error fetching total donated:", (error as Error).message)
		return { total_donated: 0 }
	}
}

export function useTotalDonated() {
	const totalDonated = useQuery<{ total_donated: number }>({
		queryKey: ["totalDonated"],
		queryFn: getTotalDonated,
		staleTime: 60 * 60 * 1000, // 1 hour
		gcTime: 24 * 60 * 60 * 1000, // Cache data for 24 hours
		refetchOnMount: false, // Do not refetch on mount if data is fresh
		refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
	})

	return totalDonated
}

// Get SuperUser value
const getUser = async (): Promise<User> => {
	try {
		console.log("Start to sending a request to backend /profile")
		const response = (await api("profile")) as unknown as User
		console.log("The request was sending successfully!")
		return response as unknown as User
	} catch (error) {
		console.error("Error fetching items:", (error as Error).message)
		throw new Error("Failed to fetch user")
	}
}

export function useUser(auth: boolean) {
	const user = useQuery<User>({
		queryKey: ["user"],
		queryFn: getUser,
		enabled: auth,
	})

	if (user.data) {
		return user.data.is_superuser
	} else {
		return false
	}
}

// Get User data
const getUserData = async (): Promise<User> => {
	try {
		console.log("Start to sending a request to backend /profile")
		const response = (await api("profile")) as unknown as User
		console.log("The request was sending successfully!")
		return response as unknown as User
	} catch (error) {
		console.error("Error fetching items:", (error as Error).message)
		throw new Error("Failed to fetch user")
	}
}

export function useUserData(auth: boolean) {
	const user = useQuery<User>({
		queryKey: ["user"],
		queryFn: getUserData,
		enabled: auth,
	})

	return user
}

// Email Verification
const verifyEmail = async ({
	queryKey,
}: QueryFunctionContext): Promise<EmailVerify> => {
	const [, uid, token] = queryKey as [string, string, string] // Cast queryKey to the expected tuple type
	try {
		const response = await api(`activate/${uid}/${token}/`)
		return response as unknown as EmailVerify
	} catch (err) {
		alert(err)
		console.error(
			"Something went wrong when sending a request to activate the user"
		)
		throw new Error("Failed to fetch email verification")
	}
}

export function useEmailVerification(uid: string, token: string) {
	const queryKey: [string, string, string] = ["email-verify", uid, token]

	const emailVerification = useQuery<EmailVerify>({
		queryKey,
		queryFn: verifyEmail,
	})

	return emailVerification.data?.status
}

// Edit Item
const getItemData = async (id: string): Promise<Item> => {
	try {
		const response = await api(`items/${id}/`)
		return response as unknown as Item
	} catch (err) {
		alert(err)
		console.log("Something go wrong when sending backend request to /profile")
		throw new Error("Failed to fetch item data")
	}
}

export function useItemData(id: string) {
	const item = useQuery<Item>({
		queryKey: ["item", id],
		queryFn: () => getItemData(id),
	})

	return item
}
