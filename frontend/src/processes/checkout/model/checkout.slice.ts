import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IShippingAddress {
	address: string
	city: string
	country: string
	postalCode: string
}

export interface ICartInitialState {
	shippingAddress: IShippingAddress | null,
	paymentMethod: any | null
}

const initialState: ICartInitialState = {
	shippingAddress: null,
	paymentMethod: null,
}

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		saveShippingAddress: (state, action: PayloadAction<IShippingAddress>) => {
			state.shippingAddress = action.payload
		},
		savePaymentMethod: (state, action: PayloadAction<string>) => {
			state.paymentMethod = action.payload
		},
	}
})

export const { reducer } = checkoutSlice