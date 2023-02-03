//import { AuthContext } from '@/shared/auth-context'
//import { useContext } from 'react'

import { useTypedSelector } from "./useTypedSelector";

//export const useAuth = () => useContext(AuthContext)
export const useAuth = () => useTypedSelector((state) => state.user)