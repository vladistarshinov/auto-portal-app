import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { Product } from '../../product/schema/product.schema'

export type ReviewDocument = HydratedDocument<Review>

@Schema({ timestamps: true })
export class Review {

    @Prop()
    description: string

    @Prop()
    rating: number

    @Prop({ type: Types.ObjectId, ref: 'Product' })
    product: Product

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
