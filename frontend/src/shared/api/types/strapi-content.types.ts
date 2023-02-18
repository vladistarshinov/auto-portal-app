interface IUid {
	id: number
}

interface IBase {
	createdAt: string
	updatedAt: string
	publishedAt: string
}

interface IHomeCategoryAttributes extends IBase {
	title: string
	desc: string
	icon?: string
	url: string
	isMain: boolean
}

export interface IHomeCategoryBlockContent extends IUid {
	attributes: IHomeCategoryAttributes
}
