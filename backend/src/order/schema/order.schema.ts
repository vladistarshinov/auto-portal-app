import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type OrderDocument = HydratedDocument<Order>

export class OrderItem {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    product: Types.ObjectId

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

export class Payment {
    @Prop()
    method: string

    @Prop()
    status: string

    @Prop()
    email: string

    @Prop()
    createdAt: Date

}

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: Types.ObjectId

    @Prop({ type: () => [OrderItem], _id: false })
    orderItems: OrderItem[]

    @Prop({ type: () => ShippingAddress, _id: false })
    shippingAddress: ShippingAddress

    @Prop({ type: () => Payment, _id: false })
    payment: Payment

    @Prop()
    productPrice: string

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
