import { useReducedMotion } from "framer-motion"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { IconType } from "react-icons"

export type ProfileSectionLink = {
	id: string
	labelKey: string
	icon: IconType
	tone?: "danger"
}

/**
 * Sticky list of the page's sections. Highlights the one in view and
 * scrolls to a section (and moves focus to it) when a link is chosen.
 * A sticky column on wide screens, a scrolling row of chips on narrow ones.
 */
function ProfileNav({ sections }: { sections: ProfileSectionLink[] }) {
	const { t } = useTranslation()
	const reduceMotion = useReducedMotion()
	const [active, setActive] = useState(sections[0]?.id)
	const listRef = useRef<HTMLUListElement>(null)

	// In the scrolling chip row (narrow screens), keep the current chip visible
	useEffect(() => {
		const list = listRef.current
		if (!list || list.scrollWidth <= list.clientWidth) return
		const link = list.querySelector<HTMLElement>('[aria-current="true"]')
		if (!link) return
		const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2
		list.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" })
	}, [active, reduceMotion])

	useEffect(() => {
		const elements = sections
			.map(section => document.getElementById(section.id))
			.filter((el): el is HTMLElement => el !== null)

		// A section is "current" while it crosses a band near the top third
		const observer = new IntersectionObserver(
			entries => {
				const visible = entries.filter(entry => entry.isIntersecting)
				if (visible.length) setActive(visible[0].target.id)
			},
			{ rootMargin: "-25% 0px -65% 0px" }
		)
		elements.forEach(el => observer.observe(el))

		// The last section may never reach that band, so at the very bottom of
		// the page it becomes current once it is on screen
		const last = elements[elements.length - 1]
		const onScroll = () => {
			const atBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
			if (atBottom && last && last.getBoundingClientRect().top < window.innerHeight) {
				setActive(last.id)
			}
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => {
			observer.disconnect()
			window.removeEventListener("scroll", onScroll)
		}
	}, [sections])

	const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
		const target = document.getElementById(id)
		if (!target) return
		event.preventDefault()
		target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
		target.focus({ preventScroll: true })
		window.history.replaceState(null, "", `#${id}`)
		setActive(id)
	}

	return (
		<nav className="profile-nav" aria-label={t("profile-nav-label")}>
			<ul className="profile-nav-list" ref={listRef}>
				{sections.map(({ id, labelKey, icon: Icon, tone }) => (
					<li key={id}>
						<a
							href={`#${id}`}
							className={`profile-nav-link${tone ? ` profile-nav-link--${tone}` : ""}`}
							aria-current={active === id ? "true" : undefined}
							onClick={event => goTo(event, id)}
						>
							<Icon aria-hidden />
							<span>{t(labelKey)}</span>
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default ProfileNav
