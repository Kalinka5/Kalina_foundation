import { AnimatePresence, motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { LuArrowUpRight, LuCheck, LuCopy, LuInfo, LuLock, LuTriangleAlert } from "react-icons/lu"

import { EASE } from "../Home/motion"
import CopyField, { useCopy } from "./CopyField"
import { convert, Currency, formatMoney, useUahPerUsd } from "./currency"
import {
	configuredBankAccounts,
	configuredWallets,
	MethodId,
	monobankUrl,
	paypalUrl,
} from "./paymentDetails"
import { DonationState } from "./useDonationState"

type PanelProps = {
	amount: number
	currency: Currency
	isValid: boolean
}

/** Amount in `target`, plus whether it was converted (shown with "≈"). */
function useAmountIn(target: Currency, { amount, currency }: PanelProps) {
	const { i18n } = useTranslation()
	const { rate } = useUahPerUsd()
	const value = convert(amount, currency, target, rate)
	const converted = currency !== target
	const label = `${converted ? "≈ " : ""}${formatMoney(value, target, i18n.language)}`
	return { value, label, converted }
}

function ExternalCta({ href, label, disabled }: { href: string; label: string; disabled: boolean }) {
	const { t } = useTranslation()
	if (disabled) {
		return (
			<button type="button" className="btn btn-primary btn-lg btn-block" disabled>
				{t("home-donate-cta-empty")}
			</button>
		)
	}
	return (
		<a
			className="btn btn-primary btn-lg btn-block"
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{label}
			<LuArrowUpRight aria-hidden="true" />
			<span className="sr-only">({t("donate-page-new-tab")})</span>
		</a>
	)
}

function RateNote({ show }: { show: boolean }) {
	const { t } = useTranslation()
	const { date } = useUahPerUsd()
	if (!show) return null
	return (
		<p className="dc-note">
			<LuInfo aria-hidden="true" />
			{date ? t("donate-page-rate-note", { date }) : t("donate-page-rate-note-approx")}
		</p>
	)
}

function MonobankPanel(props: PanelProps) {
	const { t } = useTranslation()
	const uah = useAmountIn("uah", props)
	return (
		<>
			<ExternalCta
				href={monobankUrl(uah.value)}
				disabled={!props.isValid}
				label={t("donate-page-cta-via", {
					amount: uah.label,
					method: t("donate-page-method-monobank"),
				})}
			/>
			<p className="dc-note">
				<LuInfo aria-hidden="true" />
				{t("donate-page-monobank-note")}
			</p>
			<RateNote show={uah.converted} />
		</>
	)
}

function PayPalPanel(props: PanelProps) {
	const { t } = useTranslation()
	const usd = useAmountIn("usd", props)
	return (
		<>
			<ExternalCta
				href={paypalUrl(usd.value)}
				disabled={!props.isValid}
				label={t("donate-page-cta-via", {
					amount: usd.label,
					method: t("donate-page-method-paypal"),
				})}
			/>
			<p className="dc-note">
				<LuInfo aria-hidden="true" />
				{t("donate-page-paypal-note")}
			</p>
			<RateNote show={usd.converted} />
		</>
	)
}

function BankPanel(props: PanelProps) {
	const { t } = useTranslation()
	const accounts = configuredBankAccounts()
	const preferred = accounts.findIndex(a => a.currency.toLowerCase() === props.currency)
	const [active, setActive] = useState(preferred >= 0 ? preferred : 0)
	const [copiedAll, copyAll] = useCopy()
	const account = accounts[Math.min(active, accounts.length - 1)]
	const accountCurrency = account.currency.toLowerCase() as Currency
	const amountIn = useAmountIn(accountCurrency === "uah" ? "uah" : "usd", props)

	const rows = [
		{ label: t("donate-page-bank-recipient"), value: account.recipient },
		{ label: "IBAN", value: account.iban, mono: true },
		account.edrpou && { label: t("donate-page-bank-edrpou"), value: account.edrpou, mono: true },
		{ label: t("donate-page-bank-name"), value: account.bankName },
		account.swift && { label: "SWIFT / BIC", value: account.swift, mono: true },
		{ label: t("donate-page-bank-purpose-label"), value: t(account.purposeKey) },
	].filter(Boolean) as { label: string; value: string; mono?: boolean }[]

	const allText = rows.map(r => `${r.label}: ${r.value}`).join("\n")

	return (
		<>
			{accounts.length > 1 && (
				<div className="dc-tabs" role="tablist" aria-label={t("donate-page-bank-currency")}>
					{accounts.map((a, i) => (
						<button
							key={a.currency}
							type="button"
							role="tab"
							aria-selected={i === active}
							className={`dc-tab ${i === active ? "is-active" : ""}`}
							onClick={() => setActive(i)}
						>
							{a.currency}
						</button>
					))}
				</div>
			)}

			<div className="dc-fields" role="tabpanel">
				{rows.map(r => (
					<CopyField key={r.label} label={r.label} value={r.value} mono={r.mono} />
				))}
			</div>

			<button type="button" className="btn btn-ghost btn-block" onClick={() => copyAll(allText)}>
				{copiedAll ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
				{copiedAll ? t("donate-page-copied") : t("donate-page-copy-all")}
			</button>
			<p className="dc-note">
				<LuInfo aria-hidden="true" />
				{props.isValid
					? t("donate-page-bank-note", { amount: amountIn.label })
					: t("donate-page-bank-note-empty")}
			</p>
		</>
	)
}

function CryptoPanel(props: PanelProps) {
	const { t } = useTranslation()
	const wallets = configuredWallets()
	const [activeId, setActiveId] = useState(wallets[0].id)
	const wallet = wallets.find(w => w.id === activeId) ?? wallets[0]
	const usd = useAmountIn("usd", props)

	return (
		<>
			<div className="dc-tabs dc-tabs--wrap" role="tablist" aria-label={t("donate-page-crypto-network")}>
				{wallets.map(w => (
					<button
						key={w.id}
						type="button"
						role="tab"
						aria-selected={w.id === wallet.id}
						className={`dc-tab ${w.id === wallet.id ? "is-active" : ""}`}
						onClick={() => setActiveId(w.id)}
					>
						{w.coin}
						<span className="dc-tab-sub">{w.network}</span>
					</button>
				))}
			</div>

			<div className="dc-crypto" role="tabpanel">
				<div className="dc-qr">
					<QRCodeSVG
						value={wallet.address}
						size={132}
						bgColor="#ffffff"
						fgColor="#07090f"
						marginSize={2}
						title={t("donate-page-crypto-qr", { coin: wallet.coin, network: wallet.network })}
					/>
				</div>
				<CopyField
					label={t("donate-page-crypto-address", { coin: wallet.coin, network: wallet.network })}
					value={wallet.address}
					mono
				/>
			</div>

			<p className="dc-note dc-note--warn">
				<LuTriangleAlert aria-hidden="true" />
				{t("donate-page-crypto-warning", { coin: wallet.coin, network: wallet.network })}
			</p>
			{props.isValid && (
				<p className="dc-note">
					<LuInfo aria-hidden="true" />
					{t("donate-page-crypto-amount", { amount: usd.label, coin: wallet.coin })}
				</p>
			)}
		</>
	)
}

const PANELS: Record<MethodId, (p: PanelProps) => JSX.Element> = {
	monobank: MonobankPanel,
	paypal: PayPalPanel,
	bank: BankPanel,
	crypto: CryptoPanel,
}

function MethodPanel({ state }: { state: DonationState }) {
	const { t } = useTranslation()
	const { method, amount, currency, isValid } = state
	if (!method) return null
	const Panel = PANELS[method]
	const external = method === "monobank" || method === "paypal"

	return (
		<div className="dc-step dc-step--panel">
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={method}
					className="dc-panel"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25, ease: EASE }}
				>
					<Panel amount={amount} currency={currency} isValid={isValid} />
				</motion.div>
			</AnimatePresence>
			<p className="dc-secure">
				<LuLock aria-hidden="true" />
				{external ? t("donate-page-secure-external") : t("donate-page-secure-direct")}
			</p>
		</div>
	)
}

export default MethodPanel
