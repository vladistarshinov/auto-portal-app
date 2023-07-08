import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { TypeUserState } from "@/app/store/auth-context"
import { useAuth } from "./useAuth"
import { AuthService } from "../auth.service"

export const useAuthCheck = (pathname?: string) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		let isMounted = true
		const checkAccessToken = async () => {
			const accessToken = Cookies.get('at')
			if (accessToken) {
				try {
					await AuthService.getNewTokens()
					const res = JSON.parse(localStorage.getItem('user') || '{}')
					setUser(res)
				} catch (e) {
					await AuthService.logout()
					setUser(null)
				}
			};
		}
		checkAccessToken()

		return () => {
			isMounted = false
		}
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('rt')
		if (!refreshToken && user) {
			const logout = async () => {
				await AuthService.logout()
				setUser(null)
			}
			logout()
		}
	}, [pathname])

	return {user, setUser}
}
