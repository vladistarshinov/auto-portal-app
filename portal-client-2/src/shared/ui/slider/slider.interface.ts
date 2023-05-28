export interface IReview {
	id: number
	name: string
	jobPosition: string
	text: string
	image: string
}

export interface ISlider {
	reviews: IReview[]
}