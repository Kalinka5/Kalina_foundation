export const ACCESS_TOKEN = "access"
export const REFRESH_TOKEN = "refresh"

export const HOME_PAGE = "/home"
export const LOGIN_PAGE = "/login"
export const REGISTER_PAGE = "/register"
export const LOGOUT_PAGE = "/logout"
export const PROFILE_PAGE = "/profile"
export const DONATE_PAGE = "/donate"
export const TERMS_CONDITIONS_PAGE = "/terms"

export const API_URL = import.meta.env.DEV
	? "http://127.0.0.1:8000"
	: "https://kalina-foundation-back.vercel.app"

export const DONATION_ITEM_ID = 1

export const MAX_PAGE_NUMBER = 6

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""
