import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { TypeComponentAuthField } from '@/shared/types/auth.types';
import { AuthService } from '@/services/auth/auth.service';
import { IUser } from '@/shared/types/user.types';
import { errorCatch } from 'api/api.helper';
import { useAuthCheck } from './useAuthCheck';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const RoleProvider: FC<TypeComponentAuthField> = ({
		children,
		Component: { isOnlyAdmin, isOnlyUser },
	}) => {

	return (
			!isOnlyAdmin && !isOnlyUser ? (
				<>{children}</>
			) : (
				<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
					{children}
				</DynamicCheckRole>
			)
	);
};

export default RoleProvider;
