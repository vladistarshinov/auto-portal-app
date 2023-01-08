import { getContentType } from 'api/api.helper';
import { axiosClassic } from 'api/interceptors';
import Cookies from 'js-cookie';

import { getAuthUrl } from '@/configs/api.config';

import { IAuthResponse } from '@/store/user/user.interface';

import { removeTokensStorage, saveToStorage } from './auth.helper';

export const AuthService = {
	async register(email: string, password: string) {
		const res = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('register'),
			{ email, password }
		);

		if (res.data.accessToken) saveToStorage(res.data);

		return res;
	},

	async login(email: string, password: string) {
		const res = await axiosClassic.post<IAuthResponse>(getAuthUrl('login'), {
			email,
			password,
		});

		if (res.data.accessToken) saveToStorage(res.data);

		return res;
	},

	logout() {
		removeTokensStorage();
		localStorage.removeItem('user');
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('rt');
		const res = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{
				refreshToken,
			},
			{ headers: getContentType() }
		);

		if (res.data.accessToken) saveToStorage(res.data);

		return res;
	},
};
