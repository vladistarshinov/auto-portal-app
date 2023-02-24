export interface IUid {
	id: number
}

export interface IBase {
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export interface IMediaAttributes extends Omit<IBase, 'publishedAt'> {
	alternativeText: string | null
	caption: string | null
	ext: string
	formats: {
		thumbnail: {
			ext: string
			hash: string
			height: number
			mime: string
			name: string
			path: string | null
			size: number
			url: string
			width: number
		}
	}
	hash: string
	height: number
	mime: string
	name: string
	previewUrl: string | null
	provider: string
	provider_metadata: string
	size: number
	url: string
	width: number
}

export interface IMediaContent extends IUid {
	attributes: IMediaAttributes
}

interface IHomeCategoryAttributes extends IBase {
	title: string
	desc: string
	icon?: string
	media: {
		data: IMediaContent
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