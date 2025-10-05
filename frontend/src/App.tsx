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
	INITIATIVES_PAGE,
	LOGIN_PAGE,
	LOGOUT_PAGE,
	PROFILE_PAGE,
	REFRESH_TOKEN,
	REGISTER_PAGE,
} from "./lib/constants"

import AuthProvider from "./components/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import ScrollToTop from "./components/ScrollToTop"
import ThemeProvider from "./components/ThemeContext"

import AccessibilityStatement from "./pages/AccessibilityStatement"
import EmailVerify from "./pages/EmailVerify"
import Home from "./pages/Home"
import Initiatives from "./pages/Initiatives"
import ItemEdit from "./pages/ItemEdit"
import Login from "./pages/Login"
import Payment from "./pages/Payment"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Profile from "./pages/Profile"
import RefundPolicy from "./pages/RefundPolicy"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword"
import TermsConditions from "./pages/TermsConditions"

import "./styles/index.css"
import "./styles/themes.css"

function Logout() {
	localStorage.removeItem(ACCESS_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
	window.location.href = HOME_PAGE // Navigate and refresh
	return null // Prevent React rendering
}

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<Router>
					<ScrollToTop />
					<div className="App">
						<Routes>
							<Route path={`${HOME_PAGE}`} element={<Home />} />
							<Route path={INITIATIVES_PAGE} element={<Initiatives />} />
							<Route path="item/:id/edit" element={<ItemEdit />} />
							<Route path={LOGIN_PAGE} element={<Login />} />
							<Route path={REGISTER_PAGE} element={<Register />} />
							<Route
								path="email-verify/:uid/:token"
								element={<EmailVerify />}
							/>
							<Route path="/reset-password" element={<ResetPassword />} />
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
							<Route
								path="/accessibility"
								element={<AccessibilityStatement />}
							/>
							<Route path="/terms" element={<TermsConditions />} />
							<Route path="/refund" element={<RefundPolicy />} />
							<Route
								path="*"
								element={<Navigate to={`${HOME_PAGE}`} replace />}
							/>
						</Routes>
					</div>
				</Router>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
