import Profile from '@/screens/profile/Profile';
import { UserService } from '@/services/user/user.service';
import { GetStaticProps, NextPage } from 'next';
import { NextAuthPage } from '@/shared/types/auth.types';

const ProfilePage: NextAuthPage = () => {
	return <Profile />;
};

ProfilePage.isOnlyUser = true;

export default ProfilePage;