import axios from 'axios';
import Cookies from 'js-cookie';

import { errorCatch, getContentType } from './api.helper';
import { API_URL } from '../configs/api.config';
import { AuthService } from '@/processes/auth/model/auth.service';
import { removeTokensStorage } from '@/processes/auth/lib/auth.helper';

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
});

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
});

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('at');

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${String(accessToken)}`;
	}

	return config;
});

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config;

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await AuthService.getNewTokens();

				return instance.request(originalRequest);
			} catch (e) {
				if (errorCatch(e) === 'jwt expired') removeTokensStorage();
			}
		}

		throw error;
	}
);

export default instance;
