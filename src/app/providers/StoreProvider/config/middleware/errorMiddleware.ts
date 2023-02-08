import {
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			console.log('RTK Query Error:', action)
			const errors = action.payload.data.errorsMessages as string[]
			errors.length > 0
				? toast.error(errors[0], { toastId: action.payload.error })
				: toast.error('Something went wrong', { toastId: action.payload.error })
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return next(action)
	}
