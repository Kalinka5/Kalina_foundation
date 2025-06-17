import React from "react"
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom"

import {
	ACCESS_TOKEN,
	DONATE_PAGE,
	HOME_PAGE,
	LOGIN_PAGE,
	LOGOUT_PAGE,
	PROFILE_PAGE,
	REFRESH_TOKEN,
	REGISTER_PAGE,
} from "./lib/constants.js"

import ProtectedRoute from "./components/ProtectedRoute.tsx"

import AccessibilityStatement from "./pages/AccessibilityStatement.tsx"
import EmailVerify from "./pages/EmailVerify.tsx"
import Home from "./pages/Home.tsx"
import ItemEdit from "./pages/ItemEdit.tsx"
import Login from "./pages/Login.tsx"
import Payment from "./pages/Payment.tsx"
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx"
import Profile from "./pages/Profile.tsx"
import RefundPolicy from "./pages/RefundPolicy.tsx"
import Register from "./pages/Register.tsx"
import TermsConditions from "./pages/TermsConditions.tsx"

import "./styles/index.css"

function Logout() {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	window.location.href = HOME_PAGE // Navigate and refresh
	return null // Prevent React rendering
}

function App() {
	return (
		<Router>
			<main className="App">
				<Routes>
					<Route path={`${HOME_PAGE}`} element={<Home />} />
					<Route path="item/:id/edit" element={<ItemEdit />} />
					<Route path={LOGIN_PAGE} element={<Login />} />
					<Route path={REGISTER_PAGE} element={<Register />} />
					<Route path="email-verify/:uid/:token" element={<EmailVerify />} />
					<Route path={LOGOUT_PAGE} element={<Logout />} />
					<Route
						path={PROFILE_PAGE}
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route path={DONATE_PAGE} element={<Payment />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/accessibility" element={<AccessibilityStatement />} />
					<Route path="/terms" element={<TermsConditions />} />
					<Route path="/refund" element={<RefundPolicy />} />
					<Route path="*" element={<Navigate to={`${HOME_PAGE}`} replace />} />
				</Routes>
			</main>
		</Router>
	)
}

export default App
