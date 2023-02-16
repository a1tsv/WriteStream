import { AppPreloader } from '@app/providers/PreloaderProvider/ui/StyledPreloader'
import { useAuthMeQuery } from '@entities/User/model'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

export const PreloaderProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const { status } = useAuthMeQuery()

	useEffect(() => {
		if (status !== 'pending') setIsLoading(false)
	}, [status])

	return (
		<>{isLoading ? <AppPreloader sx={{ fontSize: '40px' }} /> : children}</>
	)
}
