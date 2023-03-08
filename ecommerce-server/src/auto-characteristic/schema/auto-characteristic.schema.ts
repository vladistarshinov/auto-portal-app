import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type AutoCharacteristicDocument = HydratedDocument<AutoCharacteristic>

@Schema({ timestamps: true })
export class AutoCharacteristic {

	@Prop()
	vin: string

	@Prop()
	year: number

	@Prop()
	transmission: string

	@Prop()
	engineType: string

	@Prop()
	engineVolume: string

	@Prop()
	enginePower: string

	@Prop()
	driveUnit: string

	@Prop()
	bodyType: string

	@Prop()
	steering: string

	@Prop()
	mileage: number
}

export const AutoCharacteristicSchema = SchemaFactory.createForClass(AutoCharacteristic)