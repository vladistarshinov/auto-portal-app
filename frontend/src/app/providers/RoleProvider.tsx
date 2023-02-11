import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { TypeComponentAuthField } from '../../shared/types/auth.types';
import { IUser } from '../../shared/types/user.types';

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
