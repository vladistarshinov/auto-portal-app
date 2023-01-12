import { AuthContext } from '@/store/auth-context'
import { useContext } from 'react'


export const useAuth = () => useContext(AuthContext)