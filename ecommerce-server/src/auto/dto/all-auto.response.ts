import { Meta } from "common/types/meta.interface"
import { AutoCharacteristic } from "src/auto-characteristic/schema/auto-characteristic.schema"
import { Auto, AutoDocument } from "../schema/auto.schema"

export interface AllAutoResponse extends Meta {
	data: IAutoWithCharacteristics[]
}

export type IAutoWithCharacteristics =  {
	_id: string,
	title: string,
	brand: string,
	slug: string,
	imageUrl: string,
	videoUrl: string,
	countInStock: number,
	countOfViews: number,
	color: string,
	oldPrice: number,
	price: number,
	isSendTelegram: boolean,
	createdAt: string
} & AutoCharacteristic