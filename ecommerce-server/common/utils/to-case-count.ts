import { OrderErrorConstants } from "common/constants/error.constants"

export const toCaseCount = (res: any[]) =>
	res.filter(r => r.error).length > 1
		? OrderErrorConstants.ORDER_LENGTH_MANY
		: OrderErrorConstants.ORDER_LENGTH_1
