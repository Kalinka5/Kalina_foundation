import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"

import { EASE } from "../Home/motion"
import { Currency, formatMoney, PRESETS } from "./currency"
import { DonationState } from "./useDonationState"

const CURRENCIES: { id: Currency; symbol: string }[] = [
	{ id: "uah", symbol: "₴" },
	{ id: "usd", symbol: "$" },
]

function AmountStep({ state }: { state: DonationState }) {
	const { t, i18n } = useTranslation()
	const { currency, setCurrency, choice, choosePreset, chooseCustom, custom, setCustom } = state
	const symbol = currency === "uah" ? "₴" : "$"
	const impactKey =
		choice.kind === "preset" ? `donate-page-impact-${choice.index}` : "donate-page-impact-custom"
	const amountLabel = formatMoney(state.amount, currency, i18n.language)

	return (
		<div className="dc-step">
			<div className="dc-step-head">
				<h2 className="dc-step-title" id="dc-amount-title">
					<span className="dc-step-num" aria-hidden="true">
						1
					</span>
					{t("donate-page-step-amount")}
				</h2>

				<div
					className="currency-toggle"
					role="radiogroup"
					aria-label={t("donate-page-currency-label")}
				>
					{CURRENCIES.map(c => (
						<label
							key={c.id}
							className={`currency-option ${currency === c.id ? "is-active" : ""}`}
						>
							<input
								type="radio"
								name="currency"
								value={c.id}
								checked={currency === c.id}
								onChange={() => setCurrency(c.id)}
							/>
							<span aria-hidden="true">{c.symbol}</span>
							<span className="currency-code">{c.id.toUpperCase()}</span>
						</label>
					))}
				</div>
			</div>

			<fieldset className="dc-presets" aria-labelledby="dc-amount-title">
				{PRESETS[currency].map((preset, index) => {
					const active = choice.kind === "preset" && choice.index === index
					return (
						<label key={`${currency}-${preset}`} className={`dc-preset ${active ? "is-active" : ""}`}>
							<input
								type="radio"
								name="amount"
								value={preset}
								checked={active}
								onChange={() => choosePreset(index)}
							/>
							{formatMoney(preset, currency, i18n.language)}
						</label>
					)
				})}
				<label className={`dc-preset dc-preset-custom ${choice.kind === "custom" ? "is-active" : ""}`}>
					<input
						type="radio"
						name="amount"
						value="custom"
						checked={choice.kind === "custom"}
						onChange={chooseCustom}
					/>
					{t("home-donate-other")}
				</label>
			</fieldset>

			<AnimatePresence initial={false}>
				{choice.kind === "custom" && (
					<motion.div
						className="dc-custom"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: EASE }}
					>
						<label htmlFor="dc-custom-amount" className="sr-only">
							{t("donate-page-custom-label", { currency: currency.toUpperCase() })}
						</label>
						<span className="dc-custom-currency" aria-hidden="true">
							{symbol}
						</span>
						<input
							id="dc-custom-amount"
							type="number"
							inputMode="numeric"
							min={1}
							step={1}
							placeholder={t("donation-impact-amount-placeholder")}
							value={custom}
							onChange={e => setCustom(e.target.value)}
							autoFocus
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="dc-impact" aria-live="polite">
				<AnimatePresence mode="wait" initial={false}>
					<motion.p
						key={`${impactKey}-${currency}`}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.22, ease: EASE }}
					>
						{t(impactKey, { amount: amountLabel })}
					</motion.p>
				</AnimatePresence>
			</div>
		</div>
	)
}

export default AmountStep
