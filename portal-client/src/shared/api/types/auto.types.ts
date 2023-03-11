import { IMeta } from "./meta.types"

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
	isSendTelegram: boolean
	createdAt: string
	characteristics: IAutoCharacteristics
}

export interface IAutoCharacteristics {
	bodyType: string
	driveUnit: string
	enginePower: string
	engineType: string
	engineVolume: string
	mileage: number
	steering: string
	transmission: string
	vin: string
	year: number
}