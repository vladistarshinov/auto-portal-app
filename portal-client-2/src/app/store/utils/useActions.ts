import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { allActions } from '../actions'

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}