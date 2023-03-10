import { IUserResponse } from "@/shared/types/user.types"

export type IProductsResponse = IMeta & {
	data: IProduct[]
}

export interface IProduct {
	_id: string
	title: string
	description: string
	imageUrl: string
	videoUrl?: string
	brand: string
	oldPrice: number
	price: number
	countInStock: number
	countOfViews: number
	rating: number
	isSendTelegram: boolean
	createdAt: string
	countOfReviews: number
	slug: string
	category: string
	reviews: string[]
}

export interface IMeta {
	total: number
	current_page: number
	per_page: number
	from: number
	to: number
}

export interface ICategory {
	_id: string
	title: string
	slug: string
	description: string
	icon: string
	createdAt: string
	updatedAt: string
}

export interface IReview {
	_id: string
	product: string
	user: Omit<IUserResponse, '_id' | 'firstName' | 'lastName'>
	description: string
	rating: number
	createdAt: string
	updatedAt: string
}

	export type IProductDetailResponse = IProduct & {
		category: ICategory,
		reviews: IReview[]
}