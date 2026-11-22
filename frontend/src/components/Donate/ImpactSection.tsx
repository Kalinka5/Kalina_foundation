import { useTranslation } from "react-i18next"
import { LuArrowUp, LuBandage, LuBriefcaseMedical, LuHeartPulse, LuRadio } from "react-icons/lu"

import { Reveal, RevealText } from "../Home/motion"
import { formatMoney, PRESETS } from "./currency"
import { DonationState } from "./useDonationState"

const ICONS = [LuBandage, LuHeartPulse, LuBriefcaseMedical, LuRadio]

/** What each preset amount buys. Clicking a tile selects that amount in the card. */
function ImpactSection({ state }: { state: DonationState }) {
	const { t, i18n } = useTranslation()
	const { currency, choice, choosePreset } = state

	const select = (index: number) => {
		choosePreset(index)
		const card = document.getElementById("donate-card")
		card?.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	return (
		<section className="h-section impact" id="impact">
			<div className="h-container">
				<div className="h-section-head">
					<Reveal>
						<p className="h-eyebrow">{t("donate-page-impact-eyebrow")}</p>
					</Reveal>
					<RevealText className="h-title" text={t("donate-page-impact-title")} />
					<Reveal delay={0.15}>
						<p className="h-lead">{t("donate-page-impact-subtitle")}</p>
					</Reveal>
				</div>

				<ul className="impact-grid">
					{PRESETS[currency].map((preset, index) => {
						const Icon = ICONS[index]
						const active = choice.kind === "preset" && choice.index === index
						return (
							<Reveal as="li" key={index} delay={index * 0.08}>
								<button
									type="button"
									className={`impact-tile ${active ? "is-active" : ""}`}
									onClick={() => select(index)}
									aria-pressed={active}
								>
									<span className="impact-icon" aria-hidden="true">
										<Icon />
									</span>
									<span className="impact-amount">
										{formatMoney(preset, currency, i18n.language)}
									</span>
									<span className="impact-name">{t(`donate-page-impact-tile-${index}-title`)}</span>
									<span className="impact-desc">{t(`donate-page-impact-tile-${index}-desc`)}</span>
									<span className="impact-select">
										{active ? t("donate-page-impact-selected") : t("donate-page-impact-choose")}
										{!active && <LuArrowUp aria-hidden="true" />}
									</span>
								</button>
							</Reveal>
						)
					})}
				</ul>
			</div>
		</section>
	)
}

export default ImpactSection
