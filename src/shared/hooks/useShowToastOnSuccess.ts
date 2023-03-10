import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useShowToastOnSuccess = (
	isSuccess: boolean,
	text: string,
	email: string,
	reset?: () => void
) => {
	useEffect(() => {
		if (isSuccess) {
			toast.success(`${text} to the ${email}}`)
			if (reset) reset()
		}
	}, [isSuccess])
}
