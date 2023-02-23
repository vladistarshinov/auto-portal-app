import { IBase, IUid } from "../strapi-content.types"

interface IPromotionAttributes extends IBase {
	title: string
	body: string
	image: {
		data: any | null
	}
	is_top: boolean
	slug: string
	status: boolean
	tag: {
		data: ITagContent | null
	}
	from: string
	to: string
}

export interface IPromotionContent extends IUid {
	attributes: IPromotionAttributes
}

export interface IPromotionResponse {
	data: IPromotionContent
}

interface IArticleAttributes extends IBase {
	title: string
	body: string
	image: {
		data: any | null
	}
	is_top: boolean
	slug: string
	status: boolean
	tags: {
		data: ITagContent[] | null
	}
}

export interface IArticleContent extends IUid {
	attributes: IArticleAttributes
}

export interface IArticleResponse {
	data: IArticleContent
}

export interface ITagAttributes extends IBase {
	title: string
	slug: string
	status: string
}

export interface ITagContent extends IUid {
	attributes: ITagAttributes
}