import { IUserResponse } from "../../../shared/types/user.types";
import instance from "../../../shared/api/interceptors";
import { getUsersUrl } from "../../../shared/configs/api.config";
import { IProfileInput } from "../ui/profile.interface";

export const ProfileService = {
	async getProfile() {
		const res = await instance.get<IUserResponse>(getUsersUrl('profile'));
		return res;
	},

	async updateProfile(data: IProfileInput) {
		return await instance.patch<IUserResponse>(getUsersUrl('profile'), data);
	},

};
