import Profile from '@/screens/profile/Profile';
import { UserService } from '@/services/user/user.service';
import { IUserResponse } from '@/store/profile/profile.interface';
import { GetStaticProps, NextPage } from 'next';

const ProfilePage: NextPage = () => {
	return <Profile />;
};

export default ProfilePage;