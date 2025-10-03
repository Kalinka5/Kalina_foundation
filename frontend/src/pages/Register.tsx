import Header from "../components/Header"
import ModernAuthModal from "../components/LoginRegister/ModernAuthModal"

import "../styles/loginRegister/modernRegister.css"

function Register() {
	const handleClose = () => {
		// Redirect to home page when modal is closed
		window.location.href = "/"
	}

	const backgroundImages = [
		"/img/register-background1.png",
		"/img/register-background2.png",
		"/img/register-background3.png",
	]

	return (
		<>
			<Header navLinks={[]} />
			<ModernAuthModal
				onClose={handleClose}
				backgroundImages={backgroundImages}
				mode="register"
			/>
		</>
	)
}

export default Register
