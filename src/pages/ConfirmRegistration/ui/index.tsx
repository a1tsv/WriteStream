import { useRegisterConfirmationMutation } from '@entities/User/api'
import { getItemFromLC, removeItemFromLC } from '@shared/utils/localStorage'
import { useEffect, useMemo } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

export const ConfgirmRegistration = () => {
	// Vars
	const navigate = useNavigate()
	const email = getItemFromLC('email')

	// Params
	const [searchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const code = params.code

	if (!code || !email) {
		return <Navigate to={'/blogs'} />
	}
	// API calls
	const [confirmRegistration, { isSuccess, isLoading }] =
		useRegisterConfirmationMutation()

	// Effects
	useEffect(() => {
		confirmRegistration(code)
	}, [])

	useEffect(() => {
		const state = { email }
		if (!isSuccess && !isLoading) {
			navigate('/email-resend', { state })
			removeItemFromLC('email')
			return
		} else if (isSuccess) {
			navigate('/email-verified', { state })
		}
	}, [isSuccess, isLoading])

	return null
}
