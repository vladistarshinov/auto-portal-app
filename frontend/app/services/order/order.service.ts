import { getOrdersUrl } from "@/configs/api.config";
import instance from "api/interceptors";

export const OrderService = {
	async getOrder(id: string) {
		const res = await instance.get(getOrdersUrl(`${id}`));
		return res;
	},

};