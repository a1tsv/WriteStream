import { RootState } from '@app/providers/StoreProvider'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAllSelector: TypedUseSelectorHook<RootState> = useSelector
