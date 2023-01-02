import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Category } from 'src/category/schema/category.schema'
import { User } from 'src/user/schema/user.schema'

export type ProductDocument = HydratedDocument<Product>

@Schema({ timestamps: true })
export class Product {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    imageUrl: string

    @Prop()
    videoUrl: string

    @Prop()
    brand: string

    @Prop()
    price: number

    @Prop()
    countOfViews: number

    @Prop({ default: 4.0 })
    rating: number

    @Prop()
    isSendTelegram: boolean

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}

export const ProductSchema = SchemaFactory.createForClass(Product)
