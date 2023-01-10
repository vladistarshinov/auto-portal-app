import { IUser } from "@/shared/types/user.types"
import { createContext, Dispatch, SetStateAction } from "react"

export type TypeUserState = IUser | null

export interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)