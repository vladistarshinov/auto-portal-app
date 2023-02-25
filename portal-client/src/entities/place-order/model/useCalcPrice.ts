import { addDecimal } from "@/shared/libs/add-decimal";

export const useCalcPrice = (total: string) => {

	const shippingPrice = addDecimal(Number(total) > 300 ? 0 : 100)
	const taxPrice = addDecimal(Number(0.13 * Number(total)))
	const totalPrice = addDecimal(
		Number(total) +
		Number(shippingPrice) +
		Number(taxPrice)
	)

	return { shippingPrice, taxPrice, totalPrice }
};