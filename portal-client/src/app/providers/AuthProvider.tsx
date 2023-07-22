import { FC } from "react"
import { useRouter } from "next/router"

import { useAuthCheck } from "@/processes/auth/model/hooks/useAuthCheck"
import { AuthContext } from "../store/auth-context"

const AuthProvider: FC = ({ children }) => {
	const { pathname } = useRouter()
	const {user, setUser} = useAuthCheck(pathname)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
					{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider