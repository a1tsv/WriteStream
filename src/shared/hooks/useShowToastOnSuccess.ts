import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useShowToastOnSuccess = (
	isSuccess: boolean,
	text: string,
	reset?: () => void,
	callback?: () => void
) => {
	useEffect(() => {
		if (isSuccess) {
			toast.success(text)
			callback?.()
			reset?.()
		}
	}, [isSuccess])
}
