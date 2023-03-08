export type IAutoResponse = IMeta & {
	data: IAuto[]
}

export interface IAuto {
	_id: string
	title: string
	slug: string
	imageUrl: string
	videoUrl?: string
	brand: string
	oldPrice: number
	price: number
	countInStock: number
	countOfViews: number
	isSendTelegram: boolean
	createdAt: string
	countOfReviews: number
	characteristics: string
}

export interface IMeta {
	total: number
	current_page: number
	from: number
	to: number
}