import { getContentType } from '../../../shared/api/api.helper';
import { axiosClassic } from '../../../shared/api/interceptors';
import Cookies from 'js-cookie';

import { request } from '../../../shared/api/request.api';
import { IAuthResponse } from '../../../shared/types/user.types';
import { getAuthUrl } from '../../../shared/configs/api.config';
import { removeTokensStorage, saveToStorage } from '../lib/auth.helper';

export const AuthService = {

	async register(email: string, password: string, firstName: string, lastName: string) {
		const res = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		);

		if (res.data.accessToken) saveToStorage(res.data);

		return res;
	},

	async login(email: string, password: string) {
		const res = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'), {
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
