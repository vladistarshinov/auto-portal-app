import { AuthContext } from '@/store/auth-context'
import { useContext } from 'react'
import { useTypedSelector } from './useTypedSelector'


export const useAuth = () => useContext(AuthContext)