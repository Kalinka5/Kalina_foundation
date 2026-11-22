import { useTranslation } from "react-i18next"
import { IconType } from "react-icons"
import { IoMoon, IoSunny } from "react-icons/io5"

import { Theme, useTheme } from "../ThemeContext"
import ProfileSection from "./ProfileSection"

type Option<V extends string> = { value: V; label: string; icon?: IconType; lang?: string }

/** Radio group drawn as a segmented control; arrow keys move between options natively. */
function Segmented<V extends string>({
	name,
	legend,
	value,
	options,
	onChange,
}: {
	name: string
	legend: string
	value: V
	options: Option<V>[]
	onChange: (value: V) => void
}) {
	return (
		<fieldset className="profile-pref">
			<legend className="profile-pref-label">{legend}</legend>
			<div className="profile-segmented">
				{options.map(({ value: optionValue, label, icon: Icon, lang }) => (
					<label key={optionValue} className="profile-segment">
						<input
							type="radio"
							name={name}
							value={optionValue}
							checked={value === optionValue}
							onChange={() => onChange(optionValue)}
						/>
						<span lang={lang}>
							{Icon && <Icon aria-hidden />}
							{label}
						</span>
					</label>
				))}
			</div>
		</fieldset>
	)
}

function PreferencesSection({ id }: { id: string }) {
	const { t, i18n } = useTranslation()
	const { theme, setTheme } = useTheme()

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang)
		localStorage.setItem("i18nextLng", lang)
	}

	return (
		<ProfileSection
			id={id}
			title={t("profile-section-preferences")}
			lead={t("profile-preferences-lead")}
		>
			<div className="profile-prefs">
				<Segmented
					name="profile-language"
					legend={t("profile-language")}
					value={i18n.language === "en" ? "en" : "ua"}
					onChange={changeLanguage}
					options={[
						{ value: "ua", label: "Українська", lang: "uk" },
						{ value: "en", label: "English", lang: "en" },
					]}
				/>
				<Segmented<Theme>
					name="profile-theme"
					legend={t("profile-theme")}
					value={theme}
					onChange={setTheme}
					options={[
						{ value: "dark", label: t("profile-theme-dark"), icon: IoMoon },
						{ value: "light", label: t("profile-theme-light"), icon: IoSunny },
					]}
				/>
			</div>
		</ProfileSection>
	)
}

export default PreferencesSection
