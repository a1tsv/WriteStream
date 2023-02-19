import {
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI
} from '@reduxjs/toolkit'
import { IError } from '@shared/api/api.interface'
import { toast } from 'react-toastify'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action) && action.payload.originalStatus !== 404) {
			const errors = action.payload.data.errorsMessages as IError[]
			const requestStatus = action.payload.originalStatus
			const toastId = action.payload.error
			console.log('RTK QUERY ERROR', action, errors, requestStatus)

			switch (requestStatus) {
				case 429:
					toast.error('Too many requests', { toastId })
					break
				case 401:
					break
				default:
					errors?.length > 0
						? toast.error(errors[0].message, { toastId })
						: toast.error('Something went wrong', { toastId })
					break
			}
		}
		return next(action)
	}
