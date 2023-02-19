import { AppPreloader } from '@app/providers/PreloaderProvider/ui/StyledPreloader'
import { useAuthMeQuery } from '@entities/User/model'
import { getItemFromLC } from '@shared/utils/localStorage'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

export const PreloaderProvider: FC<PropsWithChildren> = ({ children }) => {
	// Vars
	const accessToken = getItemFromLC('accessToken') as string

	// Local States
	const [isLoading, setIsLoading] = useState(true)

	// Api requests`
	const { status } = useAuthMeQuery(accessToken)

	useEffect(() => {
		if (status !== 'pending') setIsLoading(false)
	}, [status])

	return (
		<>{isLoading ? <AppPreloader sx={{ fontSize: '40px' }} /> : children}</>
	)
}
