import { getContentType } from 'api/api.helper';
import { axiosClassic } from 'api/interceptors';
import Cookies from 'js-cookie';

import { getAuthUrl } from '@/configs/api.config';

import { removeTokensStorage, saveToStorage } from './auth.helper';
import { request } from 'api/request.api';
import { IAuthResponse } from '@/shared/types/user.types';

export const AuthService = {

	async register(email: string, password: string, firstName: string, lastName: string) {
		const res = await request<IAuthResponse>({
			url: getAuthUrl('register'),
			method: 'POST',
			data: { email, password, firstName, lastName }
		})

		if (res.accessToken) saveToStorage(res);
		return res
	},

	async login(email: string, password: string) {
		const res = await request<IAuthResponse>({
			url: getAuthUrl('login'),
			method: 'POST',
			data: { email, password }
		})

		if (res.accessToken) saveToStorage(res);
		return res
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
