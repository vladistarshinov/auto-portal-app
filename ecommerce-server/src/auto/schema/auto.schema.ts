import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type AutoDocument = HydratedDocument<Auto>

@Schema({ timestamps: true })
export class Auto {
	@Prop()
	title: string

	@Prop()
	slug: string

	@Prop({ unique: true })
	vin: string

	@Prop()
	year: number

	@Prop()
	isStock: number

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
}

export const AutoSchema = SchemaFactory.createForClass(Auto)