import { IconType } from "react-icons"
import { useTranslation } from "react-i18next"
import { LuBitcoin, LuLandmark, LuSmartphone, LuWallet } from "react-icons/lu"

import { MethodId } from "./paymentDetails"
import { DonationState } from "./useDonationState"

export const METHOD_META: Record<MethodId, { icon: IconType; nameKey: string; hintKey: string }> = {
	monobank: {
		icon: LuSmartphone,
		nameKey: "donate-page-method-monobank",
		hintKey: "donate-page-method-monobank-hint",
	},
	paypal: {
		icon: LuWallet,
		nameKey: "donate-page-method-paypal",
		hintKey: "donate-page-method-paypal-hint",
	},
	bank: {
		icon: LuLandmark,
		nameKey: "donate-page-method-bank",
		hintKey: "donate-page-method-bank-hint",
	},
	crypto: {
		icon: LuBitcoin,
		nameKey: "donate-page-method-crypto",
		hintKey: "donate-page-method-crypto-hint",
	},
}

function MethodList({ state }: { state: DonationState }) {
	const { t } = useTranslation()
	const { methods, method, chooseMethod, recommended } = state

	return (
		<div className="dc-step">
			<div className="dc-step-head">
				<h2 className="dc-step-title" id="dc-method-title">
					<span className="dc-step-num" aria-hidden="true">
						2
					</span>
					{t("donate-page-step-method")}
				</h2>
			</div>

			<div className="dc-methods" role="radiogroup" aria-labelledby="dc-method-title">
				{methods.map(id => {
					const { icon: Icon, nameKey, hintKey } = METHOD_META[id]
					const active = method === id
					return (
						<label key={id} className={`dc-method ${active ? "is-active" : ""}`}>
							<input
								type="radio"
								name="method"
								value={id}
								checked={active}
								onChange={() => chooseMethod(id)}
							/>
							<span className="dc-method-icon" aria-hidden="true">
								<Icon />
							</span>
							<span className="dc-method-text">
								<span className="dc-method-name">
									{t(nameKey)}
									{recommended === id && (
										<span className="dc-badge">{t("donate-page-recommended")}</span>
									)}
								</span>
								<span className="dc-method-hint">{t(hintKey)}</span>
							</span>
							<span className="dc-radio" aria-hidden="true" />
						</label>
					)
				})}
			</div>
		</div>
	)
}

export default MethodList
