import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./profile.actions";
import { IInitialProfileState } from "./profile.interface";

const initialState: IInitialProfileState = {
	isLoading: false,
	profile: null,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
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

export const { reducer } = profileSlice;
