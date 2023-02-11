import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TypeRootState } from '@/store/index'

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector