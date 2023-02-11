import instance from "@/shared/api/interceptors";
import { getOrdersUrl } from "@/shared/configs/api.config";

export const OrderService = {
	async getOrder(id: string) {
		const res = await instance.get(getOrdersUrl(`${id}`));
		return res;
	},

};