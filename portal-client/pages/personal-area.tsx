import { GetStaticProps, NextPage } from 'next'

import { NextAuthPage } from '@/shared/types/auth.types'
import PersonalAreaScreen from '@/screens/personal-area/PersonalArea'

const PersonalAreaPage: NextAuthPage = () => {
	return <PersonalAreaScreen />
}

PersonalAreaPage.isOnlyUser = true

export default PersonalAreaPage