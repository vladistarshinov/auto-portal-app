import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from './useAuth'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { query, push } = useRouter()

	const redirect = query.redirect ? String(query.redirect) : '/'

	useEffect(() => {
		if (user) push(redirect)
	}, [user, redirect, push])
}
