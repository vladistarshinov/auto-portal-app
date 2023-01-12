import { useAuthCheck } from "@/hooks/useAuthCheck"
import { AuthService } from "@/services/auth/auth.service"
import { IUser } from "@/shared/types/user.types"
import { AuthContext } from "@/store/auth-context"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react"

const AuthProvider: FC = ({ children }) => {
	const { pathname } = useRouter();
	const {user, setUser} = useAuthCheck(pathname)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
					{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider