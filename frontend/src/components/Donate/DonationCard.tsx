import { useTranslation } from "react-i18next"

import AmountStep from "./AmountStep"
import MethodList from "./MethodList"
import MethodPanel from "./MethodPanel"
import { DonationState } from "./useDonationState"

/** The donation widget: amount → method → method-specific action. */
function DonationCard({ state }: { state: DonationState }) {
	const { t } = useTranslation()

	return (
		<section className="dc" id="donate-card" aria-label={t("donate-page-card-label")}>
			<AmountStep state={state} />
			{state.methods.length > 0 ? (
				<>
					<MethodList state={state} />
					<MethodPanel state={state} />
				</>
			) : (
				<p className="dc-note">{t("donate-page-no-methods")}</p>
			)}
		</section>
	)
}

export default DonationCard
