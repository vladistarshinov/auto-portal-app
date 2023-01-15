import { TypeSize } from '@/store/cart/cart.types'

export interface ICartItem {
	id: number
	product: any
	quantity: number
	size: TypeSize
}
