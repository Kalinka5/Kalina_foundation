import { FormEvent, useCallback, useState } from "react"

/* ==========================================================================
   Small form state helper for the auth pages.

   - Client errors come from `validate` on every render, so they follow a
     language switch automatically (they are translation keys, not text).
   - A field shows its error once it has been blurred, or after a submit.
   - Server errors are kept apart and cleared when the field changes.
   ========================================================================== */

export type FieldErrors<F extends string> = Partial<Record<F, string>>

export function useAuthForm<F extends string>(
	initialValues: Record<F, string>,
	validate: (values: Record<F, string>) => FieldErrors<F>
) {
	const [values, setValues] = useState(initialValues)
	const [touched, setTouched] = useState<Partial<Record<F, boolean>>>({})
	const [submitted, setSubmitted] = useState(false)
	const [serverErrors, setServerErrors] = useState<FieldErrors<F>>({})
	const [formError, setFormError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)

	const clientErrors = validate(values)

	/** Translation key of the error to show for a field, if any. */
	const errorFor = (field: F) =>
		serverErrors[field] ??
		(touched[field] || submitted ? clientErrors[field] : undefined)

	const setValue = useCallback((field: F, value: string) => {
		setValues(prev => ({ ...prev, [field]: value }))
		setServerErrors(prev => {
			if (!prev[field]) return prev
			const next = { ...prev }
			delete next[field]
			return next
		})
		setFormError(null)
	}, [])

	const blur = useCallback((field: F) => {
		setTouched(prev => (prev[field] ? prev : { ...prev, [field]: true }))
	}, [])

	const reset = useCallback(() => {
		setValues(initialValues)
		setTouched({})
		setSubmitted(false)
		setServerErrors({})
		setFormError(null)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	/**
	 * Wraps a submit handler: validates, focuses the first invalid field,
	 * and tracks the submitting state. `idFor` maps a field to its input id.
	 */
	const handleSubmit =
		(onValid: (values: Record<F, string>) => Promise<void>, idFor: (field: F) => string) =>
		async (event: FormEvent) => {
			event.preventDefault()
			if (submitting) return

			setSubmitted(true)
			setFormError(null)

			const invalid = (Object.keys(values) as F[]).find(f => clientErrors[f])
			if (invalid) {
				document.getElementById(idFor(invalid))?.focus()
				return
			}

			setSubmitting(true)
			try {
				await onValid(values)
			} finally {
				setSubmitting(false)
			}
		}

	return {
		values,
		setValue,
		blur,
		errorFor,
		submitting,
		formError,
		setFormError,
		setServerErrors,
		reset,
		handleSubmit,
	}
}
