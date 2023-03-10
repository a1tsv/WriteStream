import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useShowToastOnSuccess = (
	isSuccess: boolean,
	text: string,
	reset?: () => void
) => {
	useEffect(() => {
		if (isSuccess) {
			toast.success(text)
			reset?.()
		}
	}, [isSuccess])
}
