import { FC } from 'react';
import { Provider } from 'react-redux';

import { TypeComponentAuthField } from '@/shared/types/auth.types';

import { store } from '@/store/store';

import ReduxToast from './ReduxToastr';


const MainProvider: FC<TypeComponentAuthField> = ({ children, Component }) => {
	return (
			<Provider store={store}>
					<ReduxToast />
			</Provider>
	);
};

export default MainProvider;
