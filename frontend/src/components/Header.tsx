import React from "react"
import { useTranslation } from "react-i18next"

import { useAuth } from "../components/AuthContext.tsx"

import LanguageSelector from "./LanguageSelector"

import {
	LOGIN_PAGE,
	LOGOUT_PAGE,
	PROFILE_PAGE,
	REGISTER_PAGE,
} from "../lib/constants.js"

import { HeaderProps } from "../lib/types.tsx"

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

	const { isAuthorized } = useAuth()
	const links = isAuthorized ? authLinks : notAuthLinks

	const { t } = useTranslation()

	return (
		<header className={fixed}>
			<div className="header-logo">
				<a href="/home/1">
					<span>Kalina</span> <span>Foundation</span>{" "}
				</a>
			</div>
			<div className="center-nav">
				<LanguageSelector />
				{children && (
					<ul className="nav-links section-links">
						{children.map(el => (
							<li className="nav-link" key={el.id}>
								<a href={el.urlLink}>{t(el.urlName)}</a>
							</li>
						))}
					</ul>
				)}
			</div>
			<ul className="nav-links page-links">
				{links.map(el => (
					<li className="nav-link" key={el.id}>
						<a href={el.urlLink}>{t(el.urlName)}</a>
					</li>
				))}
			</ul>
		</header>
	)
}

export default Header
