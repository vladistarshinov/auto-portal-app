import PersonalArea from '@/screens/personal-area/PersonalArea';
import { UserService } from '@/services/user/user.service';
import { GetStaticProps, NextPage } from 'next';
import { NextAuthPage } from '@/shared/types/auth.types';

const PersonalAreaPage: NextAuthPage = () => {
	return <PersonalArea />;
};

PersonalAreaPage.isOnlyUser = true;

export default PersonalAreaPage;