import { useNavigate } from "react-router-dom"

import Header from "../components/Header"
import ModernAuthModal from "../components/LoginRegister/ModernAuthModal"
import { HOME_PAGE } from "../lib/constants"

import "../styles/loginRegister/modernRegister.css"

// Base paths; ModernAuthModal picks the WebP size variant
const backgroundImages = [
	"/img/register-background1",
	"/img/register-background2",
	"/img/register-background3",
]

function Register() {
	const navigate = useNavigate()

	return (
		<>
			<Header navLinks={[]} />
			<ModernAuthModal
				onClose={() => navigate(HOME_PAGE)}
				backgroundImages={backgroundImages}
				mode="register"
			/>
		</>
	)
}

export default Register
