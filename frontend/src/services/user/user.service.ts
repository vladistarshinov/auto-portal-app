import { IUserResponse } from "@/shared/types/user.types";
import instance from "@/shared/api/interceptors";
import { IProfileInput } from "@/components/profile/profile.interface";
import { getUsersUrl } from "@/shared/configs/api.config";

export const UserService = {
	async getProfile() {
		const res = await instance.get<IUserResponse>(getUsersUrl('profile'));
		return res;
	},

	async updateProfile(data: IProfileInput) {
		return await instance.patch<IUserResponse>(getUsersUrl('profile'), data);
	},

};
