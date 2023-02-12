export type IProducts = IMeta & {
	res: IProduct[]
}

export interface IProduct {
	_id: string
	title: string
	description: string
	imageUrl: string
	brand: string
	oldPrice: number
	price: number
	countInStock: number
	countOfViews: number
	rating: number
	isSendTelegram: boolean
	category: string
	createdAt: string
	reviews: string[]
	countOfReviews: number
	slug: string
}

export interface IMeta {
	total: number
	current_page: number
	from: number
	to: number
}