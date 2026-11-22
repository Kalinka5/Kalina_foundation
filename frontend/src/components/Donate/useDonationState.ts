import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { convert, Currency, DEFAULT_PRESET_INDEX, PRESETS, useUahPerUsd } from "./currency"
import { availableMethods, MethodId } from "./paymentDetails"

/** "preset:<index>" or "custom". */
export type AmountChoice = { kind: "preset"; index: number } | { kind: "custom" }

const MAX_AMOUNT = 10_000_000

function parseInitial(params: URLSearchParams, lang: string) {
	const rawCurrency = params.get("currency")?.toLowerCase()
	const rawAmount = Number(params.get("amount"))
	const hasAmount = Number.isFinite(rawAmount) && rawAmount >= 1

	// A bare ?amount= comes from the Home page, which works in USD.
	const currency: Currency =
		rawCurrency === "uah" || rawCurrency === "usd"
			? rawCurrency
			: hasAmount
				? "usd"
				: lang === "en"
					? "usd"
					: "uah"

	if (!hasAmount) {
		return { currency, choice: { kind: "preset", index: DEFAULT_PRESET_INDEX } as AmountChoice, custom: "" }
	}
	const amount = Math.min(Math.round(rawAmount), MAX_AMOUNT)
	const index = PRESETS[currency].indexOf(amount)
	return index >= 0
		? { currency, choice: { kind: "preset", index } as AmountChoice, custom: "" }
		: { currency, choice: { kind: "custom" } as AmountChoice, custom: String(amount) }
}

function recommendedMethod(currency: Currency, methods: MethodId[]): MethodId | undefined {
	const order: MethodId[] =
		currency === "uah"
			? ["monobank", "bank", "paypal", "crypto"]
			: ["paypal", "bank", "monobank", "crypto"]
	return order.find(m => methods.includes(m))
}

/** Amount, currency and method for the donation card, synced to the URL. */
export function useDonationState() {
	const { i18n } = useTranslation()
	const [params, setParams] = useSearchParams()
	const [initial] = useState(() => parseInitial(params, i18n.language))
	const methods = useMemo(availableMethods, [])
	const { rate } = useUahPerUsd()

	const [currency, setCurrencyState] = useState<Currency>(initial.currency)
	const [choice, setChoice] = useState<AmountChoice>(initial.choice)
	const [custom, setCustom] = useState(initial.custom)
	const [method, setMethod] = useState<MethodId | undefined>(() =>
		recommendedMethod(initial.currency, methods)
	)
	// Once the donor picks a method themselves, currency switches no longer override it.
	const [methodTouched, setMethodTouched] = useState(false)

	const amount =
		choice.kind === "preset"
			? PRESETS[currency][choice.index]
			: Math.min(Math.max(0, Math.floor(Number(custom) || 0)), MAX_AMOUNT)
	const isValid = amount >= 1
	const recommended = recommendedMethod(currency, methods)

	const setCurrency = useCallback(
		(next: Currency) => {
			if (next === currency) return
			// Presets keep their position; a typed amount is converted so its value is preserved.
			const typed = Number(custom)
			if (choice.kind === "custom" && typed >= 1) {
				setCustom(String(Math.max(1, Math.round(convert(typed, currency, next, rate)))))
			}
			setCurrencyState(next)
			if (!methodTouched) setMethod(recommendedMethod(next, methods))
		},
		[choice.kind, currency, custom, methodTouched, methods, rate]
	)

	const chooseMethod = useCallback((m: MethodId) => {
		setMethod(m)
		setMethodTouched(true)
	}, [])

	const choosePreset = useCallback((index: number) => setChoice({ kind: "preset", index }), [])
	const chooseCustom = useCallback(() => setChoice({ kind: "custom" }), [])

	// Keep the URL shareable without adding history entries.
	useEffect(() => {
		const next = new URLSearchParams(params)
		if (isValid) next.set("amount", String(amount))
		else next.delete("amount")
		next.set("currency", currency)
		if (next.toString() !== params.toString()) setParams(next, { replace: true })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [amount, currency, isValid])

	return {
		currency,
		setCurrency,
		choice,
		choosePreset,
		chooseCustom,
		custom,
		setCustom,
		amount,
		isValid,
		methods,
		method,
		chooseMethod,
		recommended,
	}
}

export type DonationState = ReturnType<typeof useDonationState>
