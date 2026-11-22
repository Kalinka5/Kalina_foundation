import { useNavigate } from "react-router-dom"

import Header from "../components/Header"
import ModernAuthModal from "../components/LoginRegister/ModernAuthModal"
import { HOME_PAGE } from "../lib/constants"

import "../styles/loginRegister/modernLogin.css"

// Base paths; ModernAuthModal picks the WebP size variant
const backgroundImages = [
	"/img/login-background1",
	"/img/login-background2",
	"/img/login-background3",
]

function Login() {
	const navigate = useNavigate()

	return (
		<>
			<Header navLinks={[]} />
			<ModernAuthModal
				onClose={() => navigate(HOME_PAGE)}
				backgroundImages={backgroundImages}
				mode="login"
			/>
		</>
	)
}

export default Login
