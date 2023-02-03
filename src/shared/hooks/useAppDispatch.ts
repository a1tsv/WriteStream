import { AppDispatch } from '@app/providers/StoreProvider/types/store.types'
import { useDispatch } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
