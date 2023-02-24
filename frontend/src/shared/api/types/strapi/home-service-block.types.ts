import { IBase, IMediaContent, IUid } from "../strapi-content.types"

export interface IHomeServiceBlock extends IUid {
	title: string
	desc: string
	icon: string
	url: string
}

export interface IHomeServiceAttributes extends IBase {
	title: string
	description: string
	image: {
		data: IMediaContent | null
	}
	backgroundImages: {
		data: IMediaContent[]
	}
	services: IHomeServiceBlock[]
}

export interface IHomeServiceBlockContent extends IUid {
	attributes: IHomeServiceAttributes
}

export interface IHomeServiceBlockResponse {
	data: IHomeServiceBlockContent
}