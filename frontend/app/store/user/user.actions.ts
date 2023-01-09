import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorCatch } from 'api/api.helper';
import { toastr } from 'react-redux-toastr';

import { AuthService } from '@/services/auth/auth.service';

import { toastError } from '@/utils/toast-error';

import { IAuthRequest, IAuthResponse } from './user.interface';
import { UserService } from '@/services/user/user.service';

export const register = createAsyncThunk<IAuthResponse, IAuthRequest>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.register(email, password);
			toastr.success('Registration', 'Completed successfully');
			return res.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const login = createAsyncThunk<IAuthResponse, IAuthRequest>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const res = await AuthService.login(email, password);
			console.log(res)
			toastr.success('Login', 'Completed successfully');
			return res.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/access-token',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens();
			return response.data;
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorizaiton is finished, plz sign in again'
				);
				thunkApi.dispatch(logout());
			}
			return thunkApi.rejectWithValue(error);
		}
	}
);