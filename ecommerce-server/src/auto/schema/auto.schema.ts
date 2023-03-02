import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type AutoDocument = HydratedDocument<Auto>

@Schema({ timestamps: true })
export class Auto {
	@Prop()
	title: string

	@Prop()
	brand: string

	@Prop()
	slug: string

	@Prop()
	imageUrl: string

	@Prop()
	videoUrl: string

	@Prop({ unique: true })
	vin: string

	@Prop()
	year: number

	@Prop()
	countInStock: number

	@Prop()
	countOfViews: number

	@Prop()
	transmission: string

	@Prop()
	engine: string

	@Prop()
	engineVolume: string

	@Prop()
	driveUnit: string

	@Prop()
	bodyType: string

	@Prop()
	power: string

	@Prop()
	color: string

	@Prop()
	oldPrice: string

	@Prop()
	price: string

	@Prop()
	isSendTelegram: string
}

export const AutoSchema = SchemaFactory.createForClass(Auto)