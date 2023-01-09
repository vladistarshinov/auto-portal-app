import { useTypedSelector } from './useTypedSelector'

export const useProfile = () => useTypedSelector((state) => state.profile)