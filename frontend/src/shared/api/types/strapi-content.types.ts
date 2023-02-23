export interface IUid {
	id: number
}

export interface IBase {
	createdAt: string
	updatedAt: string
	publishedAt: string
}

interface IHomeCategoryAttributes extends IBase {
	title: string
	desc: string
	icon?: string
	media: {
		data: any | null
	}
	url: string
	isMain: boolean
}

export interface IHomeCategoryBlockContent extends IUid {
	attributes: IHomeCategoryAttributes
}

export interface IHomeCategoryBlockResponse {
	data: IHomeCategoryBlockContent
}