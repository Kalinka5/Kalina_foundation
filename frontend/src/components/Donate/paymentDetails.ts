/**
 * Real payment details shown on /donate.
 *
 * Every method whose details are left empty ("") is hidden automatically,
 * so the page never shows placeholder data to donors. Fill in the TODOs.
 */

export type BankAccount = {
	/** Tab label, e.g. "UAH" or "USD". */
	currency: "UAH" | "USD" | "EUR"
	recipient: string
	iban: string
	/** Ukrainian company code (ЄДРПОУ). */
	edrpou?: string
	bankName: string
	/** Required for international (USD / EUR) transfers. */
	swift?: string
	/** Payment purpose donors should paste into the transfer. Can be a translation key. */
	purposeKey: string
}

export type CryptoWallet = {
	/** Stable id used for state and React keys. */
	id: string
	/** Coin shown on the chip, e.g. "USDT". */
	coin: string
	/** Network shown on the chip and in the warning, e.g. "TRC20". */
	network: string
	address: string
}

export const PAYMENT_DETAILS = {
	monobank: {
		jarUrl: "https://send.monobank.ua/jar/QsATQ1NQ4",
	},

	paypal: {
		// TODO: real PayPal.me link, e.g. "https://paypal.me/kalinafoundation".
		// The amount is appended as /<amount>USD.
		meUrl: "",
	},

	bank: [
		{
			currency: "UAH",
			recipient: "", // TODO: БФ «...»
			iban: "", // TODO: UA00 0000 0000 0000 0000 0000 000
			edrpou: "", // TODO
			bankName: "", // TODO: АТ КБ «ПриватБанк»
			purposeKey: "donate-page-bank-purpose",
		},
		{
			currency: "USD",
			recipient: "", // TODO: Charitable Foundation "..."
			iban: "", // TODO
			bankName: "", // TODO: JSC CB "PrivatBank", Kyiv, Ukraine
			swift: "", // TODO: PBANUA2X
			purposeKey: "donate-page-bank-purpose",
		},
	] as BankAccount[],

	crypto: [
		{ id: "usdt-trc20", coin: "USDT", network: "TRC20", address: "" }, // TODO
		{ id: "usdt-erc20", coin: "USDT", network: "ERC20", address: "" }, // TODO
		{ id: "btc", coin: "BTC", network: "Bitcoin", address: "" }, // TODO
		{ id: "eth", coin: "ETH", network: "Ethereum", address: "" }, // TODO
	] as CryptoWallet[],
}

const filled = (v?: string) => typeof v === "string" && v.trim().length > 0

export const configuredBankAccounts = () =>
	PAYMENT_DETAILS.bank.filter(
		a => filled(a.recipient) && filled(a.iban) && filled(a.bankName)
	)

export const configuredWallets = () =>
	PAYMENT_DETAILS.crypto.filter(w => filled(w.address))

export type MethodId = "monobank" | "paypal" | "bank" | "crypto"

/** Methods that have real details, in display order. */
export function availableMethods(): MethodId[] {
	const methods: MethodId[] = []
	if (filled(PAYMENT_DETAILS.monobank.jarUrl)) methods.push("monobank")
	if (filled(PAYMENT_DETAILS.paypal.meUrl)) methods.push("paypal")
	if (configuredBankAccounts().length > 0) methods.push("bank")
	if (configuredWallets().length > 0) methods.push("crypto")
	return methods
}

/** Monobank jar link with the amount (in UAH) prefilled. */
export function monobankUrl(amountUah: number) {
	const base = PAYMENT_DETAILS.monobank.jarUrl
	if (amountUah < 1) return base
	const url = new URL(base)
	url.searchParams.set("a", String(Math.round(amountUah)))
	return url.toString()
}

/** PayPal.me link with the amount (in USD) prefilled. */
export function paypalUrl(amountUsd: number) {
	const base = PAYMENT_DETAILS.paypal.meUrl.replace(/\/+$/, "")
	if (amountUsd < 1) return base
	return `${base}/${Math.round(amountUsd)}USD`
}
