import { getUsersUrl } from "@/configs/api.config";
import { IProfileInput } from "@/screens/profile/profile.interface";
import { IUserResponse } from "@/shared/types/user.types";
import instance from "api/interceptors";

export const UserService = {
	async getProfile() {
		const res = await instance.get<IUserResponse>(getUsersUrl('profile'));
		return res;
	},

	async updateProfile(data: IProfileInput) {
		return await instance.patch<IUserResponse>(getUsersUrl('profile'), data);
	},
};
