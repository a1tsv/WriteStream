// import { isAsyncThunkAction, isFulfilled, isPending, isRejected, isRejectedWithValue, Middleware, Store } from "@reduxjs/toolkit";

// const isSilentAction = isAsyncThunkAction(silentAction1, silentAction2);

// export const genericLoaderMiddleware: Middleware = (store: Store) => next => action => {
//     if (!isSilentAction(action)) {
//         if (isPending(action)) {
//             store.dispatch
//         }
//         if (isFulfilled(action) || isRejected(action) || isRejectedWithValue(action)) {
//             store.dispatch
//         }
//     }

//     return next(action);
// };
