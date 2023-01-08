import { getUsersUrl } from "@/configs/api.config";
import { IUserResponse } from "@/store/user/user.interface";
import instance from "api/interceptors";

export const UserService = {
	async getProfile() {
		const res = await instance.get<IUserResponse>(getUsersUrl('profile'));
		return res;
	},
};
