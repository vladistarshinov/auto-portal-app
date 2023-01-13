import { IAuthResponse, ITokens } from '@/shared/types/user.types';
import Cookies from 'js-cookie';



export const saveTokenStorage = (data: ITokens) => {
	Cookies.set('at', data.accessToken);
	Cookies.set('rt', data.refreshToken);
};

export const removeTokensStorage = () => {
	Cookies.remove('at');
	Cookies.remove('rt');
};

export const saveToStorage = (data: IAuthResponse) => {
	saveTokenStorage(data);
	localStorage.setItem('user', JSON.stringify(data.user));
};
