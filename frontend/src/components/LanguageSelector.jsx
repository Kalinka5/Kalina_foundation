import React from "react"

import i18n from "../i18n"

import "../styles/languageSelector.css"

const LanguageSelector = () => {
	const currentLang = i18n.language

	const handleLanguageChange = lang => {
		i18n.changeLanguage(lang)
		localStorage.setItem("i18nextLng", lang)
	}

	return (
		<div className="custom-language-selector">
			<button
				className={`lang-button ${currentLang === "en" ? "active" : ""}`}
				onClick={() => handleLanguageChange("en")}
			>
				EN
			</button>
			<button
				className={`lang-button ${currentLang === "ua" ? "active" : ""}`}
				onClick={() => handleLanguageChange("ua")}
			>
				UA
			</button>
		</div>
	)
}

export default LanguageSelector
