import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const ConfgirmRegistration = () => {
	const [searchParams] = useSearchParams()
	const params = useMemo(() => Object.fromEntries(searchParams), [searchParams])

	return <div></div>
}
