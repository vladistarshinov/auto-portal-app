import { IUser } from "../../shared/types/user.types"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { AuthContext } from "../store/auth-context"
import { useAuthCheck } from "@/processes/auth/model/hooks/useAuthCheck"

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