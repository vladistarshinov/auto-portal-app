import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from "./cart.interface";


const initialState: ICartInitialState = {
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
				state.items.push({ ...action.payload, id: action.payload.product._id })
		},
		removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
			state.items = state.items.filter(item => item.id !== action.payload.id)
		},
		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find(item => item.id === id)
			if (item) type === 'plus'
				? item.product.countInStock !== item.quantity && item.quantity++
				: item.quantity > 1 && item.quantity--
		},
		reset: state => {
			state.items = []
		}
	}
});

export const { reducer } = cartSlice;