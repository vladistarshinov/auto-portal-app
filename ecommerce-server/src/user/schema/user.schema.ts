import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
	@Prop()
	firstName: string

	@Prop()
	lastName: string

	@Prop({ unique: true })
	email: string

	@Prop()
	password: string

	@Prop({ default: false })
	isAdmin?: boolean

	@Prop({ default: [] })
	favourites?: []
}

export const UserSchema = SchemaFactory.createForClass(User)
