import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"
import { AutoCharacteristic } from "src/auto-characteristic/schema/auto-characteristic.schema"

export type AutoDocument = HydratedDocument<Auto>

@Schema({ timestamps: true })
export class Auto {
	@Prop()
	title: string

	@Prop()
	brand: string

	@Prop({ unique: true })
	slug: string

	@Prop()
	imageUrl: string

	@Prop()
	videoUrl?: string

	@Prop()
	countInStock: number

	@Prop()
	countOfViews: number

	@Prop()
	color: string

	@Prop()
	oldPrice: number

	@Prop()
	price: number

	@Prop()
	isSendTelegram: boolean

	@Prop({ type: Types.ObjectId, ref: 'AutoCharacteristic' })
	characteristics: AutoCharacteristic
}

export const AutoSchema = SchemaFactory.createForClass(Auto)