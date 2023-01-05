import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { Product } from 'src/product/schema/product.schema'

export type OrderDocument = HydratedDocument<Order>

export class OrderItem {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    product: Product

    @Prop()
    quantity: number
}

export class ShippingAddress {
    @Prop()
    address: string

    @Prop()
    city: string

    @Prop()
    postalCode: string

    @Prop()
    country: string
}

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId

    @Prop({ type: () => [OrderItem], _id: false })
    orderItems: OrderItem[]

    @Prop({ type: () => ShippingAddress, _id: false })
    shippingAddress: ShippingAddress

    @Prop()
    paymentMethod: string

    @Prop()
    productsPrice: string

    @Prop()
    taxPrice: string

    @Prop()
    shippingPrice: string

    @Prop()
    totalPrice: string

    @Prop()
    isPaid: boolean

    @Prop()
    paidAt: Date

    @Prop()
    isDelivered: boolean

    @Prop()
    deliveredAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
