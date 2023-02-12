//import { AuthContext } from '@/app/store/auth-context'
//import { useContext } from 'react'

import { useTypedSelector } from "@/app/store/utils/useTypedSelector"

//export const useAuth = () => useContext(AuthContext)
export const useAuth = () => useTypedSelector((state) => state.user)