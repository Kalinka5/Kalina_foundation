import { useQuery } from "@tanstack/react-query"

export type Currency = "uah" | "usd"

/** Suggested amounts per currency. Index i means the same thing in both currencies. */
export const PRESETS: Record<Currency, readonly number[]> = {
	uah: [200, 500, 1000, 2000],
	usd: [10, 25, 50, 100],
}

/** Preset that is selected when nothing else is chosen. */
export const DEFAULT_PRESET_INDEX = 2

/** Used only if the NBU rate can't be fetched. */
const FALLBACK_UAH_PER_USD = 44

export function formatMoney(value: number, currency: Currency, lang: string) {
	return new Intl.NumberFormat(lang === "ua" ? "uk-UA" : "en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
		currencyDisplay: "narrowSymbol",
		maximumFractionDigits: 0,
	}).format(Math.round(value))
}

type NbuRate = { rate: number; exchangedate: string }

/** Official National Bank of Ukraine UAH/USD rate, cached for 12 hours. */
export function useUahPerUsd() {
	const { data } = useQuery({
		queryKey: ["nbu-rate", "USD"],
		queryFn: async () => {
			const res = await fetch(
				"https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json"
			)
			if (!res.ok) throw new Error("NBU rate unavailable")
			const [row] = (await res.json()) as NbuRate[]
			if (!row?.rate) throw new Error("NBU rate missing")
			return { rate: row.rate, date: row.exchangedate }
		},
		staleTime: 12 * 60 * 60 * 1000,
		gcTime: 24 * 60 * 60 * 1000,
		retry: 1,
		refetchOnWindowFocus: false,
	})

	return {
		rate: data?.rate ?? FALLBACK_UAH_PER_USD,
		/** dd.mm.yyyy from NBU, or null when the fallback rate is used. */
		date: data?.date ?? null,
	}
}

/** Converts between UAH and USD. */
export function convert(value: number, from: Currency, to: Currency, uahPerUsd: number) {
	if (from === to) return value
	return from === "usd" ? value * uahPerUsd : value / uahPerUsd
}
