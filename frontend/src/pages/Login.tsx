import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import ModernLoginModal from "../components/LoginRegister/ModernLoginModal.tsx"

import "../styles/loginRegister/modernLogin.css"

function Login() {
	const [showModal, setShowModal] = useState(true)
	const { t } = useTranslation()

	const handleClose = () => {
		// Redirect to home page when modal is closed
		window.location.href = "/"
	}

	return <>{showModal && <ModernLoginModal onClose={handleClose} />}</>
}

export default Login
