import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TypeRootState } from '../index'

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector