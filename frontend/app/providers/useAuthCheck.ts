import { useAuth } from "@/hooks/useAuth"
import { AuthService } from "@/services/auth/auth.service"
import { TypeUserState } from "@/store/auth-context"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

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
