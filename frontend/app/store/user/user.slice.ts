import { createSlice } from '@reduxjs/toolkit';

import { getStoreLocalStorage } from '@/utils/local-storage';

import { checkAuth, login, logout, register, getProfile } from './user.actions';
import { IInitialState } from './user.interface';

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocalStorage('user'),
	profile: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload.user;
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload.user;
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user;
			})
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.profile = payload;
			})
			.addCase(getProfile.rejected, (state) => {
				state.isLoading = false;
				state.profile = null;
			})
	},
});

export const { reducer } = userSlice;
