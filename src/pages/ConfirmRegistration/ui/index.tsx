import { useRegisterConfirmationMutation } from '@entities/User/api'
import { getItemFromLC } from '@shared/utils/localStorage'
import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const ConfgirmRegistration = () => {
	// Vars
	const navigate = useNavigate()
	const email = getItemFromLC('email')

	// Params
	const [searchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])
	const code = params.code
	console.log(code)

	// API calls
	const [confirmRegistration, { isSuccess }] = useRegisterConfirmationMutation()
	confirmRegistration(code)

	// Effects
	useEffect(() => {
		if (!code || !email) {
			navigate('/blogs')
			console.log('navigation to blogs')

			return null
		}
	}, [])

	useEffect(() => {
		if (isSuccess) {
			navigate('/email-verified')
			return
		}
		navigate('/email-resend')
	}, [isSuccess, navigate])

	return null
}
