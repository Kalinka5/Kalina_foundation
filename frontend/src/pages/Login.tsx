import { useState } from "react"

import Header from "../components/Header"
import ModernAuthModal from "../components/LoginRegister/ModernAuthModal"

import "../styles/loginRegister/modernLogin.css"

function Login() {
	const [showModal] = useState(true)

	const handleClose = () => {
		// Redirect to home page when modal is closed
		window.location.href = "/"
	}

	const backgroundImages = [
		"/img/login-background1.png",
		"/img/login-background2.png",
		"/img/login-background3.png",
	]

	return (
		<>
			<Header navLinks={[]} />
			{showModal && (
				<ModernAuthModal
					onClose={handleClose}
					backgroundImages={backgroundImages}
					mode="login"
				/>
			)}
		</>
	)
}

export default Login
