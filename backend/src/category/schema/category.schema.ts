import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Product } from '../../product/schema/product.schema'

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
    @Prop()
    title: string

    @Prop()
    slug: string

    @Prop()
    description: string

    @Prop()
    icon: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
