import { AnimatePresence, motion } from "framer-motion"
import { FormEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import {
	LuArrowRight,
	LuBitcoin,
	LuCreditCard,
	LuLandmark,
	LuLock,
	LuSmartphone,
	LuWallet,
} from "react-icons/lu"
import { useNavigate } from "react-router-dom"

import { DONATE_PAGE } from "../../lib/constants"
import { DEFAULT_PRESET, DONATION_PRESETS, formatUsd } from "./data"
import { EASE, Reveal, RevealText } from "./motion"

import "../../styles/home/donateSection.css"

const PAYMENT_METHODS = [
	{ name: "PayPal", icon: LuWallet },
	{ name: "Monobank", icon: LuSmartphone },
	{ name: "PrivatBank", icon: LuLandmark },
	{ name: "Card", icon: LuCreditCard },
	{ name: "Crypto", icon: LuBitcoin },
]

type Selection = (typeof DONATION_PRESETS)[number] | "custom"

function DonateSection() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [selection, setSelection] = useState<Selection>(DEFAULT_PRESET)
	const [custom, setCustom] = useState("")

	const amount = selection === "custom" ? Number(custom) || 0 : selection
	const isValid = amount >= 1
	const impactKey =
		selection === "custom"
			? "home-donate-impact-custom"
			: `home-donate-impact-${selection}`

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!isValid) return
		navigate(`${DONATE_PAGE}?amount=${amount}`)
	}

	return (
		<section className="h-section donate" id="donate">
			<div className="h-container donate-grid">
				<div className="donate-copy">
					<Reveal>
						<p className="h-eyebrow">{t("donate")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("donation-impact-choose-title")} />
					<Reveal delay={0.1}>
						<p className="h-lead">{t("home-donate-subtitle")}</p>
					</Reveal>
					<Reveal delay={0.2}>
						<ul className="donate-methods" aria-label={t("home-donate-methods-label")}>
							{PAYMENT_METHODS.map(({ name, icon: Icon }) => (
								<li key={name}>
									<Icon aria-hidden="true" />
									{name === "Card"
										? t("home-donate-method-card")
										: name === "Crypto"
											? t("home-donate-method-crypto")
											: name}
								</li>
							))}
						</ul>
						<p className="donate-note">{t("donation-impact-transparency-note")}</p>
					</Reveal>
				</div>

				<Reveal delay={0.1} y={40}>
					<form className="donate-card" onSubmit={handleSubmit}>
						<fieldset className="donate-presets">
							<legend>{t("home-donate-choose-amount")}</legend>
							{DONATION_PRESETS.map(preset => (
								<label
									key={preset}
									className={`preset ${selection === preset ? "is-active" : ""}`}
								>
									<input
										type="radio"
										name="amount"
										value={preset}
										checked={selection === preset}
										onChange={() => setSelection(preset)}
									/>
									{formatUsd(preset)}
								</label>
							))}
							<label
								className={`preset preset-custom ${
									selection === "custom" ? "is-active" : ""
								}`}
							>
								<input
									type="radio"
									name="amount"
									value="custom"
									checked={selection === "custom"}
									onChange={() => setSelection("custom")}
								/>
								{t("home-donate-other")}
							</label>
						</fieldset>

						<AnimatePresence initial={false}>
							{selection === "custom" && (
								<motion.div
									className="custom-amount"
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3, ease: EASE }}
								>
									<label htmlFor="custom-amount" className="sr-only">
										{t("donation-impact-amount-placeholder")}
									</label>
									<span className="custom-currency" aria-hidden="true">
										$
									</span>
									<input
										id="custom-amount"
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

						<div className="donate-impact" aria-live="polite">
							<AnimatePresence mode="wait" initial={false}>
								<motion.p
									key={impactKey}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -8 }}
									transition={{ duration: 0.25, ease: EASE }}
								>
									{t(impactKey)}
								</motion.p>
							</AnimatePresence>
						</div>

						<button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!isValid}>
							{isValid
								? t("home-donate-cta", { amount: formatUsd(amount) })
								: t("home-donate-cta-empty")}
							<LuArrowRight aria-hidden="true" />
						</button>

						<p className="donate-secure">
							<LuLock aria-hidden="true" />
							{t("home-donate-secure")}
						</p>
					</form>
				</Reveal>
			</div>
		</section>
	)
}

export default DonateSection
