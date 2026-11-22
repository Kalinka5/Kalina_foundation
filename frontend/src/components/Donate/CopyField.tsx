import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { LuCheck, LuCopy } from "react-icons/lu"

/** Copies text to the clipboard, falling back to execCommand on insecure origins. */
export async function copyText(text: string) {
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text)
			return true
		}
	} catch {
		// fall through to the legacy path
	}
	const area = document.createElement("textarea")
	area.value = text
	area.setAttribute("readonly", "")
	area.style.position = "fixed"
	area.style.opacity = "0"
	document.body.appendChild(area)
	area.select()
	const ok = document.execCommand("copy")
	document.body.removeChild(area)
	return ok
}

/** Returns [copied, copy] where `copied` flips back to false after 2 s. */
export function useCopy() {
	const [copied, setCopied] = useState(false)
	const timer = useRef<number>()

	useEffect(() => () => window.clearTimeout(timer.current), [])

	const copy = async (text: string) => {
		const ok = await copyText(text)
		if (!ok) return
		setCopied(true)
		window.clearTimeout(timer.current)
		timer.current = window.setTimeout(() => setCopied(false), 2000)
	}

	return [copied, copy] as const
}

type CopyFieldProps = {
	label: string
	value: string
	mono?: boolean
}

/** A labelled value with a copy button and an announced "Copied" state. */
function CopyField({ label, value, mono = false }: CopyFieldProps) {
	const { t } = useTranslation()
	const [copied, copy] = useCopy()

	return (
		<div className="copy-field">
			<div className="copy-field-text">
				<span className="copy-field-label">{label}</span>
				<span className={`copy-field-value ${mono ? "is-mono" : ""}`}>{value}</span>
			</div>
			<button
				type="button"
				className={`copy-btn ${copied ? "is-copied" : ""}`}
				onClick={() => copy(value)}
				aria-label={`${t("donate-page-copy")} ${label}`}
			>
				{copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
				<span className="copy-btn-text">
					{copied ? t("donate-page-copied") : t("donate-page-copy")}
				</span>
			</button>
			<span className="sr-only" aria-live="polite">
				{copied ? `${label}: ${t("donate-page-copied")}` : ""}
			</span>
		</div>
	)
}

export default CopyField
