import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import api from "../lib/api.js"
import {
	ACCESS_TOKEN,
	PROFILE_PAGE,
	REFRESH_TOKEN,
	REGISTER_PAGE,
} from "../lib/constants.js"

import Header from "../components/Header.tsx"
import LogRegLink from "../components/LoginRegister/Link.tsx"
import InputField from "../components/LoginRegister/LoginField.tsx"
import LogRegContainer from "../components/LoginRegister/LogRegContainer.tsx"
import LogRegForm from "../components/LoginRegister/LogRegForm.tsx"
import SubmitButton from "../components/LoginRegister/SubmitButton.tsx"
import Title from "../components/LoginRegister/Title.tsx"

import { TokenResponse } from "../lib/types.tsx"

import "../styles/loginRegister/alertMessage.css"

function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	const [loading, setLoading] = useState(false)
	const { t } = useTranslation()

	// Check for registration success parameter
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		if (urlParams.get("registered") === "true") {
			setShowSuccessMessage(true)
			// Remove the parameter from URL without page reload
			const newUrl = window.location.pathname
			window.history.replaceState({}, document.title, newUrl)

			// Hide success message after 5 seconds
			setTimeout(() => {
				setShowSuccessMessage(false)
			}, 5000)
		}
	}, [])

	const handleSubmit = async e => {
		setLoading(true)
		e.preventDefault()

		try {
			const response = (await api("token/", {
				method: "POST",
				body: JSON.stringify({ email: email, password: password }),
			})) as TokenResponse

			if (response?.access && response?.refresh) {
				localStorage.setItem(ACCESS_TOKEN, response.access)
				localStorage.setItem(REFRESH_TOKEN, response.refresh)

				window.location.href = PROFILE_PAGE // Navigate and refresh
			} else {
				alert("Email or Password are not valid!")
			}
		} catch (error) {
			alert(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="header-body">
			<Header />
			{showSuccessMessage && (
				<div className="success-message-container">
					<div className="success-message">
						<span>{t("login-registration-success")}</span>
						<button
							className="success-message-close"
							onClick={() => setShowSuccessMessage(false)}
						>
							×
						</button>
					</div>
				</div>
			)}
			<LogRegContainer>
				<LogRegForm handleSubmit={handleSubmit}>
					<Title text="login-head" />

					<div className="form-fields">
						<InputField
							label="email"
							value={email}
							placeholder="your-email"
							type="email"
							onChange={setEmail}
						/>

						<InputField
							label="password"
							value={password}
							placeholder="your-password"
							type="password"
							onChange={setPassword}
						/>
					</div>
					<div className="form-fields">
						<SubmitButton text="login-button" loading={loading} />
					</div>
					<div className="form-fields">
						<LogRegLink
							link={REGISTER_PAGE}
							textLink="register-now"
							question="login-q"
						/>
					</div>
				</LogRegForm>
			</LogRegContainer>
		</div>
	)
}

export default Login
