import { useRouter } from 'next/router';
import { FC } from 'react';

import { useAuth } from '../../hooks/useAuth';

import { TypeComponentAuthField } from '../../shared/types/auth.types';

const CheckRole: FC<TypeComponentAuthField> = ({
	 children,
	 Component: { isOnlyAdmin, isOnlyUser },
 }) => {
	const {user} = useAuth()
	const isStorageUser = JSON.parse(localStorage.getItem('user') || '{}')

	const router = useRouter();

	const Children = () => <>{children}</>;

	if (user?.isAdmin) return <Children />;

	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404');
		return null;
	}

	const isUser = Object.values(isStorageUser).length

	if (isUser && isOnlyUser) {
		return <Children />;
} else {
		router.pathname !== '/auth' && router.replace('/auth');
		return null;
	}
};

export default CheckRole;
