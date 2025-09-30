import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaMoon, FaSun } from "react-icons/fa"

import { useAuth } from "../components/AuthContext"

import LanguageSelector from "./LanguageSelector"

import {
	LOGIN_PAGE,
	LOGOUT_PAGE,
	PROFILE_PAGE,
	REGISTER_PAGE,
} from "../lib/constants"

import { HeaderProps } from "../lib/types"

import "../styles/header.css"

const Header = ({ fixed, children }: HeaderProps) => {
	const authLinks = [
		{ id: 1, urlLink: `${PROFILE_PAGE}`, urlName: "profile" },
		{ id: 2, urlLink: `${LOGOUT_PAGE}`, urlName: "logout" },
	]
	const notAuthLinks = [
		{ id: 1, urlLink: `${LOGIN_PAGE}`, urlName: "login" },
		{ id: 2, urlLink: `${REGISTER_PAGE}`, urlName: "register" },
	]

	// Main navigation links
	const mainNavLinks = [
		{ id: 1, urlLink: "#hero-section", urlName: "about-us" },
		{ id: 2, urlLink: "#team-mission", urlName: "our-mission" },
		{ id: 3, urlLink: "#our-initiatives", urlName: "our-initiatives" },
		{ id: 4, urlLink: "#stories-section", urlName: "stories" },
		{ id: 5, urlLink: "#donation-impact", urlName: "donate" },
		{ id: 6, urlLink: "#top-donators", urlName: "top-donators" },
	]

	const { isAuthorized } = useAuth()
	const links = isAuthorized ? authLinks : notAuthLinks
	const [isMenuOpen, setMenuOpen] = useState(false)
	const [isDarkMode, setIsDarkMode] = useState(false)

	const { t } = useTranslation()

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen)
	}

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
		// Add theme toggle logic here
	}

	const NavContent = () => (
		<>
			<div className="center-nav">
				<ul className="nav-links main-nav-links">
					{mainNavLinks.map(el => (
						<li className="nav-link" key={el.id}>
							<a href={el.urlLink}>{t(el.urlName)}</a>
						</li>
					))}
				</ul>
			</div>
			<div className="right-nav">
				<LanguageSelector />
				<button className="theme-toggle" onClick={toggleTheme}>
					{isDarkMode ? <FaSun /> : <FaMoon />}
				</button>
				<ul className="nav-links page-links">
					{links.map(el => (
						<li className="nav-link" key={el.id}>
							<a href={el.urlLink}>{t(el.urlName)}</a>
						</li>
					))}
				</ul>
			</div>
		</>
	)

	return (
		<header className={fixed}>
			<div className="header-logo">
				<a href="/home/1">
					<img src="/logo.png" alt="Kalina Foundation Logo" />
				</a>
			</div>
			<div className="desktop-nav">
				<NavContent />
			</div>
			<div className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
				<NavContent />
			</div>
			<button
				className={`hamburger ${isMenuOpen ? "active" : ""}`}
				onClick={toggleMenu}
			>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</button>
		</header>
	)
}

export default Header
