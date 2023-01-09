import { UserService } from "@/services/user/user.service";
import { toastError } from "@/utils/toast-error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserResponse } from "./profile.interface";

export const getProfile = createAsyncThunk<IUserResponse>(
	'user/get-profile',
	async (_, thunkApi) => {
		try {
			const res = await UserService.getProfile();
			//toastr.success('Registration', 'Completed successfully');
			return res.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);
