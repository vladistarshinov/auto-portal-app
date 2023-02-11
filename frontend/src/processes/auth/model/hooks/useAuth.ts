//import { AuthContext } from '@/app/store/auth-context'
//import { useContext } from 'react'

import { useTypedSelector } from "../../../../shared/hooks/useTypedSelector";

//export const useAuth = () => useContext(AuthContext)
export const useAuth = () => useTypedSelector((state) => state.user)