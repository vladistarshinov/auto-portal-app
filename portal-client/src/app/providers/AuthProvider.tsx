import { FC, createContext, Dispatch, SetStateAction, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

import { IUser } from "@/shared/types/user.types"
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