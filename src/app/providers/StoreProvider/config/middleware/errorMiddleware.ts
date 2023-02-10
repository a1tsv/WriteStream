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
			console.log('RTK QUERY ERROR', action, errors)
			errors?.length > 0
				? toast.error(errors[0].message, { toastId: action.payload.error })
				: toast.error('Something went wrong', { toastId: action.payload.error })
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return next(action)
	}
